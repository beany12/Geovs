const express = require('express');
const router = express.Router();
const { questionLimiter, answerLimiter } = require('../middleware/rateLimiter');
const { checkAntiCheat } = require('../middleware/antiCheat');
const { sessionCache } = require('../services/cache');
const {
  generateHigherLower,
  generateSort,
  generateGTC,
  revealNextClue,
} = require('../services/questionEngine');
const { trackQuestion, trackAnswer, trackAntiCheat } = require('../services/kpiTracker');

const GENERATORS = {
  'higher-lower':  generateHigherLower,
  'sort':          generateSort,
  'guess-country': generateGTC,
};

// ── GET /api/game/question?sessionId=xxx&type=higher-lower ─────────────────
// Returns a new question. The correct answer is never included in the response.
router.get('/question', questionLimiter, async (req, res) => {
  const { sessionId, type = 'higher-lower' } = req.query;
  if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

  const session = sessionCache.get(sessionId);
  if (!session) return res.status(401).json({ error: 'Invalid or expired session' });
  if (session.flagged) return res.status(403).json({ error: 'Session suspended for suspicious activity' });

  const generator = GENERATORS[type];
  if (!generator) return res.status(400).json({ error: `Unknown type. Valid: ${Object.keys(GENERATORS).join(', ')}` });

  try {
    const { question, stored } = await generator();

    // Store answer server-side — client never sees this
    session.questions.set(question.questionId, {
      ...stored,
      answered: false,
      issuedAt: Date.now(),
      expiresAt: question.expiresAt,
    });
    sessionCache.set(sessionId, session);

    // KPI tracking
    const isos = type === 'higher-lower'
      ? [question.countryA?.iso3, question.countryB?.iso3].filter(Boolean)
      : (question.countries || []).map(c => c.iso3);
    trackQuestion(type, question.metric, isos);

    res.json(question);
  } catch (err) {
    console.error('[game/question]', err.message);
    res.status(500).json({ error: 'Failed to generate question' });
  }
});

// ── POST /api/game/clue ────────────────────────────────────────────────────
// Reveal the next clue for a guess-country question (one at a time).
router.post('/clue', (req, res) => {
  const { sessionId, questionId } = req.body;
  if (!sessionId || !questionId) return res.status(400).json({ error: 'sessionId and questionId required' });

  const session = sessionCache.get(sessionId);
  if (!session) return res.status(401).json({ error: 'Invalid or expired session' });

  const q = session.questions.get(questionId);
  if (!q) return res.status(404).json({ error: 'Question not found' });
  if (q.answered) return res.status(400).json({ error: 'Question already answered' });
  if (Date.now() > q.expiresAt) return res.status(410).json({ error: 'Question expired' });

  const clue = revealNextClue(q);
  if (!clue) return res.status(200).json({ clue: null, allRevealed: true });

  sessionCache.set(sessionId, session);
  res.json({
    clue,
    cluesRevealed: q.cluesRevealed,
    totalClues: q.clues.length,
    allRevealed: q.cluesRevealed >= q.clues.length,
  });
});

// ── POST /api/game/answer ──────────────────────────────────────────────────
// Submit an answer. Returns { correct, explanation, xp }.
router.post('/answer', answerLimiter, (req, res) => {
  const { sessionId, questionId, answer, timeSpentMs } = req.body;

  if (!sessionId || !questionId || answer == null) {
    return res.status(400).json({ error: 'sessionId, questionId, and answer are required' });
  }

  const session = sessionCache.get(sessionId);
  if (!session) return res.status(401).json({ error: 'Invalid or expired session' });
  if (session.flagged) return res.status(403).json({ error: 'Session suspended' });

  const { blocked, reason, flags } = checkAntiCheat(session, questionId, timeSpentMs ?? 0);

  if (blocked) {
    trackAntiCheat([], true);
    return res.status(400).json({ error: reason });
  }

  if (flags.length > 0) {
    trackAntiCheat(flags, false);
    console.warn(`[ANTI-CHEAT] session=${sessionId} flags=${flags.join(',')}`);
    if (flags.includes('SPEED_BOT')) {
      session.flagged = true;
      sessionCache.set(sessionId, session);
      return res.status(403).json({ error: 'Session suspended for suspicious activity' });
    }
  }

  const q = session.questions.get(questionId);
  q.answered = true;

  // Evaluate correctness (supports both string and array answers)
  let correct;
  if (Array.isArray(q.correct)) {
    correct = Array.isArray(answer) && answer.join(',') === q.correct.join(',');
  } else {
    correct = String(answer).toLowerCase() === String(q.correct).toLowerCase();
  }

  // Update stats
  session.stats.total++;
  if (correct) {
    session.stats.correct++;
    session.stats.streak = (session.stats.streak || 0) + 1;
    session.stats.bestStreak = Math.max(session.stats.bestStreak || 0, session.stats.streak);
  } else {
    session.stats.streak = 0;
  }

  sessionCache.set(sessionId, session);
  trackAnswer(correct, timeSpentMs ?? 0);

  const xp = calculateXP(correct, session.stats, q);

  res.json({
    correct,
    xp,
    explanation: buildExplanation(q),
    stats: session.stats,
  });
});

// ── Helpers ────────────────────────────────────────────────────────────────

function calculateXP(correct, stats, q) {
  if (!correct) return 0;
  let xp = 10;
  // Streak bonus
  if (stats.streak >= 20) xp = 15;
  else if (stats.streak >= 10) xp = 13;
  else if (stats.streak >= 5) xp = 12;
  // Clue efficiency bonus for guess-country
  if (q.clues && q.cluesRevealed <= 2) xp += 5;
  return xp;
}

function buildExplanation(q) {
  // Higher-lower
  if (q.valueA !== undefined && q.valueB !== undefined) {
    return {
      valueA: q.valueA, yearA: q.yearA,
      valueB: q.valueB, yearB: q.yearB,
    };
  }
  // Sort
  if (q.values) {
    return { values: q.values };
  }
  // Guess-country
  if (q.correctName) {
    return {
      correctName: q.correctName,
      cluesRevealed: q.cluesRevealed,
      totalClues: q.clues?.length,
    };
  }
  return {};
}

module.exports = router;
