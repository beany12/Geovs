/**
 * Brute-Force-Schutz für Auth-Endpunkte.
 *
 * Login:          max. 10 Versuche pro 15 Minuten pro IP
 * Signup:         max. 5  Versuche pro Stunde pro IP
 * Password-Reset: max. 3  Versuche pro Stunde pro IP
 */

const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Zu viele Login-Versuche — bitte 15 Minuten warten' },
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 Stunde
  max: 5,
  message: { error: 'Zu viele Registrierungen von dieser IP — bitte 1 Stunde warten' },
});

const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 Stunde
  max: 3,
  message: { error: 'Zu viele Passwort-Reset-Anfragen — bitte 1 Stunde warten' },
});

module.exports = { loginLimiter, signupLimiter, resetLimiter };
