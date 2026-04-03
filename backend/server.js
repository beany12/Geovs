require('dotenv').config();
const http    = require('http');
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const compression = require('compression');
const { Server } = require('socket.io');

const path = require('path');
const { generalLimiter } = require('./middleware/rateLimiter');
const { requireApiKey }  = require('./middleware/auth');
const sessionRouter = require('./routes/session');
const gameRouter    = require('./routes/game');
const adminRouter   = require('./routes/admin');
const authRouter    = require('./routes/auth');
const BR            = require('./services/borderrunMP');
const GTT           = require('./services/geotactoe');

const app    = express();
app.set('trust proxy', 1); // Railway reverse proxy — needed for correct req.ip in rate limiters
const server = http.createServer(app);

// ── Socket.io (BorderRun Multiplayer) ─────────────────────────────────────────
const ALLOWED = (process.env.ALLOWED_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
const io = new Server(server, {
  cors: {
    origin: ALLOWED.length ? ALLOWED : false,
    methods: ['GET','POST'],
  },
});

// Input validators for Socket.io
const VALID_DIFFICULTIES = new Set(['easy', 'medium', 'hard']);
const ROOM_CODE_RE = /^[A-Z0-9]{4,8}$/;
const ISO3_RE = /^[A-Z]{3}$/;

io.on('connection', (socket) => {
  let myCode = null;

  // Create a new room
  socket.on('br:create', ({ difficulty } = {}) => {
    const diff = VALID_DIFFICULTIES.has(difficulty) ? difficulty : 'medium';
    const room = BR.createRoom(socket.id, diff);
    myCode = room.code;
    socket.join(myCode);
    socket.emit('br:created', { code: room.code, difficulty: room.difficulty });
  });

  // Join existing room
  socket.on('br:join', ({ code }) => {
    const clean = (code || '').toUpperCase().trim();
    if (!ROOM_CODE_RE.test(clean)) { socket.emit('br:error', 'INVALID_CODE'); return; }
    const result = BR.joinRoom(clean, socket.id);
    if (result.error) { socket.emit('br:error', result.error); return; }
    myCode = clean;
    socket.join(myCode);
    const creatorId = result.room.players[0];
    // Joiner (player 2) gets their state directly
    socket.emit('br:start', BR.buildState(result.room, socket.id));
    // Creator (player 1) gets their state via room broadcast (excludes sender)
    socket.to(myCode).emit('br:start', BR.buildState(result.room, creatorId));
  });

  // Player moves to a neighboring country
  socket.on('br:move', (iso) => {
    if (!myCode) return;
    if (typeof iso !== 'string' || !ISO3_RE.test(iso)) { socket.emit('br:error', 'INVALID_ISO'); return; }
    const result = BR.makeMove(myCode, socket.id, iso);
    if (result.error) { socket.emit('br:error', result.error); return; }
    const room = result.room;
    const oppId = room.players.find(p => p !== socket.id);
    const event = result.victory ? 'br:victory' : 'br:state';
    socket.emit(event, BR.buildState(room, socket.id));
    if (oppId) socket.to(myCode).emit(event, BR.buildState(room, oppId));
  });

  // Rematch — only works if same 2 players still connected
  socket.on('br:rematch', () => {
    if (!myCode) return;
    const room = BR.resetRoom(myCode);
    if (!room) { socket.emit('br:error', 'NEED_TWO_PLAYERS'); return; }
    const creatorId = room.players[0];
    socket.emit('br:start', BR.buildState(room, socket.id));
    socket.to(myCode).emit('br:start', BR.buildState(room, creatorId));
  });

  socket.on('disconnect', () => {
    if (!myCode) return;
    const removed = BR.removePlayer(socket.id);
    if (removed) socket.to(myCode).emit('br:opponent_left');
    // Also remove from GeoTacToe
    const gttRemoved = GTT.removePlayer(socket.id);
    if (gttRemoved) socket.to(gttRemoved.code).emit('gtt:opponent_left');
  });

  // ── GeoTacToe events ──────────────────────────────────────────────────────
  let gttCode = null;

  socket.on('gtt:create', ({ profile } = {}) => {
    const room = GTT.createRoom(socket.id, profile);
    gttCode = room.code;
    socket.join('gtt_' + gttCode);
    socket.emit('gtt:created', { code: room.code });
  });

  socket.on('gtt:join', ({ code, profile }) => {
    const clean = (code || '').toUpperCase().trim();
    if (!/^[A-Z0-9]{4,8}$/.test(clean)) { socket.emit('gtt:error', 'INVALID_CODE'); return; }
    const result = GTT.joinRoom(clean, socket.id, profile);
    if (result.error) { socket.emit('gtt:error', result.error); return; }
    gttCode = clean;
    socket.join('gtt_' + gttCode);
    const room = result.room;
    // Send state to both players
    room.players.forEach(pid => {
      io.to(pid).emit('gtt:start', GTT.buildState(room, pid));
    });
  });

  socket.on('gtt:move', ({ cellIdx, country }) => {
    if (!gttCode) return;
    if (typeof cellIdx !== 'number' || typeof country !== 'string') {
      socket.emit('gtt:error', 'INVALID_INPUT'); return;
    }
    if (cellIdx < 0 || cellIdx > 8) { socket.emit('gtt:error', 'INVALID_CELL'); return; }
    const cleanCountry = country.replace(/[<>"'&]/g, '').slice(0, 100);
    const result = GTT.makeMove(gttCode, socket.id, cellIdx, cleanCountry);
    if (result.error && !result.switchedTurn) {
      socket.emit('gtt:move_error', result.error); return;
    }
    // Wrong answer switched turn — notify both players
    if (result.error && result.switchedTurn) {
      const room = result.room;
      room.players.forEach(pid => {
        const state = GTT.buildState(room, pid);
        state.wrongAnswer = { error: result.error, by: room.players.indexOf(socket.id) };
        io.to(pid).emit('gtt:state', state);
      });
      return;
    }
    const room = result.room;
    room.players.forEach(pid => {
      const state = GTT.buildState(room, pid);
      if (result.roundWinner !== undefined) {
        state.roundWinner = result.roundWinner;
        state.matchWinner = result.matchWinner;
      }
      io.to(pid).emit('gtt:state', state);
    });
  });

  socket.on('gtt:timeout', () => {
    if (!gttCode) return;
    // Validate that the turn deadline has actually passed (prevent client-side manipulation)
    const room = GTT.getRoom(gttCode);
    if (room && room.turnDeadline && Date.now() < room.turnDeadline - 2000) return; // 2s grace
    const result = GTT.timeoutTurn(gttCode);
    if (!result) return;
    const room = result.room;
    room.players.forEach(pid => {
      const state = GTT.buildState(room, pid);
      if (result.roundWinner !== undefined) {
        state.roundWinner = result.roundWinner;
        state.matchWinner = result.matchWinner;
      }
      state.timedOut = true;
      io.to(pid).emit('gtt:state', state);
    });
  });

  socket.on('gtt:skip', () => {
    if (!gttCode) return;
    const result = GTT.skipTurn(gttCode, socket.id);
    if (result.error) { socket.emit('gtt:error', result.error); return; }
    const room = result.room;
    room.players.forEach(pid => {
      const state = GTT.buildState(room, pid);
      if (result.roundWinner !== undefined) {
        state.roundWinner = result.roundWinner;
        state.matchWinner = result.matchWinner;
      }
      io.to(pid).emit('gtt:state', state);
    });
  });

  socket.on('gtt:propose_draw', () => {
    if (!gttCode) return;
    const result = GTT.proposeDraw(gttCode, socket.id);
    if (result.error) { socket.emit('gtt:error', result.error); return; }
    const room = result.room;
    room.players.forEach(pid => {
      const state = GTT.buildState(room, pid);
      if (result.roundWinner !== undefined) {
        state.roundWinner = result.roundWinner;
        state.matchWinner = result.matchWinner;
      }
      io.to(pid).emit('gtt:state', state);
    });
  });

  socket.on('gtt:cancel_draw', () => {
    if (!gttCode) return;
    const result = GTT.cancelDraw(gttCode, socket.id);
    if (result.error) return;
    const room = result.room;
    room.players.forEach(pid => {
      io.to(pid).emit('gtt:state', GTT.buildState(room, pid));
    });
  });

  socket.on('gtt:next_round', () => {
    if (!gttCode) return;
    const room = GTT.nextRound(gttCode);
    if (!room) { socket.emit('gtt:error', 'ROOM_NOT_FOUND'); return; }
    room.players.forEach(pid => {
      io.to(pid).emit('gtt:start', GTT.buildState(room, pid));
    });
  });

  socket.on('gtt:rematch', () => {
    if (!gttCode) return;
    // Reset scores and start fresh
    const room = GTT.nextRound(gttCode);
    if (!room) return;
    room.scores = [0, 0];
    room.round = 1;
    room.players.forEach(pid => {
      io.to(pid).emit('gtt:start', GTT.buildState(room, pid));
    });
  });
});

// ── HTTPS redirect in production ──────────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect(301, `https://${req.header('host')}${req.url}`);
    }
    next();
  });
}

// ── Express middleware ─────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'", "https://www.gstatic.com", "https://cdnjs.cloudflare.com", "https://apis.google.com"],
      imgSrc:      ["'self'", "data:", "https://flagcdn.com", "https://cdn.jsdelivr.net", "https:"],
      connectSrc:  ["'self'", "ws:", "wss:", "https://firestore.googleapis.com", "https://www.googleapis.com", "https://*.firebaseio.com", "https://identitytoolkit.googleapis.com", "https://securetoken.googleapis.com"],
      scriptSrcAttr: ["'unsafe-inline'"], // Required: app uses onclick handlers extensively
      styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:     ["'self'", "data:", "https://fonts.gstatic.com"],
      frameSrc:    ["'none'"],
      objectSrc:   ["'none'"],
      baseUri:     ["'self'"],
      formAction:  ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  xssFilter: true,
  noSniff: true,
  permissionsPolicy: {
    features: {
      camera:       ["()"],
      microphone:   ["()"],
      geolocation:  ["()"],
      payment:      ["()"],
    },
  },
}));
app.use(cors({
  origin: ALLOWED.length ? ALLOWED : false,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
  credentials: true,
}));
app.use(compression({ level: 6, threshold: 1024 }));
app.use(express.json({ limit: '10kb' }));
app.use(generalLimiter);

// Auth routes: no API key needed
app.use('/api/auth', authRouter);

// GeoTacToe countries endpoint (no API key needed — public game data)
app.get('/api/geotactoe/countries', (req, res) => {
  res.json(GTT.COUNTRIES.map(c => ({ n: c.n, f: c.f })));
});

// All other /api routes require API key
app.use('/api', requireApiKey);
app.use('/api/session', sessionRouter);
app.use('/api/game',    gameRouter);
app.use('/api/admin',   adminRouter);

// Block access to backend source files, dotfiles, and sensitive configs
app.use((req, res, next) => {
  const p = req.path.toLowerCase();
  if (p.startsWith('/backend/') || p.startsWith('/.') || p === '/package.json' ||
      p === '/package-lock.json' || p === '/firebase.json' || p === '/firestore.rules' ||
      p === '/.env' || p === '/.firebaserc' || p === '/.gitignore') {
    return res.status(404).end();
  }
  next();
});

// Serve frontend files with caching
app.use(express.static(path.join(__dirname, '..'), {
  maxAge: '1h',
  etag: true,
  lastModified: true,
  setHeaders: function(res, filePath) {
    // Long cache for static assets
    if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
    // Short cache for HTML (so updates propagate)
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=300');
    }
    // Long cache for images/gifs
    if (filePath.match(/\.(jpg|jpeg|png|gif|svg|ico|webp)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
  }
}));

app.get('/health', (req, res) => res.json({ ok: true, ts: Date.now() }));
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`GeoVs API + BorderRun WS running on port ${PORT}`));
