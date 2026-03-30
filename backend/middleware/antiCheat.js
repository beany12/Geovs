// Thresholds
const MIN_ANSWER_MS = 350;       // answers faster than 350ms → suspicious (human reaction time ~200ms, reading takes longer)
const BOT_FAST_THRESHOLD = 5;    // 5 consecutive fast answers → flagged
const BOT_ACCURACY_MIN_TOTAL = 20;
const BOT_ACCURACY_RATE = 0.97;  // 97%+ over 20+ questions → flagged

/**
 * Checks a session for anti-cheat violations.
 * Returns { blocked: true, reason } or { blocked: false, flags: [] }
 */
function checkAntiCheat(session, questionId, timeSpentMs) {
  // 1. Question must exist in this session
  const q = session.questions.get(questionId);
  if (!q) {
    return { blocked: true, reason: 'UNKNOWN_QUESTION' };
  }

  // 2. Cannot answer the same question twice
  if (q.answered) {
    return { blocked: true, reason: 'ALREADY_ANSWERED' };
  }

  // 3. Answer must be within time window
  if (Date.now() > q.expiresAt) {
    return { blocked: true, reason: 'QUESTION_EXPIRED' };
  }

  // --- Soft flags (don't block, but log & accumulate) ---
  const flags = [];

  // 4. Speed check
  if (timeSpentMs > 0 && timeSpentMs < MIN_ANSWER_MS) {
    session.fastAnswerCount = (session.fastAnswerCount || 0) + 1;
    if (session.fastAnswerCount >= BOT_FAST_THRESHOLD) {
      flags.push('SPEED_BOT');
    }
  } else {
    // Decay fast-answer counter on a normal-speed answer
    session.fastAnswerCount = Math.max(0, (session.fastAnswerCount || 0) - 1);
  }

  // 5. Perfect accuracy check
  const { total, correct } = session.stats;
  if (total >= BOT_ACCURACY_MIN_TOTAL && correct / total >= BOT_ACCURACY_RATE) {
    flags.push('PERFECT_ACCURACY');
  }

  return { blocked: false, flags };
}

module.exports = { checkAntiCheat };
