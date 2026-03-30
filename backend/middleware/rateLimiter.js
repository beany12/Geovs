const rateLimit = require('express-rate-limit');

// General: 200 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests — try again in 15 minutes' },
});

// Questions: 60 per minute per API key (1 per second max)
const questionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  keyGenerator: (req) => req.apiKey || req.ip,
  message: { error: 'Question rate limit exceeded — max 60/min' },
});

// Answers: 1 per 1.5 seconds per session (anti-automation)
const answerLimiter = rateLimit({
  windowMs: 1500,
  max: 1,
  keyGenerator: (req) => req.body?.sessionId || req.ip,
  skipFailedRequests: false,
  message: { error: 'Answer submitted too fast — slow down' },
});

module.exports = { generalLimiter, questionLimiter, answerLimiter };
