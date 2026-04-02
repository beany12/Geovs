/* ══════════════════════════════════════════
   PROFILE / LEVEL / XP SYSTEM
══════════════════════════════════════════ */
const LEVELS=[
  {lvl:1, name:'Wanderer',          color:'#a09080',tier:'wanderer',    xp:0},      // Start
  {lvl:2, name:'Explorer',          color:'#cd7f32',tier:'explorer',    xp:300},     // ~3-4 games
  {lvl:3, name:'Pathfinder',        color:'#9abed8',tier:'pathfinder',  xp:900},     // ~10-12 games
  {lvl:4, name:'Cartographer',      color:'#ffd700',tier:'cartographer',xp:2000},    // ~22-28 games
  {lvl:5, name:'Navigator',         color:'#40d8c4',tier:'navigator',   xp:4000},    // ~45-55 games
  {lvl:6, name:'Globetrotter',      color:'#28c860',tier:'globetrotter',xp:7500},    // ~85-100 games
  {lvl:7, name:'Atlas',             color:'#70b8ff',tier:'atlas',       xp:12500},   // ~140-170 games
  {lvl:8, name:'World Scholar',     color:'#c840f0',tier:'worldscholar',xp:20000},   // ~220-270 games
  {lvl:9, name:'Oracle of Nations', color:'#e82848',tier:'oracle',      xp:30000},   // ~330-400 games
  {lvl:10,name:'Sovereign of Earth',color:'#70e8ff',tier:'sovereign',   xp:45000},   // ~500-600 games
];
const TIERS={
  wanderer:    {label:'Wanderer',      color:'#a09080',c1:'#2e2622',c2:'#7a6a60',c3:'#a89080',c4:'#d8c8be',glow:'rgba(122,106,96,0.6)'  },
  explorer:    {label:'Explorer',      color:'#cd7f32',c1:'#6b3f1e',c2:'#cd7f32',c3:'#e8a060',c4:'#f5d8a8',glow:'rgba(205,127,50,0.65)' },
  pathfinder:  {label:'Pathfinder',    color:'#9abed8',c1:'#3a4e60',c2:'#7aaabb',c3:'#b8d4e8',c4:'#e0f0fc',glow:'rgba(176,210,232,0.65)'},
  cartographer:{label:'Cartographer',  color:'#ffd700',c1:'#5a3e00',c2:'#d4960c',c3:'#ffd700',c4:'#fff5b0',glow:'rgba(255,215,0,0.70)'  },
  navigator:   {label:'Navigator',     color:'#40d8c4',c1:'#083838',c2:'#1a9888',c3:'#40d8c4',c4:'#b0f0e8',glow:'rgba(64,216,196,0.70)' },
  globetrotter:{label:'Globetrotter',  color:'#28c860',c1:'#082e1a',c2:'#1a8840',c3:'#28c860',c4:'#96f0b8',glow:'rgba(40,200,96,0.70)'  },
  atlas:       {label:'Atlas',         color:'#70b8ff',c1:'#081840',c2:'#1a50d8',c3:'#70b8ff',c4:'#c8e8ff',glow:'rgba(112,184,255,0.75)'},
  worldscholar:{label:'World Scholar', color:'#c840f0',c1:'#280450',c2:'#8824b0',c3:'#c840f0',c4:'#f0b0ff',glow:'rgba(200,64,240,0.75)' },
  oracle:      {label:'Oracle',        color:'#e82848',c1:'#400010',c2:'#b01028',c3:'#e82848',c4:'#ffa0b0',glow:'rgba(232,40,72,0.75)'  },
  sovereign:   {label:'Sovereign',     color:'#70e8ff',c1:'#081828',c2:'#28a8d8',c3:'#70e8ff',c4:'#c0f8ff',glow:'rgba(112,232,255,0.85)'},
};
const LVL_EMOJI=['','🌿','🧭','🗺️','⚓','🌐','✈️','📐','🎓','🔮','👑'];

let _profileData=null;
function pGet(){
  if(_profileData&&_profileData.username)return _profileData;
  try{const r=localStorage.getItem('geovs_p');if(r){_profileData=JSON.parse(r);return _profileData;}}catch(e){}
  const adj=['Swift','Bold','Keen','Wild','Brave','Sharp','Clever','Calm','Bright','Epic'];
  const noun=['Explorer','Pioneer','Voyager','Nomad','Ranger','Scout','Drifter','Seeker','Wanderer','Mapper'];
  _profileData={username:adj[Math.floor(Math.random()*10)]+noun[Math.floor(Math.random()*10)]+(1000+Math.floor(Math.random()*9000)),xp:0,games:0,avatar:null};
  try{localStorage.setItem('geovs_p',JSON.stringify(_profileData));}catch(e){}
  return _profileData;
}
function pSave(){if(!_profileData)return;try{localStorage.setItem('geovs_p',JSON.stringify(_profileData));}catch(e){}}

function getLvlData(xp){
  let cur=LEVELS[0];
  for(let i=LEVELS.length-1;i>=0;i--){if(xp>=LEVELS[i].xp){cur=LEVELS[i];break;}}
  let nxt=null;
  for(let j=0;j<LEVELS.length;j++){if(LEVELS[j].xp>xp){nxt=LEVELS[j];break;}}
  const xi=xp-cur.xp,xn=nxt?nxt.xp-cur.xp:1;
  return{cur,nxt,pct:nxt?Math.min(100,Math.round(xi/xn*100)):100,xi,xn};
}

/* ── LoL-style wing emblem generator ──────────────────────────── */
const _EG=(function(){
  const BL={
    1:[[56,73,14,36,5]],
    2:[[54,69,11,31,4],[63,77,26,53,4]],
    3:[[53,68,7,27,4],[62,76,22,50,4]],
    4:[[52,65,6,23,3],[59,70,17,40,3],[66,78,30,58,4]],
    5:[[51,64,4,21,3],[58,69,15,37,3],[65,77,28,56,4]],
    6:[[50,63,3,19,3],[57,68,13,34,3],[63,76,25,53,4]],
    7:[[49,62,3,17,3],[55,66,11,30,3],[61,72,20,46,3],[68,80,32,62,4]],
    8:[[48,61,2,15,3],[54,65,9,27,3],[60,71,18,43,3],[67,79,30,60,4]],
    9:[[47,59,2,13,3],[52,63,8,25,3],[58,68,16,40,3],[64,75,26,55,3],[71,83,38,66,4]],
    10:[[46,58,1,11,3],[51,62,6,22,3],[57,67,13,37,3],[63,74,23,52,3],[70,82,35,64,4]]
  };
  const mx=x=>(150-x).toFixed(1),f=v=>v.toFixed(1);
  function wings(lv,t){
    const bl=BL[lv]||BL[1],n=bl.length;let s='';
    for(let i=n-1;i>=0;i--){
      const[uby,lby,tx,tmy,ts]=bl[i],uty=tmy-ts,lty=tmy+ts,mby=(uby+lby)/2;
      const fl=i===0?t.c2:t.c1,fl2=i===0?t.c3:t.c2;
      s+=`<path d="M 54,${uby} L ${tx},${uty} L ${tx},${lty} L 54,${lby} Z" fill="black" opacity=".28" transform="translate(1.5,2)"/>`;
      s+=`<path d="M 54,${uby} L ${tx},${uty} L ${tx},${lty} L 54,${lby} Z" fill="${fl}" stroke="${t.c1}" stroke-width=".5"/>`;
      s+=`<path d="M 54,${uby} L ${tx},${uty} L ${tx},${tmy} L 54,${f(mby)} Z" fill="${fl2}" opacity=".35"/>`;
      s+=`<line x1="54" y1="${uby}" x2="${tx}" y2="${uty}" stroke="${t.c4}" stroke-width=".8" opacity=".55"/>`;
      s+=`<path d="M ${mx(54)},${uby} L ${mx(tx)},${uty} L ${mx(tx)},${lty} L ${mx(54)},${lby} Z" fill="black" opacity=".28" transform="translate(-1.5,2)"/>`;
      s+=`<path d="M ${mx(54)},${uby} L ${mx(tx)},${uty} L ${mx(tx)},${lty} L ${mx(54)},${lby} Z" fill="${fl}" stroke="${t.c1}" stroke-width=".5"/>`;
      s+=`<path d="M ${mx(54)},${uby} L ${mx(tx)},${uty} L ${mx(tx)},${tmy} L ${mx(54)},${f(mby)} Z" fill="${fl2}" opacity=".35"/>`;
      s+=`<line x1="${mx(54)}" y1="${uby}" x2="${mx(tx)}" y2="${uty}" stroke="${t.c4}" stroke-width=".8" opacity=".55"/>`;
      if(lv>=4){s+=`<line x1="54" y1="${f(mby)}" x2="${tx}" y2="${tmy}" stroke="${t.c3}" stroke-width=".55" opacity=".35"/>`;s+=`<line x1="${mx(54)}" y1="${f(mby)}" x2="${mx(tx)}" y2="${tmy}" stroke="${t.c3}" stroke-width=".55" opacity=".35"/>`;}
    }
    if(lv>=4){
      s+=`<path d="M 54,53 L 42,49 L 39,54 L 42,59 L 54,57" fill="${t.c1}" stroke="${t.c2}" stroke-width=".9" opacity=".95"/>`;
      s+=`<path d="M ${mx(54)},53 L ${mx(42)},49 L ${mx(39)},54 L ${mx(42)},59 L ${mx(54)},57" fill="${t.c1}" stroke="${t.c2}" stroke-width=".9" opacity=".95"/>`;
      s+=`<line x1="54" y1="53" x2="42" y2="49" stroke="${t.c3}" stroke-width=".6" opacity=".5"/>`;
      s+=`<line x1="${mx(54)}" y1="53" x2="${mx(42)}" y2="49" stroke="${t.c3}" stroke-width=".6" opacity=".5"/>`;
    }
    return s;
  }
  function ring(lv,t){
    const cx=75,cy=64,r=22;let s='';
    s+=`<circle cx="${cx}" cy="${cy}" r="${r+3}" fill="none" stroke="${t.c2}" stroke-width="4" opacity=".12"/>`;
    if(lv>=7)s+=`<circle cx="${cx}" cy="${cy}" r="${r+5}" fill="none" stroke="${t.c1}" stroke-width="1" opacity=".45"/>`;
    if(lv>=9)s+=`<circle cx="${cx}" cy="${cy}" r="${r+8}" fill="none" stroke="${t.c2}" stroke-width=".7" opacity=".25"/>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="${r+1}" fill="none" stroke="${t.c2}" stroke-width="2.8"/>`;
    if(lv>=4)s+=`<circle cx="${cx}" cy="${cy}" r="${r-2}" fill="none" stroke="${t.c2}" stroke-width=".8" opacity=".4"/>`;
    if(lv>=7){const tk=16;for(let i=0;i<tk;i++){const a=(i/tk)*Math.PI*2-Math.PI/2,lg=i%4===0,r2=r+(lg?4:2.5);s+=`<line x1="${f(cx+Math.cos(a)*(r-1))}" y1="${f(cy+Math.sin(a)*(r-1))}" x2="${f(cx+Math.cos(a)*r2)}" y2="${f(cy+Math.sin(a)*r2)}" stroke="${t.c3}" stroke-width="${lg?1:.7}" opacity=".5"/>`;}}
    if(lv>=4)[[0],[Math.PI/2],[Math.PI],[Math.PI*3/2]].forEach(([a])=>{const sx=cx+Math.cos(a)*(r+1),sy=cy+Math.sin(a)*(r+1);s+=`<polygon points="${f(sx)},${f(sy-2.5)} ${f(sx+2)},${f(sy)} ${f(sx)},${f(sy+2.5)} ${f(sx-2)},${f(sy)}" fill="${t.c3}" stroke="${t.c1}" stroke-width=".4"/>`;});
    return s;
  }
  function topOrn(lv,t){
    const cx=75,top=42;let s='';
    if(lv===1){s+=`<polygon points="${cx},${top-1} ${cx-4},${top-10} ${cx+4},${top-10}" fill="${t.c2}"/>`;s+=`<line x1="${cx}" y1="${top-1}" x2="${cx}" y2="${top-10}" stroke="${t.c4}" stroke-width=".7" opacity=".5"/>`;}
    else if(lv===2){s+=`<polygon points="${cx},${top-1} ${cx-6},${top-10} ${cx},${top-18} ${cx+6},${top-10}" fill="${t.c2}" stroke="${t.c1}" stroke-width=".8"/>`;s+=`<polygon points="${cx},${top-5} ${cx-3},${top-10} ${cx},${top-16} ${cx+3},${top-10}" fill="${t.c4}" opacity=".45"/>`;}
    else if(lv===3){s+=`<path d="M ${cx-5},${top-2} L ${cx-9},${top-9} L ${cx-5},${top-16} L ${cx},${top-21} L ${cx+5},${top-16} L ${cx+9},${top-9} L ${cx+5},${top-2}" fill="${t.c2}" stroke="${t.c1}" stroke-width=".8"/>`;s+=`<polygon points="${cx},${top-5} ${cx-3.5},${top-11} ${cx},${top-19} ${cx+3.5},${top-11}" fill="${t.c4}" opacity=".4"/>`;}
    else if(lv===4){s+=`<path d="M ${cx-6},${top-3} L ${cx-11},${top-10} L ${cx-6},${top-17} L ${cx},${top-23} L ${cx+6},${top-17} L ${cx+11},${top-10} L ${cx+6},${top-3}" fill="${t.c2}" stroke="${t.c1}" stroke-width=".8"/>`;s+=`<polygon points="${cx},${top-6} ${cx-4},${top-12} ${cx},${top-21} ${cx+4},${top-12}" fill="${t.c4}" opacity=".4"/>`;s+=`<path d="M ${cx-11},${top-10} L ${cx-20},${top-7} L ${cx-18},${top-14} L ${cx-11},${top-13}" fill="${t.c1}" stroke="${t.c2}" stroke-width=".5" opacity=".85"/>`;s+=`<path d="M ${cx+11},${top-10} L ${cx+20},${top-7} L ${cx+18},${top-14} L ${cx+11},${top-13}" fill="${t.c1}" stroke="${t.c2}" stroke-width=".5" opacity=".85"/>`;}
    else if(lv===5){s+=`<path d="M ${cx-7},${top-3} L ${cx-13},${top-11} L ${cx-8},${top-19} L ${cx},${top-25} L ${cx+8},${top-19} L ${cx+13},${top-11} L ${cx+7},${top-3}" fill="${t.c2}" stroke="${t.c1}" stroke-width=".8"/>`;s+=`<polygon points="${cx},${top-7} ${cx-5},${top-13} ${cx},${top-23} ${cx+5},${top-13}" fill="${t.c4}" opacity=".45"/>`;s+=`<path d="M ${cx-13},${top-11} L ${cx-24},${top-7} L ${cx-22},${top-16} L ${cx-13},${top-14}" fill="${t.c1}" stroke="${t.c2}" stroke-width=".5" opacity=".9"/>`;s+=`<path d="M ${cx+13},${top-11} L ${cx+24},${top-7} L ${cx+22},${top-16} L ${cx+13},${top-14}" fill="${t.c1}" stroke="${t.c2}" stroke-width=".5" opacity=".9"/>`;s+=`<circle cx="${cx}" cy="${top-26}" r="2.5" fill="${t.c3}" stroke="${t.c1}" stroke-width=".6"/>`;}
    else if(lv===6){s+=`<path d="M ${cx-8},${top-3} L ${cx-14},${top-12} L ${cx-9},${top-20} L ${cx},${top-27} L ${cx+9},${top-20} L ${cx+14},${top-12} L ${cx+8},${top-3}" fill="${t.c2}" stroke="${t.c1}" stroke-width=".8"/>`;s+=`<path d="M ${cx},${top-5} L ${cx-5},${top-13} L ${cx},${top-25} L ${cx+5},${top-13} Z" fill="${t.c4}" opacity=".4"/>`;s+=`<path d="M ${cx-14},${top-12} L ${cx-26},${top-7} L ${cx-24},${top-16} L ${cx-14},${top-15}" fill="${t.c1}" stroke="${t.c2}" stroke-width=".5"/>`;s+=`<path d="M ${cx+14},${top-12} L ${cx+26},${top-7} L ${cx+24},${top-16} L ${cx+14},${top-15}" fill="${t.c1}" stroke="${t.c2}" stroke-width=".5"/>`;s+=`<circle cx="${cx}" cy="${top-28}" r="3" fill="${t.c3}" stroke="${t.c1}" stroke-width=".7"/>`;s+=`<circle cx="${cx}" cy="${top-28}" r="1.4" fill="${t.c4}" opacity=".8"/>`;}
    else if(lv===7){const by=top-4;s+=`<rect x="${cx-11}" y="${by-7}" width="22" height="6" rx="1.2" fill="${t.c1}" stroke="${t.c2}" stroke-width=".9"/>`;s+=`<polygon points="${cx-10},${by-7} ${cx-7.5},${by-20} ${cx-5},${by-7}" fill="${t.c2}"/>`;s+=`<polygon points="${cx-1.5},${by-7} ${cx},${by-28} ${cx+1.5},${by-7}" fill="${t.c3}"/>`;s+=`<polygon points="${cx+5},${by-7} ${cx+7.5},${by-20} ${cx+10},${by-7}" fill="${t.c2}"/>`;s+=`<circle cx="${cx}" cy="${by-30}" r="4" fill="${t.c3}" stroke="${t.c2}" stroke-width=".8"/>`;s+=`<circle cx="${cx}" cy="${by-30}" r="1.8" fill="${t.c4}" opacity=".75"/>`;s+=`<circle cx="${cx-7.5}" cy="${by-21}" r="2.5" fill="${t.c3}" stroke="${t.c2}" stroke-width=".6"/>`;s+=`<circle cx="${cx+7.5}" cy="${by-21}" r="2.5" fill="${t.c3}" stroke="${t.c2}" stroke-width=".6"/>`;}
    else if(lv===8){const by=top-4;s+=`<rect x="${cx-12}" y="${by-8}" width="24" height="6" rx="1.2" fill="${t.c1}" stroke="${t.c2}" stroke-width=".9"/>`;s+=`<polygon points="${cx-11},${by-8} ${cx-8.5},${by-22} ${cx-5.5},${by-8}" fill="${t.c2}"/>`;s+=`<polygon points="${cx-1.5},${by-8} ${cx},${by-31} ${cx+1.5},${by-8}" fill="${t.c3}"/>`;s+=`<polygon points="${cx+5.5},${by-8} ${cx+8.5},${by-22} ${cx+11},${by-8}" fill="${t.c2}"/>`;s+=`<path d="M ${cx-12},${by-5} L ${cx-22},${by-14} L ${cx-18},${by-8} L ${cx-12},${by-8}" fill="${t.c2}" opacity=".85"/>`;s+=`<path d="M ${cx+12},${by-5} L ${cx+22},${by-14} L ${cx+18},${by-8} L ${cx+12},${by-8}" fill="${t.c2}" opacity=".85"/>`;s+=`<circle cx="${cx}" cy="${by-33}" r="4.5" fill="${t.c3}" stroke="${t.c2}" stroke-width=".9"/>`;s+=`<circle cx="${cx}" cy="${by-33}" r="2" fill="${t.c4}" opacity=".8"/>`;s+=`<circle cx="${cx-8.5}" cy="${by-23}" r="2.8" fill="${t.c3}" stroke="${t.c2}" stroke-width=".6"/>`;s+=`<circle cx="${cx+8.5}" cy="${by-23}" r="2.8" fill="${t.c3}" stroke="${t.c2}" stroke-width=".6"/>`;s+=`<circle cx="${cx-22}" cy="${by-14}" r="1.8" fill="${t.c3}"/>`;s+=`<circle cx="${cx+22}" cy="${by-14}" r="1.8" fill="${t.c3}/>`;}
    else if(lv===9){const by=top-4;s+=`<rect x="${cx-13}" y="${by-8}" width="26" height="6" rx="1.2" fill="${t.c1}" stroke="${t.c2}" stroke-width="1"/>`;s+=`<polygon points="${cx-12},${by-8} ${cx-9},${by-24} ${cx-5},${by-8}" fill="${t.c2}"/>`;s+=`<polygon points="${cx-1.5},${by-8} ${cx},${by-34} ${cx+1.5},${by-8}" fill="${t.c3}"/>`;s+=`<polygon points="${cx+5},${by-8} ${cx+9},${by-24} ${cx+12},${by-8}" fill="${t.c2}"/>`;s+=`<path d="M ${cx-13},${by-5} L ${cx-25},${by-15} L ${cx-21},${by-9} L ${cx-13},${by-9}" fill="${t.c2}" stroke="${t.c1}" stroke-width=".5"/>`;s+=`<path d="M ${cx+13},${by-5} L ${cx+25},${by-15} L ${cx+21},${by-9} L ${cx+13},${by-9}" fill="${t.c2}" stroke="${t.c1}" stroke-width=".5"/>`;s+=`<path d="M ${cx-21},${by-10} L ${cx-30},${by-16} L ${cx-27},${by-13}" fill="${t.c1}" opacity=".7"/>`;s+=`<path d="M ${cx+21},${by-10} L ${cx+30},${by-16} L ${cx+27},${by-13}" fill="${t.c1}" opacity=".7"/>`;s+=`<circle cx="${cx}" cy="${by-36}" r="5" fill="${t.c3}" stroke="${t.c2}" stroke-width="1"/>`;s+=`<circle cx="${cx}" cy="${by-36}" r="2.3" fill="${t.c4}" opacity=".85"/>`;s+=`<circle cx="${cx}" cy="${by-36}" r=".9" fill="white" opacity=".9"/>`;s+=`<circle cx="${cx-9}" cy="${by-25}" r="3" fill="${t.c3}" stroke="${t.c2}" stroke-width=".7"/>`;s+=`<circle cx="${cx+9}" cy="${by-25}" r="3" fill="${t.c3}" stroke="${t.c2}" stroke-width=".7"/>`;s+=`<circle cx="${cx-25}" cy="${by-15}" r="2" fill="${t.c3}"/>`;s+=`<circle cx="${cx+25}" cy="${by-15}" r="2" fill="${t.c3}"/>`;}
    else{const by=top-4;s+=`<rect x="${cx-14}" y="${by-9}" width="28" height="7" rx="1.5" fill="${t.c1}" stroke="${t.c2}" stroke-width="1"/>`;s+=`<path d="M ${cx-14},${by-5} L ${cx-28},${by-16} L ${cx-23},${by-10} L ${cx-14},${by-9}" fill="${t.c2}" stroke="${t.c1}" stroke-width=".5"/>`;s+=`<path d="M ${cx+14},${by-5} L ${cx+28},${by-16} L ${cx+23},${by-10} L ${cx+14},${by-9}" fill="${t.c2}" stroke="${t.c1}" stroke-width=".5"/>`;s+=`<polygon points="${cx-12},${by-9} ${cx-9.5},${by-25} ${cx-6},${by-9}" fill="${t.c2}"/>`;s+=`<polygon points="${cx-1.5},${by-9} ${cx},${by-38} ${cx+1.5},${by-9}" fill="${t.c4}"/>`;s+=`<polygon points="${cx+6},${by-9} ${cx+9.5},${by-25} ${cx+12},${by-9}" fill="${t.c2}"/>`;s+=`<polygon points="${cx-14},${by-9} ${cx-16},${by-18} ${cx-12},${by-9}" fill="${t.c1}" opacity=".8"/>`;s+=`<polygon points="${cx+14},${by-9} ${cx+16},${by-18} ${cx+12},${by-9}" fill="${t.c1}" opacity=".8"/>`;s+=`<circle cx="${cx}" cy="${by-41}" r="6" fill="${t.c2}" stroke="${t.c3}" stroke-width="1.2"/>`;s+=`<circle cx="${cx}" cy="${by-41}" r="3.5" fill="${t.c3}"/>`;s+=`<circle cx="${cx}" cy="${by-41}" r="1.5" fill="${t.c4}" opacity=".9"/>`;s+=`<circle cx="${cx}" cy="${by-41}" r=".6" fill="white"/>`;s+=`<circle cx="${cx-9.5}" cy="${by-26}" r="3.2" fill="${t.c3}" stroke="${t.c2}" stroke-width=".7"/>`;s+=`<circle cx="${cx+9.5}" cy="${by-26}" r="3.2" fill="${t.c3}" stroke="${t.c2}" stroke-width=".7"/>`;s+=`<circle cx="${cx-28}" cy="${by-16}" r="2.2" fill="${t.c3}" stroke="${t.c2}" stroke-width=".5"/>`;s+=`<circle cx="${cx+28}" cy="${by-16}" r="2.2" fill="${t.c3}" stroke="${t.c2}" stroke-width=".5"/>`;}
    return s;
  }
  function botOrn(lv,t){
    const cx=75,bot=86;if(lv<7)return'';let s='';
    if(lv<=8){s+=`<path d="M ${cx-24},${bot+2} L ${cx-13},${bot+11} L ${cx},${bot+9} L ${cx+13},${bot+11} L ${cx+24},${bot+2}" fill="none" stroke="${t.c2}" stroke-width="1.5"/>`;s+=`<line x1="${cx}" y1="${bot+2}" x2="${cx}" y2="${bot+9}" stroke="${t.c2}" stroke-width="1" opacity=".6"/>`;s+=`<circle cx="${cx}" cy="${bot+9}" r="2" fill="${t.c3}" opacity=".8"/>`;}
    else{s+=`<path d="M ${cx-30},${bot+2} L ${cx-20},${bot+13} L ${cx-8},${bot+11} L ${cx},${bot+9} L ${cx+8},${bot+11} L ${cx+20},${bot+13} L ${cx+30},${bot+2}" fill="none" stroke="${t.c2}" stroke-width="1.5"/>`;s+=`<path d="M ${cx-22},${bot+7} L ${cx},${bot+18} L ${cx+22},${bot+7}" fill="none" stroke="${t.c1}" stroke-width="1" opacity=".5"/>`;s+=`<circle cx="${cx}" cy="${bot+9}" r="2.5" fill="${t.c3}" stroke="${t.c2}" stroke-width=".7"/>`;s+=`<circle cx="${cx-20}" cy="${bot+13}" r="2" fill="${t.c3}" opacity=".7"/>`;s+=`<circle cx="${cx+20}" cy="${bot+13}" r="2" fill="${t.c3}" opacity=".7"/>`;if(lv===10){s+=`<path d="M ${cx-32},${bot+2} L ${cx-24},${bot+6}" fill="none" stroke="${t.c2}" stroke-width="1" opacity=".5"/>`;s+=`<path d="M ${cx+32},${bot+2} L ${cx+24},${bot+6}" fill="none" stroke="${t.c2}" stroke-width="1" opacity=".5"/>`;s+=`<circle cx="${cx-30}" cy="${bot+2}" r="1.5" fill="${t.c3}" opacity=".6"/>`;s+=`<circle cx="${cx+30}" cy="${bot+2}" r="1.5" fill="${t.c3}" opacity=".6"/>`;}}
    return s;
  }
  return function gen(lv){
    const ld=LEVELS[(lv||1)-1]||LEVELS[0];
    const t=TIERS[ld.tier]||TIERS.wanderer;
    return`<svg viewBox="0 0 150 112" xmlns="http://www.w3.org/2000/svg" overflow="visible">${wings(lv,t)}<circle cx="75" cy="64" r="21" fill="#12192a"/>${ring(lv,t)}${topOrn(lv,t)}${botOrn(lv,t)}</svg>`;
  };
})();

function _getTierColors(lvl){
  const ld=LEVELS[(lvl||1)-1]||LEVELS[0];
  return TIERS[ld.tier]||TIERS.wanderer;
}
function drawEmblem(lvl,sz){
  const s=sz||1;
  const w=Math.round(88*s),h=Math.round(66*s);
  let svg=_EG(lvl).replace('<svg ','<svg width="'+w+'" height="'+h+'" ');
  try{
    const p=_profileData||JSON.parse(localStorage.getItem('geovs_p')||'{}');
    if(p.avatar&&window.AvatarEngine){svg=window.AvatarEngine.injectAvatarIntoEmblem(svg,p.avatar,_getTierColors(lvl));}
  }catch(e){}
  return`<div style="width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;pointer-events:none">${svg}</div>`;
}
// Draw emblem for a specific avatar (used in multiplayer to show opponent)
function drawEmblemFor(lvl,sz,avatar){
  const s=sz||1;
  const w=Math.round(88*s),h=Math.round(66*s);
  let svg=_EG(lvl).replace('<svg ','<svg width="'+w+'" height="'+h+'" ');
  try{
    if(avatar&&window.AvatarEngine){svg=window.AvatarEngine.injectAvatarIntoEmblem(svg,avatar,_getTierColors(lvl));}
  }catch(e){}
  return`<div style="width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;pointer-events:none">${svg}</div>`;
}

// (old hardcoded SVG emblems removed — replaced by _EG generator above)
function _drawEmblemOld(lvl,sz){
  const s=sz||1;
  const w=Math.round(80*s),h=Math.round(85*s);
  const svgs={
1:`<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="e1s" cx=".45" cy=".35"><stop offset="0%" stop-color="#5a5a5a"/><stop offset="80%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#1a1a1a"/></radialGradient><linearGradient id="e1g" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="#9a8a50"/><stop offset="50%" stop-color="#6a5a30"/><stop offset="100%" stop-color="#8a7a40"/></linearGradient></defs><circle cx="75" cy="65" r="58" fill="url(#e1g)" stroke="#4a3a20" stroke-width="1.5"/><circle cx="75" cy="65" r="54" fill="url(#e1s)" stroke="#3a3a3a" stroke-width="1"/><path d="M45,50 L55,65 L50,80" stroke="#3a4a30" stroke-width="1.2" fill="none" opacity=".7"/><path d="M95,45 L88,60 L92,78" stroke="#3a4a30" stroke-width="1" fill="none" opacity=".5"/><path d="M68,90 Q58,70 68,50 Q73,43 75,48 Q77,43 82,50 Q92,70 82,90" fill="none" stroke="#5a7a40" stroke-width="3" stroke-linejoin="round"/><line x1="75" y1="50" x2="75" y2="85" stroke="#4a6a35" stroke-width="1.8"/><path d="M112,32 L120,25 L124,36 L118,44Z" fill="#3a3a3a" stroke="#6a5a30" stroke-width="1"/><text x="75" y="134" text-anchor="middle" fill="#5a5a5a" font-size="14" font-weight="900" font-family="serif">I</text></svg>`,
2:`<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="e2b" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c88040"/><stop offset="40%" stop-color="#8a5a28"/><stop offset="100%" stop-color="#d09050"/></linearGradient><radialGradient id="e2s" cx=".4" cy=".35"><stop offset="0%" stop-color="#404040"/><stop offset="100%" stop-color="#1a1a1a"/></radialGradient></defs><rect x="18" y="8" width="114" height="114" rx="10" fill="url(#e2b)" stroke="#5a3a18" stroke-width="1.5"/><rect x="26" y="16" width="98" height="98" rx="6" fill="url(#e2s)" stroke="#4a4a4a" stroke-width=".8"/><circle cx="75" cy="65" r="32" fill="none" stroke="#c08040" stroke-width="1.5" opacity=".5"/><polygon points="75,33 79,58 75,52 71,58" fill="#d4a050" stroke="#8a6030" stroke-width=".5"/><polygon points="75,97 71,72 75,78 79,72" fill="#7a5528"/><polygon points="107,65 82,61 88,65 82,69" fill="#d4a050"/><polygon points="43,65 68,69 62,65 68,61" fill="#7a5528"/><text x="75" y="43" text-anchor="middle" fill="#c08040" font-size="7" font-weight="bold" font-family="serif">N</text><circle cx="32" cy="22" r="3" fill="#8a6a30" stroke="#5a4a20" stroke-width=".8"/><circle cx="118" cy="22" r="3" fill="#8a6a30" stroke="#5a4a20" stroke-width=".8"/><circle cx="32" cy="108" r="3" fill="#8a6a30" stroke="#5a4a20" stroke-width=".8"/><circle cx="118" cy="108" r="3" fill="#8a6a30" stroke="#5a4a20" stroke-width=".8"/><text x="75" y="136" text-anchor="middle" fill="#c08040" font-size="13" font-weight="900" font-family="serif">II</text></svg>`,
3:`<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="e3o" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e0e8e0"/><stop offset="50%" stop-color="#a0b0a0"/><stop offset="100%" stop-color="#c0d0c0"/></linearGradient><radialGradient id="e3m" cx=".5" cy=".45"><stop offset="0%" stop-color="#d4c090"/><stop offset="100%" stop-color="#8a7a50"/></radialGradient><filter id="e3gl"><feGaussianBlur stdDeviation="3"/></filter></defs><ellipse cx="75" cy="65" rx="65" ry="52" fill="url(#e3o)" stroke="#608060" stroke-width="2"/><ellipse cx="20" cy="45" rx="6" ry="8" fill="#22a855" stroke="#1a7a3a" stroke-width="1" transform="rotate(-20,20,45)"/><ellipse cx="130" cy="45" rx="6" ry="8" fill="#22a855" stroke="#1a7a3a" stroke-width="1" transform="rotate(20,130,45)"/><ellipse cx="20" cy="85" rx="6" ry="8" fill="#22a855" stroke="#1a7a3a" stroke-width="1" transform="rotate(20,20,85)"/><ellipse cx="130" cy="85" rx="6" ry="8" fill="#22a855" stroke="#1a7a3a" stroke-width="1" transform="rotate(-20,130,85)"/><ellipse cx="75" cy="15" rx="8" ry="5" fill="#22a855" stroke="#1a7a3a" stroke-width="1"/><ellipse cx="75" cy="115" rx="8" ry="5" fill="#22a855" stroke="#1a7a3a" stroke-width="1"/><ellipse cx="75" cy="65" rx="52" ry="40" fill="url(#e3m)" stroke="#6a5a30" stroke-width="1"/><path d="M50,55 Q55,47 65,52 Q72,48 80,55 Q86,62 80,70 Q72,76 62,72 Q52,68 50,60Z" fill="#8a7040" opacity=".5"/><circle cx="68" cy="57" r="4" fill="#ffcc00" opacity=".6" filter="url(#e3gl)"/><circle cx="68" cy="57" r="2" fill="#fff" opacity=".8"/><text x="75" y="136" text-anchor="middle" fill="#22a855" font-size="13" font-weight="900" font-family="serif">III</text></svg>`,
4:`<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="e4s" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#d0d0d8"/><stop offset="50%" stop-color="#808088"/><stop offset="100%" stop-color="#b0b0b8"/></linearGradient><filter id="e4gl"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="e4gl2"><feGaussianBlur stdDeviation="6"/></filter></defs><polygon points="75,5 128,30 128,85 75,110 22,85 22,30" fill="url(#e4s)" stroke="#c0c0c8" stroke-width="2"/><polygon points="75,13 122,35 122,80 75,102 28,80 28,35" fill="#0a1510" stroke="#30a050" stroke-width="1.2"/><circle cx="75" cy="58" r="28" fill="#10402a" opacity=".5" filter="url(#e4gl2)"/><circle cx="75" cy="58" r="28" fill="none" stroke="#40e870" stroke-width="2" filter="url(#e4gl)"/><circle cx="75" cy="58" r="28" fill="none" stroke="#40e870" stroke-width="1.2"/><ellipse cx="75" cy="58" rx="14" ry="28" fill="none" stroke="#40e870" stroke-width=".7"/><line x1="47" y1="48" x2="103" y2="48" stroke="#40e870" stroke-width=".5"/><line x1="47" y1="58" x2="103" y2="58" stroke="#40e870" stroke-width=".5"/><line x1="47" y1="68" x2="103" y2="68" stroke="#40e870" stroke-width=".5"/><polygon points="75,106 69,118 81,118" fill="#40e870" opacity=".7" filter="url(#e4gl)"/><text x="75" y="136" text-anchor="middle" fill="#40e870" font-size="12" font-weight="900" font-family="serif">IV</text></svg>`,
5:`<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="e5c" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c8d0d8"/><stop offset="50%" stop-color="#707880"/><stop offset="100%" stop-color="#a0a8b0"/></linearGradient><filter id="e5gl"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><polygon points="75,2 115,18 135,55 120,95 80,112 40,100 15,60 30,20" fill="url(#e5c)" stroke="#a0a8b0" stroke-width="2"/><polygon points="75,10 110,24 128,58 114,92 78,106 44,95 22,62 36,26" fill="#081208" stroke="#22c55e" stroke-width="1.5"/><rect x="45" y="34" width="60" height="48" rx="3" fill="none" stroke="#22c55e" stroke-width="1.8" filter="url(#e5gl)"/><line x1="55" y1="34" x2="55" y2="82" stroke="#22c55e" stroke-width=".7"/><line x1="65" y1="34" x2="65" y2="82" stroke="#22c55e" stroke-width=".7"/><line x1="75" y1="34" x2="75" y2="82" stroke="#22c55e" stroke-width=".7"/><line x1="85" y1="34" x2="85" y2="82" stroke="#22c55e" stroke-width=".7"/><line x1="95" y1="34" x2="95" y2="82" stroke="#22c55e" stroke-width=".7"/><line x1="45" y1="47" x2="105" y2="47" stroke="#22c55e" stroke-width=".7"/><line x1="45" y1="60" x2="105" y2="60" stroke="#22c55e" stroke-width=".7"/><line x1="45" y1="73" x2="105" y2="73" stroke="#22c55e" stroke-width=".7"/><circle cx="60" cy="52" r="3" fill="#22c55e" opacity=".8" filter="url(#e5gl)"/><circle cx="82" cy="65" r="2.5" fill="#22c55e" opacity=".6" filter="url(#e5gl)"/><text x="75" y="134" text-anchor="middle" fill="#22c55e" font-size="12" font-weight="900" font-family="serif">V</text></svg>`,
6:`<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="e6s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b0b0c0"/><stop offset="100%" stop-color="#606070"/></linearGradient><filter id="e6gl"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M75,2 L130,16 L135,55 L120,85 L75,115 L30,85 L15,55 L20,16Z" fill="url(#e6s)" stroke="#888890" stroke-width="2"/><path d="M40,14 L110,14 L110,26 L75,30 L40,26Z" fill="#c0c0d0" stroke="#888890" stroke-width="1"/><path d="M75,28 L122,20 L126,55 L114,82 L75,108 L36,82 L24,55 L28,20Z" fill="#1a0a30" stroke="#6030a0" stroke-width="1"/><rect x="60" y="36" width="30" height="5" rx="2" fill="#d4a050"/><rect x="55" y="78" width="40" height="5" rx="1" fill="#d4a050"/><line x1="62" y1="78" x2="62" y2="44" stroke="#d4a050" stroke-width="4" stroke-linecap="round"/><line x1="75" y1="78" x2="75" y2="41" stroke="#d4a050" stroke-width="4" stroke-linecap="round"/><line x1="88" y1="78" x2="88" y2="44" stroke="#d4a050" stroke-width="4" stroke-linecap="round"/><path d="M55,41 L75,28 L95,41Z" fill="none" stroke="#d4a050" stroke-width="2"/><polygon points="75,112 70,122 80,122" fill="#40e870" opacity=".7" filter="url(#e6gl)"/><text x="75" y="136" text-anchor="middle" fill="#a060e0" font-size="12" font-weight="900" font-family="serif">VI</text></svg>`,
7:`<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="e7g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f0d060"/><stop offset="40%" stop-color="#a07820"/><stop offset="100%" stop-color="#e8c848"/></linearGradient><filter id="e7gl"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M75,2 L130,16 L135,60 L75,115 L15,60 L20,16Z" fill="url(#e7g)" stroke="#7a5a10" stroke-width="2"/><path d="M75,10 L122,22 L126,58 L75,108 L24,58 L28,22Z" fill="#141008" stroke="#5a4a18" stroke-width="1"/><rect x="45" y="28" width="60" height="60" rx="4" fill="none" stroke="#d4a030" stroke-width="1.5"/><path d="M48,28 Q48,20 55,20 L95,20 Q102,20 102,28" fill="none" stroke="#d4a030" stroke-width="2"/><path d="M48,88 Q48,96 55,96 L95,96 Q102,96 102,88" fill="none" stroke="#d4a030" stroke-width="2"/><line x1="55" y1="40" x2="95" y2="40" stroke="#6a5a20" stroke-width="1.2"/><line x1="55" y1="48" x2="95" y2="48" stroke="#6a5a20" stroke-width="1.2"/><line x1="55" y1="56" x2="95" y2="56" stroke="#6a5a20" stroke-width="1.2"/><line x1="55" y1="64" x2="85" y2="64" stroke="#6a5a20" stroke-width="1.2"/><line x1="55" y1="72" x2="90" y2="72" stroke="#6a5a20" stroke-width="1.2"/><polygon points="75,112 70,122 80,122" fill="#40e870" opacity=".7" filter="url(#e7gl)"/><text x="75" y="136" text-anchor="middle" fill="#d4a030" font-size="11" font-weight="900" font-family="serif">VII</text></svg>`,
8:`<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="e8g" cx=".45" cy=".35"><stop offset="0%" stop-color="#ffe060"/><stop offset="60%" stop-color="#b08020"/><stop offset="100%" stop-color="#8a6010"/></radialGradient><filter id="e8gl"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="e8gl2"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle cx="75" cy="62" r="58" fill="url(#e8g)" stroke="#6a4a08" stroke-width="2"/><circle cx="75" cy="62" r="54" fill="none" stroke="#c0a030" stroke-width="1" stroke-dasharray="3 4"/><circle cx="75" cy="62" r="51" fill="#140e04" stroke="#8a6a18" stroke-width="1.5"/><circle cx="75" cy="8" r="3" fill="#d0a030"/><circle cx="75" cy="116" r="3" fill="#d0a030"/><circle cx="19" cy="38" r="2.5" fill="#d0a030"/><circle cx="131" cy="38" r="2.5" fill="#d0a030"/><circle cx="19" cy="86" r="2.5" fill="#d0a030"/><circle cx="131" cy="86" r="2.5" fill="#d0a030"/><path d="M48,72 L52,42 L58,56 L66,36 L75,54 L84,36 L92,56 L98,42 L102,72Z" fill="#2a1050" stroke="#a060e0" stroke-width="2" filter="url(#e8gl)"/><rect x="48" y="72" width="54" height="8" rx="3" fill="#a060e0" opacity=".5"/><circle cx="58" cy="40" r="2.5" fill="#ffe060" filter="url(#e8gl2)"/><circle cx="75" cy="32" r="3" fill="#ffe060" filter="url(#e8gl2)"/><circle cx="92" cy="40" r="2.5" fill="#ffe060" filter="url(#e8gl2)"/><circle cx="40" cy="98" r="3" fill="#40e870" opacity=".5" filter="url(#e8gl)"/><circle cx="110" cy="98" r="3" fill="#40e870" opacity=".5" filter="url(#e8gl)"/><text x="75" y="136" text-anchor="middle" fill="#f0c830" font-size="10" font-weight="900" font-family="serif">VIII</text></svg>`,
9:`<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="e9w" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f0d060"/><stop offset="50%" stop-color="#9a7020"/><stop offset="100%" stop-color="#d0a030"/></linearGradient><radialGradient id="e9o" cx=".45" cy=".35"><stop offset="0%" stop-color="#d080ff"/><stop offset="100%" stop-color="#300050"/></radialGradient><filter id="e9gl"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="e9gl2"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M65,88 Q25,72 8,30 Q14,42 22,44 Q14,32 20,22 Q28,36 34,38 Q26,24 34,14 Q42,34 50,42 L65,48Z" fill="url(#e9w)" stroke="#7a5a10" stroke-width="1.2"/><path d="M85,88 Q125,72 142,30 Q136,42 128,44 Q136,32 130,22 Q122,36 116,38 Q124,24 116,14 Q108,34 100,42 L85,48Z" fill="url(#e9w)" stroke="#7a5a10" stroke-width="1.2"/><path d="M35,88 L55,64 L65,74 L75,56 L85,74 L95,64 L115,88Z" fill="#2a2518" stroke="#8a7030" stroke-width="1.5"/><circle cx="75" cy="48" r="26" fill="url(#e9o)" stroke="#a060e0" stroke-width="2.5" filter="url(#e9gl)"/><circle cx="65" cy="42" r="1.5" fill="#fff" opacity=".8" filter="url(#e9gl2)"/><circle cx="82" cy="39" r="1.2" fill="#fff" opacity=".6"/><circle cx="72" cy="52" r="1.8" fill="#fff" opacity=".7" filter="url(#e9gl2)"/><circle cx="85" cy="54" r="1" fill="#fff" opacity=".5"/><line x1="65" y1="42" x2="72" y2="52" stroke="rgba(255,255,255,.3)" stroke-width=".8"/><line x1="72" y1="52" x2="82" y2="39" stroke="rgba(255,255,255,.25)" stroke-width=".8"/><polygon points="75,92 70,102 80,102" fill="#40e870" opacity=".7" filter="url(#e9gl)"/><circle cx="40" cy="36" r="3" fill="#40e870" opacity=".5" filter="url(#e9gl)"/><circle cx="110" cy="36" r="3" fill="#40e870" opacity=".5" filter="url(#e9gl)"/><text x="75" y="124" text-anchor="middle" fill="#c050e8" font-size="12" font-weight="900" font-family="serif">IX</text></svg>`,
10:`<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg"><defs><filter id="e10gl"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="e10gl2"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="e10gl3"><feGaussianBlur stdDeviation="12"/></filter></defs><circle cx="75" cy="55" r="50" fill="#40ff60" opacity=".06" filter="url(#e10gl3)"/><path d="M48,28 L35,28 Q20,28 22,50 L30,56 L48,50Z" fill="none" stroke="#50ff70" stroke-width="2.5" filter="url(#e10gl)"/><path d="M102,28 L115,28 Q130,28 128,50 L120,56 L102,50Z" fill="none" stroke="#50ff70" stroke-width="2.5" filter="url(#e10gl)"/><path d="M46,18 L48,56 Q48,68 58,72 L62,74 L62,86 L52,88 L52,96 L98,96 L98,88 L88,86 L88,74 L92,72 Q102,68 102,56 L104,18Z" fill="none" stroke="#50ff70" stroke-width="3" filter="url(#e10gl)"/><rect x="45" y="96" width="60" height="6" rx="2" fill="none" stroke="#50ff70" stroke-width="2" filter="url(#e10gl)"/><circle cx="75" cy="42" r="16" fill="none" stroke="#50ff70" stroke-width="1.5" filter="url(#e10gl)"/><ellipse cx="75" cy="42" rx="7" ry="16" fill="none" stroke="#50ff70" stroke-width=".8"/><line x1="59" y1="42" x2="91" y2="42" stroke="#50ff70" stroke-width=".6"/><ellipse cx="75" cy="42" rx="22" ry="7" fill="none" stroke="#50ff70" stroke-width="1.2" transform="rotate(-25,75,42)" filter="url(#e10gl)"/><line x1="75" y1="0" x2="75" y2="14" stroke="#50ff70" stroke-width="2" filter="url(#e10gl2)" opacity=".7"/><line x1="58" y1="4" x2="63" y2="14" stroke="#50ff70" stroke-width="1.5" filter="url(#e10gl2)" opacity=".5"/><line x1="92" y1="4" x2="87" y2="14" stroke="#50ff70" stroke-width="1.5" filter="url(#e10gl2)" opacity=".5"/><circle cx="30" cy="42" r="1.5" fill="#50ff70" opacity=".4"/><circle cx="120" cy="42" r="1.5" fill="#50ff70" opacity=".4"/><rect x="44" y="106" width="62" height="14" rx="3" fill="none" stroke="#50ff70" stroke-width="1.5" filter="url(#e10gl)"/><text x="75" y="117" text-anchor="middle" fill="#50ff70" font-size="9" font-weight="900" font-family="sans-serif" filter="url(#e10gl)">GOD TIER</text></svg>`
  };
  let svg=(svgs[lvl]||svgs[1]).replace('<svg ','<svg width="'+w+'" height="'+h+'" ');
  // Avatar-Gesicht in Emblem injizieren falls vorhanden
  try{
    const p=_profileData||JSON.parse(localStorage.getItem('geovs_p')||'{}');
    if(p.avatar&&window.AvatarEngine){
      svg=window.AvatarEngine.injectAvatarIntoEmblem(svg,p.avatar,_getTierColors(lvl));
    }
  }catch(e){}
  return `<div style="width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;pointer-events:none">${svg}</div>`;
}

function profileRender(){
  const p=pGet(),ld=getLvlData(p.xp);
  const ge=id=>document.getElementById(id);
  if(ge('pb-emblem')){
    ge('pb-emblem').innerHTML=drawEmblem(ld.cur.lvl,1.25);
    const tierGlow=(TIERS[ld.cur.tier]||TIERS.wanderer).glow;
    ge('pb-emblem').style.filter=`drop-shadow(0 0 8px ${tierGlow})`;
  }
  if(ge('pb-lvl-text')){ge('pb-lvl-text').textContent='LVL '+ld.cur.lvl;ge('pb-lvl-text').style.color=ld.cur.color;}
  if(ge('pb-name-text'))ge('pb-name-text').textContent=p.username;
  if(ge('xp-bar-fill')){ge('xp-bar-fill').style.width=ld.pct+'%';ge('xp-bar-fill').style.background=ld.cur.color;}
  if(ge('pp-emblem'))ge('pp-emblem').innerHTML=drawEmblem(ld.cur.lvl,1.35);
  if(ge('pp-username'))ge('pp-username').textContent=p.username.toUpperCase();
  if(ge('pp-lvlname')){ge('pp-lvlname').textContent=ld.cur.name;ge('pp-lvlname').style.color=ld.cur.color;}
  if(ge('pp-xp-text'))ge('pp-xp-text').textContent=ld.nxt?(ld.xi+' / '+ld.xn+' XP'):'MAX LEVEL';
  if(ge('pp-xp-fill')){ge('pp-xp-fill').style.width=ld.pct+'%';ge('pp-xp-fill').style.background=ld.cur.color;}
  if(ge('pp-total-xp'))ge('pp-total-xp').textContent=p.xp;
  if(ge('pp-games'))ge('pp-games').textContent=p.games||0;
  try{achUpdateProfileCount();}catch(e){}
}

