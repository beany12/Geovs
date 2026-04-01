/**
 * Deploy Firestore security rules.
 * Run from project root: node deploy-rules.js
 *
 * If this fails with a permission error, paste the rules manually:
 *   Firebase Console → Firestore → Rules → paste firestore.rules → Publish
 */
require('dotenv').config({ path: './backend/.env' });
const admin = require('./backend/services/firebase');
const fs = require('fs');

async function deploy() {
  const sr = admin.securityRules();
  const src = fs.readFileSync('./firestore.rules', 'utf8');
  const rf = sr.createRulesFileFromSource('firestore.rules', src);
  const ruleset = await sr.createRuleset(rf);
  console.log('Ruleset created:', ruleset.name);
  await sr.releaseFirestoreRuleset(ruleset);
  console.log('Firestore rules deployed successfully!');
}

deploy().catch(e => {
  console.error('Deploy failed:', e.message);
  console.log('\nManual fallback:');
  console.log('  1. Open: https://console.firebase.google.com/project/geogenius-a5c5e/firestore/rules');
  console.log('  2. Paste the contents of firestore.rules');
  console.log('  3. Click "Publish"');
});
