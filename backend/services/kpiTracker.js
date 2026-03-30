/**
 * In-memory KPI tracker.
 * All counters reset on server restart.
 * For persistence across restarts, swap the store object with a Redis/DB write.
 */

const store = {
  // Lifecycle
  startedAt: Date.now(),

  // Sessions
  sessionsCreated: 0,

  // Questions
  questions: {
    total: 0,
    byType: { 'higher-lower': 0, 'sort': 0, 'guess-country': 0 },
  },

  // Answers
  answers: {
    total: 0,
    correct: 0,
    totalTimeMs: 0,       // sum of timeSpentMs for average calculation
    timedAnswers: 0,      // answers where timeSpentMs was provided
  },

  // Per-metric usage (which metric was asked most)
  metrics: {},

  // Per-country appearances in questions
  countries: {},

  // Anti-cheat
  antiCheat: {
    speedFlags: 0,
    accuracyFlags: 0,
    flaggedSessions: 0,
    blockedAnswers: 0,
  },

  // World Bank API
  worldBank: {
    apiFetches: 0,
    cacheHits: 0,
    cacheMisses: 0,
    lastFetchAt: null,
  },
};

// ── Increment helpers ─────────────────────────────────────────────────────

function trackSession() {
  store.sessionsCreated++;
}

function trackQuestion(type, metric, countryISOs = []) {
  store.questions.total++;
  if (store.questions.byType[type] !== undefined) {
    store.questions.byType[type]++;
  }
  if (metric) {
    store.metrics[metric] = (store.metrics[metric] || 0) + 1;
  }
  for (const iso of countryISOs) {
    store.countries[iso] = (store.countries[iso] || 0) + 1;
  }
}

function trackAnswer(correct, timeSpentMs) {
  store.answers.total++;
  if (correct) store.answers.correct++;
  if (timeSpentMs > 0) {
    store.answers.totalTimeMs += timeSpentMs;
    store.answers.timedAnswers++;
  }
}

function trackAntiCheat(flags, blocked) {
  if (blocked) store.antiCheat.blockedAnswers++;
  for (const f of flags || []) {
    if (f === 'SPEED_BOT') store.antiCheat.speedFlags++;
    if (f === 'PERFECT_ACCURACY') store.antiCheat.accuracyFlags++;
    if (f === 'SPEED_BOT') store.antiCheat.flaggedSessions++; // session gets banned
  }
}

function trackWorldBank(type) {
  if (type === 'fetch') {
    store.worldBank.apiFetches++;
    store.worldBank.lastFetchAt = Date.now();
  } else if (type === 'hit') {
    store.worldBank.cacheHits++;
  } else if (type === 'miss') {
    store.worldBank.cacheMisses++;
  }
}

// ── Snapshot builder ──────────────────────────────────────────────────────

function getSnapshot() {
  const uptimeMs = Date.now() - store.startedAt;
  const { answers, questions, antiCheat, worldBank } = store;

  const accuracy = answers.total > 0
    ? ((answers.correct / answers.total) * 100).toFixed(1)
    : null;

  const avgAnswerMs = answers.timedAnswers > 0
    ? Math.round(answers.totalTimeMs / answers.timedAnswers)
    : null;

  // Top 5 metrics by usage
  const topMetrics = Object.entries(store.metrics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([metric, count]) => ({ metric, count }));

  // Top 10 countries by appearances
  const topCountries = Object.entries(store.countries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([iso3, count]) => ({ iso3, count }));

  const cacheHitRate = (worldBank.cacheHits + worldBank.cacheMisses) > 0
    ? ((worldBank.cacheHits / (worldBank.cacheHits + worldBank.cacheMisses)) * 100).toFixed(1)
    : null;

  return {
    server: {
      startedAt: new Date(store.startedAt).toISOString(),
      uptimeHours: (uptimeMs / 3600000).toFixed(2),
    },
    sessions: {
      created: store.sessionsCreated,
    },
    questions: {
      total: questions.total,
      byType: questions.byType,
      topMetrics,
      topCountries,
    },
    answers: {
      total: answers.total,
      correct: answers.correct,
      wrong: answers.total - answers.correct,
      accuracyPct: accuracy ? `${accuracy}%` : null,
      avgAnswerMs,
    },
    antiCheat: {
      speedFlags: antiCheat.speedFlags,
      accuracyFlags: antiCheat.accuracyFlags,
      flaggedSessions: antiCheat.flaggedSessions,
      blockedAnswers: antiCheat.blockedAnswers,
    },
    worldBank: {
      apiFetches: worldBank.apiFetches,
      cacheHits: worldBank.cacheHits,
      cacheMisses: worldBank.cacheMisses,
      cacheHitRatePct: cacheHitRate ? `${cacheHitRate}%` : null,
      lastFetchAt: worldBank.lastFetchAt
        ? new Date(worldBank.lastFetchAt).toISOString()
        : null,
    },
  };
}

module.exports = { trackSession, trackQuestion, trackAnswer, trackAntiCheat, trackWorldBank, getSnapshot };
