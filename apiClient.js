/**
 * GeoVs API Client
 * Handles all communication with the secure backend.
 * Falls back to local data if backend is unavailable.
 */

const GeoAPI = (() => {
  // ── Config (set these after deploying your backend) ──────────────────────
  const BACKEND_URL = 'https://your-backend.railway.app'; // ← change after deploy
  const API_KEY     = 'your-api-key-here';                // ← change after deploy
  const ENABLED     = false; // ← set to true after backend is deployed
  // ─────────────────────────────────────────────────────────────────────────

  let sessionId = null;

  // Low-level fetch wrapper
  async function call(method, path, body) {
    const opts = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(`${BACKEND_URL}${path}`, opts);
    const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));

    if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
    return json;
  }

  // Ensure we have a valid session
  async function ensureSession() {
    if (sessionId) return sessionId;

    const stored = sessionStorage.getItem('geovs_session');
    if (stored) {
      sessionId = stored;
      return sessionId;
    }

    const data = await call('POST', '/api/session/start');
    sessionId = data.sessionId;
    sessionStorage.setItem('geovs_session', sessionId);
    return sessionId;
  }

  /**
   * Fetch a new question from the backend.
   * @param {'higher-lower'|'sort'|'guess-country'} type
   */
  async function getQuestion(type = 'higher-lower') {
    if (!ENABLED) return null;
    const sid = await ensureSession();
    return call('GET', `/api/game/question?sessionId=${sid}&type=${type}`);
  }

  /**
   * Reveal the next clue for a guess-country question.
   * @param {string} questionId
   */
  async function revealClue(questionId) {
    if (!ENABLED) return null;
    const sid = await ensureSession();
    return call('POST', '/api/game/clue', { sessionId: sid, questionId });
  }

  /**
   * Submit an answer. Returns { correct, xp, explanation, stats }.
   * @param {string} questionId
   * @param {string|string[]} answer
   * @param {number} timeSpentMs  How long the player took (anti-cheat)
   */
  async function submitAnswer(questionId, answer, timeSpentMs = 0) {
    if (!ENABLED) return null;
    const sid = await ensureSession();
    return call('POST', '/api/game/answer', {
      sessionId: sid,
      questionId,
      answer,
      timeSpentMs,
    });
  }

  /**
   * Get session stats.
   */
  async function getStats() {
    if (!ENABLED) return null;
    const sid = await ensureSession();
    return call('GET', `/api/session/stats?sessionId=${sid}`);
  }

  /**
   * Check if the backend is reachable.
   */
  async function healthCheck() {
    try {
      const res = await fetch(`${BACKEND_URL}/health`, { signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  }

  return { getQuestion, revealClue, submitAnswer, getStats, healthCheck };
})();

// Usage example (call from your game logic):
//
// const question = await GeoAPI.getQuestion('higher-lower');
// if (question) {
//   // Use live question from backend
//   // question.countryA, question.countryB, question.metricLabel etc.
// } else {
//   // Fall back to local COUNTRIES array
// }
//
// After user answers:
// const result = await GeoAPI.submitAnswer(question.questionId, 'higher', timeSpentMs);
// if (result) {
//   // result.correct, result.xp, result.explanation.valueB, result.explanation.yearB
// }
