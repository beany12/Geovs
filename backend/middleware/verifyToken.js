/**
 * verifyToken — Express-Middleware
 *
 * Erwartet im Request-Header:
 *   Authorization: Bearer <Firebase-ID-Token>
 *
 * Verifiziert das Token serverseitig mit dem Firebase Admin SDK.
 * Bei Erfolg wird req.user mit den Token-Claims befüllt:
 *   req.user.uid       — Firebase User-ID
 *   req.user.email     — E-Mail-Adresse
 *   req.user.verified  — E-Mail bestätigt (boolean)
 */

const admin = require('../services/firebase');

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Kein Token angegeben (Authorization: Bearer <token>)' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Firebase prüft Signatur, Ablaufzeit und Aussteller
    const decoded = await admin.auth().verifyIdToken(idToken);

    req.user = {
      uid:      decoded.uid,
      email:    decoded.email,
      verified: decoded.email_verified,
    };

    next();
  } catch (err) {
    // Klare Fehlermeldungen je nach Firebase-Fehlercode
    if (err.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Session abgelaufen — bitte neu einloggen' });
    }
    if (err.code === 'auth/argument-error' || err.code === 'auth/id-token-revoked') {
      return res.status(401).json({ error: 'Ungültiger Token' });
    }
    console.error('[verifyToken]', err.code, err.message);
    return res.status(401).json({ error: 'Authentifizierung fehlgeschlagen' });
  }
}

module.exports = { verifyToken };
