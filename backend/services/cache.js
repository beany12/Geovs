const NodeCache = require('node-cache');

// World Bank data: 24-hour TTL (data doesn't change that fast)
const worldBankCache = new NodeCache({
  stdTTL: 86400,        // 24 hours
  checkperiod: 3600,    // cleanup every hour
  useClones: false,     // avoid deep-cloning large objects
});

// Sessions: 2-hour TTL, cleanup every 5 minutes
const sessionCache = new NodeCache({
  stdTTL: 7200,
  checkperiod: 300,
  useClones: false,
});

module.exports = { worldBankCache, sessionCache };
