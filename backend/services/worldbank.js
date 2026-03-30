const { worldBankCache } = require('./cache');
const { trackWorldBank } = require('./kpiTracker');

// World Bank indicator codes
const INDICATORS = {
  pop:      { code: 'SP.POP.TOTL',    label: 'Bevölkerung',             unit: '' },
  gdp:      { code: 'NY.GDP.MKTP.CD', label: 'BIP (USD)',               unit: '$' },
  lifeExp:  { code: 'SP.DYN.LE00.IN', label: 'Lebenserwartung',         unit: 'Jahre' },
  co2:      { code: 'EN.ATM.CO2E.PC', label: 'CO₂ pro Kopf',            unit: 't' },
  internet: { code: 'IT.NET.USER.ZS', label: 'Internet-Nutzung',        unit: '%' },
  unemp:    { code: 'SL.UEM.TOTL.ZS', label: 'Arbeitslosigkeit',        unit: '%' },
  area:     { code: 'AG.SRF.TOTL.K2', label: 'Fläche',                  unit: 'km²' },
  literacy: { code: 'SE.ADT.LITR.ZS', label: 'Alphabetisierungsrate',   unit: '%' },
  gdpCap:   { code: 'NY.GDP.PCAP.CD', label: 'BIP pro Kopf',            unit: '$' },
  forest:   { code: 'AG.LND.FRST.ZS', label: 'Waldfläche',              unit: '%' },
  urban:    { code: 'SP.URB.TOTL.IN.ZS', label: 'Urbanisierung',        unit: '%' },
};

// Regions/aggregates we want to exclude from country lists
const EXCLUDED_REGIONS = new Set([
  'NA', // Not classified / aggregates
]);

/**
 * Fetch a single World Bank indicator for all countries.
 * Returns { iso3 -> { value, year } }
 */
async function fetchIndicator(indicatorCode) {
  const url =
    `https://api.worldbank.org/v2/country/all/indicator/${indicatorCode}` +
    `?format=json&mrv=1&per_page=300`;

  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`World Bank API ${res.status} for ${indicatorCode}`);

  const [, data] = await res.json();
  const result = {};
  for (const entry of data || []) {
    if (entry.value !== null && entry.countryiso3code) {
      result[entry.countryiso3code] = {
        value: entry.value,
        year: entry.date,
      };
    }
  }
  return result;
}

/**
 * Fetch ISO3 → display name mapping, excluding regional aggregates.
 */
async function getCountryNames() {
  const cached = worldBankCache.get('country_names');
  if (cached) return cached;

  const url = 'https://api.worldbank.org/v2/country?format=json&per_page=300';
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  const [, data] = await res.json();

  const names = {};
  for (const c of data || []) {
    // Skip aggregates (region id "NA" = "Aggregates" in World Bank terminology)
    if (c.region?.id && !EXCLUDED_REGIONS.has(c.region.id)) {
      names[c.id] = c.name; // c.id = ISO3 for countries
    }
  }

  worldBankCache.set('country_names', names);
  console.log(`[WorldBank] Loaded ${Object.keys(names).length} country names`);
  return names;
}

/**
 * Fetch and merge all indicators into a single country-keyed dataset.
 * Returns { countries: [...], fetchedAt: timestamp }
 */
async function getAllCountryData() {
  const cached = worldBankCache.get('all_countries');
  if (cached) { trackWorldBank('hit'); return cached; }

  trackWorldBank('miss');
  trackWorldBank('fetch');
  console.log('[WorldBank] Fetching fresh indicator data...');

  // Fetch all indicators in parallel; tolerate partial failures
  const settled = await Promise.allSettled(
    Object.entries(INDICATORS).map(async ([key, { code }]) => {
      const data = await fetchIndicator(code);
      return [key, data];
    })
  );

  // Merge into { iso3 -> { metric: value, metric_year: year, ... } }
  const byISO3 = {};
  for (const result of settled) {
    if (result.status !== 'fulfilled') {
      console.warn('[WorldBank] Indicator fetch failed:', result.reason?.message);
      continue;
    }
    const [metric, data] = result.value;
    for (const [iso3, { value, year }] of Object.entries(data)) {
      if (!byISO3[iso3]) byISO3[iso3] = { iso3 };
      byISO3[iso3][metric] = value;
      byISO3[iso3][`${metric}_year`] = year;
    }
  }

  // Only keep entries that have at least 5 numeric metrics and a valid name
  const names = await getCountryNames();
  const countries = Object.values(byISO3).filter(c => {
    if (!names[c.iso3]) return false;
    const metricCount = Object.keys(INDICATORS).filter(k => c[k] != null).length;
    return metricCount >= 5;
  });

  const payload = { countries, fetchedAt: Date.now() };
  worldBankCache.set('all_countries', payload);
  console.log(`[WorldBank] Dataset ready: ${countries.length} countries, ${Object.keys(INDICATORS).length} indicators`);
  return payload;
}

module.exports = { getAllCountryData, getCountryNames, INDICATORS };
