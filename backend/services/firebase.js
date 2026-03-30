/**
 * Firebase Admin SDK — einmalige Initialisierung.
 * Wird von verifyToken.js und den Auth-Routen importiert.
 *
 * Die Service-Account-Credentials kommen AUSSCHLIESSLICH aus der Umgebungsvariable
 * FIREBASE_SERVICE_ACCOUNT (JSON-String) — niemals als Datei im Repo.
 */

const admin = require('firebase-admin');

if (!admin.apps.length) {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!raw) {
    console.error(
      '[Firebase] FIREBASE_SERVICE_ACCOUNT ist nicht gesetzt.\n' +
      '  → Firebase Admin SDK konnte nicht initialisiert werden.\n' +
      '  → Setze die Variable in deinem .env oder Railway-Dashboard.'
    );
    process.exit(1);
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(raw);
  } catch {
    console.error('[Firebase] FIREBASE_SERVICE_ACCOUNT ist kein gültiger JSON-String.');
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('[Firebase] Admin SDK initialisiert ✓');
}

module.exports = admin;
