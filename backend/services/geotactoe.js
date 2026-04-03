/**
 * GeoTacToe — Game Engine
 * Board generation, room management, move validation
 */

const COUNTRIES = require('./geotactoe-countries.js');

// ── Continent lookup ────────────────────────────────────────────────────────
const CONTINENTS = {
  'Europe':["Albania","Andorra","Austria","Belarus","Belgium","Bosnia & Herz.","Bulgaria","Croatia","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Moldova","Monaco","Montenegro","Netherlands","North Macedonia","Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","UK","Ukraine","Vatican City"],
  'Africa':["Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cameroon","Cape Verde","Central African Rep.","Chad","Comoros","DR Congo","Congo","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Ivory Coast","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","São Tomé & Príncipe","Senegal","Seychelles","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe"],
  'Asia':["Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia","China","Cyprus","Georgia","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Laos","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","North Korea","Oman","Pakistan","Palestine","Philippines","Qatar","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Taiwan","Tajikistan","Thailand","Timor-Leste","Turkey","Turkmenistan","UAE","Uzbekistan","Vietnam","Yemen"],
  'Americas':["Antigua & Barbuda","Argentina","Bahamas","Barbados","Belize","Bolivia","Brazil","Canada","Chile","Colombia","Costa Rica","Cuba","Dominica","Dominican Rep.","Ecuador","El Salvador","Grenada","Guatemala","Guyana","Haiti","Honduras","Jamaica","Mexico","Nicaragua","Panama","Paraguay","Peru","Saint Kitts & Nevis","Saint Lucia","St. Vincent & Gren.","Suriname","Trinidad & Tobago","Uruguay","USA","Venezuela"],
  'Oceania':["Australia","Fiji","Kiribati","Marshall Islands","Micronesia","Nauru","New Zealand","Palau","Papua New Guinea","Samoa","Solomon Islands","Tonga","Tuvalu","Vanuatu"],
};

function getContinent(name) {
  for (const [cont, list] of Object.entries(CONTINENTS)) {
    if (list.includes(name)) return cont;
  }
  return null;
}

// ── Hardcoded trivia sets ───────────────────────────────────────────────────
const ISLAND_NATIONS = new Set(["Australia","Bahamas","Bahrain","Barbados","Brunei","Cape Verde","Comoros","Cuba","Cyprus","Dominica","Dominican Rep.","Fiji","Grenada","Haiti","Iceland","Indonesia","Ireland","Jamaica","Japan","Kiribati","Madagascar","Maldives","Malta","Marshall Islands","Mauritius","Micronesia","Nauru","New Zealand","Palau","Papua New Guinea","Philippines","Saint Kitts & Nevis","Saint Lucia","Samoa","São Tomé & Príncipe","Seychelles","Singapore","Solomon Islands","Sri Lanka","St. Vincent & Gren.","Taiwan","Timor-Leste","Tonga","Trinidad & Tobago","Tuvalu","UK","Vanuatu"]);

const HAS_DESERT = new Set(["Algeria","Australia","Bahrain","Botswana","Chad","China","Egypt","Eritrea","India","Iran","Iraq","Israel","Jordan","Kazakhstan","Kuwait","Libya","Mali","Mauritania","Mexico","Mongolia","Morocco","Namibia","Niger","Oman","Pakistan","Peru","Qatar","Saudi Arabia","Somalia","South Africa","Sudan","Syria","Tunisia","Turkmenistan","UAE","USA","Uzbekistan","Yemen"]);

const TOUCHES_PACIFIC = new Set(["Australia","Canada","Chile","China","Colombia","Costa Rica","Ecuador","El Salvador","Fiji","Guatemala","Honduras","Indonesia","Japan","Kiribati","Malaysia","Marshall Islands","Mexico","Micronesia","Myanmar","Nauru","New Zealand","Nicaragua","North Korea","Palau","Panama","Papua New Guinea","Peru","Philippines","Russia","Samoa","Singapore","Solomon Islands","South Korea","Taiwan","Thailand","Timor-Leste","Tonga","Tuvalu","USA","Vanuatu","Vietnam"]);

const TOUCHES_ATLANTIC = new Set(["Angola","Antigua & Barbuda","Argentina","Bahamas","Barbados","Belgium","Belize","Benin","Brazil","Cameroon","Canada","Cape Verde","Colombia","Congo","Cuba","Denmark","Dominica","Dominican Rep.","Equatorial Guinea","France","Gabon","Gambia","Germany","Ghana","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Iceland","Ireland","Ivory Coast","Jamaica","Liberia","Mauritania","Mexico","Morocco","Namibia","Netherlands","Nicaragua","Nigeria","Norway","Panama","Portugal","Saint Kitts & Nevis","Saint Lucia","São Tomé & Príncipe","Senegal","Sierra Leone","South Africa","Spain","St. Vincent & Gren.","Suriname","Sweden","Togo","Trinidad & Tobago","UK","Uruguay","USA","Venezuela"]);

const ON_EQUATOR = new Set(["Brazil","Colombia","Congo","DR Congo","Ecuador","Gabon","Indonesia","Kenya","Kiribati","Maldives","São Tomé & Príncipe","Somalia","Uganda"]);

const SOUTHERN_HEMI = new Set(["Angola","Argentina","Australia","Bolivia","Botswana","Brazil","Burundi","Chile","Comoros","DR Congo","Ecuador","Eswatini","Fiji","Indonesia","Kenya","Kiribati","Lesotho","Madagascar","Malawi","Mauritius","Mozambique","Namibia","Nauru","New Zealand","Papua New Guinea","Paraguay","Peru","Rwanda","Samoa","Solomon Islands","South Africa","Tanzania","Timor-Leste","Tonga","Tuvalu","Uruguay","Vanuatu","Zambia","Zimbabwe"]);

const HAS_MONARCHY = new Set(["Andorra","Antigua & Barbuda","Australia","Bahamas","Bahrain","Barbados","Belgium","Bhutan","Brunei","Cambodia","Canada","Denmark","Eswatini","Grenada","Jamaica","Japan","Jordan","Kuwait","Lesotho","Liechtenstein","Luxembourg","Malaysia","Monaco","Morocco","Netherlands","New Zealand","Norway","Oman","Papua New Guinea","Qatar","Saint Kitts & Nevis","Saint Lucia","Samoa","Saudi Arabia","Solomon Islands","Spain","Sweden","Thailand","Tonga","Tuvalu","UAE","UK","Vatican City"]);

const DRIVES_LEFT = new Set(["Antigua & Barbuda","Australia","Bahamas","Bangladesh","Barbados","Bhutan","Botswana","Brunei","Cyprus","Dominica","Eswatini","Fiji","Grenada","Guyana","India","Indonesia","Ireland","Jamaica","Japan","Kenya","Kiribati","Lesotho","Malawi","Malaysia","Maldives","Malta","Mauritius","Mozambique","Namibia","Nauru","Nepal","New Zealand","Pakistan","Papua New Guinea","Saint Kitts & Nevis","Saint Lucia","Samoa","Singapore","Solomon Islands","South Africa","Sri Lanka","St. Vincent & Gren.","Suriname","Tanzania","Thailand","Timor-Leste","Tonga","Trinidad & Tobago","Tuvalu","Uganda","UK","Zambia","Zimbabwe"]);

const RED_IN_FLAG = new Set(["Albania","Algeria","Angola","Antigua & Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia & Herz.","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Rep.","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Czech Republic","Denmark","Djibouti","Dominica","Dominican Rep.","DR Congo","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts & Nevis","Samoa","São Tomé & Príncipe","Senegal","Serbia","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","UK","Ukraine","UAE","USA","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen","Zimbabwe"]);

const BLUE_IN_FLAG = new Set(["Argentina","Australia","Azerbaijan","Bahamas","Barbados","Belize","Bhutan","Bolivia","Bosnia & Herz.","Botswana","Brazil","Brunei","Bulgaria","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Rep.","Chad","Chile","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Czech Republic","Djibouti","Dominica","Dominican Rep.","DR Congo","Ecuador","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Greece","Guatemala","Guinea-Bissau","Haiti","Honduras","Iceland","India","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Laos","Lesotho","Liberia","Liechtenstein","Luxembourg","Malaysia","Maldives","Marshall Islands","Mauritius","Micronesia","Moldova","Mongolia","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","North Korea","Norway","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Romania","Russia","Rwanda","Saint Lucia","Samoa","San Marino","São Tomé & Príncipe","Serbia","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St. Vincent & Gren.","Sudan","Suriname","Sweden","Taiwan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad & Tobago","Tuvalu","UK","Ukraine","Uruguay","USA","Uzbekistan","Vanuatu","Venezuela"]);

const STAR_ON_FLAG = new Set(["Algeria","Angola","Australia","Azerbaijan","Bosnia & Herz.","Brazil","Burkina Faso","Burundi","Cameroon","Cape Verde","Central African Rep.","Chile","China","Comoros","Cuba","Djibouti","DR Congo","East Timor","Egypt","Equatorial Guinea","Ethiopia","Ghana","Grenada","Guinea-Bissau","Honduras","India","Iraq","Israel","Jordan","Kenya","Kiribati","Liberia","Libya","Malaysia","Mali","Marshall Islands","Mauritania","Micronesia","Morocco","Mozambique","Myanmar","Nauru","New Zealand","Niger","Nigeria","North Korea","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Philippines","Rwanda","Saint Kitts & Nevis","Samoa","São Tomé & Príncipe","Senegal","Singapore","Slovenia","Solomon Islands","Somalia","South Sudan","Suriname","Syria","Taiwan","Tajikistan","Tanzania","Timor-Leste","Togo","Tunisia","Turkey","Turkmenistan","Tuvalu","USA","Uzbekistan","Vanuatu","Venezuela","Vietnam","Zimbabwe"]);

const USES_EURO = new Set(["Andorra","Austria","Belgium","Croatia","Cyprus","Estonia","Finland","France","Germany","Greece","Ireland","Italy","Latvia","Lithuania","Luxembourg","Malta","Monaco","Netherlands","Portugal","San Marino","Slovakia","Slovenia","Spain","Vatican City"]);

const SPEAKS_FRENCH = new Set(["Belgium","Benin","Burkina Faso","Burundi","Cameroon","Canada","Central African Rep.","Chad","Comoros","Congo","DR Congo","Djibouti","Equatorial Guinea","France","Gabon","Guinea","Haiti","Ivory Coast","Luxembourg","Madagascar","Mali","Mauritania","Monaco","Niger","Rwanda","Senegal","Switzerland","Togo","Tunisia","Vanuatu"]);

const SPEAKS_SPANISH = new Set(["Argentina","Bolivia","Chile","Colombia","Costa Rica","Cuba","Dominican Rep.","Ecuador","El Salvador","Equatorial Guinea","Guatemala","Honduras","Mexico","Nicaragua","Panama","Paraguay","Peru","Spain","Uruguay","Venezuela"]);

const SPEAKS_ARABIC = new Set(["Algeria","Bahrain","Chad","Comoros","Djibouti","Egypt","Eritrea","Iraq","Jordan","Kuwait","Lebanon","Libya","Mali","Mauritania","Morocco","Oman","Palestine","Qatar","Saudi Arabia","Somalia","South Sudan","Sudan","Syria","Tunisia","UAE","Yemen"]);

const HOSTED_OLYMPICS = new Set(["Australia","Austria","Belgium","Brazil","Canada","China","Finland","France","Germany","Greece","Italy","Japan","Mexico","Netherlands","Norway","Russia","South Korea","Spain","Sweden","Switzerland","UK","USA","Yugoslavia"]);

const HOSTED_WORLD_CUP = new Set(["Argentina","Brazil","Canada","Chile","France","Germany","Italy","Japan","Mexico","Qatar","Russia","South Africa","South Korea","Spain","Sweden","Switzerland","UK","Uruguay","USA"]);

// ── Criteria definitions ────────────────────────────────────────────────────
const ALL_CRITERIA = [
  // ── Name-based (all share cat 'letter' so max 1 letter criterion per board) ──
  { id: 'startsS',    label: 'Starts with "S"',      icon: '🔤', cat: 'letter', test: c => c.n.startsWith('S') },
  { id: 'startsC',    label: 'Starts with "C"',      icon: '🔤', cat: 'letter', test: c => c.n.startsWith('C') },
  { id: 'startsM',    label: 'Starts with "M"',      icon: '🔤', cat: 'letter', test: c => c.n.startsWith('M') },
  { id: 'startsB',    label: 'Starts with "B"',      icon: '🔤', cat: 'letter', test: c => c.n.startsWith('B') },
  { id: 'startsA',    label: 'Starts with "A"',      icon: '🔤', cat: 'letter', test: c => c.n.startsWith('A') },
  { id: 'startsG',    label: 'Starts with "G"',      icon: '🔤', cat: 'letter', test: c => c.n.startsWith('G') },
  { id: 'startsN',    label: 'Starts with "N"',      icon: '🔤', cat: 'letter', test: c => c.n.startsWith('N') },
  { id: 'startsT',    label: 'Starts with "T"',      icon: '🔤', cat: 'letter', test: c => c.n.startsWith('T') },
  { id: 'startsVowel',label: 'Starts with a vowel',  icon: '🅰️', cat: 'vowel',  test: c => 'AEIOU'.includes(c.n[0]) },
  { id: 'endsStan',   label: 'Ends in "-stan"',      icon: '🏔️', cat: 'ending', test: c => c.n.toLowerCase().endsWith('stan') },
  { id: 'endsIA',     label: 'Ends in "-ia"',        icon: '✏️', cat: 'ending', test: c => c.n.toLowerCase().endsWith('ia') },
  { id: 'endsLand',   label: 'Ends in "-land"',      icon: '🏞️', cat: 'ending', test: c => c.n.toLowerCase().endsWith('land') },
  { id: 'name4',      label: '4-letter name',        icon: '🔡', cat: 'namelen',test: c => c.n.replace(/[^a-zA-Z]/g,'').length === 4 },
  { id: 'name10',     label: '10+ letter name',      icon: '📏', cat: 'namelen',test: c => c.n.replace(/[^a-zA-Z]/g,'').length >= 10 },
  { id: 'hasZ',       label: 'Contains "Z"',         icon: '💤', cat: 'namehas',test: c => c.n.toUpperCase().includes('Z') },
  { id: 'twoWord',    label: 'Two-word name',        icon: '📝', cat: 'namehas',test: c => c.n.includes(' ') },

  // ── Geography ──
  { id: 'island',     label: 'Island nation',        icon: '🏝️', cat: 'island',  test: c => ISLAND_NATIONS.has(c.n) },
  { id: 'landlocked', label: 'Landlocked',           icon: '🔒', cat: 'locked',  test: c => c.coast === 0 },
  { id: 'pacific',    label: 'Touches Pacific',      icon: '🌊', cat: 'pacific', test: c => TOUCHES_PACIFIC.has(c.n) },
  { id: 'atlantic',   label: 'Touches Atlantic',     icon: '🌊', cat: 'atlantic',test: c => TOUCHES_ATLANTIC.has(c.n) },
  { id: 'equator',    label: 'On the Equator',       icon: '🌡️', cat: 'equator', test: c => ON_EQUATOR.has(c.n) },
  { id: 'southern',   label: 'Southern Hemisphere',  icon: '🧭', cat: 'hemi',    test: c => SOUTHERN_HEMI.has(c.n) },
  { id: 'desert',     label: 'Has a desert',         icon: '🏜️', cat: 'desert',  test: c => HAS_DESERT.has(c.n) },
  { id: 'bigIndia',   label: 'Bigger than India',    icon: '🗺️', cat: 'bigI',    test: c => c.area > 3_200_000 },
  { id: 'smBelgium',  label: 'Smaller than Belgium', icon: '🔬', cat: 'smB',     test: c => c.area < 30_000 && c.area > 0 },

  // ── Trivia / Culture ──
  { id: 'monarchy',   label: 'Has a monarchy',       icon: '👑', cat: 'monarch', test: c => HAS_MONARCHY.has(c.n) },
  { id: 'drivesLeft', label: 'Drives on the left',   icon: '🚗', cat: 'driveL',  test: c => DRIVES_LEFT.has(c.n) },
  { id: 'redFlag',    label: 'Red in the flag',      icon: '🔴', cat: 'flagR',   test: c => RED_IN_FLAG.has(c.n) },
  { id: 'blueFlag',   label: 'Blue in the flag',     icon: '🔵', cat: 'flagB',   test: c => BLUE_IN_FLAG.has(c.n) },
  { id: 'starFlag',   label: 'Star on the flag',     icon: '⭐', cat: 'flagSt',  test: c => STAR_ON_FLAG.has(c.n) },
  { id: 'usesEuro',   label: 'Uses the Euro',        icon: '💶', cat: 'euro',    test: c => USES_EURO.has(c.n) },
  { id: 'frenchSpk',  label: 'French-speaking',      icon: '🇫🇷', cat: 'langFR',  test: c => SPEAKS_FRENCH.has(c.n) },
  { id: 'spanishSpk', label: 'Spanish-speaking',     icon: '🇪🇸', cat: 'langES',  test: c => SPEAKS_SPANISH.has(c.n) },
  { id: 'arabicSpk',  label: 'Arabic-speaking',      icon: '🕌', cat: 'langAR',  test: c => SPEAKS_ARABIC.has(c.n) },
  { id: 'olympics',   label: 'Hosted Olympics',       icon: '🏅', cat: 'oly',     test: c => HOSTED_OLYMPICS.has(c.n) },
  { id: 'worldcup',   label: 'Hosted World Cup',     icon: '⚽', cat: 'wc',      test: c => HOSTED_WORLD_CUP.has(c.n) },

  // ── People / Lifestyle ──
  { id: 'mega',       label: '100M+ people',         icon: '🏙️', cat: 'mega',    test: c => c.pop >= 100_000_000 },
  { id: 'tiny',       label: 'Under 1M people',      icon: '🏘️', cat: 'tiny',    test: c => c.pop < 1_000_000 },
  { id: 'live80',     label: 'Lives past 80',        icon: '🧓', cat: 'live80',  test: c => c.lifeExp >= 80 },
  { id: 'online90',   label: '90%+ internet',        icon: '📶', cat: 'on90',    test: c => c.internet >= 90 },

  // ── Regions ──
  { id: 'europe',     label: 'In Europe',            icon: '🇪🇺', cat: 'reg1',    test: c => getContinent(c.n) === 'Europe' },
  { id: 'africa',     label: 'In Africa',            icon: '🌍', cat: 'reg2',    test: c => getContinent(c.n) === 'Africa' },
  { id: 'asia',       label: 'In Asia',              icon: '🌏', cat: 'reg3',    test: c => getContinent(c.n) === 'Asia' },
  { id: 'americas',   label: 'In the Americas',      icon: '🌎', cat: 'reg4',    test: c => getContinent(c.n) === 'Americas' },
];

// ── Board Generation ────────────────────────────────────────────────────────
function getMatchingCountries(rowCrit, colCrit) {
  return COUNTRIES.filter(c => rowCrit.test(c) && colCrit.test(c)).map(c => c.n);
}

function generateBoard() {
  for (let attempt = 0; attempt < 300; attempt++) {
    const pool = [...ALL_CRITERIA].sort(() => Math.random() - 0.5);
    const usedCats = new Set();
    const rows = [];
    const cols = [];

    for (const crit of pool) {
      if (rows.length < 3 && !usedCats.has(crit.cat)) {
        rows.push(crit);
        usedCats.add(crit.cat);
      }
    }
    for (const crit of pool) {
      if (cols.length < 3 && !usedCats.has(crit.cat)) {
        cols.push(crit);
        usedCats.add(crit.cat);
      }
    }
    if (rows.length < 3 || cols.length < 3) continue;

    let valid = true;
    const cellAnswers = [];
    for (let r = 0; r < 3; r++) {
      for (let cl = 0; cl < 3; cl++) {
        const matches = getMatchingCountries(rows[r], cols[cl]);
        if (matches.length < 3) { valid = false; break; }
        cellAnswers.push(matches);
      }
      if (!valid) break;
    }

    if (valid) {
      return {
        rows: rows.map(c => ({ id: c.id, label: c.label, icon: c.icon })),
        cols: cols.map(c => ({ id: c.id, label: c.label, icon: c.icon })),
        _rows: rows, _cols: cols, _cellAnswers: cellAnswers,
      };
    }
  }

  // Fallback
  const rows = [
    ALL_CRITERIA.find(c => c.id === 'island'),
    ALL_CRITERIA.find(c => c.id === 'startsS'),
    ALL_CRITERIA.find(c => c.id === 'monarchy'),
  ];
  const cols = [
    ALL_CRITERIA.find(c => c.id === 'europe'),
    ALL_CRITERIA.find(c => c.id === 'asia'),
    ALL_CRITERIA.find(c => c.id === 'redFlag'),
  ];
  const cellAnswers = [];
  for (let r = 0; r < 3; r++) {
    for (let cl = 0; cl < 3; cl++) {
      cellAnswers.push(getMatchingCountries(rows[r], cols[cl]));
    }
  }
  return {
    rows: rows.map(c => ({ id: c.id, label: c.label })),
    cols: cols.map(c => ({ id: c.id, label: c.label })),
    _rows: rows, _cols: cols, _cellAnswers: cellAnswers,
  };
}

// ── Room Management ─────────────────────────────────────────────────────────
const rooms = new Map();
const TURN_TIME_MS = 60_000; // 60 seconds per turn

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function generateCode() {
  let code;
  do {
    code = Array.from({ length: 6 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
  } while (rooms.has(code));
  return code;
}

function sanitizeProfile(p) {
  if (!p || typeof p !== 'object') return { username: 'Player', lvl: 1, avatar: null };
  return {
    username: (typeof p.username === 'string' ? p.username.slice(0, 30) : 'Player'),
    lvl: Math.max(1, Math.min(10, parseInt(p.lvl) || 1)),
    avatar: p.avatar && typeof p.avatar === 'object' ? {
      skin: Math.max(0, Math.min(4, parseInt(p.avatar.skin) || 0)),
      hair: Math.max(0, Math.min(4, parseInt(p.avatar.hair) || 0)),
      hairColor: Math.max(0, Math.min(5, parseInt(p.avatar.hairColor) || 0)),
      eyes: Math.max(0, Math.min(3, parseInt(p.avatar.eyes) || 0)),
      mouth: Math.max(0, Math.min(3, parseInt(p.avatar.mouth) || 0)),
      beard: Math.max(0, Math.min(3, parseInt(p.avatar.beard) || 0)),
    } : null,
  };
}

function createRoom(socketId, profile) {
  const code = generateCode();
  const board = generateBoard();
  const room = {
    code,
    players: [socketId],
    profiles: [sanitizeProfile(profile)],
    board,
    cells: Array(9).fill(null),
    usedCountries: new Set(),
    turn: Math.random() < 0.5 ? 0 : 1,
    scores: [0, 0],
    round: 1,
    consecutiveSkips: 0,
    turnDeadline: null,
    drawProposedBy: null,  // null | 0 | 1 — which player proposed draw
    status: 'waiting',
    createdAt: Date.now(),
  };
  rooms.set(code, room);
  return room;
}

function joinRoom(code, socketId, profile) {
  const room = rooms.get(code);
  if (!room)                           return { error: 'ROOM_NOT_FOUND' };
  if (room.players.length >= 2)        return { error: 'ROOM_FULL' };
  if (room.players.includes(socketId)) return { error: 'ALREADY_IN_ROOM' };
  room.players.push(socketId);
  room.profiles.push(sanitizeProfile(profile));
  room.status = 'playing';
  room.turnDeadline = Date.now() + TURN_TIME_MS;
  return { room };
}

function makeMove(code, socketId, cellIdx, countryName) {
  const room = rooms.get(code);
  if (!room)                            return { error: 'ROOM_NOT_FOUND' };
  if (room.status !== 'playing')        return { error: 'GAME_NOT_ACTIVE' };

  const playerIdx = room.players.indexOf(socketId);
  if (playerIdx === -1)                 return { error: 'NOT_IN_ROOM' };
  if (playerIdx !== room.turn)          return { error: 'NOT_YOUR_TURN' };
  if (cellIdx < 0 || cellIdx > 8)       return { error: 'INVALID_CELL' };
  if (room.cells[cellIdx] !== null)     return { error: 'CELL_TAKEN' };

  // Check if country was already used this round
  const normName = countryName.trim();
  if (room.usedCountries.has(normName.toLowerCase())) {
    // Wrong answer → switch turn
    room.turn = 1 - room.turn;
    room.turnDeadline = Date.now() + TURN_TIME_MS;
    room.consecutiveSkips = 0;
    return { error: 'COUNTRY_USED', switchedTurn: true, room };
  }

  // Validate: does country exist?
  const country = COUNTRIES.find(c => c.n.toLowerCase() === normName.toLowerCase());
  if (!country) {
    room.turn = 1 - room.turn;
    room.turnDeadline = Date.now() + TURN_TIME_MS;
    room.consecutiveSkips = 0;
    return { error: 'COUNTRY_NOT_FOUND', switchedTurn: true, room };
  }

  // Validate: does country match both row and col criteria?
  const row = Math.floor(cellIdx / 3);
  const col = cellIdx % 3;
  const rowCrit = room.board._rows[row];
  const colCrit = room.board._cols[col];
  if (!rowCrit.test(country) || !colCrit.test(country)) {
    // Wrong answer → switch turn
    room.turn = 1 - room.turn;
    room.turnDeadline = Date.now() + TURN_TIME_MS;
    room.consecutiveSkips = 0;
    return { error: 'COUNTRY_NO_MATCH', switchedTurn: true, room };
  }

  // Valid move — place it
  room.cells[cellIdx] = { player: playerIdx, country: country.n, flag: country.f };
  room.usedCountries.add(country.n.toLowerCase());
  room.consecutiveSkips = 0;

  // Check for win
  const winner = checkWin(room.cells);
  if (winner !== null) {
    room.scores[winner]++;
    room.status = 'round_over';
    return { room, roundWinner: winner, matchWinner: room.scores[winner] >= 2 ? winner : null };
  }

  // Check for full board → draw
  if (room.cells.every(c => c !== null)) {
    room.status = 'round_over';
    return { room, roundWinner: -1, matchWinner: null };
  }

  // Switch turn
  room.turn = 1 - room.turn;
  room.turnDeadline = Date.now() + TURN_TIME_MS;
  return { room };
}

function skipTurn(code, socketId) {
  const room = rooms.get(code);
  if (!room)                            return { error: 'ROOM_NOT_FOUND' };
  if (room.status !== 'playing')        return { error: 'GAME_NOT_ACTIVE' };

  const playerIdx = room.players.indexOf(socketId);
  if (playerIdx !== room.turn)          return { error: 'NOT_YOUR_TURN' };

  room.turn = 1 - room.turn;
  room.turnDeadline = Date.now() + TURN_TIME_MS;
  return { room };
}

function proposeDraw(code, socketId) {
  const room = rooms.get(code);
  if (!room)                            return { error: 'ROOM_NOT_FOUND' };
  if (room.status !== 'playing')        return { error: 'GAME_NOT_ACTIVE' };

  const playerIdx = room.players.indexOf(socketId);
  if (playerIdx === -1)                 return { error: 'NOT_IN_ROOM' };

  // Already proposed by this player
  if (room.drawProposedBy === playerIdx) return { error: 'ALREADY_PROPOSED' };

  // Other player already proposed → accept = draw
  if (room.drawProposedBy !== null && room.drawProposedBy !== playerIdx) {
    room.status = 'round_over';
    room.drawProposedBy = null;
    return { room, roundWinner: -1, matchWinner: null };
  }

  // First proposal
  room.drawProposedBy = playerIdx;
  return { room, drawProposed: true };
}

function cancelDraw(code, socketId) {
  const room = rooms.get(code);
  if (!room) return { error: 'ROOM_NOT_FOUND' };
  const playerIdx = room.players.indexOf(socketId);
  if (room.drawProposedBy === playerIdx) {
    room.drawProposedBy = null;
  }
  return { room };
}

function timeoutTurn(code) {
  const room = rooms.get(code);
  if (!room || room.status !== 'playing') return null;
  room.turn = 1 - room.turn;
  room.turnDeadline = Date.now() + TURN_TIME_MS;
  return { room };
}

function nextRound(code) {
  const room = rooms.get(code);
  if (!room) return null;

  if (room.scores[0] >= 2 || room.scores[1] >= 2) {
    room.status = 'match_over';
    return room;
  }

  room.board = generateBoard();
  room.cells = Array(9).fill(null);
  room.usedCountries = new Set();
  room.turn = 0;
  room.round++;
  room.consecutiveSkips = 0;
  room.drawProposedBy = null;
  room.turnDeadline = Date.now() + TURN_TIME_MS;
  room.status = 'playing';
  return room;
}

function checkWin(cells) {
  const LINES = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of LINES) {
    if (cells[a] && cells[b] && cells[c] &&
        cells[a].player === cells[b].player &&
        cells[b].player === cells[c].player) {
      return cells[a].player;
    }
  }
  return null;
}

function buildState(room, socketId) {
  const playerIdx = room.players.indexOf(socketId);
  return {
    code:    room.code,
    cells:   room.cells,
    rows:    room.board.rows,
    cols:    room.board.cols,
    turn:    room.turn,
    myIdx:   playerIdx,
    isMyTurn: room.turn === playerIdx,
    scores:  room.scores,
    round:   room.round,
    status:  room.status,
    usedCountries: [...room.usedCountries],
    turnDeadline: room.turnDeadline,
    drawProposedBy: room.drawProposedBy,
    profiles: room.profiles || [],
  };
}

function removePlayer(socketId) {
  for (const [code, room] of rooms.entries()) {
    if (!room.players.includes(socketId)) continue;
    room.players = room.players.filter(p => p !== socketId);
    if (room.players.length === 0) {
      rooms.delete(code);
    } else {
      room.status = 'abandoned';
    }
    return { code, room };
  }
  return null;
}

// Cleanup old rooms every 30 min
setInterval(() => {
  const cutoff = Date.now() - 2 * 60 * 60 * 1000;
  for (const [code, room] of rooms.entries()) {
    if (room.createdAt < cutoff) rooms.delete(code);
  }
}, 30 * 60 * 1000);

function getRoom(code) { return rooms.get(code) || null; }

module.exports = {
  COUNTRIES, TURN_TIME_MS,
  createRoom, joinRoom, makeMove, skipTurn, proposeDraw, cancelDraw, timeoutTurn, nextRound,
  removePlayer, buildState, generateBoard, getRoom,
};
