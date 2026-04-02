/**
 * Firebase Auth Integration — GeoVs Hauptseite
 * Verwaltet Login-Status und zeigt/versteckt die Auth-Buttons.
 */

import { initializeApp }               from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged,
         signOut }                     from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey:            'AIzaSyCMUdIIekNViU29kfdzmc0EuU7niee02u8',
  authDomain:        'geogenius-a5c5e.firebaseapp.com',
  projectId:         'geogenius-a5c5e',
  storageBucket:     'geogenius-a5c5e.firebasestorage.app',
  messagingSenderId: '880941067540',
  appId:             '1:880941067540:web:5b3ce79525dfafa4536601',
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ── Auth-State Listener ────────────────────────────────────────────────────
onAuthStateChanged(auth, (user) => {
  const loginBtn  = document.getElementById('pp-login-btn');
  const logoutBtn = document.getElementById('pp-logout-btn');
  const avatarBtn = document.getElementById('pp-avatar-btn');

  if (user) {
    if (loginBtn)  loginBtn.style.display  = 'none';
    if (logoutBtn) logoutBtn.style.display = '';
    if (avatarBtn) avatarBtn.style.display = '';

    // Profil mit Firebase-Daten anreichern (Name, UID)
    syncFirebaseProfile(user);

    // Onboarding zeigen falls noch kein Avatar
    const p = window.pGet ? window.pGet() : {};
    if (!p.onboardingDone) {
      setTimeout(() => {
        if (typeof openOnboardingModal === 'function') openOnboardingModal();
      }, 600);
    }

  } else {
    if (loginBtn)  loginBtn.style.display  = '';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (avatarBtn) avatarBtn.style.display = 'none';
  }
});

// ── Profil-Sync ────────────────────────────────────────────────────────────
function syncFirebaseProfile(user) {
  if (!window.pGet) return;
  const p = window.pGet();

  // Firebase-UID speichern (für spätere Backend-Calls)
  p.uid = user.uid;

  // Nur überschreiben wenn noch kein Name gesetzt
  if ((!p.username || p.username.match(/^\w+\d{4}$/)) && user.displayName) {
    p.username = user.displayName;
  }

  if (window.pSave) window.pSave();
  if (window.profileRender) window.profileRender();

  // Token in memory (not accessible from DevTools like sessionStorage)
  user.getIdToken().then(token => {
    window._geoAuthToken = token;
  });
}

// ── Globale Funktionen (vom HTML aufgerufen) ───────────────────────────────
window.geoAuth = {
  openLogin() {
    window.location.href = 'auth.html';
  },
  async logout() {
    try {
      await signOut(auth);
      window._geoAuthToken = null;
      if (window.showToast) window.showToast('Abgemeldet');
    } catch (err) {
      console.error('[Auth] Logout failed:', err);
    }
  },
  getUser() {
    return auth.currentUser;
  },
};
