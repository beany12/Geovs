const crypto = require('crypto');
const { getAllCountryData, getCountryNames, INDICATORS } = require('./worldbank');

// How long the player has to answer (ms)
const QUESTION_TTL = { 'higher-lower': 30000, 'sort': 45000, 'guess-country': 120000 };

// --- Helpers ---

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function signQuestion(questionId, correctAnswer, expiresAt) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET not configured');
  return crypto
    .createHmac('sha256', secret)
    .update(`${questionId}:${correctAnswer}:${expiresAt}`)
    .digest('hex');
}

function verifySignature(questionId, correctAnswer, expiresAt, sig) {
  const expected = signQuestion(questionId, correctAnswer, expiresAt);
  if (expected.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

// Format a metric value for display
function fmt(value, metricKey) {
  if (value == null) return '—';
  switch (metricKey) {
    case 'pop':
      if (value >= 1e9) return `${(value / 1e9).toFixed(2)} Mrd.`;
      if (value >= 1e6) return `${(value / 1e6).toFixed(1)} Mio.`;
      return value.toLocaleString('de-DE');
    case 'gdp':
    case 'gdpCap':
      if (value >= 1e12) return `$${(value / 1e12).toFixed(2)} Bio.`;
      if (value >= 1e9)  return `$${(value / 1e9).toFixed(1)} Mrd.`;
      return `$${Math.round(value).toLocaleString('de-DE')}`;
    case 'area':
      return `${Math.round(value).toLocaleString('de-DE')} km²`;
    case 'lifeExp':
      return `${value.toFixed(1)} Jahre`;
    case 'internet':
    case 'unemp':
    case 'literacy':
    case 'forest':
    case 'urban':
      return `${value.toFixed(1)}%`;
    case 'co2':
      return `${value.toFixed(2)} t`;
    default:
      return String(value);
  }
}

// Pick a random metric that has data for a given set of countries
function pickMetric(countries) {
  const metricKeys = Object.keys(INDICATORS);
  const eligible = metricKeys.filter(k => countries.every(c => c[k] != null));
  if (eligible.length === 0) return metricKeys[0]; // fallback
  return eligible[Math.floor(Math.random() * eligible.length)];
}

// --- Question generators ---

/**
 * Higher / Lower: "Does Country B have a higher or lower X than Country A?"
 */
async function generateHigherLower() {
  const { countries } = await getAllCountryData();
  const names = await getCountryNames();

  let countryA, countryB, metric;
  let attempts = 0;

  do {
    metric = Object.keys(INDICATORS)[Math.floor(Math.random() * Object.keys(INDICATORS).length)];
    const pool = countries.filter(c => c[metric] != null && names[c.iso3]);
    if (pool.length < 2) continue;
    [countryA, countryB] = pickRandom(pool, 2);
    attempts++;
  } while ((!countryA || !countryB || countryA.iso3 === countryB.iso3) && attempts < 20);

  const valA = countryA[metric];
  const valB = countryB[metric];
  const correctAnswer = valB > valA ? 'higher' : 'lower'; // "Is B higher or lower than A?"

  const questionId = crypto.randomUUID();
  const expiresAt = Date.now() + QUESTION_TTL['higher-lower'];
  const signature = signQuestion(questionId, correctAnswer, expiresAt);

  return {
    question: {
      questionId,
      type: 'higher-lower',
      metric,
      metricLabel: INDICATORS[metric].label,
      metricUnit: INDICATORS[metric].unit,
      // Country A value is revealed; player guesses if B is higher or lower
      countryA: {
        name: names[countryA.iso3],
        iso3: countryA.iso3,
        displayValue: fmt(valA, metric),
        dataYear: countryA[`${metric}_year`],
      },
      countryB: {
        name: names[countryB.iso3],
        iso3: countryB.iso3,
      },
      options: ['higher', 'lower'],
      expiresAt,
      signature,
    },
    stored: {
      correct: correctAnswer,
      valueA: valA,
      valueB: valB,
      yearA: countryA[`${metric}_year`],
      yearB: countryB[`${metric}_year`],
    },
  };
}

/**
 * Sort: rank 4 countries from lowest to highest on a metric.
 */
async function generateSort() {
  const { countries } = await getAllCountryData();
  const names = await getCountryNames();

  let picked, metric;
  let attempts = 0;

  do {
    metric = Object.keys(INDICATORS)[Math.floor(Math.random() * Object.keys(INDICATORS).length)];
    const pool = countries.filter(c => c[metric] != null && names[c.iso3]);
    if (pool.length < 4) continue;
    picked = pickRandom(pool, 4);
    attempts++;
  } while ((!picked || picked.length < 4) && attempts < 20);

  // Correct order: lowest to highest
  const sortedAsc = [...picked].sort((a, b) => a[metric] - b[metric]);
  const correctOrder = sortedAsc.map(c => c.iso3);

  const questionId = crypto.randomUUID();
  const expiresAt = Date.now() + QUESTION_TTL['sort'];
  const signature = signQuestion(questionId, correctOrder.join(','), expiresAt);

  return {
    question: {
      questionId,
      type: 'sort',
      metric,
      metricLabel: INDICATORS[metric].label,
      metricUnit: INDICATORS[metric].unit,
      instruction: `Sortiere von niedrig nach hoch: ${INDICATORS[metric].label}`,
      countries: picked.map(c => ({ name: names[c.iso3], iso3: c.iso3 })),
      expiresAt,
      signature,
    },
    stored: {
      correct: correctOrder,
      values: Object.fromEntries(sortedAsc.map(c => [c.iso3, { value: c[metric], year: c[`${metric}_year`], display: fmt(c[metric], metric) }])),
    },
  };
}

/**
 * Guess the Country: reveal clues one at a time, pick from 4 options.
 */
async function generateGTC() {
  const { countries } = await getAllCountryData();
  const names = await getCountryNames();

  // Target must have at least pop, area, gdp
  const eligible = countries.filter(c =>
    names[c.iso3] && c.pop != null && c.area != null && c.gdp != null
  );
  const target = eligible[Math.floor(Math.random() * eligible.length)];

  // Build ordered clues (vague → specific)
  const clues = buildGTCClues(target, names[target.iso3]);

  // Wrong options: countries with similar population size
  const similar = eligible
    .filter(c => c.iso3 !== target.iso3 && c.pop != null)
    .sort((a, b) => Math.abs(a.pop - target.pop) - Math.abs(b.pop - target.pop))
    .slice(0, 15);
  const wrong = pickRandom(similar, 3).map(c => ({ name: names[c.iso3], iso3: c.iso3 }));
  const options = [...wrong, { name: names[target.iso3], iso3: target.iso3 }]
    .sort(() => Math.random() - 0.5);

  const questionId = crypto.randomUUID();
  const expiresAt = Date.now() + QUESTION_TTL['guess-country'];
  const signature = signQuestion(questionId, target.iso3, expiresAt);

  return {
    question: {
      questionId,
      type: 'guess-country',
      // Send clue labels only — values revealed progressively via /clue endpoint
      clueCount: clues.length,
      options,
      expiresAt,
      signature,
    },
    stored: {
      correct: target.iso3,
      correctName: names[target.iso3],
      clues, // full clues with values, served one at a time
      cluesRevealed: 0,
    },
  };
}

/**
 * Reveal the next clue for a GTC question.
 * Returns null if all clues already revealed.
 */
function revealNextClue(storedQuestion) {
  const idx = storedQuestion.cluesRevealed || 0;
  if (idx >= storedQuestion.clues.length) return null;
  const clue = storedQuestion.clues[idx];
  storedQuestion.cluesRevealed = idx + 1;
  return clue;
}

function buildGTCClues(country, name) {
  const clues = [];

  // Order: vague geography first, then stats
  if (country.area != null)     clues.push({ label: 'Fläche',              value: fmt(country.area, 'area'),       metric: 'area' });
  if (country.urban != null)    clues.push({ label: 'Urbanisierung',       value: fmt(country.urban, 'urban'),     metric: 'urban' });
  if (country.pop != null)      clues.push({ label: 'Bevölkerung',         value: fmt(country.pop, 'pop'),         metric: 'pop' });
  if (country.gdpCap != null)   clues.push({ label: 'BIP pro Kopf',        value: fmt(country.gdpCap, 'gdpCap'),   metric: 'gdpCap' });
  if (country.lifeExp != null)  clues.push({ label: 'Lebenserwartung',     value: fmt(country.lifeExp, 'lifeExp'), metric: 'lifeExp' });
  if (country.internet != null) clues.push({ label: 'Internet-Nutzung',    value: fmt(country.internet, 'internet'), metric: 'internet' });
  if (country.co2 != null)      clues.push({ label: 'CO₂ pro Kopf',        value: fmt(country.co2, 'co2'),         metric: 'co2' });

  return clues;
}

module.exports = {
  generateHigherLower,
  generateSort,
  generateGTC,
  revealNextClue,
  verifySignature,
  QUESTION_TTL,
};
