require('dotenv').config();
const http    = require('http');
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const { Server } = require('socket.io');

const path = require('path');
const { generalLimiter } = require('./middleware/rateLimiter');
const { requireApiKey }  = require('./middleware/auth');
const sessionRouter = require('./routes/session');
const gameRouter    = require('./routes/game');
const adminRouter   = require('./routes/admin');
const authRouter    = require('./routes/auth');
const BR            = require('./services/borderrunMP');

const app    = express();
const server = http.createServer(app);

// ── Socket.io (BorderRun Multiplayer) ─────────────────────────────────────────
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET','POST'] },
});

io.on('connection', (socket) => {
  let myCode = null;

  // Create a new room
  socket.on('br:create', ({ difficulty } = {}) => {
    const room = BR.createRoom(socket.id, difficulty || 'medium');
    myCode = room.code;
    socket.join(myCode);
    socket.emit('br:created', { code: room.code, difficulty: room.difficulty });
  });

  // Join existing room
  socket.on('br:join', ({ code }) => {
    const clean = (code || '').toUpperCase().trim();
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
  });
});

// ── Express middleware ─────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'"],
      imgSrc:      ["'self'", "data:", "https://flagcdn.com", "https:"],
      connectSrc:  ["'self'", "ws:", "wss:"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc:    ["'self'", "'unsafe-inline'"],
      fontSrc:     ["'self'", "data:"],
    },
  },
}));
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
}));
app.use(express.json({ limit: '10kb' }));
app.use(generalLimiter);

// Auth routes: no API key needed
app.use('/api/auth', authRouter);

// All other /api routes require API key
app.use('/api', requireApiKey);
app.use('/api/session', sessionRouter);
app.use('/api/game',    gameRouter);
app.use('/api/admin',   adminRouter);

// Serve frontend files
app.use(express.static(path.join(__dirname, '..')));

app.get('/health', (req, res) => res.json({ ok: true, ts: Date.now() }));
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`GeoVs API + BorderRun WS running on port ${PORT}`));
