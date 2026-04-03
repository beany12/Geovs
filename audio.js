/**
 * GeoVs — Audio Manager
 * Zentrales Sound-System fuer Musik, SFX, UI-Sounds und Celebrations.
 * Fehlende MP3-Dateien werden graceful ignoriert (kein Error).
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

  // ── Audio Context (for mobile unlock) ──────────────────────────────────────
  let audioCtx = null;
  let unlocked = false;

  function ensureUnlocked() {
    if (unlocked) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch(e) {}
    unlocked = true;
    // Start menu music on first interaction if enabled
    if (settings.musicEnabled && !currentTrack) {
      playMusic('menu');
    }
  }

  // Register unlock on first user interaction
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

  // ── Music ──────────────────────────────────────────────────────────────────
  const MUSIC_TRACKS = {
    menu:     '/audio/music/menu.mp3',
    gameplay: '/audio/music/gameplay.mp3',
    tense:    '/audio/music/tense.mp3',
  };

  let musicA = null;   // Current playing element
  let musicB = null;   // Crossfade target
  let currentTrack = null;
  let fadeInterval = null;

  function createMusicEl(src) {
    const el = new Audio(src);
    el.loop = true;
    el.volume = 0;
    el.preload = 'auto';
    // Graceful fail for missing files
    el.onerror = function() { this._failed = true; };
    return el;
  }

  function playMusic(track) {
    if (!MUSIC_TRACKS[track]) return;
    if (track === currentTrack && musicA && !musicA.paused) return;
    if (!settings.musicEnabled) { currentTrack = track; return; }

    const src = MUSIC_TRACKS[track];
    const newEl = createMusicEl(src);
    currentTrack = track;

    // Crossfade
    const oldEl = musicA;
    musicA = newEl;

    if (fadeInterval) clearInterval(fadeInterval);

    const targetVol = settings.musicVolume;
    newEl.volume = 0;

    const playPromise = newEl.play();
    if (playPromise) playPromise.catch(() => {});

    let step = 0;
    const STEPS = 25; // 500ms fade
    fadeInterval = setInterval(() => {
      step++;
      const t = step / STEPS;
      if (newEl && !newEl._failed) newEl.volume = Math.min(targetVol, t * targetVol);
      if (oldEl && !oldEl.paused) {
        oldEl.volume = Math.max(0, (1 - t) * targetVol);
        if (oldEl.volume <= 0.01) { oldEl.pause(); oldEl.src = ''; }
      }
      if (step >= STEPS) {
        clearInterval(fadeInterval);
        fadeInterval = null;
      }
    }, 20);
  }

  function stopMusic() {
    if (!musicA) return;
    if (fadeInterval) clearInterval(fadeInterval);
    let vol = musicA.volume;
    const el = musicA;
    fadeInterval = setInterval(() => {
      vol -= 0.03;
      if (vol <= 0) {
        el.pause(); el.src = '';
        clearInterval(fadeInterval);
        fadeInterval = null;
      } else {
        el.volume = vol;
      }
    }, 20);
    musicA = null;
    currentTrack = null;
  }

  function updateMusicVolume() {
    if (musicA && !musicA._failed && !musicA.paused) {
      musicA.volume = settings.musicEnabled ? settings.musicVolume : 0;
    }
  }

  // ── SFX ────────────────────────────────────────────────────────────────────
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

  // Pool: 3 instances per sound for overlap
  const sfxPool = {};
  const sfxFailed = {};

  function getSFX(name) {
    if (sfxFailed[name]) return null;
    if (!SFX_FILES[name]) return null;
    if (!sfxPool[name]) sfxPool[name] = [];
    const pool = sfxPool[name];
    // Find an idle element
    for (const el of pool) {
      if (el.paused || el.ended) {
        el.currentTime = 0;
        return el;
      }
    }
    // Create new if pool < 3
    if (pool.length < 3) {
      const el = new Audio(SFX_FILES[name]);
      el.preload = 'auto';
      el.onerror = function() { sfxFailed[name] = true; };
      pool.push(el);
      return el;
    }
    // All busy, reuse oldest
    const el = pool[0];
    el.currentTime = 0;
    return el;
  }

  function playSFX(name) {
    if (!settings.sfxEnabled) return;
    if (!unlocked) return;
    const el = getSFX(name);
    if (!el || el._failed) return;
    el.volume = settings.sfxVolume;
    const p = el.play();
    if (p) p.catch(() => {});
  }

  // ── Global UI click sound (delegated) ──────────────────────────────────────
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
    if (settings.musicEnabled && currentTrack && (!musicA || musicA.paused)) {
      playMusic(currentTrack);
    }
    if (!settings.musicEnabled && musicA && !musicA.paused) {
      stopMusic();
      currentTrack = null; // allow restart
    }
    save();
    updateSettingsUI();
  }

  function setSFXVolume(v) {
    settings.sfxVolume = Math.max(0, Math.min(1, v));
    settings.sfxEnabled = settings.sfxVolume > 0;
    save();
    updateSettingsUI();
  }

  function toggleMusic() {
    settings.musicEnabled = !settings.musicEnabled;
    if (!settings.musicEnabled) {
      stopMusic();
    } else if (currentTrack) {
      playMusic(currentTrack);
    }
    save();
    updateSettingsUI();
  }

  function toggleSFX() {
    settings.sfxEnabled = !settings.sfxEnabled;
    save();
    updateSettingsUI();
  }

  // ── Settings UI sync ───────────────────────────────────────────────────────
  function updateSettingsUI() {
    const musicSlider = document.getElementById('audio-music-vol');
    const sfxSlider = document.getElementById('audio-sfx-vol');
    const musicIcon = document.getElementById('audio-music-icon');
    const sfxIcon = document.getElementById('audio-sfx-icon');
    if (musicSlider) musicSlider.value = settings.musicVolume * 100;
    if (sfxSlider) sfxSlider.value = settings.sfxVolume * 100;
    if (musicIcon) musicIcon.textContent = settings.musicEnabled && settings.musicVolume > 0 ? '🔊' : '🔇';
    if (sfxIcon) sfxIcon.textContent = settings.sfxEnabled && settings.sfxVolume > 0 ? '🔊' : '🔇';
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    initUnlock();
    initClickSound();
    // Sync UI on load (if DOM ready)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateSettingsUI);
    } else {
      updateSettingsUI();
    }
  }

  init();

  // ── Expose ─────────────────────────────────────────────────────────────────
  return {
    playMusic,
    stopMusic,
    playSFX,
    setMusicVolume,
    setSFXVolume,
    toggleMusic,
    toggleSFX,
    updateSettingsUI,
    get settings() { return settings; },
    get currentTrack() { return currentTrack; },
  };
})();
