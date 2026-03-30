/**
 * BorderRun Multiplayer — Game Engine
 * Border graph, BFS, room management, move validation
 */

// ── Land Border Adjacency Graph (ISO3) ────────────────────────────────────────
const BORDERS = {
  AFG: ['IRN','PAK','TJK','TKM','UZB','CHN'],
  ALB: ['GRC','MKD','MNE','SRB','XKX'],
  DZA: ['LBY','MAR','MRT','MLI','NER','TUN'],
  AND: ['FRA','ESP'],
  AGO: ['COD','COG','NAM','ZMB'],
  ARG: ['BOL','BRA','CHL','PRY','URY'],
  ARM: ['AZE','GEO','IRN','TUR'],
  AUT: ['CZE','DEU','HUN','ITA','LIE','SVK','SVN','CHE'],
  AZE: ['ARM','GEO','IRN','RUS','TUR'],
  BGD: ['IND','MMR'],
  BLR: ['LVA','LTU','POL','RUS','UKR'],
  BEL: ['FRA','DEU','LUX','NLD'],
  BLZ: ['GTM','MEX'],
  BEN: ['BFA','NER','NGA','TGO'],
  BTN: ['CHN','IND'],
  BOL: ['ARG','BRA','CHL','PRY','PER'],
  BIH: ['HRV','MNE','SRB'],
  BWA: ['NAM','ZAF','ZMB','ZWE'],
  BRA: ['ARG','BOL','COL','GUY','PRY','PER','SUR','URY','VEN','GUF'],
  BRN: ['MYS'],
  BGR: ['GRC','MKD','ROU','SRB','TUR'],
  BFA: ['BEN','GHA','CIV','MLI','NER','TGO'],
  BDI: ['COD','RWA','TZA'],
  KHM: ['LAO','THA','VNM'],
  CMR: ['CAF','TCD','COG','GNQ','GAB','NGA'],
  CAN: ['USA'],
  CAF: ['CMR','TCD','COD','COG','SSD','SDN'],
  TCD: ['CAF','LBY','NER','NGA','SDN','CMR'],
  CHL: ['ARG','BOL','PER'],
  CHN: ['AFG','BTN','IND','KAZ','PRK','KGZ','LAO','MNG','MMR','NPL','PAK','RUS','TJK','VNM'],
  COL: ['BRA','ECU','PAN','PER','VEN'],
  COD: ['AGO','BDI','CAF','COG','RWA','SSD','TZA','UGA','ZMB'],
  COG: ['AGO','CAF','CMR','COD','GAB'],
  CRI: ['NIC','PAN'],
  HRV: ['BIH','HUN','MNE','SRB','SVN'],
  CZE: ['AUT','DEU','POL','SVK'],
  DNK: ['DEU'],
  DJI: ['ERI','ETH','SOM'],
  DOM: ['HTI'],
  ECU: ['COL','PER'],
  EGY: ['ISR','LBY','SDN'],
  SLV: ['GTM','HND'],
  GNQ: ['CMR','GAB'],
  ERI: ['DJI','ETH','SDN'],
  EST: ['LVA','RUS'],
  SWZ: ['MOZ','ZAF'],
  ETH: ['DJI','ERI','KEN','SOM','SSD','SDN'],
  FIN: ['NOR','RUS','SWE'],
  FRA: ['AND','BEL','DEU','ITA','LUX','MCO','ESP','CHE'],
  GAB: ['CMR','COG','GNQ'],
  GMB: ['SEN'],
  GEO: ['ARM','AZE','RUS','TUR'],
  DEU: ['AUT','BEL','CZE','DNK','FRA','LUX','NLD','POL','CHE'],
  GHA: ['BFA','CIV','TGO'],
  GRC: ['ALB','BGR','MKD','TUR'],
  GTM: ['BLZ','SLV','HND','MEX'],
  GIN: ['GNB','CIV','LBR','MLI','SEN','SLE'],
  GNB: ['GIN','SEN'],
  GUF: ['BRA','SUR'],
  GUY: ['BRA','SUR','VEN'],
  HTI: ['DOM'],
  HND: ['GTM','NIC','SLV'],
  HUN: ['AUT','HRV','ROU','SRB','SVK','SVN','UKR'],
  IND: ['BGD','BTN','CHN','MMR','NPL','PAK'],
  IDN: ['PNG','TLS','MYS'],
  IRN: ['AFG','ARM','AZE','IRQ','PAK','TUR','TKM'],
  IRQ: ['IRN','JOR','KWT','SAU','SYR','TUR'],
  IRL: ['GBR'],
  ISR: ['EGY','JOR','LBN','SYR'],
  ITA: ['AUT','FRA','SMR','SVN','CHE','VAT'],
  CIV: ['GHA','GIN','LBR','MLI','BFA'],
  JOR: ['IRQ','ISR','SAU','SYR'],
  KAZ: ['CHN','KGZ','RUS','TKM','UZB'],
  KEN: ['ETH','SOM','SSD','TZA','UGA'],
  PRK: ['CHN','RUS','KOR'],
  KOR: ['PRK'],
  KWT: ['IRQ','SAU'],
  KGZ: ['CHN','KAZ','TJK','UZB'],
  LAO: ['CHN','KHM','MMR','THA','VNM'],
  LVA: ['BLR','EST','LTU','RUS'],
  LBN: ['ISR','SYR'],
  LSO: ['ZAF'],
  LBR: ['CIV','GIN','SLE'],
  LBY: ['DZA','TCD','EGY','NER','SDN','TUN'],
  LIE: ['AUT','CHE'],
  LTU: ['BLR','LVA','POL','RUS'],
  LUX: ['BEL','FRA','DEU'],
  MKD: ['ALB','BGR','GRC','SRB','XKX'],
  MWI: ['MOZ','TZA','ZMB'],
  MYS: ['BRN','IDN','THA'],
  MLI: ['DZA','BFA','GIN','MRT','NER','SEN'],
  MRT: ['DZA','MLI','SEN'],
  MEX: ['BLZ','GTM','USA'],
  MDA: ['ROU','UKR'],
  MCO: ['FRA'],
  MNG: ['CHN','RUS'],
  MNE: ['ALB','BIH','HRV','SRB','XKX'],
  MAR: ['DZA','ESP','MRT'],
  MOZ: ['MWI','ZAF','SWZ','TZA','ZMB','ZWE'],
  MMR: ['BGD','CHN','IND','LAO','THA'],
  NAM: ['AGO','BWA','ZAF','ZMB'],
  NPL: ['CHN','IND'],
  NLD: ['BEL','DEU'],
  NIC: ['CRI','HND'],
  NER: ['DZA','BEN','BFA','TCD','LBY','MLI','NGA'],
  NGA: ['BEN','CMR','TCD','NER'],
  NOR: ['FIN','RUS','SWE'],
  OMN: ['SAU','ARE','YEM'],
  PAK: ['AFG','CHN','IND','IRN'],
  PAN: ['COL','CRI'],
  PNG: ['IDN'],
  PRY: ['ARG','BOL','BRA'],
  PER: ['BOL','BRA','CHL','COL','ECU'],
  POL: ['BLR','CZE','DEU','LTU','RUS','SVK','UKR'],
  PRT: ['ESP'],
  QAT: ['SAU'],
  ROU: ['BGR','HUN','MDA','SRB','UKR'],
  RUS: ['AZE','BLR','CHN','EST','FIN','GEO','KAZ','PRK','LVA','LTU','MNG','NOR','POL','UKR'],
  RWA: ['BDI','COD','TZA','UGA'],
  SAU: ['IRQ','JOR','KWT','OMN','QAT','ARE','YEM'],
  SEN: ['GMB','GIN','GNB','MLI','MRT'],
  SRB: ['BIH','BGR','HRV','HUN','MKD','MNE','ROU','XKX'],
  SLE: ['GIN','LBR'],
  SMR: ['ITA'],
  SVK: ['AUT','CZE','HUN','POL','UKR'],
  SVN: ['AUT','HRV','ITA','HUN'],
  SOM: ['DJI','ETH','KEN'],
  ZAF: ['BWA','LSO','MOZ','NAM','SWZ','ZWE'],
  SSD: ['CAF','COD','ETH','KEN','SDN','UGA'],
  ESP: ['AND','FRA','PRT','MAR'],
  SDN: ['CAF','TCD','EGY','ERI','ETH','LBY','SSD'],
  SUR: ['BRA','GUY','GUF'],
  SWE: ['FIN','NOR'],
  CHE: ['AUT','FRA','DEU','ITA','LIE'],
  SYR: ['IRQ','ISR','JOR','LBN','TUR'],
  TJK: ['AFG','CHN','KGZ','UZB'],
  TZA: ['BDI','COD','KEN','MWI','MOZ','RWA','UGA','ZMB'],
  THA: ['KHM','LAO','MYS','MMR'],
  TLS: ['IDN'],
  TGO: ['BEN','BFA','GHA'],
  TUN: ['DZA','LBY'],
  TUR: ['ARM','AZE','BGR','GEO','GRC','IRN','IRQ','SYR'],
  TKM: ['AFG','IRN','KAZ','UZB'],
  UGA: ['COD','KEN','RWA','SSD','TZA'],
  UKR: ['BLR','HUN','MDA','POL','ROU','RUS','SVK'],
  ARE: ['OMN','SAU'],
  GBR: ['IRL'],
  USA: ['CAN','MEX'],
  URY: ['ARG','BRA'],
  UZB: ['AFG','KAZ','KGZ','TJK','TKM'],
  VAT: ['ITA'],
  VEN: ['BRA','COL','GUY'],
  VNM: ['KHM','CHN','LAO'],
  YEM: ['OMN','SAU'],
  XKX: ['ALB','MKD','MNE','SRB'],
  ZMB: ['AGO','BWA','COD','MWI','MOZ','NAM','TZA','ZWE'],
  ZWE: ['BWA','MOZ','ZAF','ZMB'],
};

const COUNTRY_NAMES = {
  AFG:'Afghanistan', ALB:'Albania', DZA:'Algeria', AND:'Andorra', AGO:'Angola',
  ARG:'Argentina', ARM:'Armenia', AUT:'Austria', AZE:'Azerbaijan', BGD:'Bangladesh',
  BLR:'Belarus', BEL:'Belgium', BLZ:'Belize', BEN:'Benin', BTN:'Bhutan',
  BOL:'Bolivia', BIH:'Bosnia & Herz.', BWA:'Botswana', BRA:'Brazil', BRN:'Brunei',
  BGR:'Bulgaria', BFA:'Burkina Faso', BDI:'Burundi', KHM:'Cambodia', CMR:'Cameroon',
  CAN:'Canada', CAF:'Central African Rep.', TCD:'Chad', CHL:'Chile', CHN:'China',
  COL:'Colombia', COD:'DR Congo', COG:'Congo', CRI:'Costa Rica', HRV:'Croatia',
  CZE:'Czech Republic', DNK:'Denmark', DJI:'Djibouti', DOM:'Dominican Rep.', ECU:'Ecuador',
  EGY:'Egypt', SLV:'El Salvador', GNQ:'Equatorial Guinea', ERI:'Eritrea', EST:'Estonia',
  SWZ:'Eswatini', ETH:'Ethiopia', FIN:'Finland', FRA:'France', GAB:'Gabon',
  GMB:'Gambia', GEO:'Georgia', DEU:'Germany', GHA:'Ghana', GRC:'Greece',
  GTM:'Guatemala', GIN:'Guinea', GNB:'Guinea-Bissau', GUF:'French Guiana', GUY:'Guyana',
  HTI:'Haiti', HND:'Honduras', HUN:'Hungary', IND:'India', IDN:'Indonesia',
  IRN:'Iran', IRQ:'Iraq', IRL:'Ireland', ISR:'Israel', ITA:'Italy',
  CIV:'Ivory Coast', JOR:'Jordan', KAZ:'Kazakhstan', KEN:'Kenya', PRK:'North Korea',
  KOR:'South Korea', KWT:'Kuwait', KGZ:'Kyrgyzstan', LAO:'Laos', LVA:'Latvia',
  LBN:'Lebanon', LSO:'Lesotho', LBR:'Liberia', LBY:'Libya', LIE:'Liechtenstein',
  LTU:'Lithuania', LUX:'Luxembourg', MKD:'North Macedonia', MWI:'Malawi', MYS:'Malaysia',
  MLI:'Mali', MRT:'Mauritania', MEX:'Mexico', MDA:'Moldova', MCO:'Monaco',
  MNG:'Mongolia', MNE:'Montenegro', MAR:'Morocco', MOZ:'Mozambique', MMR:'Myanmar',
  NAM:'Namibia', NPL:'Nepal', NLD:'Netherlands', NIC:'Nicaragua', NER:'Niger',
  NGA:'Nigeria', NOR:'Norway', OMN:'Oman', PAK:'Pakistan', PAN:'Panama',
  PNG:'Papua New Guinea', PRY:'Paraguay', PER:'Peru', POL:'Poland', PRT:'Portugal',
  QAT:'Qatar', ROU:'Romania', RUS:'Russia', RWA:'Rwanda', SAU:'Saudi Arabia',
  SEN:'Senegal', SRB:'Serbia', SLE:'Sierra Leone', SMR:'San Marino', SVK:'Slovakia',
  SVN:'Slovenia', SOM:'Somalia', ZAF:'South Africa', SSD:'South Sudan', ESP:'Spain',
  SDN:'Sudan', SUR:'Suriname', SWE:'Sweden', CHE:'Switzerland', SYR:'Syria',
  TJK:'Tajikistan', TZA:'Tanzania', THA:'Thailand', TLS:'East Timor', TGO:'Togo',
  TUN:'Tunisia', TUR:'Turkey', TKM:'Turkmenistan', UGA:'Uganda', UKR:'Ukraine',
  ARE:'UAE', GBR:'UK', USA:'USA', URY:'Uruguay', UZB:'Uzbekistan',
  VAT:'Vatican City', VEN:'Venezuela', VNM:'Vietnam', YEM:'Yemen', XKX:'Kosovo',
  ZMB:'Zambia', ZWE:'Zimbabwe',
};

// ISO3 → ISO2 for flag images (flagcdn.com)
const ISO3_TO_2 = {
  AFG:'af',ALB:'al',DZA:'dz',AND:'ad',AGO:'ao',ARG:'ar',ARM:'am',AUT:'at',AZE:'az',
  BGD:'bd',BLR:'by',BEL:'be',BLZ:'bz',BEN:'bj',BTN:'bt',BOL:'bo',BIH:'ba',BWA:'bw',
  BRA:'br',BRN:'bn',BGR:'bg',BFA:'bf',BDI:'bi',KHM:'kh',CMR:'cm',CAN:'ca',CAF:'cf',
  TCD:'td',CHL:'cl',CHN:'cn',COL:'co',COD:'cd',COG:'cg',CRI:'cr',HRV:'hr',CZE:'cz',
  DNK:'dk',DJI:'dj',DOM:'do',ECU:'ec',EGY:'eg',SLV:'sv',GNQ:'gq',ERI:'er',EST:'ee',
  SWZ:'sz',ETH:'et',FIN:'fi',FRA:'fr',GAB:'ga',GMB:'gm',GEO:'ge',DEU:'de',GHA:'gh',
  GRC:'gr',GTM:'gt',GIN:'gn',GNB:'gw',GUF:'gf',GUY:'gy',HTI:'ht',HND:'hn',HUN:'hu',
  IND:'in',IDN:'id',IRN:'ir',IRQ:'iq',IRL:'ie',ISR:'il',ITA:'it',CIV:'ci',JOR:'jo',
  KAZ:'kz',KEN:'ke',PRK:'kp',KOR:'kr',KWT:'kw',KGZ:'kg',LAO:'la',LVA:'lv',LBN:'lb',
  LSO:'ls',LBR:'lr',LBY:'ly',LIE:'li',LTU:'lt',LUX:'lu',MKD:'mk',MWI:'mw',MYS:'my',
  MLI:'ml',MRT:'mr',MEX:'mx',MDA:'md',MCO:'mc',MNG:'mn',MNE:'me',MAR:'ma',MOZ:'mz',
  MMR:'mm',NAM:'na',NPL:'np',NLD:'nl',NIC:'ni',NER:'ne',NGA:'ng',NOR:'no',OMN:'om',
  PAK:'pk',PAN:'pa',PNG:'pg',PRY:'py',PER:'pe',POL:'pl',PRT:'pt',QAT:'qa',ROU:'ro',
  RUS:'ru',RWA:'rw',SAU:'sa',SEN:'sn',SRB:'rs',SLE:'sl',SMR:'sm',SVK:'sk',SVN:'si',
  SOM:'so',ZAF:'za',SSD:'ss',ESP:'es',SDN:'sd',SUR:'sr',SWE:'se',CHE:'ch',SYR:'sy',
  TJK:'tj',TZA:'tz',THA:'th',TLS:'tl',TGO:'tg',TUN:'tn',TUR:'tr',TKM:'tm',UGA:'ug',
  UKR:'ua',ARE:'ae',GBR:'gb',USA:'us',URY:'uy',UZB:'uz',VAT:'va',VEN:'ve',VNM:'vn',
  YEM:'ye',XKX:'xk',ZMB:'zm',ZWE:'zw',
};

// ── BFS shortest path ──────────────────────────────────────────────────────────
function bfs(start, target) {
  if (start === target) return 0;
  const visited = new Set([start]);
  const queue = [[start, 0]];
  while (queue.length) {
    const [curr, dist] = queue.shift();
    for (const nb of (BORDERS[curr] || [])) {
      if (nb === target) return dist + 1;
      if (!visited.has(nb)) {
        visited.add(nb);
        queue.push([nb, dist + 1]);
      }
    }
  }
  return Infinity;
}

// ── Match Generator ────────────────────────────────────────────────────────────
// Only countries with ≥2 land borders (no dead-end islands)
const VALID_COUNTRIES = Object.keys(BORDERS).filter(k => (BORDERS[k] || []).length >= 2);

const _f = arr => arr.filter(c => (BORDERS[c] || []).length >= 2);

// Europe only (≥2 borders each)
const EASY_POOL = _f([
  'ALB','AND','AUT','BLR','BEL','BIH','BGR','HRV','CZE','DNK','EST','FIN',
  'FRA','DEU','GRC','HUN','ITA','XKX','LVA','LIE','LTU','LUX','MKD',
  'MDA','MNE','NLD','NOR','POL','PRT','ROU','RUS','SRB','SVK',
  'SVN','ESP','SWE','CHE','UKR',
]);

// Europe + Asia (connected landmass, no Americas, no Africa)
const EURASIA_POOL = _f([
  'ALB','AND','AUT','BLR','BEL','BIH','BGR','HRV','CZE','DNK','EST','FIN',
  'FRA','DEU','GRC','HUN','ITA','XKX','LVA','LIE','LTU','LUX','MKD',
  'MDA','MNE','NLD','NOR','POL','PRT','ROU','RUS','SRB','SVK',
  'SVN','ESP','SWE','CHE','UKR',
  'AFG','ARM','AZE','BGD','BTN','KHM','CHN','GEO','IND','IDN','IRN',
  'IRQ','ISR','JOR','KAZ','PRK','KOR','KWT','KGZ','LAO','LBN','MYS','MNG',
  'MMR','NPL','OMN','PAK','QAT','SAU','SYR','TJK','THA','TUR','TKM',
  'ARE','UZB','VNM','YEM',
]);

// Americas only (isolated continent — no cross-ocean connections)
const AMERICAS_POOL = _f([
  'ARG','BLZ','BOL','BRA','CHL','COL','CRI','ECU','SLV','GUF',
  'GTM','GUY','HND','MEX','NIC','PAN','PRY','PER','SUR','USA','URY','VEN',
]);

// Africa (connects to Eurasia via Egypt-Israel / Morocco-Spain not in graph)
const AFRICA_POOL = _f([
  'DZA','AGO','BEN','BWA','BFA','BDI','CMR','CAF','TCD','COD','COG','DJI',
  'EGY','GNQ','ERI','ETH','GAB','GHA','GIN','GNB','CIV','KEN',
  'LBR','LBY','MWI','MLI','MRT','MAR','MOZ','NAM','NER','NGA','RWA',
  'SEN','SLE','SOM','ZAF','SSD','SDN','TZA','TGO','TUN','UGA','ZMB','ZWE',
]);

function generateMatch(difficulty = 'medium') {
  let pool, minHops, maxHops, fallback;
  if (difficulty === 'easy') {
    pool = EASY_POOL; minHops = 4; maxHops = 6;
    fallback = { start: 'DEU', target: 'ESP', optimalDist: 5 };
  } else if (difficulty === 'hard') {
    // 70% Eurasia+Africa (long cross-continental), 30% Americas
    pool = Math.random() < 0.7
      ? [...new Set([...EURASIA_POOL, ...AFRICA_POOL])]
      : AMERICAS_POOL;
    minHops = 7; maxHops = 11;
    fallback = { start: 'ZAF', target: 'RUS', optimalDist: 8 };
  } else {
    // medium: 65% Eurasia, 35% Americas (never mixes — continents are isolated)
    pool = Math.random() < 0.65 ? EURASIA_POOL : AMERICAS_POOL;
    minHops = 5; maxHops = 8;
    fallback = { start: 'DEU', target: 'CHN', optimalDist: 6 };
  }

  for (let i = 0; i < 400; i++) {
    const start  = pool[Math.floor(Math.random() * pool.length)];
    const target = pool[Math.floor(Math.random() * pool.length)];
    if (start === target) continue;
    const dist = bfs(start, target);
    if (dist >= minHops && dist <= maxHops) {
      return { start, target, optimalDist: dist };
    }
  }
  return fallback;
}

// ── Room Code ──────────────────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function generateCode() {
  let code;
  do {
    code = Array.from({ length: 6 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
  } while (rooms.has(code));
  return code;
}

// ── Room Store ─────────────────────────────────────────────────────────────────
const rooms = new Map();

function createRoom(socketId, difficulty = 'medium') {
  const code = generateCode();
  const { start, target, optimalDist } = generateMatch(difficulty);
  const room = {
    code,
    players: [socketId],
    difficulty,
    start, target, optimalDist,
    positions: { [socketId]: { pos: start, path: [start], moves: 0 } },
    status: 'waiting',
    winner: null,
    createdAt: Date.now(),
  };
  rooms.set(code, room);
  return room;
}

function joinRoom(code, socketId) {
  const room = rooms.get(code);
  if (!room)                           return { error: 'ROOM_NOT_FOUND' };
  if (room.players.length >= 2)        return { error: 'ROOM_FULL' };
  if (room.players.includes(socketId)) return { error: 'ALREADY_IN_ROOM' };
  room.players.push(socketId);
  room.positions[socketId] = { pos: room.start, path: [room.start], moves: 0 };
  room.status = 'playing';
  return { room };
}

function makeMove(code, socketId, targetIso) {
  const room = rooms.get(code);
  if (!room)                            return { error: 'ROOM_NOT_FOUND' };
  if (room.status !== 'playing')        return { error: 'GAME_NOT_ACTIVE' };
  if (!room.players.includes(socketId)) return { error: 'NOT_IN_ROOM' };

  const ps = room.positions[socketId];
  const neighbors = BORDERS[ps.pos] || [];
  if (!neighbors.includes(targetIso))   return { error: 'NOT_A_NEIGHBOR' };

  ps.pos = targetIso;
  ps.path.push(targetIso);
  ps.moves++;

  // Win by entering the target itself OR any direct neighbor of the target
  const hasWon = targetIso === room.target ||
    (BORDERS[targetIso] || []).includes(room.target);
  if (hasWon) {
    room.status = 'finished';
    room.winner = socketId;
    return { room, victory: true };
  }
  return { room, victory: false };
}

function resetRoom(code) {
  const room = rooms.get(code);
  if (!room || room.players.length < 2) return null;
  const { start, target, optimalDist } = generateMatch(room.difficulty || 'medium');
  room.start = start;
  room.target = target;
  room.optimalDist = optimalDist;
  room.status = 'playing';
  room.winner = null;
  room.createdAt = Date.now();
  room.players.forEach(pid => {
    room.positions[pid] = { pos: start, path: [start], moves: 0 };
  });
  return room;
}

function removePlayer(socketId) {
  for (const [code, room] of rooms.entries()) {
    if (!room.players.includes(socketId)) continue;
    room.players = room.players.filter(p => p !== socketId);
    delete room.positions[socketId];
    if (room.players.length === 0) {
      rooms.delete(code);
    } else {
      room.status = 'abandoned';
    }
    return { code, room };
  }
  return null;
}

// ── State Payload (personalized per player) ────────────────────────────────────
function buildState(room, myId) {
  const oppId = room.players.find(p => p !== myId);
  const me  = room.positions[myId]  || { pos: room.start, path: [room.start], moves: 0 };
  const opp = oppId ? (room.positions[oppId] || { pos: room.start, path: [], moves: 0 }) : null;
  return {
    code:          room.code,
    start:         room.start,
    target:        room.target,
    startName:     COUNTRY_NAMES[room.start]  || room.start,
    targetName:    COUNTRY_NAMES[room.target] || room.target,
    startFlag:     ISO3_TO_2[room.start]  || '',
    targetFlag:    ISO3_TO_2[room.target] || '',
    optimalDist:   room.optimalDist,
    myPos:         me.pos,
    myPosName:     COUNTRY_NAMES[me.pos]  || me.pos,
    myFlag:        ISO3_TO_2[me.pos]      || '',
    myPath:        me.path,
    myMoves:       me.moves,
    myNeighbors:   (BORDERS[me.pos] || []).map(iso => ({
      iso, name: COUNTRY_NAMES[iso] || iso, flag: ISO3_TO_2[iso] || '',
    })),
    opponentPos:      opp ? opp.pos                          : null,
    opponentPosName:  opp ? (COUNTRY_NAMES[opp.pos] || opp.pos) : null,
    opponentFlag:     opp ? (ISO3_TO_2[opp.pos] || '')          : null,
    opponentPath:     opp ? opp.path : [],
    opponentMoves:    opp ? opp.moves : 0,
    status:    room.status,
    winnerId:  room.winner,
    isWinner:  room.winner === myId,
    difficulty: room.difficulty || 'medium',
  };
}

// ── Cleanup old rooms every 30 min ────────────────────────────────────────────
setInterval(() => {
  const cutoff = Date.now() - 2 * 60 * 60 * 1000;
  for (const [code, room] of rooms.entries()) {
    if (room.createdAt < cutoff) rooms.delete(code);
  }
}, 30 * 60 * 1000);

module.exports = { BORDERS, COUNTRY_NAMES, ISO3_TO_2, createRoom, joinRoom, makeMove, resetRoom, removePlayer, buildState };
