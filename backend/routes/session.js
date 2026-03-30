const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { sessionCache } = require('../services/cache');
const { trackSession } = require('../services/kpiTracker');

// POST /api/session/start
// Returns a new sessionId to be used with /api/game/* endpoints
router.post('/start', (req, res) => {
  const sessionId = crypto.randomUUID();

  const session = {
    sessionId,
    apiKey: req.apiKey,
    questions: new Map(),   // questionId -> stored answer data
    stats: { total: 0, correct: 0, streak: 0, bestStreak: 0 },
    fastAnswerCount: 0,
    flagged: false,
    createdAt: Date.now(),
  };

  sessionCache.set(sessionId, session);
  trackSession();

  res.json({
    sessionId,
    expiresIn: 7200, // seconds
  });
});

// GET /api/session/stats?sessionId=xxx
router.get('/stats', (req, res) => {
  const { sessionId } = req.query;
  if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

  const session = sessionCache.get(sessionId);
  if (!session) return res.status(404).json({ error: 'Session not found or expired' });

  res.json({
    stats: session.stats,
    flagged: session.flagged,
  });
});

module.exports = router;
