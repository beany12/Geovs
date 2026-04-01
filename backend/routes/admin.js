const express = require('express');
const router = express.Router();
const { getSnapshot } = require('../services/kpiTracker');
const { sessionCache, worldBankCache } = require('../services/cache');
const { verifyToken } = require('../middleware/verifyToken');

// Admin UID whitelist — add your Firebase UID(s) here
const ADMIN_UIDS = new Set(
  (process.env.ADMIN_UIDS || '').split(',').map(s => s.trim()).filter(Boolean)
);

function requireAdmin(req, res, next) {
  if (!req.user || !ADMIN_UIDS.has(req.user.uid)) {
    return res.status(403).json({ error: 'Forbidden — admin access required' });
  }
  next();
}

// GET /api/admin/kpis
// Requires valid Firebase token + admin UID.
router.get('/kpis', verifyToken, requireAdmin, (req, res) => {
  const kpis = getSnapshot();

  // Add live cache stats
  kpis.cache = {
    sessions: {
      keys: sessionCache.keys().length,
      stats: sessionCache.getStats(),
    },
    worldBank: {
      keys: worldBankCache.keys().length,
      stats: worldBankCache.getStats(),
    },
  };

  res.json(kpis);
});

// GET /api/admin/kpis/dashboard  — simple HTML dashboard
router.get('/kpis/dashboard', verifyToken, requireAdmin, (req, res) => {
  const d = getSnapshot();

  const row = (label, value) =>
    `<tr><td>${label}</td><td><strong>${value ?? '—'}</strong></td></tr>`;

  const tableSection = (title, rows) => `
    <h2>${title}</h2>
    <table>${rows.join('')}</table>
  `;

  const topMetricsRows = (d.questions.topMetrics || [])
    .map((m, i) => row(`#${i + 1} ${m.metric}`, m.count));

  const topCountriesRows = (d.questions.topCountries || [])
    .map((c, i) => row(`#${i + 1} ${c.iso3}`, c.count));

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GeoVs — KPI Dashboard</title>
  <style>
    body { font-family: -apple-system, sans-serif; background: #0d1117; color: #e6edf3; margin: 0; padding: 24px; }
    h1 { color: #c8f135; margin-bottom: 4px; }
    .subtitle { color: #8b949e; margin-bottom: 32px; font-size: 14px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
    .card { background: #161b22; border: 1px solid #30363d; border-radius: 10px; padding: 20px; }
    h2 { font-size: 13px; text-transform: uppercase; letter-spacing: .08em; color: #8b949e; margin: 0 0 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    td { padding: 6px 0; border-bottom: 1px solid #21262d; }
    td:first-child { color: #8b949e; }
    td:last-child { text-align: right; }
    strong { color: #c8f135; }
    .refresh { color: #8b949e; font-size: 12px; margin-top: 32px; }
    .badge { display:inline-block; background:#c8f13520; color:#c8f135; border-radius:4px; padding:1px 7px; font-size:12px; }
  </style>
</head>
<body>
  <h1>GeoVs KPI Dashboard</h1>
  <div class="subtitle">Uptime: ${d.server.uptimeHours}h &nbsp;|&nbsp; Started: ${d.server.startedAt}</div>
  <div class="grid">
    <div class="card">
      ${tableSection('Sessions', [
        row('Sessions erstellt', d.sessions.created),
      ])}
    </div>
    <div class="card">
      ${tableSection('Fragen', [
        row('Gesamt', d.questions.total),
        row('Higher / Lower', d.questions.byType['higher-lower']),
        row('Sort', d.questions.byType['sort']),
        row('Guess the Country', d.questions.byType['guess-country']),
      ])}
    </div>
    <div class="card">
      ${tableSection('Antworten', [
        row('Gesamt', d.answers.total),
        row('Richtig', d.answers.correct),
        row('Falsch', d.answers.wrong),
        row('Genauigkeit', d.answers.accuracyPct),
        row('Ø Antwortzeit', d.answers.avgAnswerMs ? `${d.answers.avgAnswerMs} ms` : '—'),
      ])}
    </div>
    <div class="card">
      ${tableSection('Anti-Cheat', [
        row('Speed-Flags', d.antiCheat.speedFlags),
        row('Accuracy-Flags', d.antiCheat.accuracyFlags),
        row('Gebannte Sessions', d.antiCheat.flaggedSessions),
        row('Blockierte Antworten', d.antiCheat.blockedAnswers),
      ])}
    </div>
    <div class="card">
      ${tableSection('World Bank API', [
        row('API-Fetches', d.worldBank.apiFetches),
        row('Cache Hits', d.worldBank.cacheHits),
        row('Cache Misses', d.worldBank.cacheMisses),
        row('Cache Hit Rate', d.worldBank.cacheHitRatePct),
        row('Letzter Fetch', d.worldBank.lastFetchAt ? d.worldBank.lastFetchAt.replace('T', ' ').slice(0, 19) : '—'),
      ])}
    </div>
    <div class="card">
      ${tableSection('Top Metriken', topMetricsRows.length ? topMetricsRows : [row('—', '—')])}
    </div>
    <div class="card">
      ${tableSection('Top Länder (nach Häufigkeit)', topCountriesRows.length ? topCountriesRows : [row('—', '—')])}
    </div>
  </div>
  <p class="refresh">Auto-refresh alle 30s <span class="badge">live</span></p>
  <script>setTimeout(()=>location.reload(), 30000);</script>
</body>
</html>`;

  res.send(html);
});

module.exports = router;
