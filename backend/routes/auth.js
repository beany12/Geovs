/**
 * Auth-Routen
 *
 * POST /api/auth/signup           — Neuen User anlegen (E-Mail + Passwort)
 * POST /api/auth/login            — Token verifizieren + User-Daten zurückgeben
 * POST /api/auth/logout           — Firebase-Token widerrufen
 * POST /api/auth/reset-password   — Passwort-Reset-E-Mail senden
 * GET  /api/auth/profile          — Profil des eingeloggten Users (geschützt)
 *
 * Hinweis: Das eigentliche Login (E-Mail + Passwort → Token) passiert im Frontend
 * über das Firebase Client-SDK. Der Backend-Login-Endpunkt dient nur zur
 * serverseitigen Token-Validierung und gibt User-Daten zurück.
 */

const express = require('express');
const router = express.Router();
const admin = require('../services/firebase');
const { verifyToken } = require('../middleware/verifyToken');
const { loginLimiter, signupLimiter, resetLimiter } = require('../middleware/authLimiter');

// ── Hilfsfunktionen ───────────────────────────────────────────────────────

// Einfache E-Mail-Validierung (serverseitig, zusätzlich zu Firebase)
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Passwort-Mindestanforderungen prüfen
function isValidPassword(pw) {
  return typeof pw === 'string' && pw.length >= 8;
}

// DisplayName sanitisieren — nur Alphanumerisch, Leerzeichen, Bindestriche; max 30 Zeichen
function sanitizeDisplayName(name) {
  if (typeof name !== 'string') return undefined;
  const clean = name.trim().replace(/[^a-zA-Z0-9À-ÿ \-_.]/g, '').slice(0, 30);
  return clean || undefined;
}

// ── POST /api/auth/signup ─────────────────────────────────────────────────
// Legt einen neuen Firebase-User an und sendet eine Bestätigungs-E-Mail.
router.post('/signup', signupLimiter, async (req, res) => {
  const { email, password, displayName } = req.body;

  // Eingabe validieren
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({ error: 'Passwort muss mindestens 8 Zeichen lang sein' });
  }

  try {
    // User in Firebase anlegen — Passwort wird von Firebase gehasht (bcrypt)
    const userRecord = await admin.auth().createUser({
      email: email.trim().toLowerCase(),
      password,
      displayName: sanitizeDisplayName(displayName),
      emailVerified: false,
    });

    // Bestätigungs-E-Mail-Link generieren
    // In Produktion: per E-Mail senden (z.B. via SendGrid/Resend), niemals an Client zurückgeben
    await admin.auth().generateEmailVerificationLink(
      email.trim().toLowerCase()
    );

    console.log(`[Auth] User registriert: ${userRecord.uid}`);

    res.status(201).json({
      message: 'Account erstellt — bitte E-Mail bestätigen',
      uid: userRecord.uid,
    });
  } catch (err) {
    // Firebase-Fehlercodes in lesbare Meldungen übersetzen
    // Unified error message — don't reveal if email exists
    console.error('[Auth/signup]', err.code);
    res.status(400).json({ error: 'Registration failed. Please check your input and try again.' });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────
// Nimmt den vom Frontend generierten Firebase-ID-Token entgegen,
// verifiziert ihn serverseitig und gibt User-Daten zurück.
router.post('/login', loginLimiter, verifyToken, async (req, res) => {
  try {
    // Frische User-Daten aus Firebase laden
    const userRecord = await admin.auth().getUser(req.user.uid);

    console.log(`[Auth] Login: ${userRecord.uid} (${userRecord.email})`);

    res.json({
      uid:          userRecord.uid,
      email:        userRecord.email,
      displayName:  userRecord.displayName || null,
      verified:     userRecord.emailVerified,
      createdAt:    userRecord.metadata.creationTime,
      lastSignIn:   userRecord.metadata.lastSignInTime,
    });
  } catch (err) {
    console.error('[Auth/login]', err.code);
    res.status(500).json({ error: 'Login-Verarbeitung fehlgeschlagen' });
  }
});

// ── POST /api/auth/logout ─────────────────────────────────────────────────
// Widerruft alle Refresh-Tokens des Users — alle offenen Sessions werden
// sofort ungültig (nicht nur das aktuelle Gerät).
router.post('/logout', verifyToken, async (req, res) => {
  try {
    await admin.auth().revokeRefreshTokens(req.user.uid);
    console.log(`[Auth] Token widerrufen: ${req.user.uid}`);
    res.json({ message: 'Erfolgreich abgemeldet' });
  } catch (err) {
    console.error('[Auth/logout]', err.code);
    res.status(500).json({ error: 'Logout fehlgeschlagen' });
  }
});

// ── POST /api/auth/reset-password ─────────────────────────────────────────
// Sendet einen Passwort-Reset-Link an die angegebene E-Mail.
// Gibt immer eine Erfolgsmeldung zurück (verhindert User-Enumeration).
router.post('/reset-password', resetLimiter, async (req, res) => {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
  }

  try {
    const resetLink = await admin.auth().generatePasswordResetLink(
      email.trim().toLowerCase()
    );

    // In Produktion: Link per E-Mail senden (z.B. via SendGrid/Resend)
    console.log(`[Auth] Reset-Link generiert`);

    // Immer dieselbe Antwort — verhindert, dass man prüfen kann ob eine E-Mail existiert
    res.json({ message: 'Falls ein Account existiert, wurde ein Reset-Link gesendet' });
  } catch (err) {
    // Fehler nicht nach außen geben (User-Enumeration verhindern)
    console.error('[Auth/reset-password]', err.code);
    res.json({ message: 'Falls ein Account existiert, wurde ein Reset-Link gesendet' });
  }
});

// ── GET /api/auth/profile ─────────────────────────────────────────────────
// Gibt das Profil des eingeloggten Users zurück.
// Nur erreichbar mit gültigem Firebase-ID-Token.
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.user.uid);

    res.json({
      uid:         userRecord.uid,
      email:       userRecord.email,
      displayName: userRecord.displayName || null,
      verified:    userRecord.emailVerified,
      createdAt:   userRecord.metadata.creationTime,
      // Kein Passwort, kein Hash — niemals zurückgeben
    });
  } catch (err) {
    console.error('[Auth/profile]', err.code);
    res.status(500).json({ error: 'Profil konnte nicht geladen werden' });
  }
});

module.exports = router;
