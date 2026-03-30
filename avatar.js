/**
 * Avatar Engine — GeoVs
 * Rendert ein einfaches SVG-Gesicht mit wählbaren Features.
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

// ── Haupt-Renderer ──────────────────────────────────────────────────────────
// Gibt einen SVG-<g>-Block zurück, zentriert um (0,0).
// Koordinaten: Gesicht-Radius ~38 Einheiten, Gesamthöhe ~100 Einheiten.
function renderAvatarFace(cfg) {
  const c = Object.assign({}, AVATAR_DEFAULTS, cfg || {});
  const skin = AVATAR_SKIN[c.skin] || AVATAR_SKIN[0];
  const hc   = AVATAR_HAIRC[c.hairColor] || AVATAR_HAIRC[0];
  const dark = (c.hairColor === 1) ? '#333' : '#1a1a1a'; // Augenbrauenfarbe

  // ── Haare (hinter dem Gesicht) ──────────────────────────────────────
  const HAIR_BACK = [
    '', // Keins
    // Kurz
    `<path d="M-36,-12 Q-38,-52 0,-54 Q38,-52 36,-12 Q26,-34 0,-36 Q-26,-34 -36,-12Z" fill="${hc}"/>`,
    // Lang
    `<path d="M-36,-12 Q-38,-52 0,-54 Q38,-52 36,-12 Q26,-34 0,-36 Q-26,-34 -36,-12Z" fill="${hc}"/>
     <path d="M-35,8 Q-50,35 -44,55" stroke="${hc}" stroke-width="10" fill="none" stroke-linecap="round" opacity=".9"/>
     <path d="M35,8 Q50,35 44,55" stroke="${hc}" stroke-width="10" fill="none" stroke-linecap="round" opacity=".9"/>`,
    // Lockig
    `<circle cx="-27" cy="-38" r="12" fill="${hc}"/>
     <circle cx="-8"  cy="-46" r="13" fill="${hc}"/>
     <circle cx="12"  cy="-46" r="12" fill="${hc}"/>
     <circle cx="28"  cy="-38" r="12" fill="${hc}"/>
     <path d="M-36,-12 Q-28,-42 0,-44 Q28,-42 36,-12" fill="${hc}"/>`,
    // Mohawk
    `<path d="M-9,-34 Q-11,-72 0,-80 Q11,-72 9,-34Z" fill="${hc}"/>`,
  ][c.hair] || '';

  // ── Ohren ───────────────────────────────────────────────────────────
  const ears = `
    <ellipse cx="-43" cy="3" rx="7" ry="10" fill="${skin}" stroke="rgba(0,0,0,.1)" stroke-width="1"/>
    <ellipse cx="43"  cy="3" rx="7" ry="10" fill="${skin}" stroke="rgba(0,0,0,.1)" stroke-width="1"/>
    <ellipse cx="-43" cy="3" rx="3.5" ry="5.5" fill="rgba(0,0,0,.08)"/>
    <ellipse cx="43"  cy="3" rx="3.5" ry="5.5" fill="rgba(0,0,0,.08)"/>`;

  // ── Gesichtsform ────────────────────────────────────────────────────
  const FACE_SHAPES = [
    `<circle cx="0" cy="4" r="38" fill="${skin}" stroke="rgba(0,0,0,.12)" stroke-width="1"/>`,
    `<ellipse cx="0" cy="4" rx="30" ry="40" fill="${skin}" stroke="rgba(0,0,0,.12)" stroke-width="1"/>`,
    `<rect x="-30" y="-36" width="60" height="78" rx="18" fill="${skin}" stroke="rgba(0,0,0,.12)" stroke-width="1"/>`,
  ];
  const face = FACE_SHAPES[0]; // Immer rund (einfacher, lässt sich erweitern)

  // ── Augenbrauen ────────────────────────────────────────────────────
  const BROWS = [
    // Normal
    `<path d="M-23,-18 Q-15,-23 -7,-19" stroke="${dark}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
     <path d="M7,-19 Q15,-23 23,-18"  stroke="${dark}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    // Dick
    `<path d="M-23,-17 Q-15,-24 -7,-18" stroke="${dark}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
     <path d="M7,-18  Q15,-24 23,-17"   stroke="${dark}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
    // Hochgezogen
    `<path d="M-23,-24 Q-15,-30 -7,-26" stroke="${dark}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
     <path d="M7,-26  Q15,-30 23,-24"   stroke="${dark}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  ][0]; // Immer Normal (könnte als weiteres Feature exponiert werden)

  // ── Augen ───────────────────────────────────────────────────────────
  const EYES = [
    // Normal
    `<circle cx="-14" cy="-7" r="7.5" fill="white"/>
     <circle cx="14"  cy="-7" r="7.5" fill="white"/>
     <circle cx="-13" cy="-7" r="4.5" fill="#1a1a1a"/>
     <circle cx="15"  cy="-7" r="4.5" fill="#1a1a1a"/>
     <circle cx="-11" cy="-9" r="1.8" fill="white"/>
     <circle cx="17"  cy="-9" r="1.8" fill="white"/>`,
    // Müde (halb geschlossen)
    `<circle cx="-14" cy="-7" r="7.5" fill="white"/>
     <circle cx="14"  cy="-7" r="7.5" fill="white"/>
     <circle cx="-13" cy="-5" r="4.5" fill="#1a1a1a"/>
     <circle cx="15"  cy="-5" r="4.5" fill="#1a1a1a"/>
     <rect x="-22" y="-14" width="17" height="8" fill="${skin}"/>
     <rect x="5"   y="-14" width="17" height="8" fill="${skin}"/>
     <path d="M-22,-8 Q-14,-13 -6,-8" stroke="${dark}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
     <path d="M6,-8  Q14,-13 22,-8"   stroke="${dark}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
    // Froh (^_^)
    `<path d="M-22,-12 Q-14,-5 -6,-12" stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round"/>
     <path d="M6,-12  Q14,-5  22,-12"  stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    // Cool (Sonnenbrille)
    `<rect x="-25" y="-15" width="19" height="14" rx="5" fill="rgba(0,0,0,.88)" stroke="#555" stroke-width="1"/>
     <rect x="6"   y="-15" width="19" height="14" rx="5" fill="rgba(0,0,0,.88)" stroke="#555" stroke-width="1"/>
     <line x1="-6"  y1="-8" x2="6"   y2="-8" stroke="#555" stroke-width="1.5"/>
     <line x1="-25" y1="-8" x2="-32" y2="-6" stroke="#555" stroke-width="1.5"/>
     <line x1="25"  y1="-8" x2="32"  y2="-6" stroke="#555" stroke-width="1.5"/>`,
  ][c.eyes] || '';

  // ── Nase ────────────────────────────────────────────────────────────
  const nose = `
    <ellipse cx="-5" cy="10" rx="4" ry="3" fill="rgba(0,0,0,.08)"/>
    <ellipse cx="5"  cy="10" rx="4" ry="3" fill="rgba(0,0,0,.08)"/>
    <circle  cx="0"  cy="7"  r="2"         fill="rgba(0,0,0,.1)"/>`;

  // ── Mund ────────────────────────────────────────────────────────────
  const MOUTHS = [
    // Lächeln
    `<path d="M-16,23 Q0,36 16,23" stroke="#c0706a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    // Grinsen (offen)
    `<path d="M-16,22 Q0,38 16,22" fill="#6a1515" stroke="#c0706a" stroke-width="1"/>
     <path d="M-14,24 Q0,21 14,24" fill="white"/>
     <line x1="-5" y1="24" x2="-5" y2="26" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>
     <line x1="5"  y1="24" x2="5"  y2="26" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>`,
    // Neutral
    `<line x1="-13" y1="24" x2="13" y2="24" stroke="#c0706a" stroke-width="2.5" stroke-linecap="round"/>`,
    // Smirk
    `<path d="M-6,24 Q5,34 17,22" stroke="#c0706a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  ][c.mouth] || '';

  // ── Bart ────────────────────────────────────────────────────────────
  const BEARDS = [
    '', // Keins
    // Stoppeln
    `<circle cx="-14" cy="32" r="1.8" fill="rgba(0,0,0,.28)"/>
     <circle cx="-8"  cy="35" r="1.8" fill="rgba(0,0,0,.28)"/>
     <circle cx="0"   cy="36" r="1.8" fill="rgba(0,0,0,.28)"/>
     <circle cx="8"   cy="35" r="1.8" fill="rgba(0,0,0,.28)"/>
     <circle cx="14"  cy="32" r="1.8" fill="rgba(0,0,0,.28)"/>
     <circle cx="-10" cy="38" r="1.5" fill="rgba(0,0,0,.22)"/>
     <circle cx="10"  cy="38" r="1.5" fill="rgba(0,0,0,.22)"/>`,
    // Ziegenbart
    `<path d="M-11,29 Q0,44 11,29 Q4,42 0,44 Q-4,42 -11,29Z" fill="${hc}" opacity=".92"/>`,
    // Vollbart
    `<path d="M-35,16 Q-40,32 -34,44 Q-18,56 0,56 Q18,56 34,44 Q40,32 35,16 Q18,32 0,34 Q-18,32 -35,16Z" fill="${hc}" opacity=".92"/>`,
  ][c.beard] || '';

  return `${HAIR_BACK}${ears}${face}${BROWS}${EYES}${nose}${MOUTHS}${BEARDS}`;
}

// ── In-Emblem Renderer ──────────────────────────────────────────────────────
// Injiziert das Gesicht in den SVG-String eines Emblems.
function injectAvatarIntoEmblem(emblemSvg, cfg) {
  if (!cfg) return emblemSvg;
  const face = renderAvatarFace(cfg);
  const avatarGroup = `
    <g transform="translate(75,64) scale(0.52)" style="pointer-events:none">
      <circle cx="0" cy="4" r="44" fill="rgba(13,13,20,.72)"/>
      ${face}
    </g>`;
  // Vor dem schließenden </svg> einfügen
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
window.AvatarEngine = { renderAvatarFace, injectAvatarIntoEmblem, buildAvatarPicker, AVATAR_DEFAULTS };
