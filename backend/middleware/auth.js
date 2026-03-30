const crypto = require('crypto');

// Load valid keys from env at startup — fail loudly if missing in production
const VALID_KEYS = new Set(
  (process.env.API_KEYS || '')
    .split(',')
    .map(k => k.trim())
    .filter(Boolean)
);

if (VALID_KEYS.size === 0 && process.env.NODE_ENV === 'production') {
  console.error('[FATAL] No API_KEYS configured. Set API_KEYS in your .env file.');
  process.exit(1);
}

function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'];

  if (!key) {
    return res.status(401).json({ error: 'Missing API key (x-api-key header required)' });
  }

  // Timing-safe comparison to prevent timing attacks
  let valid = false;
  for (const validKey of VALID_KEYS) {
    if (
      key.length === validKey.length &&
      crypto.timingSafeEqual(Buffer.from(key), Buffer.from(validKey))
    ) {
      valid = true;
      break;
    }
  }

  if (!valid) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  req.apiKey = key;
  next();
}

module.exports = { requireApiKey };
