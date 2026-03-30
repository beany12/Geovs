/**
 * GeoVs Cloud Sync — Firestore
 * Synchronisiert Spielfortschritt, Highscores und Achievements
 * zwischen localStorage und Firebase Firestore.
 */

import { initializeApp, getApps }      from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore,
  doc, getDoc, setDoc, updateDoc,
  collection, query, orderBy, limit, onSnapshot,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey:            'AIzaSyCMUdIIekNViU29kfdzmc0EuU7niee02u8',
  authDomain:        'geogenius-a5c5e.firebaseapp.com',
  projectId:         'geogenius-a5c5e',
  storageBucket:     'geogenius-a5c5e.firebasestorage.app',
  messagingSenderId: '880941067540',
  appId:             '1:880941067540:web:5b3ce79525dfafa4536601',
};

// Nur einmal initialisieren
const app  = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── localStorage Keys ──────────────────────────────────────────────────────
const LS = {
  profile:     'geovs_p',
  hlHS:        'hl_highscore',
  streak:      'geovs_streak',
  achData:     'geovs_ach_data',
  achUnlocked: 'geovs_ach_unlocked',
};

function lsGet(key, fallback = null) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val)); } catch {}
}

// ── Snapshot aller lokalen Daten ───────────────────────────────────────────
function buildSnapshot() {
  const p = lsGet(LS.profile, {});

  // Border Run Records (dynamische Keys)
  const bdrRecords = {};
  for (const k of Object.keys(localStorage)) {
    if (k.startsWith('bdr_rec_')) {
      bdrRecords[k.replace('bdr_rec_', '')] = parseInt(localStorage.getItem(k) || '0');
    }
  }

  return {
    username:    p.username    || 'Anonym',
    xp:          p.xp          || 0,
    games:       p.games       || 0,
    avatar:      p.avatar      || null,
    onboardingDone: p.onboardingDone || false,
    highscores: {
      hl:  parseInt(localStorage.getItem(LS.hlHS) || '0'),
      bdr: bdrRecords,
    },
    achievements: {
      data:     lsGet(LS.achData,     {}),
      unlocked: lsGet(LS.achUnlocked, {}),
    },
    streak:    lsGet(LS.streak, { count: 0, last: 0 }),
    updatedAt: serverTimestamp(),
  };
}

// ── Cloud → Local (beim Login) ─────────────────────────────────────────────
// Merge-Strategie: nimm immer den besseren Wert
function applyCloudToLocal(cloud) {
  const local = lsGet(LS.profile, {});

  // XP: nimm höchsten Wert
  const mergedXP = Math.max(local.xp || 0, cloud.xp || 0);

  // Achievements: Union
  const mergedAchData     = Object.assign({}, lsGet(LS.achData, {}),     cloud.achievements?.data     || {});
  const mergedAchUnlocked = Object.assign({}, lsGet(LS.achUnlocked, {}), cloud.achievements?.unlocked || {});

  // Profil updaten
  const merged = Object.assign({}, local, {
    username:      cloud.username      || local.username,
    xp:            mergedXP,
    games:         Math.max(local.games || 0, cloud.games || 0),
    avatar:        cloud.avatar        || local.avatar,
    onboardingDone: cloud.onboardingDone || local.onboardingDone,
  });
  lsSet(LS.profile, merged);

  // Highscores
  const cloudHL = cloud.highscores?.hl || 0;
  const localHL = parseInt(localStorage.getItem(LS.hlHS) || '0');
  if (cloudHL > localHL) localStorage.setItem(LS.hlHS, cloudHL);

  // Border Run Records
  for (const [region, val] of Object.entries(cloud.highscores?.bdr || {})) {
    const localBdr = parseInt(localStorage.getItem(`bdr_rec_${region}`) || '0');
    if (val > localBdr) localStorage.setItem(`bdr_rec_${region}`, val);
  }

  // Achievements
  lsSet(LS.achData, mergedAchData);
  lsSet(LS.achUnlocked, mergedAchUnlocked);

  // Streak
  const cloudStreak = cloud.streak || { count: 0, last: 0 };
  const localStreak = lsGet(LS.streak, { count: 0, last: 0 });
  if (cloudStreak.count > localStreak.count) lsSet(LS.streak, cloudStreak);

  // Cache für Sync invalidieren
  if (window._profileData) window._profileData = null;
  if (typeof profileRender === 'function') profileRender();

  console.log('[CloudSync] Lokale Daten mit Cloud zusammengeführt ✓');
}

// ── Local → Cloud (beim Speichern) ────────────────────────────────────────
let _syncTimer = null;

async function syncToCloud(immediate = false) {
  const user = auth.currentUser;
  if (!user) return;

  const doSync = async () => {
    try {
      const snap = buildSnapshot();
      const ref  = doc(db, 'users', user.uid);
      await setDoc(ref, snap, { merge: true });
      console.log('[CloudSync] Gespeichert ✓');
    } catch (err) {
      console.warn('[CloudSync] Fehler beim Speichern:', err.message);
    }
  };

  if (immediate) {
    await doSync();
  } else {
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(doSync, 3000); // 3s debounce
  }
}

// ── Leaderboard ────────────────────────────────────────────────────────────
let _lbUnsubscribe = null;

function watchLeaderboard(onUpdate) {
  if (_lbUnsubscribe) _lbUnsubscribe();

  const q = query(
    collection(db, 'users'),
    orderBy('xp', 'desc'),
    limit(20)
  );

  _lbUnsubscribe = onSnapshot(q, (snapshot) => {
    const entries = snapshot.docs.map((d, i) => ({
      rank:     i + 1,
      uid:      d.id,
      username: d.data().username || 'Anonym',
      xp:       d.data().xp       || 0,
      avatar:   d.data().avatar   || null,
      hlHS:     d.data().highscores?.hl || 0,
    }));
    onUpdate(entries);
  }, (err) => {
    console.warn('[Leaderboard] Fehler:', err.message);
  });
}

function stopLeaderboard() {
  if (_lbUnsubscribe) { _lbUnsubscribe(); _lbUnsubscribe = null; }
}

// ── Auth State: sync beim Login ────────────────────────────────────────────
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  try {
    const ref  = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      // Vorhandene Cloud-Daten mit lokalen mergen
      applyCloudToLocal(snap.data());
    } else {
      // Erster Login: lokale Daten hochladen
      await syncToCloud(true);
    }
  } catch (err) {
    console.warn('[CloudSync] Login-Sync fehlgeschlagen:', err.message);
  }
});

// ── Globale API ────────────────────────────────────────────────────────────
window.CloudSync = { syncToCloud, watchLeaderboard, stopLeaderboard };

// pSave patchen: bei jedem lokalen Speichern auch Cloud updaten
document.addEventListener('DOMContentLoaded', () => {
  const origPSave = window.pSave;
  if (origPSave) {
    window.pSave = function () {
      origPSave();
      window.CloudSync.syncToCloud();
    };
  }
});
