/**
 * Avatar Engine — GeoVs
 * Rendert ein Silhouette/Bust-Avatar mit wählbaren Features.
 * Wird von app-profile.js und dem Avatar-Builder genutzt.
 */

const AVATAR_SKIN   = ['#FDDBB4','#F0B07A','#D08B5B','#AE5D29','#5C3317'];
const AVATAR_HAIRC  = ['#2C1810','#1A1A1A','#D4A033','#8B0000','#AAAAAA','#E879A0'];

// Labels für den Picker
const AVATAR_LABELS = {
  skin:      ['Hell 1','Hell 2','Mittel','Dunkel 1','Dunkel 2'],
  hair:      ['Keins','Kurz','Lang','Lockig','Mohawk'],
  hairColor: ['Braun','Schwarz','Blond','Rot','Grau','Pink'],
  eyes:      ['Normal','Müde','Froh','Cool'],
  mouth:     ['Lächeln','Grinsen','Neutral','Smirk'],
  beard:     ['Kein','Stoppeln','Ziegenbart','Vollbart'],
};

const AVATAR_DEFAULTS = { skin:0, hair:1, hairColor:0, eyes:0, mouth:0, beard:0 };

// ── Helper ──────────────────────────────────────────────────────────────────
function _avDarken(hex, amount) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  const f = 1 - amount;
  return `rgb(${Math.round(r*f)},${Math.round(g*f)},${Math.round(b*f)})`;
}

// ── Bust/Silhouette Renderer ────────────────────────────────────────────────
// Renders a head+neck+shoulders cameo silhouette centered at (0,0).
// tierColors is optional {c1,c2,c3,c4} — shoulder accent uses tier palette.
function renderBustSilhouette(cfg, tierColors) {
  const c = Object.assign({}, AVATAR_DEFAULTS, cfg || {});
  const skin = AVATAR_SKIN[c.skin] || AVATAR_SKIN[0];
  const hc   = AVATAR_HAIRC[c.hairColor] || AVATAR_HAIRC[0];
  const skinShadow = _avDarken(skin, 0.15);
  const accent = tierColors ? tierColors.c2 : '#3a4a60';
  const accentLight = tierColors ? tierColors.c3 : '#6a8aaa';

  let svg = '';

  // ── Shoulders ──
  svg += `<path d="M -32,28 Q -32,14 -14,12 L -6,11 L 6,11 L 14,12 Q 32,14 32,28 L 32,44 L -32,44 Z"
            fill="${accent}" opacity="0.55"/>`;
  svg += `<path d="M -28,26 Q -28,16 -12,14 L 0,13 L 12,14 Q 28,16 28,26 L 28,30 Q 0,24 -28,30 Z"
            fill="${accentLight}" opacity="0.15"/>`;

  // ── Neck ──
  svg += `<rect x="-5.5" y="4" width="11" height="10" rx="4" fill="${skin}"/>`;
  svg += `<rect x="-5.5" y="4" width="5.5" height="10" rx="4" fill="${skinShadow}" opacity="0.15"/>`;

  // ── Head ──
  svg += `<ellipse cx="0" cy="-10" rx="17" ry="19" fill="${skin}"/>`;
  svg += `<ellipse cx="-9" cy="-3" rx="5" ry="4" fill="${skinShadow}" opacity="0.12"/>`;
  svg += `<ellipse cx="9"  cy="-3" rx="5" ry="4" fill="${skinShadow}" opacity="0.12"/>`;

  // ── Hair ──
  const HAIR_STYLES = [
    '', // None
    // Short
    `<path d="M -17,-12 Q -18,-28 0,-30 Q 18,-28 17,-12 Q 10,-22 0,-23 Q -10,-22 -17,-12 Z" fill="${hc}"/>
     <path d="M -15,-14 Q -16,-26 0,-28 Q 16,-26 15,-14" fill="${hc}" opacity="0.7"/>`,
    // Long
    `<path d="M -17,-12 Q -18,-28 0,-30 Q 18,-28 17,-12 Q 10,-22 0,-23 Q -10,-22 -17,-12 Z" fill="${hc}"/>
     <path d="M -17,-8 Q -22,10 -20,30" stroke="${hc}" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.85"/>
     <path d="M 17,-8 Q 22,10 20,30"   stroke="${hc}" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.85"/>`,
    // Curly
    `<circle cx="-12" cy="-24" r="7" fill="${hc}"/>
     <circle cx="0"   cy="-28" r="8" fill="${hc}"/>
     <circle cx="12"  cy="-24" r="7" fill="${hc}"/>
     <path d="M -16,-14 Q -12,-26 0,-28 Q 12,-26 16,-14" fill="${hc}"/>`,
    // Mohawk
    `<path d="M -5,-24 Q -6,-44 0,-48 Q 6,-44 5,-24 Z" fill="${hc}"/>`,
  ][c.hair] || '';
  svg += HAIR_STYLES;

  // ── Eyes ──
  svg += `<ellipse cx="-6" cy="-12" rx="2.2" ry="2.6" fill="rgba(0,0,0,0.55)"/>`;
  svg += `<ellipse cx="6"  cy="-12" rx="2.2" ry="2.6" fill="rgba(0,0,0,0.55)"/>`;
  svg += `<circle cx="-5" cy="-13" r="0.8" fill="white" opacity="0.6"/>`;
  svg += `<circle cx="7"  cy="-13" r="0.8" fill="white" opacity="0.6"/>`;

  // ── Nose ──
  svg += `<ellipse cx="0" cy="-4" rx="2" ry="1.5" fill="rgba(0,0,0,0.07)"/>`;

  // ── Mouth ──
  svg += `<path d="M -4,0 Q 0,2.5 4,0" stroke="rgba(0,0,0,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>`;

  // ── Beard (simplified for bust scale) ──
  const BEARDS = [
    '', // None
    // Stubble
    `<circle cx="-5" cy="3" r="0.8" fill="rgba(0,0,0,0.2)"/>
     <circle cx="0"  cy="4" r="0.8" fill="rgba(0,0,0,0.2)"/>
     <circle cx="5"  cy="3" r="0.8" fill="rgba(0,0,0,0.2)"/>
     <circle cx="-3" cy="5" r="0.6" fill="rgba(0,0,0,0.15)"/>
     <circle cx="3"  cy="5" r="0.6" fill="rgba(0,0,0,0.15)"/>`,
    // Goatee
    `<path d="M -4,2 Q 0,8 4,2 Q 2,6 0,7 Q -2,6 -4,2 Z" fill="${hc}" opacity="0.85"/>`,
    // Full beard
    `<path d="M -14,0 Q -16,6 -12,10 Q -6,14 0,14 Q 6,14 12,10 Q 16,6 14,0 Q 6,6 0,7 Q -6,6 -14,0 Z" fill="${hc}" opacity="0.85"/>`,
  ][c.beard] || '';
  svg += BEARDS;

  return svg;
}

// ── Legacy Face Renderer (kept for standalone previews) ─────────────────────
function renderAvatarFace(cfg) {
  const c = Object.assign({}, AVATAR_DEFAULTS, cfg || {});
  const skin = AVATAR_SKIN[c.skin] || AVATAR_SKIN[0];
  const hc   = AVATAR_HAIRC[c.hairColor] || AVATAR_HAIRC[0];
  const dark = (c.hairColor === 1) ? '#333' : '#1a1a1a';

  const HAIR_BACK = [
    '',
    `<path d="M-36,-12 Q-38,-52 0,-54 Q38,-52 36,-12 Q26,-34 0,-36 Q-26,-34 -36,-12Z" fill="${hc}"/>`,
    `<path d="M-36,-12 Q-38,-52 0,-54 Q38,-52 36,-12 Q26,-34 0,-36 Q-26,-34 -36,-12Z" fill="${hc}"/>
     <path d="M-35,8 Q-50,35 -44,55" stroke="${hc}" stroke-width="10" fill="none" stroke-linecap="round" opacity=".9"/>
     <path d="M35,8 Q50,35 44,55" stroke="${hc}" stroke-width="10" fill="none" stroke-linecap="round" opacity=".9"/>`,
    `<circle cx="-27" cy="-38" r="12" fill="${hc}"/>
     <circle cx="-8"  cy="-46" r="13" fill="${hc}"/>
     <circle cx="12"  cy="-46" r="12" fill="${hc}"/>
     <circle cx="28"  cy="-38" r="12" fill="${hc}"/>
     <path d="M-36,-12 Q-28,-42 0,-44 Q28,-42 36,-12" fill="${hc}"/>`,
    `<path d="M-9,-34 Q-11,-72 0,-80 Q11,-72 9,-34Z" fill="${hc}"/>`,
  ][c.hair] || '';

  const ears = `
    <ellipse cx="-43" cy="3" rx="7" ry="10" fill="${skin}" stroke="rgba(0,0,0,.1)" stroke-width="1"/>
    <ellipse cx="43"  cy="3" rx="7" ry="10" fill="${skin}" stroke="rgba(0,0,0,.1)" stroke-width="1"/>
    <ellipse cx="-43" cy="3" rx="3.5" ry="5.5" fill="rgba(0,0,0,.08)"/>
    <ellipse cx="43"  cy="3" rx="3.5" ry="5.5" fill="rgba(0,0,0,.08)"/>`;

  const face = `<circle cx="0" cy="4" r="38" fill="${skin}" stroke="rgba(0,0,0,.12)" stroke-width="1"/>`;

  const BROWS = `<path d="M-23,-18 Q-15,-23 -7,-19" stroke="${dark}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
     <path d="M7,-19 Q15,-23 23,-18"  stroke="${dark}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;

  const EYES = [
    `<circle cx="-14" cy="-7" r="7.5" fill="white"/>
     <circle cx="14"  cy="-7" r="7.5" fill="white"/>
     <circle cx="-13" cy="-7" r="4.5" fill="#1a1a1a"/>
     <circle cx="15"  cy="-7" r="4.5" fill="#1a1a1a"/>
     <circle cx="-11" cy="-9" r="1.8" fill="white"/>
     <circle cx="17"  cy="-9" r="1.8" fill="white"/>`,
    `<circle cx="-14" cy="-7" r="7.5" fill="white"/>
     <circle cx="14"  cy="-7" r="7.5" fill="white"/>
     <circle cx="-13" cy="-5" r="4.5" fill="#1a1a1a"/>
     <circle cx="15"  cy="-5" r="4.5" fill="#1a1a1a"/>
     <rect x="-22" y="-14" width="17" height="8" fill="${skin}"/>
     <rect x="5"   y="-14" width="17" height="8" fill="${skin}"/>
     <path d="M-22,-8 Q-14,-13 -6,-8" stroke="${dark}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
     <path d="M6,-8  Q14,-13 22,-8"   stroke="${dark}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
    `<path d="M-22,-12 Q-14,-5 -6,-12" stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round"/>
     <path d="M6,-12  Q14,-5  22,-12"  stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    `<rect x="-25" y="-15" width="19" height="14" rx="5" fill="rgba(0,0,0,.88)" stroke="#555" stroke-width="1"/>
     <rect x="6"   y="-15" width="19" height="14" rx="5" fill="rgba(0,0,0,.88)" stroke="#555" stroke-width="1"/>
     <line x1="-6"  y1="-8" x2="6"   y2="-8" stroke="#555" stroke-width="1.5"/>
     <line x1="-25" y1="-8" x2="-32" y2="-6" stroke="#555" stroke-width="1.5"/>
     <line x1="25"  y1="-8" x2="32"  y2="-6" stroke="#555" stroke-width="1.5"/>`,
  ][c.eyes] || '';

  const nose = `
    <ellipse cx="-5" cy="10" rx="4" ry="3" fill="rgba(0,0,0,.08)"/>
    <ellipse cx="5"  cy="10" rx="4" ry="3" fill="rgba(0,0,0,.08)"/>
    <circle  cx="0"  cy="7"  r="2"         fill="rgba(0,0,0,.1)"/>`;

  const MOUTHS = [
    `<path d="M-16,23 Q0,36 16,23" stroke="#c0706a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    `<path d="M-16,22 Q0,38 16,22" fill="#6a1515" stroke="#c0706a" stroke-width="1"/>
     <path d="M-14,24 Q0,21 14,24" fill="white"/>
     <line x1="-5" y1="24" x2="-5" y2="26" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
     <line x1="5"  y1="24" x2="5"  y2="26" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>`,
    `<line x1="-13" y1="24" x2="13" y2="24" stroke="#c0706a" stroke-width="2.5" stroke-linecap="round"/>`,
    `<path d="M-6,24 Q5,34 17,22" stroke="#c0706a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  ][c.mouth] || '';

  const BEARDS = [
    '',
    `<circle cx="-14" cy="32" r="1.8" fill="rgba(0,0,0,.28)"/>
     <circle cx="-8"  cy="35" r="1.8" fill="rgba(0,0,0,.28)"/>
     <circle cx="0"   cy="36" r="1.8" fill="rgba(0,0,0,.28)"/>
     <circle cx="8"   cy="35" r="1.8" fill="rgba(0,0,0,.28)"/>
     <circle cx="14"  cy="32" r="1.8" fill="rgba(0,0,0,.28)"/>
     <circle cx="-10" cy="38" r="1.5" fill="rgba(0,0,0,.22)"/>
     <circle cx="10"  cy="38" r="1.5" fill="rgba(0,0,0,.22)"/>`,
    `<path d="M-11,29 Q0,44 11,29 Q4,42 0,44 Q-4,42 -11,29Z" fill="${hc}" opacity=".92"/>`,
    `<path d="M-35,16 Q-40,32 -34,44 Q-18,56 0,56 Q18,56 34,44 Q40,32 35,16 Q18,32 0,34 Q-18,32 -35,16Z" fill="${hc}" opacity=".92"/>`,
  ][c.beard] || '';

  return `${HAIR_BACK}${ears}${face}${BROWS}${EYES}${nose}${MOUTHS}${BEARDS}`;
}

// ── In-Emblem Renderer ──────────────────────────────────────────────────────
// Injiziert den Bust-Avatar in den SVG-String eines Emblems.
// tierColors is optional {c1,c2,c3,c4} for shoulder tinting.
let _avClipCounter = 0;
function injectAvatarIntoEmblem(emblemSvg, cfg, tierColors) {
  if (!cfg) return emblemSvg;
  const bust = renderBustSilhouette(cfg, tierColors);
  // Unique clipPath ID to avoid duplicates on the same page
  const clipId = 'av-clip-' + (++_avClipCounter);
  const avatarGroup = `
    <defs><clipPath id="${clipId}"><circle cx="75" cy="64" r="21"/></clipPath></defs>
    <g clip-path="url(#${clipId})">
      <g transform="translate(75,66) scale(0.52)" style="pointer-events:none">
        ${bust}
      </g>
    </g>`;
  return emblemSvg.replace('</svg>', avatarGroup + '</svg>');
}

// ── Picker UI ───────────────────────────────────────────────────────────────
// Baut den Avatar-Builder in den übergebenen Container.
// onChange(cfg) wird bei jeder Änderung aufgerufen.
function buildAvatarPicker(container, initialCfg, onChange) {
  const cfg = Object.assign({}, AVATAR_DEFAULTS, initialCfg || {});

  function fireChange() { onChange && onChange(Object.assign({}, cfg)); }

  function row(labelText, key, items, renderItem) {
    const wrap = document.createElement('div');
    wrap.className = 'av-row';
    const lbl = document.createElement('div');
    lbl.className = 'av-label';
    lbl.textContent = labelText;
    wrap.appendChild(lbl);

    const opts = document.createElement('div');
    opts.className = 'av-opts';

    items.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'av-opt' + (cfg[key] === i ? ' active' : '');
      btn.title = item;
      btn.innerHTML = renderItem(i, item);
      btn.onclick = () => {
        cfg[key] = i;
        opts.querySelectorAll('.av-opt').forEach((b, bi) =>
          b.classList.toggle('active', bi === i)
        );
        fireChange();
      };
      opts.appendChild(btn);
    });
    wrap.appendChild(opts);
    return wrap;
  }

  container.innerHTML = '';

  // Hautton
  container.appendChild(row('Hautton', 'skin', AVATAR_LABELS.skin,
    (i) => `<span style="display:block;width:22px;height:22px;border-radius:50%;background:${AVATAR_SKIN[i]}"></span>`
  ));

  // Frisur
  container.appendChild(row('Frisur', 'hair', AVATAR_LABELS.hair,
    (i, label) => `<span style="font-size:1rem">${['🚫','✂️','💇','🌀','⚡'][i]}</span>`
  ));

  // Haarfarbe
  container.appendChild(row('Haarfarbe', 'hairColor', AVATAR_LABELS.hairColor,
    (i) => `<span style="display:block;width:22px;height:22px;border-radius:50%;background:${AVATAR_HAIRC[i]}"></span>`
  ));

  // Augen
  container.appendChild(row('Augen', 'eyes', AVATAR_LABELS.eyes,
    (i) => `<span style="font-size:1rem">${['👁️','😪','😊','😎'][i]}</span>`
  ));

  // Mund
  container.appendChild(row('Mund', 'mouth', AVATAR_LABELS.mouth,
    (i) => `<span style="font-size:1rem">${['🙂','😁','😐','😏'][i]}</span>`
  ));

  // Bart
  container.appendChild(row('Bart', 'beard', AVATAR_LABELS.beard,
    (i) => `<span style="font-size:1rem">${['🚫','·̤·','🧔','🧔‍♂️'][i]}</span>`
  ));
}

// ── Globale Exports ─────────────────────────────────────────────────────────
window.AvatarEngine = { renderAvatarFace, renderBustSilhouette, injectAvatarIntoEmblem, buildAvatarPicker, AVATAR_DEFAULTS };
