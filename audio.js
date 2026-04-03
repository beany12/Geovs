/**
 * GeoVs — Audio Manager
 * Zentrales Sound-System mit eingebauten Web Audio API Sounds.
 * MP3-Dateien in /audio/ haben Prioritaet — fehlen sie, werden Synthesizer-Sounds benutzt.
 */

const GeoAudio = (function() {
  // ── Settings ───────────────────────────────────────────────────────────────
  const STORAGE_KEY = 'geovs_audio';
  const DEFAULTS = { musicVolume: 0.5, sfxVolume: 0.7, musicEnabled: true, sfxEnabled: true };

  let settings = Object.assign({}, DEFAULTS);
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) Object.assign(settings, saved);
  } catch(e) {}

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch(e) {}
  }

  // ── Audio Context ──────────────────────────────────────────────────────────
  let ctx = null;
  let unlocked = false;

  function getCtx() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e) { return null; }
    }
    if (ctx.state === 'suspended') ctx.resume().catch(()=>{});
    return ctx;
  }

  function ensureUnlocked() {
    if (unlocked) return;
    getCtx();
    unlocked = true;
    if (settings.musicEnabled && !currentTrack) playMusic('menu');
  }

  function initUnlock() {
    const handler = () => {
      ensureUnlocked();
      document.removeEventListener('click', handler, true);
      document.removeEventListener('touchstart', handler, true);
      document.removeEventListener('keydown', handler, true);
    };
    document.addEventListener('click', handler, true);
    document.addEventListener('touchstart', handler, true);
    document.addEventListener('keydown', handler, true);
  }

  // ── Synthesized SFX (Web Audio API) ────────────────────────────────────────
  // Each function creates a short sound effect using oscillators + gain envelopes.

  function synthClick() {
    const c = getCtx(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(800, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(400, c.currentTime + 0.06);
    g.gain.setValueAtTime(settings.sfxVolume * 0.3, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.06);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.06);
  }

  function synthNavigate() {
    const c = getCtx(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(300, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(600, c.currentTime + 0.12);
    g.gain.setValueAtTime(settings.sfxVolume * 0.2, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.15);
  }

  function synthCorrect() {
    const c = getCtx(); if (!c) return;
    const t = c.currentTime;
    [523, 659, 784].forEach((freq, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t + i * 0.08);
      g.gain.linearRampToValueAtTime(settings.sfxVolume * 0.25, t + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.2);
      o.connect(g); g.connect(c.destination);
      o.start(t + i * 0.08); o.stop(t + i * 0.08 + 0.2);
    });
  }

  function synthWrong() {
    const c = getCtx(); if (!c) return;
    const t = c.currentTime;
    [300, 280].forEach((freq, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'square'; o.frequency.value = freq;
      g.gain.setValueAtTime(settings.sfxVolume * 0.15, t + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.2);
      o.connect(g); g.connect(c.destination);
      o.start(t + i * 0.12); o.stop(t + i * 0.12 + 0.2);
    });
  }

  function synthVictory() {
    const c = getCtx(); if (!c) return;
    const t = c.currentTime;
    [523, 659, 784, 1047].forEach((freq, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t + i * 0.1);
      g.gain.linearRampToValueAtTime(settings.sfxVolume * 0.25, t + i * 0.1 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.35);
      o.connect(g); g.connect(c.destination);
      o.start(t + i * 0.1); o.stop(t + i * 0.1 + 0.35);
    });
  }

  function synthDefeat() {
    const c = getCtx(); if (!c) return;
    const t = c.currentTime;
    [400, 350, 300, 250].forEach((freq, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t + i * 0.15);
      g.gain.linearRampToValueAtTime(settings.sfxVolume * 0.2, t + i * 0.15 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.15 + 0.3);
      o.connect(g); g.connect(c.destination);
      o.start(t + i * 0.15); o.stop(t + i * 0.15 + 0.3);
    });
  }

  function synthStreak() {
    const c = getCtx(); if (!c) return;
    const t = c.currentTime;
    [600, 800, 1000].forEach((freq, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t + i * 0.06);
      g.gain.linearRampToValueAtTime(settings.sfxVolume * 0.22, t + i * 0.06 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.15);
      o.connect(g); g.connect(c.destination);
      o.start(t + i * 0.06); o.stop(t + i * 0.06 + 0.15);
    });
  }

  function synthLevelup() {
    const c = getCtx(); if (!c) return;
    const t = c.currentTime;
    [440, 554, 659, 880, 1109, 1319].forEach((freq, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = i < 3 ? 'sine' : 'triangle'; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t + i * 0.08);
      g.gain.linearRampToValueAtTime(settings.sfxVolume * 0.2, t + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.3);
      o.connect(g); g.connect(c.destination);
      o.start(t + i * 0.08); o.stop(t + i * 0.08 + 0.3);
    });
  }

  function synthAchievement() {
    const c = getCtx(); if (!c) return;
    const t = c.currentTime;
    [880, 1109, 1319, 1760].forEach((freq, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'triangle'; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t + i * 0.07);
      g.gain.linearRampToValueAtTime(settings.sfxVolume * 0.2, t + i * 0.07 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.25);
      o.connect(g); g.connect(c.destination);
      o.start(t + i * 0.07); o.stop(t + i * 0.07 + 0.25);
    });
  }

  function synthConfetti() {
    const c = getCtx(); if (!c) return;
    const t = c.currentTime;
    for (let i = 0; i < 8; i++) {
      const freq = 600 + Math.random() * 1200;
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      const start = t + Math.random() * 0.15;
      g.gain.setValueAtTime(settings.sfxVolume * 0.12, start);
      g.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
      o.connect(g); g.connect(c.destination);
      o.start(start); o.stop(start + 0.2);
    }
  }

  function synthTimerWarn() {
    const c = getCtx(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'square'; o.frequency.value = 440;
    g.gain.setValueAtTime(settings.sfxVolume * 0.12, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.1);
  }

  function synthCountdown() {
    const c = getCtx(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.value = 660;
    g.gain.setValueAtTime(settings.sfxVolume * 0.2, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.08);
  }

  const SYNTH_MAP = {
    click: synthClick, navigate: synthNavigate,
    correct: synthCorrect, wrong: synthWrong,
    victory: synthVictory, defeat: synthDefeat,
    streak: synthStreak, levelup: synthLevelup,
    achievement: synthAchievement, confetti: synthConfetti,
    'timer-warn': synthTimerWarn, countdown: synthCountdown,
  };

  // ── MP3 SFX (override synth if files exist) ────────────────────────────────
  const SFX_FILES = {
    click:       '/audio/sfx/click.mp3',
    navigate:    '/audio/sfx/navigate.mp3',
    correct:     '/audio/sfx/correct.mp3',
    wrong:       '/audio/sfx/wrong.mp3',
    'timer-warn':'/audio/sfx/timer-warn.mp3',
    victory:     '/audio/sfx/victory.mp3',
    defeat:      '/audio/sfx/defeat.mp3',
    streak:      '/audio/sfx/streak.mp3',
    levelup:     '/audio/sfx/levelup.mp3',
    achievement: '/audio/sfx/achievement.mp3',
    confetti:    '/audio/sfx/confetti.mp3',
    countdown:   '/audio/sfx/countdown.mp3',
  };

  const sfxPool = {};
  const sfxFailed = {}; // MP3 failed to load → use synth

  function tryPlayMP3(name) {
    if (sfxFailed[name]) return false;
    if (!SFX_FILES[name]) return false;
    if (!sfxPool[name]) sfxPool[name] = [];
    const pool = sfxPool[name];
    // Find idle element
    for (const el of pool) {
      if (el.paused || el.ended) { el.currentTime = 0; el.volume = settings.sfxVolume; const p = el.play(); if(p) p.catch(()=>{}); return true; }
    }
    if (pool.length < 3) {
      const el = new Audio(SFX_FILES[name]);
      el.preload = 'auto';
      el.onerror = function() { sfxFailed[name] = true; };
      pool.push(el);
      el.volume = settings.sfxVolume;
      const p = el.play(); if(p) p.catch(()=>{});
      return true;
    }
    const el = pool[0]; el.currentTime = 0; el.volume = settings.sfxVolume;
    const p = el.play(); if(p) p.catch(()=>{}); return true;
  }

  function playSFX(name) {
    if (!settings.sfxEnabled || !unlocked) return;
    // Try MP3 first, fall back to synth
    if (!sfxFailed[name] && SFX_FILES[name]) {
      if (tryPlayMP3(name)) return;
    }
    // Synth fallback
    if (SYNTH_MAP[name]) SYNTH_MAP[name]();
  }

  // ── Music ──────────────────────────────────────────────────────────────────
  const MUSIC_TRACKS = {
    menu:     '/audio/music/menu.mp3',
    gameplay: '/audio/music/gameplay.mp3',
    tense:    '/audio/music/tense.mp3',
  };
  const musicMp3Failed = {};

  let musicA = null;       // HTML Audio element (for MP3)
  let synthMusicNodes = []; // Active synth nodes
  let synthMusicTimer = null;
  let currentTrack = null;
  let fadeInterval = null;

  // ── Synthesized ambient music ──────────────────────────────────────────────
  // Menu: dreamy ambient pads with slow evolving chords
  // Gameplay: faster arpeggiated energy

  function stopSynthMusic() {
    synthMusicNodes.forEach(n => { try { n.stop(); } catch(e) {} try { n.disconnect(); } catch(e) {} });
    synthMusicNodes = [];
    if (synthMusicTimer) { clearInterval(synthMusicTimer); synthMusicTimer = null; }
  }

  // Helper: loop a pattern function on interval, auto-cleanup nodes
  function synthLoop(fn, ms) {
    fn();
    synthMusicTimer = setInterval(() => {
      if (!settings.musicEnabled) { stopSynthMusic(); return; }
      synthMusicNodes = synthMusicNodes.filter(n => { try { return n.context; } catch(e) { return false; } });
      fn();
    }, ms);
  }

  // Helper: play a note
  function note(freq, type, vol, start, dur, attack, release) {
    const c = getCtx(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.value = freq;
    const t = c.currentTime + (start || 0);
    const a = attack || 0.02, r = release || dur;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + a);
    g.gain.setValueAtTime(vol * 0.8, t + dur - r * 0.5);
    g.gain.linearRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
    synthMusicNodes.push(o, g);
  }

  // ═══ MENU MUSIC ═══

  // Zen: Minimal pentatonic
  function synthMenuZen() {
    stopSynthMusic();
    const v = settings.musicVolume * 0.14;
    const NOTES = [261.6, 293.7, 329.6, 392, 440, 523.3, 587.3, 659.3];
    let step = 0;
    synthLoop(() => {
      // Single gentle note with long tail
      const f = NOTES[step % NOTES.length];
      note(f, 'sine', v, 0, 3, 0.5, 1.5);
      note(f/2, 'sine', v*0.3, 0.1, 2.5, 0.8, 1);
      // Occasional harmony
      if (step % 3 === 0) note(f*1.5, 'triangle', v*0.1, 0.5, 2, 0.5, 1);
      step++;
    }, 3000);
  }

  // ═══ GAMEPLAY MUSIC ═══

  // Funky Groove
  function synthGameFunky() {
    stopSynthMusic();
    const v = settings.musicVolume * 0.11;
    const BASS = [130.8,0,130.8,164.8,0,196,0,164.8, 174.6,0,174.6,220,0,196,0,174.6];
    const STAB = [0,1,0,0,1,0,1,0, 0,1,0,0,1,0,1,0];
    let i = 0;
    synthLoop(() => {
      const b = BASS[i % BASS.length];
      if (b > 0) note(b, 'sawtooth', v*0.45, 0, 0.15, 0.01, 0.1);
      if (STAB[i % STAB.length]) {
        note(392, 'square', v*0.15, 0, 0.06, 0.005, 0.04);
        note(493.9, 'square', v*0.15, 0, 0.06, 0.005, 0.04);
      }
      // Wah-like sweep every 8
      if (i % 8 === 0) {
        const o = getCtx().createOscillator(), g = getCtx().createGain();
        o.type = 'sawtooth'; o.frequency.setValueAtTime(300, getCtx().currentTime);
        o.frequency.exponentialRampToValueAtTime(800, getCtx().currentTime + 0.3);
        g.gain.setValueAtTime(v*0.15, getCtx().currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, getCtx().currentTime + 0.35);
        o.connect(g); g.connect(getCtx().destination);
        o.start(); o.stop(getCtx().currentTime + 0.4);
        synthMusicNodes.push(o, g);
      }
      i++;
    }, 200);
  }

  // Tense: stays the same (timer situations only)
  function synthMusicTense() {
    stopSynthMusic();
    const v = settings.musicVolume * 0.15;
    let tick = 0;
    synthLoop(() => {
      tick++;
      note(80 + (tick%2)*15, 'sine', v, 0, 0.4, 0.02, 0.3);
      if (tick%2===0) note(440+(tick%4)*30, 'sawtooth', v*0.25, 0, 0.3, 0.02, 0.2);
    }, 500);
  }

  // Track registry with labels
  const MENU_TRACKS = [
    { id: 'menu_zen',     label: '🧘 Zen',      fn: synthMenuZen },
  ];
  const GAME_TRACKS = [
    { id: 'game_funky',   label: '🎸 Funky',    fn: synthGameFunky },
  ];

  const SYNTH_MUSIC_MAP = {
    menu: synthMenuZen,
    gameplay: synthGameFunky,
    tense: synthMusicTense,
  };

  // ── MP3 Music (with synth fallback) ────────────────────────────────────────

  function createMusicEl(src) {
    const el = new Audio(src);
    el.loop = true; el.volume = 0; el.preload = 'auto';
    el.onerror = function() { this._failed = true; };
    return el;
  }

  function playMusic(track) {
    if (!SYNTH_MUSIC_MAP[track] && !MUSIC_TRACKS[track]) return;
    if (track === currentTrack && (synthMusicTimer || (musicA && !musicA.paused))) return;
    if (!settings.musicEnabled) { currentTrack = track; return; }

    // Stop current music
    stopSynthMusic();
    if (musicA && !musicA.paused) { musicA.pause(); musicA.src = ''; }
    if (fadeInterval) { clearInterval(fadeInterval); fadeInterval = null; }

    currentTrack = track;

    // Try MP3 first
    if (MUSIC_TRACKS[track] && !musicMp3Failed[track]) {
      const newEl = createMusicEl(MUSIC_TRACKS[track]);
      musicA = newEl;
      const targetVol = settings.musicVolume;
      newEl.volume = 0;
      const pp = newEl.play();
      if (pp) pp.then(() => {
        // MP3 loaded — fade in
        let step = 0; const STEPS = 25;
        fadeInterval = setInterval(() => {
          step++; const t = step / STEPS;
          if (newEl && !newEl._failed) newEl.volume = Math.min(targetVol, t * targetVol);
          if (step >= STEPS) { clearInterval(fadeInterval); fadeInterval = null; }
        }, 20);
      }).catch(() => {
        // MP3 failed — use synth
        musicMp3Failed[track] = true;
        musicA = null;
        if (SYNTH_MUSIC_MAP[track]) SYNTH_MUSIC_MAP[track]();
      });
      // Also listen for error
      newEl.onerror = function() {
        musicMp3Failed[track] = true;
        musicA = null;
        if (SYNTH_MUSIC_MAP[track]) SYNTH_MUSIC_MAP[track]();
      };
      return;
    }

    // Synth fallback
    musicA = null;
    if (SYNTH_MUSIC_MAP[track]) SYNTH_MUSIC_MAP[track]();
  }

  function stopMusic() {
    stopSynthMusic();
    if (musicA) {
      if (fadeInterval) clearInterval(fadeInterval);
      let vol = musicA.volume; const el = musicA;
      fadeInterval = setInterval(() => {
        vol -= 0.03;
        if (vol <= 0) { el.pause(); el.src = ''; clearInterval(fadeInterval); fadeInterval = null; }
        else el.volume = vol;
      }, 20);
    }
    musicA = null; currentTrack = null;
  }

  function updateMusicVolume() {
    if (musicA && !musicA._failed && !musicA.paused) musicA.volume = settings.musicEnabled ? settings.musicVolume : 0;
    // For synth music, volume changes take effect on next chord/pattern cycle
  }

  // ── Global UI click sound ──────────────────────────────────────────────────
  function initClickSound() {
    document.addEventListener('click', function(e) {
      if (!settings.sfxEnabled || !unlocked) return;
      const t = e.target.closest('button, .btn-lime, .btn-muted, .btn-rose, .btn-outline, .back-link, .gtt-tab, .setup-mode-btn, .setup-region-btn, .setup-diff-btn, .mc-btn');
      if (t) playSFX('click');
    }, true);
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  function setMusicVolume(v) {
    settings.musicVolume = Math.max(0, Math.min(1, v));
    settings.musicEnabled = settings.musicVolume > 0;
    updateMusicVolume();
    if (settings.musicEnabled && !synthMusicTimer && (!musicA || musicA.paused)) {
      playMusic(currentTrack || lastTrack || 'menu');
    }
    if (!settings.musicEnabled) {
      lastTrack = currentTrack || lastTrack;
      stopMusic();
    }
    save(); updateSettingsUI();
  }

  function setSFXVolume(v) {
    settings.sfxVolume = Math.max(0, Math.min(1, v));
    settings.sfxEnabled = settings.sfxVolume > 0;
    save(); updateSettingsUI();
  }

  let lastTrack = 'menu'; // Remember last track for re-enable
  function toggleMusic() {
    settings.musicEnabled = !settings.musicEnabled;
    if (!settings.musicEnabled) {
      lastTrack = currentTrack || lastTrack;
      stopMusic();
    } else {
      playMusic(currentTrack || lastTrack || 'menu');
    }
    save(); updateSettingsUI();
  }

  function toggleSFX() {
    settings.sfxEnabled = !settings.sfxEnabled;
    save(); updateSettingsUI();
  }

  function updateSettingsUI() {
    const ms = document.getElementById('audio-music-vol');
    const ss = document.getElementById('audio-sfx-vol');
    const mi = document.getElementById('audio-music-icon');
    const si = document.getElementById('audio-sfx-icon');
    if (ms) ms.value = settings.musicVolume * 100;
    if (ss) ss.value = settings.sfxVolume * 100;
    if (mi) mi.textContent = settings.musicEnabled && settings.musicVolume > 0 ? '🔊' : '🔇';
    if (si) si.textContent = settings.sfxEnabled && settings.sfxVolume > 0 ? '🔊' : '🔇';
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    initUnlock();
    initClickSound();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateSettingsUI);
    else updateSettingsUI();
  }
  init();

  return {
    playMusic, stopMusic, playSFX,
    setMusicVolume, setSFXVolume, toggleMusic, toggleSFX,
    updateSettingsUI,
    get settings() { return settings; },
    get currentTrack() { return currentTrack; },
  };
})();
