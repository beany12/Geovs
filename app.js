/* ══════════════════════════════════════════
   SECURITY UTILITY
   All innerHTML calls in this file render hardcoded game data.
   Use sanitiseHTML() for any future user-supplied content.
══════════════════════════════════════════ */
function sanitiseHTML(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/* ══════════════════════════════════════════
   BACKGROUND CANVAS
══════════════════════════════════════════ */
(function(){
  const c=document.getElementById('bgc'),ctx=c.getContext('2d');
  let W,H,P=[];
  function resize(){W=c.width=innerWidth;H=c.height=innerHeight;}
  resize();window.addEventListener('resize',resize);
  for(let i=0;i<30;i++)P.push({x:Math.random()*1920,y:Math.random()*1080,r:Math.random()*1.4+.3,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,a:Math.random()*.35+.08});
  function draw(){ctx.clearRect(0,0,W,H);P.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(200,241,53,${p.a})`;ctx.fill();p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;});requestAnimationFrame(draw);}
  draw();
})();

/* ══════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════ */
const LANGS = {
  en:{
    eyebrow:'World Knowledge Arena',
    homeSub:'Test your knowledge of the world\'s nations across economics, geography, health and more.',
    m1name:'Higher or Lower',m1desc:'Compare two nations head-to-head. Which has the higher value? Race for the longest streak.',
    m2name:'GeoTacToe',m2desc:'2-player tic-tac-toe — name countries that match both criteria to claim cells.',
    m3name:'Guess the Country',m3desc:'One clue at a time — guess the country. Up to 8 clues, but wrong guesses cost you.',
    m4name:'Capitals Quiz',m4desc:'Name the capital — or pick the right country. Choose region and question count.',
    m5name:'Flags Quiz',m5desc:'See the flag, name the country. Multiple choice or type your answer. Choose region and rounds.',
    capBadge:'🏛️ Capitals',flgBadge:'🚩 Flags',
    playAgain:'Play Again',homeLbl:'← Home',copied:'Copied ✓',
    badgeHL:'Higher or Lower',badgeDaily:'Guess the Country',
    gtcBadge:'🌍 Guess the Country',
    capMode:'GAME MODE',capRegion:'REGION',capQuestions:'QUESTIONS',capStart:'Start Quiz →',capMC:'Multiple Choice',capType:'Type Answer',
    diffEasy:'Easy',diffMedium:'Medium',diffHard:'Hard',quickPlay:'Quick Play',quickSub:'Random game, random settings — just jump in',
    m3name:'Map Sniper',m3desc:'A country name appears — click where it is on the map. Closer = more points.',msFind:'FIND THIS COUNTRY',msBadge:'Map Sniper',msNext:'Next →',
    m7name:'Truth or Lie',m7desc:'Everyone gets a real fact about a country — except one player who must bluff. Discuss, debate, and vote out the liar!',m8name:'Map Party',m8desc:'Everyone clicks where the country is — closest pin wins the round!',sectionParty:'🎉 Party',
    flgMode:'GAME MODE',flgRegion:'REGION',flgQuestions:'QUESTIONS',flgStart:'Start Quiz →',flgFTC:'Flag → Country',flgCTF:'Country → Flag',flgQFTC:'Which country does this flag belong to?',flgQCTF:'Which flag belongs to',
    flgRegs:{all:'All',europe:'Europe',asia:'Asia',africa:'Africa',americas:'Americas',oceania:'Oceania'},
    flgAnswerMode:'ANSWER MODE',flgMC:'Multiple Choice',flgType:'Type Answer',flgSubmit:'Submit →',
    bdrName:'BorderRun 2P',bdrDesc:'Race a friend across the map — hop through land borders to reach the target first. Multiplayer!',bdrBadge:'🗺️ BorderRun',
    bdrSetupTitle:'Border Run',bdrSetupSub:'Chain through neighboring countries. How far can you go?',
    bdrRegion:'REGION',bdrTimer:'TIMER',bdrStart:'Start Border Run →',bdrUnlimited:'Unlimited',
    bdrPrompt:'NAME A NEIGHBOR OF',bdrPrompt2:'NAME A NEIGHBOR OF ANY COLORED COUNTRY',bdrFound:'COUNTRIES FOUND',bdrHintsLeft:'HINTS LEFT',bdrInRegion:'IN REGION',
    bdrHint:'Hint',bdrEndRun:'End Run',bdrPlaceholder:'Type a country name...',
    bdrCorrect:'✓ Correct neighbor!',bdrWrong:'✗ Not a neighbor!',bdrAlready:'Already visited!',bdrNotFound:'Country not found!',
    bdrHintMsg:(name)=>`💡 Try: ${name}`,bdrNoHints:'No hints left!',bdrTimesUp:'⏱ Time\'s up!',
    capRegs:{all:'All',europe:'Europe',asia:'Asia',africa:'Africa',americas:'Americas',oceania:'Oceania'},gtcCluesLbl:'CLUES REVEALED',gtcGuessLbl:'YOUR GUESS',gtcBtn:'Guess →',gtcPlaceholder:'Type a country name...',
    higher:'▲ Higher',lower:'▼ Lower',higherBtn:'Higher',lowerBtn:'Lower',
    next:'Next →',results:'See Results 🏆',
    themeLabel:'Today\'s Theme',questionsLbl:'Questions',
    chTitle:'Guess the Country of the Day',chSub:'1 mystery country · 8 clues · Fewer clues = more XP',
    points:'POINTS',correct:'Correct',bestStreak:'Best Streak',accuracy:'Accuracy',
    shareTitle:'Share your result!',playCta:'Play →',
    streakLbl:'day streak — keep it going!',
    statCountries:'Countries',statMetrics:'Metrics',statModes:'Game Modes',statReplay:'Replayability',
    whichHigher:'Which country has a higher',
    whatsIs:'What is',s_unemployment:'unemployment rate',
    correct_msg:'✓ Correct!',wrong_msg:'✗ Wrong!',
    streak_msg:(n)=>`🔥 ${n}x Streak!`,
    pts:(n)=>`+${n} pts`,
    perfect:'🎯 Perfect Order!',
    msgs:[[90,'🏆','Legend!','You\'re a geography master. Absolutely outstanding.'],[70,'🌟','Excellent!','Your world knowledge is impressive. Keep it up!'],[50,'💪','Good Job!','Solid performance. Keep playing to reach elite level.'],[25,'📚','Keep Going!','Geography is a journey. You\'re on the right path.'],[0,'🌱','Just Starting','Everyone starts somewhere. Play again to improve!']],
    sectionSolo:'👤 Single Player',sectionMulti:'👥 Multiplayer',
    dbTitle:'Today\'s Country is ready!',dbSub:'1 mystery country · 8 clues · Guess it!',
    dbHow:'Clues reveal one by one — fewer clues = more XP. Can you guess it in 1?',
    dbDone:(c,s)=>c>0?`Today's Country — Guessed ✓ · ${s} XP`:`Today's Country — Not guessed · Try tomorrow!`,
    categories:['🌍 All','👥 Population','💰 Economy','🗺️ Geography','🏥 Health','📚 Society','🌱 Environment','🌟 Development'],
    continents:['🌍 All Regions','🌍 Africa','🌏 Asia','🌍 Europe','🌎 N. America','🌎 S. America','🌏 Oceania'],
    themes:[
      {id:'eco',icon:'💰',name:'Economics',cssClass:'eco',desc:'GDP, wealth and economic power of nations.',keys:['gdp','unemp']},
      {id:'health',icon:'🏥',name:'Health',cssClass:'health',desc:'Life expectancy and healthcare across the globe.',keys:['lifeExp','hdi']},
      {id:'env',icon:'🌱',name:'Environment',cssClass:'env',desc:'CO₂ emissions and environmental footprint.',keys:['co2','area']},
      {id:'geo',icon:'🗺️',name:'Geography',cssClass:'geo',desc:'Land area, coastlines and borders.',keys:['area','coast','pop']},
      {id:'dev',icon:'🌟',name:'Development',cssClass:'dev',desc:'Education, internet access and human development.',keys:['literacy','internet','hdi']},
      {id:'soc',icon:'👥',name:'Society',cssClass:'soc',desc:'Population, unemployment and social indicators.',keys:['pop','unemp','literacy']},
    ],
    metrics:{
      pop:{label:'Total Population',fmt:n=>n>=1e9?(n/1e9).toFixed(2)+'B':n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?Math.round(n/1e3)+'K':Math.round(n)},
      gdp:{label:'GDP (USD)',fmt:n=>n>=1e6?'$'+(n/1e6).toFixed(2)+'T':'$'+(n/1e3).toFixed(0)+'B'},
      area:{label:'Land Area',fmt:n=>n.toLocaleString()+' km²'},
      lifeExp:{label:'Life Expectancy',fmt:n=>n.toFixed(1)+' yrs'},
      literacy:{label:'Literacy Rate',fmt:n=>n.toFixed(1)+'%'},
      coast:{label:'Coastline Length',fmt:n=>n.toLocaleString()+' km'},
      co2:{label:'CO₂ per Capita',fmt:n=>n.toFixed(1)+' t'},
      hdi:{label:'Human Dev. Index',fmt:n=>n.toFixed(3)},
      internet:{label:'Internet Usage',fmt:n=>n.toFixed(0)+'%'},
      unemp:{label:'Unemployment Rate',fmt:n=>n.toFixed(1)+'%'},
    }
  },
  de:{
    eyebrow:'Welt-Wissens-Arena',
    homeSub:'Teste dein Wissen über die Länder der Welt — Wirtschaft, Geografie, Gesundheit und mehr.',
    m1name:'Höher oder Niedriger',m1desc:'Vergleiche zwei Länder direkt. Welches hat den höheren Wert? Baue die längste Serie auf.',
    m2name:'GeoTacToe',m2desc:'2-Spieler Tic-Tac-Toe — nenne Länder, die beide Kriterien erfüllen, um Felder zu erobern.',
    m3name:'Land erraten',m3desc:'Ein Hinweis nach dem anderen — errate das Land. Bis zu 8 Hinweise, aber falsche Antworten kosten dich.',
    m4name:'Hauptstadt-Quiz',m4desc:'Nenne die Hauptstadt — oder wähle das richtige Land. Wähle Region und Fragenanzahl.',
    m5name:'Flaggen-Quiz',m5desc:'Sieh die Flagge, nenne das Land. Multiple Choice oder selbst tippen. Wähle Region und Runden.',
    capBadge:'🏛️ Hauptstädte',flgBadge:'🚩 Flaggen',
    playAgain:'Nochmal spielen',homeLbl:'← Startseite',copied:'Kopiert ✓',
    badgeHL:'Höher oder Niedriger',badgeDaily:'Land erraten',
    gtcBadge:'🌍 Land erraten',
    capMode:'SPIELMODUS',capRegion:'REGION',capQuestions:'FRAGEN',capStart:'Quiz starten →',capMC:'Multiple Choice',capType:'Eingabe',
    diffEasy:'Leicht',diffMedium:'Mittel',diffHard:'Schwer',quickPlay:'Schnelles Spiel',quickSub:'Zufälliges Spiel, zufällige Einstellungen — einfach losspielen',
    m3name:'Karten-Sniper',m3desc:'Ein Ländername erscheint — klicke auf die richtige Stelle auf der Karte. Näher = mehr Punkte.',msFind:'FINDE DIESES LAND',msBadge:'Karten-Sniper',msNext:'Weiter →',
    m7name:'Truth or Lie',m7desc:'Jeder bekommt einen echten Fakt über ein Land — bis auf einer der bluffen muss. Diskutiert, streitet und stimmt den Lügner raus!',m8name:'Karten-Party',m8desc:'Alle klicken wo das Land ist — nächster Pin gewinnt!',sectionParty:'🎉 Party',
    flgMode:'SPIELMODUS',flgRegion:'REGION',flgQuestions:'FRAGEN',flgStart:'Quiz starten →',flgFTC:'Flagge → Land',flgCTF:'Land → Flagge',flgQFTC:'Zu welchem Land gehört diese Flagge?',flgQCTF:'Welche Flagge gehört zu',
    flgRegs:{all:'Alle',europe:'Europa',asia:'Asien',africa:'Afrika',americas:'Amerika',oceania:'Ozeanien'},
    flgAnswerMode:'ANTWORTMODUS',flgMC:'Multiple Choice',flgType:'Eingabe',flgSubmit:'Absenden →',
    bdrName:'BorderRun 2P',bdrDesc:'Renne mit einem Freund über die Karte — hüpfe durch Landgrenzen zum Ziel. Mehrspieler!',bdrBadge:'🗺️ BorderRun',
    bdrSetupTitle:'Grenzlauf',bdrSetupSub:'Kette dich durch Nachbarländer. Wie weit kommst du?',
    bdrRegion:'REGION',bdrTimer:'TIMER',bdrStart:'Grenzlauf starten →',bdrUnlimited:'Unbegrenzt',
    bdrPrompt:'NENNE EIN NACHBARLAND VON',bdrPrompt2:'NENNE EIN NACHBARLAND EINES FARBIGEN LANDES',bdrFound:'LÄNDER GEFUNDEN',bdrHintsLeft:'HINWEISE ÜBRIG',bdrInRegion:'IN REGION',
    bdrHint:'Hinweis',bdrEndRun:'Beenden',bdrPlaceholder:'Ländernamen eingeben...',
    bdrCorrect:'✓ Richtiger Nachbar!',bdrWrong:'✗ Kein Nachbar!',bdrAlready:'Bereits besucht!',bdrNotFound:'Land nicht gefunden!',
    bdrHintMsg:(name)=>`💡 Versuch: ${name}`,bdrNoHints:'Keine Hinweise mehr!',bdrTimesUp:'⏱ Zeit abgelaufen!',
    capRegs:{all:'Alle',europe:'Europa',asia:'Asien',africa:'Afrika',americas:'Amerika',oceania:'Ozeanien'},gtcCluesLbl:'HINWEISE ENTHÜLLT',gtcGuessLbl:'DEIN TIPP',gtcBtn:'Raten →',gtcPlaceholder:'Ländernamen eingeben...',
    higher:'▲ Höher',lower:'▼ Niedriger',higherBtn:'Höher',lowerBtn:'Niedriger',
    next:'Weiter →',results:'Ergebnis sehen 🏆',
    themeLabel:'Heutiges Thema',questionsLbl:'Fragen',
    chTitle:'Land des Tages erraten',chSub:'1 mysteriöses Land · 8 Hinweise · Weniger = mehr XP',
    points:'PUNKTE',correct:'Richtig',bestStreak:'Beste Serie',accuracy:'Genauigkeit',
    shareTitle:'Teile dein Ergebnis!',playCta:'Spielen →',
    streakLbl:'Tage am Stück — weiter so!',
    statCountries:'Länder',statMetrics:'Metriken',statModes:'Spielmodi',statReplay:'Wiederspielbarkeit',
    whichHigher:'Welches Land hat eine höhere',
    whatsIs:'Was ist',
    correct_msg:'✓ Richtig!',wrong_msg:'✗ Falsch!',
    streak_msg:(n)=>`🔥 ${n}x Serie!`,pts:(n)=>`+${n} Pkt`,
    perfect:'🎯 Perfekte Reihenfolge!',
    msgs:[[90,'🏆','Legende!','Du bist ein Geografie-Meister!'],[70,'🌟','Ausgezeichnet!','Dein Weltwissen ist beeindruckend!'],[50,'💪','Gut gemacht!','Solide Leistung. Bleib dabei!'],[25,'📚','Weiter so!','Geografie ist eine Reise. Du bist auf dem richtigen Weg.'],[0,'🌱','Guter Anfang','Jeder fängt irgendwo an. Spiel nochmal!']],
    sectionSolo:'👤 Einzelspieler',sectionMulti:'👥 Mehrspieler',
    dbTitle:'Das Land des Tages wartet!',dbSub:'1 mysteriöses Land · 8 Hinweise · Errate es!',
    dbHow:'Hinweise werden einzeln enthüllt — weniger Hinweise = mehr XP. Schaffst du es mit nur 1?',
    dbDone:(c,s)=>c>0?`Land des Tages — Erraten ✓ · ${s} XP`:`Land des Tages — Nicht erraten`,
    categories:['🌍 Alle','👥 Bevölkerung','💰 Wirtschaft','🗺️ Geografie','🏥 Gesundheit','📚 Gesellschaft','🌱 Umwelt','🌟 Entwicklung'],
    continents:['🌍 Alle Regionen','🌍 Afrika','🌏 Asien','🌍 Europa','🌎 N. Amerika','🌎 S. Amerika','🌏 Ozeanien'],
    themes:[
      {id:'eco',icon:'💰',name:'Wirtschaft',cssClass:'eco',desc:'BIP, Reichtum und Wirtschaftskraft der Länder.',keys:['gdp','unemp']},
      {id:'health',icon:'🏥',name:'Gesundheit',cssClass:'health',desc:'Lebenserwartung und Gesundheitsversorgung.',keys:['lifeExp','hdi']},
      {id:'env',icon:'🌱',name:'Umwelt',cssClass:'env',desc:'CO₂-Emissionen und ökologischer Fußabdruck.',keys:['co2','area']},
      {id:'geo',icon:'🗺️',name:'Geografie',cssClass:'geo',desc:'Fläche, Küstenlinien und Grenzen.',keys:['area','coast','pop']},
      {id:'dev',icon:'🌟',name:'Entwicklung',cssClass:'dev',desc:'Bildung, Internetnutzung und menschliche Entwicklung.',keys:['literacy','internet','hdi']},
      {id:'soc',icon:'👥',name:'Gesellschaft',cssClass:'soc',desc:'Bevölkerung, Arbeitslosigkeit und soziale Indikatoren.',keys:['pop','unemp','literacy']},
    ],
    metrics:{
      pop:{label:'Bevölkerung',fmt:n=>n>=1e9?(n/1e9).toFixed(2)+'Mrd':n>=1e6?(n/1e6).toFixed(1)+' Mio':n>=1e3?Math.round(n/1e3)+' Tsd':Math.round(n)},
      gdp:{label:'BIP (USD)',fmt:n=>n>=1e6?'$'+(n/1e6).toFixed(2)+' Bio':'$'+(n/1e3).toFixed(0)+' Mrd'},
      area:{label:'Landfläche',fmt:n=>n.toLocaleString()+' km²'},
      lifeExp:{label:'Lebenserwartung',fmt:n=>n.toFixed(1)+' J.'},
      literacy:{label:'Alphabetisierungsrate',fmt:n=>n.toFixed(1)+'%'},
      coast:{label:'Küstenlänge',fmt:n=>n.toLocaleString()+' km'},
      co2:{label:'CO₂ pro Kopf',fmt:n=>n.toFixed(1)+' t'},
      hdi:{label:'Human Dev. Index',fmt:n=>n.toFixed(3)},
      internet:{label:'Internetnutzung',fmt:n=>n.toFixed(0)+'%'},
      unemp:{label:'Arbeitslosenquote',fmt:n=>n.toFixed(1)+'%'},
    }
  },
  fr:{
    eyebrow:'Arène de Connaissance Mondiale',
    homeSub:'Testez vos connaissances sur les pays du monde — économie, géographie, santé et plus.',
    m1name:'Plus ou Moins',m1desc:'Comparez deux pays. Lequel a la valeur la plus élevée? Visez la plus longue série.',
    m2name:'GeoTacToe',m2desc:'Tic-tac-toe à 2 joueurs — nommez des pays qui correspondent aux deux critères.',
    m3name:'Devinez le Pays',m3desc:'Un indice à la fois — devinez le pays. Jusqu\'à 8 indices, mais les mauvaises réponses vous coûtent.',
    m4name:'Quiz Capitales',m4desc:'Nommez la capitale — ou choisissez le bon pays. Choisissez la région et le nombre de questions.',
    m5name:'Quiz Drapeaux',m5desc:'Voyez le drapeau, nommez le pays. Choix multiples ou saisie libre. Choisissez région et tours.',
    capBadge:'🏛️ Capitales',flgBadge:'🚩 Drapeaux',
    playAgain:'Rejouer',homeLbl:'← Accueil',copied:'Copié ✓',
    badgeHL:'Plus ou Moins',badgeDaily:'Devinez le Pays',
    gtcBadge:'🌍 Devinez le Pays',
    capMode:'MODE DE JEU',capRegion:'RÉGION',capQuestions:'QUESTIONS',capStart:'Commencer →',capMC:'Choix multiple',capType:'Saisie libre',
    diffEasy:'Facile',diffMedium:'Moyen',diffHard:'Difficile',quickPlay:'Partie rapide',quickSub:'Jeu aléatoire, paramètres aléatoires — lancez-vous',
    m3name:'Sniper Carte',m3desc:'Un nom de pays apparaît — cliquez là où il se trouve sur la carte. Plus proche = plus de points.',msFind:'TROUVEZ CE PAYS',msBadge:'Sniper Carte',msNext:'Suivant →',
    m7name:'Truth or Lie',m7desc:'Chacun reçoit un vrai fait sur un pays — sauf un joueur qui doit bluffer. Discutez, débattez et votez le menteur!',m8name:'Carte Party',m8desc:'Tout le monde clique où se trouve le pays — le plus proche gagne!',sectionParty:'🎉 Soirée',
    flgMode:'MODE DE JEU',flgRegion:'RÉGION',flgQuestions:'QUESTIONS',flgStart:'Commencer →',flgFTC:'Drapeau → Pays',flgCTF:'Pays → Drapeau',flgQFTC:'À quel pays appartient ce drapeau?',flgQCTF:'Quel drapeau appartient à',
    flgRegs:{all:'Tous',europe:'Europe',asia:'Asie',africa:'Afrique',americas:'Amériques',oceania:'Océanie'},
    flgAnswerMode:'MODE DE RÉPONSE',flgMC:'Choix multiple',flgType:'Saisie libre',flgSubmit:'Soumettre →',
    bdrName:'BorderRun 2J',bdrDesc:'Courez avec un ami sur la carte — traversez les frontières terrestres pour atteindre la cible. Multijoueur!',bdrBadge:'🗺️ BorderRun',
    bdrSetupTitle:'Course aux Frontières',bdrSetupSub:'Enchaînez les pays voisins. Jusqu\'où irez-vous?',
    bdrRegion:'RÉGION',bdrTimer:'MINUTERIE',bdrStart:'Commencer →',bdrUnlimited:'Illimité',
    bdrPrompt:'NOMMEZ UN VOISIN DE',bdrPrompt2:'NOMMEZ UN VOISIN D\'UN PAYS COLORÉ',bdrFound:'PAYS TROUVÉS',bdrHintsLeft:'INDICES RESTANTS',bdrInRegion:'DANS LA RÉGION',
    bdrHint:'Indice',bdrEndRun:'Terminer',bdrPlaceholder:'Tapez un nom de pays...',
    bdrCorrect:'✓ Bon voisin!',bdrWrong:'✗ Pas un voisin!',bdrAlready:'Déjà visité!',bdrNotFound:'Pays introuvable!',
    bdrHintMsg:(name)=>`💡 Essayez: ${name}`,bdrNoHints:'Plus d\'indices!',bdrTimesUp:'⏱ Temps écoulé!',
    capRegs:{all:'Tous',europe:'Europe',asia:'Asie',africa:'Afrique',americas:'Amériques',oceania:'Océanie'},gtcCluesLbl:'INDICES RÉVÉLÉS',gtcGuessLbl:'VOTRE RÉPONSE',gtcBtn:'Deviner →',gtcPlaceholder:'Tapez un nom de pays...',
    higher:'▲ Plus',lower:'▼ Moins',higherBtn:'Plus',lowerBtn:'Moins',
    next:'Suivant →',results:'Voir les résultats 🏆',
    themeLabel:"Thème d'aujourd'hui",questionsLbl:'Questions',
    chTitle:'Devine le pays du jour',chSub:'1 pays mystère · 8 indices · Moins = plus de XP',
    points:'POINTS',correct:'Correct',bestStreak:'Meilleure Série',accuracy:'Précision',
    shareTitle:'Partagez votre résultat!',playCta:'Jouer →',
    streakLbl:'jours de suite — continuez!',
    statCountries:'Pays',statMetrics:'Métriques',statModes:'Modes de Jeu',statReplay:'Rejouabilité',
    whichHigher:'Quel pays a un(e) plus élevé(e)',
    whatsIs:'Quel est',
    correct_msg:'✓ Correct!',wrong_msg:'✗ Incorrect!',
    streak_msg:(n)=>`🔥 Série de ${n}!`,pts:(n)=>`+${n} pts`,
    perfect:'🎯 Ordre Parfait!',
    msgs:[[90,'🏆','Légende!','Vous êtes un maître de la géographie!'],[70,'🌟','Excellent!','Vos connaissances mondiales sont impressionnantes!'],[50,'💪','Bien joué!','Performance solide. Continuez!'],[25,'📚','Continuez!','La géographie est un voyage.'],[0,'🌱','Débutant','Tout le monde commence quelque part!']],
    sectionSolo:'👤 Solo',sectionMulti:'👥 Multijoueur',
    dbTitle:'Le pays du jour est prêt !',dbSub:'1 pays mystère · 8 indices · Devine-le !',
    dbHow:'Les indices apparaissent un par un — moins d\'indices = plus de XP. Tu peux le deviner en 1 ?',
    dbDone:(c,s)=>c>0?`Pays du jour — Deviné ✓ · ${s} XP`:`Pays du jour — Pas deviné`,
    categories:['🌍 Tous','👥 Population','💰 Économie','🗺️ Géographie','🏥 Santé','📚 Société','🌱 Environnement','🌟 Développement'],
    continents:['🌍 Toutes Régions','🌍 Afrique','🌏 Asie','🌍 Europe','🌎 N. Amérique','🌎 S. Amérique','🌏 Océanie'],
    themes:[
      {id:'eco',icon:'💰',name:'Économie',cssClass:'eco',desc:'PIB, richesse et puissance économique.',keys:['gdp','unemp']},
      {id:'health',icon:'🏥',name:'Santé',cssClass:'health',desc:'Espérance de vie et soins de santé.',keys:['lifeExp','hdi']},
      {id:'env',icon:'🌱',name:'Environnement',cssClass:'env',desc:'Émissions CO₂ et empreinte environnementale.',keys:['co2','area']},
      {id:'geo',icon:'🗺️',name:'Géographie',cssClass:'geo',desc:'Superficie, littoraux et frontières.',keys:['area','coast','pop']},
      {id:'dev',icon:'🌟',name:'Développement',cssClass:'dev',desc:"Éducation, accès internet et développement humain.",keys:['literacy','internet','hdi']},
      {id:'soc',icon:'👥',name:'Société',cssClass:'soc',desc:'Population, chômage et indicateurs sociaux.',keys:['pop','unemp','literacy']},
    ],
    metrics:{
      pop:{label:'Population Totale',fmt:n=>n>=1e9?(n/1e9).toFixed(2)+'Md':n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?Math.round(n/1e3)+'K':Math.round(n)},
      gdp:{label:'PIB (USD)',fmt:n=>n>=1e6?'$'+(n/1e6).toFixed(2)+' Bn':'$'+(n/1e3).toFixed(0)+' M'},
      area:{label:'Superficie',fmt:n=>n.toLocaleString()+' km²'},
      lifeExp:{label:'Espérance de Vie',fmt:n=>n.toFixed(1)+' ans'},
      literacy:{label:'Taux d\'Alphabétisation',fmt:n=>n.toFixed(1)+'%'},
      coast:{label:'Longueur du Littoral',fmt:n=>n.toLocaleString()+' km'},
      co2:{label:'CO₂ par Hab.',fmt:n=>n.toFixed(1)+' t'},
      hdi:{label:'Indice Dev. Humain',fmt:n=>n.toFixed(3)},
      internet:{label:'Utilisation Internet',fmt:n=>n.toFixed(0)+'%'},
      unemp:{label:'Taux de Chômage',fmt:n=>n.toFixed(1)+'%'},
    }
  },
  es:{
    eyebrow:'Arena del Conocimiento Mundial',
    homeSub:'Pon a prueba tu conocimiento de las naciones del mundo — economía, geografía, salud y más.',
    m1name:'Mayor o Menor',m1desc:'Compara dos naciones. ¿Cuál tiene el valor más alto? Construye la racha más larga.',
    m2name:'GeoTacToe',m2desc:'Tic-tac-toe para 2 — nombra países que cumplan ambos criterios para ganar casillas.',
    m3name:'Adivina el País',m3desc:'Una pista a la vez — adivina el país. Hasta 8 pistas, pero las respuestas incorrectas te cuestan.',
    m4name:'Quiz Capitales',m4desc:'Nombra la capital — o elige el país correcto. Elige región y número de preguntas.',
    m5name:'Quiz Banderas',m5desc:'Mira la bandera, nombra el país. Opción múltiple o escribe tu respuesta. Elige región y rondas.',
    capBadge:'🏛️ Capitales',flgBadge:'🚩 Banderas',
    playAgain:'Jugar de nuevo',homeLbl:'← Inicio',copied:'Copiado ✓',
    badgeHL:'Mayor o Menor',badgeDaily:'Adivina el País',
    gtcBadge:'🌍 Adivina el País',
    capMode:'MODO DE JUEGO',capRegion:'REGIÓN',capQuestions:'PREGUNTAS',capStart:'Iniciar →',capMC:'Opción múltiple',capType:'Escribir',
    diffEasy:'Fácil',diffMedium:'Medio',diffHard:'Difícil',quickPlay:'Juego rápido',quickSub:'Juego aleatorio, ajustes aleatorios — solo juega',
    m3name:'Francotirador',m3desc:'Aparece un país — haz clic donde está en el mapa. Más cerca = más puntos.',msFind:'ENCUENTRA ESTE PAÍS',msBadge:'Francotirador',msNext:'Siguiente →',
    m7name:'Truth or Lie',m7desc:'Todos reciben un dato real sobre un país — excepto uno que debe mentir. ¡Discute, debate y vota al mentiroso!',m8name:'Mapa Party',m8desc:'Todos hacen clic donde está el país — ¡el pin más cercano gana!',sectionParty:'🎉 Fiesta',
    flgMode:'MODO DE JUEGO',flgRegion:'REGIÓN',flgQuestions:'PREGUNTAS',flgStart:'Iniciar →',flgFTC:'Bandera → País',flgCTF:'País → Bandera',flgQFTC:'¿A qué país pertenece esta bandera?',flgQCTF:'¿Qué bandera pertenece a',
    flgRegs:{all:'Todo',europe:'Europa',asia:'Asia',africa:'África',americas:'Américas',oceania:'Oceanía'},
    flgAnswerMode:'MODO DE RESPUESTA',flgMC:'Opción múltiple',flgType:'Escribir',flgSubmit:'Enviar →',
    bdrName:'BorderRun 2J',bdrDesc:'¡Compite con un amigo por el mapa — salta por fronteras terrestres hasta el objetivo. Multijugador!',bdrBadge:'🗺️ BorderRun',
    bdrSetupTitle:'Carrera de Fronteras',bdrSetupSub:'Encadena países vecinos. ¿Hasta dónde llegarás?',
    bdrRegion:'REGIÓN',bdrTimer:'TEMPORIZADOR',bdrStart:'Iniciar →',bdrUnlimited:'Sin límite',
    bdrPrompt:'NOMBRA UN VECINO DE',bdrPrompt2:'NOMBRA UN VECINO DE CUALQUIER PAÍS COLOREADO',bdrFound:'PAÍSES ENCONTRADOS',bdrHintsLeft:'PISTAS RESTANTES',bdrInRegion:'EN LA REGIÓN',
    bdrHint:'Pista',bdrEndRun:'Terminar',bdrPlaceholder:'Escribe un nombre de país...',
    bdrCorrect:'✓ ¡Vecino correcto!',bdrWrong:'✗ ¡No es vecino!',bdrAlready:'¡Ya visitado!',bdrNotFound:'¡País no encontrado!',
    bdrHintMsg:(name)=>`💡 Prueba: ${name}`,bdrNoHints:'¡Sin pistas!',bdrTimesUp:'⏱ ¡Se acabó el tiempo!',
    capRegs:{all:'Todo',europe:'Europa',asia:'Asia',africa:'África',americas:'Américas',oceania:'Oceanía'},gtcCluesLbl:'PISTAS REVELADAS',gtcGuessLbl:'TU RESPUESTA',gtcBtn:'Adivinar →',gtcPlaceholder:'Escribe un nombre de país...',
    higher:'▲ Mayor',lower:'▼ Menor',higherBtn:'Mayor',lowerBtn:'Menor',
    next:'Siguiente →',results:'Ver Resultados 🏆',
    themeLabel:'Tema de Hoy',questionsLbl:'Preguntas',
    chTitle:'Adivina el país del día',chSub:'1 país misterioso · 8 pistas · Menos = más XP',
    points:'PUNTOS',correct:'Correcto',bestStreak:'Mejor Racha',accuracy:'Precisión',
    shareTitle:'¡Comparte tu resultado!',playCta:'Jugar →',
    streakLbl:'días seguidos — ¡sigue así!',
    statCountries:'Países',statMetrics:'Métricas',statModes:'Modos de Juego',statReplay:'Repetibilidad',
    whichHigher:'¿Qué país tiene mayor',
    whatsIs:'¿Cuál es',
    correct_msg:'✓ ¡Correcto!',wrong_msg:'✗ ¡Incorrecto!',
    streak_msg:(n)=>`🔥 ¡Racha de ${n}!`,pts:(n)=>`+${n} pts`,
    perfect:'🎯 ¡Orden Perfecto!',
    msgs:[[90,'🏆','¡Leyenda!','Eres un maestro de la geografía.'],[70,'🌟','¡Excelente!','Tu conocimiento mundial es impresionante.'],[50,'💪','¡Bien hecho!','Sólida actuación. ¡Sigue jugando!'],[25,'📚','¡Continúa!','La geografía es un viaje.'],[0,'🌱','Empezando','¡Todo el mundo empieza en algún lugar!']],
    sectionSolo:'👤 Un jugador',sectionMulti:'👥 Multijugador',
    dbTitle:'¡El país del día está listo!',dbSub:'1 país misterioso · 8 pistas · ¡Adivínalo!',
    dbHow:'Las pistas aparecen una a una — menos pistas = más XP. ¿Puedes adivinarlo con solo 1?',
    dbDone:(c,s)=>c>0?`País del día — Adivinado ✓ · ${s} XP`:`País del día — No adivinado`,
    categories:['🌍 Todo','👥 Población','💰 Economía','🗺️ Geografía','🏥 Salud','📚 Sociedad','🌱 Medio Ambiente','🌟 Desarrollo'],
    continents:['🌍 Todas las Regiones','🌍 África','🌏 Asia','🌍 Europa','🌎 N. América','🌎 S. América','🌏 Oceanía'],
    themes:[
      {id:'eco',icon:'💰',name:'Economía',cssClass:'eco',desc:'PIB, riqueza y poder económico de las naciones.',keys:['gdp','unemp']},
      {id:'health',icon:'🏥',name:'Salud',cssClass:'health',desc:'Esperanza de vida y atención sanitaria.',keys:['lifeExp','hdi']},
      {id:'env',icon:'🌱',name:'Medio Ambiente',cssClass:'env',desc:'Emisiones de CO₂ y huella ambiental.',keys:['co2','area']},
      {id:'geo',icon:'🗺️',name:'Geografía',cssClass:'geo',desc:'Superficie, costas y fronteras.',keys:['area','coast','pop']},
      {id:'dev',icon:'🌟',name:'Desarrollo',cssClass:'dev',desc:'Educación, internet y desarrollo humano.',keys:['literacy','internet','hdi']},
      {id:'soc',icon:'👥',name:'Sociedad',cssClass:'soc',desc:'Población, desempleo e indicadores sociales.',keys:['pop','unemp','literacy']},
    ],
    metrics:{
      pop:{label:'Población Total',fmt:n=>n>=1e9?(n/1e9).toFixed(2)+'Mil M':n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?Math.round(n/1e3)+'K':Math.round(n)},
      gdp:{label:'PIB (USD)',fmt:n=>n>=1e6?'$'+(n/1e6).toFixed(2)+' B':'$'+(n/1e3).toFixed(0)+' M'},
      area:{label:'Área Terrestre',fmt:n=>n.toLocaleString()+' km²'},
      lifeExp:{label:'Esperanza de Vida',fmt:n=>n.toFixed(1)+' años'},
      literacy:{label:'Tasa de Alfabetización',fmt:n=>n.toFixed(1)+'%'},
      coast:{label:'Longitud de Costa',fmt:n=>n.toLocaleString()+' km'},
      co2:{label:'CO₂ por Cápita',fmt:n=>n.toFixed(1)+' t'},
      hdi:{label:'Índice Des. Humano',fmt:n=>n.toFixed(3)},
      internet:{label:'Uso de Internet',fmt:n=>n.toFixed(0)+'%'},
      unemp:{label:'Tasa de Desempleo',fmt:n=>n.toFixed(1)+'%'},
    }
  }
};

let curLang = 'en';
let T = LANGS.en; // active translation

function setLang(code) {
  curLang = code;
  T = LANGS[code];
  // Item 6: update <html lang> attribute dynamically
  document.documentElement.lang = code;
  // Item 10: update browser tab title per language
  const TITLES = {
    en: 'GeoGenius — Higher or Lower Geography Game | 195 Countries',
    de: 'GeoGenius — Geografie-Spiel | 195 Länder vergleichen',
    fr: 'GeoGenius — Jeu de Géographie | 195 Pays',
    es: 'GeoGenius — Juego de Geografía | 195 Países'
  };
  document.title = TITLES[code] || TITLES.en;
  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === code);
  });
  applyTranslations();
  gtcUpdateUI();
  localStorage.setItem('geovs_lang', code);
}

function applyTranslations() {
  const ids = {
    't-eyebrow':'eyebrow','t-home-sub':'homeSub',
    't-m1-label':'m1label','t-m1-name':'m1name','t-m1-desc':'m1desc',
    't-m2-label':'m2label','t-m2-name':'m2name','t-m2-desc':'m2desc',
    't-m3-label':'m3label',
    't-badge-hl':'badgeHL',
    't-gtc-badge':'gtcBadge','t-gtc-clues-lbl':'gtcCluesLbl','t-gtc-guess-lbl':'gtcGuessLbl','t-gtc-btn':'gtcBtn',
    't-m3-name':'m3name','t-m3-desc':'m3desc',
    't-m4-name':'m4name','t-m4-desc':'m4desc',
    't-m5-name':'m5name','t-m5-desc':'m5desc',
    't-theme-label':'themeLabel','t-questions-lbl':'questionsLbl',
    't-ch-title':'chTitle','t-ch-sub':'chSub',
    't-points-lbl':'points','t-os-correct':'correct','t-os-streak':'bestStreak','t-os-acc':'accuracy',
    't-share-title':'shareTitle','t-play-cta':'playCta',
    't-streak-lbl':'streakLbl',
    't-stat-countries':'statCountries','t-stat-metrics':'statMetrics',
    't-stat-modes':'statModes','t-stat-replay':'statReplay',
    't-m6-name':'bdrName','t-m6-desc':'bdrDesc',
    't-section-solo':'sectionSolo','t-section-multi':'sectionMulti',
    't-quick-play':'quickPlay','t-quick-sub':'quickSub',
    'ms-badge-text':'msBadge','ms-find-lbl':'msFind','ms-next-text':'msNext',
    't-btn-higher':'higherBtn','t-btn-lower':'lowerBtn',
    't-m7-name':'m7name','t-m7-desc':'m7desc','t-m8-name':'m8name','t-m8-desc':'m8desc','t-section-party':'sectionParty',
  };
  for(const [id, key] of Object.entries(ids)) {
    const el = document.getElementById(id);
    if(el && T[key] !== undefined) {
      el.textContent = T[key];
    }
  }
  // Next buttons
  const hlN=document.getElementById('hl-next'); if(hlN) hlN.textContent = T.next;
  const chN=document.getElementById('ch-share-btn'); if(chN&&!chN.style.display) chN.textContent = T.next;
  // Mode labels (01/02/03 stay numeric)
  const mlabels = ['Mode 01','Mode 02','Mode 03'];
  ['t-m1-label','t-m2-label','t-m3-label'].forEach((id,i) => {
    const el = document.getElementById(id);
    if(el) el.textContent = mlabels[i];
  });
  // XP tag on daily banner
  const xpTag=document.getElementById('ch-home-xp-tag');
  if(xpTag){
    const xpTagText={en:'⚡ UP TO 130 XP',de:'⚡ BIS ZU 130 XP',fr:'⚡ JUSQU\'À 130 XP',es:'⚡ HASTA 130 XP'}[curLang]||'⚡ UP TO 130 XP';
    xpTag.textContent=xpTagText;
  }
  // Update daily banner
  initHome();
}

/* ══════════════════════════════════════════
   FLAG HELPER — Twemoji SVG rendering
   Works on Windows, Mac, iOS, Android
══════════════════════════════════════════ */
function emojiToISO(flagEmoji) {
  const cp = [...flagEmoji].map(c => c.codePointAt(0) - 0x1F1E6 + 65);
  return String.fromCharCode(...cp).toLowerCase();
}
function flagImg(flagEmoji, size) {
  if (!flagEmoji) return '';
  const h = size || '2rem';
  const px = h.replace('rem', '') * 16 + 'px';
  return '<img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/'
       + [...flagEmoji].map(c => c.codePointAt(0).toString(16)).join('-')
       + '.svg" style="height:'+h+';width:auto;vertical-align:middle;display:inline-block;border-radius:3px;" alt="'+emojiToISO(flagEmoji).toUpperCase()+'">';
}
function setFlag(el, flagEmoji, size) {
  if (el) el.innerHTML = flagImg(flagEmoji, size);
}
/* ══════════════════════════════════════════
   COUNTRIES DATA (195)
══════════════════════════════════════════ */
const COUNTRIES = [
  {n:"Algeria",f:"🇩🇿",pop:45606480,gdp:191913,area:2381741,lifeExp:77.2,literacy:81.4,coast:998,co2:3.9,hdi:0.745,internet:71.0,unemp:12.3},
  {n:"Angola",f:"🇦🇴",pop:35588987,gdp:74865,area:1246700,lifeExp:63.1,literacy:71.1,coast:1600,co2:1.3,hdi:0.586,internet:36.0,unemp:6.2},
  {n:"Benin",f:"🇧🇯",pop:13712828,gdp:17292,area:112622,lifeExp:62.0,literacy:45.8,coast:121,co2:0.6,hdi:0.525,internet:29.0,unemp:1.0},
  {n:"Botswana",f:"🇧🇼",pop:2675352,gdp:19345,area:581730,lifeExp:61.1,literacy:88.5,coast:0,co2:3.3,hdi:0.693,internet:67.0,unemp:24.5},
  {n:"Burkina Faso",f:"🇧🇫",pop:23251485,gdp:19748,area:274200,lifeExp:62.3,literacy:46.0,coast:0,co2:0.2,hdi:0.449,internet:22.0,unemp:5.9},
  {n:"Burundi",f:"🇧🇮",pop:13238559,gdp:2776,area:27834,lifeExp:62.0,literacy:74.0,coast:0,co2:0.1,hdi:0.426,internet:14.0,unemp:1.0},
  {n:"Cameroon",f:"🇨🇲",pop:28647293,gdp:45146,area:475440,lifeExp:60.3,literacy:77.1,coast:402,co2:0.4,hdi:0.576,internet:35.0,unemp:3.4},
  {n:"Cape Verde",f:"🇨🇻",pop:587925,gdp:2220,area:4033,lifeExp:74.0,literacy:87.0,coast:965,co2:1.5,hdi:0.662,internet:74.0,unemp:11.3},
  {n:"Central African Rep.",f:"🇨🇫",pop:5579144,gdp:2429,area:622984,lifeExp:54.0,literacy:37.4,coast:0,co2:0.1,hdi:0.404,internet:11.0,unemp:6.8},
  {n:"Chad",f:"🇹🇩",pop:18278568,gdp:11975,area:1284000,lifeExp:55.0,literacy:26.8,coast:0,co2:0.1,hdi:0.394,internet:17.0,unemp:2.1},
  {n:"Comoros",f:"🇰🇲",pop:836774,gdp:1342,area:2235,lifeExp:65.0,literacy:62.0,coast:340,co2:0.4,hdi:0.558,internet:21.0,unemp:5.3},
  {n:"DR Congo",f:"🇨🇩",pop:102262808,gdp:55014,area:2344858,lifeExp:61.6,literacy:80.0,coast:37,co2:0.05,hdi:0.479,internet:28.0,unemp:4.5},
  {n:"Congo",f:"🇨🇬",pop:5835806,gdp:12263,area:342000,lifeExp:65.0,literacy:80.6,coast:169,co2:1.1,hdi:0.571,internet:37.0,unemp:5.5},
  {n:"Djibouti",f:"🇩🇯",pop:1136455,gdp:3655,area:23200,lifeExp:67.0,literacy:68.0,coast:314,co2:0.6,hdi:0.524,internet:63.0,unemp:26.0},
  {n:"Egypt",f:"🇪🇬",pop:105914499,gdp:476762,area:1001450,lifeExp:72.3,literacy:73.9,coast:2450,co2:2.2,hdi:0.731,internet:72.0,unemp:7.3},
  {n:"Equatorial Guinea",f:"🇬🇶",pop:1674908,gdp:8083,area:28051,lifeExp:60.0,literacy:95.0,coast:296,co2:5.0,hdi:0.596,internet:54.0,unemp:8.6},
  {n:"Eritrea",f:"🇪🇷",pop:3748901,gdp:2065,area:117600,lifeExp:67.0,literacy:76.6,coast:2234,co2:0.5,hdi:0.492,internet:20.0,unemp:5.2},
  {n:"Eswatini",f:"🇸🇿",pop:1210822,gdp:4772,area:17364,lifeExp:57.0,literacy:88.4,coast:0,co2:1.8,hdi:0.611,internet:51.0,unemp:23.0},
  {n:"Ethiopia",f:"🇪🇹",pop:126527060,gdp:126840,area:1104300,lifeExp:67.8,literacy:51.8,coast:0,co2:0.2,hdi:0.492,internet:22.0,unemp:3.5},
  {n:"Gabon",f:"🇬🇦",pop:2341179,gdp:16875,area:267668,lifeExp:67.0,literacy:85.0,coast:885,co2:2.2,hdi:0.706,internet:68.0,unemp:20.0},
  {n:"Gambia",f:"🇬🇲",pop:2705992,gdp:2075,area:11295,lifeExp:62.0,literacy:58.0,coast:80,co2:0.3,hdi:0.5,internet:35.0,unemp:9.0},
  {n:"Ghana",f:"🇬🇭",pop:33475870,gdp:77594,area:238533,lifeExp:64.7,literacy:79.0,coast:539,co2:0.6,hdi:0.632,internet:59.0,unemp:4.4},
  {n:"Guinea",f:"🇬🇳",pop:13859341,gdp:15690,area:245857,lifeExp:60.0,literacy:45.3,coast:320,co2:0.4,hdi:0.465,internet:28.0,unemp:5.4},
  {n:"Guinea-Bissau",f:"🇬🇼",pop:2105566,gdp:1704,area:36125,lifeExp:60.0,literacy:52.0,coast:350,co2:0.2,hdi:0.461,internet:24.0,unemp:3.0},
  {n:"Ivory Coast",f:"🇨🇮",pop:27900000,gdp:70020,area:322463,lifeExp:59.0,literacy:56.1,coast:520,co2:0.5,hdi:0.55,internet:46.0,unemp:3.4},
  {n:"Kenya",f:"🇰🇪",pop:55100586,gdp:118132,area:580367,lifeExp:67.3,literacy:82.6,coast:536,co2:0.4,hdi:0.601,internet:42.0,unemp:5.5},
  {n:"Lesotho",f:"🇱🇸",pop:2330318,gdp:2443,area:30355,lifeExp:55.0,literacy:81.0,coast:0,co2:1.0,hdi:0.527,internet:35.0,unemp:24.6},
  {n:"Liberia",f:"🇱🇷",pop:5418377,gdp:3823,area:111369,lifeExp:64.0,literacy:48.3,coast:579,co2:0.2,hdi:0.481,internet:27.0,unemp:2.7},
  {n:"Libya",f:"🇱🇾",pop:7252573,gdp:36818,area:1759540,lifeExp:73.0,literacy:91.0,coast:1770,co2:9.3,hdi:0.718,internet:85.0,unemp:19.2},
  {n:"Madagascar",f:"🇲🇬",pop:28915653,gdp:14565,area:587041,lifeExp:67.0,literacy:76.7,coast:4828,co2:0.2,hdi:0.501,internet:20.0,unemp:2.5},
  {n:"Malawi",f:"🇲🇼",pop:20405317,gdp:12625,area:118484,lifeExp:64.0,literacy:67.3,coast:0,co2:0.1,hdi:0.508,internet:15.0,unemp:5.7},
  {n:"Mali",f:"🇲🇱",pop:22395489,gdp:17904,area:1240192,lifeExp:59.0,literacy:35.5,coast:0,co2:0.3,hdi:0.428,internet:30.0,unemp:8.1},
  {n:"Mauritania",f:"🇲🇷",pop:4649658,gdp:9560,area:1030700,lifeExp:65.0,literacy:52.1,coast:754,co2:0.7,hdi:0.54,internet:59.0,unemp:10.5},
  {n:"Mauritius",f:"🇲🇺",pop:1299469,gdp:12247,area:2040,lifeExp:75.6,literacy:92.7,coast:177,co2:3.4,hdi:0.804,internet:72.0,unemp:6.8},
  {n:"Morocco",f:"🇲🇦",pop:37840044,gdp:142866,area:446550,lifeExp:77.4,literacy:75.9,coast:1835,co2:1.8,hdi:0.683,internet:88.0,unemp:11.1},
  {n:"Mozambique",f:"🇲🇿",pop:33089461,gdp:14882,area:801590,lifeExp:61.0,literacy:63.4,coast:2470,co2:0.2,hdi:0.446,internet:26.0,unemp:3.2},
  {n:"Namibia",f:"🇳🇦",pop:2604172,gdp:12647,area:824292,lifeExp:65.0,literacy:91.5,coast:1572,co2:1.7,hdi:0.615,internet:60.0,unemp:20.2},
  {n:"Niger",f:"🇳🇪",pop:26207977,gdp:13792,area:1267000,lifeExp:63.0,literacy:37.3,coast:0,co2:0.1,hdi:0.394,internet:22.0,unemp:0.3},
  {n:"Nigeria",f:"🇳🇬",pop:223804632,gdp:477386,area:923768,lifeExp:55.2,literacy:62.0,coast:853,co2:0.7,hdi:0.548,internet:55.0,unemp:5.0},
  {n:"Rwanda",f:"🇷🇼",pop:14094683,gdp:12001,area:26338,lifeExp:69.0,literacy:75.9,coast:0,co2:0.2,hdi:0.543,internet:61.0,unemp:1.0},
  {n:"São Tomé & Príncipe",f:"🇸🇹",pop:231856,gdp:534,area:964,lifeExp:71.0,literacy:94.8,coast:209,co2:0.8,hdi:0.609,internet:34.0,unemp:13.6},
  {n:"Senegal",f:"🇸🇳",pop:17763163,gdp:27628,area:196722,lifeExp:68.0,literacy:56.3,coast:531,co2:0.7,hdi:0.511,internet:65.0,unemp:20.1},
  {n:"Sierra Leone",f:"🇸🇱",pop:8605718,gdp:4306,area:71740,lifeExp:61.0,literacy:48.6,coast:402,co2:0.2,hdi:0.477,internet:24.0,unemp:4.2},
  {n:"Somalia",f:"🇸🇴",pop:18143378,gdp:8131,area:637657,lifeExp:57.0,literacy:40.0,coast:3025,co2:0.1,hdi:0.361,internet:22.0,unemp:14.0},
  {n:"South Africa",f:"🇿🇦",pop:60414495,gdp:405270,area:1221037,lifeExp:64.9,literacy:87.0,coast:2798,co2:7.5,hdi:0.713,internet:72.0,unemp:32.9},
  {n:"South Sudan",f:"🇸🇸",pop:11088796,gdp:4628,area:619745,lifeExp:58.0,literacy:34.5,coast:0,co2:0.1,hdi:0.381,internet:9.0,unemp:12.0},
  {n:"Sudan",f:"🇸🇩",pop:46874204,gdp:34330,area:1861484,lifeExp:65.7,literacy:60.7,coast:853,co2:0.5,hdi:0.508,internet:30.0,unemp:19.6},
  {n:"Tanzania",f:"🇹🇿",pop:65497748,gdp:79159,area:945087,lifeExp:68.0,literacy:81.8,coast:1424,co2:0.2,hdi:0.532,internet:50.0,unemp:2.6},
  {n:"Togo",f:"🇹🇬",pop:8848699,gdp:8004,area:56785,lifeExp:61.0,literacy:67.0,coast:56,co2:0.3,hdi:0.539,internet:27.0,unemp:1.8},
  {n:"Tunisia",f:"🇹🇳",pop:12032943,gdp:46686,area:163610,lifeExp:77.0,literacy:82.7,coast:1148,co2:3.0,hdi:0.731,internet:73.0,unemp:15.2},
  {n:"Turkey",f:"🇹🇷",pop:85279553,gdp:905988,area:783562,lifeExp:76.0,literacy:96.7,coast:7200,co2:5.5,hdi:0.838,internet:83.0,unemp:10.0},
  {n:"Uganda",f:"🇺🇬",pop:48582334,gdp:45453,area:241550,lifeExp:63.7,literacy:79.0,coast:0,co2:0.2,hdi:0.544,internet:49.0,unemp:2.6},
  {n:"Zambia",f:"🇿🇲",pop:20569737,gdp:28531,area:752612,lifeExp:63.0,literacy:87.5,coast:0,co2:0.4,hdi:0.565,internet:53.0,unemp:12.5},
  {n:"Zimbabwe",f:"🇿🇼",pop:16665409,gdp:23999,area:390757,lifeExp:61.2,literacy:88.7,coast:0,co2:0.8,hdi:0.593,internet:35.0,unemp:5.2},
  {n:"Afghanistan",f:"🇦🇫",pop:42239854,gdp:14589,area:652230,lifeExp:64.5,literacy:37.3,coast:0,co2:0.3,hdi:0.478,internet:18.0,unemp:11.8},
  {n:"Armenia",f:"🇦🇲",pop:2777970,gdp:19474,area:29743,lifeExp:75.1,literacy:99.7,coast:0,co2:2.0,hdi:0.776,internet:79.0,unemp:14.6},
  {n:"Azerbaijan",f:"🇦🇿",pop:10358074,gdp:78710,area:86600,lifeExp:73.9,literacy:99.8,coast:713,co2:4.0,hdi:0.745,internet:88.0,unemp:5.8},
  {n:"Bahrain",f:"🇧🇭",pop:1463265,gdp:42132,area:780,lifeExp:79.0,literacy:97.9,coast:161,co2:22.3,hdi:0.875,internet:100.0,unemp:4.1},
  {n:"Bangladesh",f:"🇧🇩",pop:172954319,gdp:460201,area:147570,lifeExp:73.6,literacy:74.9,coast:580,co2:0.6,hdi:0.661,internet:44.0,unemp:5.3},
  {n:"Bhutan",f:"🇧🇹",pop:787941,gdp:2898,area:38394,lifeExp:71.8,literacy:66.6,coast:0,co2:1.5,hdi:0.681,internet:72.0,unemp:5.3},
  {n:"Brunei",f:"🇧🇳",pop:449002,gdp:15117,area:5765,lifeExp:75.9,literacy:97.2,coast:161,co2:23.7,hdi:0.829,internet:95.0,unemp:4.9},
  {n:"Cambodia",f:"🇰🇭",pop:16900000,gdp:29956,area:181035,lifeExp:70.3,literacy:83.9,coast:443,co2:1.0,hdi:0.593,internet:60.0,unemp:0.3},
  {n:"China",f:"🇨🇳",pop:1412600000,gdp:17963171,area:9596960,lifeExp:78.2,literacy:97.1,coast:14500,co2:7.4,hdi:0.788,internet:73.0,unemp:5.2},
  {n:"Cyprus",f:"🇨🇾",pop:1260138,gdp:27568,area:9251,lifeExp:81.0,literacy:99.1,coast:648,co2:5.5,hdi:0.896,internet:92.0,unemp:6.9},
  {n:"Georgia",f:"🇬🇪",pop:3728678,gdp:24629,area:69700,lifeExp:74.4,literacy:99.6,coast:310,co2:2.5,hdi:0.812,internet:80.0,unemp:17.6},
  {n:"India",f:"🇮🇳",pop:1428627663,gdp:3385090,area:3287263,lifeExp:70.2,literacy:74.4,coast:7517,co2:1.9,hdi:0.644,internet:43.0,unemp:7.6},
  {n:"Indonesia",f:"🇮🇩",pop:277534122,gdp:1319100,area:1904569,lifeExp:71.7,literacy:95.7,coast:54716,co2:2.3,hdi:0.705,internet:77.0,unemp:5.8},
  {n:"Iran",f:"🇮🇷",pop:89172767,gdp:367968,area:1648195,lifeExp:77.0,literacy:88.7,coast:2440,co2:8.1,hdi:0.774,internet:78.0,unemp:9.4},
  {n:"Iraq",f:"🇮🇶",pop:43533592,gdp:268687,area:438317,lifeExp:71.0,literacy:86.0,coast:58,co2:4.5,hdi:0.686,internet:79.0,unemp:16.4},
  {n:"Israel",f:"🇮🇱",pop:9174520,gdp:521688,area:22072,lifeExp:83.0,literacy:97.8,coast:273,co2:6.3,hdi:0.919,internet:90.0,unemp:3.8},
  {n:"Japan",f:"🇯🇵",pop:123294513,gdp:4231141,area:377975,lifeExp:84.3,literacy:99.0,coast:29751,co2:8.3,hdi:0.92,internet:93.0,unemp:2.6},
  {n:"Jordan",f:"🇯🇴",pop:10302374,gdp:46484,area:89342,lifeExp:75.6,literacy:98.4,coast:26,co2:2.6,hdi:0.72,internet:83.0,unemp:22.6},
  {n:"Kazakhstan",f:"🇰🇿",pop:19606633,gdp:224440,area:2724900,lifeExp:73.7,literacy:99.8,coast:0,co2:12.2,hdi:0.802,internet:91.0,unemp:5.0},
  {n:"Kuwait",f:"🇰🇼",pop:4310108,gdp:161772,area:17818,lifeExp:77.6,literacy:96.5,coast:499,co2:25.7,hdi:0.831,internet:98.0,unemp:2.0},
  {n:"Kyrgyzstan",f:"🇰🇬",pop:6735347,gdp:10978,area:199951,lifeExp:72.0,literacy:99.7,coast:0,co2:1.4,hdi:0.692,internet:73.0,unemp:6.7},
  {n:"Laos",f:"🇱🇦",pop:7749595,gdp:15367,area:236800,lifeExp:68.0,literacy:87.1,coast:0,co2:2.5,hdi:0.607,internet:47.0,unemp:1.3},
  {n:"Lebanon",f:"🇱🇧",pop:5353930,gdp:22359,area:10452,lifeExp:79.0,literacy:95.1,coast:225,co2:3.8,hdi:0.706,internet:78.0,unemp:29.6},
  {n:"Malaysia",f:"🇲🇾",pop:33573874,gdp:439366,area:329847,lifeExp:76.4,literacy:95.0,coast:4675,co2:8.1,hdi:0.803,internet:97.0,unemp:3.6},
  {n:"Maldives",f:"🇲🇻",pop:523787,gdp:5867,area:300,lifeExp:80.0,literacy:97.9,coast:644,co2:3.3,hdi:0.747,internet:78.0,unemp:5.2},
  {n:"Mongolia",f:"🇲🇳",pop:3398366,gdp:16683,area:1564116,lifeExp:71.6,literacy:99.3,coast:0,co2:8.0,hdi:0.737,internet:80.0,unemp:8.3},
  {n:"Myanmar",f:"🇲🇲",pop:54409800,gdp:59998,area:676578,lifeExp:67.1,literacy:89.1,coast:1930,co2:0.7,hdi:0.585,internet:40.0,unemp:2.8},
  {n:"Nepal",f:"🇳🇵",pop:30034989,gdp:40827,area:147181,lifeExp:71.1,literacy:67.9,coast:0,co2:0.4,hdi:0.602,internet:63.0,unemp:11.4},
  {n:"North Korea",f:"🇰🇵",pop:25971909,gdp:17960,area:120538,lifeExp:72.6,literacy:100.0,coast:2495,co2:3.5,hdi:0.733,internet:0.1,unemp:4.0},
  {n:"Oman",f:"🇴🇲",pop:4644384,gdp:104903,area:309500,lifeExp:77.0,literacy:95.7,coast:2092,co2:14.4,hdi:0.816,internet:95.0,unemp:3.1},
  {n:"Pakistan",f:"🇵🇰",pop:231402117,gdp:347232,area:881913,lifeExp:67.3,literacy:58.0,coast:1046,co2:1.0,hdi:0.54,internet:36.0,unemp:6.3},
  {n:"Palestine",f:"🇵🇸",pop:5371230,gdp:19559,area:6220,lifeExp:74.0,literacy:97.4,coast:60,co2:1.0,hdi:0.715,internet:79.0,unemp:26.4},
  {n:"Philippines",f:"🇵🇭",pop:117337368,gdp:404283,area:300000,lifeExp:72.7,literacy:96.3,coast:36289,co2:1.1,hdi:0.699,internet:67.0,unemp:5.3},
  {n:"Qatar",f:"🇶🇦",pop:2695122,gdp:219966,area:11586,lifeExp:80.0,literacy:93.5,coast:563,co2:37.0,hdi:0.855,internet:99.0,unemp:0.1},
  {n:"Saudi Arabia",f:"🇸🇦",pop:36947025,gdp:1108151,area:2149690,lifeExp:76.4,literacy:97.6,coast:2640,co2:18.7,hdi:0.875,internet:96.0,unemp:5.6},
  {n:"Singapore",f:"🇸🇬",pop:5917648,gdp:466789,area:728,lifeExp:83.9,literacy:97.5,coast:193,co2:8.6,hdi:0.939,internet:92.0,unemp:2.1},
  {n:"South Korea",f:"🇰🇷",pop:51709098,gdp:1665246,area:100210,lifeExp:83.5,literacy:99.0,coast:2413,co2:11.7,hdi:0.929,internet:97.0,unemp:2.9},
  {n:"Sri Lanka",f:"🇱🇰",pop:21893579,gdp:74408,area:65610,lifeExp:77.0,literacy:92.3,coast:1340,co2:1.1,hdi:0.782,internet:52.0,unemp:4.9},
  {n:"Syria",f:"🇸🇾",pop:21324367,gdp:11108,area:185180,lifeExp:73.0,literacy:86.4,coast:193,co2:1.5,hdi:0.577,internet:37.0,unemp:14.9},
  {n:"Taiwan",f:"🇹🇼",pop:23570000,gdp:760952,area:35980,lifeExp:81.0,literacy:98.9,coast:1566,co2:11.6,hdi:0.926,internet:90.0,unemp:3.7},
  {n:"Tajikistan",f:"🇹🇯",pop:10143543,gdp:10509,area:143100,lifeExp:72.0,literacy:99.8,coast:0,co2:1.1,hdi:0.685,internet:48.0,unemp:12.8},
  {n:"Thailand",f:"🇹🇭",pop:71801279,gdp:544869,area:513120,lifeExp:79.0,literacy:94.1,coast:3219,co2:4.0,hdi:0.8,internet:85.0,unemp:1.0},
  {n:"Timor-Leste",f:"🇹🇱",pop:1360596,gdp:2877,area:14874,lifeExp:69.0,literacy:68.1,coast:706,co2:1.0,hdi:0.607,internet:34.0,unemp:4.8},
  {n:"Turkmenistan",f:"🇹🇲",pop:6341855,gdp:46380,area:488100,lifeExp:70.0,literacy:99.7,coast:1748,co2:12.0,hdi:0.745,internet:42.0,unemp:4.2},
  {n:"UAE",f:"🇦🇪",pop:9441129,gdp:507534,area:83600,lifeExp:78.4,literacy:93.8,coast:1318,co2:20.7,hdi:0.911,internet:99.0,unemp:2.7},
  {n:"Uzbekistan",f:"🇺🇿",pop:35300000,gdp:80399,area:447400,lifeExp:71.7,literacy:100.0,coast:0,co2:3.6,hdi:0.727,internet:77.0,unemp:9.3},
  {n:"Vietnam",f:"🇻🇳",pop:98186989,gdp:408947,area:331212,lifeExp:75.6,literacy:95.8,coast:3444,co2:3.6,hdi:0.726,internet:73.0,unemp:2.1},
  {n:"Yemen",f:"🇾🇪",pop:33696614,gdp:21606,area:527968,lifeExp:66.0,literacy:70.1,coast:1906,co2:0.9,hdi:0.455,internet:31.0,unemp:13.8},
  {n:"Albania",f:"🇦🇱",pop:2832439,gdp:18877,area:28748,lifeExp:79.0,literacy:98.0,coast:476,co2:1.9,hdi:0.796,internet:79.0,unemp:11.8},
  {n:"Andorra",f:"🇦🇩",pop:79535,gdp:3236,area:468,lifeExp:83.0,literacy:100.0,coast:0,co2:5.8,hdi:0.896,internet:99.0,unemp:3.7},
  {n:"Austria",f:"🇦🇹",pop:9132383,gdp:471428,area:83871,lifeExp:81.5,literacy:98.0,coast:0,co2:7.1,hdi:0.926,internet:93.0,unemp:4.8},
  {n:"Belarus",f:"🇧🇾",pop:9498238,gdp:73887,area:207600,lifeExp:74.1,literacy:99.8,coast:0,co2:6.7,hdi:0.808,internet:87.0,unemp:3.9},
  {n:"Belgium",f:"🇧🇪",pop:11738763,gdp:578588,area:30528,lifeExp:81.6,literacy:99.0,coast:67,co2:7.8,hdi:0.937,internet:93.0,unemp:5.6},
  {n:"Bosnia & Herz.",f:"🇧🇦",pop:3210847,gdp:24444,area:51197,lifeExp:77.4,literacy:98.5,coast:20,co2:6.3,hdi:0.78,internet:81.0,unemp:17.5},
  {n:"Bulgaria",f:"🇧🇬",pop:6465011,gdp:95068,area:110879,lifeExp:75.1,literacy:98.4,coast:354,co2:6.1,hdi:0.795,internet:84.0,unemp:4.8},
  {n:"Croatia",f:"🇭🇷",pop:3855641,gdp:70440,area:56594,lifeExp:78.5,literacy:99.4,coast:5835,co2:3.9,hdi:0.858,internet:86.0,unemp:6.4},
  {n:"Czech Republic",f:"🇨🇿",pop:10900555,gdp:290388,area:78866,lifeExp:79.5,literacy:99.0,coast:0,co2:8.9,hdi:0.895,internet:88.0,unemp:2.3},
  {n:"Denmark",f:"🇩🇰",pop:5910913,gdp:395208,area:43094,lifeExp:81.6,literacy:99.0,coast:7314,co2:5.1,hdi:0.948,internet:98.0,unemp:5.0},
  {n:"Estonia",f:"🇪🇪",pop:1322766,gdp:38456,area:45228,lifeExp:78.5,literacy:99.8,coast:3794,co2:7.1,hdi:0.899,internet:92.0,unemp:5.7},
  {n:"Finland",f:"🇫🇮",pop:5545475,gdp:274669,area:338435,lifeExp:81.9,literacy:99.0,coast:1250,co2:6.4,hdi:0.94,internet:93.0,unemp:7.4},
  {n:"France",f:"🇫🇷",pop:64756584,gdp:2782905,area:643801,lifeExp:82.5,literacy:99.0,coast:4853,co2:4.4,hdi:0.91,internet:84.0,unemp:7.4},
  {n:"Germany",f:"🇩🇪",pop:83369843,gdp:4072192,area:357114,lifeExp:81.1,literacy:99.0,coast:2389,co2:7.7,hdi:0.95,internet:91.0,unemp:3.0},
  {n:"Greece",f:"🇬🇷",pop:10341277,gdp:218140,area:131957,lifeExp:82.2,literacy:97.9,coast:13676,co2:5.5,hdi:0.887,internet:80.0,unemp:12.6},
  {n:"Hungary",f:"🇭🇺",pop:9710882,gdp:176527,area:93028,lifeExp:76.4,literacy:99.1,coast:0,co2:5.7,hdi:0.851,internet:89.0,unemp:4.1},
  {n:"Iceland",f:"🇮🇸",pop:376248,gdp:25778,area:103000,lifeExp:83.1,literacy:99.0,coast:4970,co2:11.6,hdi:0.959,internet:99.0,unemp:3.4},
  {n:"Ireland",f:"🇮🇪",pop:5194336,gdp:529717,area:70273,lifeExp:82.8,literacy:99.0,coast:2500,co2:7.0,hdi:0.945,internet:92.0,unemp:4.8},
  {n:"Italy",f:"🇮🇹",pop:59240329,gdp:2053109,area:301340,lifeExp:83.6,literacy:99.0,coast:7600,co2:5.3,hdi:0.895,internet:78.0,unemp:7.0},
  {n:"Kosovo",f:"🇽🇰",pop:1775378,gdp:9343,area:10887,lifeExp:71.6,literacy:91.9,coast:0,co2:1.9,hdi:0.742,internet:89.0,unemp:25.9},
  {n:"Latvia",f:"🇱🇻",pop:1830211,gdp:40287,area:64589,lifeExp:75.0,literacy:99.9,coast:498,co2:4.3,hdi:0.879,internet:90.0,unemp:7.0},
  {n:"Liechtenstein",f:"🇱🇮",pop:38387,gdp:6873,area:160,lifeExp:82.0,literacy:100.0,coast:0,co2:3.5,hdi:0.935,internet:99.0,unemp:1.5},
  {n:"Lithuania",f:"🇱🇹",pop:2857279,gdp:69459,area:65300,lifeExp:76.3,literacy:99.8,coast:90,co2:5.0,hdi:0.882,internet:87.0,unemp:6.3},
  {n:"Luxembourg",f:"🇱🇺",pop:672050,gdp:79753,area:2586,lifeExp:82.4,literacy:99.0,coast:0,co2:12.7,hdi:0.93,internet:99.0,unemp:4.9},
  {n:"Malta",f:"🇲🇹",pop:535064,gdp:16629,area:316,lifeExp:82.5,literacy:94.4,coast:197,co2:3.6,hdi:0.917,internet:92.0,unemp:3.4},
  {n:"Moldova",f:"🇲🇩",pop:3272996,gdp:14356,area:33851,lifeExp:71.7,literacy:99.6,coast:0,co2:2.3,hdi:0.763,internet:76.0,unemp:4.2},
  {n:"Monaco",f:"🇲🇨",pop:36469,gdp:7200,area:2,lifeExp:85.9,literacy:99.0,coast:4,co2:0.0,hdi:0.956,internet:97.0,unemp:2.0},
  {n:"Montenegro",f:"🇲🇪",pop:626485,gdp:6125,area:13812,lifeExp:76.9,literacy:98.8,coast:293,co2:2.9,hdi:0.832,internet:85.0,unemp:16.5},
  {n:"Netherlands",f:"🇳🇱",pop:17618299,gdp:909891,area:41543,lifeExp:82.3,literacy:99.0,coast:451,co2:7.4,hdi:0.941,internet:96.0,unemp:3.8},
  {n:"North Macedonia",f:"🇲🇰",pop:2085679,gdp:13742,area:25713,lifeExp:74.5,literacy:98.1,coast:0,co2:3.5,hdi:0.77,internet:85.0,unemp:14.5},
  {n:"Norway",f:"🇳🇴",pop:5474360,gdp:579267,area:385207,lifeExp:83.2,literacy:99.0,coast:25148,co2:7.5,hdi:0.961,internet:99.0,unemp:3.5},
  {n:"Poland",f:"🇵🇱",pop:41026067,gdp:688152,area:312679,lifeExp:77.8,literacy:99.8,coast:440,co2:9.0,hdi:0.876,internet:87.0,unemp:2.9},
  {n:"Portugal",f:"🇵🇹",pop:10247605,gdp:254168,area:92212,lifeExp:81.6,literacy:96.1,coast:1793,co2:3.9,hdi:0.866,internet:82.0,unemp:6.1},
  {n:"Romania",f:"🇷🇴",pop:19659267,gdp:284087,area:238397,lifeExp:76.1,literacy:98.8,coast:225,co2:3.9,hdi:0.821,internet:85.0,unemp:5.4},
  {n:"Russia",f:"🇷🇺",pop:144444359,gdp:2240422,area:17098242,lifeExp:72.4,literacy:99.7,coast:37653,co2:11.4,hdi:0.822,internet:88.0,unemp:3.9},
  {n:"San Marino",f:"🇸🇲",pop:33745,gdp:1859,area:61,lifeExp:85.4,literacy:99.9,coast:0,co2:4.5,hdi:0.961,internet:75.0,unemp:8.1},
  {n:"Serbia",f:"🇷🇸",pop:6834326,gdp:63587,area:77474,lifeExp:76.5,literacy:99.5,coast:0,co2:5.5,hdi:0.805,internet:84.0,unemp:9.2},
  {n:"Slovakia",f:"🇸🇰",pop:5795199,gdp:117508,area:49035,lifeExp:77.6,literacy:99.6,coast:0,co2:6.2,hdi:0.848,internet:88.0,unemp:5.9},
  {n:"Slovenia",f:"🇸🇮",pop:2116792,gdp:62109,area:20273,lifeExp:81.5,literacy:99.7,coast:47,co2:5.9,hdi:0.926,internet:90.0,unemp:3.9},
  {n:"Spain",f:"🇪🇸",pop:47519628,gdp:1418269,area:505990,lifeExp:83.2,literacy:98.7,coast:4964,co2:5.1,hdi:0.905,internet:93.0,unemp:12.9},
  {n:"Sweden",f:"🇸🇪",pop:10612086,gdp:585940,area:450295,lifeExp:82.9,literacy:99.0,coast:3218,co2:3.7,hdi:0.947,internet:97.0,unemp:8.5},
  {n:"Switzerland",f:"🇨🇭",pop:8796669,gdp:807706,area:41285,lifeExp:83.8,literacy:99.0,coast:0,co2:4.2,hdi:0.962,internet:93.0,unemp:4.7},
  {n:"UK",f:"🇬🇧",pop:67736802,gdp:3070668,area:243610,lifeExp:81.3,literacy:99.0,coast:12429,co2:5.2,hdi:0.929,internet:96.0,unemp:3.7},
  {n:"Ukraine",f:"🇺🇦",pop:43531422,gdp:160502,area:603550,lifeExp:72.1,literacy:99.8,coast:2782,co2:4.4,hdi:0.773,internet:79.0,unemp:18.5},
  {n:"Vatican City",f:"🇻🇦",pop:800,gdp:0,area:0,lifeExp:0,literacy:100.0,coast:0,co2:0.0,hdi:0.001,internet:60.0,unemp:0.0},
  {n:"Antigua & Barbuda",f:"🇦🇬",pop:93763,gdp:1834,area:442,lifeExp:77.0,literacy:99.0,coast:153,co2:5.8,hdi:0.778,internet:76.0,unemp:11.0},
  {n:"Bahamas",f:"🇧🇸",pop:407906,gdp:12617,area:13943,lifeExp:73.8,literacy:96.0,coast:3542,co2:7.8,hdi:0.812,internet:86.0,unemp:9.2},
  {n:"Barbados",f:"🇧🇧",pop:281635,gdp:5266,area:430,lifeExp:78.5,literacy:99.6,coast:97,co2:5.0,hdi:0.814,internet:82.0,unemp:9.9},
  {n:"Belize",f:"🇧🇿",pop:405272,gdp:2718,area:22966,lifeExp:74.6,literacy:88.0,coast:386,co2:1.7,hdi:0.683,internet:58.0,unemp:7.9},
  {n:"Canada",f:"🇨🇦",pop:38781292,gdp:2139840,area:9984670,lifeExp:81.9,literacy:99.0,coast:202080,co2:14.2,hdi:0.936,internet:91.0,unemp:5.4},
  {n:"Costa Rica",f:"🇨🇷",pop:5213374,gdp:64882,area:51100,lifeExp:80.8,literacy:97.9,coast:1290,co2:1.9,hdi:0.809,internet:83.0,unemp:10.4},
  {n:"Cuba",f:"🇨🇺",pop:11212191,gdp:107352,area:109884,lifeExp:78.8,literacy:99.7,coast:3735,co2:3.1,hdi:0.764,internet:71.0,unemp:1.4},
  {n:"Dominica",f:"🇩🇲",pop:72737,gdp:642,area:751,lifeExp:77.0,literacy:94.0,coast:148,co2:2.0,hdi:0.72,internet:70.0,unemp:6.0},
  {n:"Dominican Rep.",f:"🇩🇴",pop:11332972,gdp:113562,area:48671,lifeExp:74.5,literacy:95.4,coast:1288,co2:2.4,hdi:0.767,internet:81.0,unemp:5.3},
  {n:"El Salvador",f:"🇸🇻",pop:6364943,gdp:32490,area:21041,lifeExp:73.7,literacy:88.8,coast:307,co2:1.4,hdi:0.675,internet:60.0,unemp:3.0},
  {n:"Grenada",f:"🇬🇩",pop:125438,gdp:1248,area:344,lifeExp:74.0,literacy:98.6,coast:121,co2:2.6,hdi:0.779,internet:73.0,unemp:24.0},
  {n:"Guatemala",f:"🇬🇹",pop:17357886,gdp:88713,area:108889,lifeExp:74.3,literacy:83.3,coast:400,co2:1.2,hdi:0.627,internet:55.0,unemp:2.6},
  {n:"Haiti",f:"🇭🇹",pop:11724763,gdp:20020,area:27750,lifeExp:65.0,literacy:64.0,coast:1771,co2:0.3,hdi:0.535,internet:38.0,unemp:13.7},
  {n:"Honduras",f:"🇭🇳",pop:10593798,gdp:28480,area:112492,lifeExp:75.5,literacy:88.5,coast:820,co2:1.2,hdi:0.621,internet:45.0,unemp:8.5},
  {n:"Jamaica",f:"🇯🇲",pop:2827692,gdp:16463,area:10991,lifeExp:74.4,literacy:88.7,coast:1022,co2:2.8,hdi:0.709,internet:72.0,unemp:11.1},
  {n:"Mexico",f:"🇲🇽",pop:128455567,gdp:1322812,area:1964375,lifeExp:75.1,literacy:94.9,coast:9330,co2:3.7,hdi:0.758,internet:72.0,unemp:3.3},
  {n:"Nicaragua",f:"🇳🇮",pop:7046310,gdp:16108,area:130373,lifeExp:74.5,literacy:82.6,coast:910,co2:0.9,hdi:0.667,internet:46.0,unemp:5.5},
  {n:"Panama",f:"🇵🇦",pop:4337406,gdp:74645,area:75417,lifeExp:78.9,literacy:95.7,coast:2490,co2:2.2,hdi:0.805,internet:70.0,unemp:6.5},
  {n:"Saint Kitts & Nevis",f:"🇰🇳",pop:47755,gdp:1074,area:261,lifeExp:76.0,literacy:98.0,coast:135,co2:4.4,hdi:0.777,internet:79.0,unemp:5.0},
  {n:"Saint Lucia",f:"🇱🇨",pop:179651,gdp:2130,area:616,lifeExp:76.2,literacy:90.2,coast:158,co2:2.5,hdi:0.715,internet:64.0,unemp:23.2},
  {n:"St. Vincent & Gren.",f:"🇻🇨",pop:110696,gdp:1005,area:389,lifeExp:73.3,literacy:96.0,coast:84,co2:2.0,hdi:0.751,internet:73.0,unemp:23.2},
  {n:"Trinidad & Tobago",f:"🇹🇹",pop:1534937,gdp:24618,area:5130,lifeExp:75.9,literacy:99.0,coast:362,co2:22.8,hdi:0.814,internet:79.0,unemp:5.0},
  {n:"USA",f:"🇺🇸",pop:339996563,gdp:25462700,area:9372610,lifeExp:78.9,literacy:99.0,coast:19924,co2:14.2,hdi:0.926,internet:91.0,unemp:3.7},
  {n:"Argentina",f:"🇦🇷",pop:45773884,gdp:632772,area:2780400,lifeExp:76.9,literacy:98.9,coast:4989,co2:4.0,hdi:0.842,internet:88.0,unemp:6.9},
  {n:"Bolivia",f:"🇧🇴",pop:12388571,gdp:44310,area:1098581,lifeExp:71.5,literacy:92.5,coast:0,co2:2.0,hdi:0.698,internet:51.0,unemp:3.5},
  {n:"Brazil",f:"🇧🇷",pop:215313498,gdp:1920096,area:8515767,lifeExp:75.9,literacy:93.2,coast:7491,co2:2.2,hdi:0.76,internet:81.0,unemp:9.3},
  {n:"Chile",f:"🇨🇱",pop:19629590,gdp:301023,area:756102,lifeExp:80.4,literacy:96.4,coast:6435,co2:4.3,hdi:0.86,internet:88.0,unemp:7.6},
  {n:"Colombia",f:"🇨🇴",pop:52215503,gdp:343939,area:1141748,lifeExp:77.3,literacy:95.4,coast:3208,co2:1.6,hdi:0.752,internet:73.0,unemp:10.8},
  {n:"Ecuador",f:"🇪🇨",pop:18001000,gdp:107966,area:283561,lifeExp:77.6,literacy:94.4,coast:2237,co2:2.5,hdi:0.74,internet:71.0,unemp:3.8},
  {n:"Guyana",f:"🇬🇾",pop:813834,gdp:14763,area:214969,lifeExp:70.5,literacy:88.5,coast:459,co2:2.3,hdi:0.714,internet:85.0,unemp:11.9},
  {n:"Paraguay",f:"🇵🇾",pop:7360000,gdp:42316,area:406752,lifeExp:74.3,literacy:95.1,coast:0,co2:1.4,hdi:0.717,internet:72.0,unemp:5.0},
  {n:"Peru",f:"🇵🇪",pop:33359418,gdp:239978,area:1285216,lifeExp:76.2,literacy:94.5,coast:2414,co2:1.5,hdi:0.762,internet:71.0,unemp:7.7},
  {n:"Suriname",f:"🇸🇷",pop:623236,gdp:3717,area:163820,lifeExp:74.0,literacy:93.6,coast:386,co2:4.3,hdi:0.73,internet:63.0,unemp:8.0},
  {n:"Uruguay",f:"🇺🇾",pop:3423108,gdp:71176,area:176215,lifeExp:78.2,literacy:98.8,coast:660,co2:2.2,hdi:0.83,internet:88.0,unemp:8.3},
  {n:"Venezuela",f:"🇻🇪",pop:28838499,gdp:97527,area:916445,lifeExp:72.6,literacy:97.5,coast:2800,co2:2.7,hdi:0.711,internet:72.0,unemp:7.9},
  {n:"Australia",f:"🇦🇺",pop:26439111,gdp:1675419,area:7692024,lifeExp:83.2,literacy:99.0,coast:25760,co2:15.1,hdi:0.951,internet:91.0,unemp:3.7},
  {n:"Fiji",f:"🇫🇯",pop:929766,gdp:4590,area:18272,lifeExp:70.2,literacy:99.1,coast:1129,co2:1.9,hdi:0.73,internet:61.0,unemp:5.5},
  {n:"Kiribati",f:"🇰🇮",pop:119446,gdp:248,area:811,lifeExp:68.0,literacy:99.0,coast:1143,co2:0.6,hdi:0.63,internet:25.0,unemp:30.6},
  {n:"Marshall Islands",f:"🇲🇭",pop:42050,gdp:244,area:181,lifeExp:74.0,literacy:98.2,coast:370,co2:2.0,hdi:0.704,internet:38.0,unemp:36.0},
  {n:"Micronesia",f:"🇫🇲",pop:115021,gdp:426,area:702,lifeExp:72.0,literacy:89.0,coast:6112,co2:1.7,hdi:0.62,internet:43.0,unemp:16.0},
  {n:"Nauru",f:"🇳🇷",pop:10873,gdp:141,area:21,lifeExp:67.0,literacy:96.0,coast:30,co2:4.3,hdi:0.703,internet:57.0,unemp:23.0},
  {n:"New Zealand",f:"🇳🇿",pop:5123392,gdp:247237,area:268838,lifeExp:82.5,literacy:99.0,coast:15134,co2:6.3,hdi:0.939,internet:92.0,unemp:3.7},
  {n:"Palau",f:"🇵🇼",pop:18055,gdp:268,area:459,lifeExp:73.0,literacy:100.0,coast:1519,co2:12.5,hdi:0.767,internet:82.0,unemp:1.9},
  {n:"Papua New Guinea",f:"🇵🇬",pop:10329931,gdp:30648,area:462840,lifeExp:65.0,literacy:63.4,coast:5152,co2:0.9,hdi:0.558,internet:12.0,unemp:2.5},
  {n:"Samoa",f:"🇼🇸",pop:222382,gdp:883,area:2842,lifeExp:74.0,literacy:99.1,coast:403,co2:1.6,hdi:0.707,internet:35.0,unemp:8.4},
  {n:"Solomon Islands",f:"🇸🇧",pop:720939,gdp:1622,area:28896,lifeExp:73.0,literacy:84.1,coast:5313,co2:0.4,hdi:0.564,internet:22.0,unemp:3.4},
  {n:"Tonga",f:"🇹🇴",pop:100651,gdp:519,area:747,lifeExp:71.0,literacy:99.4,coast:419,co2:1.7,hdi:0.74,internet:44.0,unemp:1.2},
  {n:"Tuvalu",f:"🇹🇻",pop:11792,gdp:63,area:26,lifeExp:67.0,literacy:99.0,coast:24,co2:1.5,hdi:0.641,internet:49.0,unemp:4.5},
  {n:"Vanuatu",f:"🇻🇺",pop:334506,gdp:1059,area:12189,lifeExp:70.5,literacy:87.5,coast:2528,co2:0.7,hdi:0.607,internet:30.0,unemp:5.2},
];

/* ══════════════════════════════════════════
   CONTINENTS
══════════════════════════════════════════ */
const CONTINENTS = {
  'Africa':["Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cameroon","Cape Verde","Central African Rep.","Chad","Comoros","DR Congo","Congo","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Ivory Coast","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","São Tomé & Príncipe","Senegal","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe"],
  'Asia':["Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia","China","Cyprus","Georgia","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Laos","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","North Korea","Oman","Pakistan","Palestine","Philippines","Qatar","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Taiwan","Tajikistan","Thailand","Timor-Leste","Turkey","Turkmenistan","UAE","Uzbekistan","Vietnam","Yemen"],
  'Europe':["Albania","Andorra","Austria","Belarus","Belgium","Bosnia & Herz.","Bulgaria","Croatia","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Moldova","Monaco","Montenegro","Netherlands","North Macedonia","Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","UK","Ukraine","Vatican City"],
  'N.America':["Antigua & Barbuda","Bahamas","Barbados","Belize","Canada","Costa Rica","Cuba","Dominica","Dominican Rep.","El Salvador","Grenada","Guatemala","Haiti","Honduras","Jamaica","Mexico","Nicaragua","Panama","Saint Kitts & Nevis","Saint Lucia","St. Vincent & Gren.","Trinidad & Tobago","USA"],
  'S.America':["Argentina","Bolivia","Brazil","Chile","Colombia","Ecuador","Guyana","Paraguay","Peru","Suriname","Uruguay","Venezuela"],
  'Oceania':["Australia","Fiji","Kiribati","Marshall Islands","Micronesia","Nauru","New Zealand","Palau","Papua New Guinea","Samoa","Solomon Islands","Tonga","Tuvalu","Vanuatu"],
};

function filterCont(pool, cont) {
  if(!cont || cont==='all') return pool;
  const names = CONTINENTS[cont];
  return names ? pool.filter(c=>names.includes(c.n)) : pool;
}

/* ══════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════ */
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(a){ const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b; }
function sanitize(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

function pick(arr,n){ return shuffle(arr).slice(0,n); }
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const _b=document.getElementById('profile-badge');if(_b){const _sh=(id==='h'||id==='over');_b.style.opacity=_sh?'1':'0';_b.style.pointerEvents=_sh?'auto':'none';}
  document.getElementById('s'+id).classList.add('active');
  window.scrollTo(0,0);
  if(typeof GeoAudio!=='undefined') GeoAudio.playSFX('navigate');
  // Switch music based on screen
  if(typeof GeoAudio!=='undefined'){
    if(id==='h'||id==='over'||id==='quiz-over') GeoAudio.playMusic('menu');
    else GeoAudio.playMusic('gameplay');
  }
}
function goHome(){ showScreen('h'); initHome(); }
function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

/* ══════════════════════════════════════════
   CATEGORY & CONTINENT BARS
══════════════════════════════════════════ */
const CAT_KEYS = [null,['pop'],['gdp'],['area','coast'],['lifeExp'],['literacy','internet','unemp'],['co2'],['hdi']];
const CONT_IDS = ['all','Africa','Asia','Europe','N.America','S.America','Oceania'];

function buildCatBar(elId, state, onChange){
  const el=document.getElementById(elId); if(!el) return;
  if(!state.selectedCats) state.selectedCats=[0];
  el.innerHTML='';
  T.categories.forEach((lbl,i)=>{
    const b=document.createElement('button');
    const active=state.selectedCats.includes(i);
    b.className='cat-chip'+(active?' active':'');
    b.textContent=lbl;
    b.onclick=()=>{
      if(i===0){
        state.selectedCats=[0];
      } else {
        const allIdx=state.selectedCats.indexOf(0);
        if(allIdx>-1) state.selectedCats.splice(allIdx,1);
        const ci=state.selectedCats.indexOf(i);
        if(ci>-1) state.selectedCats.splice(ci,1); else state.selectedCats.push(i);
        if(state.selectedCats.length===0) state.selectedCats=[0];
      }
      state.catIdx=state.selectedCats.includes(0)?0:state.selectedCats[0];
      buildCatBar(elId,state,onChange); onChange();
    };
    el.appendChild(b);
  });
}
function buildContBar(elId, state, onChange){
  const el=document.getElementById(elId); if(!el) return;
  el.innerHTML='';
  T.continents.forEach((lbl,i)=>{
    const b=document.createElement('button');
    b.className='cat-chip cont-chip'+(state.contIdx===i?' active':'');
    b.textContent=lbl;
    b.onclick=()=>{ state.contIdx=i; buildContBar(elId,state,onChange); onChange(); };
    el.appendChild(b);
  });
}
function getMetricKeys(selectedCats){
  const cats=Array.isArray(selectedCats)?selectedCats:[selectedCats||0];
  if(cats.includes(0)||cats.length===0) return Object.keys(T.metrics);
  const keys=[];
  cats.forEach(ci=>{if(CAT_KEYS[ci]) keys.push(...CAT_KEYS[ci]);});
  return keys.length>0?[...new Set(keys)]:Object.keys(T.metrics);
}
function getPool(catIdx, contIdx){
  const pool=filterCont(COUNTRIES, CONT_IDS[contIdx]||'all');
  return pool.length>=4 ? pool : COUNTRIES;
}

/* ══════════════════════════════════════════
   HIGHER / LOWER
══════════════════════════════════════════ */
let hlS={};

function hlGetHighscore(){
  return parseInt(localStorage.getItem('hl_highscore')||'0');
}
function hlSaveHighscore(s){
  if(s>hlGetHighscore()) localStorage.setItem('hl_highscore',s);
}

function launchHL(){
  hlS={score:0,streak:0,bestStreak:0,round:0,correct:0,total_q:0,catIdx:0,selectedCats:[0],contIdx:0,lastMode:'hl',prevB:null,prevMKey:null,_newRecordShown:false};
  buildCatBar('hl-cats',hlS,()=>{hlS.score=0;hlS.streak=0;hlS.bestStreak=0;hlS.round=0;hlS.correct=0;hlS.total_q=0;hlS.prevB=null;hlS.prevMKey=null;hlS._newRecordShown=false;var _cs=document.getElementById('hl-cur-score');if(_cs)_cs.textContent='0';hlRound();});
  buildContBar('hl-conts',hlS,()=>{hlS.score=0;hlS.streak=0;hlS.bestStreak=0;hlS.round=0;hlS.correct=0;hlS.total_q=0;hlS.prevB=null;hlS.prevMKey=null;hlS._newRecordShown=false;var _cs=document.getElementById('hl-cur-score');if(_cs)_cs.textContent='0';hlRound();});
  hlHUD(); hlRound(); showScreen('hl');
}

function hlRound(){
  hlS.round++;
  const fb=document.getElementById('hl-fb'); fb.className='hl-feedback';
  const nb=document.getElementById('hl-next'); nb.className='next-btn'; nb.onclick=hlRound; nb.textContent=T.next;
  document.getElementById('hl-cA').className='hl-card';
  document.getElementById('hl-cB').className='hl-card';
  document.getElementById('btn-up').disabled=false; document.getElementById('btn-up').textContent=T.higher;
  document.getElementById('btn-down').disabled=false; document.getElementById('btn-down').textContent=T.lower;

  const pool=getPool(hlS.catIdx,hlS.contIdx);
  let cA,cB,mKey,m;

  if(hlS.prevB){
    /* Carry-over: previous B becomes A */
    cA=hlS.prevB;
    const mKeys=getMetricKeys(hlS.selectedCats||[0]);
    const isSingle=hlS.selectedCats&&!hlS.selectedCats.includes(0)&&hlS.selectedCats.length===1&&mKeys.length===1;
    mKey=isSingle?mKeys[0]:(hlS.prevMKey||rand(mKeys));
    m=T.metrics[mKey];
    const candidates=pool.filter(c=>c.n!==cA.n);
    cB=rand(candidates.length>0?candidates:pool);
  } else {
    /* First round: pick fresh */
    const mKeys=getMetricKeys(hlS.selectedCats||[0]);
    mKey=rand(mKeys);
    m=T.metrics[mKey];
    const [a,b]=pick(pool,2);
    cA=a; cB=b;
  }

  hlS.cA=cA; hlS.cB=cB; hlS.mKey=mKey;
  try{achTrack('hlCats',String(hlS.catIdx));}catch(e){}

  document.getElementById('hl-fA').innerHTML=flagImg(cA.f,'3.5rem');
  document.getElementById('hl-nA').textContent=countryName(cA.n);
  document.getElementById('hl-mA').textContent=m.label;
  document.getElementById('hl-vA').textContent=m.fmt(cA[mKey]);
  document.getElementById('hl-vA').className='hl-value';
  document.getElementById('hl-fB').innerHTML=flagImg(cB.f,'3.5rem');
  document.getElementById('hl-nB').textContent=countryName(cB.n);
  document.getElementById('hl-mB').textContent=m.label;
  document.getElementById('hl-vB').textContent='???';
  document.getElementById('hl-vB').className='hl-value hidden';
  document.getElementById('hl-qlabel').textContent=T.whichHigher+' '+m.label.toLowerCase()+'?';
}

function hlAnswer(guess){
  const {cA,cB,mKey}=hlS;
  const m=T.metrics[mKey];
  const vA=cA[mKey],vB=cB[mKey];
  const equal=vA===vB;
  const bHigher=vB>vA;
  const ok=equal||(guess==='higher'?bHigher:!bHigher);
  hlS.total_q++;
  document.getElementById('btn-up').disabled=true;
  document.getElementById('btn-down').disabled=true;
  const vbEl=document.getElementById('hl-vB');
  vbEl.textContent=m.fmt(vB); vbEl.className='hl-value pop';
  const fb=document.getElementById('hl-fb');
  if(ok){
    hlS.streak++; hlS.correct++; hlS.bestStreak=Math.max(hlS.bestStreak,hlS.streak);
    try{GeoAudio.playSFX(hlS.streak>1?'streak':'correct');}catch(e){}
    const pts=1; hlS.score+=pts;
    var _csEl=document.getElementById('hl-cur-score');if(_csEl)_csEl.textContent=hlS.score;
    // Tiered XP: ×1 base, ×1.5 at 5, ×2 at 10, ×3 at 20
    const xpBase=hlS.streak>=20?18:hlS.streak>=10?12:hlS.streak>=5?9:6;
    try{awardXP(xpBase);}catch(e){}
    document.getElementById('hl-cB').className='hl-card correct';
    // Milestone check
    if([5,10,20].includes(hlS.streak)){
      const mult=hlS.streak>=20?'×3 XP!':hlS.streak>=10?'×2 XP!':'×1.5 XP!';
      showToast('🔥 Streak '+hlS.streak+'! '+mult);
      const arena=document.getElementById('hl-arena');
      if(arena){arena.classList.add('streak-milestone');setTimeout(()=>arena.classList.remove('streak-milestone'),1200);}
    }
    // Personal best — show once the moment the record is broken
    const _prevBest=hlGetHighscore();
    if(hlS.streak>_prevBest&&hlS.streak>0&&!hlS._newRecordShown){
      hlS._newRecordShown=true;
      setTimeout(()=>{
        showToast('🏆 Neuer Rekord! '+hlS.streak);
        try{startConfetti('#c8f135');}catch(e){}
        setTimeout(()=>{try{stopConfetti();}catch(e){}},2200);
      },500);
    }
    fb.className='hl-feedback show ok';
    document.getElementById('hl-fb-main').textContent=(hlS.streak>=3?T.streak_msg(hlS.streak)+' ':T.correct_msg+' ')+T.pts(pts);
    document.getElementById('hl-fb-det').textContent=`${countryName(cB.n)}: ${m.fmt(vB)} vs ${countryName(cA.n)}: ${m.fmt(vA)}`;
    hlHUD();
    /* B becomes A for next round, keep metric */
    hlS.prevB=cB;
    hlS.prevMKey=mKey;
    setTimeout(()=>hlRound(),1400);
  } else {
    document.getElementById('hl-cB').className='hl-card wrong shake';
    fb.className='hl-feedback show bad';
    try{GeoAudio.playSFX('wrong');}catch(e){}
    document.getElementById('hl-fb-main').textContent=T.wrong_msg;
    document.getElementById('hl-fb-det').textContent=`${countryName(cB.n)}: ${m.fmt(vB)} · ${countryName(cA.n)}: ${m.fmt(vA)}`;
    hlHUD();
    hlS.prevB=null; hlS.prevMKey=null;
    hlSaveHighscore(hlS.score);
    try{achTrackMax('hlBestStreak',hlS.bestStreak);}catch(e){}
    setTimeout(()=>hlShowOver(),1400);
  }
}

function hlShowOver(){
  const hs=hlGetHighscore();
  const isNew=hlS.score>=hs;
  // Build custom over screen for HL
  const state={
    score:hlS.score,
    correct:hlS.correct,
    total_q:hlS.total_q,
    bestStreak:hlS.bestStreak,
    total:hlS.total_q,
    lastMode:'hl',
    hlHighscore:hs,
    hlIsNewHS:isNew
  };
  showOver(state);
}

function hlHUD(){
  const hs=hlGetHighscore();
  document.getElementById('hl-highscore').textContent=Math.max(hs,hlS.score);
  document.getElementById('hl-hs-pill').style.opacity=hlS.score>hs?'1':'0.5';
  var csEl=document.getElementById('hl-cur-score');if(csEl)csEl.textContent=hlS.score;
  // Streak multiplier pill
  const mp=document.getElementById('hl-mult-pill');
  if(mp){
    if(hlS.streak>=20){mp.style.display='';mp.textContent='×3 XP';mp.style.color='var(--rose)';}
    else if(hlS.streak>=10){mp.style.display='';mp.textContent='×2 XP';mp.style.color='var(--amber)';}
    else if(hlS.streak>=5){mp.style.display='';mp.textContent='×1.5 XP';mp.style.color='var(--lime)';}
    else{mp.style.display='none';}
  }
}

/* Keyboard shortcuts for HL mode */
document.addEventListener('keydown',function(e){
  if(!document.getElementById('shl')||!document.getElementById('shl').classList.contains('active'))return;
  const up=document.getElementById('btn-up'),dn=document.getElementById('btn-down'),nb=document.getElementById('hl-next');
  if(e.key==='ArrowUp'&&up&&!up.disabled){e.preventDefault();hlAnswer('higher');}
  else if(e.key==='ArrowDown'&&dn&&!dn.disabled){e.preventDefault();hlAnswer('lower');}
  else if((e.key===' '||e.key==='Enter')&&nb&&nb.classList.contains('show')){e.preventDefault();nb.click();}
});

/* ══════════════════════════════════════════
   BUILD QUESTION (shared by daily rounds + challenge)
══════════════════════════════════════════ */
function buildQuestion(metricKeys, randFn){
  const R=randFn||Math.random;
  const mKey=metricKeys[Math.floor(R()*metricKeys.length)];
  const m=T.metrics[mKey];
  const type=R()<0.5?'hl':'mc';
  if(type==='hl'){
    const pool=shuffle(COUNTRIES); const cA=pool[0],cB=pool[1];
    const vA=cA[mKey],vB=cB[mKey];
    const correct=vA>=vB?0:1;
    return {typeLabel:T.badgeHL||'Higher/Lower',
      question:`${T.whichHigher} <strong>${m.label.toLowerCase()}</strong>?`,
      options:[{text:flagImg(cA.f,'1.2rem')+' '+countryName(cA.n)},{text:flagImg(cB.f,'1.2rem')+' '+countryName(cB.n)}],
      correct,explanation:`${countryName(cA.n)}: ${m.fmt(vA)} · ${countryName(cB.n)}: ${m.fmt(vB)}`};
  } else {
    const country=COUNTRIES[Math.floor(R()*COUNTRIES.length)];
    const realVal=country[mKey];
    const others=shuffle(COUNTRIES.filter(c=>c.n!==country.n)).slice(0,3).map(c=>c[mKey]);
    const allVals=[realVal,...others];
    for(let j=allVals.length-1;j>0;j--){const k=Math.floor(R()*(j+1));[allVals[j],allVals[k]]=[allVals[k],allVals[j]];}
    const correct=allVals.indexOf(realVal);
    return {typeLabel:'?',
      question:`${T.whatsIs} ${flagImg(country.f,'1.2rem')} <strong>${sanitize(country.n)}</strong>'s <strong>${sanitize(m.label.toLowerCase())}</strong>?`,
      options:allVals.map(v=>({text:m.fmt(v)})),
      correct,explanation:`${sanitize(country.n)}: ${m.fmt(realVal)}`};
  }
}

function renderQuestion(qTextId, qTypeId, qOptsId, qExpId, q, onAnswer){
  document.getElementById(qTextId).innerHTML=q.question;
  document.getElementById(qTypeId).textContent=q.typeLabel;
  document.getElementById(qExpId).className='q-explain';
  const opts=document.getElementById(qOptsId); opts.innerHTML='';
  ['A','B','C','D'].slice(0,q.options.length).forEach((l,i)=>{
    const btn=document.createElement('button');
    btn.className='q-opt';
    btn.innerHTML=`<div class="opt-l">${l}</div>${q.options[i].text}`;
    btn.onclick=()=>onAnswer(i,btn,q,opts);
    opts.appendChild(btn);
  });
}

function revealAnswer(idx, btn, q, optsEl, onDone){
  const allBtns=optsEl.querySelectorAll('.q-opt');
  allBtns.forEach(b=>b.disabled=true);
  if(idx===q.correct) btn.classList.add('correct');
  else { btn.classList.add('wrong'); allBtns[q.correct].classList.add('correct'); }
  onDone(idx===q.correct);
}



/* ══════════════════════════════════════════
   DAILY CHALLENGE — seeded, same for everyone
══════════════════════════════════════════ */
function getDailySeed(){
  const d=new Date();
  return d.getUTCFullYear()*10000+(d.getUTCMonth()+1)*100+d.getUTCDate();
}
function seededRand(seed){
  return function(){
    seed|=0; seed=seed+0x6D2B79F5|0;
    let t=Math.imul(seed^seed>>>15,1|seed);
    t=t+Math.imul(t^t>>>7,61|t)^t;
    return ((t^t>>>14)>>>0)/4294967296;
  };
}

let chS={}, chAnswers=[];

function launchChallenge(){
  const saved=loadDailyProgress();
  if(saved&&saved.done){
    chAnswers=saved.answers||[];
    openShareModal(saved.score,saved.correct||0,chAnswers);
    chStartCountdown();
    return;
  }
  // Pick today's country from GTC_DATA using seeded random
  const seed=getDailySeed();
  const R=seededRand(seed);
  const idx=Math.floor(R()*GTC_DATA.length);
  const country=GTC_DATA[idx];

  chS={country,cluesShown:0,attempts:0,done:false,score:0,correct:0,lastMode:'challenge'};
  chAnswers=[];

  const d=new Date();
  const langLocale2={en:'en-US',de:'de-DE',fr:'fr-FR',es:'es-ES'}[curLang]||'en-US';
  document.getElementById('ch-date').textContent=d.toLocaleDateString(langLocale2,{weekday:'long',month:'long',day:'numeric'});
  document.getElementById('ch-xp').textContent='0';
  // XP banner removed
  const guessLbl={en:'YOUR GUESS',de:'DEIN TIPP',fr:'TON ESSAI',es:'TU RESPUESTA'}[curLang]||'YOUR GUESS';
  const gl=document.getElementById('ch-guess-lbl'); if(gl) gl.textContent=guessLbl;
  const guessBtn={en:'Guess →',de:'Raten →',fr:'Deviner →',es:'Adivinar →'}[curLang]||'Guess →';
  const gb=document.getElementById('ch-guess-btn'); if(gb) gb.textContent=guessBtn;
  const placeholder={en:'Type a country name...',de:'Ländernamen eingeben...',fr:'Tapez un nom de pays...',es:'Escribe un nombre de país...'}[curLang]||'Type a country name...';
  const inp=document.getElementById('ch-inp'); if(inp){inp.placeholder=placeholder;inp.value='';inp.disabled=false;}

  document.getElementById('ch-clues').innerHTML='';
  document.getElementById('ch-feedback').textContent='';
  document.getElementById('ch-result').style.display='none';
  document.getElementById('ch-share-btn').style.display='none';
  document.getElementById('ch-guess-wrap').style.display='';
  chUpdateRing(0);

  // Show first clue
  chRevealClue();
  showScreen('challenge');
  setTimeout(()=>{if(inp)inp.focus();},200);
}

function chRevealClue(){
  if(chS.cluesShown>=8) return;
  const factsObj=chS.country.facts;
  const facts=(factsObj[curLang]||factsObj.en);
  const fact=facts[chS.cluesShown];
  if(!fact) return;

  const clueLabel={en:'CLUE',de:'HINWEIS',fr:'INDICE',es:'PISTA'}[curLang]||'CLUE';
  const card=document.createElement('div');
  card.style.cssText='background:var(--ink2);border:1px solid var(--border);border-radius:var(--r-md);padding:12px 14px;display:flex;gap:11px;align-items:flex-start;animation:fadeUp .3s ease';
  card.innerHTML=`<span style="font-family:var(--font-m);font-size:.58rem;letter-spacing:.12em;color:var(--violet);flex-shrink:0;margin-top:2px">${clueLabel} ${chS.cluesShown+1}</span><span style="font-size:.88rem;line-height:1.5">${fact}</span>`;
  document.getElementById('ch-clues').appendChild(card);
  chS.cluesShown++;
  chUpdateRing(chS.cluesShown);
}

function chGuess(){
  if(chS.done) return;
  const inp=document.getElementById('ch-inp');
  const val=inp.value.trim();
  if(!val) return;
  const sugEl=document.getElementById('ch-suggestions');if(sugEl)sugEl.classList.remove('show');

  const ok=gtcIsMatch(val,chS.country);
  if(ok){
    // Correct!
    chS.done=true;
    chS.correct=1;
    const pts=Math.max(10,100-(chS.cluesShown-1)*10);
    chS.score=pts;
    try{GeoAudio.playSFX('correct');}catch(e){}
    try{awardXP(pts+30);}catch(e){} // pts + completion bonus
    // Build emoji grid: 🟩 for unused clues, 🟨 for used clues before solve, ⬜ for remaining
    chAnswers=[];
    for(let i=0;i<8;i++){
      if(i<chS.cluesShown) chAnswers.push('🟨');
      else chAnswers.push('🟩');
    }
    chRevealResult(true,pts);
  } else {
    const isKnown=gtcIsRealCountry(val);
    inp.value='';
    if(isKnown){
      chS.attempts++;
      inp.style.borderColor='var(--rose)';
      setTimeout(()=>inp.style.borderColor='var(--border)',800);

      // Hot/cold feedback
      const guessedEntry=ALL_WORLD_COUNTRIES.find(c=>{
        const dn=(c.names&&c.names[curLang])?c.names[curLang]:c.n;
        return normalizeStr(dn)===normalizeStr(val)||normalizeStr(c.n)===normalizeStr(val);
      });
      const guessedCont=guessedEntry?gtcGetContinent(guessedEntry.n):null;
      const targetCont=gtcGetContinent(chS.country.n);
      const warmMsg=guessedCont&&targetCont&&guessedCont===targetCont
        ?{en:' 🌡️ Warm — same region!',de:' 🌡️ Warm — gleiche Region!',fr:' 🌡️ Chaud — même région!',es:' 🌡️ ¡Cálido — misma región!'}[curLang]||' 🌡️ Warm!'
        :'';
      const rem=8-chS.attempts;
      const attWord={en:rem===1?'attempt':'attempts',de:rem===1?'Versuch':'Versuche',fr:rem===1?'essai':'essais',es:rem===1?'intento':'intentos'}[curLang]||'attempts';
      const fbPrefix={en:`❌ No.`,de:`❌ Nein.`,fr:`❌ Non.`,es:`❌ No.`}[curLang];
      const fbSuffix={en:`${rem} ${attWord} left.`,de:`Noch ${rem} ${attWord}.`,fr:`${rem} ${attWord} restant${rem===1?'':'s'}.`,es:`${rem} ${attWord} restante${rem===1?'':'s'}.`}[curLang];
      document.getElementById('ch-feedback').textContent=`${fbPrefix}${warmMsg} ${fbSuffix}`;

      if(chS.attempts>=8){
        // Failed
        chS.done=true;
        chS.correct=0;
        chS.score=0;
        chAnswers=Array(8).fill('🟥');
        try{GeoAudio.playSFX('defeat');}catch(e){}
        chRevealResult(false,0);
      } else if(chS.cluesShown<8){
        chRevealClue();
      }
    } else {
      const noCountryMsg={en:'❓ Not a country. Try again!',de:'❓ Kein Land. Versuch\'s nochmal!',fr:'❓ Pas un pays. Réessayez!',es:'❓ No es un país. ¡Inténtalo de nuevo!'}[curLang];
      document.getElementById('ch-feedback').textContent=noCountryMsg;
      inp.style.borderColor='var(--rose)';
      setTimeout(()=>inp.style.borderColor='var(--border)',800);
    }
  }
}

function chRevealResult(won,pts){
  const c=chS.country;
  document.getElementById('ch-inp').disabled=true;
  document.getElementById('ch-guess-wrap').style.display='none';
  const res=document.getElementById('ch-result');
  res.style.display='block';
  res.style.borderColor=won?'rgba(168,85,247,.4)':'rgba(255,61,107,.2)';
  document.getElementById('ch-rf').textContent=c.f;
  const displayName=(c.names&&c.names[curLang])?c.names[curLang]:c.n;
  document.getElementById('ch-rn').textContent=displayName;
  const clueWord={en:'clue',de:'Hinweis',fr:'indice',es:'pista'}[curLang]||'clue';
  const cluesWord={en:'clues',de:'Hinweisen',fr:'indices',es:'pistas'}[curLang]||'clues';
  if(won){
    const msg={en:`Guessed after ${chS.cluesShown} ${chS.cluesShown===1?clueWord:cluesWord}! 🎉`,de:`Erraten nach ${chS.cluesShown} ${chS.cluesShown===1?clueWord:cluesWord}! 🎉`,fr:`Deviné après ${chS.cluesShown} ${chS.cluesShown===1?clueWord:cluesWord} ! 🎉`,es:`¡Adivinado tras ${chS.cluesShown} ${chS.cluesShown===1?clueWord:cluesWord}! 🎉`}[curLang];
    document.getElementById('ch-rs').textContent=msg;
    document.getElementById('ch-rp').textContent='+'+pts+' XP';
    document.getElementById('ch-rp').style.display='';
  } else {
    const msg={en:`The answer was ${displayName}`,de:`Die Antwort war ${displayName}`,fr:`La réponse était ${displayName}`,es:`La respuesta era ${displayName}`}[curLang];
    document.getElementById('ch-rs').textContent=msg;
    document.getElementById('ch-rp').style.display='none';
  }
  // Show all remaining clues
  while(chS.cluesShown<8) chRevealClue();
  document.getElementById('ch-xp').textContent=chS.score;

  // Save & streak
  saveDailyProgress({done:true,score:chS.score,correct:chS.correct,answers:chAnswers,cluesUsed:chS.cluesShown});
  updateStreak();
  try{achTrack('dailyDone',1);if(won&&chS.cluesShown===1)achTrack('dailyPerfect1Clue',1);}catch(e){}
  try{flushXP();}catch(e){}

  document.getElementById('ch-share-btn').style.display='';
  document.getElementById('ch-share-btn').className='next-btn show';

  // Show countdown to next daily challenge
  chStartCountdown();
}

function chStartCountdown(){
  var wrap=document.getElementById('ch-countdown');
  if(!wrap){
    wrap=document.createElement('div');
    wrap.id='ch-countdown';
    wrap.style.cssText='font-family:var(--font-m);font-size:.72rem;color:var(--muted2);text-align:center;margin-top:8px;letter-spacing:.06em';
    var result=document.getElementById('ch-result');
    if(result) result.parentNode.insertBefore(wrap,result.nextSibling);
  }
  function tick(){
    var now=new Date();
    var tomorrow=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()+1));
    var diff=tomorrow-now;
    if(diff<=0){wrap.textContent='';return;}
    var h=Math.floor(diff/3600000);
    var m=Math.floor((diff%3600000)/60000);
    var s=Math.floor((diff%60000)/1000);
    var label={en:'Next challenge in',de:'Nächste Challenge in',fr:'Prochain défi dans',es:'Próximo desafío en'}[curLang]||'Next challenge in';
    wrap.textContent=label+' '+String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  }
  tick();
  if(window._chCountdownIv) clearInterval(window._chCountdownIv);
  window._chCountdownIv=setInterval(tick,1000);
}

function chShowShare(){
  openShareModal(chS.score,chS.correct,chAnswers);
}

function chAutoComplete(){
  const inp=document.getElementById('ch-inp');
  const list=document.getElementById('ch-suggestions');
  if(!inp||!list)return;
  const val=inp.value.toLowerCase().trim();
  if(val.length<2||inp.disabled){list.classList.remove('show');return;}
  const matches=ALL_WORLD_COUNTRIES.filter(function(c){
    const translated=(c.names&&c.names[curLang])?c.names[curLang]:c.n;
    const low=translated.toLowerCase();
    const enLow=c.n.toLowerCase();
    return low.startsWith(val)||enLow.startsWith(val)||low.includes(val);
  }).slice(0,6);
  if(matches.length===0){list.classList.remove('show');return;}
  list.innerHTML='';
  matches.forEach(function(c){
    const displayName=(c.names&&c.names[curLang])?c.names[curLang]:c.n;
    const item=document.createElement('div');
    item.className='bdr-suggest-item';
    item.textContent=displayName;
    item.onclick=function(){inp.value=displayName;list.classList.remove('show');chGuess();};
    list.appendChild(item);
  });
  list.classList.add('show');
}

function chUpdateRing(n){
  const circ=188.5;
  const el=document.getElementById('ch-ring'); if(el) el.style.strokeDashoffset=circ-(circ*n/8);
  const en=document.getElementById('ch-ring-n'); if(en) en.textContent=n;
}

/* ══════════════════════════════════════════
   LOCALSTORAGE
══════════════════════════════════════════ */
function getTodayKey(){ return 'geovs_daily_'+getDailySeed(); }
function loadDailyProgress(){ try{return JSON.parse(localStorage.getItem(getTodayKey()))||null;}catch(e){return null;} }
function saveDailyProgress(d){ try{localStorage.setItem(getTodayKey(),JSON.stringify(d));}catch(e){} }
function loadStreak(){ try{return JSON.parse(localStorage.getItem('geovs_streak'))||{count:0,last:0};}catch(e){return{count:0,last:0};} }
function saveStreak(s){ try{localStorage.setItem('geovs_streak',JSON.stringify(s));}catch(e){} }
function updateStreak(){
  const today=getDailySeed();
  const s=loadStreak();
  if(s.last===today) return s;
  const d=new Date(); d.setUTCDate(d.getUTCDate()-1);
  const yest=d.getUTCFullYear()*10000+(d.getUTCMonth()+1)*100+d.getUTCDate();
  s.count=s.last===yest?s.count+1:1;
  s.last=today; saveStreak(s); return s;
}

/* ══════════════════════════════════════════
   SHARE
══════════════════════════════════════════ */

let _shareText='';
function openShareModal(score, correct, answers){
  const langLocale={en:'en-US',de:'de-DE',fr:'fr-FR',es:'es-ES'}[curLang]||'en-US';
  const dateStr=new Date().toLocaleDateString(langLocale,{month:'short',day:'numeric',year:'numeric'});
  const emojis=(answers||[]).join('');
  const streak=loadStreak();
  const cluesUsed=(answers||[]).filter(a=>a==='🟨').length;
  const solved=correct>0;
  const summaryLine=solved
    ?{en:`Guessed in ${cluesUsed}/8 clues! · ${score} XP`,de:`Erraten in ${cluesUsed}/8 Hinweisen! · ${score} XP`,fr:`Deviné en ${cluesUsed}/8 indices ! · ${score} XP`,es:`¡Adivinado en ${cluesUsed}/8 pistas! · ${score} XP`}[curLang]||`Guessed in ${cluesUsed}/8 clues!`
    :{en:'Could not guess today\'s country',de:'Heutiges Land nicht erraten',fr:'Pas deviné le pays du jour',es:'No adiviné el país de hoy'}[curLang]||'Could not guess today\'s country';
  _shareText=['🌍 GeoVs Daily — '+dateStr,summaryLine,emojis,streak.count>1?`🔥 ${streak.count} day streak!`:'','Play free: geovs.netlify.app'].filter(Boolean).join('\n');
  document.getElementById('share-grid').textContent=emojis||'⬜⬜⬜⬜⬜⬜⬜⬜';
  document.getElementById('share-score-txt').textContent=solved?score+' XP':'0 XP';
  document.getElementById('share-sub-txt').textContent=`${summaryLine}${streak.count>1?' · 🔥 '+streak.count+' day streak':''}`;
  document.getElementById('share-overlay').classList.add('open');
}
function openShareFromOver(){
  const score=parseInt(document.getElementById('over-score').textContent)||0;
  const correct=parseInt(document.getElementById('os-correct').textContent)||0;
  openShareModal(score,correct,[]);
}
function closeShare(e){
  if(!e||e.target===document.getElementById('share-overlay')||e.type==='click'&&e.target.tagName==='BUTTON'&&!e.target.classList.contains('sh-btn'))
    document.getElementById('share-overlay').classList.remove('open');
}
function copyShare(){ navigator.clipboard.writeText(_shareText).then(()=>showToast(T.copied||'Copied ✓')).catch(()=>showToast(T.copied||'Copied!')); }
function tweetShare(){ window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(_shareText),'_blank'); }
function waShare(){ window.open('https://wa.me/?text='+encodeURIComponent(_shareText),'_blank'); }

/* ══════════════════════════════════════════
   GAME OVER
══════════════════════════════════════════ */
let _lastState=null;
function showOver(state){
  try{GeoAudio.playSFX('victory');}catch(e){}
  _lastState=state; try{flushXP();}catch(e){} try{incGames();achTrackLang();}catch(e){}
  const acc=state.total_q>0?Math.round(state.correct/state.total_q*100):0;
  document.getElementById('over-score').textContent=state.score;
  document.getElementById('os-correct').textContent=state.correct;
  document.getElementById('os-streak').textContent=state.bestStreak||state.correct;
  document.getElementById('os-acc').textContent=acc+'%';
  // HL highscore block
  const hlHsEl=document.getElementById('hl-over-hs');
  if(state.lastMode==='hl'){
    hlHsEl.style.display='block';
    const hs=state.hlHighscore||hlGetHighscore();
    document.getElementById('hl-over-cur').textContent=state.score;
    document.getElementById('hl-over-best').textContent=hs;
    const newHSEl=document.getElementById('hl-over-newhs');
    newHSEl.style.display=state.hlIsNewHS&&state.score>0?'flex':'none';
    if(state.hlIsNewHS&&state.score>0) newHSEl.classList.add('hl-newhs-animate'); else newHSEl.classList.remove('hl-newhs-animate');
    const curLbl={en:'THIS RUN',de:'DIESE RUNDE',fr:'CE RUN',es:'ESTA RONDA'}[curLang]||'THIS RUN';
    const bestLbl={en:'BEST',de:'REKORD',fr:'RECORD',es:'RÉCORD'}[curLang]||'BEST';
    const newHSMsg={en:'NEW HIGHSCORE!',de:'NEUER REKORD!',fr:'NOUVEAU RECORD!',es:'¡NUEVO RÉCORD!'}[curLang]||'NEW HIGHSCORE!';
    document.getElementById('hl-over-cur-lbl').textContent=curLbl;
    document.getElementById('hl-over-best-lbl').textContent=bestLbl;
    var nhsText=document.getElementById('hl-newhs-text'); if(nhsText) nhsText.textContent=newHSMsg;
    const s=state.score;
    const hlMsgs={
      en:s>=30?['🌍','Unreal. You might actually know every country on Earth.']:s>=20?['🔥','World-class streak. That takes serious knowledge.']:s>=15?['💪','Very strong. Most people don\'t get past 10.']:s>=10?['👍','Decent run. You clearly know a few things.']:s>=7?['😐','Not terrible. But not great either.']:s>=5?['🤷','Average at best. The world is bigger than you think.']:s>=3?['😬','Rough. You\'re guessing more than knowing.']:s>=1?['💀','Ouch. That was basically a coin flip.']:['🪦','Zero. Did you even try?'],
      de:s>=30?['🌍','Unwirklich. Du kennst wohl wirklich jedes Land.']:s>=20?['🔥','Weltklasse-Serie. Dafür braucht man echtes Wissen.']:s>=15?['💪','Sehr stark. Die meisten scheitern vor 10.']:s>=10?['👍','Ordentlich. Du weißt offenbar einiges.']:s>=7?['😐','Nicht schlecht. Aber auch nicht gut.']:s>=5?['🤷','Bestenfalls Durchschnitt. Die Welt ist größer als du denkst.']:s>=3?['😬','Holprig. Mehr geraten als gewusst.']:s>=1?['💀','Autsch. Das war im Grunde Münzwurf.']:['🪦','Null. Hast du es überhaupt versucht?'],
      fr:s>=30?['🌍','Irréel. Vous connaissez peut-être chaque pays.']:s>=20?['🔥','Série de classe mondiale. Ça demande un vrai savoir.']:s>=15?['💪','Très solide. La plupart échouent avant 10.']:s>=10?['👍','Correct. Vous savez quelques trucs.']:s>=7?['😐','Pas terrible. Mais pas brillant non plus.']:s>=5?['🤷','Moyen au mieux. Le monde est plus grand que vous ne pensez.']:s>=3?['😬','Laborieux. Plus de hasard que de savoir.']:s>=1?['💀','Aïe. C\'était quasiment du pile ou face.']:['🪦','Zéro. Vous avez vraiment essayé ?'],
      es:s>=30?['🌍','Irreal. Quizás conoces todos los países del planeta.']:s>=20?['🔥','Racha de clase mundial. Eso requiere conocimiento real.']:s>=15?['💪','Muy fuerte. La mayoría no pasa de 10.']:s>=10?['👍','Decente. Claramente sabes algo.']:s>=7?['😐','No está mal. Pero tampoco está bien.']:s>=5?['🤷','Promedio como mucho. El mundo es más grande de lo que crees.']:s>=3?['😬','Flojo. Más adivinanza que conocimiento.']:s>=1?['💀','Auch. Eso fue básicamente tirar una moneda.']:['🪦','¿Cero? ¿Lo intentaste siquiera?'],
    };
    const [hlEmoji,hlMsg]=(hlMsgs[curLang]||hlMsgs.en);
    hlS._overEmoji=hlEmoji; hlS._overTitle=hlMsg;
  } else {
    hlHsEl.style.display='none';
  }
  /* Quiz-mode score block (cap, flg, gtc, border) */
  const quizBlock=document.getElementById('quiz-over-block');
  if(state.lastMode==='cap'||state.lastMode==='flg'||state.lastMode==='gtc'||state.lastMode==='border'){
    quizBlock.style.display='block';
    document.getElementById('quiz-over-score').textContent=state.correct+'/'+state.total_q;
    const correctLbl={en:'CORRECT',de:'RICHTIG',fr:'CORRECT',es:'CORRECTO'}[curLang]||'CORRECT';
    document.getElementById('quiz-over-lbl').textContent=correctLbl;
    const pctQ=state.total_q>0?Math.round(state.correct/state.total_q*100):0;
    const quizMsgs={
      en:pctQ===100?['🏆','Perfect score. Nothing more to say.']:pctQ>=90?['🔥','Near-flawless. You clearly studied.']:pctQ>=80?['💪','Solid knowledge. A few gaps, but strong overall.']:pctQ>=65?['👍','Above average. Room to improve though.']:pctQ>=50?['😐','Half right, half wrong. Mediocre.']:pctQ>=35?['😬','Below average. You need to brush up.']:pctQ>=20?['💀','Rough. Most of those were wrong.']:['🪦','That was painful. Maybe start with an atlas.'],
      de:pctQ===100?['🏆','Perfekt. Dem ist nichts hinzuzufügen.']:pctQ>=90?['🔥','Fast fehlerfrei. Du hast gelernt.']:pctQ>=80?['💪','Solides Wissen. Ein paar Lücken, aber stark.']:pctQ>=65?['👍','Überdurchschnittlich. Aber Luft nach oben.']:pctQ>=50?['😐','Halb richtig, halb falsch. Mittelmäßig.']:pctQ>=35?['😬','Unterdurchschnittlich. Nachbessern nötig.']:pctQ>=20?['💀','Holprig. Das meiste war falsch.']:['🪦','Das war schmerzhaft. Vielleicht erstmal einen Atlas aufschlagen.'],
      fr:pctQ===100?['🏆','Score parfait. Rien à ajouter.']:pctQ>=90?['🔥','Quasi sans faute. Vous avez révisé.']:pctQ>=80?['💪','Connaissances solides. Quelques lacunes, mais fort.']:pctQ>=65?['👍','Au-dessus de la moyenne. Mais peut mieux faire.']:pctQ>=50?['😐','Moitié juste, moitié faux. Médiocre.']:pctQ>=35?['😬','En dessous de la moyenne. À réviser.']:pctQ>=20?['💀','Laborieux. La plupart étaient faux.']:['🪦','Douloureux. Peut-être commencer par un atlas.'],
      es:pctQ===100?['🏆','Puntuación perfecta. Nada más que decir.']:pctQ>=90?['🔥','Casi impecable. Claramente estudiaste.']:pctQ>=80?['💪','Buen conocimiento. Algunos huecos, pero fuerte.']:pctQ>=65?['👍','Por encima del promedio. Pero hay margen.']:pctQ>=50?['😐','Mitad bien, mitad mal. Mediocre.']:pctQ>=35?['😬','Por debajo del promedio. Hay que repasar.']:pctQ>=20?['💀','Flojo. La mayoría estaban mal.']:['🪦','Eso fue doloroso. Quizás empieza con un atlas.'],
    };
    const [qEmoji,qMsg]=(quizMsgs[curLang]||quizMsgs.en);
    state._overEmoji=qEmoji; state._overTitle=qMsg;
  } else {
    quizBlock.style.display='none';
  }
  const isQuizMode=state.lastMode==='cap'||state.lastMode==='flg'||state.lastMode==='gtc'||state.lastMode==='border';
  let overRatio;
  if(isQuizMode&&state.total_q>0){
    overRatio=state.correct/state.total_q;
  } else {
    const pts=state.score;
    const max=(state.total||8)*20;
    overRatio=pts/max;
  }
  if(state.lastMode==='hl'){
    document.getElementById('over-emoji').textContent=hlS._overEmoji||'🌍';
    document.getElementById('over-title').textContent=hlS._overTitle||'';
    document.getElementById('over-title').className='over-title sentence';
  } else if(isQuizMode&&state._overEmoji){
    document.getElementById('over-emoji').textContent=state._overEmoji;
    document.getElementById('over-title').textContent=state._overTitle||'';
    document.getElementById('over-title').className='over-title sentence';
  } else {
    const [[,emoji,title,msg]]=T.msgs.filter(([t])=>overRatio*100>=t).slice(0,1).concat([T.msgs[T.msgs.length-1]]);
    document.getElementById('over-emoji').textContent=emoji;
    document.getElementById('over-title').textContent=title;
    document.getElementById('over-title').className='over-title';
    document.getElementById('over-msg').textContent=msg;
  }
  document.getElementById('btn-replay').textContent=T.playAgain||T.next||'Play Again';
  var homeBtn=document.getElementById('btn-home'); if(homeBtn) homeBtn.textContent=T.homeLbl||'← Home';
  var shareBtn=document.getElementById('btn-share-over'); if(shareBtn) shareBtn.style.display=state.lastMode==='challenge'?'':'none';
  // GTC avg clues efficiency
  var gtcEff=document.getElementById('over-gtc-eff');
  if(gtcEff){
    if(state.lastMode==='gtc'&&state.gtcAvgClues){
      gtcEff.style.display='';
      var clueWord={en:'avg clues',de:'∅ Hinweise',fr:'indices moy.',es:'pistas prom.'}[curLang]||'avg clues';
      document.getElementById('over-gtc-eff-val').textContent=state.gtcAvgClues;
      document.getElementById('over-gtc-eff-lbl').textContent=clueWord;
    } else { gtcEff.style.display='none'; }
  }
  // Border Run region % + record
  var bdrExtra=document.getElementById('over-bdr-extra');
  if(bdrExtra){
    if(state.lastMode==='border'){
      bdrExtra.style.display='';
      var pctEl=document.getElementById('over-bdr-pct');
      var recEl=document.getElementById('over-bdr-rec');
      if(pctEl) pctEl.textContent=state.bdrPct+'%';
      if(recEl){
        if(state.bdrIsNewRec){
          recEl.textContent={en:'🏆 New Region Record!',de:'🏆 Neuer Regionsrekord!',fr:'🏆 Nouveau record de région!',es:'🏆 ¡Nuevo récord regional!'}[curLang]||'🏆 New Record!';
          recEl.style.color='var(--lime)';
        } else {
          var bestLbl={en:'Best',de:'Rekord',fr:'Record',es:'Récord'}[curLang]||'Best';
          recEl.textContent=bestLbl+': '+state.bdrPrevRec;
          recEl.style.color='var(--muted2)';
        }
      }
    } else { bdrExtra.style.display='none'; }
  }
  // XP progress to next level
  try{
    var xpWrap=document.getElementById('over-xp-prog');
    if(xpWrap){
      var p2=pGet(),lvlD=getLvlData(p2.xp);
      var toNext=lvlD.next.xp-p2.xp;
      var toNextEl=document.getElementById('over-xp-to-next');
      if(toNextEl) toNextEl.textContent=toNext+' XP → Level '+lvlD.next.lvl;
      var fillEl=document.getElementById('over-xp-bar-fill');
      if(fillEl){ fillEl.style.transition='none'; fillEl.style.width='0%';
        setTimeout(()=>{ fillEl.style.transition='width 1s cubic-bezier(.22,1,.36,1)'; fillEl.style.width=lvlD.pct+'%'; },300); }
    }
  }catch(ex){}
  // HL GIF reaction based on score
  var gifEl=document.getElementById('over-gif');
  var gifImg=document.getElementById('over-gif-img');
  var overCard=document.querySelector('.over-card');
  if(overCard) overCard.classList.remove('hl-bounce');
  if(gifEl&&gifImg){
    if(state.lastMode==='hl'){
      var hlScore=state.score;
      var gifSrc='';
      if(hlScore>=0&&hlScore<=3){
        gifSrc=['gifs/everything-fine.gif','gifs/ramassis.gif'][Math.floor(Math.random()*2)];
      } else if(hlScore<=5){
        gifSrc='gifs/bugs-bunny.gif';
      } else if(hlScore<=7){
        gifSrc='gifs/south-park.gif';
        if(overCard) overCard.classList.add('hl-bounce');
        hl67Escalation();
      } else if(hlScore<=11){
        gifSrc='gifs/latina-dancing.gif';
      } else if(hlScore<=15){
        gifSrc='gifs/clapping.gif';
      } else {
        gifSrc='gifs/man-body.gif';
      }
      gifImg.src=gifSrc;
      gifEl.style.display='block';
      document.getElementById('over-emoji').style.display='none';
    } else {
      gifEl.style.display='none';
      document.getElementById('over-emoji').style.display='';
    }
  }
  showScreen('over');
  const _pct=getPercentile(state.score,state.lastMode||'daily');
  const _pb=document.getElementById('pct-badge');
  if(_pb){
    _pb.textContent=getPctLabel(_pct);
    _pb.style.borderColor=_pct<=5?'rgba(200,241,53,.5)':_pct<=20?'rgba(200,241,53,.25)':_pct<=50?'rgba(255,184,48,.3)':'rgba(255,255,255,.1)';
    _pb.style.background=_pct<=5?'rgba(200,241,53,.12)':_pct<=20?'rgba(200,241,53,.07)':_pct<=50?'rgba(255,184,48,.07)':'rgba(255,255,255,.04)';
  }
  setTimeout(()=>{
    const _bar=document.getElementById('pct-bar');
    if(_bar){
      _bar.style.width=Math.max(4,Math.min(98,100-_pct+1))+'%';
      _bar.style.background=_pct<=5?'linear-gradient(90deg,var(--lime),var(--teal))':_pct<=20?'linear-gradient(90deg,var(--lime),var(--amber))':_pct<=50?'var(--amber)':'var(--rose)';
    }
  },400);
  setTimeout(()=>{try{checkAchievements();}catch(e){}},600);
}
// ═══ SCORE 6-7 TOTAL ESCALATION ═══
function hl67Escalation(){
  // Kill any previous escalation
  var old=document.getElementById('hl67-container');
  if(old) old.remove();
  if(window._hl67alarmCtx){try{window._hl67alarmCtx.close();}catch(e){}}

  // Container for raining numbers
  var container=document.createElement('div');
  container.id='hl67-container';
  container.style.cssText='position:fixed;inset:0;z-index:9998;pointer-events:none;overflow:hidden';
  document.body.appendChild(container);

  // Rain 67 numbers
  var colors=['#b8ff10','#ff2d5e','#00ffd5','#ffc020','#b44dff','#ff6830','#3da0ff'];
  for(var i=0;i<67;i++){
    var num=document.createElement('div');
    num.textContent=Math.random()>.5?'6':'7';
    var size=Math.random()*40+20;
    var left=Math.random()*100;
    var dur=Math.random()*2+1.5;
    var delay=Math.random()*3;
    var color=colors[Math.floor(Math.random()*colors.length)];
    num.style.cssText='position:absolute;top:-60px;left:'+left+'%;font-family:var(--font-d);font-size:'+size+'px;color:'+color+';font-weight:900;text-shadow:0 0 12px '+color+';animation:hl67rain '+dur+'s '+delay+'s linear forwards;pointer-events:none;z-index:9998';
    container.appendChild(num);
  }

  // Add bouncing to EVERYTHING
  document.body.classList.add('hl67-chaos');

  // ALARM SOUND — Web Audio API oscillator that cannot be stopped
  var ctx=new(window.AudioContext||window.webkitAudioContext)();
  window._hl67alarmCtx=ctx;
  function playAlarm(){
    var osc1=ctx.createOscillator();
    var osc2=ctx.createOscillator();
    var gain=ctx.createGain();
    osc1.type='square';
    osc2.type='sawtooth';
    osc1.frequency.value=880;
    osc2.frequency.value=587;
    gain.gain.value=0.12;
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    osc1.start();
    osc2.start();
    // Siren effect — frequency sweep
    var t=ctx.currentTime;
    for(var i=0;i<20;i++){
      osc1.frequency.setValueAtTime(880,t+i*0.4);
      osc1.frequency.linearRampToValueAtTime(1200,t+i*0.4+0.2);
      osc1.frequency.linearRampToValueAtTime(880,t+i*0.4+0.4);
      osc2.frequency.setValueAtTime(587,t+i*0.4);
      osc2.frequency.linearRampToValueAtTime(440,t+i*0.4+0.2);
      osc2.frequency.linearRampToValueAtTime(587,t+i*0.4+0.4);
    }
    // Stop after 8 seconds
    osc1.stop(t+8);
    osc2.stop(t+8);
    gain.gain.setValueAtTime(0.12,t);
    gain.gain.linearRampToValueAtTime(0,t+7.5);
  }
  playAlarm();

  // Cleanup after 8 seconds
  setTimeout(function(){
    document.body.classList.remove('hl67-chaos');
    var c=document.getElementById('hl67-container');
    if(c) c.remove();
  },8000);
}

function quizShowGameOver(mode, state){
  try{GeoAudio.playSFX(state.score>0?'victory':'defeat');}catch(e){}
  showScreen('quiz-over');
  var correct=state.score||0;
  var total=state.total||1;
  var wrong=total-correct;
  var pct=Math.round(correct/total*100);
  var streak=state.bestStreak||state.streak||0;

  // Mode label + ring color
  var isFlg=mode==='flg';
  var color=isFlg?'var(--orange)':'var(--blue)';
  var modeLabel=isFlg?({en:'FLAGS QUIZ',de:'FLAGGEN QUIZ',fr:'QUIZ DRAPEAUX',es:'QUIZ BANDERAS'}[curLang]||'FLAGS QUIZ'):({en:'CAPITALS QUIZ',de:'HAUPTSTÄDTE QUIZ',fr:'QUIZ CAPITALES',es:'QUIZ CAPITALES'}[curLang]||'CAPITALS QUIZ');
  document.getElementById('qo-mode-lbl').textContent=modeLabel;
  document.getElementById('qo-mode-lbl').style.color=color;
  document.getElementById('qo-ring').setAttribute('stroke',color);

  // Ring animation
  var offset=345-(345*pct/100);
  document.getElementById('qo-ring').setAttribute('stroke-dashoffset','345');
  setTimeout(function(){document.getElementById('qo-ring').setAttribute('stroke-dashoffset',String(offset));},100);

  // Percentage
  document.getElementById('qo-pct').textContent=pct+'%';
  document.getElementById('qo-pct').style.color=color;

  // Message
  var msgs={
    en:pct===100?'Perfect score!':pct>=80?'Solid knowledge!':pct>=60?'Above average.':pct>=40?'Room to improve.':'Keep practicing!',
    de:pct===100?'Perfekt!':pct>=80?'Solides Wissen!':pct>=60?'Überdurchschnittlich.':pct>=40?'Da geht noch mehr.':'Weiter üben!',
    fr:pct===100?'Parfait!':pct>=80?'Solide!':pct>=60?'Au-dessus de la moyenne.':pct>=40?'Peut mieux faire.':'Continuez!',
    es:pct===100?'¡Perfecto!':pct>=80?'¡Sólido!':pct>=60?'Por encima del promedio.':pct>=40?'Hay margen.':'¡Sigue practicando!'
  };
  document.getElementById('qo-msg').textContent=msgs[curLang]||msgs.en;

  // Stats
  document.getElementById('qo-correct').textContent=correct;
  document.getElementById('qo-wrong').textContent=wrong;
  document.getElementById('qo-streak').textContent=streak;

  // Replay button
  var replayBtn=document.getElementById('qo-replay');
  replayBtn.onclick=function(){isFlg?launchFlags():launchCapitals();};

  // XP + achievements
  _lastState={lastMode:mode};
  try{flushXP();}catch(e){}
  try{incGames();}catch(e){}
  setTimeout(function(){try{checkAchievements();}catch(e){}},600);
}

function replayGame(){
  if(!_lastState) return goHome();
  if(_lastState.lastMode==='hl'){
    // Keep category + continent selection, only reset score
    var savedCats=hlS.selectedCats||[0];
    var savedCatIdx=hlS.catIdx||0;
    var savedContIdx=hlS.contIdx||0;
    hlS={score:0,streak:0,bestStreak:0,round:0,correct:0,total_q:0,catIdx:savedCatIdx,selectedCats:savedCats,contIdx:savedContIdx,lastMode:'hl',prevB:null,prevMKey:null,_newRecordShown:false};
    buildCatBar('hl-cats',hlS,()=>{hlS.score=0;hlS.streak=0;hlS.bestStreak=0;hlS.round=0;hlS.correct=0;hlS.total_q=0;hlS.prevB=null;hlS.prevMKey=null;hlS._newRecordShown=false;var _cs=document.getElementById('hl-cur-score');if(_cs)_cs.textContent='0';hlRound();});
    buildContBar('hl-conts',hlS,()=>{hlS.score=0;hlS.streak=0;hlS.bestStreak=0;hlS.round=0;hlS.correct=0;hlS.total_q=0;hlS.prevB=null;hlS.prevMKey=null;hlS._newRecordShown=false;var _cs=document.getElementById('hl-cur-score');if(_cs)_cs.textContent='0';hlRound();});
    hlHUD(); hlRound(); showScreen('hl');
    return;
  }
  else if(_lastState.lastMode==='border') launchBorderSetup();
  else if(_lastState.lastMode==='capitals') launchCapitals();
  else if(_lastState.lastMode==='flags') launchFlags();
  else if(_lastState.lastMode==='gtc') launchGTC();
  else launchChallenge();
}

/* ══════════════════════════════════════════
   HOME INIT
══════════════════════════════════════════ */
function initHome(){
  const saved=loadDailyProgress();
  const d=new Date();
  const dateStr=d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
  const dbHow=document.getElementById('db-how');
  var homeTimer=document.getElementById('ch-home-timer');
  if(saved&&saved.done){
    document.getElementById('db-title').textContent=T.dbDone(saved.correct,saved.score);
    document.getElementById('db-sub').textContent='';
    if(dbHow) dbHow.textContent='';
    document.querySelector('.daily-banner').style.borderColor='rgba(200,241,53,.4)';
    // Show countdown on home screen
    if(homeTimer){
      homeTimer.style.display='block';
      if(window._homeTimerIv) clearInterval(window._homeTimerIv);
      function homeTick(){
        var now=new Date();
        var tmr=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()+1));
        var diff=tmr-now;
        if(diff<=0){homeTimer.textContent='';return;}
        var h=Math.floor(diff/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
        homeTimer.textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
      }
      homeTick();
      window._homeTimerIv=setInterval(homeTick,1000);
    }
  } else {
    document.getElementById('db-title').textContent=T.dbTitle;
    document.getElementById('db-sub').textContent=T.dbSub;
    if(dbHow) dbHow.textContent=T.dbHow||'';
    if(homeTimer) homeTimer.style.display='none';
    if(window._homeTimerIv){clearInterval(window._homeTimerIv);window._homeTimerIv=null;}
  }
  document.getElementById('db-cta').textContent=T.playCta;
  const streak=loadStreak();
  const today=getDailySeed();
  const badge=document.getElementById('streak-badge');
  if(streak.count>=2&&streak.last===today){
    badge.style.display='flex';
    document.getElementById('streak-num').textContent=streak.count;
  } else { badge.style.display='none'; }
}

/* ══════════════════════════════════════════
   FAMOUS COUNTRIES + EASY METRICS
   (defined before boot so always available)
══════════════════════════════════════════ */
const FAMOUS = ["USA","China","India","Brazil","Russia","Germany","UK","France","Japan","Canada",
  "Australia","Mexico","Italy","Spain","South Korea","Indonesia","Turkey","Saudi Arabia",
  "Argentina","Nigeria","Egypt","South Africa","Poland","Netherlands","Sweden","Norway",
  "Switzerland","Portugal","Greece","Ireland","New Zealand","Singapore","UAE","Thailand",
  "Vietnam","Malaysia","Philippines","Pakistan","Bangladesh","Ethiopia","Kenya","Ghana",
  "Morocco","Algeria","Tanzania","Colombia","Chile","Peru","Venezuela","Ukraine",
  "Austria","Belgium","Denmark","Finland","Czech Republic","Romania","Hungary","Israel",
  "Iraq","Iran","Kazakhstan","Cuba","Bolivia","Ecuador","Uruguay","Paraguay"];

const EASY_METRICS = ['pop','gdp','area','lifeExp','literacy','internet'];

function shuf(a){ const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b; }

/* ══════════════════════════════════════════
   BUILD EASY QUESTION (Daily Challenge)
══════════════════════════════════════════ */
function buildEasyQ(R) {
  R = R || Math.random;
  const mKey = EASY_METRICS[Math.floor(R() * EASY_METRICS.length)];
  const m = T.metrics[mKey];
  // Use all 195 countries instead of just FAMOUS
  const fpool = COUNTRIES.filter(c => c[mKey] && c[mKey] > 0);

  // Translated type labels
  const labelHighest = {en:'Which is highest?',de:'Welches ist am höchsten?',fr:'Lequel est le plus élevé?',es:'¿Cuál es el más alto?'}[curLang]||'Which is highest?';
  const labelGuess   = {en:'Guess the Stat',de:'Wert erraten',fr:'Devinez la valeur',es:'Adivina el valor'}[curLang]||'Guess the Stat';

  if (R() < 0.55) {
    // "Which country has the highest X?" — 4 options
    const pool = [...fpool];
    for(let i=pool.length-1;i>0;i--){
      const j=Math.floor(R()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];
    }
    const four = pool.slice(0, 4);
    const bestIdx = four.reduce((b,c,i)=>c[mKey]>four[b][mKey]?i:b, 0);
    const shuffled = shuf(four);
    const correct = shuffled.indexOf(four[bestIdx]);
    return {
      typeLabel: labelHighest,
      question: T.whichHigher + ' <strong>' + m.label.toLowerCase() + '</strong>?',
      options: shuffled.map(c=>({text: flagImg(c.f,'1.2rem')+' '+countryName(c.n)})),
      correct,
      explanation: shuffled.map(c=>countryName(c.n)+': '+m.fmt(c[mKey])).join(' · '),
      mKey, m
    };
  } else {
    // "Guess the stat" — 4 options, moderately spaced wrong answers
    const pool = [...fpool];
    for(let i=pool.length-1;i>0;i--){
      const j=Math.floor(R()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];
    }
    const country = pool[0];
    const realVal = country[mKey];
    const sorted = fpool
      .filter(c=>c.n!==country.n && c[mKey]>0)
      .sort((a,b)=>
        Math.abs(Math.log(b[mKey]+1)-Math.log(realVal+1)) -
        Math.abs(Math.log(a[mKey]+1)-Math.log(realVal+1))
      );
    const mid = sorted.slice(
      Math.floor(sorted.length*0.15),
      Math.floor(sorted.length*0.60)
    );
    const wrongs = shuf(mid).slice(0,3).map(c=>c[mKey]);
    const allVals = shuf([realVal,...wrongs]);
    const questionWord = {en:"What is",de:"Was ist",fr:"Quelle est",es:"¿Cuál es"}[curLang]||"What is";
    const possessive = curLang==='de' ? "s" : curLang==='fr' ? " de" : curLang==='es' ? " de" : "'s";
    return {
      typeLabel: labelGuess,
      question: questionWord+' <strong>'+countryName(country.n)+'</strong> '+flagImg(country.f,'1.2rem')+possessive+' <strong>'+m.label.toLowerCase()+'</strong>?',
      options: allVals.map(v=>({text:m.fmt(v)})),
      correct: allVals.indexOf(realVal),
      explanation: countryName(country.n)+': '+m.fmt(realVal),
      mKey, m, country
    };
  }
}

/* ══════════════════════════════════════════
   JOKER SYSTEM
══════════════════════════════════════════ */
let jokerFiftyUsed = false;
let jokerAudienceUsed = false;
let chCurrentQ = null;

function resetJokers() {
  jokerFiftyUsed = false;
  jokerAudienceUsed = false;
  chCurrentQ = null;
  const fb = document.getElementById('joker-fifty');
  const ab = document.getElementById('joker-audience');
  if(fb){ fb.disabled=false; document.getElementById('fifty-count').textContent='1×'; }
  if(ab){ ab.disabled=false; document.getElementById('audience-count').textContent='1×'; }
  const poll = document.getElementById('audience-poll');
  if(poll) poll.style.display='none';
  const bar = document.getElementById('joker-bar');
  if(bar) bar.style.display='flex';
}

function useJokerFifty() {
  if(jokerFiftyUsed || !chCurrentQ){ showToast('Already used! ❌'); return; }
  const opts = [...document.querySelectorAll('#ch-q-opts .q-opt')];
  if(opts.length < 3){ showToast('Need 4 options for 50/50'); return; }
  // Collect non-eliminated wrong answer indices
  const wrongIdxs = opts.map((_,i)=>i).filter(i=>
    i !== chCurrentQ.correct && !opts[i].classList.contains('eliminated')
  );
  shuf(wrongIdxs).slice(0,2).forEach(i=>opts[i].classList.add('eliminated'));
  jokerFiftyUsed = true;
  document.getElementById('joker-fifty').disabled = true;
  document.getElementById('fifty-count').textContent = '0×';
  showToast('50/50 — 2 wrong answers removed! 🎯');
}

function useJokerAudience() {
  if(jokerAudienceUsed || !chCurrentQ){ showToast('Already used! ❌'); return; }
  const q = chCurrentQ;
  const opts = [...document.querySelectorAll('#ch-q-opts .q-opt')];
  if(opts.length < 2) return;

  const n = opts.length;
  // Correct answer gets 45–72% of audience votes
  const correctPct = 45 + Math.floor(Math.random()*28);
  let remaining = 100 - correctPct;
  // Split remaining across wrong answers (each gets at least 3%)
  const splits = [];
  for(let i=0; i<n-2; i++){
    const minLeft = (n-2-i)*3;
    const s = 3 + Math.floor(Math.random()*(remaining-minLeft-3));
    splits.push(s); remaining -= s;
  }
  splits.push(remaining);
  const shuffledSplits = shuf(splits);

  // Build pcts array
  const pcts = Array(n).fill(0);
  pcts[q.correct] = correctPct;
  let si=0;
  for(let i=0;i<n;i++){ if(i!==q.correct) pcts[i]=shuffledSplits[si++]; }

  // Render bars
  const letters = ['A','B','C','D'];
  const colors = ['#c8f135','#00e5c0','#ffb830','#3d9eff'];
  const barsEl = document.getElementById('audience-bars');
  barsEl.innerHTML = '';
  opts.forEach((opt,i)=>{
    const ltrEl = opt.querySelector('.opt-l');
    const ltr = ltrEl ? ltrEl.textContent.trim() : letters[i];
    const row = document.createElement('div');
    row.className = 'audience-row';
    const fill = document.createElement('div');
    fill.className = 'audience-fill';
    fill.id = 'abar-'+i;
    fill.style.cssText = 'width:0%;background:'+colors[i%4]+';color:#000';
    fill.textContent = pcts[i]+'%';
    const track = document.createElement('div');
    track.className = 'audience-track';
    track.appendChild(fill);
    const ltrDiv = document.createElement('div');
    ltrDiv.className = 'audience-ltr';
    ltrDiv.textContent = ltr;
    row.appendChild(ltrDiv);
    row.appendChild(track);
    barsEl.appendChild(row);
  });

  const pollEl = document.getElementById('audience-poll');
  pollEl.style.display = 'block';
  // Animate bars
  setTimeout(()=>{
    opts.forEach((_,i)=>{
      const b = document.getElementById('abar-'+i);
      if(b) b.style.width = pcts[i]+'%';
    });
  }, 80);

  jokerAudienceUsed = true;
  document.getElementById('joker-audience').disabled = true;
  document.getElementById('audience-count').textContent = '0×';
}

/* ══════════════════════════════════════════
   PERCENTILE SYSTEM
══════════════════════════════════════════ */
const PCT_DIST = {
  hl:        [[200,1],[170,5],[145,10],[120,20],[95,35],[70,50],[50,65],[30,80],[10,90],[0,100]],
  daily:     [[110,1],[90,5],[75,10],[60,20],[45,35],[30,50],[20,65],[10,80],[5,90],[0,100]],
  challenge: [[110,1],[90,5],[75,10],[60,20],[45,35],[30,50],[20,65],[10,80],[5,90],[0,100]],
};
function getPercentile(score, mode){
  const dist = PCT_DIST[mode]||PCT_DIST.daily;
  for(const[min,top] of dist){ if(score>=min) return top; }
  return 100;
}
function getPctLabel(pct){
  const L={
    en: p=>p<=1?'🏆 Estimated Top 1% — World Class!':p<=5?'🌟 Estimated Top 5% — Elite!':p<=10?'⭐ Estimated Top 10% — Excellent!':p<=20?'💪 Estimated Top 20% — Great job!':p<=35?'📚 Estimated Top 35% — Above Average':p<=50?'🌍 Estimated Top 50% — Average':'🌱 Keep playing!',
    de: p=>p<=1?'🏆 Geschätzt Top 1% — Weltklasse!':p<=5?'🌟 Geschätzt Top 5% — Elite!':p<=10?'⭐ Geschätzt Top 10% — Ausgezeichnet!':p<=20?'💪 Geschätzt Top 20% — Sehr gut!':p<=35?'📚 Geschätzt Top 35% — Überdurchschnittlich':p<=50?'🌍 Geschätzt Top 50% — Durchschnitt':'🌱 Weiter spielen!',
    fr: p=>p<=1?'🏆 Estimé Top 1% — Niveau mondial!':p<=5?'🌟 Estimé Top 5% — Élite!':p<=10?'⭐ Estimé Top 10% — Excellent!':p<=20?'💪 Estimé Top 20% — Très bien!':p<=35?'📚 Estimé Top 35% — Au-dessus de la moyenne':p<=50?'🌍 Estimé Top 50% — Dans la moyenne':'🌱 Continuez!',
    es: p=>p<=1?'🏆 Estimado Top 1% — ¡Clase mundial!':p<=5?'🌟 Estimado Top 5% — ¡Élite!':p<=10?'⭐ Estimado Top 10% — ¡Excelente!':p<=20?'💪 Estimado Top 20% — ¡Muy bien!':p<=35?'📚 Estimado Top 35% — Sobre el promedio':p<=50?'🌍 Estimado Top 50% — Promedio':'🌱 ¡Sigue jugando!',
  };
  return (L[curLang]||L.en)(pct);
}

/* ══════════════════════════════════════════
   TIKTOK SHARE
══════════════════════════════════════════ */
function tiktokShare(){
  const text = _shareText||'GeoVS — Play free at geovs.netlify.app';
  if(navigator.share){
    navigator.share({title:'GeoVS',text,url:'https://geovs.netlify.app'}).catch(()=>{});
  } else {
    navigator.clipboard.writeText(text+'\n\nhttps://geovs.netlify.app')
      .then(()=>{ showToast((T.copied||'Copied')+'! Paste in TikTok 🎵'); setTimeout(()=>window.open('https://www.tiktok.com','_blank'),800); })
      .catch(()=>window.open('https://www.tiktok.com','_blank'));
  }
}

/* ══════════════════════════════════════════
   DEV RESET BUTTON
══════════════════════════════════════════ */
function resetDailyChallenge(){
  localStorage.removeItem(getTodayKey());
  initHome();
  showToast('Daily Challenge reset ✓');
}


/* ══════════════════════════════════════════
   BOOT
══════════════════════════════════════════ */


// SPY_TARGETS translated for all languages
// Structure: country -> lang -> clues[]
const SPY_CLUES_I18N = {
  "Brazil": {
    en: [
      "The target was spotted in the largest country in South America.",
      "Intelligence confirms the country speaks Portuguese as its official language.",
      "The suspect was seen near a famous rainforest covering 60% of the country.",
      "The country hosted the FIFA World Cup in 2014.",
      "It shares borders with every South American country except Chile and Ecuador."
    ],
    de: [
      "Das Ziel wurde im größten Land Südamerikas gesichtet.",
      "Der Geheimdienst bestätigt: Amtssprache ist Portugiesisch.",
      "Der Verdächtige wurde in der Nähe eines berühmten Regenwaldes gesehen, der 60% des Landes bedeckt.",
      "Das Land war 2014 Gastgeber der FIFA-Weltmeisterschaft.",
      "Es grenzt an alle südamerikanischen Länder außer Chile und Ecuador."
    ],
    fr: [
      "La cible a été repérée dans le plus grand pays d'Amérique du Sud.",
      "Le renseignement confirme que la langue officielle est le portugais.",
      "Le suspect a été aperçu près d'une célèbre forêt tropicale couvrant 60% du pays.",
      "Ce pays a accueilli la Coupe du Monde FIFA en 2014.",
      "Il partage ses frontières avec tous les pays d'Amérique du Sud sauf le Chili et l'Équateur."
    ],
    es: [
      "El objetivo fue visto en el país más grande de América del Sur.",
      "Inteligencia confirma que el idioma oficial es el portugués.",
      "El sospechoso fue visto cerca de una famosa selva tropical que cubre el 60% del país.",
      "Este país fue sede de la Copa Mundial FIFA en 2014.",
      "Comparte fronteras con todos los países sudamericanos excepto Chile y Ecuador."
    ],
  },
  "Japan": {
    en: [
      "The target is hiding in an island nation in East Asia.",
      "The country has over 6,800 islands but most people live on just 4 main ones.",
      "It has the world's oldest reigning monarchy, founded over 2,600 years ago.",
      "This country invented the bullet train — the Shinkansen.",
      "Mount Fuji is its highest point and a national symbol."
    ],
    de: [
      "Das Ziel versteckt sich in einem Inselstaat in Ostasien.",
      "Das Land hat über 6.800 Inseln, aber die meisten Menschen leben auf nur 4 Hauptinseln.",
      "Es hat die älteste regierende Monarchie der Welt, gegründet vor über 2.600 Jahren.",
      "Dieses Land erfand den Hochgeschwindigkeitszug — den Shinkansen.",
      "Der Fuji ist der höchste Punkt und ein nationales Symbol."
    ],
    fr: [
      "La cible se cache dans un pays insulaire d'Asie de l'Est.",
      "Le pays compte plus de 6 800 îles mais la plupart des habitants vivent sur 4 îles principales.",
      "C'est la plus ancienne monarchie régnante du monde, fondée il y a plus de 2 600 ans.",
      "Ce pays a inventé le train à grande vitesse — le Shinkansen.",
      "Le mont Fuji est son point culminant et un symbole national."
    ],
    es: [
      "El objetivo se esconde en una nación insular del Este de Asia.",
      "El país tiene más de 6.800 islas pero la mayoría vive en solo 4 principales.",
      "Tiene la monarquía reinante más antigua del mundo, fundada hace más de 2.600 años.",
      "Este país inventó el tren bala — el Shinkansen.",
      "El Monte Fuji es su punto más alto y un símbolo nacional."
    ],
  },
  "Egypt": {
    en: [
      "The target was seen near ancient monuments over 4,500 years old.",
      "A great river runs through this country — the longest in the world.",
      "The country bridges two continents: Africa and Asia.",
      "Its capital is the largest city in Africa.",
      "The Sahara Desert covers most of this country's territory."
    ],
    de: [
      "Das Ziel wurde in der Nähe von über 4.500 Jahre alten Monumenten gesehen.",
      "Ein großer Fluss — der längste der Welt — fließt durch dieses Land.",
      "Das Land verbindet zwei Kontinente: Afrika und Asien.",
      "Die Hauptstadt ist die größte Stadt Afrikas.",
      "Die Sahara bedeckt den größten Teil des Territoriums."
    ],
    fr: [
      "La cible a été vue près de monuments antiques vieux de plus de 4 500 ans.",
      "Un grand fleuve — le plus long du monde — traverse ce pays.",
      "Ce pays fait le pont entre deux continents : l'Afrique et l'Asie.",
      "Sa capitale est la plus grande ville d'Afrique.",
      "Le désert du Sahara couvre la majeure partie du territoire."
    ],
    es: [
      "El objetivo fue visto cerca de monumentos de más de 4.500 años de antigüedad.",
      "Un gran río — el más largo del mundo — atraviesa este país.",
      "El país conecta dos continentes: África y Asia.",
      "Su capital es la ciudad más grande de África.",
      "El desierto del Sahara cubre la mayor parte del territorio."
    ],
  },
  "Australia": {
    en: [
      "The suspect is in a country that is also an entire continent.",
      "It's the only country that spans a full continent in the Southern Hemisphere.",
      "Home to unique animals: kangaroos, koalas, and the platypus.",
      "The Great Barrier Reef — the world's largest coral reef — lies offshore.",
      "This country drives on the left side of the road."
    ],
    de: [
      "Der Verdächtige befindet sich in einem Land, das gleichzeitig ein ganzer Kontinent ist.",
      "Es ist das einzige Land, das auf der Südhalbkugel einen ganzen Kontinent umspannt.",
      "Heimat einzigartiger Tiere: Kängurus, Koalas und Schnabeltiere.",
      "Das Great Barrier Reef — das größte Korallenriff der Welt — liegt vor der Küste.",
      "In diesem Land wird auf der linken Straßenseite gefahren."
    ],
    fr: [
      "Le suspect se trouve dans un pays qui est aussi tout un continent.",
      "C'est le seul pays à couvrir un continent entier dans l'hémisphère sud.",
      "Berceau d'animaux uniques : kangourous, koalas et ornithorynques.",
      "La Grande Barrière de Corail — le plus grand récif corallien du monde — se trouve au large.",
      "Dans ce pays, on conduit à gauche."
    ],
    es: [
      "El sospechoso está en un país que también es un continente entero.",
      "Es el único país que abarca un continente completo en el hemisferio sur.",
      "Hogar de animales únicos: canguros, koalas y ornitorrincos.",
      "La Gran Barrera de Coral — el arrecife de coral más grande del mundo — está frente a sus costas.",
      "En este país se conduce por la izquierda."
    ],
  },
  "Norway": {
    en: [
      "The target is hiding in a country famous for its dramatic fjords.",
      "This country is in Northern Europe and borders Sweden and Finland.",
      "It's one of the world's largest oil exporters despite its small population.",
      "The northern third of this country lies above the Arctic Circle.",
      "The Northern Lights (Aurora Borealis) are frequently seen here."
    ],
    de: [
      "Das Ziel versteckt sich in einem Land, das für seine dramatischen Fjorde bekannt ist.",
      "Dieses Land liegt in Nordeuropa und grenzt an Schweden und Finnland.",
      "Trotz kleiner Bevölkerung ist es einer der größten Ölexporteure der Welt.",
      "Das nördliche Drittel liegt nördlich des Polarkreises.",
      "Das Nordlicht (Aurora Borealis) ist hier häufig zu sehen."
    ],
    fr: [
      "La cible se cache dans un pays célèbre pour ses fjords spectaculaires.",
      "Ce pays est en Europe du Nord et borde la Suède et la Finlande.",
      "Malgré sa petite population, c'est l'un des plus grands exportateurs de pétrole au monde.",
      "Le tiers nord du pays se trouve au-delà du cercle arctique.",
      "Les aurores boréales y sont fréquemment observées."
    ],
    es: [
      "El objetivo se esconde en un país famoso por sus dramáticos fiordos.",
      "Este país está en el norte de Europa y limita con Suecia y Finlandia.",
      "A pesar de su pequeña población, es uno de los mayores exportadores de petróleo del mundo.",
      "El tercio norte del país se encuentra por encima del Círculo Ártico.",
      "Las auroras boreales se ven con frecuencia aquí."
    ],
  },
  "India": {
    en: [
      "The suspect is in the world's most populous country as of 2023.",
      "This country has over 22 official languages and hundreds of dialects.",
      "The Himalayas form its northern border — including K2 and Kangchenjunga.",
      "The Taj Mahal — one of the Seven Wonders of the World — is here.",
      "This country invented chess and the number zero."
    ],
    de: [
      "Der Verdächtige befindet sich im bevölkerungsreichsten Land der Welt (Stand 2023).",
      "Dieses Land hat über 22 Amtssprachen und Hunderte von Dialekten.",
      "Der Himalaya bildet die nördliche Grenze — einschließlich K2 und Kangchenjunga.",
      "Das Taj Mahal — eines der Sieben Weltwunder — befindet sich hier.",
      "Dieses Land erfand das Schachspiel und die Null."
    ],
    fr: [
      "Le suspect se trouve dans le pays le plus peuplé du monde en 2023.",
      "Ce pays a plus de 22 langues officielles et des centaines de dialectes.",
      "L'Himalaya forme sa frontière nord — dont le K2 et le Kangchenjunga.",
      "Le Taj Mahal — l'une des Sept Merveilles du Monde — s'y trouve.",
      "Ce pays a inventé les échecs et le chiffre zéro."
    ],
    es: [
      "El sospechoso está en el país más poblado del mundo desde 2023.",
      "Este país tiene más de 22 idiomas oficiales y cientos de dialectos.",
      "El Himalaya forma su frontera norte — incluyendo K2 y Kangchenjunga.",
      "El Taj Mahal — una de las Siete Maravillas del Mundo — está aquí.",
      "Este país inventó el ajedrez y el número cero."
    ],
  },
  "Canada": {
    en: [
      "The target is in the second largest country in the world by land area.",
      "This country has the longest coastline of any nation on Earth.",
      "It shares the world's longest undefended international border with the USA.",
      "Famous for maple syrup — it produces over 70% of the world's supply.",
      "Ice hockey is the national winter sport and a major cultural identity."
    ],
    de: [
      "Das Ziel befindet sich im zweitgrößten Land der Welt (nach Fläche).",
      "Dieses Land hat die längste Küstenlinie aller Nationen der Erde.",
      "Es teilt die längste unbewachte internationale Grenze der Welt mit den USA.",
      "Bekannt für Ahornsirup — es produziert über 70% des weltweiten Vorrats.",
      "Eishockey ist der nationale Wintersport und wichtiger Teil der Kultur."
    ],
    fr: [
      "La cible se trouve dans le deuxième plus grand pays du monde par superficie.",
      "Ce pays possède le littoral le plus long de toutes les nations de la Terre.",
      "Il partage la plus longue frontière internationale non défendue avec les États-Unis.",
      "Célèbre pour le sirop d'érable — il produit plus de 70% de l'approvisionnement mondial.",
      "Le hockey sur glace est le sport d'hiver national et une identité culturelle majeure."
    ],
    es: [
      "El objetivo está en el segundo país más grande del mundo por área terrestre.",
      "Este país tiene la costa más larga de cualquier nación en la Tierra.",
      "Comparte la frontera internacional no defendida más larga del mundo con EE.UU.",
      "Famoso por el jarabe de arce — produce más del 70% del suministro mundial.",
      "El hockey sobre hielo es el deporte nacional de invierno e identidad cultural."
    ],
  },
  "South Africa": {
    en: [
      "The suspect is in a country at the southern tip of Africa.",
      "This country has 11 official languages — more than almost any other nation.",
      "It's the only country in the world to have voluntarily given up its nuclear weapons.",
      "Home to Kruger National Park — one of Africa's largest game reserves.",
      "Table Mountain overlooks its famous coastal city Cape Town."
    ],
    de: [
      "Der Verdächtige befindet sich in einem Land an der südlichen Spitze Afrikas.",
      "Dieses Land hat 11 Amtssprachen — mehr als fast jedes andere Land.",
      "Es ist das einzige Land der Welt, das freiwillig auf Atomwaffen verzichtet hat.",
      "Heimat des Kruger-Nationalparks — eines der größten Wildreservate Afrikas.",
      "Der Tafelberg überblickt die berühmte Küstenstadt Kapstadt."
    ],
    fr: [
      "Le suspect se trouve dans un pays à la pointe sud de l'Afrique.",
      "Ce pays a 11 langues officielles — plus que presque toute autre nation.",
      "C'est le seul pays au monde à avoir volontairement renoncé à ses armes nucléaires.",
      "Berceau du Parc national Kruger — l'une des plus grandes réserves naturelles d'Afrique.",
      "La Montagne de la Table surplombe la célèbre ville côtière du Cap."
    ],
    es: [
      "El sospechoso está en un país en el extremo sur de África.",
      "Este país tiene 11 idiomas oficiales — más que casi cualquier otra nación.",
      "Es el único país del mundo que renunció voluntariamente a sus armas nucleares.",
      "Hogar del Parque Nacional Kruger — una de las mayores reservas de vida silvestre de África.",
      "La Montaña de la Mesa domina la famosa ciudad costera de Ciudad del Cabo."
    ],
  },
  "Germany": {
    en: [
      "The target is in the most populous country in the European Union.",
      "This country reunified in 1990 after being divided for decades.",
      "It's the world's third largest exporter and home to BMW, Volkswagen, and Siemens.",
      "Oktoberfest — the world's largest beer festival — is held here every year.",
      "The Rhine and Danube are its major rivers."
    ],
    de: [
      "Das Ziel befindet sich im bevölkerungsreichsten Land der Europäischen Union.",
      "Dieses Land wurde 1990 nach jahrzehntelanger Teilung wiedervereinigt.",
      "Es ist der drittgrößte Exporteur der Welt und Heimat von BMW, Volkswagen und Siemens.",
      "Das Oktoberfest — das größte Bierfest der Welt — findet hier jährlich statt.",
      "Der Rhein und die Donau sind die wichtigsten Flüsse."
    ],
    fr: [
      "La cible se trouve dans le pays le plus peuplé de l'Union européenne.",
      "Ce pays s'est réunifié en 1990 après avoir été divisé pendant des décennies.",
      "C'est le troisième exportateur mondial et le berceau de BMW, Volkswagen et Siemens.",
      "L'Oktoberfest — le plus grand festival de bière au monde — s'y tient chaque année.",
      "Le Rhin et le Danube sont ses principaux fleuves."
    ],
    es: [
      "El objetivo está en el país más poblado de la Unión Europea.",
      "Este país se reunificó en 1990 tras décadas de división.",
      "Es el tercer mayor exportador del mundo y hogar de BMW, Volkswagen y Siemens.",
      "El Oktoberfest — el festival de cerveza más grande del mundo — se celebra aquí cada año.",
      "El Rin y el Danubio son sus principales ríos."
    ],
  },
  "Mexico": {
    en: [
      "The suspect is in a country in North America that borders the USA to the north.",
      "This country is the birthplace of chocolate, tomatoes, and avocados.",
      "Home to over 30 UNESCO World Heritage Sites.",
      "The ancient Aztec empire had its capital where the modern capital stands today.",
      "It has coastlines on both the Pacific Ocean and the Gulf of Mexico."
    ],
    de: [
      "Der Verdächtige befindet sich in einem nordamerikanischen Land, das im Norden an die USA grenzt.",
      "Dieses Land ist die Heimat von Schokolade, Tomaten und Avocados.",
      "Heimat von über 30 UNESCO-Welterbestätten.",
      "Das alte Aztekenreich hatte seine Hauptstadt dort, wo heute die moderne Hauptstadt steht.",
      "Es hat Küsten am Pazifischen Ozean und am Golf von Mexiko."
    ],
    fr: [
      "Le suspect se trouve dans un pays d'Amérique du Nord qui borde les États-Unis au nord.",
      "Ce pays est le berceau du chocolat, des tomates et des avocats.",
      "Plus de 30 sites du patrimoine mondial de l'UNESCO s'y trouvent.",
      "L'ancien empire aztèque avait sa capitale là où se dresse aujourd'hui la capitale moderne.",
      "Il a des côtes sur l'océan Pacifique et le golfe du Mexique."
    ],
    es: [
      "El sospechoso está en un país de América del Norte que limita con EE.UU. al norte.",
      "Este país es el lugar de origen del chocolate, los tomates y los aguacates.",
      "Alberga más de 30 sitios del Patrimonio Mundial de la UNESCO.",
      "El antiguo Imperio Azteca tenía su capital donde hoy se encuentra la capital moderna.",
      "Tiene costas tanto en el Océano Pacífico como en el Golfo de México."
    ],
  },
  "Turkey": {
    en: [
      "The target is in a country that spans two continents.",
      "A small part of this country is in Europe; most is in Asia.",
      "Istanbul — its largest city — was once known as Constantinople.",
      "The country borders both the Black Sea and the Mediterranean Sea.",
      "It has one of the world's earliest known human settlements: Çatalhöyük."
    ],
    de: [
      "Das Ziel befindet sich in einem Land, das zwei Kontinente überspannt.",
      "Ein kleiner Teil liegt in Europa, der Großteil in Asien.",
      "Istanbul — die größte Stadt — war einst als Konstantinopel bekannt.",
      "Das Land grenzt sowohl an das Schwarze Meer als auch an das Mittelmeer.",
      "Es beherbergt eine der ältesten bekannten menschlichen Siedlungen: Çatalhöyük."
    ],
    fr: [
      "La cible se trouve dans un pays à cheval sur deux continents.",
      "Une petite partie est en Europe ; la majeure partie est en Asie.",
      "Istanbul — sa plus grande ville — était autrefois connue sous le nom de Constantinople.",
      "Le pays borde à la fois la mer Noire et la mer Méditerranée.",
      "Il abrite l'une des plus anciennes colonies humaines connues : Çatalhöyük."
    ],
    es: [
      "El objetivo está en un país que abarca dos continentes.",
      "Una pequeña parte está en Europa; la mayor parte en Asia.",
      "Estambul — su ciudad más grande — fue conocida como Constantinopla.",
      "El país limita tanto con el Mar Negro como con el Mar Mediterráneo.",
      "Alberga uno de los asentamientos humanos más antiguos del mundo: Çatalhöyük."
    ],
  },
  "Peru": {
    en: [
      "The suspect was last seen near ancient ruins high in the Andes Mountains.",
      "This country contains part of the Amazon River — the world's largest by water flow.",
      "The Inca Empire had its capital in this country's modern capital.",
      "Lake Titicaca — the world's highest navigable lake — sits on its border.",
      "This country gave the world potatoes and quinoa."
    ],
    de: [
      "Der Verdächtige wurde zuletzt in der Nähe alter Ruinen hoch in den Anden gesehen.",
      "Dieses Land enthält einen Teil des Amazonas — den wasserreichsten Fluss der Welt.",
      "Das Inkareich hatte seine Hauptstadt in der heutigen Hauptstadt des Landes.",
      "Der Titicacasee — der höchste schiffbare See der Welt — liegt an seiner Grenze.",
      "Dieses Land gab der Welt Kartoffeln und Quinoa."
    ],
    fr: [
      "Le suspect a été vu pour la dernière fois près de ruines antiques dans les Andes.",
      "Ce pays contient une partie de l'Amazone — le plus grand fleuve du monde en débit.",
      "L'Empire Inca avait sa capitale dans la capitale moderne de ce pays.",
      "Le lac Titicaca — le lac navigable le plus haut du monde — est à sa frontière.",
      "Ce pays a donné au monde les pommes de terre et le quinoa."
    ],
    es: [
      "El sospechoso fue visto por última vez cerca de ruinas antiguas en los Andes.",
      "Este país contiene parte del Amazonas — el río más caudaloso del mundo.",
      "El Imperio Inca tenía su capital en la actual capital del país.",
      "El lago Titicaca — el lago navegable más alto del mundo — está en su frontera.",
      "Este país dio al mundo las papas y la quinoa."
    ],
  },
  "Morocco": {
    en: [
      "The target is in an African country just 14 km from Europe across a strait.",
      "This country's mountain range — the Atlas Mountains — crosses its interior.",
      "The city of Marrakech is famous for its ancient medina and the Djemaa el-Fna square.",
      "Argan oil — used worldwide in cosmetics — comes exclusively from this country.",
      "It shares a border with Algeria and has a disputed territory called Western Sahara."
    ],
    de: [
      "Das Ziel befindet sich in einem afrikanischen Land, nur 14 km von Europa durch eine Meerenge.",
      "Das Atlasgebirge durchquert das Landesinnere.",
      "Marrakesch ist berühmt für seine alte Medina und den Djemaa el-Fna-Platz.",
      "Arganöl — weltweit in Kosmetika verwendet — kommt ausschließlich aus diesem Land.",
      "Es grenzt an Algerien und hat ein umstrittenes Gebiet namens Westsahara."
    ],
    fr: [
      "La cible se trouve dans un pays africain à seulement 14 km de l'Europe à travers un détroit.",
      "La chaîne de montagnes du pays — l'Atlas — traverse son intérieur.",
      "Marrakech est célèbre pour son ancienne médina et la place Djemaa el-Fna.",
      "L'huile d'argan — utilisée dans les cosmétiques du monde entier — vient exclusivement de ce pays.",
      "Il partage une frontière avec l'Algérie et possède un territoire contesté appelé Sahara occidental."
    ],
    es: [
      "El objetivo está en un país africano a solo 14 km de Europa cruzando un estrecho.",
      "La cadena montañosa del país — el Atlas — atraviesa su interior.",
      "Marrakech es famosa por su antigua medina y la plaza Djemaa el-Fna.",
      "El aceite de argán — usado mundialmente en cosméticos — proviene exclusivamente de este país.",
      "Comparte frontera con Argelia y tiene un territorio disputado llamado Sáhara Occidental."
    ],
  },
  "New Zealand": {
    en: [
      "The suspect is hiding in a nation of two main islands in the Pacific Ocean.",
      "This country was the first to give women the right to vote in 1893.",
      "The Lord of the Rings trilogy was filmed almost entirely here.",
      "It has more sheep than people — roughly 5 sheep per person.",
      "The indigenous Māori people make up about 16% of the population."
    ],
    de: [
      "Der Verdächtige versteckt sich in einer Nation mit zwei Hauptinseln im Pazifischen Ozean.",
      "Dieses Land war das erste, das Frauen 1893 das Wahlrecht einräumte.",
      "Die Herr-der-Ringe-Trilogie wurde fast vollständig hier gedreht.",
      "Es gibt mehr Schafe als Menschen — etwa 5 Schafe pro Person.",
      "Die indigenen Māori machen etwa 16% der Bevölkerung aus."
    ],
    fr: [
      "Le suspect se cache dans une nation de deux îles principales dans le Pacifique.",
      "Ce pays fut le premier à accorder le droit de vote aux femmes en 1893.",
      "La trilogie du Seigneur des Anneaux y a été tournée presque entièrement.",
      "Il y a plus de moutons que d'habitants — environ 5 moutons par personne.",
      "Les Māori autochtones représentent environ 16% de la population."
    ],
    es: [
      "El sospechoso se esconde en una nación de dos islas principales en el Océano Pacífico.",
      "Este país fue el primero en dar el derecho al voto a las mujeres en 1893.",
      "La trilogía El Señor de los Anillos fue filmada casi en su totalidad aquí.",
      "Hay más ovejas que personas — aproximadamente 5 ovejas por persona.",
      "Los indígenas māori representan aproximadamente el 16% de la población."
    ],
  },
  "Saudi Arabia": {
    en: [
      "The target is in the largest country in the Middle East.",
      "This country contains the two holiest cities in Islam: Mecca and Medina.",
      "It is the world's largest oil exporter.",
      "Women only gained the right to drive here in 2018.",
      "The country has no rivers — water comes from desalination and aquifers."
    ],
    de: [
      "Das Ziel befindet sich im größten Land des Nahen Ostens.",
      "Dieses Land beherbergt die zwei heiligsten Städte des Islam: Mekka und Medina.",
      "Es ist der größte Ölexporteur der Welt.",
      "Frauen erhielten hier erst 2018 das Recht zu fahren.",
      "Das Land hat keine Flüsse — Wasser kommt aus Meerwasserentsalzung und Grundwasserleitern."
    ],
    fr: [
      "La cible se trouve dans le plus grand pays du Moyen-Orient.",
      "Ce pays abrite les deux villes les plus saintes de l'islam : La Mecque et Médine.",
      "C'est le plus grand exportateur de pétrole au monde.",
      "Les femmes n'ont obtenu le droit de conduire qu'en 2018.",
      "Le pays n'a pas de rivières — l'eau vient du dessalement et des aquifères."
    ],
    es: [
      "El objetivo está en el país más grande de Oriente Medio.",
      "Este país alberga las dos ciudades más sagradas del Islam: La Meca y Medina.",
      "Es el mayor exportador de petróleo del mundo.",
      "Las mujeres solo obtuvieron el derecho a conducir aquí en 2018.",
      "El país no tiene ríos — el agua proviene de la desalinización y acuíferos."
    ],
  },
  "Kazakhstan": {
    en: [
      "The target is in the world's largest landlocked country.",
      "This country in Central Asia was once part of the Soviet Union.",
      "The Baikonur Cosmodrome — where Yuri Gagarin launched from — is located here.",
      "The Aral Sea, which used to be in this country, is now mostly dry.",
      "It borders Russia, China, Kyrgyzstan, Uzbekistan, and Turkmenistan."
    ],
    de: [
      "Das Ziel befindet sich im größten Binnenstaat der Welt.",
      "Dieses mittelasiatische Land war einst Teil der Sowjetunion.",
      "Das Baikonur Kosmodrom — von dem Juri Gagarin startete — liegt hier.",
      "Der Aralsee, der früher in diesem Land lag, ist heute größtenteils ausgetrocknet.",
      "Es grenzt an Russland, China, Kirgisistan, Usbekistan und Turkmenistan."
    ],
    fr: [
      "La cible se trouve dans le plus grand pays enclavé du monde.",
      "Ce pays d'Asie centrale faisait autrefois partie de l'Union soviétique.",
      "Le cosmodrome de Baïkonour — d'où Youri Gagarine a décollé — s'y trouve.",
      "La mer d'Aral, autrefois dans ce pays, est maintenant presque entièrement asséchée.",
      "Il borde la Russie, la Chine, le Kirghizistan, l'Ouzbékistan et le Turkménistan."
    ],
    es: [
      "El objetivo está en el país sin salida al mar más grande del mundo.",
      "Este país de Asia Central fue parte de la Unión Soviética.",
      "El Cosmódromo de Baikonur — desde donde despegó Yuri Gagarin — está aquí.",
      "El Mar de Aral, que solía estar en este país, ahora está casi seco.",
      "Limita con Rusia, China, Kirguistán, Uzbekistán y Turkmenistán."
    ],
  },
  "Colombia": {
    en: [
      "The suspect is in the only South American country with coastlines on both the Pacific and Caribbean.",
      "This country produces more cut flowers than any other nation except the Netherlands.",
      "It is named after Christopher Columbus.",
      "The coffee-growing region here is a UNESCO World Heritage Site.",
      "It borders Panama, Venezuela, Brazil, Peru, and Ecuador."
    ],
    de: [
      "Der Verdächtige befindet sich im einzigen südamerikanischen Land mit Küsten am Pazifik und der Karibik.",
      "Dieses Land produziert mehr Schnittblumen als jede andere Nation außer den Niederlanden.",
      "Es ist nach Christoph Kolumbus benannt.",
      "Die Kaffeeanbauzonen sind UNESCO-Weltkulturerbe.",
      "Es grenzt an Panama, Venezuela, Brasilien, Peru und Ecuador."
    ],
    fr: [
      "Le suspect se trouve dans le seul pays d'Amérique du Sud avec des côtes sur le Pacifique et la Caraïbe.",
      "Ce pays produit plus de fleurs coupées que tout autre pays sauf les Pays-Bas.",
      "Il porte le nom de Christophe Colomb.",
      "La région caféière est inscrite au patrimoine mondial de l'UNESCO.",
      "Il borde le Panama, le Venezuela, le Brésil, le Pérou et l'Équateur."
    ],
    es: [
      "El sospechoso está en el único país sudamericano con costas en el Pacífico y el Caribe.",
      "Este país produce más flores cortadas que cualquier otra nación excepto los Países Bajos.",
      "Lleva el nombre de Cristóbal Colón.",
      "La región cafetera es Patrimonio Mundial de la UNESCO.",
      "Limita con Panamá, Venezuela, Brasil, Perú y Ecuador."
    ],
  },
  "Vietnam": {
    en: [
      "The target is in a country shaped like the letter 'S' in Southeast Asia.",
      "This country has the world's largest cave: Hang Sơn Đoòng.",
      "It borders China to the north, and Laos and Cambodia to the west.",
      "This nation was unified in 1976 after a long war.",
      "It's the world's second largest exporter of coffee after Brazil."
    ],
    de: [
      "Das Ziel befindet sich in einem Land in Südostasien, das wie der Buchstabe 'S' geformt ist.",
      "Dieses Land hat die größte Höhle der Welt: Hang Sơn Đoòng.",
      "Es grenzt im Norden an China, im Westen an Laos und Kambodscha.",
      "Die Nation wurde 1976 nach einem langen Krieg wiedervereinigt.",
      "Es ist nach Brasilien der zweitgrößte Kaffeeexporteur der Welt."
    ],
    fr: [
      "La cible se trouve dans un pays en forme de 'S' en Asie du Sud-Est.",
      "Ce pays possède la plus grande grotte du monde : Hang Sơn Đoòng.",
      "Il borde la Chine au nord, le Laos et le Cambodge à l'ouest.",
      "Cette nation s'est unifiée en 1976 après une longue guerre.",
      "C'est le deuxième exportateur de café au monde après le Brésil."
    ],
    es: [
      "El objetivo está en un país con forma de 'S' en el sudeste asiático.",
      "Este país tiene la cueva más grande del mundo: Hang Sơn Đoòng.",
      "Limita con China al norte y con Laos y Camboya al oeste.",
      "Esta nación se unificó en 1976 tras una larga guerra.",
      "Es el segundo mayor exportador de café del mundo después de Brasil."
    ],
  },
  "Nigeria": {
    en: [
      "The suspect is in the most populous country in Africa.",
      "This country has over 250 ethnic groups and 500 languages.",
      "It's Africa's largest economy, driven largely by oil exports.",
      "Nollywood — the film industry here — is the world's second most prolific after Bollywood.",
      "The Niger River — Africa's third longest — flows through this country."
    ],
    de: [
      "Der Verdächtige befindet sich im bevölkerungsreichsten Land Afrikas.",
      "Dieses Land hat über 250 ethnische Gruppen und 500 Sprachen.",
      "Es ist Afrikas größte Volkswirtschaft, hauptsächlich durch Ölexporte angetrieben.",
      "Nollywood — die hiesige Filmindustrie — ist nach Bollywood die zweitprolificste der Welt.",
      "Der Niger — der drittlängste Fluss Afrikas — fließt durch dieses Land."
    ],
    fr: [
      "Le suspect se trouve dans le pays le plus peuplé d'Afrique.",
      "Ce pays compte plus de 250 groupes ethniques et 500 langues.",
      "C'est la plus grande économie d'Afrique, principalement grâce aux exportations de pétrole.",
      "Nollywood — l'industrie cinématographique locale — est la deuxième plus prolifique au monde après Bollywood.",
      "Le fleuve Niger — le troisième plus long d'Afrique — traverse ce pays."
    ],
    es: [
      "El sospechoso está en el país más poblado de África.",
      "Este país tiene más de 250 grupos étnicos y 500 idiomas.",
      "Es la mayor economía de África, impulsada principalmente por las exportaciones de petróleo.",
      "Nollywood — la industria cinematográfica local — es la segunda más prolífica del mundo tras Bollywood.",
      "El río Níger — el tercero más largo de África — fluye por este país."
    ],
  },
  "Iran": {
    en: [
      "The target is in a country that was called Persia until 1935.",
      "This country in the Middle East borders Iraq, Turkey, Pakistan, and Afghanistan.",
      "It has the world's second largest natural gas reserves.",
      "The country's main religion is Shia Islam — over 90% of the population.",
      "Ancient ruins of Persepolis — once capital of the Persian Empire — are here."
    ],
    de: [
      "Das Ziel befindet sich in einem Land, das bis 1935 Persien hieß.",
      "Dieses nahöstliche Land grenzt an Irak, Türkei, Pakistan und Afghanistan.",
      "Es hat die zweitgrößten Erdgasreserven der Welt.",
      "Die Hauptreligion des Landes ist der Schiitische Islam — über 90% der Bevölkerung.",
      "Die antiken Ruinen von Persepolis — einst Hauptstadt des Persischen Reiches — befinden sich hier."
    ],
    fr: [
      "La cible se trouve dans un pays qui s'appelait la Perse jusqu'en 1935.",
      "Ce pays du Moyen-Orient borde l'Irak, la Turquie, le Pakistan et l'Afghanistan.",
      "Il possède les deuxièmes plus grandes réserves de gaz naturel au monde.",
      "La religion principale est l'islam chiite — plus de 90% de la population.",
      "Les ruines antiques de Persépolis — autrefois capitale de l'empire perse — s'y trouvent."
    ],
    es: [
      "El objetivo está en un país que se llamó Persia hasta 1935.",
      "Este país de Oriente Medio limita con Iraq, Turquía, Pakistán y Afganistán.",
      "Tiene las segundas mayores reservas de gas natural del mundo.",
      "La religión principal es el Islam chií — más del 90% de la población.",
      "Las ruinas antiguas de Persépolis — antigua capital del Imperio Persa — están aquí."
    ],
  }
};

const SPY_TARGETS = [
  // Easy — major countries, clear clues
  {country:"Brazil",    flag:"🇧🇷", clues:[
    "The target was spotted in the largest country in South America.",
    "Intelligence confirms the country speaks Portuguese as its official language.",
    "The suspect was seen near a famous rainforest covering 60% of the country.",
    "The country hosted the FIFA World Cup in 2014.",
    "It shares borders with every South American country except Chile and Ecuador."
  ]},
  {country:"Japan",     flag:"🇯🇵", clues:[
    "The target is hiding in an island nation in East Asia.",
    "The country has over 6,800 islands but most people live on just 4 main ones.",
    "It has the world's oldest reigning monarchy, founded over 2,600 years ago.",
    "This country invented the bullet train — the Shinkansen.",
    "Mount Fuji is its highest point and a national symbol."
  ]},
  {country:"Egypt",     flag:"🇪🇬", clues:[
    "The target was seen near ancient monuments over 4,500 years old.",
    "A great river runs through this country — the longest in the world.",
    "The country bridges two continents: Africa and Asia.",
    "Its capital is the largest city in Africa.",
    "The Sahara Desert covers most of this country's territory."
  ]},
  {country:"Australia", flag:"🇦🇺", clues:[
    "The suspect is in a country that is also an entire continent.",
    "It's the only country that spans a full continent in the Southern Hemisphere.",
    "Home to unique animals: kangaroos, koalas, and the platypus.",
    "The Great Barrier Reef — the world's largest coral reef — lies offshore.",
    "This country drives on the left side of the road."
  ]},
  {country:"Norway",    flag:"🇳🇴", clues:[
    "The target is hiding in a country famous for its dramatic fjords.",
    "This country is in Northern Europe and borders Sweden and Finland.",
    "It's one of the world's largest oil exporters despite its small population.",
    "The northern third of this country lies above the Arctic Circle.",
    "The Northern Lights (Aurora Borealis) are frequently seen here."
  ]},
  {country:"India",     flag:"🇮🇳", clues:[
    "The suspect is in the world's most populous country as of 2023.",
    "This country has over 22 official languages and hundreds of dialects.",
    "The Himalayas form its northern border — including K2 and Kangchenjunga.",
    "The Taj Mahal — one of the Seven Wonders of the World — is here.",
    "This country invented chess and the number zero."
  ]},
  {country:"Canada",    flag:"🇨🇦", clues:[
    "The target is in the second largest country in the world by land area.",
    "This country has the longest coastline of any nation on Earth.",
    "It shares the world's longest undefended international border with the USA.",
    "Famous for maple syrup — it produces over 70% of the world's supply.",
    "Ice hockey is the national winter sport and a major cultural identity."
  ]},
  {country:"South Africa", flag:"🇿🇦", clues:[
    "The suspect is in a country at the southern tip of Africa.",
    "This country has 11 official languages — more than almost any other nation.",
    "It's the only country in the world to have voluntarily given up its nuclear weapons.",
    "Home to Kruger National Park — one of Africa's largest game reserves.",
    "Table Mountain overlooks its famous coastal city Cape Town."
  ]},
  {country:"Germany",   flag:"🇩🇪", clues:[
    "The target is in the most populous country in the European Union.",
    "This country reunified in 1990 after being divided for decades.",
    "It's the world's third largest exporter and home to brands like BMW, Volkswagen, and Siemens.",
    "Oktoberfest — the world's largest beer festival — is held here every year.",
    "The Rhine and Danube are its major rivers."
  ]},
  {country:"Mexico",    flag:"🇲🇽", clues:[
    "The suspect is in a country in North America that borders the USA to the north.",
    "This country is the birthplace of chocolate, tomatoes, and avocados.",
    "Home to over 30 UNESCO World Heritage Sites.",
    "The ancient Aztec empire had its capital where the modern capital stands today.",
    "It has coastlines on both the Pacific Ocean and the Gulf of Mexico."
  ]},
  // Medium — less obvious clues
  {country:"Turkey",    flag:"🇹🇷", clues:[
    "The target is in a country that spans two continents.",
    "A small part of this country is in Europe; most is in Asia.",
    "Istanbul — its largest city — was once known as Constantinople.",
    "The country borders both the Black Sea and the Mediterranean Sea.",
    "It has one of the world's earliest known human settlements: Çatalhöyük."
  ]},
  {country:"Peru",      flag:"🇵🇪", clues:[
    "The suspect was last seen near ancient ruins high in the Andes Mountains.",
    "This country contains part of the Amazon River — the world's largest by water flow.",
    "The Inca Empire had its capital in this country's modern capital.",
    "Lake Titicaca — the world's highest navigable lake — sits on its border.",
    "This country gave the world potatoes and quinoa."
  ]},
  {country:"Morocco",   flag:"🇲🇦", clues:[
    "The target is in an African country just 14 km from Europe across a strait.",
    "This country's mountain range — the Atlas Mountains — crosses its interior.",
    "It's the only African country not in the African Union (it rejoined in 2017).",
    "The city of Marrakech is famous for its ancient medina and the Djemaa el-Fna square.",
    "Argan oil — used worldwide in cosmetics — comes exclusively from this country."
  ]},
  {country:"New Zealand", flag:"🇳🇿", clues:[
    "The suspect is hiding in a nation of two main islands in the Pacific Ocean.",
    "This country was the first to give women the right to vote in 1893.",
    "The Lord of the Rings trilogy was filmed almost entirely here.",
    "It has more sheep than people — roughly 5 sheep per person.",
    "The indigenous Māori people make up about 16% of the population."
  ]},
  {country:"Saudi Arabia", flag:"🇸🇦", clues:[
    "The target is in the largest country in the Middle East.",
    "This country contains the two holiest cities in Islam: Mecca and Medina.",
    "It is the world's largest oil exporter.",
    "Women only gained the right to drive here in 2018.",
    "The country has no rivers — water comes from desalination and aquifers."
  ]},
  // Hard — subtle clues
  {country:"Kazakhstan", flag:"🇰🇿", clues:[
    "The target is in the world's largest landlocked country.",
    "This country in Central Asia was once part of the Soviet Union.",
    "The Baikonur Cosmodrome — where Yuri Gagarin launched from — is located here.",
    "The Aral Sea, which used to be in this country, is now mostly dry.",
    "It borders Russia, China, Kyrgyzstan, Uzbekistan, and Turkmenistan."
  ]},
  {country:"Colombia",  flag:"🇨🇴", clues:[
    "The suspect is in the only South American country with coastlines on both the Pacific and Caribbean.",
    "This country produces more cut flowers than any other nation except the Netherlands.",
    "It is named after Christopher Columbus.",
    "The coffee-growing region here is a UNESCO World Heritage Site.",
    "It borders Panama, Venezuela, Brazil, Peru, and Ecuador."
  ]},
  {country:"Vietnam",   flag:"🇻🇳", clues:[
    "The target is in a country shaped like the letter 'S' in Southeast Asia.",
    "This country has the world's largest cave: Hang Sơn Đoòng.",
    "It borders China to the north, and Laos and Cambodia to the west.",
    "This nation was unified in 1976 after a long war.",
    "It's the world's second largest exporter of coffee after Brazil."
  ]},
  {country:"Nigeria",   flag:"🇳🇬", clues:[
    "The suspect is in the most populous country in Africa.",
    "This country has over 250 ethnic groups and 500 languages.",
    "It's Africa's largest economy, driven largely by oil exports.",
    "Nollywood — the film industry here — is the world's second most prolific after Bollywood.",
    "The Niger River — Africa's third longest — flows through this country."
  ]},
  {country:"Iran",      flag:"🇮🇷", clues:[
    "The target is in a country that was called Persia until 1935.",
    "This country in the Middle East borders Iraq, Turkey, Pakistan, and Afghanistan.",
    "It has the world's second largest natural gas reserves.",
    "The country's main religion makes up over 90% of the population: Shia Islam.",
    "Ancient ruins of Persepolis — once capital of the Persian Empire — are here."
  ]},
];









const CAPITALS = {
  "Afghanistan":"Kabul","Albania":"Tirana","Algeria":"Algiers","Angola":"Luanda",
  "Argentina":"Buenos Aires","Armenia":"Yerevan","Australia":"Canberra","Austria":"Vienna",
  "Azerbaijan":"Baku","Bahrain":"Manama","Bangladesh":"Dhaka","Belarus":"Minsk",
  "Belgium":"Brussels","Belize":"Belmopan","Benin":"Porto-Novo","Bhutan":"Thimphu",
  "Bolivia":"Sucre","Bosnia & Herz.":"Sarajevo","Botswana":"Gaborone","Brazil":"Brasília",
  "Brunei":"Bandar Seri Begawan","Bulgaria":"Sofia","Burkina Faso":"Ouagadougou",
  "Burundi":"Gitega","Cambodia":"Phnom Penh","Cameroon":"Yaoundé","Canada":"Ottawa",
  "Cape Verde":"Praia","Central African Rep.":"Bangui","Chad":"N'Djamena","Chile":"Santiago",
  "China":"Beijing","Colombia":"Bogotá","Comoros":"Moroni","Congo":"Brazzaville",
  "Costa Rica":"San José","Croatia":"Zagreb","Cuba":"Havana","Cyprus":"Nicosia",
  "Czech Republic":"Prague","DR Congo":"Kinshasa","Denmark":"Copenhagen","Djibouti":"Djibouti",
  "Dominican Rep.":"Santo Domingo","Ecuador":"Quito","Egypt":"Cairo",
  "El Salvador":"San Salvador","Equatorial Guinea":"Malabo","Eritrea":"Asmara",
  "Eswatini":"Mbabane","Ethiopia":"Addis Ababa","Finland":"Helsinki","France":"Paris",
  "Gabon":"Libreville","Gambia":"Banjul","Georgia":"Tbilisi","Germany":"Berlin",
  "Ghana":"Accra","Greece":"Athens","Guatemala":"Guatemala City","Guinea":"Conakry",
  "Guinea-Bissau":"Bissau","Guyana":"Georgetown","Haiti":"Port-au-Prince",
  "Honduras":"Tegucigalpa","Hungary":"Budapest","Iceland":"Reykjavik","India":"New Delhi",
  "Indonesia":"Jakarta","Iran":"Tehran","Iraq":"Baghdad","Ireland":"Dublin",
  "Israel":"Jerusalem","Italy":"Rome","Ivory Coast":"Yamoussoukro","Jamaica":"Kingston",
  "Japan":"Tokyo","Jordan":"Amman","Kazakhstan":"Astana","Kenya":"Nairobi",
  "Kuwait":"Kuwait City","Kyrgyzstan":"Bishkek","Laos":"Vientiane","Latvia":"Riga",
  "Lebanon":"Beirut","Lesotho":"Maseru","Liberia":"Monrovia","Libya":"Tripoli",
  "Lithuania":"Vilnius","Luxembourg":"Luxembourg City","Madagascar":"Antananarivo",
  "Malawi":"Lilongwe","Malaysia":"Kuala Lumpur","Mali":"Bamako","Malta":"Valletta",
  "Mauritania":"Nouakchott","Mauritius":"Port Louis","Mexico":"Mexico City",
  "Moldova":"Chișinău","Mongolia":"Ulaanbaatar","Montenegro":"Podgorica","Morocco":"Rabat",
  "Mozambique":"Maputo","Myanmar":"Naypyidaw","Namibia":"Windhoek","Nepal":"Kathmandu",
  "Netherlands":"Amsterdam","New Zealand":"Wellington","Nicaragua":"Managua",
  "Niger":"Niamey","Nigeria":"Abuja","North Korea":"Pyongyang","North Macedonia":"Skopje",
  "Norway":"Oslo","Oman":"Muscat","Pakistan":"Islamabad","Panama":"Panama City",
  "Paraguay":"Asunción","Peru":"Lima","Philippines":"Manila","Poland":"Warsaw",
  "Portugal":"Lisbon","Qatar":"Doha","Romania":"Bucharest","Russia":"Moscow",
  "Rwanda":"Kigali","Saudi Arabia":"Riyadh","Senegal":"Dakar","Serbia":"Belgrade",
  "Sierra Leone":"Freetown","Singapore":"Singapore","Slovakia":"Bratislava",
  "Slovenia":"Ljubljana","Somalia":"Mogadishu","South Africa":"Pretoria",
  "South Korea":"Seoul","South Sudan":"Juba","Spain":"Madrid",
  "Sri Lanka":"Sri Jayawardenepura Kotte","Sudan":"Khartoum","Sweden":"Stockholm",
  "Switzerland":"Bern","Syria":"Damascus","Taiwan":"Taipei","Tajikistan":"Dushanbe",
  "Tanzania":"Dodoma","Thailand":"Bangkok","Togo":"Lomé","Trinidad & Tobago":"Port of Spain",
  "Tunisia":"Tunis","Turkey":"Ankara","Turkmenistan":"Ashgabat","UAE":"Abu Dhabi",
  "Uganda":"Kampala","UK":"London","Ukraine":"Kyiv","Uruguay":"Montevideo",
  "USA":"Washington D.C.","Uzbekistan":"Tashkent","Venezuela":"Caracas","Vietnam":"Hanoi",
  "Yemen":"Sanaa","Zambia":"Lusaka","Zimbabwe":"Harare","Kosovo":"Pristina",
  "Andorra":"Andorra la Vella","San Marino":"San Marino","Monaco":"Monaco",
  "Liechtenstein":"Vaduz","Vatican City":"Vatican City","Maldives":"Malé",
  "Timor-Leste":"Dili","Suriname":"Paramaribo","Saint Lucia":"Castries",
  "Antigua & Barbuda":"Saint John's","Bahamas":"Nassau","Barbados":"Bridgetown",
  "Dominica":"Roseau","Grenada":"Saint George's","Estonia":"Tallinn","Fiji":"Suva",
  "Papua New Guinea":"Port Moresby","Solomon Islands":"Honiara","Vanuatu":"Port Vila",
  "Samoa":"Apia","Tonga":"Nuku'alofa","Kiribati":"South Tarawa","Tuvalu":"Funafuti",
  "Nauru":"Yaren","Palau":"Ngerulmud","Marshall Islands":"Majuro","Micronesia":"Palikir",
  "Saint Kitts & Nevis":"Basseterre","St. Vincent & Gren.":"Kingstown",
  "Palestine":"Ramallah"
};

const QCONTINENTS = {
  europe:["Albania","Andorra","Austria","Belarus","Belgium","Bosnia & Herz.","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Moldova","Monaco","Montenegro","Netherlands","North Macedonia","Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","UK","Ukraine","Vatican City"],
  asia:["Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia","China","Georgia","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Laos","Lebanon","Malaysia","Maldives","Mongolia","Myanmar","Nepal","North Korea","Oman","Pakistan","Palestine","Philippines","Qatar","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Taiwan","Tajikistan","Thailand","Timor-Leste","Turkey","Turkmenistan","UAE","Uzbekistan","Vietnam","Yemen"],
  africa:["Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cameroon","Cape Verde","Central African Rep.","Chad","Comoros","Congo","DR Congo","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Ivory Coast","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","Senegal","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe"],
  americas:["Antigua & Barbuda","Argentina","Bahamas","Barbados","Belize","Bolivia","Brazil","Canada","Chile","Colombia","Costa Rica","Cuba","Dominica","Dominican Rep.","Ecuador","El Salvador","Grenada","Guatemala","Guyana","Haiti","Honduras","Jamaica","Mexico","Nicaragua","Panama","Paraguay","Peru","Saint Kitts & Nevis","Saint Lucia","St. Vincent & Gren.","Suriname","Trinidad & Tobago","Uruguay","USA","Venezuela"],
  oceania:["Australia","Fiji","Kiribati","Marshall Islands","Micronesia","Nauru","New Zealand","Palau","Papua New Guinea","Samoa","Solomon Islands","Tonga","Tuvalu","Vanuatu"]
};

function qPool(region){
  if(!region||region==='all') return [...COUNTRIES];
  return COUNTRIES.filter(function(c){ return (QCONTINENTS[region]||[]).indexOf(c.n)>=0; });
}

// Curated difficulty pools — by country recognition, not population
var DIFF_EASY=new Set(['USA','Canada','Brazil','Russia','China','India','Australia','France','Germany','Italy','Spain','UK','Japan','Mexico','Egypt','South Africa','Argentina','Turkey','Saudi Arabia','South Korea','Thailand','Nigeria','Indonesia','Sweden','Norway','Poland','Netherlands','Greece','Switzerland','Portugal','Colombia','Peru','Chile','Cuba','Morocco','Kenya','Israel','Ireland','New Zealand','Denmark','Finland','Austria','Belgium','Ukraine','Iraq','Iran','Pakistan','Vietnam','Philippines','Malaysia','North Korea','Venezuela','Czech Republic']);

var DIFF_MEDIUM=new Set(['Croatia','Serbia','Hungary','Romania','Bulgaria','Slovakia','Slovenia','Tunisia','Senegal','Ghana','Tanzania','Ethiopia','Angola','Mozambique','Madagascar','Cameroon','Algeria','Libya','Nepal','Bangladesh','Myanmar','Cambodia','Laos','Sri Lanka','Jordan','Lebanon','Syria','Oman','UAE','Qatar','Kuwait','Georgia','Azerbaijan','Armenia','Mongolia','Kazakhstan','Uzbekistan','Uruguay','Paraguay','Ecuador','Bolivia','Guatemala','Honduras','Panama','Costa Rica','Dominican Rep.','Jamaica','Haiti','Trinidad and Tobago','Iceland','Taiwan','Singapore','Cyprus','Malta','Luxembourg','Bahrain','North Macedonia','Montenegro','Bosnia & Herz.','Albania','Moldova','Belarus','Lithuania','Latvia','Estonia','Sudan','DR Congo','Uganda','Rwanda','Zambia','Zimbabwe','Botswana','Namibia']);

var DIFF_HARD=new Set(['Fiji','Samoa','Tonga','Maldives','Mauritius','Seychelles','Comoros','Cape Verde','Sao Tome and Principe','Kiribati','Nauru','Tuvalu','Palau','Marshall Islands','Micronesia','Solomon Islands','Vanuatu','Barbados','Grenada','Saint Lucia','Saint Kitts and Nevis','Saint Vincent','Dominica','Antigua and Barbuda','Bahamas','Bhutan','Brunei','East Timor','Djibouti','Eritrea','Gambia','Guinea-Bissau','Lesotho','Eswatini','Burundi','Togo','Benin','Equatorial Guinea','Central African Rep.','Chad','Niger','Mali','Burkina Faso','Sierra Leone','Liberia','Guinea','Gabon','Congo','South Sudan','Somalia','Turkmenistan','Tajikistan','Kyrgyzstan','Liechtenstein','Andorra','Monaco','San Marino','Kosovo','Suriname','Guyana','Belize','El Salvador','Nicaragua','Papua New Guinea','Laos','Mauritania','Malawi']);

function buildDiffPool(allPool, diff){
  var primary, secondary, tertiary;
  if(diff==='easy'){
    primary=allPool.filter(function(c){return DIFF_EASY.has(c.n);});
    secondary=allPool.filter(function(c){return DIFF_MEDIUM.has(c.n);});
    tertiary=[];
  } else if(diff==='hard'){
    primary=allPool.filter(function(c){return DIFF_HARD.has(c.n);});
    secondary=allPool.filter(function(c){return DIFF_MEDIUM.has(c.n);});
    tertiary=allPool.filter(function(c){return DIFF_EASY.has(c.n);});
  } else {
    // Medium = easy + medium countries
    primary=allPool.filter(function(c){return DIFF_EASY.has(c.n)||DIFF_MEDIUM.has(c.n);});
    secondary=allPool.filter(function(c){return DIFF_HARD.has(c.n);});
    tertiary=[];
  }
  // Build pool: primary first, fill with secondary if needed, then tertiary
  var pool=shuffle(primary);
  if(pool.length<allPool.length){
    var extra=shuffle(secondary);
    pool=pool.concat(extra);
  }
  if(tertiary.length>0&&pool.length<allPool.length){
    pool=pool.concat(shuffle(tertiary));
  }
  if(pool.length<4) pool=shuffle(allPool);
  return pool;
}

var cS={mode:'mc',region:'all'};

function launchCapitals(){
  showScreen('cap-setup');
  var el;
  el=document.getElementById('cap-lbl-mode'); if(el) el.textContent=T.capMode||'GAME MODE';
  el=document.getElementById('cap-lbl-region'); if(el) el.textContent=T.capRegion||'REGION';
  el=document.getElementById('cap-lbl-questions'); if(el) el.textContent=T.capQuestions||'QUESTIONS';
  el=document.getElementById('cap-lbl-start'); if(el) el.textContent=T.capStart||'Start Quiz →';
  el=document.getElementById('cbtn-mc'); if(el){var s=el.querySelector('.setup-mode-name');if(s)s.textContent=T.capMC||'Multiple Choice';else el.textContent=T.capMC||'Multiple Choice';}
  el=document.getElementById('cbtn-type'); if(el){var s=el.querySelector('.setup-mode-name');if(s)s.textContent=T.capType||'Type Answer';else el.textContent=T.capType||'Type Answer';}
  el=document.getElementById('cap-setup-badge'); if(el) el.textContent=T.capBadge||'Capitals';
  el=document.getElementById('cap-game-badge'); if(el) el.textContent=T.capBadge||'Capitals';
  if(T.capRegs) document.querySelectorAll('[data-capreg]').forEach(function(b){
    var r=b.dataset.capreg;if(!T.capRegs[r])return;var svg=b.querySelector('svg');if(svg){var clone=svg.cloneNode(true);b.textContent=T.capRegs[r];b.prepend(clone);b.insertBefore(document.createTextNode(' '),clone.nextSibling);}else b.textContent=T.capRegs[r];
  });
  // Translate difficulty buttons
  el=document.getElementById('cdiff-easy');if(el){var n=el.querySelector('.diff-name');if(n)n.textContent=T.diffEasy||'Easy';}
  el=document.getElementById('cdiff-medium');if(el){var n=el.querySelector('.diff-name');if(n)n.textContent=T.diffMedium||'Medium';}
  el=document.getElementById('cdiff-hard');if(el){var n=el.querySelector('.diff-name');if(n)n.textContent=T.diffHard||'Hard';}
}

function capMode(m){
  cS.mode=m;
  ['mc','type'].forEach(function(x){
    var b=document.getElementById('cbtn-'+x);
    if(!b) return;
    b.classList.toggle('active-blue', x===m);
  });
}

function capRegion(r,btn){
  cS.region=r;
  ['all','europe','asia','africa','americas','oceania'].forEach(function(x){
    var b=document.getElementById('creg-'+x);
    if(!b) return;
    b.classList.toggle('active-blue', x===r);
  });
  var pool=qPool(r).filter(function(c){ return CAPITALS[c.n]; });
  var sl=document.getElementById('cap-slider');
  if(sl){
    sl.max=pool.length;
    var newVal=Math.min(parseInt(sl.value),pool.length);
    sl.value=newVal;
    document.getElementById('cap-count').textContent=newVal;
    var mx=document.getElementById('cap-slider-max'); if(mx) mx.textContent=pool.length;
  }
}

function capSlider(v){
  var pool=qPool(cS.region).filter(function(c){ return CAPITALS[c.n]; });
  document.getElementById('cap-count').textContent=Math.min(parseInt(v),pool.length);
}

function capDifficulty(d){
  cS.difficulty=d;
  ['easy','medium','hard'].forEach(function(x){
    var b=document.getElementById('cdiff-'+x); if(!b) return;
    b.classList.toggle('active-blue', x===d);
  });
}
function capStart(){
  var allPool=qPool(cS.region).filter(function(c){ return CAPITALS[c.n]; });
  var diff=cS.difficulty||'medium';
  var pool=buildDiffPool(allPool,diff);
  var sl=document.getElementById('cap-slider');
  var count=Math.min(parseInt(sl?sl.value:20),pool.length);
  cS.pool=pool.slice(0,count); cS.total=count; cS.round=0; cS.score=0; cS.streak=0;
  cS.diffMult=diff==='hard'?1.5:1.0;
  try{achTrack('capRegions',cS.region);}catch(e){}
  document.getElementById('cap-next').style.display='none';
  showScreen('cap'); capRound();
}

function capRound(){
  if(cS.round>=cS.total){ quizShowGameOver('cap',cS); return; }
  var q=cS.pool[cS.round]; cS.current=q; cS.answer=CAPITALS[q.n];
  document.getElementById('cap-prog-lbl').textContent=(cS.round+1)+'/'+cS.total;
  document.getElementById('cap-prog').style.width=(cS.round/cS.total*100)+'%';
  document.getElementById('cap-feedback').textContent='';
  document.getElementById('cap-next').style.display='none';
  var skipBtn=document.getElementById('cap-skip'); if(skipBtn){ if(cS.mode==='mc'){ skipBtn.style.display='none'; } else { skipBtn.disabled=false; skipBtn.style.display=''; var skipLbl={en:'⏭ Skip',de:'⏭ Überspringen',fr:'⏭ Passer',es:'⏭ Saltar'}[curLang]||'⏭ Skip'; skipBtn.textContent=skipLbl; } }
  var capQ={en:'What is the capital of',de:'Was ist die Hauptstadt von',fr:'Quelle est la capitale de',es:'¿Cuál es la capital de'}[curLang]||'What is the capital of';
  document.getElementById('cap-q').innerHTML=capQ+' <strong>'+sanitize(countryName(q.n))+'</strong> '+flagImg(q.f,'1.3rem')+'?';
  var mcEl=document.getElementById('cap-mc-opts');
  var typeEl=document.getElementById('cap-type-wrap');
  if(cS.mode==='mc'){
    mcEl.style.display='grid'; typeEl.style.display='none';
    var others=Object.values(CAPITALS).filter(function(c){ return c!==cS.answer; });
    var opts=shuffle([cS.answer].concat(shuffle(others).slice(0,3)));
    mcEl.innerHTML='';
    opts.forEach(function(opt){
      var btn=document.createElement('button');
      btn.textContent=opt;
      btn.style.cssText='padding:16px 12px;border-radius:12px;background:var(--ink2);border:1.5px solid var(--border);cursor:pointer;font-size:.9rem;font-weight:700;color:var(--text);font-family:inherit;width:100%';
      btn.onclick=function(){ capAnswer(opt,btn); };
      mcEl.appendChild(btn);
    });
  } else {
    mcEl.style.display='none'; typeEl.style.display='flex';
    var inp=document.getElementById('cap-inp');
    inp.value=''; inp.style.borderColor='var(--border)'; inp.disabled=false;
    inp.placeholder={en:'Type the capital city...',de:'Hauptstadt eingeben...',fr:'Tapez la capitale...',es:'Escribe la capital...'}[curLang]||'Type the capital city...';
    setTimeout(function(){ inp.focus(); },100);
  }
  cS.round++;
}

function showNextBtn(id){
  var btn=document.getElementById(id);
  if(!btn)return;
  btn.style.display='block';
  btn.textContent={en:'Next →',de:'Weiter →',fr:'Suivant →',es:'Siguiente →'}[curLang]||'Next →';
}

function capAnswer(ans,btn){
  document.querySelectorAll('#cap-mc-opts button').forEach(function(b){
    b.disabled=true;
    if(b.textContent===cS.answer){ b.style.borderColor='var(--lime)'; b.style.background='rgba(200,241,53,.1)'; b.style.color='var(--lime)'; }
    else if(b.textContent===ans&&ans!==cS.answer){ b.style.borderColor='var(--rose)'; b.style.opacity='.5'; }
  });
  var capOk=(ans===cS.answer);
  if(capOk){
    cS.score++; cS.streak=(cS.streak||0)+1;
    var bonus=cS.streak>=10?8:cS.streak>=5?4:cS.streak>=3?2:0;
    var diffMult=cS.diffMult||1.0;
    try{awardXP(Math.round((5+bonus)*diffMult));}catch(e){}
    try{achTrack('capCorrect',1);}catch(e){}
    if(bonus>0) showToast('🔥 Streak '+cS.streak+'! +'+bonus+' bonus XP');
    try{GeoAudio.playSFX(cS.streak>1?'streak':'correct');}catch(e){}
  } else { cS.streak=0; try{GeoAudio.playSFX('wrong');}catch(e){} }
  capComboHUD();
  var capCorrectMsg={en:'✓ Correct!',de:'✓ Richtig!',fr:'✓ Correct!',es:'✓ ¡Correcto!'}[curLang]||'✓ Correct!';
  var capWrongPfx={en:'✗ Answer: ',de:'✗ Antwort: ',fr:'✗ Réponse : ',es:'✗ Respuesta: '}[curLang]||'✗ Answer: ';
  document.getElementById('cap-feedback').textContent=capOk?capCorrectMsg:capWrongPfx+cS.answer;
  document.getElementById('cap-feedback').style.color=capOk?'var(--lime)':'var(--rose)';
  var skipBtn=document.getElementById('cap-skip'); if(skipBtn) skipBtn.style.display='none';
  setTimeout(function(){ capNext(); }, capOk?500:1200);
}

function capAutoComplete(){
  var inp=document.getElementById('cap-inp');
  var list=document.getElementById('cap-suggestions');
  var val=inp.value.toLowerCase().trim();
  if(val.length<2||inp.disabled){list.classList.remove('show');return;}
  var allCaps=[];var seen={};
  Object.values(CAPITALS).forEach(function(c){if(!seen[c]){seen[c]=1;allCaps.push(c);}});
  var matches=allCaps.filter(function(c){
    var cl=c.toLowerCase();
    var ratio=val.length/cl.length;
    return ratio>=0.75&&(cl.startsWith(val)||cl.includes(val));
  }).slice(0,6);
  if(matches.length===0){list.classList.remove('show');return;}
  list.innerHTML='';
  matches.forEach(function(c){
    var item=document.createElement('div');
    item.className='bdr-suggest-item';
    item.textContent=c;
    item.onclick=function(){inp.value=c;list.classList.remove('show');capTypeSubmit();};
    list.appendChild(item);
  });
  list.classList.add('show');
}
document.addEventListener('click',function(e){if(!e.target.closest('#cap-type-wrap')){var l=document.getElementById('cap-suggestions');if(l)l.classList.remove('show');}});

function capTypeSubmit(){
  var inp=document.getElementById('cap-inp');
  if(!inp||!inp.value.trim()) return;
  inp.disabled=true;
  document.getElementById('cap-suggestions').classList.remove('show');
  var typed=inp.value.trim();
  var ok=fuzzyMatch(typed,cS.answer);
  inp.style.borderColor=ok?'var(--lime)':'var(--rose)';
  if(ok){
    cS.score++; cS.streak=(cS.streak||0)+1;
    var bonus=cS.streak>=10?8:cS.streak>=5?4:cS.streak>=3?2:0;
    var diffMult=cS.diffMult||1.0;
    try{awardXP(Math.round((5+bonus)*diffMult));}catch(e){}
    try{achTrack('capCorrect',1);}catch(e){}
    if(bonus>0) showToast('🔥 Streak '+cS.streak+'! +'+bonus+' bonus XP');
    try{GeoAudio.playSFX(cS.streak>1?'streak':'correct');}catch(e){}
  } else { cS.streak=0; try{GeoAudio.playSFX('wrong');}catch(e){} }
  capComboHUD();
  var capCorrectMsg={en:'✓ Correct!',de:'✓ Richtig!',fr:'✓ Correct!',es:'✓ ¡Correcto!'}[curLang]||'✓ Correct!';
  var capWrongPfx={en:'✗ Answer: ',de:'✗ Antwort: ',fr:'✗ Réponse : ',es:'✗ Respuesta: '}[curLang]||'✗ Answer: ';
  document.getElementById('cap-feedback').textContent=ok?capCorrectMsg:capWrongPfx+cS.answer;
  document.getElementById('cap-feedback').style.color=ok?'var(--lime)':'var(--rose)';
  var skipBtn=document.getElementById('cap-skip'); if(skipBtn) skipBtn.style.display='none';
  setTimeout(function(){ capNext(); }, ok?500:1200);
}

function capComboHUD(){
  var p=document.getElementById('cap-combo-pill');
  if(!p) return;
  if((cS.streak||0)>=3){ p.style.display=''; p.textContent='🔥 '+cS.streak+' streak'; }
  else { p.style.display='none'; }
}
function capNext(){ capRound(); }

function capSkip(){
  capRound(); // just go straight to next question
}

var fS={mode:'ftc',answerMode:'mc',region:'all'}; // mode always ftc

function launchFlags(){
  showScreen('flg-setup');
  var el;
  el=document.getElementById('flg-lbl-mode'); if(el) el.textContent=T.flgMode||'GAME MODE';
  el=document.getElementById('flg-lbl-region'); if(el) el.textContent=T.flgRegion||'REGION';
  el=document.getElementById('flg-lbl-questions'); if(el) el.textContent=T.flgQuestions||'QUESTIONS';
  el=document.getElementById('flg-lbl-start'); if(el) el.textContent=T.flgStart||'Start Quiz →';
  el=document.getElementById('fbtn-ftc'); if(el) el.textContent=T.flgFTC||'Flag → Country';
  el=document.getElementById('fbtn-ctf'); if(el) el.textContent=T.flgCTF||'Country → Flag';
  el=document.getElementById('flg-lbl-answer'); if(el) el.textContent=T.flgAnswerMode||'ANSWER MODE';
  el=document.getElementById('fbtn-mc'); if(el){var s=el.querySelector('.setup-mode-name');if(s)s.textContent=T.flgMC||'Multiple Choice';else el.textContent=T.flgMC||'Multiple Choice';}
  el=document.getElementById('fbtn-type'); if(el){var s=el.querySelector('.setup-mode-name');if(s)s.textContent=T.flgType||'Type Answer';else el.textContent=T.flgType||'Type Answer';}
  el=document.getElementById('flg-setup-badge'); if(el) el.textContent=T.flgBadge||'Flags';
  el=document.getElementById('flg-game-badge'); if(el) el.textContent=T.flgBadge||'Flags';
  el=document.getElementById('flg-type-btn'); if(el) el.textContent=T.flgSubmit||'Submit →';
  if(T.flgRegs) document.querySelectorAll('[data-flgreg]').forEach(function(b){
    var r=b.dataset.flgreg;if(!T.flgRegs[r])return;var svg=b.querySelector('svg');if(svg){var clone=svg.cloneNode(true);b.textContent=T.flgRegs[r];b.prepend(clone);b.insertBefore(document.createTextNode(' '),clone.nextSibling);}else b.textContent=T.flgRegs[r];
  });
  // Translate difficulty buttons
  el=document.getElementById('fdiff-easy');if(el){var n=el.querySelector('.diff-name');if(n)n.textContent=T.diffEasy||'Easy';}
  el=document.getElementById('fdiff-medium');if(el){var n=el.querySelector('.diff-name');if(n)n.textContent=T.diffMedium||'Medium';}
  el=document.getElementById('fdiff-hard');if(el){var n=el.querySelector('.diff-name');if(n)n.textContent=T.diffHard||'Hard';}
}

function flgMode(m){
  fS.mode=m;
  ['ftc','ctf'].forEach(function(x){
    var b=document.getElementById('fbtn-'+x);
    if(!b) return;
    if(x===m){ b.style.borderColor='var(--orange)'; b.style.background='rgba(255,107,53,.08)'; b.style.color='var(--orange)'; }
    else { b.style.borderColor='var(--border)'; b.style.background='var(--ink3)'; b.style.color='var(--text)'; }
  });
}

function flgAnswerMode(m){
  fS.answerMode=m;
  ['mc','type'].forEach(function(x){
    var b=document.getElementById('fbtn-'+x);
    if(!b) return;
    b.classList.toggle('active-orange', x===m);
  });
}

function flgRegion(r,btn){
  fS.region=r;
  ['all','europe','asia','africa','americas','oceania'].forEach(function(x){
    var b=document.getElementById('freg-'+x);
    if(!b) return;
    b.classList.toggle('active-orange', x===r);
  });
  var pool=qPool(r);
  var sl=document.getElementById('flg-slider');
  if(sl){
    sl.max=pool.length;
    var newVal=Math.min(parseInt(sl.value),pool.length);
    sl.value=newVal;
    document.getElementById('flg-count').textContent=newVal;
    var mx=document.getElementById('flg-slider-max'); if(mx) mx.textContent=pool.length;
  }
}

function flgSlider(v){
  document.getElementById('flg-count').textContent=Math.min(parseInt(v),qPool(fS.region).length);
}

function flgDifficulty(d){
  fS.difficulty=d;
  ['easy','medium','hard'].forEach(function(x){
    var b=document.getElementById('fdiff-'+x); if(!b) return;
    b.classList.toggle('active-orange', x===d);
  });
}
function flgStart(){
  var allPool=qPool(fS.region);
  var diff=fS.difficulty||'medium';
  var pool=buildDiffPool(allPool,diff);
  var sl=document.getElementById('flg-slider');
  var count=Math.min(parseInt(sl?sl.value:20),pool.length);
  // Ensure no duplicate countries in the pool
  var seen=new Set(); var uniquePool=[];
  for(var pi=0;pi<pool.length;pi++){if(!seen.has(pool[pi].n)){seen.add(pool[pi].n);uniquePool.push(pool[pi]);}}
  fS.pool=uniquePool.slice(0,count); fS.allPool=[].concat(uniquePool); fS.total=Math.min(count,fS.pool.length); fS.round=0; fS.score=0; fS.streak=0;
  fS.diffMult=diff==='hard'?1.5:1.0;
  document.getElementById('flg-next').style.display='none';
  showScreen('flg'); flgRound();
}

// ── Similar flag confusers ──────────────────────────────────────────────────
const FLAG_CONFUSERS = {
  'Indonesia':['Poland','Monaco','Singapore'],
  'Poland':['Indonesia','Monaco'],
  'Monaco':['Indonesia','Poland'],
  'Romania':['Chad','Moldova','Andorra'],
  'Chad':['Romania','Moldova'],
  'Moldova':['Romania','Chad'],
  'Ireland':['Ivory Coast','Italy'],
  'Ivory Coast':['Ireland','Italy'],
  'Italy':['Ireland','Ivory Coast','Mexico'],
  'France':['Netherlands','Luxembourg','Romania'],
  'Netherlands':['France','Luxembourg','Russia'],
  'Luxembourg':['Netherlands','France'],
  'Russia':['Netherlands','France','Serbia'],
  'Serbia':['Russia','Slovakia','Slovenia','Croatia'],
  'Slovakia':['Slovenia','Serbia','Russia'],
  'Slovenia':['Slovakia','Serbia','Czech Republic'],
  'Croatia':['Serbia','Netherlands','Paraguay'],
  'Australia':['New Zealand','UK','Fiji'],
  'New Zealand':['Australia','UK','Fiji'],
  'Colombia':['Ecuador','Venezuela','Romania'],
  'Ecuador':['Colombia','Venezuela'],
  'Venezuela':['Colombia','Ecuador'],
  'Mali':['Senegal','Guinea','Cameroon'],
  'Senegal':['Mali','Guinea','Cameroon'],
  'Guinea':['Mali','Senegal'],
  'Cameroon':['Senegal','Mali','Guinea'],
  'India':['Niger','Ireland'],
  'Niger':['India','Nigeria'],
  'Nigeria':['Niger','India'],
  'Mexico':['Italy','Hungary'],
  'Hungary':['Italy','Tajikistan','Bulgaria'],
  'Bulgaria':['Hungary','Russia'],
  'Norway':['Iceland','France'],
  'Iceland':['Norway','Australia','UK'],
  'Sweden':['Finland','Denmark'],
  'Finland':['Sweden','Denmark'],
  'Denmark':['Norway','Switzerland'],
  'Argentina':['Uruguay','Honduras','El Salvador'],
  'Uruguay':['Argentina','Greece'],
  'Turkey':['Tunisia','Singapore'],
  'Tunisia':['Turkey','Singapore'],
  'Singapore':['Turkey','Indonesia','Tunisia'],
  'Bahrain':['Qatar','UAE'],
  'Qatar':['Bahrain'],
  'Thailand':['Costa Rica','Cambodia'],
  'Costa Rica':['Thailand','North Korea'],
  'Japan':['Bangladesh','Palau'],
  'Bangladesh':['Japan','Palau'],
  'Palau':['Japan','Bangladesh'],
  'China':['Vietnam','Morocco'],
  'Vietnam':['China'],
  'Morocco':['China','Vietnam'],
  'Pakistan':['Turkey','Algeria'],
  'Algeria':['Pakistan','Nigeria'],
  'Lebanon':['Austria','Canada'],
  'Austria':['Lebanon','Latvia','Indonesia'],
  'Latvia':['Austria','Lebanon'],
  'Greece':['Uruguay'],
  'South Korea':['Laos','North Korea'],
  'North Korea':['South Korea','Laos'],
  'Laos':['North Korea','Thailand','Cambodia'],
  'Cambodia':['Laos','Thailand'],
  'Ghana':['Ethiopia','Bolivia'],
  'Ethiopia':['Ghana','Bolivia'],
  'Bolivia':['Ghana','Ethiopia'],
  'Egypt':['Syria','Iraq','Yemen'],
  'Syria':['Egypt','Iraq','Yemen'],
  'Iraq':['Egypt','Syria','Yemen'],
  'Yemen':['Egypt','Syria','Iraq'],
  'Liberia':['USA','Malaysia'],
  'Malaysia':['USA','Liberia'],
  'USA':['Liberia','Malaysia'],
};

function pickConfuserFlags(correct, pool) {
  var confusers = FLAG_CONFUSERS[correct.n] || [];
  var picked = [];
  var used = new Set([correct.n]);
  // First try to include confuser countries
  for (var i = 0; i < confusers.length && picked.length < 3; i++) {
    var c = pool.find(function(p) { return p.n === confusers[i] && !used.has(p.n); });
    if (c) { picked.push(c); used.add(c.n); }
  }
  // Fill remaining with random countries
  var remaining = shuffle(pool.filter(function(c) { return !used.has(c.n); }));
  for (var j = 0; j < remaining.length && picked.length < 3; j++) {
    picked.push(remaining[j]);
  }
  return picked;
}

function flgRound(){
  if(fS.round>=fS.total){ quizShowGameOver('flg',fS); return; }
  var q=fS.pool[fS.round]; fS.current=q;
  document.getElementById('flg-prog-lbl').textContent=(fS.round+1)+'/'+fS.total;
  document.getElementById('flg-prog').style.width=(fS.round/fS.total*100)+'%';
  document.getElementById('flg-next').style.display='none';
  document.getElementById('flg-feedback').textContent='';
  var optsEl=document.getElementById('flg-opts');
  var typeEl=document.getElementById('flg-type-wrap');
  var isType=(fS.answerMode==='type');
  optsEl.style.display=isType?'none':'grid';
  typeEl.style.display=isType?'flex':'none';
  var skipBtn=document.getElementById('flg-skip');
  if(skipBtn){ 
    skipBtn.style.display=isType?'block':'none';
    skipBtn.disabled=false;
    var skipLbl={en:'⏭ Skip',de:'⏭ Überspringen',fr:'⏭ Passer',es:'⏭ Saltar'}[curLang]||'⏭ Skip';
    skipBtn.textContent=skipLbl;
  }
  // Pick confusing wrong answers — prefer similar-looking flags
  var wrongs=pickConfuserFlags(q, fS.allPool);
  var opts=shuffle([q].concat(wrongs));
  if(fS.mode==='ftc'){
    document.getElementById('flg-display').innerHTML=flagImg(q.f,'10rem');
    document.getElementById('flg-display').style.display='block';
    document.getElementById('flg-q').textContent=T.flgQFTC||'Which country does this flag belong to?';
    if(isType){
      var inp=document.getElementById('flg-inp');
      inp.value=''; inp.disabled=false; inp.style.borderColor='var(--border)';
      inp.placeholder={en:'Type the country name...',de:'Ländernamen eingeben...',fr:'Tapez le nom du pays...',es:'Escribe el nombre del país...'}[curLang]||'Type the country name...';
      setTimeout(function(){ inp.focus(); },100);
    } else {
      optsEl.innerHTML='';
      opts.forEach(function(opt){
        var btn=document.createElement('button');
        btn.textContent=countryName(opt.n);
        btn.dataset.country=opt.n;
        btn.style.cssText='padding:14px 10px;border-radius:12px;background:var(--ink2);border:1.5px solid var(--border);cursor:pointer;font-size:.85rem;font-weight:700;color:var(--text);font-family:inherit;width:100%';
        btn.onclick=function(){ flgAnswer(opt.n===q.n,btn,q.n); };
        optsEl.appendChild(btn);
      });
    }
  } else {
    document.getElementById('flg-display').style.display='none';
    document.getElementById('flg-q').textContent=(T.flgQCTF||'Which flag belongs to')+' '+countryName(q.n)+'?';
    if(isType){
      var inp=document.getElementById('flg-inp');
      inp.value=''; inp.disabled=false; inp.style.borderColor='var(--border)';
      inp.placeholder={en:'Type the country name...',de:'Ländernamen eingeben...',fr:'Tapez le nom du pays...',es:'Escribe el nombre del país...'}[curLang]||'Type the country name...';
      setTimeout(function(){ inp.focus(); },100);
    } else {
      optsEl.innerHTML='';
      opts.forEach(function(opt){
        var btn=document.createElement('button');
        btn.innerHTML=flagImg(opt.f,'3rem');
        btn.dataset.country=opt.n;
        btn.style.cssText='padding:14px;border-radius:12px;background:var(--ink2);border:1.5px solid var(--border);cursor:pointer;font-family:inherit;width:100%;display:flex;align-items:center;justify-content:center';
        btn.onclick=function(){ flgAnswer(opt.n===q.n,btn,q.n); };
        optsEl.appendChild(btn);
      });
    }
  }
  fS.round++;
}

function flgAutoComplete(){
  var inp=document.getElementById('flg-inp');
  var list=document.getElementById('flg-suggestions');
  var val=inp.value.toLowerCase().trim();
  if(val.length<2||inp.disabled){list.classList.remove('show');return;}
  var pool=ALL_WORLD_COUNTRIES.map(function(c){
    var displayName=(c.names&&c.names[curLang])?c.names[curLang]:c.n;
    return {en:c.n,display:displayName};
  });
  var matches=pool.filter(function(c){
    var dl=c.display.toLowerCase();
    var el=c.en.toLowerCase();
    var bestLen=Math.min(dl.length,el.length);
    var ratio=val.length/bestLen;
    return ratio>=0.75&&(dl.startsWith(val)||el.startsWith(val)||dl.includes(val));
  }).slice(0,6);
  if(matches.length===0){list.classList.remove('show');return;}
  list.innerHTML='';
  matches.forEach(function(c){
    var item=document.createElement('div');
    item.className='bdr-suggest-item';
    item.textContent=c.display;
    item.onclick=function(){inp.value=c.display;list.classList.remove('show');flgTypeSubmit();};
    list.appendChild(item);
  });
  list.classList.add('show');
}
document.addEventListener('click',function(e){if(!e.target.closest('#flg-type-wrap')){var l=document.getElementById('flg-suggestions');if(l)l.classList.remove('show');}});

function flgTypeSubmit(){
  var inp=document.getElementById('flg-inp');
  if(!inp||!inp.value.trim()) return;
  inp.disabled=true;
  document.getElementById('flg-suggestions').classList.remove('show');
  var q=fS.current;
  var typed=inp.value.trim();
  // Accept EN name + translated name via ALL_WORLD_COUNTRIES lookup
  var variants=[q.n];
  var wc=ALL_WORLD_COUNTRIES.find(function(c){ return c.n===q.n; });
  if(wc&&wc.names&&wc.names[curLang]) variants.push(wc.names[curLang]);
  var ok=variants.some(function(v){ return fuzzyMatch(typed,v); });
  inp.style.borderColor=ok?'var(--lime)':'var(--rose)';
  if(ok){
    fS.score++; fS.streak=(fS.streak||0)+1;
    var fBonus=fS.streak>=10?8:fS.streak>=5?4:fS.streak>=3?2:0;
    var fDiffMult=fS.diffMult||1.0;
    try{awardXP(Math.round((5+fBonus)*fDiffMult));}catch(e){}
    try{achTrack('flgCorrect',1);achTrack('flgUnique',q.n);}catch(e){}
    if(fBonus>0) showToast('🔥 Streak '+fS.streak+'! +'+fBonus+' bonus XP');
    try{GeoAudio.playSFX(fS.streak>1?'streak':'correct');}catch(e){}
  } else { fS.streak=0; try{GeoAudio.playSFX('wrong');}catch(e){} }
  flgComboHUD();
  var correctMsg={en:'✓ Correct!',de:'✓ Richtig!',fr:'✓ Correct!',es:'✓ ¡Correcto!'}[curLang]||'✓ Correct!';
  var wrongPfx={en:'✗ Answer: ',de:'✗ Antwort: ',fr:'✗ Réponse : ',es:'✗ Respuesta: '}[curLang]||'✗ Answer: ';
  var fbEl=document.getElementById('flg-feedback');
  fbEl.textContent=ok?correctMsg:wrongPfx+countryName(q.n);
  fbEl.style.color=ok?'var(--lime)':'var(--rose)';
  var skipBtn=document.getElementById('flg-skip'); if(skipBtn) skipBtn.style.display='none';
  setTimeout(function(){ flgNext(); }, ok?500:1200);
}

function flgSkip(){
  flgRound(); // skip directly to next question
}

function flgAnswer(ok,btn,correctCountry){
  document.querySelectorAll('#flg-opts button').forEach(function(b){
    b.disabled=true;
    var bCountry=b.dataset.country; // always EN name stored in dataset
    if(bCountry===correctCountry){ b.style.borderColor='var(--lime)'; b.style.background='rgba(200,241,53,.1)'; }
    else if(b===btn&&!ok){ b.style.borderColor='var(--rose)'; b.style.opacity='.5'; }
  });
  if(ok){
    fS.score++; fS.streak=(fS.streak||0)+1;
    var fBonus2=fS.streak>=10?8:fS.streak>=5?4:fS.streak>=3?2:0;
    var fDiffMult2=fS.diffMult||1.0;
    try{awardXP(Math.round((5+fBonus2)*fDiffMult2));}catch(e){}
    try{achTrack('flgCorrect',1);achTrack('flgUnique',correctCountry);}catch(e){}
    if(fBonus2>0) showToast('🔥 Streak '+fS.streak+'! +'+fBonus2+' bonus XP');
    try{GeoAudio.playSFX(fS.streak>1?'streak':'correct');}catch(e){}
  } else { fS.streak=0; try{GeoAudio.playSFX('wrong');}catch(e){} }
  flgComboHUD();
  setTimeout(function(){ flgNext(); }, ok?500:1200);
}

function flgComboHUD(){
  var p=document.getElementById('flg-combo-pill');
  if(!p) return;
  if((fS.streak||0)>=3){ p.style.display=''; p.textContent='🔥 '+fS.streak+' streak'; }
  else { p.style.display='none'; }
}
function flgNext(){ flgRound(); }


/* ══════════════════════════════════════════
   GUESS THE COUNTRY
══════════════════════════════════════════ */
const GTC_DATA = [
  {n:'Germany',names:{de:'Deutschland',fr:'Allemagne',es:'Alemania'},f:'🇩🇪',facts:{en:['This country has the largest economy in Europe.','It borders 9 other countries — more than almost any other in Europe.','The capital was divided by a famous wall from 1961 to 1989.','Beer and sausage are iconic foods here.','The national football team has won the World Cup 4 times.','The Rhine and the Danube both flow through this country.','Its official language is spoken by over 100 million people worldwide.','The country is known for its autobahns — highways with no speed limit.'],de:['Dieses Land hat die größte Volkswirtschaft Europas.','Es grenzt an 9 andere Länder – mehr als fast jedes andere in Europa.','Die Hauptstadt war von 1961 bis 1989 durch eine berühmte Mauer geteilt.','Bier und Wurst sind typische Lebensmittel hier.','Die Nationalmannschaft hat den Weltcup 4 Mal gewonnen.','Rhein und Donau fließen beide durch dieses Land.','Die Amtssprache wird von über 100 Millionen Menschen weltweit gesprochen.','Das Land ist bekannt für seine Autobahnen ohne Tempolimit.'],fr:['Ce pays possède la plus grande économie d\'Europe.','Il partage ses frontières avec 9 pays — plus que presque tout autre en Europe.','La capitale fut divisée par un célèbre mur de 1961 à 1989.','La bière et les saucisses sont des aliments emblématiques ici.','L\'équipe nationale de football a remporté la Coupe du monde 4 fois.','Le Rhin et le Danube traversent tous deux ce pays.','La langue officielle est parlée par plus de 100 millions de personnes dans le monde.','Le pays est connu pour ses autoroutes sans limitation de vitesse.'],es:['Este país tiene la economía más grande de Europa.','Limita con 9 países — más que casi cualquier otro en Europa.','La capital estuvo dividida por un famoso muro de 1961 a 1989.','La cerveza y las salchichas son alimentos icónicos aquí.','La selección nacional ha ganado la Copa del Mundo 4 veces.','El Rin y el Danubio atraviesan este país.','Su idioma oficial es hablado por más de 100 millones de personas en todo el mundo.','El país es conocido por sus autopistas sin límite de velocidad.']}},
  {n:'Japan',names:{de:'Japan',fr:'Japon',es:'Japón'},f:'🇯🇵',facts:{en:['This island nation consists of over 6,800 islands.','It has the world\'s third-largest economy by GDP.','The country experiences around 1,500 earthquakes per year.','Mount Fuji is its highest peak at 3,776 metres.','The bullet train here reaches speeds over 300 km/h.','Cherry blossoms are a national symbol celebrated every spring.','Sushi and ramen originated in this country.','The population is over 125 million but declining.'],de:['Diese Inselnnation besteht aus über 6.800 Inseln.','Sie hat die drittgrößte Wirtschaft der Welt nach BIP.','Das Land erlebt rund 1.500 Erdbeben pro Jahr.','Der Fuji ist mit 3.776 Metern der höchste Gipfel.','Der Schnellzug hier erreicht Geschwindigkeiten von über 300 km/h.','Kirschblüten sind ein nationales Symbol, das jeden Frühling gefeiert wird.','Sushi und Ramen stammen aus diesem Land.','Die Bevölkerung beträgt über 125 Millionen, ist aber rückläufig.'],fr:['Cette nation insulaire se compose de plus de 6 800 îles.','C\'est la troisième économie mondiale par le PIB.','Le pays subit environ 1 500 tremblements de terre par an.','Le mont Fuji est son point culminant à 3 776 mètres.','Le train à grande vitesse atteint ici des vitesses supérieures à 300 km/h.','Les fleurs de cerisier sont un symbole national célébré chaque printemps.','Les sushis et les ramens sont originaires de ce pays.','La population dépasse 125 millions mais est en déclin.'],es:['Esta nación insular está compuesta por más de 6.800 islas.','Tiene la tercera economía más grande del mundo por PIB.','El país experimenta alrededor de 1.500 terremotos por año.','El monte Fuji es su punto más alto con 3.776 metros.','El tren bala aquí alcanza velocidades de más de 300 km/h.','Las flores de cerezo son un símbolo nacional celebrado cada primavera.','El sushi y el ramen se originaron en este país.','La población supera los 125 millones pero está disminuyendo.']}},
  {n:'Brazil',names:{de:'Brasilien',fr:'Brésil',es:'Brasil'},f:'🇧🇷',facts:{en:['This country is the largest in South America by area.','It holds the Amazon rainforest — about 60% of it.','The national language is Portuguese, not Spanish.','It has won the FIFA World Cup 5 times.','The famous carnival in Rio de Janeiro draws millions each year.','The country borders every other South American country except two.','Its currency is the Real.','The capital is Brasília, a planned city built in the 1960s.'],de:['Dieses Land ist das flächenmäßig größte in Südamerika.','Es beherbergt den Amazonas-Regenwald – rund 60 % davon.','Die Landessprache ist Portugiesisch, nicht Spanisch.','Es hat die FIFA-Weltmeisterschaft 5 Mal gewonnen.','Der berühmte Karneval in Rio de Janeiro zieht jedes Jahr Millionen an.','Das Land grenzt an alle südamerikanischen Länder außer zwei.','Die Währung ist der Real.','Die Hauptstadt ist Brasília, eine Planstadt aus den 1960er Jahren.'],fr:['Ce pays est le plus grand d\'Amérique du Sud en superficie.','Il abrite la forêt amazonienne — environ 60 % de celle-ci.','La langue nationale est le portugais, pas l\'espagnol.','Il a remporté la Coupe du monde de la FIFA 5 fois.','Le célèbre carnaval de Rio de Janeiro attire des millions de personnes chaque année.','Le pays borde tous les autres pays d\'Amérique du Sud sauf deux.','Sa monnaie est le Real.','La capitale est Brasília, une ville planifiée construite dans les années 1960.'],es:['Este país es el más grande de América del Sur por área.','Alberga la selva amazónica, aproximadamente el 60% de ella.','El idioma nacional es el portugués, no el español.','Ha ganado la Copa Mundial de la FIFA 5 veces.','El famoso carnaval de Río de Janeiro atrae millones cada año.','El país limita con todos los demás países sudamericanos excepto dos.','Su moneda es el Real.','La capital es Brasília, una ciudad planificada construida en los años 60.']}},
  {n:'Australia',names:{de:'Australien',fr:'Australie',es:'Australia'},f:'🇦🇺',facts:{en:['This country is both a continent and a nation.','It has the world\'s largest coral reef system off its coast.','The most dangerous animals in the world live here.','The indigenous population has lived here for over 50,000 years.','The capital is not Sydney — it\'s a different, smaller city.','Kangaroos and koalas are native only to this country.','It drives on the left side of the road.','The Outback covers about 70% of the country\'s land.'],de:['Dieses Land ist sowohl ein Kontinent als auch eine Nation.','Es hat das größte Korallenriffsystem der Welt vor seiner Küste.','Die gefährlichsten Tiere der Welt leben hier.','Die indigene Bevölkerung lebt seit über 50.000 Jahren hier.','Die Hauptstadt ist nicht Sydney — es ist eine andere, kleinere Stadt.','Kängurus und Koalas sind nur in diesem Land heimisch.','Man fährt auf der linken Straßenseite.','Das Outback bedeckt etwa 70 % des Landes.'],fr:['Ce pays est à la fois un continent et une nation.','Il possède le plus grand système de récifs coralliens du monde au large de ses côtes.','Les animaux les plus dangereux du monde vivent ici.','La population indigène vit ici depuis plus de 50 000 ans.','La capitale n\'est pas Sydney — c\'est une ville différente et plus petite.','Les kangourous et les koalas ne sont originaires que de ce pays.','On conduit à gauche.','L\'Outback couvre environ 70 % du territoire du pays.'],es:['Este país es tanto un continente como una nación.','Tiene el sistema de arrecifes de coral más grande del mundo frente a su costa.','Los animales más peligrosos del mundo viven aquí.','La población indígena ha vivido aquí durante más de 50.000 años.','La capital no es Sídney, es una ciudad diferente y más pequeña.','Los canguros y koalas son nativos solo de este país.','Se conduce por el lado izquierdo de la carretera.','El Outback cubre aproximadamente el 70% del territorio del país.']}},
  {n:'Egypt',names:{de:'Ägypten',fr:'Égypte',es:'Egipto'},f:'🇪🇬',facts:{en:['Ancient stone monuments built 4,500 years ago stand in this country.','The world\'s longest river flows through it.','This country controls a famous canal connecting two seas.','It borders both Africa and the Sinai Peninsula in Asia.','Arabic is the official language.','Cairo is the largest city in Africa.','The country has a population of over 100 million.','Tourism around ancient ruins is a major industry here.'],de:['In diesem Land stehen steinerne Denkmäler, die vor 4.500 Jahren erbaut wurden.','Der längste Fluss der Welt fließt durch es.','Dieses Land kontrolliert einen berühmten Kanal, der zwei Meere verbindet.','Es grenzt sowohl an Afrika als auch an die Sinai-Halbinsel in Asien.','Arabisch ist die Amtssprache.','Kairo ist die größte Stadt Afrikas.','Das Land hat eine Bevölkerung von über 100 Millionen.','Tourismus rund um antike Ruinen ist eine wichtige Industrie hier.'],fr:['Des monuments en pierre construits il y a 4 500 ans se dressent dans ce pays.','Le fleuve le plus long du monde le traverse.','Ce pays contrôle un célèbre canal reliant deux mers.','Il borde à la fois l\'Afrique et la péninsule du Sinaï en Asie.','L\'arabe est la langue officielle.','Le Caire est la plus grande ville d\'Afrique.','Le pays compte une population de plus de 100 millions d\'habitants.','Le tourisme autour des ruines antiques est une industrie majeure ici.'],es:['En este país se alzan monumentos de piedra construidos hace 4.500 años.','El río más largo del mundo fluye a través de él.','Este país controla un famoso canal que conecta dos mares.','Limita tanto con África como con la península del Sinaí en Asia.','El árabe es el idioma oficial.','El Cairo es la ciudad más grande de África.','El país tiene una población de más de 100 millones.','El turismo en torno a las ruinas antiguas es una industria importante aquí.']}},
  {n:'Canada',names:{de:'Kanada',fr:'Canada',es:'Canadá'},f:'🇨🇦',facts:{en:['This country has the second-largest land area in the world.','It has the longest coastline of any country.','French and English are both official languages.','The country shares the world\'s longest land border with its southern neighbour.','Ice hockey is the national winter sport.','It has more lakes than all other countries combined.','The maple leaf is the national symbol.','The country is home to about 10% of the world\'s forests.'],de:['Dieses Land hat die zweitgrößte Landfläche der Welt.','Es hat die längste Küstenlinie aller Länder.','Französisch und Englisch sind beide Amtssprachen.','Das Land teilt die längste Landgrenze der Welt mit seinem südlichen Nachbarn.','Eishockey ist der nationale Wintersport.','Es hat mehr Seen als alle anderen Länder zusammen.','Das Ahornblatt ist das nationale Symbol.','Das Land beherbergt etwa 10 % der Wälder der Welt.'],fr:['Ce pays possède la deuxième plus grande superficie terrestre du monde.','Il a le littoral le plus long de tous les pays.','Le français et l\'anglais sont tous deux langues officielles.','Le pays partage la plus longue frontière terrestre du monde avec son voisin du sud.','Le hockey sur glace est le sport national d\'hiver.','Il a plus de lacs que tous les autres pays réunis.','La feuille d\'érable est le symbole national.','Le pays abrite environ 10 % des forêts mondiales.'],es:['Este país tiene la segunda área terrestre más grande del mundo.','Tiene la línea costera más larga de cualquier país.','El francés y el inglés son ambos idiomas oficiales.','El país comparte la frontera terrestre más larga del mundo con su vecino del sur.','El hockey sobre hielo es el deporte nacional de invierno.','Tiene más lagos que todos los demás países combinados.','La hoja de arce es el símbolo nacional.','El país alberga alrededor del 10% de los bosques del mundo.']}},
  {n:'Russia',names:{de:'Russland',fr:'Russie',es:'Rusia'},f:'🇷🇺',facts:{en:['This country is the largest in the world by land area.','It spans 11 time zones.','Lake Baikal here is the world\'s deepest and oldest lake.','The country borders both Europe and Asia.','The Trans-Siberian Railway is the world\'s longest.','Brown bears are its national animal.','Winters can reach −50°C in Siberia.','Moscow and Saint Petersburg are its two major cities.'],de:['Dieses Land ist das flächenmäßig größte der Welt.','Es erstreckt sich über 11 Zeitzonen.','Der Baikalsee hier ist der tiefste und älteste See der Welt.','Das Land grenzt sowohl an Europa als auch an Asien.','Die Transsibirische Eisenbahn ist die längste der Welt.','Braunbären sind das Nationaltier.','Im Winter kann es in Sibirien bis zu −50°C werden.','Moskau und Sankt Petersburg sind die zwei größten Städte.'],fr:['Ce pays est le plus grand du monde par sa superficie terrestre.','Il s\'étend sur 11 fuseaux horaires.','Le lac Baïkal est le lac le plus profond et le plus ancien du monde.','Le pays borde à la fois l\'Europe et l\'Asie.','Le Transsibérien est le chemin de fer le plus long du monde.','L\'ours brun est son animal national.','Les hivers peuvent atteindre −50°C en Sibérie.','Moscou et Saint-Pétersbourg sont ses deux principales villes.'],es:['Este país es el más grande del mundo por área terrestre.','Abarca 11 zonas horarias.','El lago Baikal es el lago más profundo y antiguo del mundo.','El país limita tanto con Europa como con Asia.','El ferrocarril Transiberiano es el más largo del mundo.','El oso pardo es su animal nacional.','Los inviernos pueden alcanzar −50°C en Siberia.','Moscú y San Petersburgo son sus dos ciudades principales.']}},
  {n:'Norway',names:{de:'Norwegen',fr:'Norvège',es:'Noruega'},f:'🇳🇴',facts:{en:['This country has one of the highest GDP per capita in the world.','Deep narrow inlets carved by glaciers define its coastline.','The sun doesn\'t set here for months in summer.','It is the world\'s largest exporter of salmon.','Oil discovered offshore made this country extremely wealthy.','The northern lights are visible here most winters.','The country is not a member of the EU.','Cross-country skiing was invented here.'],de:['Dieses Land hat eines der höchsten Pro-Kopf-BIPs der Welt.','Tiefe, enge Fjorde, die von Gletschern geformt wurden, prägen seine Küste.','Im Sommer geht die Sonne hier monatelang nicht unter.','Es ist der weltgrößte Exporteur von Lachs.','Offshore entdecktes Öl machte dieses Land extrem wohlhabend.','Die Nordlichter sind hier in den meisten Wintern sichtbar.','Das Land ist kein EU-Mitglied.','Langlaufen wurde hier erfunden.'],fr:['Ce pays possède l\'un des PIB par habitant les plus élevés du monde.','Des fjords profonds et étroits sculptés par les glaciers définissent son littoral.','Le soleil ne se couche pas ici pendant des mois en été.','C\'est le plus grand exportateur de saumon au monde.','Le pétrole découvert en mer a rendu ce pays extrêmement riche.','Les aurores boréales sont visibles ici la plupart des hivers.','Le pays n\'est pas membre de l\'UE.','Le ski de fond a été inventé ici.'],es:['Este país tiene uno de los PIB per cápita más altos del mundo.','Fiordos profundos y estrechos esculpidos por glaciares definen su costa.','El sol no se pone aquí durante meses en verano.','Es el mayor exportador de salmón del mundo.','El petróleo descubierto en alta mar hizo a este país extremadamente rico.','Las auroras boreales son visibles aquí la mayoría de los inviernos.','El país no es miembro de la UE.','El esquí de fondo fue inventado aquí.']}},
  {n:'Mexico',names:{de:'Mexiko',fr:'Mexique',es:'México'},f:'🇲🇽',facts:{en:['This country is the world\'s largest Spanish-speaking nation by population.','It borders the USA to the north.','Ancient civilisations like the Aztec and Maya built cities here.','It is the world\'s top producer of avocados.','The country has two coastlines — on the Pacific and the Gulf.','Its capital is one of the most populous cities in the world.','Tacos, guacamole, and chocolate all originated here.','The Day of the Dead is a famous national celebration.'],de:['Dieses Land ist die bevölkerungsreichste spanischsprachige Nation der Welt.','Es grenzt im Norden an die USA.','Alte Zivilisationen wie die Azteken und Maya bauten hier Städte.','Es ist der weltgrößte Produzent von Avocados.','Das Land hat zwei Küstenlinien — am Pazifik und am Golf.','Seine Hauptstadt ist eine der bevölkerungsreichsten Städte der Welt.','Tacos, Guacamole und Schokolade stammen alle von hier.','Der Tag der Toten ist eine berühmte nationale Feier.'],fr:['Ce pays est la plus grande nation hispanophone du monde par sa population.','Il borde les États-Unis au nord.','Des civilisations anciennes comme les Aztèques et les Mayas ont construit des villes ici.','C\'est le premier producteur mondial d\'avocats.','Le pays a deux littoraux — sur le Pacifique et le Golfe.','Sa capitale est l\'une des villes les plus peuplées du monde.','Les tacos, le guacamole et le chocolat sont tous originaires d\'ici.','La Fête des Morts est une célébration nationale célèbre.'],es:['Este país es la nación hispanohablante más grande del mundo por población.','Limita con los EE.UU. al norte.','Civilizaciones antiguas como los aztecas y los mayas construyeron ciudades aquí.','Es el mayor productor de aguacates del mundo.','El país tiene dos costas — en el Pacífico y en el Golfo.','Su capital es una de las ciudades más pobladas del mundo.','Los tacos, el guacamole y el chocolate son originarios de aquí.','El Día de Muertos es una famosa celebración nacional.']}},
  {n:'France',names:{de:'Frankreich',fr:'France',es:'Francia'},f:'🇫🇷',facts:{en:['This country is the most visited in the world by tourists.','The Eiffel Tower is in its capital.','It is one of the five permanent members of the UN Security Council.','French cuisine is UNESCO-recognised.','The country produces more cheese varieties than any other nation.','The Tour de France cycling race starts here every July.','It is the largest country in the European Union by area.','The official language is spoken on every continent.'],de:['Dieses Land ist das meistbesuchte der Welt von Touristen.','Der Eiffelturm steht in seiner Hauptstadt.','Es ist eines der fünf ständigen Mitglieder des UN-Sicherheitsrats.','Die französische Küche ist UNESCO-anerkannt.','Das Land produziert mehr Käsesorten als jede andere Nation.','Das Radrennen Tour de France findet hier jeden Juli statt.','Es ist das flächenmäßig größte Land in der Europäischen Union.','Die Amtssprache wird auf jedem Kontinent gesprochen.'],fr:['Ce pays est le plus visité au monde par les touristes.','La tour Eiffel se trouve dans sa capitale.','C\'est l\'un des cinq membres permanents du Conseil de sécurité de l\'ONU.','La cuisine française est reconnue par l\'UNESCO.','Le pays produit plus de variétés de fromages que toute autre nation.','Le Tour de France commence ici chaque juillet.','C\'est le plus grand pays de l\'Union européenne par sa superficie.','La langue officielle est parlée sur tous les continents.'],es:['Este país es el más visitado del mundo por los turistas.','La Torre Eiffel está en su capital.','Es uno de los cinco miembros permanentes del Consejo de Seguridad de la ONU.','La cocina francesa está reconocida por la UNESCO.','El país produce más variedades de queso que cualquier otra nación.','La carrera ciclista Tour de Francia comienza aquí cada julio.','Es el país más grande de la Unión Europea por área.','El idioma oficial se habla en todos los continentes.']}},
  {n:'India',names:{de:'Indien',fr:'Inde',es:'India'},f:'🇮🇳',facts:{en:['This country has the world\'s largest population.','It has a top-five global economy by GDP.','Over 22 official languages are recognised here.','The Himalayas form its northern border.','The country is the world\'s largest democracy.','Spices, yoga, and Bollywood originate here.','The Ganges river is considered sacred.','Cricket is the most popular sport.'],de:['Dieses Land hat die größte Bevölkerung der Welt.','Es hat eine der fünf größten Volkswirtschaften der Welt nach BIP.','Hier werden über 22 Amtssprachen anerkannt.','Der Himalaya bildet seine nördliche Grenze.','Das Land ist die größte Demokratie der Welt.','Gewürze, Yoga und Bollywood stammen von hier.','Der Ganges gilt als heilig.','Kricket ist der beliebteste Sport.'],fr:['Ce pays a la population la plus importante du monde.','Il figure parmi les cinq premières économies mondiales par le PIB.','Plus de 22 langues officielles y sont reconnues.','L\'Himalaya forme sa frontière nord.','Le pays est la plus grande démocratie du monde.','Les épices, le yoga et Bollywood sont originaires d\'ici.','Le Gange est considéré comme sacré.','Le cricket est le sport le plus populaire.'],es:['Este país tiene la población más grande del mundo.','Tiene una de las cinco economías más grandes del mundo por PIB.','Aquí se reconocen más de 22 idiomas oficiales.','El Himalaya forma su frontera norte.','El país es la democracia más grande del mundo.','Las especias, el yoga y Bollywood se originaron aquí.','El río Ganges es considerado sagrado.','El críquet es el deporte más popular.']}},
  {n:'South Africa',names:{de:'Südafrika',fr:'Afrique du Sud',es:'Sudáfrica'},f:'🇿🇦',facts:{en:['This country has 11 official languages — the most of any country.','It is the southernmost nation on the African continent.','Two oceans meet near its most southern point.','Nelson Mandela became its first democratically elected president in 1994.','It has the largest economy in Africa.','Famous for gold and diamond mining.','Table Mountain in Cape Town is a global landmark.','The country hosted the FIFA World Cup in 2010.'],de:['Dieses Land hat 11 Amtssprachen — die meisten aller Länder.','Es ist die südlichste Nation auf dem afrikanischen Kontinent.','Zwei Ozeane treffen sich nahe seinem südlichsten Punkt.','Nelson Mandela wurde 1994 zum ersten demokratisch gewählten Präsidenten.','Es hat die größte Volkswirtschaft in Afrika.','Berühmt für Gold- und Diamantenabbau.','Der Tafelberg in Kapstadt ist ein weltbekanntes Wahrzeichen.','Das Land war 2010 Gastgeber der FIFA-Weltmeisterschaft.'],fr:['Ce pays a 11 langues officielles — le plus de tous les pays.','C\'est la nation la plus méridionale du continent africain.','Deux océans se rejoignent près de son point le plus au sud.','Nelson Mandela est devenu son premier président démocratiquement élu en 1994.','Il possède la plus grande économie d\'Afrique.','Célèbre pour l\'extraction d\'or et de diamants.','La Montagne de la Table au Cap est un monument mondial.','Le pays a accueilli la Coupe du monde de la FIFA en 2010.'],es:['Este país tiene 11 idiomas oficiales, los más de cualquier país.','Es la nación más meridional del continente africano.','Dos océanos se encuentran cerca de su punto más al sur.','Nelson Mandela se convirtió en su primer presidente elegido democráticamente en 1994.','Tiene la economía más grande de África.','Famoso por la minería de oro y diamantes.','La Montaña de la Mesa en Ciudad del Cabo es un hito mundial.','El país fue sede de la Copa Mundial de la FIFA en 2010.']}},
  {n:'Iceland',names:{de:'Island',fr:'Islande',es:'Islandia'},f:'🇮🇸',facts:{en:['This island nation runs almost entirely on geothermal and hydro energy.','It sits on the Mid-Atlantic Ridge between two tectonic plates.','The capital is the world\'s northernmost capital city.','Volcanoes and glaciers cover much of the landscape.','The population is under 400,000.','The midnight sun occurs here every summer.','It has no standing army.','Icelandic is one of the oldest unchanged languages in Europe.'],de:['Diese Inselnation läuft fast ausschließlich mit Erdwärme- und Wasserkraftenergie.','Sie liegt auf dem Mittelatlantischen Rücken zwischen zwei tektonischen Platten.','Die Hauptstadt ist die nördlichste Hauptstadt der Welt.','Vulkane und Gletscher bedecken einen Großteil der Landschaft.','Die Bevölkerung liegt unter 400.000.','Die Mitternachtssonne tritt hier jeden Sommer auf.','Das Land hat kein stehendes Heer.','Isländisch ist eine der ältesten unveränderten Sprachen Europas.'],fr:['Cette nation insulaire fonctionne presque entièrement à l\'énergie géothermique et hydraulique.','Elle est située sur la dorsale médio-atlantique entre deux plaques tectoniques.','La capitale est la ville capitale la plus septentrionale du monde.','Les volcans et les glaciers couvrent une grande partie du paysage.','La population est inférieure à 400 000.','Le soleil de minuit se produit ici chaque été.','Elle n\'a pas d\'armée permanente.','L\'islandais est l\'une des langues les plus anciennes et inchangées d\'Europe.'],es:['Esta nación insular funciona casi por completo con energía geotérmica e hidroeléctrica.','Se asienta en la Dorsal Mesoatlántica entre dos placas tectónicas.','La capital es la ciudad capital más septentrional del mundo.','Los volcanes y glaciares cubren gran parte del paisaje.','La población es inferior a 400.000.','El sol de medianoche ocurre aquí cada verano.','No tiene ejército permanente.','El islandés es uno de los idiomas más antiguos e inalterados de Europa.']}},
  {n:'Argentina',names:{de:'Argentinien',fr:'Argentine',es:'Argentina'},f:'🇦🇷',facts:{en:['This country is the second-largest in South America.','Tango originated in its capital city.','It is the world\'s largest producer of soybeans.','The Andes Mountains run along its western border.','Lionel Messi is from here.','Patagonia — a vast wilderness — occupies its south.','Spanish is the official language.','The country declared independence from Spain in 1816.'],de:['Dieses Land ist das zweitgrößte in Südamerika.','Tango entstand in seiner Hauptstadt.','Es ist der weltgrößte Produzent von Sojabohnen.','Die Anden verlaufen entlang seiner Westgrenze.','Lionel Messi stammt von hier.','Patagonien — eine riesige Wildnis — nimmt seinen Süden ein.','Spanisch ist die Amtssprache.','Das Land erklärte 1816 seine Unabhängigkeit von Spanien.'],fr:['Ce pays est le deuxième plus grand d\'Amérique du Sud.','Le tango est né dans sa capitale.','C\'est le plus grand producteur mondial de soja.','Les Andes longent sa frontière ouest.','Lionel Messi est originaire d\'ici.','La Patagonie — une vaste région sauvage — occupe le sud.','L\'espagnol est la langue officielle.','Le pays a déclaré son indépendance de l\'Espagne en 1816.'],es:['Este país es el segundo más grande de América del Sur.','El tango se originó en su capital.','Es el mayor productor mundial de soja.','Los Andes corren a lo largo de su frontera occidental.','Lionel Messi es de aquí.','La Patagonia, una vasta región salvaje, ocupa su sur.','El español es el idioma oficial.','El país declaró su independencia de España en 1816.']}},
  {n:'New Zealand',names:{de:'Neuseeland',fr:'Nouvelle-Zélande',es:'Nueva Zelanda'},f:'🇳🇿',facts:{en:['This island nation was the last major land mass settled by humans.','The Lord of the Rings films were shot here.','It was the first country to give women the right to vote in 1893.','The kiwi bird is the national symbol.','The country has more sheep than people.','Rugby union is the national sport and the All Blacks are world-famous.','It lies on the Pacific Ring of Fire.','The Maori are the indigenous people here.'],de:['Diese Inselnation war die letzte große Landmasse, die von Menschen besiedelt wurde.','Die Herr-der-Ringe-Filme wurden hier gedreht.','Es war das erste Land, das Frauen 1893 das Wahlrecht gab.','Der Kiwi-Vogel ist das nationale Symbol.','Das Land hat mehr Schafe als Menschen.','Rugby Union ist der nationale Sport und die All Blacks sind weltberühmt.','Es liegt auf dem Pazifischen Feuerring.','Die Maori sind die indigenen Menschen hier.'],fr:['Cette nation insulaire fut la dernière grande masse terrestre peuplée par les humains.','Les films du Seigneur des Anneaux ont été tournés ici.','C\'est le premier pays à avoir accordé le droit de vote aux femmes en 1893.','L\'oiseau kiwi est le symbole national.','Le pays a plus de moutons que d\'habitants.','Le rugby à XV est le sport national et les All Blacks sont mondialement célèbres.','Il se trouve sur la ceinture de feu du Pacifique.','Les Maoris sont les peuples autochtones ici.'],es:['Esta nación insular fue la última gran masa de tierra asentada por humanos.','Las películas de El Señor de los Anillos se rodaron aquí.','Fue el primer país en dar a las mujeres el derecho al voto en 1893.','El pájaro kiwi es el símbolo nacional.','El país tiene más ovejas que personas.','El rugby union es el deporte nacional y los All Blacks son mundialmente famosos.','Se encuentra en el Cinturón de Fuego del Pacífico.','Los maoríes son el pueblo indígena aquí.']}},
  {n:'Turkey',names:{de:'Türkei',fr:'Turquie',es:'Turquía'},f:'🇹🇷',facts:{en:['This country straddles two continents — Europe and Asia.','A famous strait runs through its largest city.','The country has a population of over 85 million.','It is home to numerous ancient ruins, including Ephesus.','The currency is the Lira.','Coffee-making traditions here are UNESCO-recognised.','It borders 8 countries.','Istanbul is its largest city — though not the capital.'],de:['Dieses Land erstreckt sich über zwei Kontinente — Europa und Asien.','Eine berühmte Meerenge verläuft durch seine größte Stadt.','Das Land hat eine Bevölkerung von über 85 Millionen.','Es beherbergt zahlreiche antike Ruinen, darunter Ephesus.','Die Währung ist die Lira.','Kaffeetraditionen hier sind UNESCO-anerkannt.','Es grenzt an 8 Länder.','Istanbul ist die größte Stadt — obwohl nicht die Hauptstadt.'],fr:['Ce pays chevauche deux continents — l\'Europe et l\'Asie.','Un célèbre détroit traverse sa plus grande ville.','Le pays compte une population de plus de 85 millions d\'habitants.','Il abrite de nombreuses ruines antiques, dont Éphèse.','La monnaie est la Lire.','Les traditions de préparation du café ici sont reconnues par l\'UNESCO.','Il borde 8 pays.','Istanbul est sa plus grande ville — bien que non la capitale.'],es:['Este país se extiende por dos continentes: Europa y Asia.','Un famoso estrecho atraviesa su ciudad más grande.','El país tiene una población de más de 85 millones.','Alberga numerosas ruinas antiguas, incluida Éfeso.','La moneda es la Lira.','Las tradiciones de preparación del café aquí están reconocidas por la UNESCO.','Limita con 8 países.','Estambul es su ciudad más grande, aunque no la capital.']}},
  {n:'Saudi Arabia',names:{de:'Saudi-Arabien',fr:'Arabie Saoudite',es:'Arabia Saudita'},f:'🇸🇦',facts:{en:['This country holds the world\'s second-largest proven oil reserves.','The two holiest sites in Islam are located here.','It covers most of the Arabian Peninsula.','Temperatures can exceed 50°C in summer.','Arabic is the official language.','Women only gained the right to drive in 2018.','The country has no permanent rivers.','Riyadh is the capital and largest city.'],de:['Dieses Land verfügt über die zweitgrößten nachgewiesenen Ölreserven der Welt.','Die zwei heiligsten Stätten des Islams befinden sich hier.','Es bedeckt den größten Teil der Arabischen Halbinsel.','Im Sommer können die Temperaturen 50°C überschreiten.','Arabisch ist die Amtssprache.','Frauen erhielten erst 2018 das Recht zu fahren.','Das Land hat keine dauerhaften Flüsse.','Riad ist die Hauptstadt und größte Stadt.'],fr:['Ce pays détient les deuxièmes plus grandes réserves pétrolières prouvées au monde.','Les deux sites les plus sacrés de l\'islam se trouvent ici.','Il couvre la majeure partie de la péninsule arabique.','Les températures peuvent dépasser 50°C en été.','L\'arabe est la langue officielle.','Les femmes n\'ont obtenu le droit de conduire qu\'en 2018.','Le pays n\'a pas de rivières permanentes.','Riyad est la capitale et la plus grande ville.'],es:['Este país tiene las segundas reservas de petróleo probadas más grandes del mundo.','Los dos lugares más sagrados del Islam están ubicados aquí.','Cubre la mayor parte de la Península Arábiga.','Las temperaturas pueden superar los 50°C en verano.','El árabe es el idioma oficial.','Las mujeres solo obtuvieron el derecho a conducir en 2018.','El país no tiene ríos permanentes.','Riad es la capital y la ciudad más grande.']}},
  {n:'Indonesia',names:{de:'Indonesien',fr:'Indonésie',es:'Indonesia'},f:'🇮🇩',facts:{en:['This is the world\'s largest archipelago, made up of over 17,000 islands.','It has the fourth-largest population in the world.','The country sits on the Pacific Ring of Fire.','It is home to the most Muslim citizens of any country.','Bali is one of its most famous islands.','The country straddles the equator.','The Komodo dragon lives only here.','Jakarta is its capital — though a new capital is being built.'],de:['Dies ist der weltgrößte Archipel, bestehend aus über 17.000 Inseln.','Es hat die viertgrößte Bevölkerung der Welt.','Das Land liegt auf dem Pazifischen Feuerring.','Es beherbergt die meisten muslimischen Bürger aller Länder.','Bali ist eine seiner bekanntesten Inseln.','Das Land erstreckt sich über den Äquator.','Der Komodo-Waran lebt nur hier.','Jakarta ist seine Hauptstadt — obwohl eine neue Hauptstadt gebaut wird.'],fr:['C\'est le plus grand archipel du monde, composé de plus de 17 000 îles.','Il a la quatrième plus grande population du monde.','Le pays est situé sur la ceinture de feu du Pacifique.','C\'est le pays abritant le plus de citoyens musulmans.','Bali est l\'une de ses îles les plus célèbres.','Le pays chevauche l\'équateur.','Le dragon de Komodo ne vit qu\'ici.','Jakarta est sa capitale — bien qu\'une nouvelle capitale soit en construction.'],es:['Este es el archipiélago más grande del mundo, compuesto por más de 17.000 islas.','Tiene la cuarta población más grande del mundo.','El país se asienta en el Cinturón de Fuego del Pacífico.','Alberga el mayor número de ciudadanos musulmanes de cualquier país.','Bali es una de sus islas más famosas.','El país atraviesa el ecuador.','El dragón de Komodo solo vive aquí.','Yakarta es su capital, aunque se está construyendo una nueva capital.']}},
  {n:'China',names:{de:'China',fr:'Chine',es:'China'},f:'🇨🇳',facts:{en:['This country has the world\'s largest population — until recently.','The Great Wall stretches over 21,000 kilometres.','It has the second-largest economy in the world.','The country invented paper, printing, and gunpowder.','Mandarin Chinese is the most widely spoken language on Earth.','The country borders 14 nations — more than any other.','Pandas are native only to this country.','The capital hosted the Olympics in both 2008 and 2022.'],de:['Dieses Land hatte bis vor Kurzem die größte Bevölkerung der Welt.','Die Große Mauer erstreckt sich über 21.000 Kilometer.','Es hat die zweitgrößte Volkswirtschaft der Welt.','Das Land erfand Papier, Druck und Schießpulver.','Mandarin-Chinesisch ist die meistgesprochene Sprache der Welt.','Das Land grenzt an 14 Nationen — mehr als jedes andere.','Pandas sind nur in diesem Land heimisch.','Die Hauptstadt war Gastgeber der Olympischen Spiele 2008 und 2022.'],fr:['Ce pays a la plus grande population du monde — jusqu\'à récemment.','La Grande Muraille s\'étend sur plus de 21 000 kilomètres.','C\'est la deuxième économie mondiale.','Le pays a inventé le papier, l\'imprimerie et la poudre à canon.','Le mandarin est la langue la plus parlée sur Terre.','Le pays borde 14 nations — plus que tout autre.','Les pandas ne sont originaires que de ce pays.','La capitale a accueilli les Jeux olympiques en 2008 et 2022.'],es:['Este país tenía la población más grande del mundo, hasta hace poco.','La Gran Muralla se extiende por más de 21.000 kilómetros.','Tiene la segunda economía más grande del mundo.','El país inventó el papel, la imprenta y la pólvora.','El mandarín es el idioma más hablado en la Tierra.','El país limita con 14 naciones, más que cualquier otro.','Los pandas son nativos solo de este país.','La capital fue sede de los Juegos Olímpicos en 2008 y 2022.']}},
  {n:'Kenya',names:{de:'Kenia',fr:'Kenya',es:'Kenia'},f:'🇰🇪',facts:{en:['This country straddles the equator in East Africa.','It is home to the Great Rift Valley.','The capital sits at over 1,700 metres elevation.','Kenyan runners hold most marathon world records.','Wildebeest migrations across the Masai Mara are world-famous.','The country borders the Indian Ocean.','Swahili and English are the official languages.','It is home to significant wildlife including the Big Five.'],de:['Dieses Land erstreckt sich über den Äquator in Ostafrika.','Es ist Heimat des Großen Afrikanischen Grabens.','Die Hauptstadt liegt auf über 1.700 Metern Höhe.','Kenianische Läufer halten die meisten Marathon-Weltrekorde.','Gnus-Wanderungen durch die Masai Mara sind weltberühmt.','Das Land grenzt an den Indischen Ozean.','Swahili und Englisch sind die Amtssprachen.','Es beherbergt bedeutende Wildtiere, darunter die Großen Fünf.'],fr:['Ce pays chevauche l\'équateur en Afrique de l\'Est.','Il abrite la Grande Vallée du Rift.','La capitale est à plus de 1 700 mètres d\'altitude.','Les coureurs kényans détiennent la plupart des records mondiaux du marathon.','Les migrations de gnous à travers le Masai Mara sont mondialement célèbres.','Le pays borde l\'océan Indien.','Le swahili et l\'anglais sont les langues officielles.','Il abrite une faune importante, notamment les Big Five.'],es:['Este país atraviesa el ecuador en África oriental.','Alberga el Gran Valle del Rift.','La capital está a más de 1.700 metros de altitud.','Los corredores kenianos ostentan la mayoría de los récords mundiales de maratón.','Las migraciones de ñus por el Masai Mara son mundialmente famosas.','El país limita con el Océano Índico.','El suajili y el inglés son los idiomas oficiales.','Alberga fauna significativa, incluidos los Cinco Grandes.']}},
  {n:'Spain',names:{de:'Spanien',fr:'Espagne',es:'España'},f:'🇪🇸',facts:{en:['This country is the second-largest in the European Union by area.','It is home to the Sagrada Família, still under construction after 140 years.','The country has 17 autonomous regions, each with distinct cultures.','Flamenco music and dance originated here.','It is the world\'s largest producer of olive oil.','The running of the bulls in Pamplona is a famous tradition.','The country borders both France and Portugal.','FC Barcelona and Real Madrid are among the most famous clubs on Earth.'],de:['Dieses Land ist flächenmäßig das zweitgrößte in der EU.','Es beherbergt die Sagrada Família, die seit 140 Jahren noch im Bau ist.','Das Land hat 17 autonome Regionen, jede mit eigener Kultur.','Flamenco-Musik und -Tanz stammen von hier.','Es ist der weltgrößte Produzent von Olivenöl.','Der Stierlauf in Pamplona ist eine berühmte Tradition.','Das Land grenzt sowohl an Frankreich als auch an Portugal.','Der FC Barcelona und Real Madrid gehören zu den berühmtesten Klubs der Welt.'],fr:['Ce pays est le deuxième plus grand de l\'Union européenne par sa superficie.','Il abrite la Sagrada Família, encore en construction après 140 ans.','Le pays compte 17 régions autonomes, chacune avec ses cultures distinctes.','La musique et la danse flamenco sont originaires d\'ici.','C\'est le plus grand producteur mondial d\'huile d\'olive.','La course des taureaux à Pampelune est une tradition célèbre.','Le pays borde à la fois la France et le Portugal.','Le FC Barcelone et le Real Madrid comptent parmi les clubs les plus célèbres de la planète.'],es:['Este país es el segundo más grande de la Unión Europea por área.','Alberga la Sagrada Família, todavía en construcción después de 140 años.','El país tiene 17 comunidades autónomas, cada una con culturas distintas.','La música y el baile flamenco se originaron aquí.','Es el mayor productor mundial de aceite de oliva.','Los Sanfermines en Pamplona son una famosa tradición.','El país limita tanto con Francia como con Portugal.','El FC Barcelona y el Real Madrid están entre los clubes más famosos de la Tierra.']}},
  {n:'Italy',names:{de:'Italien',fr:'Italie',es:'Italia'},f:'🇮🇹',facts:{en:['This country is home to more UNESCO World Heritage Sites than any other.','The world\'s smallest independent state is located inside its capital.','Pizza and pasta were both invented here.','It is shaped like a boot.','The Roman Empire was centred here for centuries.','The country has 20 distinct regions, each with its own dialect.','Ferrari, Lamborghini, and Maserati are all made here.','The Renaissance movement in art began in this country.'],de:['Dieses Land beherbergt mehr UNESCO-Weltkulturerbestätten als jedes andere.','Der kleinste unabhängige Staat der Welt liegt in seiner Hauptstadt.','Pizza und Pasta wurden beide hier erfunden.','Es ist stiefelförmig.','Das Römische Reich hatte hier jahrhundertelang seinen Mittelpunkt.','Das Land hat 20 verschiedene Regionen, jede mit ihrem eigenen Dialekt.','Ferrari, Lamborghini und Maserati werden alle hier hergestellt.','Die Renaissance-Bewegung in der Kunst begann in diesem Land.'],fr:['Ce pays abrite plus de sites du patrimoine mondial de l\'UNESCO que tout autre.','Le plus petit État indépendant du monde est situé dans sa capitale.','La pizza et les pâtes ont toutes deux été inventées ici.','Il a la forme d\'une botte.','L\'Empire romain y était centré pendant des siècles.','Le pays compte 20 régions distinctes, chacune avec son propre dialecte.','Ferrari, Lamborghini et Maserati sont toutes fabriquées ici.','Le mouvement de la Renaissance artistique a commencé dans ce pays.'],es:['Este país alberga más Sitios del Patrimonio Mundial de la UNESCO que cualquier otro.','El estado independiente más pequeño del mundo está ubicado dentro de su capital.','La pizza y la pasta fueron inventadas aquí.','Tiene forma de bota.','El Imperio Romano tuvo aquí su centro durante siglos.','El país tiene 20 regiones distintas, cada una con su propio dialecto.','Ferrari, Lamborghini y Maserati se fabrican todas aquí.','El movimiento del Renacimiento en el arte comenzó en este país.']}},
  {n:'Greece',names:{de:'Griechenland',fr:'Grèce',es:'Grecia'},f:'🇬🇷',facts:{en:['This country is considered the birthplace of democracy.','It has over 6,000 islands, of which about 200 are inhabited.','The Olympic Games were first held here in 776 BC.','The country borders three seas.','Its alphabet is the basis of many European writing systems.','The Parthenon sits on a famous hilltop in its capital.','Olives and feta cheese are staples of its cuisine.','This country was the first to join the European Union in modern Greece\'s history.'],de:['Dieses Land gilt als Geburtsort der Demokratie.','Es hat über 6.000 Inseln, von denen etwa 200 bewohnt sind.','Die Olympischen Spiele wurden hier 776 v. Chr. erstmals abgehalten.','Das Land grenzt an drei Meere.','Sein Alphabet bildet die Grundlage vieler europäischer Schriftsysteme.','Das Parthenon steht auf einem berühmten Hügel in seiner Hauptstadt.','Oliven und Feta-Käse sind Grundnahrungsmittel seiner Küche.','Griechenland trat als erstes Land der Europäischen Union bei.'],fr:['Ce pays est considéré comme le berceau de la démocratie.','Il compte plus de 6 000 îles, dont environ 200 sont habitées.','Les Jeux olympiques y furent organisés pour la première fois en 776 av. J.-C.','Le pays borde trois mers.','Son alphabet est à la base de nombreux systèmes d\'écriture européens.','Le Parthénon se dresse sur une célèbre colline de sa capitale.','Les olives et la feta sont des aliments de base de sa cuisine.','Ce pays fut le premier à rejoindre l\'Union européenne dans l\'histoire de la Grèce moderne.'],es:['Este país es considerado la cuna de la democracia.','Tiene más de 6.000 islas, de las cuales unas 200 están habitadas.','Los Juegos Olímpicos se celebraron aquí por primera vez en 776 a.C.','El país limita con tres mares.','Su alfabeto es la base de muchos sistemas de escritura europeos.','El Partenón se alza en una famosa colina de su capital.','Las aceitunas y el queso feta son alimentos básicos de su cocina.','Este país fue el primero en unirse a la Unión Europea en la historia de la Grecia moderna.']}},
  {n:'Portugal',names:{de:'Portugal',fr:'Portugal',es:'Portugal'},f:'🇵🇹',facts:{en:['This country was the first global maritime empire in history.','Its language is spoken by over 250 million people worldwide.','It is the westernmost country in continental Europe.','Port wine and pastel de nata originate here.','Fado music is UNESCO-recognised.','The country discovered a sea route to India in 1498.','Lisbon is built on seven hills.','It shares the Iberian Peninsula with its larger neighbour.'],de:['Dieses Land war das erste globale Seereich der Geschichte.','Seine Sprache wird von über 250 Millionen Menschen weltweit gesprochen.','Es ist das westlichste Land des kontinentalen Europas.','Portwein und Pastéis de Nata stammen von hier.','Fado-Musik ist UNESCO-anerkannt.','Das Land entdeckte 1498 eine Seeroute nach Indien.','Lissabon ist auf sieben Hügeln gebaut.','Es teilt die Iberische Halbinsel mit seinem größeren Nachbarn.'],fr:['Ce pays fut le premier empire maritime mondial de l\'histoire.','Sa langue est parlée par plus de 250 millions de personnes dans le monde.','C\'est le pays le plus occidental de l\'Europe continentale.','Le porto et le pastel de nata sont originaires d\'ici.','La musique fado est reconnue par l\'UNESCO.','Le pays a découvert une route maritime vers l\'Inde en 1498.','Lisbonne est construite sur sept collines.','Il partage la péninsule ibérique avec son plus grand voisin.'],es:['Este país fue el primer imperio marítimo global de la historia.','Su idioma es hablado por más de 250 millones de personas en todo el mundo.','Es el país más occidental de Europa continental.','El vino de Oporto y el pastel de nata son originarios de aquí.','La música fado está reconocida por la UNESCO.','El país descubrió una ruta marítima a India en 1498.','Lisboa está construida sobre siete colinas.','Comparte la Península Ibérica con su vecino más grande.']}},
  {n:'Netherlands',names:{de:'Niederlande',fr:'Pays-Bas',es:'Países Bajos'},f:'🇳🇱',facts:{en:['A quarter of this country lies below sea level.','It is the world\'s second-largest exporter of food and agriculture.','Windmills and tulips are famous symbols of this country.','The country has more bicycles than people.','Amsterdam is famous for its canal network.','It is one of the smallest countries in Europe by area.','The country legalized same-sex marriage in 2001 — the first in the world.','Rembrandt and Van Gogh were both born here.'],de:['Ein Viertel dieses Landes liegt unter dem Meeresspiegel.','Es ist der zweitgrößte Exporteur von Lebensmitteln und Agrarerzeugnissen weltweit.','Windmühlen und Tulpen sind berühmte Symbole dieses Landes.','Das Land hat mehr Fahrräder als Menschen.','Amsterdam ist berühmt für sein Kanalnetz.','Es ist eines der flächenmäßig kleinsten Länder Europas.','Das Land legalisierte 2001 als erstes der Welt die gleichgeschlechtliche Ehe.','Rembrandt und Van Gogh wurden beide hier geboren.'],fr:['Un quart de ce pays se trouve en dessous du niveau de la mer.','C\'est le deuxième plus grand exportateur mondial de produits alimentaires et agricoles.','Les moulins à vent et les tulipes sont des symboles célèbres de ce pays.','Le pays a plus de vélos que d\'habitants.','Amsterdam est célèbre pour son réseau de canaux.','C\'est l\'un des plus petits pays d\'Europe par sa superficie.','Le pays a légalisé le mariage homosexuel en 2001 — le premier au monde.','Rembrandt et Van Gogh sont tous deux nés ici.'],es:['Una cuarta parte de este país está por debajo del nivel del mar.','Es el segundo mayor exportador mundial de alimentos y agricultura.','Los molinos de viento y los tulipanes son símbolos famosos de este país.','El país tiene más bicicletas que personas.','Ámsterdam es famosa por su red de canales.','Es uno de los países más pequeños de Europa por área.','El país legalizó el matrimonio entre personas del mismo sexo en 2001, el primero en el mundo.','Rembrandt y Van Gogh nacieron ambos aquí.']}},
  {n:'Sweden',names:{de:'Schweden',fr:'Suède',es:'Suecia'},f:'🇸🇪',facts:{en:['This country invented the modern safety match, the zipper, and Bluetooth.','ABBA and IKEA are both from here.','It is one of the world\'s top exporters of music per capita.','The country borders Norway and Finland.','It has the highest number of McDonald\'s per capita in Europe.','The Nobel Prizes are awarded in its capital every year.','The country has been neutral in warfare for over 200 years.','Winter darkness lasts nearly 24 hours in its northern regions.'],de:['Dieses Land erfand das moderne Sicherheitsstreichholz, den Reißverschluss und Bluetooth.','ABBA und IKEA stammen beide von hier.','Es ist einer der weltbesten Musikexporteure pro Kopf.','Das Land grenzt an Norwegen und Finnland.','Es hat die meisten McDonald\'s pro Kopf in Europa.','Der Nobelpreis wird in seiner Hauptstadt jedes Jahr verliehen.','Das Land ist seit über 200 Jahren militärisch neutral.','Die Winterdunkelheit dauert in seinen nördlichen Regionen fast 24 Stunden.'],fr:['Ce pays a inventé l\'allumette de sécurité moderne, la fermeture éclair et le Bluetooth.','ABBA et IKEA sont tous deux originaires d\'ici.','C\'est l\'un des plus grands exportateurs mondiaux de musique par habitant.','Le pays borde la Norvège et la Finlande.','Il a le plus grand nombre de McDonald\'s par habitant en Europe.','Les prix Nobel sont décernés dans sa capitale chaque année.','Le pays est resté neutre dans les conflits depuis plus de 200 ans.','L\'obscurité hivernale dure près de 24 heures dans ses régions nordiques.'],es:['Este país inventó el moderno fósforo de seguridad, la cremallera y el Bluetooth.','ABBA e IKEA son ambos de aquí.','Es uno de los mayores exportadores de música per cápita del mundo.','El país limita con Noruega y Finlandia.','Tiene el mayor número de McDonald\'s per cápita en Europa.','Los Premios Nobel se entregan en su capital cada año.','El país ha sido neutral en la guerra durante más de 200 años.','La oscuridad invernal dura casi 24 horas en sus regiones del norte.']}},
  {n:'Switzerland',names:{de:'Schweiz',fr:'Suisse',es:'Suiza'},f:'🇨🇭',facts:{en:['This country has four official languages.','It is home to the headquarters of the Red Cross.','The country has not been at war since 1815.','Famous for its watches, chocolate, and cheese.','The Alps cover about 60% of its territory.','It is not a member of the European Union.','Geneva hosts many major international organisations.','It has the highest density of Nobel Prize winners per capita.'],de:['Dieses Land hat vier Amtssprachen.','Es beherbergt den Hauptsitz des Roten Kreuzes.','Das Land war seit 1815 in keinem Krieg.','Bekannt für Uhren, Schokolade und Käse.','Die Alpen bedecken etwa 60 % seines Territoriums.','Es ist kein Mitglied der Europäischen Union.','Genf beherbergt viele große internationale Organisationen.','Es hat die höchste Dichte an Nobelpreisträgern pro Kopf.'],fr:['Ce pays a quatre langues officielles.','Il abrite le siège de la Croix-Rouge.','Le pays n\'a pas été en guerre depuis 1815.','Célèbre pour ses montres, son chocolat et son fromage.','Les Alpes couvrent environ 60 % de son territoire.','Il n\'est pas membre de l\'Union européenne.','Genève accueille de nombreuses grandes organisations internationales.','Il a la plus haute densité de lauréats du prix Nobel par habitant.'],es:['Este país tiene cuatro idiomas oficiales.','Alberga la sede de la Cruz Roja.','El país no ha estado en guerra desde 1815.','Famoso por sus relojes, chocolate y queso.','Los Alpes cubren aproximadamente el 60% de su territorio.','No es miembro de la Unión Europea.','Ginebra alberga muchas grandes organizaciones internacionales.','Tiene la mayor densidad de ganadores del Premio Nobel per cápita.']}},
  {n:'Poland',names:{de:'Polen',fr:'Pologne',es:'Polonia'},f:'🇵🇱',facts:{en:['This country is the largest in Central Europe by population.','Marie Curie, who discovered radium, was born here.','It was erased from the map for 123 years before returning in 1918.','The country is one of the largest producers of apples in the world.','Pierogi and kielbasa are traditional dishes.','It borders Germany to the west.','The Solidarity movement here helped end communism in Eastern Europe.','The historic capital has a beautifully preserved medieval old town.'],de:['Dieses Land ist das bevölkerungsreichste in Mitteleuropa.','Marie Curie, die Radium entdeckte, wurde hier geboren.','Es wurde 123 Jahre lang von der Landkarte gelöscht, bevor es 1918 zurückkehrte.','Das Land ist einer der weltgrößten Apfelproduzenten.','Pierogi und Kielbasa sind traditionelle Gerichte.','Es grenzt im Westen an Deutschland.','Die Solidarność-Bewegung hier half, den Kommunismus in Osteuropa zu beenden.','Die historische Hauptstadt hat eine wunderschön erhaltene mittelalterliche Altstadt.'],fr:['Ce pays est le plus grand d\'Europe centrale par sa population.','Marie Curie, qui a découvert le radium, y est née.','Il a été effacé de la carte pendant 123 ans avant de revenir en 1918.','Le pays est l\'un des plus grands producteurs de pommes au monde.','Les pierogi et le kielbasa sont des plats traditionnels.','Il borde l\'Allemagne à l\'ouest.','Le mouvement Solidarité ici a contribué à mettre fin au communisme en Europe de l\'Est.','La capitale historique possède une belle vieille ville médiévale bien conservée.'],es:['Este país es el más grande de Europa Central por población.','Marie Curie, quien descubrió el radio, nació aquí.','Fue borrado del mapa durante 123 años antes de regresar en 1918.','El país es uno de los mayores productores de manzanas del mundo.','Los pierogi y el kielbasa son platos tradicionales.','Limita con Alemania al oeste.','El movimiento Solidaridad aquí ayudó a poner fin al comunismo en Europa del Este.','La capital histórica tiene una hermosa ciudad vieja medieval bien conservada.']}},
  {n:'Ukraine',names:{de:'Ukraine',fr:'Ukraine',es:'Ucrania'},f:'🇺🇦',facts:{en:['This country is the largest entirely within Europe.','It is known as the "breadbasket of Europe" for its vast fertile farmland.','The Chernobyl nuclear disaster occurred here in 1986.','The Carpathian Mountains lie in its west.','Kyiv is one of the oldest cities in Eastern Europe.','Sunflower oil is one of its biggest exports.','The country borders Russia to the east and north.','Its flag colours represent blue sky and golden wheat fields.'],de:['Dieses Land ist das größte, das vollständig in Europa liegt.','Es ist bekannt als "Kornkammer Europas" für seine weiten fruchtbaren Ackerflächen.','Die Katastrophe im Kernkraftwerk Tschernobyl ereignete sich hier 1986.','Die Karpaten liegen in seinem Westen.','Kiew ist eine der ältesten Städte Osteuropas.','Sonnenblumenöl ist einer seiner größten Exporte.','Das Land grenzt im Osten und Norden an Russland.','Die Flaggenfarben stehen für blauen Himmel und goldene Weizenfelder.'],fr:['Ce pays est le plus grand entièrement situé en Europe.','Il est connu comme le "grenier de l\'Europe" pour ses vastes terres agricoles fertiles.','La catastrophe nucléaire de Tchernobyl s\'est produite ici en 1986.','Les Carpates se trouvent dans l\'ouest.','Kyiv est l\'une des plus anciennes villes d\'Europe de l\'Est.','L\'huile de tournesol est l\'une de ses plus grandes exportations.','Le pays borde la Russie à l\'est et au nord.','Les couleurs du drapeau représentent le ciel bleu et les champs de blé dorés.'],es:['Este país es el más grande completamente dentro de Europa.','Es conocido como el "granero de Europa" por sus vastas tierras fértiles.','El desastre nuclear de Chernóbil ocurrió aquí en 1986.','Los Cárpatos se encuentran en su oeste.','Kiev es una de las ciudades más antiguas de Europa oriental.','El aceite de girasol es una de sus mayores exportaciones.','El país limita con Rusia al este y al norte.','Los colores de su bandera representan el cielo azul y los campos de trigo dorado.']}},
  {n:'Morocco',names:{de:'Marokko',fr:'Maroc',es:'Marruecos'},f:'🇲🇦',facts:{en:['This country is the only African nation with both Atlantic and Mediterranean coasts.','The Sahara Desert covers its southeastern region.','Marrakech is famous for its bustling medina and souks.','The country is one of the world\'s top producers of phosphates.','Its capital is Rabat, not Casablanca.','The Atlas Mountains run through its interior.','It is geographically close to Europe — just 14 km from Spain.','Traditional mint tea is a symbol of hospitality here.'],de:['Dieses Land ist das einzige afrikanische Land mit sowohl atlantischer als auch mediterraner Küste.','Die Sahara bedeckt seine südöstliche Region.','Marrakesch ist berühmt für seine belebte Medina und Souks.','Das Land ist einer der weltgrößten Phosphatproduzenten.','Die Hauptstadt ist Rabat, nicht Casablanca.','Der Atlasgebirge zieht sich durch sein Inneres.','Es liegt geografisch nah an Europa — nur 14 km von Spanien entfernt.','Traditioneller Minztee ist ein Symbol der Gastfreundschaft hier.'],fr:['Ce pays est le seul pays africain avec des côtes à la fois atlantiques et méditerranéennes.','Le Sahara couvre sa région sud-est.','Marrakech est célèbre pour sa medina animée et ses souks.','Le pays est l\'un des principaux producteurs mondiaux de phosphates.','Sa capitale est Rabat, pas Casablanca.','Le massif de l\'Atlas traverse son intérieur.','Il est géographiquement proche de l\'Europe — à seulement 14 km de l\'Espagne.','Le thé à la menthe traditionnel est un symbole d\'hospitalité ici.'],es:['Este país es el único africano con costas tanto atlánticas como mediterráneas.','El Sahara cubre su región sureste.','Marrakech es famosa por su animada medina y sus zocos.','El país es uno de los mayores productores mundiales de fosfatos.','Su capital es Rabat, no Casablanca.','El Atlas recorre su interior.','Está geográficamente cerca de Europa, solo a 14 km de España.','El té de menta tradicional es un símbolo de hospitalidad aquí.']}},
  {n:'Peru',names:{de:'Peru',fr:'Pérou',es:'Perú'},f:'🇵🇪',facts:{en:['This country is home to Machu Picchu, a 15th-century Inca citadel.','It is the third-largest country in South America.','The Amazon River originates here.','The country has three distinct regions: coast, highlands, and jungle.','Quinoa has been grown here for thousands of years.','Lima is one of the largest cities in South America.','The Inca Empire was centred in this country.','Lake Titicaca, the world\'s highest navigable lake, borders this country.'],de:['Dieses Land beherbergt Machu Picchu, eine Inka-Festung aus dem 15. Jahrhundert.','Es ist das drittgrößte Land in Südamerika.','Der Amazonas entspringt hier.','Das Land hat drei unterschiedliche Regionen: Küste, Hochland und Dschungel.','Quinoa wird hier seit Tausenden von Jahren angebaut.','Lima ist eine der größten Städte Südamerikas.','Das Inca-Reich hatte seinen Mittelpunkt in diesem Land.','Der Titicacasee, der höchste schiffbare See der Welt, grenzt an dieses Land.'],fr:['Ce pays abrite le Machu Picchu, une citadelle inca du XVe siècle.','C\'est le troisième plus grand pays d\'Amérique du Sud.','L\'Amazone prend sa source ici.','Le pays a trois régions distinctes : côte, hauts plateaux et jungle.','Le quinoa y est cultivé depuis des millénaires.','Lima est l\'une des plus grandes villes d\'Amérique du Sud.','L\'Empire inca était centré dans ce pays.','Le lac Titicaca, le lac navigable le plus haut du monde, borde ce pays.'],es:['Este país alberga Machu Picchu, una ciudadela inca del siglo XV.','Es el tercer país más grande de América del Sur.','El río Amazonas nace aquí.','El país tiene tres regiones distintas: costa, sierra y selva.','La quinoa se ha cultivado aquí durante miles de años.','Lima es una de las ciudades más grandes de América del Sur.','El Imperio Inca tuvo su centro en este país.','El lago Titicaca, el lago navegable más alto del mundo, bordea este país.']}},
  {n:'Colombia',names:{de:'Kolumbien',fr:'Colombie',es:'Colombia'},f:'🇨🇴',facts:{en:['This country is the only one in South America with both Pacific and Caribbean coasts.','It is the world\'s largest producer of emeralds.','Coffee from here is among the most famous in the world.','The country is named after Christopher Columbus.','It is the third most biodiverse country on Earth.','Gabriel García Márquez, Nobel laureate, was born here.','The capital Bogotá sits at 2,600 metres above sea level.','The country borders 5 other South American nations.'],de:['Dieses Land ist das einzige in Südamerika mit sowohl Pazifik- als auch Karibikküste.','Es ist der weltgrößte Produzent von Smaragden.','Kaffee von hier gehört zu den berühmtesten der Welt.','Das Land ist nach Christoph Kolumbus benannt.','Es ist das drittbiologisch vielfältigste Land der Erde.','Gabriel García Márquez, Nobelpreisträger, wurde hier geboren.','Die Hauptstadt Bogotá liegt auf 2.600 Metern über dem Meeresspiegel.','Das Land grenzt an 5 andere südamerikanische Nationen.'],fr:['Ce pays est le seul d\'Amérique du Sud avec des côtes à la fois sur le Pacifique et les Caraïbes.','C\'est le plus grand producteur mondial d\'émeraudes.','Le café d\'ici est parmi les plus célèbres au monde.','Le pays est nommé d\'après Christophe Colomb.','C\'est le troisième pays le plus biodiversifié de la Terre.','Gabriel García Márquez, lauréat du prix Nobel, y est né.','La capitale Bogotá est à 2 600 mètres au-dessus du niveau de la mer.','Le pays borde 5 autres nations d\'Amérique du Sud.'],es:['Este país es el único en América del Sur con costas tanto en el Pacífico como en el Caribe.','Es el mayor productor mundial de esmeraldas.','El café de aquí está entre los más famosos del mundo.','El país lleva el nombre de Cristóbal Colón.','Es el tercer país más biodiverso de la Tierra.','Gabriel García Márquez, Nobel laureado, nació aquí.','La capital Bogotá se encuentra a 2.600 metros sobre el nivel del mar.','El país limita con 5 otras naciones sudamericanas.']}},
  {n:'Vietnam',names:{de:'Vietnam',fr:'Viêt Nam',es:'Vietnam'},f:'🇻🇳',facts:{en:['This country is shaped like the letter S and stretches 1,650 km from north to south.','It is the world\'s second-largest exporter of coffee.','Ha Long Bay, with thousands of limestone islands, is a UNESCO site here.','The country was divided in two from 1954 to 1975.','Pho soup is its most famous culinary export.','The currency is the Dong.','The country borders China, Laos, and Cambodia.','Over 90 million people live here, making it one of Asia\'s most populous.'],de:['Dieses Land ist wie der Buchstabe S geformt und erstreckt sich 1.650 km von Nord nach Süd.','Es ist der zweitgrößte Kaffeexporteur der Welt.','Die Ha-Long-Bucht mit Tausenden von Kalksteininseln ist hier ein UNESCO-Welterbe.','Das Land war von 1954 bis 1975 in zwei Teile geteilt.','Pho-Suppe ist sein bekanntester kulinarischer Export.','Die Währung ist der Dong.','Das Land grenzt an China, Laos und Kambodscha.','Über 90 Millionen Menschen leben hier, was es zu einem der bevölkerungsreichsten in Asien macht.'],fr:['Ce pays a la forme de la lettre S et s\'étend sur 1 650 km du nord au sud.','C\'est le deuxième plus grand exportateur mondial de café.','La baie d\'Ha Long, avec ses milliers d\'îles calcaires, est un site UNESCO ici.','Le pays fut divisé en deux de 1954 à 1975.','La soupe pho est sa plus célèbre exportation culinaire.','La monnaie est le Dong.','Le pays borde la Chine, le Laos et le Cambodge.','Plus de 90 millions de personnes y vivent, ce qui en fait l\'un des plus peuplés d\'Asie.'],es:['Este país tiene forma de letra S y se extiende 1.650 km de norte a sur.','Es el segundo mayor exportador de café del mundo.','La bahía de Ha Long, con miles de islas de piedra caliza, es un sitio UNESCO aquí.','El país estuvo dividido en dos de 1954 a 1975.','La sopa Pho es su exportación culinaria más famosa.','La moneda es el Dong.','El país limita con China, Laos y Camboya.','Más de 90 millones de personas viven aquí, lo que lo convierte en uno de los más poblados de Asia.']}},
  {n:'Nigeria',names:{de:'Nigeria',fr:'Nigeria',es:'Nigeria'},f:'🇳🇬',facts:{en:['This country has the largest population in Africa.','It is Africa\'s largest economy.','Over 500 languages are spoken here — more than any other country.','The country is the world\'s 6th-largest oil producer.','Nollywood, based here, is the world\'s second-largest film industry.','The country gained independence from Britain in 1960.','Lagos is one of the fastest-growing cities in the world.','The official language is English.'],de:['Dieses Land hat die größte Bevölkerung Afrikas.','Es ist die größte Volkswirtschaft Afrikas.','Hier werden über 500 Sprachen gesprochen — mehr als in jedem anderen Land.','Das Land ist der sechstgrößte Ölproduzent der Welt.','Nollywood, das hier ansässig ist, ist die zweitgrößte Filmindustrie der Welt.','Das Land erlangte 1960 die Unabhängigkeit von Großbritannien.','Lagos ist eine der am schnellsten wachsenden Städte der Welt.','Die Amtssprache ist Englisch.'],fr:['Ce pays a la plus grande population d\'Afrique.','C\'est la plus grande économie d\'Afrique.','Plus de 500 langues y sont parlées — plus que dans tout autre pays.','Le pays est le 6e plus grand producteur de pétrole au monde.','Nollywood, basé ici, est la deuxième industrie cinématographique mondiale.','Le pays a obtenu son indépendance de la Grande-Bretagne en 1960.','Lagos est l\'une des villes à la croissance la plus rapide du monde.','La langue officielle est l\'anglais.'],es:['Este país tiene la mayor población de África.','Es la economía más grande de África.','Aquí se hablan más de 500 idiomas, más que en cualquier otro país.','El país es el 6° mayor productor de petróleo del mundo.','Nollywood, con sede aquí, es la segunda industria cinematográfica más grande del mundo.','El país obtuvo su independencia de Gran Bretaña en 1960.','Lagos es una de las ciudades de más rápido crecimiento del mundo.','El idioma oficial es el inglés.']}},
  {n:'Iran',names:{de:'Iran',fr:'Iran',es:'Irán'},f:'🇮🇷',facts:{en:['This country was known as Persia until 1935.','It has the world\'s second-largest natural gas reserves.','The ancient Silk Road passed through this country.','Persian carpets from here are world-famous.','The country has a population of over 85 million.','Mount Damavand, its highest peak, is a dormant volcano.','The country uses the solar calendar, not the Gregorian.','Persepolis, an ancient city, was the capital of the Persian Empire.'],de:['Dieses Land war bis 1935 als Persien bekannt.','Es hat die zweitgrößten Erdgasreserven der Welt.','Die antike Seidenstraße führte durch dieses Land.','Persische Teppiche von hier sind weltberühmt.','Das Land hat eine Bevölkerung von über 85 Millionen.','Der Damavand, der höchste Gipfel, ist ein schlafender Vulkan.','Das Land verwendet den Sonnenkalender, nicht den Gregorianischen.','Persepolis, eine antike Stadt, war die Hauptstadt des Persischen Reiches.'],fr:['Ce pays était connu sous le nom de Perse jusqu\'en 1935.','Il détient les deuxièmes plus grandes réserves mondiales de gaz naturel.','L\'ancienne Route de la Soie traversait ce pays.','Les tapis persans d\'ici sont mondialement célèbres.','Le pays compte une population de plus de 85 millions d\'habitants.','Le mont Damavand, son point culminant, est un volcan endormi.','Le pays utilise le calendrier solaire, pas le calendrier grégorien.','Persépolis, une ville antique, était la capitale de l\'Empire perse.'],es:['Este país era conocido como Persia hasta 1935.','Tiene las segundas reservas de gas natural más grandes del mundo.','La antigua Ruta de la Seda pasaba por este país.','Las alfombras persas de aquí son mundialmente famosas.','El país tiene una población de más de 85 millones.','El monte Damavand, su pico más alto, es un volcán inactivo.','El país utiliza el calendario solar, no el gregoriano.','Persépolis, una ciudad antigua, fue la capital del Imperio Persa.']}},
  {n:'Kazakhstan',names:{de:'Kasachstan',fr:'Kazakhstan',es:'Kazajistán'},f:'🇰🇿',facts:{en:['This country is the largest landlocked country in the world.','It is the ninth-largest country in the world by area.','The world\'s first and largest space launch facility is here.','It borders both Russia and China.','The country holds vast oil and gas reserves.','It was part of the Soviet Union until 1991.','The country has over 100 different ethnic groups.','The Steppe — a vast grassland — covers much of the country.'],de:['Dieses Land ist das größte Binnenland der Welt.','Es ist das neuntgrößte Land der Welt nach Fläche.','Die weltweit erste und größte Raumfahrtanlage befindet sich hier.','Es grenzt sowohl an Russland als auch an China.','Das Land verfügt über riesige Öl- und Gasreserven.','Es war bis 1991 Teil der Sowjetunion.','Das Land hat über 100 verschiedene ethnische Gruppen.','Die Steppe — eine riesige Grasfläche — bedeckt einen Großteil des Landes.'],fr:['Ce pays est le plus grand pays enclavé du monde.','C\'est le neuvième plus grand pays du monde par sa superficie.','La première et la plus grande installation de lancement spatial du monde se trouve ici.','Il borde à la fois la Russie et la Chine.','Le pays dispose de vastes réserves de pétrole et de gaz.','Il faisait partie de l\'Union soviétique jusqu\'en 1991.','Le pays compte plus de 100 groupes ethniques différents.','La steppe — une vaste prairie — couvre une grande partie du pays.'],es:['Este país es el más grande sin salida al mar del mundo.','Es el noveno país más grande del mundo por área.','La primera e más grande instalación de lanzamiento espacial del mundo está aquí.','Limita tanto con Rusia como con China.','El país tiene vastas reservas de petróleo y gas.','Fue parte de la Unión Soviética hasta 1991.','El país tiene más de 100 grupos étnicos diferentes.','La estepa, una vasta llanura de hierba, cubre gran parte del país.']}},
  {n:'Ethiopia',names:{de:'Äthiopien',fr:'Éthiopie',es:'Etiopía'},f:'🇪🇹',facts:{en:['This country is the oldest independent nation in Africa.','It is home to the Blue Nile\'s source, Lake Tana.','The country has its own alphabet, called Ge\'ez.','Lucy, one of the earliest known human ancestors, was found here.','It was never colonized, except briefly by Italy.','Coffee is believed to have originated in this country.','Addis Ababa hosts the African Union headquarters.','The country follows a unique calendar with 13 months.'],de:['Dieses Land ist die älteste unabhängige Nation Afrikas.','Es beherbergt die Quelle des Blauen Nils, den Tanasee.','Das Land hat sein eigenes Alphabet, genannt Ge\'ez.','Lucy, einer der frühesten bekannten menschlichen Vorfahren, wurde hier gefunden.','Es wurde nie kolonisiert, außer kurz durch Italien.','Kaffee soll in diesem Land entstanden sein.','Addis Abeba beherbergt den Hauptsitz der Afrikanischen Union.','Das Land folgt einem einzigartigen Kalender mit 13 Monaten.'],fr:['Ce pays est la nation indépendante la plus ancienne d\'Afrique.','Il abrite la source du Nil Bleu, le lac Tana.','Le pays a son propre alphabet, appelé Ge\'ez.','Lucy, l\'un des plus anciens ancêtres humains connus, y a été trouvée.','Il n\'a jamais été colonisé, sauf brièvement par l\'Italie.','Le café serait originaire de ce pays.','Addis-Abeba accueille le siège de l\'Union africaine.','Le pays suit un calendrier unique avec 13 mois.'],es:['Este país es la nación independiente más antigua de África.','Alberga la fuente del Nilo Azul, el lago Tana.','El país tiene su propio alfabeto, llamado Ge\'ez.','Lucy, uno de los antepasados humanos más antiguos conocidos, fue encontrado aquí.','Nunca fue colonizado, excepto brevemente por Italia.','Se cree que el café se originó en este país.','Addis Abeba alberga la sede de la Unión Africana.','El país sigue un calendario único con 13 meses.']}},
  {n:'Ghana',names:{de:'Ghana',fr:'Ghana',es:'Ghana'},f:'🇬🇭',facts:{en:['This was the first sub-Saharan African country to gain independence, in 1957.','It was formerly known as the Gold Coast under British rule.','The country is the world\'s second-largest producer of cocoa.','Lake Volta here is one of the largest man-made lakes in the world.','The official language is English.','It is considered one of Africa\'s most stable democracies.','Kente cloth, a colourful woven fabric, originates here.','Accra is the capital and largest city.'],de:['Dies war das erste Land südlich der Sahara, das 1957 die Unabhängigkeit erlangte.','Es war früher unter britischer Herrschaft als Goldküste bekannt.','Das Land ist der zweitgrößte Kakaoproduzent der Welt.','Der Volta-See hier ist einer der größten künstlichen Seen der Welt.','Die Amtssprache ist Englisch.','Es gilt als eine der stabilsten Demokratien Afrikas.','Kente-Stoff, ein buntes Webgewebe, stammt von hier.','Accra ist die Hauptstadt und größte Stadt.'],fr:['C\'était le premier pays d\'Afrique subsaharienne à obtenir son indépendance, en 1957.','Il était autrefois connu sous le nom de Côte de l\'Or sous domination britannique.','Le pays est le deuxième producteur mondial de cacao.','Le lac Volta est l\'un des plus grands lacs artificiels du monde.','La langue officielle est l\'anglais.','Il est considéré comme l\'une des démocraties les plus stables d\'Afrique.','Le tissu kente, un tissu tissé coloré, est originaire d\'ici.','Accra est la capitale et la plus grande ville.'],es:['Este fue el primer país subsahariano en obtener la independencia, en 1957.','Anteriormente era conocido como Costa de Oro bajo el dominio británico.','El país es el segundo mayor productor de cacao del mundo.','El lago Volta aquí es uno de los lagos artificiales más grandes del mundo.','El idioma oficial es el inglés.','Se considera una de las democracias más estables de África.','La tela kente, un tejido de colores, se origina aquí.','Acra es la capital y la ciudad más grande.']}},
  {n:'Tanzania',names:{de:'Tansania',fr:'Tanzanie',es:'Tanzania'},f:'🇹🇿',facts:{en:['This country is home to Mount Kilimanjaro, Africa\'s highest peak.','The Serengeti plains here host the greatest wildlife migration on Earth.','The island of Zanzibar is part of this country.','It borders Lake Victoria, the world\'s largest tropical lake.','Swahili originated in the coastal regions of this country.','The country became independent in 1961.','It is one of the largest countries in Africa by area.','The country is home to around 130 different ethnic groups.'],de:['Dieses Land beherbergt den Kilimandscharo, Afrikas höchsten Gipfel.','Die Serengeti-Ebenen hier beherbergen die größte Wildtierwanderung der Erde.','Die Insel Sansibar ist Teil dieses Landes.','Es grenzt an den Victoriasee, den weltgrößten tropischen See.','Swahili entstand in den Küstenregionen dieses Landes.','Das Land wurde 1961 unabhängig.','Es ist eines der flächenmäßig größten Länder Afrikas.','Das Land beherbergt rund 130 verschiedene ethnische Gruppen.'],fr:['Ce pays abrite le Kilimandjaro, le point culminant de l\'Afrique.','Les plaines du Serengeti accueillent la plus grande migration de faune de la Terre.','L\'île de Zanzibar fait partie de ce pays.','Il borde le lac Victoria, le plus grand lac tropical du monde.','Le swahili est originaire des régions côtières de ce pays.','Le pays est devenu indépendant en 1961.','C\'est l\'un des plus grands pays d\'Afrique par sa superficie.','Le pays abrite environ 130 groupes ethniques différents.'],es:['Este país alberga el Kilimanjaro, el pico más alto de África.','Las llanuras del Serengeti aquí albergan la mayor migración de fauna de la Tierra.','La isla de Zanzíbar forma parte de este país.','Limita con el lago Victoria, el lago tropical más grande del mundo.','El suajili se originó en las regiones costeras de este país.','El país se independizó en 1961.','Es uno de los países más grandes de África por área.','El país alberga alrededor de 130 grupos étnicos diferentes.']}},
  {n:'Pakistan',names:{de:'Pakistan',fr:'Pakistan',es:'Pakistán'},f:'🇵🇰',facts:{en:['This country has the second-largest population in the Muslim world.','Five of the world\'s 14 highest peaks are here, including K2.','The Indus River civilisation is one of the world\'s oldest urban cultures.','The country has a nuclear weapons programme.','The official languages are Urdu and English.','It borders India, Afghanistan, Iran, and China.','The country was created in 1947 when British India was partitioned.','Karachi is the largest city and economic hub.'],de:['Dieses Land hat die zweitgrößte Bevölkerung in der muslimischen Welt.','Fünf der 14 höchsten Gipfel der Welt liegen hier, darunter der K2.','Die Industal-Zivilisation ist eine der ältesten Stadtkulturen der Welt.','Das Land hat ein Atomwaffenprogramm.','Die Amtssprachen sind Urdu und Englisch.','Es grenzt an Indien, Afghanistan, Iran und China.','Das Land wurde 1947 gegründet, als Britisch-Indien geteilt wurde.','Karachi ist die größte Stadt und Wirtschaftszentrum.'],fr:['Ce pays a la deuxième plus grande population du monde musulman.','Cinq des 14 plus hauts sommets du monde se trouvent ici, dont le K2.','La civilisation de la vallée de l\'Indus est l\'une des plus anciennes cultures urbaines du monde.','Le pays possède un programme d\'armement nucléaire.','Les langues officielles sont l\'ourdou et l\'anglais.','Il borde l\'Inde, l\'Afghanistan, l\'Iran et la Chine.','Le pays fut créé en 1947 lors de la partition de l\'Inde britannique.','Karachi est la plus grande ville et le centre économique.'],es:['Este país tiene la segunda población más grande del mundo musulmán.','Cinco de los 14 picos más altos del mundo están aquí, incluido el K2.','La civilización del Indo es una de las culturas urbanas más antiguas del mundo.','El país tiene un programa de armas nucleares.','Los idiomas oficiales son el urdu y el inglés.','Limita con India, Afganistán, Irán y China.','El país fue creado en 1947 cuando la India británica fue particionada.','Karachi es la ciudad más grande y el centro económico.']}},
  {n:'Philippines',names:{de:'Philippinen',fr:'Philippines',es:'Filipinas'},f:'🇵🇭',facts:{en:['This country is an archipelago of over 7,600 islands.','It is the only predominantly Christian country in Asia.','The country has the longest coastline in Asia.','Filipino and English are both official languages.','It is located in the "Pacific Ring of Fire".','The country was a Spanish colony for over 300 years.','It is home to the world\'s largest rice terraces, a UNESCO site.','Manila is the densest city in the world by population.'],de:['Dieses Land ist ein Archipel aus über 7.600 Inseln.','Es ist das einzige überwiegend christliche Land in Asien.','Das Land hat die längste Küstenlinie in Asien.','Filipino und Englisch sind beide Amtssprachen.','Es liegt im "Pazifischen Feuerring".','Das Land war über 300 Jahre lang eine spanische Kolonie.','Es beherbergt die weltgrößten Reisterrassen, ein UNESCO-Welterbe.','Manila ist die bevölkerungsmäßig dichteste Stadt der Welt.'],fr:['Ce pays est un archipel de plus de 7 600 îles.','C\'est le seul pays à prédominance chrétienne d\'Asie.','Le pays a le littoral le plus long d\'Asie.','Le filipino et l\'anglais sont tous deux langues officielles.','Il est situé dans la "ceinture de feu du Pacifique".','Le pays a été une colonie espagnole pendant plus de 300 ans.','Il abrite les plus grandes rizières en terrasses du monde, un site UNESCO.','Manille est la ville la plus densément peuplée du monde.'],es:['Este país es un archipiélago de más de 7.600 islas.','Es el único país predominantemente cristiano de Asia.','El país tiene la línea costera más larga de Asia.','El filipino y el inglés son ambos idiomas oficiales.','Se encuentra en el "Cinturón de Fuego del Pacífico".','El país fue colonia española durante más de 300 años.','Alberga las terrazas de arroz más grandes del mundo, un sitio UNESCO.','Manila es la ciudad más densa del mundo por población.']}},
  {n:'Thailand',names:{de:'Thailand',fr:'Thaïlande',es:'Tailandia'},f:'🇹🇭',facts:{en:['This country was never colonized by a European power.','It is the world\'s largest exporter of rice.','The name of its capital is the longest city name in the world.','The country has the third-largest economy in Southeast Asia.','Buddhism is practised by over 90% of the population.','Over 30 million tourists visit here each year.','The country is home to over 40,000 Buddhist temples.','The national animal is the elephant.'],de:['Dieses Land wurde nie von einer europäischen Macht kolonisiert.','Es ist der weltgrößte Exporteur von Reis.','Der Name seiner Hauptstadt ist der längste Stadtname der Welt.','Das Land hat die drittgrößte Volkswirtschaft in Südostasien.','Buddhismus wird von über 90 % der Bevölkerung praktiziert.','Über 30 Millionen Touristen besuchen hier jedes Jahr.','Das Land beherbergt über 40.000 buddhistische Tempel.','Das Nationaltier ist der Elefant.'],fr:['Ce pays n\'a jamais été colonisé par une puissance européenne.','C\'est le plus grand exportateur mondial de riz.','Le nom de sa capitale est le nom de ville le plus long du monde.','Le pays a la troisième économie d\'Asie du Sud-Est.','Le bouddhisme est pratiqué par plus de 90 % de la population.','Plus de 30 millions de touristes le visitent chaque année.','Le pays abrite plus de 40 000 temples bouddhistes.','L\'animal national est l\'éléphant.'],es:['Este país nunca fue colonizado por una potencia europea.','Es el mayor exportador de arroz del mundo.','El nombre de su capital es el nombre de ciudad más largo del mundo.','El país tiene la tercera economía más grande del sudeste asiático.','El budismo es practicado por más del 90% de la población.','Más de 30 millones de turistas lo visitan cada año.','El país alberga más de 40.000 templos budistas.','El animal nacional es el elefante.']}},
  {n:'Malaysia',names:{de:'Malaysia',fr:'Malaisie',es:'Malasia'},f:'🇲🇾',facts:{en:['This country consists of two non-contiguous regions separated by the South China Sea.','The Petronas Towers were once the tallest buildings in the world.','It is one of the world\'s top producers of palm oil and rubber.','Over 60% of the country is covered in rainforest.','The country has 13 states and 3 federal territories.','Kuala Lumpur is the capital and largest city.','It borders Thailand, Indonesia, and Brunei.','English is widely spoken alongside the national language, Malay.'],de:['Dieses Land besteht aus zwei nicht zusammenhängenden Regionen, die durch das Südchinesische Meer getrennt sind.','Die Petronas Towers waren einst die höchsten Gebäude der Welt.','Es ist einer der weltgrößten Produzenten von Palmöl und Kautschuk.','Über 60 % des Landes sind von Regenwald bedeckt.','Das Land hat 13 Bundesstaaten und 3 Bundesterritorien.','Kuala Lumpur ist die Hauptstadt und größte Stadt.','Es grenzt an Thailand, Indonesien und Brunei.','Englisch wird neben der Landessprache Malaiisch weit verbreitet gesprochen.'],fr:['Ce pays se compose de deux régions non contiguës séparées par la mer de Chine méridionale.','Les tours Petronas étaient autrefois les bâtiments les plus hauts du monde.','C\'est l\'un des principaux producteurs mondiaux d\'huile de palme et de caoutchouc.','Plus de 60 % du pays est couvert de forêt tropicale.','Le pays compte 13 États et 3 territoires fédéraux.','Kuala Lumpur est la capitale et la plus grande ville.','Il borde la Thaïlande, l\'Indonésie et Brunei.','L\'anglais est largement parlé aux côtés de la langue nationale, le malais.'],es:['Este país consiste en dos regiones no contiguas separadas por el Mar del Sur de China.','Las Torres Petronas fueron una vez los edificios más altos del mundo.','Es uno de los mayores productores mundiales de aceite de palma y caucho.','Más del 60% del país está cubierto de selva tropical.','El país tiene 13 estados y 3 territorios federales.','Kuala Lumpur es la capital y la ciudad más grande.','Limita con Tailandia, Indonesia y Brunéi.','El inglés se habla ampliamente junto con el idioma nacional, el malayo.']}},
  {n:'South Korea',names:{de:'Südkorea',fr:'Corée du Sud',es:'Corea del Sur'},f:'🇰🇷',facts:{en:['This country transformed from one of the world\'s poorest to one of the richest in 50 years.','It has the fastest internet speeds in the world.','K-pop and K-dramas have made its culture globally famous.','Samsung, Hyundai, and LG are all from here.','The country shares the world\'s most heavily militarized border.','It hosted the Olympic Games in 1988 and 2018.','The traditional martial art Taekwondo originates here.','Seoul, the capital, is home to nearly half the country\'s population.'],de:['Dieses Land hat sich in 50 Jahren von einem der ärmsten zu einem der reichsten der Welt entwickelt.','Es hat die schnellsten Internetgeschwindigkeiten der Welt.','K-Pop und K-Dramen haben seine Kultur weltweit bekannt gemacht.','Samsung, Hyundai und LG stammen alle von hier.','Das Land teilt die am stärksten militarisierte Grenze der Welt.','Es war 1988 und 2018 Gastgeber der Olympischen Spiele.','Die traditionelle Kampfkunst Taekwondo stammt von hier.','Seoul, die Hauptstadt, beherbergt fast die Hälfte der Bevölkerung des Landes.'],fr:['Ce pays est passé de l\'un des plus pauvres à l\'un des plus riches du monde en 50 ans.','Il a les vitesses Internet les plus rapides au monde.','La K-pop et les K-dramas ont rendu sa culture mondialement célèbre.','Samsung, Hyundai et LG sont toutes originaires d\'ici.','Le pays partage la frontière la plus militarisée du monde.','Il a accueilli les Jeux olympiques en 1988 et 2018.','L\'art martial traditionnel Taekwondo est originaire d\'ici.','Séoul, la capitale, abrite près de la moitié de la population du pays.'],es:['Este país pasó de ser uno de los más pobres a uno de los más ricos del mundo en 50 años.','Tiene las velocidades de internet más rápidas del mundo.','El K-pop y los K-dramas han hecho su cultura famosa en todo el mundo.','Samsung, Hyundai y LG son todas de aquí.','El país comparte la frontera más militarizada del mundo.','Fue sede de los Juegos Olímpicos en 1988 y 2018.','El arte marcial tradicional Taekwondo se origina aquí.','Seúl, la capital, alberga casi la mitad de la población del país.']}},
  {n:'UK',names:{de:'Vereinigtes Königreich',fr:'Royaume-Uni',es:'Reino Unido'},f:'🇬🇧',facts:{en:['This country consists of four nations: England, Scotland, Wales, and Northern Ireland.','It was once the largest empire in history, covering a quarter of the world.','The Industrial Revolution began here in the 18th century.','English, spoken worldwide, originated in this country.','It is home to the oldest parliament still in operation.','The country drives on the left side of the road.','London is one of the world\'s leading financial centres.','The BBC, founded here, is one of the world\'s oldest broadcasters.'],de:['Dieses Land besteht aus vier Nationen: England, Schottland, Wales und Nordirland.','Es war einst das größte Imperium der Geschichte, das ein Viertel der Welt umfasste.','Die Industrielle Revolution begann hier im 18. Jahrhundert.','Englisch, weltweit gesprochen, stammt aus diesem Land.','Es beherbergt das älteste noch in Betrieb befindliche Parlament.','Das Land fährt auf der linken Straßenseite.','London ist eines der führenden Finanzzentren der Welt.','Die hier gegründete BBC ist einer der ältesten Rundfunksender der Welt.'],fr:['Ce pays se compose de quatre nations : l\'Angleterre, l\'Écosse, le Pays de Galles et l\'Irlande du Nord.','C\'était autrefois le plus grand empire de l\'histoire, couvrant un quart du monde.','La révolution industrielle a commencé ici au XVIIIe siècle.','L\'anglais, parlé dans le monde entier, est originaire de ce pays.','Il abrite le plus ancien parlement encore en activité.','Le pays conduit à gauche.','Londres est l\'un des principaux centres financiers mondiaux.','La BBC, fondée ici, est l\'un des plus anciens diffuseurs du monde.'],es:['Este país está compuesto por cuatro naciones: Inglaterra, Escocia, Gales e Irlanda del Norte.','Fue una vez el Imperio más grande de la historia, que cubría una cuarta parte del mundo.','La Revolución Industrial comenzó aquí en el siglo XVIII.','El inglés, hablado en todo el mundo, se originó en este país.','Alberga el parlamento más antiguo aún en funcionamiento.','El país conduce por el lado izquierdo de la carretera.','Londres es uno de los principales centros financieros del mundo.','La BBC, fundada aquí, es una de las emisoras de radio más antiguas del mundo.']}},
  {n:'USA',names:{de:'Vereinigte Staaten',fr:'États-Unis',es:'Estados Unidos'},f:'🇺🇸',facts:{en:['This country has the world\'s largest economy.','It has 50 states and spans 6 time zones.','The country landed the first humans on the Moon in 1969.','It is home to the most Nobel Prize winners of any country.','Hollywood, the global film industry capital, is here.','The country invented the internet and the airplane.','The Statue of Liberty was a gift from France.','It has the largest military budget in the world.'],de:['Dieses Land hat die größte Volkswirtschaft der Welt.','Es hat 50 Bundesstaaten und erstreckt sich über 6 Zeitzonen.','Das Land brachte 1969 die ersten Menschen auf den Mond.','Es beherbergt die meisten Nobelpreisträger aller Länder.','Hollywood, die globale Filmhauptstadt, befindet sich hier.','Das Land erfand das Internet und das Flugzeug.','Die Freiheitsstatue war ein Geschenk aus Frankreich.','Es hat das größte Militärbudget der Welt.'],fr:['Ce pays a la plus grande économie du monde.','Il compte 50 États et s\'étend sur 6 fuseaux horaires.','Le pays a envoyé les premiers humains sur la Lune en 1969.','Il compte le plus grand nombre de lauréats du prix Nobel de tous les pays.','Hollywood, la capitale mondiale de l\'industrie cinématographique, se trouve ici.','Le pays a inventé Internet et l\'avion.','La Statue de la Liberté était un cadeau de la France.','Il possède le plus grand budget militaire du monde.'],es:['Este país tiene la economía más grande del mundo.','Tiene 50 estados y abarca 6 zonas horarias.','El país aterrizó a los primeros humanos en la Luna en 1969.','Alberga el mayor número de ganadores del Premio Nobel de cualquier país.','Hollywood, la capital mundial de la industria cinematográfica, está aquí.','El país inventó internet y el avión.','La Estatua de la Libertad fue un regalo de Francia.','Tiene el mayor presupuesto militar del mundo.']}},
  {n:'Cuba',names:{de:'Kuba',fr:'Cuba',es:'Cuba'},f:'🇨🇺',facts:{en:['This island nation is the largest in the Caribbean.','Classic American cars from the 1950s are a famous sight on its streets.','The country has one of the highest literacy rates in the world.','Havana is the capital and largest city.','The country is famous for salsa music, rum, and cigars.','It is the only communist state in the Western Hemisphere.','Ernesto "Che" Guevara is closely associated with this country\'s revolution.','The country sits just 145 km from Florida, USA.'],de:['Diese Inselnation ist die größte in der Karibik.','Amerikanische Klassiker aus den 1950er Jahren sind ein berühmter Anblick auf seinen Straßen.','Das Land hat eine der höchsten Alphabetisierungsraten der Welt.','Havanna ist die Hauptstadt und größte Stadt.','Das Land ist berühmt für Salsa-Musik, Rum und Zigarren.','Es ist der einzige kommunistische Staat auf der westlichen Hemisphäre.','Ernesto "Che" Guevara wird eng mit der Revolution dieses Landes assoziiert.','Das Land liegt nur 145 km von Florida, USA, entfernt.'],fr:['Cette nation insulaire est la plus grande des Caraïbes.','Les voitures américaines classiques des années 1950 sont un spectacle célèbre dans ses rues.','Le pays a l\'un des taux d\'alphabétisation les plus élevés au monde.','La Havane est la capitale et la plus grande ville.','Le pays est célèbre pour la salsa, le rhum et les cigares.','C\'est le seul État communiste de l\'hémisphère occidental.','Ernesto "Che" Guevara est étroitement associé à la révolution de ce pays.','Le pays se trouve à seulement 145 km de la Floride, aux États-Unis.'],es:['Esta nación insular es la más grande del Caribe.','Los autos americanos clásicos de los años 50 son una vista famosa en sus calles.','El país tiene una de las tasas de alfabetización más altas del mundo.','La Habana es la capital y la ciudad más grande.','El país es famoso por la música salsa, el ron y los puros.','Es el único estado comunista en el hemisferio occidental.','Ernesto "Che" Guevara está estrechamente asociado con la revolución de este país.','El país está a solo 145 km de Florida, EE.UU.']}},
  {n:'Chile',names:{de:'Chile',fr:'Chili',es:'Chile'},f:'🇨🇱',facts:{en:['This is the world\'s longest country from north to south, stretching over 4,300 km.','It is the world\'s largest producer of copper.','The Atacama Desert here is the driest place on Earth.','Easter Island, famous for its Moai statues, belongs to this country.','The Andes run the entire length of the country.','It is considered the most stable economy in South America.','The country has a narrow average width of just 177 km.','Its wine production is world-famous.'],de:['Dies ist das längste Land der Welt von Nord nach Süd, das sich über 4.300 km erstreckt.','Es ist der weltgrößte Kupferproduzent.','Die Atacama-Wüste hier ist der trockenste Ort der Erde.','Die Osterinsel, berühmt für ihre Moai-Statuen, gehört zu diesem Land.','Die Anden verlaufen die gesamte Länge des Landes.','Es gilt als die stabilste Volkswirtschaft Südamerikas.','Das Land hat eine durchschnittliche Breite von nur 177 km.','Seine Weinproduktion ist weltberühmt.'],fr:['C\'est le pays le plus long du monde du nord au sud, s\'étendant sur plus de 4 300 km.','C\'est le plus grand producteur mondial de cuivre.','Le désert d\'Atacama est l\'endroit le plus aride de la Terre.','L\'île de Pâques, célèbre pour ses statues Moaï, appartient à ce pays.','Les Andes traversent toute la longueur du pays.','C\'est l\'économie la plus stable d\'Amérique du Sud.','Le pays a une largeur moyenne de seulement 177 km.','Sa production vinicole est mondialement célèbre.'],es:['Este es el país más largo del mundo de norte a sur, extendiéndose más de 4.300 km.','Es el mayor productor mundial de cobre.','El desierto de Atacama aquí es el lugar más seco de la Tierra.','La isla de Pascua, famosa por sus estatuas Moai, pertenece a este país.','Los Andes recorren toda la longitud del país.','Se considera la economía más estable de América del Sur.','El país tiene un ancho promedio de solo 177 km.','Su producción de vino es mundialmente famosa.']}},
  {n:'Czech Republic',names:{de:'Tschechien',fr:'République tchèque',es:'República Checa'},f:'🇨🇿',facts:{en:['This country consumes more beer per capita than any other nation.','Prague, its capital, is one of the best-preserved medieval cities in Europe.','The country is landlocked in the heart of Central Europe.','Bohemian crystal glasswork is a famous export.','Franz Kafka, one of the most influential writers, was born here.','It was part of Czechoslovakia until 1993.','The country is home to the world\'s largest castle by area.','It joined the European Union in 2004.'],de:['Dieses Land konsumiert mehr Bier pro Kopf als jede andere Nation.','Prag, seine Hauptstadt, ist eine der besterhaltenen mittelalterlichen Städte Europas.','Das Land ist im Herzen Mitteleuropas ein Binnenland.','Böhmisches Kristallglas ist ein berühmter Export.','Franz Kafka, einer der einflussreichsten Schriftsteller, wurde hier geboren.','Es war bis 1993 Teil der Tschechoslowakei.','Das Land beherbergt die nach Fläche größte Burg der Welt.','Es trat 2004 der Europäischen Union bei.'],fr:['Ce pays consomme plus de bière par habitant que toute autre nation.','Prague, sa capitale, est l\'une des villes médiévales les mieux préservées d\'Europe.','Le pays est enclavé au cœur de l\'Europe centrale.','Le verre de cristal de Bohême est un export célèbre.','Franz Kafka, l\'un des écrivains les plus influents, y est né.','Il faisait partie de la Tchécoslovaquie jusqu\'en 1993.','Le pays abrite le plus grand château du monde par superficie.','Il a rejoint l\'Union européenne en 2004.'],es:['Este país consume más cerveza per cápita que cualquier otra nación.','Praga, su capital, es una de las ciudades medievales mejor conservadas de Europa.','El país es un enclave en el corazón de Europa Central.','El cristal de Bohemia es un famoso producto de exportación.','Franz Kafka, uno de los escritores más influyentes, nació aquí.','Fue parte de Checoslovaquia hasta 1993.','El país alberga el castillo más grande del mundo por área.','Se unió a la Unión Europea en 2004.']}},
  {n:'Hungary',names:{de:'Ungarn',fr:'Hongrie',es:'Hungría'},f:'🇭🇺',facts:{en:['This country invented the Rubik\'s Cube.','Budapest is formed from two historic cities separated by a famous river.','The country is home to the largest thermal lake in the world.','Hungarian is unrelated to most European languages.','The country is famous for paprika and goulash.','It was part of the Austro-Hungarian Empire until 1918.','The Parliament building here is one of the largest in the world.','It borders 7 other countries.'],de:['Dieses Land erfand den Zauberwürfel.','Budapest setzt sich aus zwei historischen Städten zusammen, die durch einen berühmten Fluss getrennt sind.','Das Land beherbergt den größten Thermalsee der Welt.','Ungarisch ist mit den meisten europäischen Sprachen nicht verwandt.','Das Land ist berühmt für Paprika und Gulasch.','Es war bis 1918 Teil der Österreichisch-Ungarischen Monarchie.','Das Parlamentsgebäude hier ist eines der größten der Welt.','Es grenzt an 7 andere Länder.'],fr:['Ce pays a inventé le Rubik\'s Cube.','Budapest est formée de deux villes historiques séparées par un célèbre fleuve.','Le pays abrite le plus grand lac thermal du monde.','Le hongrois n\'a aucun lien avec la plupart des langues européennes.','Le pays est célèbre pour son paprika et son goulash.','Il faisait partie de l\'Empire austro-hongrois jusqu\'en 1918.','Le bâtiment du Parlement est l\'un des plus grands du monde.','Il borde 7 autres pays.'],es:['Este país inventó el Cubo de Rubik.','Budapest está formada por dos ciudades históricas separadas por un famoso río.','El país alberga el lago termal más grande del mundo.','El húngaro no está relacionado con la mayoría de los idiomas europeos.','El país es famoso por el pimentón y el gulash.','Fue parte del Imperio Austrohúngaro hasta 1918.','El edificio del Parlamento aquí es uno de los más grandes del mundo.','Limita con 7 otros países.']}},
  {n:'Romania',names:{de:'Rumänien',fr:'Roumanie',es:'Rumanía'},f:'🇷🇴',facts:{en:['This country is the origin of the Dracula legend, set in Transylvania.','It has the largest gold reserves in the European Union.','The country joined the EU in 2007.','Its capital Bucharest was once called "the Paris of the East".','The Danube forms most of its southern border.','Nadia Comaneci, first gymnast to score a perfect 10, is from here.','The Carpathian Mountains run through the heart of the country.','The country borders 5 nations including Ukraine and Bulgaria.'],de:['Dieses Land ist der Ursprung der Dracula-Legende, angesiedelt in Siebenbürgen.','Es hat die größten Goldreserven in der Europäischen Union.','Das Land trat 2007 der EU bei.','Seine Hauptstadt Bukarest wurde einst "das Paris des Ostens" genannt.','Die Donau bildet den Großteil seiner Südgrenze.','Nadia Comaneci, die erste Turnerin mit einer perfekten 10, stammt von hier.','Die Karpaten verlaufen durch das Herz des Landes.','Das Land grenzt an 5 Nationen, darunter Ukraine und Bulgarien.'],fr:['Ce pays est l\'origine de la légende de Dracula, se déroulant en Transylvanie.','Il détient les plus grandes réserves d\'or de l\'Union européenne.','Le pays a rejoint l\'UE en 2007.','Sa capitale Bucarest était autrefois appelée "le Paris de l\'Est".','Le Danube forme la majeure partie de sa frontière sud.','Nadia Comaneci, première gymnaste à obtenir un 10 parfait, est originaire d\'ici.','Les Carpates traversent le cœur du pays.','Le pays borde 5 nations dont l\'Ukraine et la Bulgarie.'],es:['Este país es el origen de la leyenda de Drácula, ambientada en Transilvania.','Tiene las mayores reservas de oro de la Unión Europea.','El país se unió a la UE en 2007.','Su capital Bucarest fue llamada una vez "el París del Este".','El Danubio forma la mayor parte de su frontera sur.','Nadia Comaneci, primera gimnasta en obtener un 10 perfecto, es de aquí.','Los Cárpatos atraviesan el corazón del país.','El país limita con 5 naciones, incluidas Ucrania y Bulgaria.']}},
  {n:'Croatia',names:{de:'Kroatien',fr:'Croatie',es:'Croacia'},f:'🇭🇷',facts:{en:['This country has over 1,200 islands along its Adriatic coast.','The necktie was invented here and is named after its people.','Dubrovnik\'s old city walls are among the best preserved in the world.','The country joined the EU in 2013.','Game of Thrones was partly filmed here.','It borders Slovenia, Hungary, Serbia, Bosnia, and Montenegro.','The country adopted the Euro as its currency in 2023.','Nikola Tesla was born in this country.'],de:['Dieses Land hat über 1.200 Inseln entlang seiner adriatischen Küste.','Die Krawatte wurde hier erfunden und ist nach seinem Volk benannt.','Die Altstadtmauern von Dubrovnik gehören zu den besterhaltenen der Welt.','Das Land trat 2013 der EU bei.','Game of Thrones wurde teilweise hier gedreht.','Es grenzt an Slowenien, Ungarn, Serbien, Bosnien und Montenegro.','Das Land führte 2023 den Euro als Währung ein.','Nikola Tesla wurde in diesem Land geboren.'],fr:['Ce pays compte plus de 1 200 îles le long de sa côte adriatique.','La cravate a été inventée ici et porte le nom de son peuple.','Les remparts de la vieille ville de Dubrovnik comptent parmi les mieux préservés au monde.','Le pays a rejoint l\'UE en 2013.','Game of Thrones a été partiellement tourné ici.','Il borde la Slovénie, la Hongrie, la Serbie, la Bosnie et le Monténégro.','Le pays a adopté l\'euro comme monnaie en 2023.','Nikola Tesla est né dans ce pays.'],es:['Este país tiene más de 1.200 islas a lo largo de su costa adriática.','La corbata fue inventada aquí y lleva el nombre de su pueblo.','Las murallas del casco antiguo de Dubrovnik están entre las mejor conservadas del mundo.','El país se unió a la UE en 2013.','Juego de Tronos fue filmado parcialmente aquí.','Limita con Eslovenia, Hungría, Serbia, Bosnia y Montenegro.','El país adoptó el Euro como moneda en 2023.','Nikola Tesla nació en este país.']}},
  {n:'Austria',names:{de:'Österreich',fr:'Autriche',es:'Austria'},f:'🇦🇹',facts:{en:['This country is the birthplace of Mozart, Beethoven spent much of his life here too.','Vienna was the capital of the Habsburg Empire for centuries.','The country is entirely landlocked, surrounded by 8 countries.','It is known for its Alpine skiing resorts.','The Vienna Philharmonic is one of the world\'s most famous orchestras.','Red Bull energy drink was invented here.','The country joined the EU in 1995 but is not in NATO.','Arnold Schwarzenegger was born here.'],de:['Dieses Land ist die Geburtsort Mozarts, und Beethoven verbrachte einen Großteil seines Lebens hier.','Wien war jahrhundertelang die Hauptstadt des Habsburgerreiches.','Das Land ist vollständig von 8 Ländern umgeben.','Es ist bekannt für seine Alpinskigebiete.','Die Wiener Philharmoniker sind eines der berühmtesten Orchester der Welt.','Red Bull Energy Drink wurde hier erfunden.','Das Land trat 1995 der EU bei, ist aber nicht in der NATO.','Arnold Schwarzenegger wurde hier geboren.'],fr:['Ce pays est le pays natal de Mozart, et Beethoven y a passé une grande partie de sa vie.','Vienne fut pendant des siècles la capitale de l\'Empire des Habsbourg.','Le pays est entièrement enclavé, entouré de 8 pays.','Il est connu pour ses stations de ski alpines.','La Philharmonie de Vienne est l\'un des orchestres les plus célèbres au monde.','La boisson énergisante Red Bull a été inventée ici.','Le pays a rejoint l\'UE en 1995 mais n\'est pas membre de l\'OTAN.','Arnold Schwarzenegger y est né.'],es:['Este país es el lugar de nacimiento de Mozart, y Beethoven también pasó gran parte de su vida aquí.','Viena fue la capital del Imperio Habsburgo durante siglos.','El país está completamente rodeado por 8 países.','Es conocido por sus estaciones de esquí alpino.','La Filarmónica de Viena es una de las orquestas más famosas del mundo.','La bebida energética Red Bull fue inventada aquí.','El país se unió a la UE en 1995 pero no es miembro de la OTAN.','Arnold Schwarzenegger nació aquí.']}},
  {n:'Belgium',names:{de:'Belgien',fr:'Belgique',es:'Bélgica'},f:'🇧🇪',facts:{en:['This country has three official languages: French, Dutch, and German.','It is the headquarters of the European Union and NATO.','Belgian chocolate and waffles are famous worldwide.','The country is one of the smallest in Europe.','Comic books like Tintin originate here.','It has some of the most complex highway lighting in the world.','The country produces over 800 varieties of beer.','Bruges and Ghent are its best-preserved medieval cities.'],de:['Dieses Land hat drei Amtssprachen: Französisch, Niederländisch und Deutsch.','Es ist der Hauptsitz der Europäischen Union und der NATO.','Belgische Schokolade und Waffeln sind weltweit berühmt.','Das Land ist eines der kleinsten in Europa.','Comics wie Tim und Struppi stammen von hier.','Es hat einige der komplexesten Autobahnbeleuchtungen der Welt.','Das Land produziert über 800 Biersorten.','Brügge und Gent sind seine besterhaltenen mittelalterlichen Städte.'],fr:['Ce pays a trois langues officielles : le français, le néerlandais et l\'allemand.','C\'est le siège de l\'Union européenne et de l\'OTAN.','Le chocolat et les gaufres belges sont célèbres dans le monde entier.','Le pays est l\'un des plus petits d\'Europe.','Des bandes dessinées comme Tintin y sont originaires.','Il possède certains des éclairages autoroutiers les plus complexes du monde.','Le pays produit plus de 800 variétés de bière.','Bruges et Gand sont ses villes médiévales les mieux conservées.'],es:['Este país tiene tres idiomas oficiales: francés, neerlandés y alemán.','Es la sede de la Unión Europea y la OTAN.','El chocolate y los gofres belgas son famosos en todo el mundo.','El país es uno de los más pequeños de Europa.','Los cómics como Tintín se originaron aquí.','Tiene algunos de los sistemas de iluminación de autopistas más complejos del mundo.','El país produce más de 800 variedades de cerveza.','Brujas y Gante son sus ciudades medievales mejor conservadas.']}},
  {n:'Denmark',names:{de:'Dänemark',fr:'Danemark',es:'Dinamarca'},f:'🇩🇰',facts:{en:['This country is consistently ranked the happiest in the world.','The LEGO brick was invented here.','The country includes Greenland, the world\'s largest island.','Vikings originated from this Scandinavian nation.','It is one of the world\'s largest producers of wind energy.','The Little Mermaid statue in its capital is a famous landmark.','It is part of the European Union but not the Eurozone.','The country has been a monarchy for over 1,000 years.'],de:['Dieses Land wird konsequent als das glücklichste der Welt eingestuft.','Der LEGO-Stein wurde hier erfunden.','Das Land umfasst Grönland, die größte Insel der Welt.','Wikinger stammen aus dieser skandinavischen Nation.','Es ist einer der weltgrößten Produzenten von Windenergie.','Die Kleine-Meerjungfrau-Statue in seiner Hauptstadt ist ein berühmtes Wahrzeichen.','Es ist Teil der EU, aber nicht der Eurozone.','Das Land ist seit über 1.000 Jahren eine Monarchie.'],fr:['Ce pays est régulièrement classé comme le plus heureux du monde.','La brique LEGO a été inventée ici.','Le pays comprend le Groenland, la plus grande île du monde.','Les Vikings sont originaires de cette nation scandinave.','C\'est l\'un des plus grands producteurs mondiaux d\'énergie éolienne.','La statue de la Petite Sirène dans sa capitale est un monument célèbre.','Il fait partie de l\'Union européenne mais pas de la zone euro.','Le pays est une monarchie depuis plus de 1 000 ans.'],es:['Este país es clasificado constantemente como el más feliz del mundo.','El ladrillo LEGO fue inventado aquí.','El país incluye Groenlandia, la isla más grande del mundo.','Los vikingos se originaron de esta nación escandinava.','Es uno de los mayores productores mundiales de energía eólica.','La estatua de la Sirenita en su capital es un famoso hito.','Es parte de la Unión Europea pero no de la eurozona.','El país ha sido una monarquía durante más de 1.000 años.']}},
  {n:'Finland',names:{de:'Finnland',fr:'Finlande',es:'Finlandia'},f:'🇫🇮',facts:{en:['This country has the highest number of saunas per capita in the world.','It is home to Santa Claus\'s official post office in Rovaniemi.','The country has the best education system in the world according to PISA rankings.','It borders Sweden, Norway, and Russia.','Nokia, the phone company, was founded here.','The midnight sun lasts for weeks in summer in the north.','It has over 188,000 lakes.','The country gained independence from Russia in 1917.'],de:['Dieses Land hat die meisten Saunas pro Kopf der Welt.','Es beherbergt das offizielle Postamt des Weihnachtsmanns in Rovaniemi.','Das Land hat laut PISA-Rankings das beste Bildungssystem der Welt.','Es grenzt an Schweden, Norwegen und Russland.','Nokia, das Telefonunternehmen, wurde hier gegründet.','Die Mitternachtssonne dauert im Norden im Sommer wochenlang.','Es hat über 188.000 Seen.','Das Land erlangte 1917 die Unabhängigkeit von Russland.'],fr:['Ce pays a le plus grand nombre de saunas par habitant au monde.','Il abrite le bureau de poste officiel du Père Noël à Rovaniemi.','Le pays possède le meilleur système éducatif au monde selon les classements PISA.','Il borde la Suède, la Norvège et la Russie.','Nokia, l\'entreprise de téléphonie, y a été fondée.','Le soleil de minuit dure des semaines en été dans le nord.','Il compte plus de 188 000 lacs.','Le pays a obtenu son indépendance de la Russie en 1917.'],es:['Este país tiene el mayor número de saunas per cápita del mundo.','Alberga la oficina de correos oficial de Papá Noel en Rovaniemi.','El país tiene el mejor sistema educativo del mundo según los rankings PISA.','Limita con Suecia, Noruega y Rusia.','Nokia, la empresa de telefonía, fue fundada aquí.','El sol de medianoche dura semanas en verano en el norte.','Tiene más de 188.000 lagos.','El país obtuvo la independencia de Rusia en 1917.']}},
  {n:'Israel',names:{de:'Israel',fr:'Israël',es:'Israel'},f:'🇮🇱',facts:{en:['This country has more startups per capita than any other in the world.','The Dead Sea, the lowest point on Earth, borders this country.','Jerusalem, one of the world\'s oldest cities, is located here.','It is the only country in the world with a majority Jewish population.','The country was founded in 1948.','Hebrew was revived as a modern spoken language here.','The country has compulsory military service for both men and women.','It borders Egypt, Jordan, Lebanon, and Syria.'],de:['Dieses Land hat mehr Startups pro Kopf als jedes andere Land der Welt.','Das Tote Meer, der tiefste Punkt der Erde, grenzt an dieses Land.','Jerusalem, eine der ältesten Städte der Welt, befindet sich hier.','Es ist das einzige Land der Welt mit einer jüdischen Bevölkerungsmehrheit.','Das Land wurde 1948 gegründet.','Hebräisch wurde hier als moderne gesprochene Sprache wiederbelebt.','Das Land hat Wehrpflicht für Männer und Frauen.','Es grenzt an Ägypten, Jordanien, Libanon und Syrien.'],fr:['Ce pays a plus de startups par habitant que tout autre pays du monde.','La mer Morte, le point le plus bas de la Terre, borde ce pays.','Jérusalem, l\'une des plus anciennes villes du monde, s\'y trouve.','C\'est le seul pays du monde avec une population majoritairement juive.','Le pays a été fondé en 1948.','L\'hébreu a été relancé comme langue parlée moderne ici.','Le pays a le service militaire obligatoire pour les hommes et les femmes.','Il borde l\'Égypte, la Jordanie, le Liban et la Syrie.'],es:['Este país tiene más startups per cápita que cualquier otro en el mundo.','El Mar Muerto, el punto más bajo de la Tierra, bordea este país.','Jerusalén, una de las ciudades más antiguas del mundo, está ubicada aquí.','Es el único país del mundo con una mayoría de población judía.','El país fue fundado en 1948.','El hebreo fue revivido como idioma moderno hablado aquí.','El país tiene servicio militar obligatorio para hombres y mujeres.','Limita con Egipto, Jordania, Líbano y Siria.']}},
  {n:'UAE',names:{de:'Vereinigte Arabische Emirate',fr:'Émirats arabes unis',es:'Emiratos Árabes Unidos'},f:'🇦🇪',facts:{en:['This country is home to the world\'s tallest building, the Burj Khalifa.','Over 80% of the population are foreign nationals.','The country has no income tax.','Dubai and Abu Dhabi are its most famous cities.','The country was founded in 1971 from seven smaller states.','It borders Saudi Arabia and Oman.','The country has transformed from fishing villages to a global hub in 50 years.','Camel racing is a traditional sport here.'],de:['Dieses Land beherbergt das höchste Gebäude der Welt, den Burj Khalifa.','Über 80 % der Bevölkerung sind ausländische Staatsangehörige.','Das Land hat keine Einkommensteuer.','Dubai und Abu Dhabi sind seine bekanntesten Städte.','Das Land wurde 1971 aus sieben kleineren Staaten gegründet.','Es grenzt an Saudi-Arabien und Oman.','Das Land hat sich in 50 Jahren von Fischerdörfern zu einem globalen Knotenpunkt gewandelt.','Kamelrennen ist hier ein traditioneller Sport.'],fr:['Ce pays abrite le plus grand bâtiment du monde, le Burj Khalifa.','Plus de 80 % de la population sont des ressortissants étrangers.','Le pays n\'a pas d\'impôt sur le revenu.','Dubaï et Abou Dabi sont ses villes les plus célèbres.','Le pays a été fondé en 1971 à partir de sept États plus petits.','Il borde l\'Arabie Saoudite et Oman.','Le pays s\'est transformé de villages de pêcheurs en plaque tournante mondiale en 50 ans.','Les courses de chameaux sont un sport traditionnel ici.'],es:['Este país alberga el edificio más alto del mundo, el Burj Khalifa.','Más del 80% de la población son nacionales extranjeros.','El país no tiene impuesto sobre la renta.','Dubai y Abu Dhabi son sus ciudades más famosas.','El país fue fundado en 1971 a partir de siete estados más pequeños.','Limita con Arabia Saudita y Omán.','El país se ha transformado de aldeas de pescadores a un centro global en 50 años.','Las carreras de camellos son un deporte tradicional aquí.']}},
  {n:'Singapore',names:{de:'Singapur',fr:'Singapour',es:'Singapur'},f:'🇸🇬',facts:{en:['This is one of only three city-states in the world.','It has the world\'s busiest port by shipping tonnage.','The country has four official languages.','It is the most densely populated country in Southeast Asia.','Chewing gum was banned here until 2004.','The country gained independence from Malaysia in 1965.','It consistently ranks first for ease of doing business.','Gardens by the Bay, with its giant Supertrees, is a modern landmark here.'],de:['Dies ist einer von nur drei Stadtstaaten der Welt.','Es hat den weltbeschäftigtsten Hafen nach Schiffstonnage.','Das Land hat vier Amtssprachen.','Es ist das am dichtesten besiedelte Land in Südostasien.','Kaugummi war hier bis 2004 verboten.','Das Land erlangte 1965 die Unabhängigkeit von Malaysia.','Es belegt durchweg den ersten Platz für die Leichtigkeit der Geschäftstätigkeit.','Gardens by the Bay mit seinen riesigen Superbäumen ist ein modernes Wahrzeichen hier.'],fr:['C\'est l\'un des seuls trois États-villes au monde.','Il possède le port le plus actif au monde en termes de tonnage de fret.','Le pays a quatre langues officielles.','C\'est le pays le plus densément peuplé d\'Asie du Sud-Est.','Le chewing-gum y était interdit jusqu\'en 2004.','Le pays a obtenu son indépendance de la Malaisie en 1965.','Il se classe régulièrement premier pour la facilité de faire des affaires.','Gardens by the Bay, avec ses gigantesques Supertrees, est un monument moderne ici.'],es:['Este es uno de solo tres estados-ciudad del mundo.','Tiene el puerto más ocupado del mundo por tonelaje de transporte.','El país tiene cuatro idiomas oficiales.','Es el país más densamente poblado del sudeste asiático.','El chicle estuvo prohibido aquí hasta 2004.','El país obtuvo la independencia de Malasia en 1965.','Consistentemente ocupa el primer lugar en facilidad para hacer negocios.','Gardens by the Bay, con sus gigantescos Superárboles, es un hito moderno aquí.']}},
  {n:'Bangladesh',names:{de:'Bangladesch',fr:'Bangladesh',es:'Bangladés'},f:'🇧🇩',facts:{en:['This country is one of the most densely populated in the world.','The Ganges-Brahmaputra Delta, the world\'s largest, is mostly in this country.','It became independent from Pakistan in 1971.','The country is the world\'s second-largest garment exporter.','Bengali is the official language.','Cyclones frequently hit this country due to its low-lying geography.','The country borders India and Myanmar.','Dhaka is one of the fastest-growing megacities in the world.'],de:['Dieses Land ist eines der am dichtesten besiedelten der Welt.','Das Ganges-Brahmaputra-Delta, das größte der Welt, liegt größtenteils in diesem Land.','Es wurde 1971 unabhängig von Pakistan.','Das Land ist der zweitgrößte Bekleidungsexporteur der Welt.','Bengalisch ist die Amtssprache.','Zyklone treffen dieses Land aufgrund seiner flachen Geographie häufig.','Das Land grenzt an Indien und Myanmar.','Dhaka ist eine der am schnellsten wachsenden Megastädte der Welt.'],fr:['Ce pays est l\'un des plus densément peuplés au monde.','Le delta du Gange-Brahmapoutre, le plus grand du monde, se trouve principalement dans ce pays.','Il est devenu indépendant du Pakistan en 1971.','Le pays est le deuxième exportateur mondial de vêtements.','Le bengali est la langue officielle.','Les cyclones frappent fréquemment ce pays en raison de sa géographie basse.','Le pays borde l\'Inde et le Myanmar.','Dacca est l\'une des mégapoles à la croissance la plus rapide du monde.'],es:['Este país es uno de los más densamente poblados del mundo.','El delta del Ganges-Brahmaputra, el más grande del mundo, se encuentra principalmente en este país.','Se independizó de Pakistán en 1971.','El país es el segundo mayor exportador de prendas de vestir del mundo.','El bengalí es el idioma oficial.','Los ciclones golpean frecuentemente este país debido a su geografía baja.','El país limita con India y Myanmar.','Daca es una de las megaciudades de más rápido crecimiento del mundo.']}},
  {n:'Myanmar',names:{de:'Myanmar',fr:'Myanmar',es:'Birmania'},f:'🇲🇲',facts:{en:['This country has the most Buddhist pagodas in the world.','It was formerly known as Burma.','The Irrawaddy River is the lifeline of this country.','It is the largest country in mainland Southeast Asia.','The country has over 135 officially recognised ethnic groups.','Shwedagon Pagoda in Yangon is over 2,500 years old.','The country borders China, India, Bangladesh, Thailand, and Laos.','The gem stone ruby is heavily mined here.'],de:['Dieses Land hat die meisten buddhistischen Pagoden der Welt.','Es war früher als Burma bekannt.','Der Irrawaddy-Fluss ist die Lebensader dieses Landes.','Es ist das größte Land auf dem Festland Südostasiens.','Das Land hat über 135 offiziell anerkannte ethnische Gruppen.','Die Shwedagon-Pagode in Yangon ist über 2.500 Jahre alt.','Das Land grenzt an China, Indien, Bangladesch, Thailand und Laos.','Der Edelstein Rubin wird hier in großen Mengen abgebaut.'],fr:['Ce pays possède le plus grand nombre de pagodes bouddhistes au monde.','Il était autrefois connu sous le nom de Birmanie.','Le fleuve Irrawaddy est l\'artère vitale de ce pays.','C\'est le plus grand pays d\'Asie du Sud-Est continentale.','Le pays compte plus de 135 groupes ethniques officiellement reconnus.','La pagode Shwedagon à Yangon a plus de 2 500 ans.','Le pays borde la Chine, l\'Inde, le Bangladesh, la Thaïlande et le Laos.','Le rubis est abondamment extrait ici.'],es:['Este país tiene la mayor cantidad de pagodas budistas del mundo.','Anteriormente era conocido como Birmania.','El río Irrawaddy es el sustento de este país.','Es el país más grande del sudeste asiático continental.','El país tiene más de 135 grupos étnicos oficialmente reconocidos.','La pagoda Shwedagon en Yangón tiene más de 2.500 años.','El país limita con China, India, Bangladesh, Tailandia y Laos.','La gema rubí se extrae abundantemente aquí.']}},
  {n:'Zimbabwe',names:{de:'Simbabwe',fr:'Zimbabwe',es:'Zimbabue'},f:'🇿🇼',facts:{en:['This country is home to Victoria Falls, one of the world\'s largest waterfalls.','It experienced the highest hyperinflation ever recorded, reaching billions percent.','The ancient city of Great Zimbabwe gave this country its name.','It borders South Africa, Botswana, Zambia, and Mozambique.','The country was formerly known as Rhodesia.','It gained independence in 1980.','Lake Kariba, one of the world\'s largest reservoirs, is here.','It once had one of the best education systems in Africa.'],de:['Dieses Land beherbergt die Victoriafälle, einen der größten Wasserfälle der Welt.','Es erlebte die höchste je verzeichnete Hyperinflation von Milliarden Prozent.','Die antike Stadt Simbabwe gab diesem Land seinen Namen.','Es grenzt an Südafrika, Botswana, Sambia und Mosambik.','Das Land war früher als Rhodesien bekannt.','Es erlangte 1980 die Unabhängigkeit.','Der Karibasee, eines der weltgrößten Stauseen, befindet sich hier.','Es hatte einst eines der besten Bildungssysteme Afrikas.'],fr:['Ce pays abrite les chutes Victoria, l\'une des plus grandes chutes d\'eau au monde.','Il a connu la plus forte hyperinflation jamais enregistrée, atteignant des milliards de pour cent.','L\'ancienne ville du Grand Zimbabwe a donné son nom à ce pays.','Il borde l\'Afrique du Sud, le Botswana, la Zambie et le Mozambique.','Le pays était autrefois connu sous le nom de Rhodésie.','Il a obtenu son indépendance en 1980.','Le lac Kariba, l\'un des plus grands réservoirs du monde, se trouve ici.','Il avait autrefois l\'un des meilleurs systèmes éducatifs d\'Afrique.'],es:['Este país alberga las cataratas Victoria, una de las cascadas más grandes del mundo.','Experimentó la hiperinflación más alta jamás registrada, alcanzando miles de millones por ciento.','La antigua ciudad de Gran Zimbabwe le dio nombre a este país.','Limita con Sudáfrica, Botsuana, Zambia y Mozambique.','El país era anteriormente conocido como Rodesia.','Obtuvo la independencia en 1980.','El lago Kariba, uno de los embalses más grandes del mundo, está aquí.','En su momento tuvo uno de los mejores sistemas educativos de África.']}},
  {n:'Senegal',names:{de:'Senegal',fr:'Sénégal',es:'Senegal'},f:'🇸🇳',facts:{en:['This country is the westernmost point of mainland Africa.','It completely surrounds the tiny country of Gambia.','Dakar was the finish line of the famous Paris-Dakar rally.','It was the first sub-Saharan African country to have a peaceful transfer of power.','The official language is French.','Wrestling is the national sport here, more popular even than football.','The country borders Mauritania, Mali, Guinea-Bissau, and Guinea.','Lake Retba, known as the Pink Lake, is a famous natural attraction.'],de:['Dieses Land ist der westlichste Punkt des afrikanischen Festlandes.','Es umschließt vollständig das winzige Land Gambia.','Dakar war das Ziel der berühmten Paris-Dakar-Rallye.','Es war das erste subsaharische afrikanische Land mit einem friedlichen Machtwechsel.','Die Amtssprache ist Französisch.','Ringen ist hier der nationale Sport, beliebter noch als Fußball.','Das Land grenzt an Mauretanien, Mali, Guinea-Bissau und Guinea.','Der Retbasee, bekannt als Pinker See, ist eine berühmte Naturattraktion.'],fr:['Ce pays est le point le plus occidental du continent africain.','Il entoure entièrement le petit pays de la Gambie.','Dakar était la ligne d\'arrivée du célèbre rallye Paris-Dakar.','C\'est le premier pays d\'Afrique subsaharienne à avoir connu un transfert pacifique du pouvoir.','La langue officielle est le français.','La lutte est le sport national ici, plus populaire même que le football.','Le pays borde la Mauritanie, le Mali, la Guinée-Bissau et la Guinée.','Le lac Retba, connu comme le lac Rose, est une attraction naturelle célèbre.'],es:['Este país es el punto más occidental del África continental.','Rodea completamente el pequeño país de Gambia.','Dakar era la línea de llegada del famoso rally París-Dakar.','Fue el primer país subsahariano en tener una transferencia pacífica del poder.','El idioma oficial es el francés.','La lucha es el deporte nacional aquí, más popular incluso que el fútbol.','El país limita con Mauritania, Mali, Guinea-Bisáu y Guinea.','El lago Retba, conocido como el Lago Rosa, es una famosa atracción natural.']}},
  {n:'Cameroon',names:{de:'Kamerun',fr:'Cameroun',es:'Camerún'},f:'🇨🇲',facts:{en:['This country is often called "Africa in miniature" due to its geographic diversity.','It is the only country in Africa with both French and English as official languages.','Mount Cameroon is the highest peak in West and Central Africa.','The country is one of the world\'s top producers of cocoa.','It borders 6 countries including Nigeria and the Central African Republic.','The country is home to rainforests, savannas, and deserts.','Lake Nyos here experienced a deadly volcanic CO2 eruption in 1986.','Yaoundé is the capital, while Douala is the largest city.'],de:['Dieses Land wird oft als "Afrika im Kleinen" bezeichnet aufgrund seiner geografischen Vielfalt.','Es ist das einzige Land in Afrika mit Französisch und Englisch als Amtssprachen.','Der Kamerunberg ist der höchste Gipfel in West- und Zentralafrika.','Das Land ist einer der weltgrößten Kakaoproduzenten.','Es grenzt an 6 Länder, darunter Nigeria und die Zentralafrikanische Republik.','Das Land beherbergt Regenwälder, Savannen und Wüsten.','Der Nyossee erlebte 1986 einen tödlichen vulkanischen CO2-Ausbruch.','Yaoundé ist die Hauptstadt, während Douala die größte Stadt ist.'],fr:['Ce pays est souvent appelé "l\'Afrique en miniature" en raison de sa diversité géographique.','C\'est le seul pays d\'Afrique avec le français et l\'anglais comme langues officielles.','Le mont Cameroun est le point culminant de l\'Afrique occidentale et centrale.','Le pays est l\'un des plus grands producteurs mondiaux de cacao.','Il borde 6 pays dont le Nigeria et la République centrafricaine.','Le pays abrite des forêts tropicales, des savanes et des déserts.','Le lac Nyos a connu une éruption mortelle de CO2 volcanique en 1986.','Yaoundé est la capitale, tandis que Douala est la plus grande ville.'],es:['Este país es a menudo llamado "África en miniatura" por su diversidad geográfica.','Es el único país de África con francés e inglés como idiomas oficiales.','El monte Camerún es el pico más alto de África occidental y central.','El país es uno de los mayores productores mundiales de cacao.','Limita con 6 países incluidos Nigeria y la República Centroafricana.','El país alberga selvas tropicales, sabanas y desiertos.','El lago Nyos experimentó una erupción mortal de CO2 volcánico en 1986.','Yaundé es la capital, mientras que Duala es la ciudad más grande.']}},
  {n:'Jordan',names:{de:'Jordanien',fr:'Jordanie',es:'Jordania'},f:'🇯🇴',facts:{en:['This country is home to Petra, the ancient rose-red city carved into rock.','The Dead Sea, the lowest point on Earth, forms part of its western border.','It is one of the most stable countries in the Middle East.','The country has almost no oil compared to its neighbours.','Over 2 million Palestinian refugees live here.','The official language is Arabic.','It borders Israel, Syria, Iraq, and Saudi Arabia.','The Wadi Rum desert was used as a film set for The Martian and Star Wars.'],de:['Dieses Land beherbergt Petra, die antike, in Fels gehauene rosenrote Stadt.','Das Tote Meer, der tiefste Punkt der Erde, bildet einen Teil seiner Westgrenze.','Es ist eines der stabilsten Länder im Nahen Osten.','Das Land hat im Vergleich zu seinen Nachbarn fast kein Öl.','Über 2 Millionen palästinensische Flüchtlinge leben hier.','Die Amtssprache ist Arabisch.','Es grenzt an Israel, Syrien, Irak und Saudi-Arabien.','Die Wadi-Rum-Wüste wurde als Filmset für Der Marsianer und Star Wars genutzt.'],fr:['Ce pays abrite Pétra, l\'ancienne cité rose-rouge sculptée dans le roc.','La mer Morte, le point le plus bas de la Terre, forme une partie de sa frontière ouest.','C\'est l\'un des pays les plus stables du Moyen-Orient.','Le pays n\'a presque pas de pétrole comparé à ses voisins.','Plus de 2 millions de réfugiés palestiniens y vivent.','La langue officielle est l\'arabe.','Il borde Israël, la Syrie, l\'Irak et l\'Arabie Saoudite.','Le désert de Wadi Rum a été utilisé comme décor de film pour Seul sur Mars et Star Wars.'],es:['Este país alberga Petra, la antigua ciudad de color rosa tallada en roca.','El Mar Muerto, el punto más bajo de la Tierra, forma parte de su frontera occidental.','Es uno de los países más estables de Oriente Medio.','El país tiene casi sin petróleo en comparación con sus vecinos.','Más de 2 millones de refugiados palestinos viven aquí.','El idioma oficial es el árabe.','Limita con Israel, Siria, Irak y Arabia Saudita.','El desierto de Wadi Rum fue usado como set de filmación para El Marciano y Star Wars.']}},
  {n:'Cuba',names:{de:'Kuba',fr:'Cuba',es:'Cuba'},f:'🇨🇺',facts:{en:['This island nation is the largest in the Caribbean.','Classic American cars from the 1950s are a famous sight on its streets.','The country has one of the highest literacy rates in the world.','Havana is the capital and largest city.','The country is famous for salsa music, rum, and cigars.','It is the only communist state in the Western Hemisphere.','Ernesto Che Guevara is closely associated with this country\'s revolution.','The country sits just 145 km from Florida, USA.'],de:['Diese Inselnation ist die größte in der Karibik.','Amerikanische Klassiker aus den 1950er Jahren sind ein berühmter Anblick auf seinen Straßen.','Das Land hat eine der höchsten Alphabetisierungsraten der Welt.','Havanna ist die Hauptstadt und größte Stadt.','Das Land ist berühmt für Salsa-Musik, Rum und Zigarren.','Es ist der einzige kommunistische Staat auf der westlichen Hemisphäre.','Ernesto Che Guevara ist eng mit der Revolution dieses Landes verbunden.','Das Land liegt nur 145 km von Florida, USA entfernt.'],fr:['Cette nation insulaire est la plus grande des Caraïbes.','Les voitures américaines classiques des années 1950 sont une vue célèbre dans ses rues.','Le pays a l\'un des taux d\'alphabétisation les plus élevés au monde.','La Havane est la capitale et la plus grande ville.','Le pays est célèbre pour la salsa, le rhum et les cigares.','C\'est le seul État communiste de l\'hémisphère occidental.','Ernesto Che Guevara est étroitement associé à la révolution de ce pays.','Le pays est à seulement 145 km de la Floride, aux États-Unis.'],es:['Esta nación insular es la más grande del Caribe.','Los autos americanos clásicos de los años 50 son una vista famosa en sus calles.','El país tiene una de las tasas de alfabetización más altas del mundo.','La Habana es la capital y la ciudad más grande.','El país es famoso por la música salsa, el ron y los puros.','Es el único estado comunista en el hemisferio occidental.','Ernesto Che Guevara está estrechamente asociado con la revolución de este país.','El país está a solo 145 km de Florida, EE.UU.']}},
];

let gtcState = {};

function gtcUpdateUI() {
  const inp = document.getElementById('gtc-inp');
  if(inp) inp.placeholder = T.gtcPlaceholder || 'Type a country name...';
}

function gtcGetContinent(countryName){
  for(const [region,names] of Object.entries(QCONTINENTS)){
    if(names.indexOf(countryName)>=0) return region;
  }
  return null;
}
function launchGTC() {
  gtcState = {
    pool: shuffle([...GTC_DATA]).slice(0, 10),
    round: 0, total: 10, score: 0, correct: 0, lastMode: 'gtc', totalClues: 0
  };
  gtcUpdateUI();
  showScreen('gtc');
  gtcRound();
}

function gtcRound() {
  if (gtcState.round >= gtcState.total) {
    showOver({score: gtcState.score, correct: gtcState.correct, total_q: gtcState.total, bestStreak: 0, total: gtcState.total, lastMode: 'gtc',
      gtcAvgClues: gtcState.correct>0 ? (gtcState.totalClues/gtcState.correct).toFixed(1) : null});
    return;
  }
  const c = gtcState.pool[gtcState.round];
  gtcState.country = c;
  gtcState.fi = 0;
  gtcState.attempts = 0;
  gtcState.done = false;
  gtcState.round++;
  document.getElementById('gtc-round-lbl').textContent = gtcState.round + '/' + gtcState.total;
  document.getElementById('gtc-prog').style.width = ((gtcState.round-1) / gtcState.total * 100) + '%';
  document.getElementById('gtc-clues').innerHTML = '';
  document.getElementById('gtc-inp').value = '';
  document.getElementById('gtc-inp').disabled = false;
  document.getElementById('gtc-inp').style.borderColor = 'var(--border)';
  document.getElementById('gtc-feedback').textContent = '';
  document.getElementById('gtc-result').style.display = 'none';
  document.getElementById('gtc-next-btn').style.display = 'none';
  gtcDrawLives();
  gtcShowFact();
  setTimeout(() => document.getElementById('gtc-inp').focus(), 100);
}

function gtcDrawLives() {
  const el = document.getElementById('gtc-lives');
  el.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const d = document.createElement('div');
    d.style.cssText = `width:8px;height:8px;border-radius:50%;background:${i < gtcState.attempts ? 'var(--rose)' : 'rgba(255,184,48,.4)'};transition:background .3s`;
    el.appendChild(d);
  }
}

function gtcShowFact() {
  const factsObj = gtcState.country.facts;
  const langFacts = (factsObj[curLang] || factsObj.en);
  const fact = langFacts[gtcState.fi];
  if (!fact) return;
  const clues = document.getElementById('gtc-clues');
  const card = document.createElement('div');
  card.style.cssText = 'background:var(--ink2);border:1px solid var(--border);border-radius:var(--r-md);padding:12px 14px;display:flex;gap:11px;align-items:flex-start;animation:fadeUp .3s ease';
  const clueLabel = {en:'CLUE',de:'HINWEIS',fr:'INDICE',es:'PISTA'}[curLang]||'CLUE';
  card.innerHTML = `<span style="font-family:var(--font-m);font-size:.58rem;letter-spacing:.12em;color:var(--violet);flex-shrink:0;margin-top:2px">${clueLabel} ${gtcState.fi + 1}</span><span style="font-size:.88rem;line-height:1.5">${fact}</span>`;
  clues.appendChild(card);
  gtcState.fi++;
}

// Levenshtein distance for fuzzy matching
function normalizeStr(s){
  return s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/&/g,' and ')
    .replace(/[^a-z0-9 ]/g,' ')
    .replace(/\s+/g,' ').trim();
}
function fuzzyMatch(typed,answer){
  var a=normalizeStr(typed),b=normalizeStr(answer);
  if(a===b)return true;
  var maxDist=b.length>10?3:2;
  if(levenshtein(a,b)<=maxDist)return true;
  // check if one contains the other (for short inputs matching long names)
  if(a.length>3&&(b.startsWith(a)||a.startsWith(b)))return true;
  return false;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length: m+1}, (_,i) => Array.from({length: n+1}, (_,j) => i===0?j:j===0?i:0));
  for (let i=1;i<=m;i++) for (let j=1;j<=n;j++)
    dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1] : 1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[m][n];
}

function gtcLangVariants(country) {
  // Only EN + current language (never all 4 at once)
  const v = [country.n];
  if (country.names && country.names[curLang]) v.push(country.names[curLang]);
  return v;
}

function gtcCheckVariant(g, v) {
  const c = normalizeStr(v);
  if (!c) return false;
  if (g === c) return true;
  if (c.split(' ').every(w => g.includes(w))) return true;
  if (g.length >= 4 && (c.includes(g) || g.includes(c))) return true;
  const maxDist = c.length <= 6 ? 1 : c.length > 10 ? 3 : 2;
  if (levenshtein(g, c) <= maxDist) return true;
  const cWords = c.split(' '), gWords = g.split(' ');
  if (cWords.length > 1 && gWords.length >= cWords.length)
    if (cWords.every((cw,i) => levenshtein(gWords[i]||'', cw) <= 1)) return true;
  return false;
}

function gtcIsMatch(guess, country) {
  const g = normalizeStr(guess);
  return gtcLangVariants(country).some(v => gtcCheckVariant(g, v));
}

const ALL_WORLD_COUNTRIES = [
  {n:'Afghanistan',names:{de:'Afghanistan',fr:'Afghanistan',es:'Afganistán'}},
  {n:'Albania',names:{de:'Albanien',fr:'Albanie',es:'Albania'}},
  {n:'Algeria',names:{de:'Algerien',fr:'Algérie',es:'Argelia'}},
  {n:'Andorra',names:{de:'Andorra',fr:'Andorre',es:'Andorra'}},
  {n:'Angola',names:{de:'Angola',fr:'Angola',es:'Angola'}},
  {n:'Antigua and Barbuda',names:{de:'Antigua und Barbuda',fr:'Antigua-et-Barbuda',es:'Antigua y Barbuda'}},
  {n:'Argentina',names:{de:'Argentinien',fr:'Argentine',es:'Argentina'}},
  {n:'Armenia',names:{de:'Armenien',fr:'Arménie',es:'Armenia'}},
  {n:'Australia',names:{de:'Australien',fr:'Australie',es:'Australia'}},
  {n:'Austria',names:{de:'Österreich',fr:'Autriche',es:'Austria'}},
  {n:'Azerbaijan',names:{de:'Aserbaidschan',fr:'Azerbaïdjan',es:'Azerbaiyán'}},
  {n:'Bahamas',names:{de:'Bahamas',fr:'Bahamas',es:'Bahamas'}},
  {n:'Bahrain',names:{de:'Bahrain',fr:'Bahreïn',es:'Baréin'}},
  {n:'Bangladesh',names:{de:'Bangladesch',fr:'Bangladesh',es:'Bangladés'}},
  {n:'Barbados',names:{de:'Barbados',fr:'Barbade',es:'Barbados'}},
  {n:'Belarus',names:{de:'Weißrussland',fr:'Biélorussie',es:'Bielorrusia'}},
  {n:'Belgium',names:{de:'Belgien',fr:'Belgique',es:'Bélgica'}},
  {n:'Belize',names:{de:'Belize',fr:'Belize',es:'Belice'}},
  {n:'Benin',names:{de:'Benin',fr:'Bénin',es:'Benín'}},
  {n:'Bhutan',names:{de:'Bhutan',fr:'Bhoutan',es:'Bután'}},
  {n:'Bolivia',names:{de:'Bolivien',fr:'Bolivie',es:'Bolivia'}},
  {n:'Bosnia & Herz.',names:{de:'Bosnien und Herzegowina',fr:'Bosnie-Herzégovine',es:'Bosnia y Herzegovina'}},
  {n:'Botswana',names:{de:'Botswana',fr:'Botswana',es:'Botsuana'}},
  {n:'Brazil',names:{de:'Brasilien',fr:'Brésil',es:'Brasil'}},
  {n:'Brunei',names:{de:'Brunei',fr:'Brunei',es:'Brunéi'}},
  {n:'Bulgaria',names:{de:'Bulgarien',fr:'Bulgarie',es:'Bulgaria'}},
  {n:'Burkina Faso',names:{de:'Burkina Faso',fr:'Burkina Faso',es:'Burkina Faso'}},
  {n:'Burundi',names:{de:'Burundi',fr:'Burundi',es:'Burundi'}},
  {n:'Cambodia',names:{de:'Kambodscha',fr:'Cambodge',es:'Camboya'}},
  {n:'Cameroon',names:{de:'Kamerun',fr:'Cameroun',es:'Camerún'}},
  {n:'Canada',names:{de:'Kanada',fr:'Canada',es:'Canadá'}},
  {n:'Cape Verde',names:{de:'Kap Verde',fr:'Cap-Vert',es:'Cabo Verde'}},
  {n:'Central African Republic',names:{de:'Zentralafrikanische Republik',fr:'République centrafricaine',es:'República Centroafricana'}},
  {n:'Chad',names:{de:'Tschad',fr:'Tchad',es:'Chad'}},
  {n:'Chile',names:{de:'Chile',fr:'Chili',es:'Chile'}},
  {n:'China',names:{de:'China',fr:'Chine',es:'China'}},
  {n:'Colombia',names:{de:'Kolumbien',fr:'Colombie',es:'Colombia'}},
  {n:'Comoros',names:{de:'Komoren',fr:'Comores',es:'Comoras'}},
  {n:'Congo',names:{de:'Kongo',fr:'Congo',es:'Congo'}},
  {n:'Costa Rica',names:{de:'Costa Rica',fr:'Costa Rica',es:'Costa Rica'}},
  {n:'Croatia',names:{de:'Kroatien',fr:'Croatie',es:'Croacia'}},
  {n:'Cuba',names:{de:'Kuba',fr:'Cuba',es:'Cuba'}},
  {n:'Cyprus',names:{de:'Zypern',fr:'Chypre',es:'Chipre'}},
  {n:'Czech Republic',names:{de:'Tschechien',fr:'République tchèque',es:'República Checa'}},
  {n:'Denmark',names:{de:'Dänemark',fr:'Danemark',es:'Dinamarca'}},
  {n:'Djibouti',names:{de:'Dschibuti',fr:'Djibouti',es:'Yibuti'}},
  {n:'Dominica',names:{de:'Dominica',fr:'Dominique',es:'Dominica'}},
  {n:'Dominican Rep.',names:{de:'Dominikanische Republik',fr:'République dominicaine',es:'República Dominicana'}},
  {n:'DR Congo',names:{de:'Demokratische Republik Kongo',fr:'RD Congo',es:'RD Congo'}},
  {n:'Ecuador',names:{de:'Ecuador',fr:'Équateur',es:'Ecuador'}},
  {n:'Egypt',names:{de:'Ägypten',fr:'Égypte',es:'Egipto'}},
  {n:'El Salvador',names:{de:'El Salvador',fr:'Salvador',es:'El Salvador'}},
  {n:'Equatorial Guinea',names:{de:'Äquatorialguinea',fr:'Guinée équatoriale',es:'Guinea Ecuatorial'}},
  {n:'Eritrea',names:{de:'Eritrea',fr:'Érythrée',es:'Eritrea'}},
  {n:'Estonia',names:{de:'Estland',fr:'Estonie',es:'Estonia'}},
  {n:'Eswatini',names:{de:'Eswatini',fr:'Eswatini',es:'Esuatini'}},
  {n:'Ethiopia',names:{de:'Äthiopien',fr:'Éthiopie',es:'Etiopía'}},
  {n:'Fiji',names:{de:'Fidschi',fr:'Fidji',es:'Fiyi'}},
  {n:'Finland',names:{de:'Finnland',fr:'Finlande',es:'Finlandia'}},
  {n:'France',names:{de:'Frankreich',fr:'France',es:'Francia'}},
  {n:'Gabon',names:{de:'Gabun',fr:'Gabon',es:'Gabón'}},
  {n:'Gambia',names:{de:'Gambia',fr:'Gambie',es:'Gambia'}},
  {n:'Georgia',names:{de:'Georgien',fr:'Géorgie',es:'Georgia'}},
  {n:'Germany',names:{de:'Deutschland',fr:'Allemagne',es:'Alemania'}},
  {n:'Ghana',names:{de:'Ghana',fr:'Ghana',es:'Ghana'}},
  {n:'Greece',names:{de:'Griechenland',fr:'Grèce',es:'Grecia'}},
  {n:'Grenada',names:{de:'Grenada',fr:'Grenade',es:'Granada'}},
  {n:'Guatemala',names:{de:'Guatemala',fr:'Guatemala',es:'Guatemala'}},
  {n:'Guinea',names:{de:'Guinea',fr:'Guinée',es:'Guinea'}},
  {n:'Guinea-Bissau',names:{de:'Guinea-Bissau',fr:'Guinée-Bissau',es:'Guinea-Bisáu'}},
  {n:'Guyana',names:{de:'Guyana',fr:'Guyana',es:'Guyana'}},
  {n:'Haiti',names:{de:'Haiti',fr:'Haïti',es:'Haití'}},
  {n:'Honduras',names:{de:'Honduras',fr:'Honduras',es:'Honduras'}},
  {n:'Hungary',names:{de:'Ungarn',fr:'Hongrie',es:'Hungría'}},
  {n:'Iceland',names:{de:'Island',fr:'Islande',es:'Islandia'}},
  {n:'India',names:{de:'Indien',fr:'Inde',es:'India'}},
  {n:'Indonesia',names:{de:'Indonesien',fr:'Indonésie',es:'Indonesia'}},
  {n:'Iran',names:{de:'Iran',fr:'Iran',es:'Irán'}},
  {n:'Iraq',names:{de:'Irak',fr:'Irak',es:'Irak'}},
  {n:'Ireland',names:{de:'Irland',fr:'Irlande',es:'Irlanda'}},
  {n:'Israel',names:{de:'Israel',fr:'Israël',es:'Israel'}},
  {n:'Italy',names:{de:'Italien',fr:'Italie',es:'Italia'}},
  {n:'Ivory Coast',names:{de:'Elfenbeinküste',fr:'Côte d\'Ivoire',es:'Costa de Marfil'}},
  {n:'Jamaica',names:{de:'Jamaika',fr:'Jamaïque',es:'Jamaica'}},
  {n:'Japan',names:{de:'Japan',fr:'Japon',es:'Japón'}},
  {n:'Jordan',names:{de:'Jordanien',fr:'Jordanie',es:'Jordania'}},
  {n:'Kazakhstan',names:{de:'Kasachstan',fr:'Kazakhstan',es:'Kazajistán'}},
  {n:'Kenya',names:{de:'Kenia',fr:'Kenya',es:'Kenia'}},
  {n:'Kiribati',names:{de:'Kiribati',fr:'Kiribati',es:'Kiribati'}},
  {n:'Kuwait',names:{de:'Kuwait',fr:'Koweït',es:'Kuwait'}},
  {n:'Kyrgyzstan',names:{de:'Kirgisistan',fr:'Kirghizistan',es:'Kirguistán'}},
  {n:'Laos',names:{de:'Laos',fr:'Laos',es:'Laos'}},
  {n:'Latvia',names:{de:'Lettland',fr:'Lettonie',es:'Letonia'}},
  {n:'Lebanon',names:{de:'Libanon',fr:'Liban',es:'Líbano'}},
  {n:'Lesotho',names:{de:'Lesotho',fr:'Lesotho',es:'Lesoto'}},
  {n:'Liberia',names:{de:'Liberia',fr:'Libéria',es:'Liberia'}},
  {n:'Libya',names:{de:'Libyen',fr:'Libye',es:'Libia'}},
  {n:'Liechtenstein',names:{de:'Liechtenstein',fr:'Liechtenstein',es:'Liechtenstein'}},
  {n:'Lithuania',names:{de:'Litauen',fr:'Lituanie',es:'Lituania'}},
  {n:'Luxembourg',names:{de:'Luxemburg',fr:'Luxembourg',es:'Luxemburgo'}},
  {n:'Madagascar',names:{de:'Madagaskar',fr:'Madagascar',es:'Madagascar'}},
  {n:'Malawi',names:{de:'Malawi',fr:'Malawi',es:'Malaui'}},
  {n:'Malaysia',names:{de:'Malaysia',fr:'Malaisie',es:'Malasia'}},
  {n:'Maldives',names:{de:'Malediven',fr:'Maldives',es:'Maldivas'}},
  {n:'Mali',names:{de:'Mali',fr:'Mali',es:'Malí'}},
  {n:'Malta',names:{de:'Malta',fr:'Malte',es:'Malta'}},
  {n:'Marshall Islands',names:{de:'Marshallinseln',fr:'Îles Marshall',es:'Islas Marshall'}},
  {n:'Mauritania',names:{de:'Mauretanien',fr:'Mauritanie',es:'Mauritania'}},
  {n:'Mauritius',names:{de:'Mauritius',fr:'Maurice',es:'Mauricio'}},
  {n:'Mexico',names:{de:'Mexiko',fr:'Mexique',es:'México'}},
  {n:'Micronesia',names:{de:'Mikronesien',fr:'Micronésie',es:'Micronesia'}},
  {n:'Moldova',names:{de:'Moldawien',fr:'Moldavie',es:'Moldavia'}},
  {n:'Monaco',names:{de:'Monaco',fr:'Monaco',es:'Mónaco'}},
  {n:'Mongolia',names:{de:'Mongolei',fr:'Mongolie',es:'Mongolia'}},
  {n:'Montenegro',names:{de:'Montenegro',fr:'Monténégro',es:'Montenegro'}},
  {n:'Morocco',names:{de:'Marokko',fr:'Maroc',es:'Marruecos'}},
  {n:'Mozambique',names:{de:'Mosambik',fr:'Mozambique',es:'Mozambique'}},
  {n:'Myanmar',names:{de:'Myanmar',fr:'Myanmar',es:'Birmania'}},
  {n:'Namibia',names:{de:'Namibia',fr:'Namibie',es:'Namibia'}},
  {n:'Nauru',names:{de:'Nauru',fr:'Nauru',es:'Nauru'}},
  {n:'Nepal',names:{de:'Nepal',fr:'Népal',es:'Nepal'}},
  {n:'Netherlands',names:{de:'Niederlande',fr:'Pays-Bas',es:'Países Bajos'}},
  {n:'New Zealand',names:{de:'Neuseeland',fr:'Nouvelle-Zélande',es:'Nueva Zelanda'}},
  {n:'Nicaragua',names:{de:'Nicaragua',fr:'Nicaragua',es:'Nicaragua'}},
  {n:'Niger',names:{de:'Niger',fr:'Niger',es:'Níger'}},
  {n:'Nigeria',names:{de:'Nigeria',fr:'Nigeria',es:'Nigeria'}},
  {n:'North Korea',names:{de:'Nordkorea',fr:'Corée du Nord',es:'Corea del Norte'}},
  {n:'North Macedonia',names:{de:'Nordmazedonien',fr:'Macédoine du Nord',es:'Macedonia del Norte'}},
  {n:'Norway',names:{de:'Norwegen',fr:'Norvège',es:'Noruega'}},
  {n:'Oman',names:{de:'Oman',fr:'Oman',es:'Omán'}},
  {n:'Pakistan',names:{de:'Pakistan',fr:'Pakistan',es:'Pakistán'}},
  {n:'Palau',names:{de:'Palau',fr:'Palaos',es:'Palaos'}},
  {n:'Panama',names:{de:'Panama',fr:'Panama',es:'Panamá'}},
  {n:'Papua New Guinea',names:{de:'Papua-Neuguinea',fr:'Papouasie-Nouvelle-Guinée',es:'Papúa Nueva Guinea'}},
  {n:'Paraguay',names:{de:'Paraguay',fr:'Paraguay',es:'Paraguay'}},
  {n:'Peru',names:{de:'Peru',fr:'Pérou',es:'Perú'}},
  {n:'Philippines',names:{de:'Philippinen',fr:'Philippines',es:'Filipinas'}},
  {n:'Poland',names:{de:'Polen',fr:'Pologne',es:'Polonia'}},
  {n:'Portugal',names:{de:'Portugal',fr:'Portugal',es:'Portugal'}},
  {n:'Qatar',names:{de:'Katar',fr:'Qatar',es:'Catar'}},
  {n:'Romania',names:{de:'Rumänien',fr:'Roumanie',es:'Rumanía'}},
  {n:'Russia',names:{de:'Russland',fr:'Russie',es:'Rusia'}},
  {n:'Rwanda',names:{de:'Ruanda',fr:'Rwanda',es:'Ruanda'}},
  {n:'Saint Kitts and Nevis',names:{de:'St. Kitts und Nevis',fr:'Saint-Kitts-et-Nevis',es:'San Cristóbal y Nieves'}},
  {n:'Saint Lucia',names:{de:'St. Lucia',fr:'Sainte-Lucie',es:'Santa Lucía'}},
  {n:'Saint Vincent and the Grenadines',names:{de:'St. Vincent und die Grenadinen',fr:'Saint-Vincent-et-les-Grenadines',es:'San Vicente y las Granadinas'}},
  {n:'Samoa',names:{de:'Samoa',fr:'Samoa',es:'Samoa'}},
  {n:'San Marino',names:{de:'San Marino',fr:'Saint-Marin',es:'San Marino'}},
  {n:'Sao Tome and Principe',names:{de:'São Tomé und Príncipe',fr:'Sao Tomé-et-Principe',es:'Santo Tomé y Príncipe'}},
  {n:'Saudi Arabia',names:{de:'Saudi-Arabien',fr:'Arabie Saoudite',es:'Arabia Saudita'}},
  {n:'Senegal',names:{de:'Senegal',fr:'Sénégal',es:'Senegal'}},
  {n:'Serbia',names:{de:'Serbien',fr:'Serbie',es:'Serbia'}},
  {n:'Seychelles',names:{de:'Seychellen',fr:'Seychelles',es:'Seychelles'}},
  {n:'Sierra Leone',names:{de:'Sierra Leone',fr:'Sierra Leone',es:'Sierra Leona'}},
  {n:'Singapore',names:{de:'Singapur',fr:'Singapour',es:'Singapur'}},
  {n:'Slovakia',names:{de:'Slowakei',fr:'Slovaquie',es:'Eslovaquia'}},
  {n:'Slovenia',names:{de:'Slowenien',fr:'Slovénie',es:'Eslovenia'}},
  {n:'Solomon Islands',names:{de:'Salomonen',fr:'Îles Salomon',es:'Islas Salomón'}},
  {n:'Somalia',names:{de:'Somalia',fr:'Somalie',es:'Somalia'}},
  {n:'South Africa',names:{de:'Südafrika',fr:'Afrique du Sud',es:'Sudáfrica'}},
  {n:'South Korea',names:{de:'Südkorea',fr:'Corée du Sud',es:'Corea del Sur'}},
  {n:'South Sudan',names:{de:'Südsudan',fr:'Soudan du Sud',es:'Sudán del Sur'}},
  {n:'Spain',names:{de:'Spanien',fr:'Espagne',es:'España'}},
  {n:'Sri Lanka',names:{de:'Sri Lanka',fr:'Sri Lanka',es:'Sri Lanka'}},
  {n:'Sudan',names:{de:'Sudan',fr:'Soudan',es:'Sudán'}},
  {n:'Suriname',names:{de:'Surinam',fr:'Suriname',es:'Surinam'}},
  {n:'Sweden',names:{de:'Schweden',fr:'Suède',es:'Suecia'}},
  {n:'Switzerland',names:{de:'Schweiz',fr:'Suisse',es:'Suiza'}},
  {n:'Syria',names:{de:'Syrien',fr:'Syrie',es:'Siria'}},
  {n:'Taiwan',names:{de:'Taiwan',fr:'Taïwan',es:'Taiwán'}},
  {n:'Tajikistan',names:{de:'Tadschikistan',fr:'Tadjikistan',es:'Tayikistán'}},
  {n:'Tanzania',names:{de:'Tansania',fr:'Tanzanie',es:'Tanzania'}},
  {n:'Thailand',names:{de:'Thailand',fr:'Thaïlande',es:'Tailandia'}},
  {n:'Timor-Leste',names:{de:'Osttimor',fr:'Timor oriental',es:'Timor Oriental'}},
  {n:'Togo',names:{de:'Togo',fr:'Togo',es:'Togo'}},
  {n:'Tonga',names:{de:'Tonga',fr:'Tonga',es:'Tonga'}},
  {n:'Trinidad and Tobago',names:{de:'Trinidad und Tobago',fr:'Trinité-et-Tobago',es:'Trinidad y Tobago'}},
  {n:'Tunisia',names:{de:'Tunesien',fr:'Tunisie',es:'Túnez'}},
  {n:'Turkey',names:{de:'Türkei',fr:'Turquie',es:'Turquía'}},
  {n:'Turkmenistan',names:{de:'Turkmenistan',fr:'Turkménistan',es:'Turkmenistán'}},
  {n:'Tuvalu',names:{de:'Tuvalu',fr:'Tuvalu',es:'Tuvalu'}},
  {n:'UAE',names:{de:'Vereinigte Arabische Emirate',fr:'Émirats arabes unis',es:'Emiratos Árabes Unidos'}},
  {n:'Uganda',names:{de:'Uganda',fr:'Ouganda',es:'Uganda'}},
  {n:'Ukraine',names:{de:'Ukraine',fr:'Ukraine',es:'Ucrania'}},
  {n:'UK',names:{de:'Vereinigtes Königreich',fr:'Royaume-Uni',es:'Reino Unido'}},
  {n:'USA',names:{de:'Vereinigte Staaten',fr:'États-Unis',es:'Estados Unidos'}},
  {n:'Uruguay',names:{de:'Uruguay',fr:'Uruguay',es:'Uruguay'}},
  {n:'Uzbekistan',names:{de:'Usbekistan',fr:'Ouzbékistan',es:'Uzbekistán'}},
  {n:'Vanuatu',names:{de:'Vanuatu',fr:'Vanuatu',es:'Vanuatu'}},
  {n:'Vatican',names:{de:'Vatikan',fr:'Vatican',es:'Vaticano'}},
  {n:'Venezuela',names:{de:'Venezuela',fr:'Venezuela',es:'Venezuela'}},
  {n:'Vietnam',names:{de:'Vietnam',fr:'Viêt Nam',es:'Vietnam'}},
  {n:'Yemen',names:{de:'Jemen',fr:'Yémen',es:'Yemen'}},
  {n:'Zambia',names:{de:'Sambia',fr:'Zambie',es:'Zambia'}},
  {n:'Zimbabwe',names:{de:'Simbabwe',fr:'Zimbabwe',es:'Zimbabue'}},
];

// Lookup translated country name from ANY dataset using ALL_WORLD_COUNTRIES
function countryName(enName) {
  if (curLang === 'en') return enName;
  const entry = ALL_WORLD_COUNTRIES.find(c => c.n === enName);
  return (entry && entry.names && entry.names[curLang]) ? entry.names[curLang] : enName;
}

function gtcIsRealCountry(guess) {
  const g = guess.toLowerCase().replace(/[^a-zäöüáéíóúàèìòùâêîôûçñ ]/gi,'').trim();
  if (g.length < 2) return false;
  // Check against full world list (EN + current lang)
  return ALL_WORLD_COUNTRIES.some(c => {
    const variants = [c.n];
    if (c.names && c.names[curLang]) variants.push(c.names[curLang]);
    return variants.some(v => gtcCheckVariant(g, v));
  });
}

function gtcAutoComplete(){
  const inp=document.getElementById('gtc-inp');
  const list=document.getElementById('gtc-suggestions');
  if(!inp||!list)return;
  const val=inp.value.toLowerCase().trim();
  if(val.length<2||inp.disabled){list.classList.remove('show');return;}
  const matches=ALL_WORLD_COUNTRIES.filter(function(c){
    const translated=(c.names&&c.names[curLang])?c.names[curLang]:c.n;
    const low=translated.toLowerCase();
    const enLow=c.n.toLowerCase();
    const bestLen=Math.min(low.length,enLow.length);
    const ratio=val.length/bestLen;
    return ratio>=0.75&&(low.startsWith(val)||enLow.startsWith(val)||low.includes(val));
  }).slice(0,6);
  if(matches.length===0){list.classList.remove('show');return;}
  list.innerHTML='';
  matches.forEach(function(c){
    const displayName=(c.names&&c.names[curLang])?c.names[curLang]:c.n;
    const item=document.createElement('div');
    item.className='bdr-suggest-item';
    item.textContent=displayName;
    item.onclick=function(){inp.value=displayName;list.classList.remove('show');gtcGuess();};
    list.appendChild(item);
  });
  list.classList.add('show');
}
document.addEventListener('click',function(e){if(!e.target.closest('#gtc-inp')&&!e.target.closest('#gtc-suggestions')){var l=document.getElementById('gtc-suggestions');if(l)l.classList.remove('show');}});

function gtcGuess() {
  if (gtcState.done) return;
  const inp = document.getElementById('gtc-inp');
  const val = inp.value.trim();
  if (!val) return;
  var gtcSug=document.getElementById('gtc-suggestions');if(gtcSug)gtcSug.classList.remove('show');
  const ok = gtcIsMatch(val, gtcState.country);
  if (ok) {
    gtcState.correct++;
    const pts = Math.max(10, 100 - (gtcState.fi - 1) * 10);
    gtcState.score += pts;
    try { awardXP(pts); } catch(e) {}
    try{achTrack('gtcUnique',gtcState.country.n);if(gtcState.fi===1)achTrack('gtc1Clue',1);if(gtcState.fi<=2)achTrack('gtc2Clues',1);}catch(e){}
    gtcReveal(true, pts);
  } else {
    // Check if it looks like a real country at all
    const isKnown = gtcIsRealCountry(val);
    const noCountryMsg = {en:`❓ "${val}" doesn't exist. Try again!`,de:`❓ "${val}" gibt es nicht. Versuch's nochmal!`,fr:`❓ "${val}" n'existe pas. Réessayez!`,es:`❓ "${val}" no existe. ¡Inténtalo de nuevo!`}[curLang];
    inp.value = '';
    if (isKnown) {
      gtcState.attempts++;
      gtcDrawLives();
      inp.style.borderColor = 'var(--rose)';
      setTimeout(() => inp.style.borderColor = 'var(--border)', 800);
      const rem = 8 - gtcState.attempts;
      const attWord = {en:rem===1?'attempt':'attempts',de:rem===1?'Versuch':'Versuche',fr:rem===1?'essai':'essais',es:rem===1?'intento':'intentos'}[curLang]||'attempts';
      const fbSuffix = {en:`${rem} ${attWord} left.`,de:`Noch ${rem} ${attWord}.`,fr:`${rem} ${attWord} restant${rem===1?'':'s'}.`,es:`${rem} ${attWord} restante${rem===1?'':'s'}.`}[curLang];
      const fbPrefix = {en:`❌ ${val}? No.`,de:`❌ ${val}? Nein.`,fr:`❌ ${val}? Non.`,es:`❌ ${val}? No.`}[curLang];
      // Hot/Cold: check if guessed country is in same region as the answer
      const guessedEntry=ALL_WORLD_COUNTRIES.find(c=>{
        const dn=(c.names&&c.names[curLang])?c.names[curLang]:c.n;
        return normalizeStr(dn)===normalizeStr(val)||normalizeStr(c.n)===normalizeStr(val);
      });
      const guessedCont=guessedEntry?gtcGetContinent(guessedEntry.n):null;
      const targetCont=gtcGetContinent(gtcState.country.n);
      const warmMsg=guessedCont&&targetCont&&guessedCont===targetCont
        ?{en:' 🌡️ Warm — same region!',de:' 🌡️ Warm — gleiche Region!',fr:' 🌡️ Chaud — même région!',es:' 🌡️ ¡Cálido — misma región!'}[curLang]||' 🌡️ Warm!'
        :'';
      document.getElementById('gtc-feedback').textContent = `${fbPrefix}${warmMsg} ${fbSuffix}`;
      if (gtcState.attempts >= 8) gtcReveal(false, 0);
      else if (gtcState.fi < 8) gtcShowFact();
    } else {
      inp.style.borderColor = 'var(--rose)';
      setTimeout(() => inp.style.borderColor = 'var(--border)', 800);
      document.getElementById('gtc-feedback').textContent = noCountryMsg;
    }
  }
}

function gtcReveal(won, pts) {
  gtcState.done = true;
  if(won) gtcState.totalClues = (gtcState.totalClues||0) + gtcState.fi;
  document.getElementById('gtc-feedback').textContent = '';
  const c = gtcState.country;
  document.getElementById('gtc-inp').disabled = true;
  const res = document.getElementById('gtc-result');
  res.style.display = 'block';
  res.style.borderColor = won ? 'rgba(255,184,48,.3)' : 'rgba(255,61,107,.2)';
  document.getElementById('gtc-rf').textContent = c.f;
  const displayName = (c.names && c.names[curLang]) ? c.names[curLang] : c.n;
  document.getElementById('gtc-rn').textContent = displayName;
  const clueWord = {en:'clue',de:'Hinweis',fr:'indice',es:'pista'}[curLang]||'clue';
  const cluesWord = {en:'clues',de:'Hinweisen',fr:'indices',es:'pistas'}[curLang]||'clues';
  const correctMsg = {en:`Correct after ${gtcState.fi} ${gtcState.fi===1?clueWord:cluesWord}! 🎉`,de:`Richtig nach ${gtcState.fi} ${gtcState.fi===1?clueWord:cluesWord}! 🎉`,fr:`Correct après ${gtcState.fi} ${gtcState.fi===1?clueWord:cluesWord}! 🎉`,es:`¡Correcto tras ${gtcState.fi} ${gtcState.fi===1?clueWord:cluesWord}! 🎉`}[curLang];
  const localName = (c.names && c.names[curLang]) ? c.names[curLang] : c.n;
  const wrongMsg = {en:`The answer was ${c.n}`,de:`Die Antwort war ${localName}`,fr:`La réponse était ${localName}`,es:`La respuesta era ${localName}`}[curLang];
  document.getElementById('gtc-rs').textContent = won ? correctMsg : wrongMsg;
  document.getElementById('gtc-rp').style.display = 'none';
  const nb = document.getElementById('gtc-next-btn');
  nb.style.display = 'block';
  const seeResults = {en:'See Results 🏆',de:'Ergebnisse 🏆',fr:'Résultats 🏆',es:'Resultados 🏆'}[curLang]||'See Results 🏆';
  const nextCountry = {en:'Next Country →',de:'Nächstes Land →',fr:'Pays suivant →',es:'Siguiente país →'}[curLang]||'Next Country →';
  nb.textContent = gtcState.round >= gtcState.total ? seeResults : nextCountry;
}

function gtcNext() { gtcState.done = false; gtcRound(); }


let _pendingXP=0,_xpJustGained=0,_xpAnimFrom=0,_xpAnimTo=0;
function awardXP(amt){
  if(!amt||amt<=0)return;
  _pendingXP=(_pendingXP||0)+amt;
}
function flushXP(){
  if(!_pendingXP||_pendingXP<=0)return;
  try{
    const p=pGet(),oldXP=p.xp||0,oldLvl=getLvlData(oldXP).cur.lvl;
    _xpAnimFrom=getLvlData(oldXP).pct;
    p.xp=oldXP+_pendingXP;
    _xpJustGained=_pendingXP;
    _pendingXP=0;
    pSave();
    _xpAnimTo=getLvlData(p.xp).pct;
    profileRender();
    showToast('+'+_xpJustGained+' XP');
    const newLvl=getLvlData(p.xp).cur.lvl;
    if(newLvl>oldLvl)setTimeout(()=>showLevelUp(getLvlData(p.xp).cur),700);
  }catch(ex){console.warn('flushXP:',ex);}
}
function animateXPBar(gained){
  try{
    const fill=document.getElementById('pp-xp-fill');
    if(!fill)return;
    fill.style.transition='none';
    fill.style.width=_xpAnimFrom+'%';
    const bar=document.getElementById('pp-xp-bar')||fill.parentElement;
    if(bar&&gained>0){
      const r=bar.getBoundingClientRect();
      const badge=document.createElement('div');
      badge.className='xp-gain-badge';
      badge.textContent='+'+gained+' XP';
      badge.style.left=(r.right-76)+'px';
      badge.style.top=(r.top-6)+'px';
      document.body.appendChild(badge);
      setTimeout(()=>badge.remove(),1700);
    }
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      fill.style.transition='width 1.2s cubic-bezier(.22,1,.36,1)';
      fill.style.width=_xpAnimTo+'%';
      fill.classList.add('xp-bar-glow');
      setTimeout(()=>{fill.style.transition='';fill.classList.remove('xp-bar-glow');},1500);
    }));
  }catch(ex){console.warn('animateXPBar:',ex);}
}
function incGames(){try{const p=pGet();p.games=(p.games||0)+1;pSave();}catch(ex){}}

/* ══════════════════════════════════════════
   ACHIEVEMENT SYSTEM
══════════════════════════════════════════ */
const ACH_DEFS=[
  {id:'first_game',cat:'general',icon:'👋',name:'Erste Schritte',desc:'Erstes Spiel abgeschlossen',xp:10,check:()=>(pGet().games||0)>=1},
  {id:'games_10',cat:'general',icon:'🎮',name:'Stammgast',desc:'10 Spiele abgeschlossen',xp:25,check:()=>(pGet().games||0)>=10},
  {id:'games_50',cat:'general',icon:'🕹️',name:'Dauerspieler',desc:'50 Spiele abgeschlossen',xp:50,check:()=>(pGet().games||0)>=50},
  {id:'games_100',cat:'general',icon:'🏅',name:'Veteran',desc:'100 Spiele abgeschlossen',xp:100,check:()=>(pGet().games||0)>=100},
  {id:'polyglot',cat:'general',icon:'🌐',name:'Vielsprachig',desc:'Spiel in jeder Sprache gespielt',xp:30,check:()=>{const s=achStore();return['en','de','fr','es'].every(l=>s.langs&&s.langs.includes(l));}},
  {id:'hl_streak5',cat:'hl',icon:'🔥',name:'Heißer Lauf',desc:'5er Streak im Higher or Lower',xp:20,check:()=>(achStore().hlBestStreak||0)>=5},
  {id:'hl_streak10',cat:'hl',icon:'💥',name:'Unaufhaltsam',desc:'10er Streak im Higher or Lower',xp:50,check:()=>(achStore().hlBestStreak||0)>=10},
  {id:'hl_streak20',cat:'hl',icon:'🏆',name:'Legende',desc:'20er Streak im Higher or Lower',xp:100,check:()=>(achStore().hlBestStreak||0)>=20},
  {id:'hl_allcats',cat:'hl',icon:'📊',name:'Statistik-Nerd',desc:'Jede Kategorie mind. einmal gespielt',xp:30,check:()=>{const s=achStore();return(s.hlCats||[]).length>=8;}},
  {id:'daily_first',cat:'daily',icon:'📅',name:'Tägliche Pflicht',desc:'Erste Daily Challenge abgeschlossen',xp:15,check:()=>(achStore().dailyDone||0)>=1},
  {id:'daily_streak7',cat:'daily',icon:'🔥',name:'Feuerteufel',desc:'7-Tage-Streak',xp:50,check:()=>{const s=loadStreak();return s.count>=7;}},
  {id:'daily_streak30',cat:'daily',icon:'🏃',name:'Marathonläufer',desc:'30-Tage-Streak',xp:150,check:()=>{const s=loadStreak();return s.count>=30;}},
  {id:'daily_perfect',cat:'daily',icon:'💎',name:'Joker-frei',desc:'Daily Challenge ohne Joker mit 8/8',xp:75,check:()=>(achStore().dailyPerfectNoJoker||0)>=1},
  {id:'cap_10',cat:'cap',icon:'🏛️',name:'Hauptstadtkenner',desc:'10 Hauptstädte richtig',xp:15,check:()=>(achStore().capCorrect||0)>=10},
  {id:'cap_50',cat:'cap',icon:'🥇',name:'Hauptstadt-Meister',desc:'50 Hauptstädte richtig',xp:50,check:()=>(achStore().capCorrect||0)>=50},
  {id:'cap_100',cat:'cap',icon:'👑',name:'Hauptstadt-Gott',desc:'100 Hauptstädte richtig',xp:100,check:()=>(achStore().capCorrect||0)>=100},
  {id:'cap_regions',cat:'cap',icon:'🗺️',name:'Globetrotter',desc:'Jede Region einmal gespielt (Capitals)',xp:30,check:()=>{const s=achStore();return['all','europe','asia','africa','americas','oceania'].every(r=>(s.capRegions||[]).includes(r));}},
  {id:'flg_20',cat:'flg',icon:'🚩',name:'Fahnenjäger',desc:'20 Flaggen richtig',xp:15,check:()=>(achStore().flgCorrect||0)>=20},
  {id:'flg_50',cat:'flg',icon:'🦅',name:'Adlerauge',desc:'50 Flaggen richtig',xp:50,check:()=>(achStore().flgCorrect||0)>=50},
  {id:'flg_100',cat:'flg',icon:'🏴',name:'Flaggen-Meister',desc:'100 Flaggen richtig',xp:100,check:()=>(achStore().flgCorrect||0)>=100},
  {id:'flg_all',cat:'flg',icon:'🌍',name:'Alle Flaggen',desc:'Alle 195 Flaggen korrekt erkannt',xp:200,check:()=>{const s=achStore();return(s.flgUnique||[]).length>=195;}},
  {id:'gtc_1clue',cat:'gtc',icon:'🕵️',name:'Spion-Instinkt',desc:'Land nach nur 1 Hinweis erraten',xp:40,check:()=>(achStore().gtc1Clue||0)>=1},
  {id:'gtc_5x2',cat:'gtc',icon:'🔍',name:'Detektiv',desc:'5 Länder nach max. 2 Hinweisen erraten',xp:50,check:()=>(achStore().gtc2Clues||0)>=5},
  {id:'gtc_20',cat:'gtc',icon:'🌏',name:'Weltkenner',desc:'20 verschiedene Länder erraten',xp:60,check:()=>{const s=achStore();return(s.gtcUnique||[]).length>=20;}},
  // Map Sniper
  {id:'ms_bullseye',cat:'ms',icon:'🎯',name:'Volltreffer',desc:'Bullseye — Land exakt getroffen',xp:30,check:()=>(achStore().msBullseye||0)>=1},
  {id:'ms_500',cat:'ms',icon:'🗺️',name:'Kartograph',desc:'500 Punkte in einer Runde',xp:40,check:()=>(achStore().msBestScore||0)>=500},
  {id:'ms_800',cat:'ms',icon:'🌐',name:'GPS-Mensch',desc:'800 Punkte in einer Runde',xp:80,check:()=>(achStore().msBestScore||0)>=800},
  {id:'ms_hard',cat:'ms',icon:'💀',name:'Insel-Jäger',desc:'Hard-Modus mit 400+ Punkten',xp:60,check:()=>(achStore().msHard400||0)>=1},
  // Truth or Lie (Party)
  {id:'tol_play',cat:'party',icon:'🎭',name:'Erster Bluff',desc:'Erste Runde Truth or Lie',xp:15,check:()=>(achStore().tolPlayed||0)>=1},
  {id:'tol_survive',cat:'party',icon:'🕶️',name:'Undercover',desc:'Als Lügner nicht entdeckt',xp:40,check:()=>(achStore().tolSurvived||0)>=1},
  {id:'tol_detect',cat:'party',icon:'🔎',name:'Wahrheitsfinder',desc:'5 Lügner korrekt erkannt',xp:50,check:()=>(achStore().tolDetected||0)>=5},
  // Map Party
  {id:'mp_play',cat:'party',icon:'📍',name:'Party-Starter',desc:'Erste Runde Map Party',xp:15,check:()=>(achStore().mpPlayed||0)>=1},
  {id:'mp_win3',cat:'party',icon:'🏆',name:'Party-König',desc:'3 Map Party Spiele gewonnen',xp:40,check:()=>(achStore().mpWins||0)>=3},
  {id:'bdr_10',cat:'bdr',icon:'🚶',name:'Grenzgänger',desc:'10 Länder in einem Run',xp:20,check:()=>(achStore().bdrBest||0)>=10},
  {id:'bdr_speed',cat:'bdr',icon:'⚡',name:'Speedrunner',desc:'15 Länder in unter 2 Minuten',xp:50,check:()=>(achStore().bdrSpeed15||0)>=1},
  {id:'bdr_nohint',cat:'bdr',icon:'🧭',name:'Ohne Hilfe',desc:'Border Run ohne Hints (mind. 10)',xp:40,check:()=>(achStore().bdrNoHint10||0)>=1},
  {id:'bdr_europe',cat:'bdr',icon:'🇪🇺',name:'Europa komplett',desc:'Alle Länder Europas in einem Run',xp:150,check:()=>(achStore().bdrEurope||false)},
  {id:'bdr_asia',cat:'bdr',icon:'🌏',name:'Asien komplett',desc:'Alle Länder Asiens in einem Run',xp:150,check:()=>(achStore().bdrAsia||false)},
  {id:'bdr_africa',cat:'bdr',icon:'🌍',name:'Afrika komplett',desc:'Alle Länder Afrikas in einem Run',xp:150,check:()=>(achStore().bdrAfrica||false)},
];
const ACH_CATS=[
  {id:'all',label:'Alle'},
  {id:'general',label:'Allgemein'},
  {id:'hl',label:'H/L'},
  {id:'daily',label:'Daily'},
  {id:'cap',label:'Capitals'},
  {id:'flg',label:'Flags'},
  {id:'gtc',label:'Map Sniper'},
  {id:'ms',label:'Sniper'},
  {id:'bdr',label:'Border'},
  {id:'party',label:'Party'}
];

function achStore(){try{return JSON.parse(localStorage.getItem('geovs_ach_data'))||{};}catch(e){return{};}}
function achSave(d){try{localStorage.setItem('geovs_ach_data',JSON.stringify(d));}catch(e){}}
function achUnlocked(){try{return JSON.parse(localStorage.getItem('geovs_ach_unlocked'))||{};}catch(e){return{};}}
function achSaveUnlocked(u){try{localStorage.setItem('geovs_ach_unlocked',JSON.stringify(u));}catch(e){}}

function achTrack(key,val){
  const d=achStore();
  if(typeof val==='number') d[key]=(d[key]||0)+val;
  else if(Array.isArray(d[key])&&typeof val==='string'){if(!d[key].includes(val))d[key].push(val);}
  else if(typeof val==='string'){if(!d[key])d[key]=[];if(!d[key].includes(val))d[key].push(val);}
  else d[key]=val;
  achSave(d);
}
function achTrackMax(key,val){const d=achStore();d[key]=Math.max(d[key]||0,val);achSave(d);}
function achTrackLang(){const d=achStore();if(!d.langs)d.langs=[];if(!d.langs.includes(curLang))d.langs.push(curLang);achSave(d);}

let _achToastQueue=[];
let _achToastActive=false;
function achShowToast(ach){
  _achToastQueue.push(ach);
  if(!_achToastActive)_achProcessToast();
}
function _achProcessToast(){
  if(_achToastQueue.length===0){_achToastActive=false;return;}
  _achToastActive=true;
  const a=_achToastQueue.shift();
  const t=document.getElementById('ach-toast');if(!t){_achToastActive=false;return;}
  document.getElementById('ach-toast-ico').textContent=a.icon;
  document.getElementById('ach-toast-desc').textContent=a.name+' — '+a.desc;
  document.getElementById('ach-toast-xp').textContent='+'+a.xp+' XP';
  t.classList.add('show');
  setTimeout(()=>{t.classList.remove('show');setTimeout(_achProcessToast,400);},3000);
}

function checkAchievements(){
  const unlocked=achUnlocked();
  let newCount=0;
  ACH_DEFS.forEach(a=>{
    if(unlocked[a.id])return;
    try{
      if(a.check()){
        unlocked[a.id]={date:Date.now()};
        achSaveUnlocked(unlocked);
        try{awardXP(a.xp);}catch(e){}
        achShowToast(a);
        try{GeoAudio.playSFX('achievement');}catch(e){}
        newCount++;
      }
    }catch(e){}
  });
  achUpdateProfileCount();
  return newCount;
}

function achUpdateProfileCount(){
  const u=Object.keys(achUnlocked()).length;
  const el=document.getElementById('pp-ach-count');
  if(el)el.textContent=u+'/'+ACH_DEFS.length;
}

function openAchPanel(){
  toggleProfilePanel();
  const panel=document.getElementById('ach-panel');if(!panel)return;
  panel.classList.add('open');
  achRenderPanel('all');
}
function closeAchPanel(){
  const panel=document.getElementById('ach-panel');if(panel)panel.classList.remove('open');
}

function achRenderPanel(cat){
  const unlocked=achUnlocked();
  const uCount=Object.keys(unlocked).length;
  const total=ACH_DEFS.length;
  const xpEarned=ACH_DEFS.filter(a=>unlocked[a.id]).reduce((s,a)=>s+a.xp,0);
  const pct=total>0?Math.round(uCount/total*100):0;
  document.getElementById('ach-unlocked').textContent=uCount;
  document.getElementById('ach-total').textContent=total;
  document.getElementById('ach-xp-earned').textContent=xpEarned;
  document.getElementById('ach-pct').textContent=pct+'%';
  document.getElementById('ach-prog-bar').style.width=pct+'%';

  const tabsEl=document.getElementById('ach-tabs');
  tabsEl.innerHTML='';
  ACH_CATS.forEach(c=>{
    const b=document.createElement('button');
    b.className='ach-tab'+(c.id===cat?' active':'');
    b.textContent=c.label;
    b.onclick=()=>achRenderPanel(c.id);
    tabsEl.appendChild(b);
  });

  const listEl=document.getElementById('ach-list');
  listEl.innerHTML='';
  const filtered=cat==='all'?ACH_DEFS:ACH_DEFS.filter(a=>a.cat===cat);
  let lastCat='';
  filtered.forEach(a=>{
    if(cat==='all'&&a.cat!==lastCat){
      lastCat=a.cat;
      const catInfo=ACH_CATS.find(c=>c.id===a.cat);
      const hdr=document.createElement('div');
      hdr.className='ach-cat-hdr';
      hdr.textContent=catInfo?catInfo.label:a.cat;
      listEl.appendChild(hdr);
    }
    const isU=!!unlocked[a.id];
    const row=document.createElement('div');
    row.className='ach-row'+(isU?'':' locked');
    row.innerHTML='<div class="ach-row-ico">'+a.icon+'</div><div class="ach-row-info"><div class="ach-row-name">'+a.name+'</div><div class="ach-row-desc">'+a.desc+'</div></div><div class="ach-row-right"><div class="ach-row-xp">+'+a.xp+' XP</div>'+(isU?'<div class="ach-row-check">✓</div>':'')+'</div>';
    listEl.appendChild(row);
  });
}

function toggleProfilePanel(){
  const panel=document.getElementById('profile-panel');if(!panel)return;
  const wasOpen=panel.classList.contains('open');
  panel.classList.toggle('open');
  if(!wasOpen){
    profileRender();
    const badge=document.getElementById('profile-badge');
    if(badge){const r=badge.getBoundingClientRect();panel.style.top=(r.bottom+6)+'px';panel.style.right=(window.innerWidth-r.right)+'px';}
    if(_xpJustGained>0){
      const gained=_xpJustGained;
      _xpJustGained=0;
      setTimeout(()=>animateXPBar(gained),180);
    }
  }
}
document.addEventListener('click',e=>{
  const panel=document.getElementById('profile-panel'),badge=document.getElementById('profile-badge');
  if(!panel||!badge)return;
  if(panel.classList.contains('open')&&!panel.contains(e.target)&&!badge.contains(e.target))panel.classList.remove('open');
});

function ppStartRename(){
  const p=pGet(),inp=document.getElementById('pp-rename-inp');
  if(inp)inp.value=p.username;
  document.getElementById('pp-name-wrap').style.display='none';
  const ed=document.getElementById('pp-name-edit');if(ed)ed.style.display='flex';
  if(inp)inp.focus();
}
function ppConfirmRename(){
  const inp=document.getElementById('pp-rename-inp');if(!inp)return;
  const v=inp.value.trim();if(!v)return;
  const p=pGet();p.username=v.slice(0,20);pSave();ppCancelRename();profileRender();
}
function ppCancelRename(){
  document.getElementById('pp-name-wrap').style.display='';
  const ed=document.getElementById('pp-name-edit');if(ed)ed.style.display='none';
}

function showLevelUp(ld){
  try{GeoAudio.playSFX('levelup');}catch(e){}
  try{
    const ge=id=>document.getElementById(id);
    const td=TIERS[ld.tier]||TIERS.wanderer;
    if(ge('lu-emblem'))ge('lu-emblem').innerHTML=drawEmblem(ld.lvl,2.2);
    if(ge('lu-emblem-ring')){
      ge('lu-emblem-ring').style.cssText=`border-color:${ld.color};box-shadow:0 0 30px ${td.glow},0 0 60px ${td.glow}40`;
    }
    if(ge('lu-tier-badge')){
      ge('lu-tier-badge').textContent=td.label;
      ge('lu-tier-badge').style.cssText=`background:${ld.color}22;color:${ld.color};border-color:${ld.color}55`;
    }
    if(ge('lu-name')){ge('lu-name').textContent=ld.name;ge('lu-name').style.color=ld.color;}
    if(ge('lu-sub'))ge('lu-sub').textContent='Level '+ld.lvl+' unlocked';
    if(ge('lu-btn')){ge('lu-btn').style.background=ld.color;ge('lu-btn').style.color=(ld.tier==='worldscholar'||ld.tier==='oracle')?'#fff':'#000';}
    if(ge('lu-bg-glow'))ge('lu-bg-glow').style.background=`radial-gradient(ellipse at center,${td.glow} 0%,transparent 70%)`;
    const o=ge('levelup-overlay');if(o)o.classList.add('show');
    startConfetti(ld.color);
  }catch(ex){console.warn('showLevelUp:',ex);}
}
function closeLevelUp(){const o=document.getElementById('levelup-overlay');if(o)o.classList.remove('show');stopConfetti();}
let _confAnim=null,_confParts=[];
function startConfetti(color){
  try{GeoAudio.playSFX('confetti');}catch(e){}
  const cv=document.getElementById('confetti-canvas');if(!cv)return;
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  const ctx=cv.getContext('2d'),cols=[color,'#fff','#c8f135','#ffd700'];
  _confParts=[];
  for(let i=0;i<100;i++)_confParts.push({x:Math.random()*cv.width,y:-20,d:1+Math.random()*2,r:3+Math.random()*5,col:cols[i%4],a:0,as:.05+Math.random()*.1});
  function draw(){ctx.clearRect(0,0,cv.width,cv.height);_confParts.forEach(p=>{ctx.beginPath();ctx.lineWidth=p.r/2;ctx.strokeStyle=p.col;ctx.moveTo(p.x+Math.sin(p.a)*10,p.y);ctx.lineTo(p.x+Math.sin(p.a)*10,p.y+p.r);ctx.stroke();p.y+=p.d+1;p.a+=p.as;});_confParts=_confParts.filter(p=>p.y<cv.height);if(_confParts.length)_confAnim=requestAnimationFrame(draw);else ctx.clearRect(0,0,cv.width,cv.height);}
  if(_confAnim)cancelAnimationFrame(_confAnim);draw();
}
function stopConfetti(){if(_confAnim)cancelAnimationFrame(_confAnim);const cv=document.getElementById('confetti-canvas');if(cv)cv.getContext('2d').clearRect(0,0,cv.width,cv.height);}

function openRanksPanel(){
  const panel=document.getElementById('ranks-panel'),list=document.getElementById('ranks-list');
  if(!panel||!list)return;
  const p=pGet(),cl=getLvlData(p.xp).cur.lvl;
  list.innerHTML='';
  LEVELS.forEach(ld=>{
    const i=ld.lvl,isC=i===cl,isU=cl>=i;
    const td=TIERS[ld.tier]||TIERS.wanderer;
    const card=document.createElement('div');
    card.className='rp-card'+(isC?' rp-current':'')+(isU?'':' rp-locked');
    if(isC)card.style.cssText=`border-color:${ld.color};box-shadow:0 0 20px ${td.glow}`;
    card.innerHTML=`
      <div class="rp-emblem-wrap" style="${isC?'filter:drop-shadow(0 0 12px '+td.glow+')':''}">${drawEmblem(i,1.1)}</div>
      <div class="rp-card-body">
        <div class="rp-card-tier" style="color:${td.color}">${td.label}</div>
        <div class="rp-card-name" style="color:${ld.color}">${ld.name}</div>
        <div class="rp-card-xp">${i===1?'Starting level':(ld.xp.toLocaleString()+' XP to unlock')}</div>
        ${isC?`<div class="rp-now-badge" style="color:${ld.color};border-color:${ld.color}40;background:${ld.color}15">▶ YOUR LEVEL</div>`:''}
      </div>
      <div class="rp-card-status" style="color:${isU?ld.color:'var(--muted2)'}">${!isU?'🔒':isC?'':'✓'}</div>`;
    list.appendChild(card);
  });
  panel.classList.add('open');
  document.getElementById('profile-panel').classList.remove('open');
}
function closeRanksPanel(){document.getElementById('ranks-panel').classList.remove('open');}

/* ══════════════════════════════════════════
   BORDER RUN — NEIGHBOR DATA & GAME LOGIC
══════════════════════════════════════════ */

/* SVG Map Paths (simplified Natural Earth) */
const MAP_PATHS = {
'Afghanistan':'M682.2,183.1L683.7,183.1L685.8,183.5L686.6,183.8L688.6,183.1L689.5,183.5L690.4,182.6L692.0,182.6L692.4,182.3L692.7,181.5L693.9,180.8L695.4,181.3L695.1,181.9L695.9,182.0L695.6,183.7L696.7,184.3L697.7,183.9L698.9,183.7L700.6,182.8L702.5,183.0L705.3,183.0L705.7,183.5L704.2,183.8L702.8,184.1L699.7,184.4L696.7,184.8L695.1,185.6L695.8,186.5L696.1,187.4L694.7,188.2L694.8,189.0L694.1,189.7L691.5,189.6L692.6,190.9L690.8,191.3L689.7,192.5L689.8,193.6L688.8,194.1L687.8,194.0L685.7,194.2L685.4,194.7L683.4,194.7L681.8,195.8L681.7,197.3L678.2,198.1L676.3,197.9L675.8,198.3L674.1,198.1L671.4,198.4L666.8,197.4L669.3,195.8L669.1,194.6L667.0,194.3L666.8,193.1L665.9,191.6L667.1,190.5L665.9,190.3L666.7,188.9L667.8,186.5L670.5,187.2L672.6,186.9L673.2,186.1L675.3,185.8L676.8,185.2L677.4,183.6L679.7,183.2L680.1,182.5L681.4,183.0Z',
'Albania':'M558.3,176.0L558.3,176.5L557.4,176.8L557.2,177.5L555.9,178.5L555.5,178.4L555.4,177.9L553.9,177.2L553.7,176.2L553.9,174.8L554.3,174.1L553.8,173.8L553.6,173.1L554.8,172.1L555.0,172.5L555.7,172.3L556.3,172.9L557.0,173.1L557.1,173.8L556.8,174.6L557.2,175.5Z',
'Algeria':'M477.4,201.8L477.5,201.5L477.5,201.3L477.5,199.2L481.8,197.9L484.6,197.6L486.8,197.1L487.8,196.2L491.0,195.5L491.1,194.1L492.7,193.9L493.9,193.2L497.5,192.9L498.0,192.2L497.3,191.8L496.4,189.8L496.2,188.6L495.2,187.4L497.8,186.3L500.7,186.0L502.4,185.2L505.1,184.6L509.7,184.2L514.2,184.1L515.6,184.4L518.1,183.6L521.0,183.6L522.1,184.0L524.0,183.9L523.5,184.9L523.9,186.8L523.2,188.4L521.6,189.5L521.8,190.9L524.0,192.0L524.1,192.5L525.7,193.2L526.9,196.5L527.8,198.2L527.9,199.0L527.4,200.5L527.6,201.3L527.3,202.3L527.5,203.4L526.5,204.1L528.1,205.4L528.2,206.2L529.1,207.1L530.4,206.8L532.6,207.6L533.7,208.7L524.4,212.0L516.5,215.3L512.7,216.0L509.7,216.2L509.6,215.1L508.4,214.9L506.7,214.4L506.0,213.6L496.9,209.9L487.7,206.1Z',
'Andorra':'M505.7,172.5L505.6,172.5L505.4,172.6L505.2,172.6L505.1,172.6L505.0,172.6L505.0,172.5L504.9,172.4L505.0,172.3L505.0,172.2L505.2,172.2L505.3,172.2L505.7,172.2L505.8,172.3L505.8,172.4L505.7,172.4Z',
'Angola':'M534.6,256.6L535.8,256.4L536.5,256.4L537.5,256.2L545.5,256.3L546.2,257.4L547.0,258.4L547.6,258.9L548.7,259.8L550.5,259.6L551.4,259.4L552.9,259.6L553.3,259.2L554.0,258.3L555.6,258.2L555.8,258.0L557.2,258.0L556.9,258.5L560.2,258.5L560.3,259.5L560.8,260.1L560.4,261.1L560.6,262.1L561.6,262.7L561.4,264.6L562.1,264.4L563.3,264.5L565.0,264.2L566.2,264.3L566.5,264.8L566.2,265.6L566.6,266.4L566.2,267.0L566.5,267.6L560.8,267.5L560.7,272.7L562.5,274.1L564.3,275.1L559.3,275.8L552.7,275.6L550.8,274.8L539.8,274.8L539.4,275.0L537.7,274.2L536.0,274.2L534.3,274.4L533.0,274.8L532.8,273.7L533.1,272.3L534.1,270.8L534.2,270.1L535.1,268.6L535.8,267.9L537.3,266.9L538.2,266.1L538.5,264.9L538.3,264.0L537.5,263.5L536.8,262.5L536.1,261.5L536.3,261.2L537.1,260.5L536.3,259.0L535.7,257.9L534.4,256.9Z',
'Argentina':'M314.2,345.3L315.2,346.5L316.6,348.5L320.1,350.1L323.9,350.8L322.7,352.2L320.1,352.3L318.7,351.3L317.1,351.3L314.2,351.3ZM344.1,297.2L343.5,298.6L342.7,300.5L342.8,302.4L342.2,302.8L342.0,304.1L341.8,305.1L345.2,306.7L344.9,308.1L346.6,308.9L346.4,309.9L343.8,312.4L339.8,313.5L334.3,313.9L331.3,313.7L331.9,315.0L331.3,316.5L331.8,317.5L330.2,318.3L327.4,318.6L324.8,317.8L323.7,318.4L324.1,320.5L326.0,321.1L327.4,320.4L328.3,321.5L325.8,322.2L323.6,323.6L323.2,325.8L322.5,327.0L319.9,327.0L317.8,328.1L317.0,329.8L319.7,331.5L322.3,332.0L321.4,334.1L318.2,335.4L316.4,338.3L313.9,339.3L312.8,340.4L313.7,343.1L315.5,344.5L314.3,344.4L311.8,344.0L305.2,343.7L304.1,342.2L304.2,340.3L302.3,340.5L301.4,339.6L301.1,336.9L303.2,335.9L304.1,334.4L303.8,333.2L305.2,331.2L306.2,328.1L305.9,326.8L307.1,326.4L306.8,325.6L305.6,325.1L306.5,324.2L305.2,323.4L304.6,320.9L305.7,320.4L305.2,317.9L305.9,315.7L306.6,313.9L308.2,313.2L307.4,311.2L307.4,309.4L309.5,308.1L309.4,306.5L310.9,304.6L310.9,302.9L310.2,302.5L309.0,299.3L310.7,297.4L310.4,295.6L311.4,294.0L313.2,292.3L315.1,291.2L314.3,290.5L314.8,289.9L314.8,287.0L317.7,286.1L318.7,284.3L318.3,283.9L320.6,282.4L324.2,282.8L325.8,284.0L326.8,282.6L329.9,282.7L330.4,283.1L335.4,285.9L337.6,286.2L340.9,287.4L343.7,288.1L344.1,288.9L341.4,291.6L344.2,292.1L347.2,292.3L349.4,292.0L351.9,290.7L352.3,289.1L353.7,288.8L355.0,289.8L355.0,291.2L352.7,292.2L350.9,292.9L347.8,294.7Z',
'Armenia':'M627.7,180.3L626.7,180.3L625.6,179.1L625.6,178.8L624.4,178.8L623.6,178.3L623.1,178.3L622.0,177.7L620.0,177.2L620.2,176.2L619.8,175.5L623.5,175.1L624.1,175.7L625.1,176.0L624.6,176.6L626.0,177.3L625.3,177.9L626.4,178.5L627.7,178.8Z',
'Australia':'M903.3,317.8L904.9,318.0L905.1,320.5L904.2,321.2L903.9,322.9L902.9,322.3L901.0,323.9L900.5,323.7L898.8,323.7L897.1,321.8L896.7,320.4L895.2,318.6L895.2,317.6L897.0,317.8L899.7,318.5L901.1,318.2ZM844.6,300.9L841.7,301.8L839.4,302.3L838.8,303.3L837.8,304.0L835.5,304.1L833.8,304.2L831.4,303.9L829.4,304.1L827.6,304.2L826.0,305.2L825.2,305.1L823.8,305.7L822.5,306.3L820.5,306.2L818.7,306.2L815.8,305.0L814.3,304.6L814.4,303.5L815.7,303.3L816.2,302.8L816.1,302.1L816.4,300.8L816.1,299.7L814.7,297.9L814.2,296.8L814.4,295.8L813.3,294.6L813.2,294.1L812.0,293.4L811.7,292.0L810.1,290.5L809.7,289.8L810.9,290.6L810.0,288.9L811.4,289.4L812.2,290.1L812.1,289.2L810.8,287.8L810.5,287.3L809.9,286.8L810.2,285.8L810.7,285.3L811.1,284.5L810.8,283.5L811.9,282.2L812.1,283.5L813.3,282.4L815.5,281.8L816.8,281.1L818.9,280.4L820.1,280.3L820.9,280.5L823.0,279.9L824.7,279.7L825.1,279.3L825.8,279.2L827.3,279.2L830.2,278.7L831.7,278.0L832.4,277.1L834.0,276.2L834.1,275.6L834.2,274.7L836.1,273.3L837.2,274.7L838.4,274.4L837.4,273.6L838.3,272.8L839.5,273.1L839.8,271.9L841.3,271.1L841.9,270.4L843.3,270.2L843.3,269.7L844.5,269.9L844.6,269.5L845.8,269.2L847.1,269.0L849.1,269.8L850.6,270.7L852.3,270.8L854.1,270.9L853.5,270.0L854.8,268.7L856.0,268.3L855.6,267.9L856.8,266.9L858.4,266.4L859.8,266.6L862.1,266.3L862.1,265.4L860.1,264.9L861.5,264.7L863.3,265.1L864.8,265.7L867.1,266.1L867.8,266.0L869.5,266.5L871.1,266.0L872.1,266.2L872.8,265.8L874.0,266.6L873.3,267.5L872.3,268.2L871.3,268.2L871.6,268.9L870.8,269.7L869.9,270.5L870.1,271.0L872.2,271.9L874.3,272.4L875.7,273.0L877.7,273.9L878.5,273.9L879.9,274.4L880.3,274.9L882.9,275.4L884.7,274.9L885.2,274.0L885.8,273.2L886.1,272.3L887.0,271.0L886.6,270.2L886.8,269.8L886.5,268.8L886.8,267.6L887.3,267.3L886.9,266.7L887.6,265.9L888.1,265.0L888.2,264.5L889.2,263.9L889.9,264.7L890.1,265.7L890.8,265.9L890.9,266.6L891.9,267.4L892.1,268.3L892.0,268.9L893.0,270.2L894.8,269.6L895.7,270.3L897.0,270.9L896.7,271.7L897.3,273.1L897.7,273.9L898.4,274.1L899.1,275.5L898.8,276.4L899.7,277.5L902.7,278.4L904.6,279.2L906.4,279.9L906.1,280.3L907.6,281.4L908.7,283.2L909.8,282.9L910.9,283.6L911.5,283.3L912.0,285.2L913.9,286.2L915.2,286.9L917.3,288.3L918.1,289.7L918.2,290.7L918.0,291.8L919.3,293.3L919.1,294.9L918.7,295.8L917.9,297.4L918.0,298.5L917.4,299.8L916.2,301.5L914.2,302.4L913.2,303.9L912.3,304.8L911.5,306.5L910.5,307.5L909.8,308.9L909.4,310.3L909.6,310.9L908.0,311.6L904.9,311.7L902.4,312.5L901.2,313.3L899.5,314.2L897.3,313.3L895.6,312.9L896.0,311.9L894.5,312.2L892.2,313.7L889.8,313.1L888.3,312.8L886.7,312.7L884.1,312.1L882.3,310.9L881.8,309.4L881.2,308.4L879.8,307.6L877.2,307.3L878.1,306.4L877.4,305.0L876.1,306.3L873.7,306.7L875.1,305.6L875.5,304.5L876.6,303.5L876.4,302.1L874.1,303.8L872.4,304.4L871.4,305.9L869.3,305.2L869.4,304.1L867.7,302.8L866.2,302.0L866.7,301.6L863.2,300.5L861.3,300.4L858.7,299.5L853.8,299.7L850.3,300.4L847.2,301.0Z',
'Austria':'M547.3,159.8L547.1,160.8L545.6,160.8L546.1,161.3L545.2,162.8L544.7,163.2L542.3,163.2L540.9,163.7L538.7,163.6L534.8,163.0L534.2,162.2L531.5,162.6L531.2,163.0L529.5,162.7L528.1,162.6L526.9,162.2L527.3,161.6L527.2,161.2L528.0,161.1L529.4,161.7L529.8,161.1L532.2,161.2L534.1,160.8L535.4,160.9L536.3,161.3L536.5,160.9L536.2,159.4L537.1,159.1L538.1,158.0L540.1,158.8L541.7,157.8L542.6,157.6L544.7,158.3L546.0,158.2L547.3,158.7L547.0,159.0Z',
'Azerbaijan':'M627.4,173.8L628.2,173.9L630.1,175.2L631.3,175.3L631.8,174.8L633.4,173.9L634.8,175.1L636.2,176.5L637.5,176.6L638.3,177.2L636.1,177.4L635.6,179.0L635.1,179.7L634.1,180.2L634.2,181.2L633.5,181.3L631.8,180.2L632.8,179.2L632.0,178.6L630.9,178.7L627.7,180.3L627.7,178.8L626.4,178.5L625.3,177.9L626.0,177.3L624.6,176.6L625.1,176.0L624.1,175.7L623.5,175.1L624.2,174.8L626.2,175.4L627.7,175.5L628.1,175.3L626.7,174.1Z',
'Bangladesh':'M753.4,211.2L753.4,212.4L752.4,212.1L752.6,213.5L751.8,212.6L751.7,211.7L751.2,210.9L750.0,209.9L747.5,209.8L747.8,210.5L746.9,211.5L745.7,211.2L745.4,211.5L744.6,211.3L743.5,211.1L743.1,209.7L742.2,208.4L742.6,207.4L740.9,206.9L741.6,206.3L743.3,205.6L741.3,204.7L742.3,203.5L744.4,204.3L745.7,204.3L745.9,205.6L748.5,205.8L751.1,205.8L752.6,206.1L751.4,207.6L750.2,207.7L749.3,208.6L750.8,209.5L751.3,208.4L752.0,208.4Z',
'Belarus':'M577.8,139.0L580.7,139.7L581.1,140.4L582.5,140.0L585.1,140.7L585.4,142.0L584.8,142.8L586.5,144.5L587.6,145.0L587.5,145.5L589.3,146.0L590.1,146.7L589.0,147.3L586.8,147.2L586.3,147.4L587.0,148.3L587.6,150.0L585.3,150.1L584.5,150.7L584.3,152.0L583.2,151.7L580.7,151.8L580.0,151.2L579.0,151.7L578.0,151.3L575.8,151.3L572.8,150.7L570.0,150.5L567.9,150.5L566.4,151.2L565.1,151.3L565.1,150.2L564.3,149.0L565.9,148.4L565.9,147.4L565.1,146.4L565.0,145.2L567.7,145.2L570.6,144.2L571.2,142.7L573.5,141.8L573.2,140.5L574.9,140.1Z',
'Belgium':'M517.8,153.3L517.5,154.9L516.8,155.0L516.5,156.4L514.1,155.3L512.7,155.5L510.8,154.3L509.6,153.3L508.3,153.3L507.9,152.4L510.1,151.9L512.1,152.1L514.6,151.6L516.3,152.7Z',
'Belize':'M258.3,218.3L258.3,218.0L258.6,218.0L259.1,218.2L260.1,217.1L260.6,217.1L260.6,217.4L261.1,217.4L261.1,217.8L260.6,218.6L260.9,218.8L260.6,219.4L260.8,219.6L260.5,220.4L259.9,220.8L259.4,220.9L258.9,221.5L258.1,221.5L258.3,219.6Z',
'Benin':'M508.4,237.0L506.2,237.2L505.5,236.1L505.6,232.4L505.1,232.1L505.0,231.3L504.0,230.7L503.2,230.3L503.5,229.4L504.5,229.2L505.0,228.5L506.3,228.4L506.9,227.9L507.9,227.4L508.8,227.4L510.9,228.3L510.8,228.9L511.4,229.8L510.9,230.5L511.2,230.9L509.8,231.9L509.0,232.4L508.5,233.4L508.6,234.4Z',
'Bhutan':'M750.8,201.1L751.9,201.7L751.7,202.8L749.5,202.9L747.2,202.7L745.5,203.0L743.0,202.3L742.9,202.0L744.7,200.7L746.2,200.2L748.2,200.6L749.6,200.7Z',
'Bolivia':'M311.7,264.4L313.8,264.5L315.2,264.5L315.8,264.0L318.1,263.3L319.6,262.7L323.1,262.5L322.9,263.7L323.2,264.3L323.0,265.4L325.9,266.8L329.0,267.1L330.0,267.7L331.9,268.0L333.0,268.5L334.7,268.5L336.3,269.0L336.4,269.9L337.0,270.4L337.0,271.1L336.2,271.1L337.2,273.0L342.5,273.1L342.1,274.1L342.4,274.7L343.8,275.2L344.5,276.2L344.0,277.5L343.3,278.3L343.5,279.2L342.7,279.6L342.6,279.0L340.1,278.2L337.6,278.2L332.8,278.6L331.5,280.1L331.4,281.0L330.4,283.1L329.9,282.7L326.8,282.6L325.8,284.0L324.2,282.8L320.6,282.4L318.3,283.9L316.4,284.2L315.3,281.8L313.8,279.9L314.7,278.3L313.3,277.6L312.9,276.3L311.6,275.2L313.3,273.4L312.1,272.0L312.7,271.5L312.2,270.9L313.3,270.1L313.4,268.7L313.5,267.5L314.1,267.0Z',
'Bosnia & Herz.':'M551.6,172.1L549.2,171.3L548.2,170.4L547.1,169.9L545.9,169.1L545.3,168.4L544.0,167.4L544.5,166.5L545.5,167.0L546.1,166.5L547.4,166.5L549.7,166.8L551.6,166.8L552.8,167.3L553.8,167.3L553.1,168.3L554.4,169.1L554.1,170.2L553.4,170.3L552.9,170.5L552.0,171.0Z',
'Botswana':'M581.2,282.8L577.4,284.1L574.9,285.4L574.0,286.5L573.2,287.2L571.7,287.3L571.2,288.1L571.0,288.7L569.2,289.1L567.0,289.0L565.7,288.5L564.6,288.3L563.2,288.7L562.6,289.6L561.3,290.1L559.9,290.9L558.0,291.1L557.4,290.4L557.6,289.4L556.0,287.7L555.3,287.4L555.3,282.4L557.9,282.3L558.0,276.3L560.0,276.3L564.2,275.7L565.3,276.4L567.0,275.7L567.8,275.7L569.4,275.4L569.9,275.5L570.9,276.8L571.5,277.1L572.3,278.1L575.4,279.9L576.6,280.1L576.6,280.7L577.4,281.8L579.5,282.0Z',
'Brazil':'M355.7,303.8L355.0,302.7L356.2,301.8L354.6,300.5L352.5,299.5L349.7,298.3L348.6,298.4L345.9,297.0L344.1,297.2L347.8,294.7L350.9,292.9L352.7,292.2L355.0,291.2L355.0,289.8L353.7,288.8L352.3,289.1L352.8,288.1L353.2,287.1L353.2,286.1L352.2,285.8L351.2,286.1L350.2,286.0L349.9,285.4L349.6,283.8L349.1,283.3L347.3,282.8L346.2,283.1L343.3,282.8L343.5,280.5L342.7,279.6L343.5,279.2L343.3,278.3L344.0,277.5L344.5,276.2L343.8,275.2L342.4,274.7L342.1,274.1L342.5,273.1L337.2,273.0L336.2,271.1L337.0,271.1L337.0,270.4L336.4,269.9L336.3,269.0L334.7,268.5L333.0,268.5L331.9,268.0L330.0,267.7L329.0,267.1L325.9,266.8L323.0,265.4L323.2,264.3L322.9,263.7L323.1,262.5L319.6,262.7L318.1,263.3L315.8,264.0L315.2,264.5L313.8,264.5L311.7,264.4L310.2,264.7L309.0,264.5L309.1,262.0L306.9,263.0L304.5,262.9L303.5,262.1L301.7,262.0L302.2,261.3L300.7,260.3L299.6,258.9L300.3,258.6L300.3,257.9L301.9,257.5L301.7,256.6L302.4,256.0L302.6,255.3L305.7,254.2L307.9,253.9L308.3,253.7L310.7,253.7L312.0,249.4L312.0,248.7L311.6,247.8L310.4,247.2L310.4,246.1L311.9,245.8L312.5,246.0L312.6,245.4L311.0,245.2L310.9,244.2L316.2,244.3L317.2,243.7L317.9,244.2L318.4,245.1L319.0,245.0L320.5,245.8L322.6,245.7L323.1,245.2L325.1,244.8L326.2,244.6L326.6,243.9L328.5,243.5L328.4,243.1L326.0,243.0L325.7,242.0L325.8,240.9L324.6,240.5L325.1,240.4L327.1,240.6L329.3,241.0L330.0,240.6L332.0,240.3L335.0,239.7L336.0,239.1L335.7,238.7L337.1,238.6L337.7,239.0L337.4,239.7L338.3,239.9L338.9,240.7L338.2,241.2L337.7,242.6L338.4,243.4L338.6,244.1L340.3,244.9L341.7,244.9L342.0,244.6L342.8,244.6L344.0,244.3L344.9,243.9L346.4,244.0L347.1,243.9L348.6,244.1L348.8,243.7L348.4,243.4L348.6,243.0L349.7,243.1L351.0,242.9L352.6,243.3L353.8,243.6L354.6,243.2L355.2,243.2L355.6,243.7L356.9,243.6L357.9,243.0L358.8,241.8L360.4,240.4L361.3,240.3L362.0,241.2L363.5,243.9L365.0,244.2L365.1,245.3L363.0,246.6L363.9,247.1L368.7,247.3L368.8,248.9L370.8,247.9L374.3,248.4L378.8,249.4L380.1,250.3L379.7,251.2L382.8,250.7L388.1,251.6L392.2,251.5L396.2,252.8L399.7,254.6L401.8,255.0L404.1,255.1L405.1,255.6L406.0,257.6L406.5,258.6L405.4,261.2L404.0,262.3L400.2,264.5L398.5,266.4L396.4,267.8L395.8,267.8L395.0,269.0L395.2,272.1L394.4,274.6L394.1,275.7L393.3,276.4L392.8,278.6L390.0,280.8L389.6,282.5L387.4,283.3L386.7,284.3L383.8,284.3L379.5,285.0L377.6,285.7L374.5,286.2L371.3,287.6L369.0,289.4L368.6,290.7L369.1,291.7L368.6,293.5L367.9,294.4L366.0,295.4L363.0,298.6L360.6,300.0L358.8,300.9L357.5,302.7Z',
'Brunei':'M814.6,239.2L814.7,239.2L814.9,239.4L815.0,239.6L815.0,239.9L815.1,240.0L815.0,240.0L814.9,240.0L814.7,240.0L814.5,240.0L814.4,239.7L814.3,239.5L814.3,239.3L814.3,239.2ZM814.3,239.2L814.1,239.2L813.9,239.3L813.7,239.4L813.6,239.5L813.6,239.7L813.7,239.9L813.8,240.0L813.7,240.2L813.6,240.3L813.5,240.4L813.3,240.5L813.2,240.6L813.1,240.5L812.9,240.4L812.7,240.3L812.7,240.2L812.4,240.2L812.3,240.1L812.3,240.0L812.2,239.9L812.1,239.8L812.0,239.8L811.8,239.7L811.7,239.7L812.0,239.7L812.3,239.6L812.7,239.6L813.0,239.5L813.3,239.3L813.5,239.2L813.8,239.1L814.2,239.0L814.4,239.0L814.4,239.1Z',
'Bulgaria':'M562.8,168.7L563.6,169.6L564.6,169.4L566.7,169.8L570.7,169.9L572.1,169.3L575.3,168.8L577.2,169.6L578.8,169.9L577.4,170.8L576.4,172.3L577.3,173.5L575.0,173.2L572.2,173.9L572.2,175.0L569.7,175.2L567.8,174.4L565.6,175.0L563.6,174.9L563.4,173.5L562.0,172.9L562.5,172.6L562.2,172.3L562.6,171.6L563.7,170.9L562.3,170.0L562.1,169.2Z',
'Burkina Faso':'M486.4,230.4L486.2,229.5L486.9,228.8L486.9,228.3L489.0,226.9L489.4,225.8L490.2,225.4L491.5,225.6L492.6,225.3L493.0,224.9L495.1,224.1L495.6,223.6L498.2,223.0L499.7,222.7L500.3,223.0L502.1,223.0L501.9,223.8L502.2,224.6L503.8,225.6L503.9,226.4L507.0,226.8L506.9,227.9L506.3,228.4L505.0,228.5L504.5,229.2L503.5,229.4L501.1,229.4L499.9,229.3L499.0,229.5L497.8,229.4L493.1,229.5L493.0,230.4L493.4,231.6L491.5,231.2L490.2,231.2L489.3,231.7L488.1,231.3L487.6,230.8Z',
'Burundi':'M584.0,250.8L584.2,251.4L584.8,251.7L584.8,252.3L584.1,252.6L583.1,253.4L582.1,254.0L581.0,254.1L580.8,252.2L580.1,251.4L581.8,251.6L582.6,250.7Z',
'Cambodia':'M780.4,227.5L779.8,225.5L781.5,224.2L785.1,223.9L787.6,224.1L789.9,224.7L791.1,223.6L793.5,224.2L794.1,225.3L793.8,227.3L789.2,228.5L790.4,229.5L787.6,229.6L785.2,230.2L782.9,230.0L781.8,229.2Z',
'Cameroon':'M540.5,226.4L541.6,227.4L541.8,228.5L541.7,229.6L543.2,231.1L541.7,231.0L540.9,231.2L539.7,231.0L539.1,231.7L540.7,232.7L541.9,233.0L542.3,233.6L543.1,234.7L542.7,235.2L541.3,236.8L540.7,237.1L540.4,238.3L540.7,239.0L540.5,239.4L541.8,240.3L542.0,240.8L543.0,241.7L544.3,242.2L544.4,242.9L544.7,243.3L544.5,244.2L542.3,243.8L540.1,243.4L536.7,243.3L536.3,243.3L534.7,243.5L533.1,243.3L531.8,243.4L527.3,243.3L527.7,242.1L526.7,241.0L525.4,240.8L524.9,240.0L524.2,239.8L524.2,239.4L524.9,238.2L526.2,236.7L527.0,236.7L528.6,235.8L529.7,235.7L531.2,236.4L533.1,235.9L533.3,235.2L533.9,234.6L534.3,233.7L535.8,233.1L536.4,232.0L536.9,231.6L537.3,230.8L538.0,229.7L540.3,228.5L540.5,228.0L540.8,227.7L539.7,227.0L539.8,226.5Z',
'Canada':'M166.5,157.7L166.2,157.7L160.9,155.3L159.0,154.2L154.0,153.2L152.5,151.0L152.9,149.4L149.4,148.3L148.9,146.1L145.6,144.2L145.6,142.8L147.1,141.5L147.0,139.7L142.4,137.9L139.6,134.5L137.9,132.4L135.4,131.0L133.6,129.8L132.1,128.2L129.4,129.2L126.8,130.9L124.3,128.9L122.4,127.5L119.8,126.6L117.1,126.5L117.1,106.5L117.1,90.8L122.2,91.9L126.5,94.1L129.3,94.5L131.7,92.6L135.0,91.2L139.1,91.8L143.2,89.8L147.6,88.6L149.5,90.5L151.5,89.5L152.1,87.3L154.0,87.8L158.6,91.9L162.2,88.8L162.6,92.3L165.9,91.5L167.0,90.2L170.3,90.5L174.4,92.4L180.8,94.0L184.6,94.7L187.2,94.5L190.9,96.7L187.1,98.8L192.0,99.7L199.3,99.2L201.7,98.4L204.6,100.9L207.5,98.8L204.7,97.0L206.5,95.6L209.8,95.4L212.0,94.9L214.2,96.0L216.9,98.3L220.0,98.0L224.8,99.8L229.0,99.2L233.0,99.3L232.7,96.6L235.1,95.9L239.3,97.4L239.3,101.3L241.0,98.0L243.2,98.1L244.5,93.7L241.5,91.0L238.4,89.1L238.6,83.8L241.8,80.2L245.4,81.0L248.1,83.2L251.8,88.6L249.4,90.9L254.5,91.8L254.5,96.3L258.1,92.9L261.4,95.7L260.6,98.9L263.2,101.7L266.0,98.7L268.0,95.0L268.2,90.1L272.0,90.4L276.1,91.1L279.7,93.3L279.9,95.5L277.9,97.8L279.8,100.1L279.4,102.1L274.1,104.9L270.3,105.5L267.5,104.3L266.7,106.3L264.1,109.5L263.3,111.1L260.1,113.6L256.2,113.9L254.1,115.4L253.9,117.7L250.7,118.1L247.4,120.9L244.4,124.6L243.4,127.1L243.2,130.8L247.2,131.3L248.5,134.1L249.7,136.3L253.5,135.7L258.6,137.0L261.3,138.1L263.3,139.4L266.7,140.2L269.6,141.4L274.1,141.6L277.0,141.8L276.6,144.2L277.4,146.9L279.4,149.8L283.4,152.2L285.5,151.4L287.0,148.8L285.6,144.6L283.7,143.2L288.0,141.9L291.1,139.9L292.6,137.9L292.4,136.0L290.6,133.5L287.3,131.2L290.5,127.9L289.3,125.1L288.4,119.9L290.3,119.1L294.9,120.0L297.7,120.3L300.0,119.4L302.5,120.6L305.9,122.5L306.7,123.8L311.6,124.1L311.5,126.8L312.4,130.7L314.9,131.2L316.8,133.0L320.8,131.3L323.4,127.9L325.2,126.4L327.3,129.2L330.9,133.1L333.9,136.7L332.8,138.5L336.4,140.1L338.8,141.7L343.2,142.4L344.9,143.3L346.0,145.6L348.1,145.9L349.2,146.9L349.4,149.9L347.5,150.8L345.5,151.7L341.0,152.6L337.6,154.7L333.0,155.1L327.2,154.5L323.1,154.5L320.3,154.7L318.0,156.5L314.5,157.5L310.6,160.7L307.4,162.8L309.8,162.5L314.1,159.4L319.8,157.4L323.9,157.1L326.3,158.3L323.7,159.9L324.6,162.4L325.5,164.2L329.0,165.3L333.5,165.0L336.3,162.4L336.5,164.1L338.2,164.9L334.8,166.4L328.8,167.7L326.1,168.6L323.1,170.2L321.0,170.0L320.9,168.2L325.6,166.3L321.3,166.4L318.2,166.7L316.5,165.4L316.5,162.3L315.3,161.6L313.4,162.0L312.5,161.4L310.4,163.1L309.6,164.9L308.6,166.0L307.5,166.3L306.6,166.4L306.3,167.0L301.3,167.0L297.2,167.0L296.0,167.4L293.1,169.0L292.7,169.2L291.9,170.0L289.4,170.0L286.7,170.0L285.5,170.4L285.9,170.8L286.2,171.5L286.1,171.7L282.5,172.8L279.7,173.1L276.6,174.2L275.9,174.2L275.0,173.9L274.7,173.6L274.7,173.4L275.3,172.6L276.6,171.4L277.4,170.2L276.8,168.2L276.3,166.2L273.4,165.2L273.8,164.7L273.4,164.5L272.6,164.5L272.1,164.1L271.9,163.6L271.4,163.8L270.7,163.7L270.8,163.5L270.2,163.3L269.9,162.7L267.8,161.9L265.6,161.1L263.0,160.2L260.4,159.4L258.0,160.0L257.1,160.1L253.7,159.4L251.5,159.8L248.9,159.0L246.1,158.6L244.2,158.5L243.3,158.1L242.9,156.8L241.9,156.8L241.9,157.7L236.3,157.7L227.0,157.7L217.7,157.7L209.5,157.7L201.4,157.7L193.3,157.7L185.0,157.7L182.4,157.7L174.3,157.7ZM272.3,119.4L274.4,117.8L278.1,117.9L278.0,118.5L274.9,120.4L272.9,120.3ZM283.8,75.6L280.8,72.7L280.9,70.7L282.3,70.3L288.5,70.9L293.2,74.0L293.4,75.5L290.5,75.3L287.6,75.2L284.6,75.9ZM282.4,120.7L283.4,119.6L284.5,119.7L285.2,120.4L284.1,122.2L282.9,121.9L282.2,120.9ZM246.1,63.1L244.7,65.5L240.7,65.0L237.4,63.5L238.9,60.7L242.8,59.0L245.1,61.2ZM245.5,46.2L244.3,46.4L239.2,45.9L238.5,43.8L243.9,44.0L245.8,45.3ZM237.6,36.6L240.8,39.4L240.1,42.2L236.1,43.7L233.9,42.0L232.7,39.0L232.5,35.7L236.0,36.0ZM261.0,66.7L256.6,65.9L249.4,64.0L248.4,60.6L248.1,57.5L245.4,54.6L239.7,53.8L236.6,51.6L237.6,48.8L243.2,49.2L246.2,51.5L251.6,51.5L254.0,53.7L253.3,56.2L256.5,57.7L258.2,59.2L261.9,59.5L265.8,60.0L270.2,58.6L275.7,58.1L280.1,58.6L283.1,60.9L283.7,63.5L282.0,65.1L277.9,66.4L274.4,65.7L266.6,66.6ZM198.1,41.4L201.9,42.6L201.0,44.9L195.9,47.0L191.9,44.6L194.1,42.2ZM198.9,36.3L202.4,37.9L199.1,39.4L194.6,39.4L194.6,38.3L197.4,35.9ZM349.7,152.0L348.2,153.6L346.4,155.7L348.2,154.9L350.0,155.4L349.1,156.3L351.5,156.9L352.7,156.3L355.4,157.1L354.6,158.9L356.5,158.5L356.9,159.7L357.7,161.2L356.6,163.2L355.3,163.3L353.5,162.9L354.1,161.0L353.4,160.7L350.2,162.7L348.6,162.6L350.5,161.5L347.9,161.0L345.0,161.1L339.7,161.0L339.3,160.3L341.0,159.5L339.8,158.8L342.1,157.4L344.9,153.5L346.6,152.0L348.9,151.2L350.2,151.3ZM272.6,109.9L275.6,111.2L278.7,112.3L279.0,114.0L281.0,113.8L282.9,115.0L280.5,116.1L276.3,115.2L274.7,113.6L272.0,115.5L268.2,117.3L267.2,115.3L263.5,115.6L265.9,113.8L266.3,111.0L267.2,107.5L269.2,107.8L269.7,109.5L271.1,108.9ZM286.6,78.0L289.1,75.9L295.2,78.5L298.9,81.0L299.3,83.2L304.3,82.0L307.2,85.2L313.8,87.1L316.1,89.0L318.7,93.2L313.7,95.3L320.1,98.1L324.4,99.0L328.4,102.8L332.6,103.1L331.8,105.8L327.0,110.3L323.7,108.7L319.4,105.0L315.9,105.4L315.5,107.7L318.4,109.9L322.1,111.6L323.2,112.6L325.0,116.1L324.0,118.6L320.6,117.7L313.8,114.9L317.6,117.9L320.4,120.0L320.9,121.2L313.5,119.8L307.7,117.8L304.4,116.1L305.3,115.1L301.2,113.3L297.3,111.5L297.3,112.6L289.4,113.1L287.1,111.9L288.9,109.1L294.1,109.1L299.7,108.6L298.8,107.2L299.7,105.3L303.2,101.3L302.5,99.5L301.4,98.1L297.3,96.0L291.7,94.5L293.5,93.4L290.6,90.6L288.2,90.3L286.1,88.7L284.6,90.1L279.7,90.7L269.7,89.7L264.0,88.3L259.6,87.6L257.3,85.9L260.2,83.7L256.3,83.7L255.4,78.6L257.5,73.8L260.3,71.6L267.3,70.1L265.3,73.7L267.5,77.0L270.0,72.7L276.9,70.4L281.6,76.0L281.2,79.5ZM243.7,68.2L249.4,68.4L254.6,69.8L250.5,74.7L247.3,75.8L244.4,79.7L241.2,79.5L239.5,74.8L239.6,72.1L241.0,69.7ZM166.5,55.9L171.1,50.9L176.7,46.2L180.9,46.3L184.6,45.3L184.3,50.8L182.2,53.2L179.6,53.5L174.6,56.3L170.2,57.3ZM139.7,144.9L142.3,144.6L141.5,147.7L143.8,149.8L142.8,149.8L141.1,148.6L140.1,147.4L138.7,146.5L138.2,145.4L138.4,144.5ZM213.8,32.1L219.1,33.3L226.5,36.3L228.6,40.1L229.6,43.3L225.2,42.5L220.7,39.9L214.7,39.7L217.3,37.3L214.0,35.3ZM164.7,158.9L163.4,159.2L158.9,158.1L158.1,157.3L155.6,156.4L155.1,155.7L152.3,155.3L151.3,153.9L151.5,153.3L154.4,153.9L156.1,154.3L158.6,154.5L159.5,155.4L160.9,156.5L163.6,157.5ZM170.1,66.3L174.0,67.6L180.9,67.9L183.6,69.5L186.5,71.9L183.1,73.3L176.4,77.1L173.0,80.7L173.0,82.9L165.9,85.3L164.4,83.1L158.1,80.5L159.3,78.3L161.2,74.4L163.6,70.8L160.9,67.3ZM207.5,57.7L209.9,56.6L212.7,56.9L213.2,60.0L211.6,63.0L202.3,63.9L195.5,66.5L191.3,66.7L191.0,64.7L196.6,62.0L184.3,62.8L180.5,61.7L184.2,55.4L186.8,53.5L194.5,55.8L199.3,59.6L204.1,60.1L200.2,53.8L202.7,51.4L205.5,52.2L206.4,55.4ZM211.0,74.1L214.0,76.3L215.7,81.3L216.6,84.8L221.2,87.2L226.1,89.4L225.8,91.4L221.3,91.8L223.0,93.5L222.1,95.1L217.2,94.4L212.5,93.2L209.4,93.5L204.2,95.0L197.3,95.7L192.5,96.1L191.0,94.0L187.3,92.8L184.9,93.3L181.5,89.7L183.3,89.2L187.5,88.4L191.4,88.6L194.9,87.8L189.7,86.7L183.9,87.1L180.0,87.0L178.6,85.2L184.9,83.3L180.7,83.3L175.9,82.0L178.2,78.2L180.1,76.1L187.4,72.8L190.2,73.9L188.8,76.4L194.9,74.8L198.7,77.5L201.7,74.7L204.2,76.5L206.4,81.6L207.8,79.5L205.9,74.0L208.3,73.2ZM227.6,76.1L224.6,72.6L227.8,69.8L231.0,71.0L235.9,70.3L236.6,71.9L234.0,74.6L238.2,76.9L237.7,81.5L233.2,83.4L230.6,83.0L228.7,81.1L221.9,77.1L222.0,75.4ZM210.8,71.2L214.4,71.0L216.5,72.2L214.1,75.8L209.8,72.0ZM232.8,51.9L234.9,55.0L235.0,58.4L233.8,63.0L229.3,63.6L226.3,62.7L226.4,59.0L221.9,59.5L221.8,54.5L224.7,54.7L228.8,52.4L232.6,52.8ZM239.6,20.3L241.5,17.3L244.3,16.6L243.1,14.2L249.4,13.7L252.9,19.1L257.5,21.2L261.9,23.0L264.1,29.0L267.4,31.8L263.6,34.3L258.6,40.4L253.8,40.9L248.1,39.9L245.2,36.7L245.3,33.7L247.4,31.4L242.4,31.5L239.4,28.6L237.7,24.5ZM251.7,6.8L255.7,4.7L258.9,4.3L264.2,2.4L268.2,-2.1L271.6,-1.5L274.6,1.9L276.6,-4.7L280.2,-6.8L285.1,-8.2L293.4,-8.8L294.9,-7.4L302.7,-9.6L308.6,-8.7L314.5,-7.9L321.8,-6.9L327.7,-5.2L332.6,-1.8L332.5,1.4L325.9,6.5L319.3,8.7L316.8,11.1L322.8,11.1L316.3,17.4L311.9,20.2L307.2,27.8L301.6,29.2L299.9,31.0L291.6,31.9L295.4,33.0L293.5,34.5L295.8,38.5L293.2,41.2L289.0,43.4L287.7,46.3L283.9,48.4L284.2,50.0L288.9,49.8L289.0,51.5L281.7,55.5L274.6,53.7L266.6,54.7L262.5,53.9L257.4,53.6L257.0,50.2L262.1,48.6L260.7,43.4L262.4,42.8L269.7,46.0L265.9,41.2L261.5,39.7L263.7,36.6L268.6,34.7L269.3,31.7L265.5,28.3L264.3,23.6L271.8,24.0L273.9,25.0L278.2,21.6L272.0,20.5L262.5,21.1L257.7,17.8L255.4,13.7L252.3,10.6ZM296.2,100.7L294.5,101.9L291.4,102.1L290.7,100.1L291.9,97.7L294.4,97.1L296.5,98.3L296.5,100.1ZM238.9,91.9L240.6,93.6L238.9,95.1L235.2,93.8L233.0,94.3L229.3,92.3L231.7,90.9L233.6,88.9L236.5,90.2L238.1,91.0ZM325.4,155.6L326.3,155.4L329.9,156.0L332.7,157.0L332.8,157.4L331.4,157.5L327.9,156.7ZM326.7,162.3L327.7,163.5L329.7,163.8L332.2,163.7L330.9,164.7L329.9,164.8L326.4,163.8L325.7,163.1Z',
'Central African Rep.':'M575.6,238.6L574.7,238.8L573.0,238.8L570.9,238.6L569.9,238.7L569.5,239.1L568.6,239.2L567.5,238.8L564.5,239.6L563.3,239.5L562.9,239.6L562.1,240.6L560.1,240.2L558.1,240.1L556.3,239.5L554.1,239.0L552.6,239.5L551.6,240.3L551.3,241.4L549.6,241.3L547.7,241.0L546.1,241.9L544.7,243.3L544.4,242.9L544.3,242.2L543.0,241.7L542.0,240.8L541.8,240.3L540.5,239.4L540.7,239.0L540.4,238.3L540.7,237.1L541.3,236.8L542.7,235.2L544.9,235.0L545.4,234.6L545.9,234.7L546.6,235.0L550.0,234.4L551.2,233.8L552.6,233.2L552.3,232.7L553.1,232.5L555.7,232.6L558.3,231.9L560.2,230.1L561.6,229.5L563.3,229.2L563.6,229.9L565.2,230.9L565.2,231.5L564.8,232.2L565.0,232.7L565.9,233.2L568.0,233.9L569.5,234.5L569.5,235.0L571.3,235.9L572.5,236.6L573.1,237.5L575.2,238.1Z',
'Chad':'M566.0,215.3L566.1,221.9L563.8,221.8L562.5,223.0L561.8,224.0L562.4,224.4L561.5,224.9L561.8,225.6L561.1,226.3L560.8,226.8L561.8,226.8L562.3,227.4L562.4,228.3L563.4,228.8L563.3,229.2L561.6,229.5L560.2,230.1L558.3,231.9L555.7,232.6L553.1,232.5L552.3,232.7L552.6,233.2L551.2,233.8L550.0,234.4L546.6,235.0L545.9,234.7L545.4,234.6L544.9,235.0L542.7,235.2L543.1,234.7L542.3,233.6L541.9,233.0L540.7,232.7L539.1,231.7L539.7,231.0L540.9,231.2L541.7,231.0L543.2,231.1L541.7,229.6L541.8,228.5L541.6,227.4L540.5,226.4L540.8,225.6L539.1,225.6L539.1,224.6L537.9,224.0L539.1,221.8L542.6,220.2L542.7,218.1L543.8,214.7L544.4,214.0L543.2,213.4L543.2,212.8L542.2,212.4L541.5,209.7L544.3,208.8L555.1,212.1Z',
'Chile':'M314.2,345.3L314.2,351.3L317.1,351.3L318.7,351.3L317.8,352.5L315.5,353.3L314.1,353.2L312.5,353.0L310.6,352.2L307.7,351.8L304.3,350.2L301.5,348.8L297.7,345.8L300.0,346.4L303.8,348.1L307.4,349.1L308.8,347.9L309.7,346.1L312.2,345.0ZM311.6,275.2L312.9,276.3L313.3,277.6L314.7,278.3L313.8,279.9L315.3,281.8L316.4,284.2L318.3,283.9L318.7,284.3L317.7,286.1L314.8,287.0L314.8,289.9L314.3,290.5L315.1,291.2L313.2,292.3L311.4,294.0L310.4,295.6L310.7,297.4L309.0,299.3L310.2,302.5L310.9,302.9L310.9,304.6L309.4,306.5L309.5,308.1L307.4,309.4L307.4,311.2L308.2,313.2L306.6,313.9L305.9,315.7L305.2,317.9L305.7,320.4L304.6,320.9L305.2,323.4L306.5,324.2L305.6,325.1L306.8,325.6L307.1,326.4L305.9,326.8L306.2,328.1L305.2,331.2L303.8,333.2L304.1,334.4L303.2,335.9L301.1,336.9L301.4,339.6L302.3,340.5L304.2,340.3L304.1,342.2L305.2,343.7L311.8,344.0L314.3,344.4L311.9,344.4L310.6,345.0L308.1,346.0L307.7,348.5L306.6,348.5L303.5,347.7L300.4,345.8L297.0,344.3L296.1,342.7L296.9,341.2L295.5,339.5L295.2,335.4L296.3,333.1L299.2,331.3L295.1,330.6L297.7,328.6L298.6,324.9L301.6,325.7L303.0,321.2L301.2,320.6L300.4,323.3L298.6,323.0L299.5,319.9L300.4,316.0L301.7,314.6L300.9,312.6L300.7,310.4L301.8,310.3L303.5,307.1L305.4,304.1L306.5,301.2L305.9,298.5L306.7,296.9L306.4,294.7L308.0,292.5L308.5,289.1L309.3,285.5L310.2,281.6L310.0,278.9L309.4,276.5L310.8,276.1Z',
'China':'M799.2,217.6L797.0,217.1L796.9,215.7L798.2,214.9L801.2,214.4L802.8,214.5L803.4,215.1L802.2,215.9L801.6,216.8ZM719.6,172.8L719.4,171.6L721.3,171.0L718.8,167.2L724.2,166.3L725.6,165.8L727.6,161.7L733.0,162.4L734.5,161.4L734.6,159.0L736.9,158.8L739.0,157.2L740.0,157.0L740.8,158.7L743.0,159.9L746.9,160.8L748.8,162.7L747.8,165.4L748.7,166.4L752.0,166.7L755.6,167.0L758.9,168.4L760.6,168.7L761.9,170.7L763.5,172.0L766.5,171.9L772.1,172.4L775.7,172.1L778.4,172.4L782.4,173.7L785.7,173.7L786.9,174.4L790.1,173.3L794.5,172.5L798.6,172.4L801.8,171.7L803.7,170.5L805.6,169.8L805.2,169.1L804.3,168.2L805.7,166.8L807.3,167.0L810.1,167.4L812.8,166.2L816.9,165.4L818.9,163.8L820.8,163.2L824.8,162.9L826.9,163.1L827.2,162.3L824.8,160.7L822.6,159.9L820.5,160.8L817.8,160.4L816.3,160.7L815.6,159.8L817.5,157.4L818.8,155.5L822.1,156.5L825.9,154.9L825.9,153.8L828.4,151.1L829.9,150.3L829.8,148.9L828.3,148.3L830.6,147.0L834.0,146.5L837.6,146.4L841.7,147.2L844.1,148.2L845.7,150.8L846.8,151.9L847.7,153.4L848.7,155.9L853.5,156.6L856.7,158.4L857.8,160.6L861.9,160.6L864.3,159.7L868.8,159.0L867.4,161.1L866.3,161.9L865.4,164.5L863.5,166.7L860.2,166.3L857.9,167.1L858.6,169.0L858.2,171.5L856.8,171.6L856.8,172.7L855.1,171.4L854.0,172.6L849.8,173.6L850.2,174.7L847.9,174.6L846.6,173.9L844.7,175.4L841.7,176.6L839.5,177.9L835.7,178.5L833.7,179.4L830.7,180.0L832.2,179.1L831.6,178.3L833.8,176.9L832.3,175.8L830.0,176.5L826.9,177.9L825.2,179.3L822.5,179.4L821.1,180.3L822.6,181.7L824.8,182.0L824.9,182.9L827.1,183.5L830.1,182.1L832.5,182.9L834.3,182.9L834.7,183.9L830.9,184.5L829.6,185.6L826.9,186.5L825.5,187.9L828.5,189.0L829.6,190.8L831.2,192.6L833.1,194.0L833.0,195.4L831.3,195.9L832.0,196.9L833.6,197.4L833.1,198.9L832.4,200.3L830.9,200.5L828.9,202.4L826.7,204.7L824.2,206.8L820.5,208.4L816.7,209.9L813.6,210.1L811.9,210.8L811.0,210.3L809.5,211.1L805.6,212.0L802.8,212.2L801.8,214.0L800.3,214.1L799.6,212.9L800.3,212.3L796.6,211.7L795.3,212.0L792.6,211.5L791.3,210.8L791.7,209.9L789.2,209.5L787.9,208.9L785.6,209.8L782.9,210.0L780.8,210.0L779.3,210.4L777.9,210.7L778.3,212.6L776.9,212.6L776.6,212.2L776.5,211.5L774.5,212.0L773.4,211.7L771.3,211.0L772.1,209.6L770.4,209.3L769.7,207.7L766.9,208.0L767.2,205.9L769.8,204.4L769.9,203.0L769.8,201.6L768.6,201.2L767.7,200.1L766.1,200.3L763.2,200.0L764.1,199.2L762.8,198.1L760.9,198.9L758.6,198.4L755.5,199.6L753.0,200.9L750.8,201.1L749.6,200.7L748.2,200.6L746.2,200.2L744.7,200.7L742.9,202.0L742.7,200.6L741.0,201.0L737.9,200.8L734.8,200.4L732.6,199.6L730.5,199.2L729.5,198.4L728.0,198.1L725.3,196.9L723.1,196.3L722.0,196.8L718.2,195.5L715.5,194.3L714.7,192.3L716.7,192.5L716.8,191.6L715.7,190.6L716.0,189.0L713.0,186.8L708.6,186.0L707.8,184.5L705.7,183.5L705.3,183.0L704.9,181.8L704.9,181.0L703.3,180.6L702.4,180.8L701.7,178.9L702.5,178.4L702.1,178.0L704.7,177.0L706.6,176.6L709.5,176.9L710.5,175.5L714.0,175.3L715.0,174.4L719.3,173.3Z',
'Colombia':'M319.0,245.0L318.4,245.1L317.9,244.2L317.2,243.7L316.2,244.3L310.9,244.2L311.0,245.2L312.6,245.4L312.5,246.0L311.9,245.8L310.4,246.1L310.4,247.2L311.6,247.8L312.0,248.7L312.0,249.4L310.7,253.7L309.4,252.9L308.6,252.9L310.3,251.3L308.2,250.5L306.6,250.6L305.6,250.4L304.1,250.8L302.1,250.6L300.5,248.9L299.2,248.5L298.3,247.8L296.5,247.0L295.8,247.2L294.6,246.8L293.3,246.3L292.5,246.5L290.2,246.3L289.6,245.6L289.1,245.7L286.3,244.8L286.0,244.3L287.0,244.1L286.9,243.3L287.5,242.8L288.8,242.7L290.0,241.7L291.0,240.8L290.0,240.5L290.5,239.5L289.9,238.1L290.5,237.7L290.1,236.3L289.0,235.5L289.3,234.7L290.2,234.8L290.7,234.3L290.1,233.4L290.4,233.2L291.8,233.2L293.9,232.1L295.0,231.9L295.0,231.4L295.5,230.0L297.1,229.3L298.8,229.3L299.0,228.9L301.1,229.0L303.3,228.2L304.4,227.9L305.7,227.1L306.6,227.2L307.3,227.6L306.8,228.2L305.1,228.4L304.4,229.2L303.3,229.7L302.5,230.3L302.2,231.4L301.4,232.4L302.9,232.5L303.2,233.2L303.8,233.6L304.0,234.2L303.7,234.8L303.8,235.2L304.5,235.3L305.1,235.8L308.6,235.7L310.2,235.9L312.1,237.3L313.2,237.1L315.2,237.2L316.7,237.0L317.7,237.3L317.2,238.1L316.6,238.7L316.4,239.8L316.9,240.9L317.7,241.3L317.8,241.7L316.4,242.5L317.4,242.8L318.1,243.4Z',
'Congo':'M551.3,241.4L551.2,242.3L550.3,243.2L549.8,244.2L549.5,245.6L549.6,246.5L549.2,247.0L549.1,247.6L548.8,248.1L547.0,248.9L545.8,249.7L544.6,251.2L544.7,252.5L544.0,253.0L542.4,253.8L540.8,254.8L539.8,254.5L539.6,254.1L538.1,254.1L537.2,254.7L536.5,254.5L535.4,254.0L534.6,254.2L533.5,254.9L531.3,253.2L533.4,252.4L532.3,251.3L533.3,250.9L535.1,250.7L535.3,250.0L536.8,250.8L539.2,250.9L540.0,250.1L540.4,249.0L540.1,247.8L538.8,246.9L539.9,245.0L539.3,244.7L537.2,244.9L536.5,244.0L536.7,243.3L540.1,243.4L542.3,243.8L544.5,244.2L544.7,243.3L546.1,241.9L547.7,241.0L549.6,241.3Z',
'Costa Rica':'M276.3,231.7L275.2,231.9L275.2,232.5L275.8,232.8L275.4,232.9L275.5,233.2L275.3,233.6L275.1,233.9L273.7,233.5L273.1,233.2L273.4,232.9L273.3,232.5L272.6,232.2L271.5,231.8L270.6,231.6L270.4,231.2L269.7,230.9L269.8,231.4L269.3,231.7L268.7,231.3L267.8,231.1L267.4,230.8L267.4,230.3L267.8,229.8L267.0,229.6L267.7,229.3L268.1,229.1L269.9,229.5L270.5,229.3L271.4,229.4L271.8,229.7L272.6,229.9L273.3,229.5L273.9,230.4L275.0,231.0Z',
'Croatia':'M546.2,163.6L547.0,163.9L549.1,164.8L551.3,165.3L552.4,164.9L553.0,165.8L553.9,166.5L552.8,167.3L551.6,166.8L549.7,166.8L547.4,166.5L546.1,166.5L545.5,167.0L544.5,166.5L544.0,167.4L545.3,168.4L545.9,169.1L547.1,169.9L548.2,170.4L549.2,171.3L551.6,172.1L551.3,172.5L548.8,171.7L547.2,170.9L544.7,170.3L542.4,168.7L542.9,168.5L541.7,167.6L541.7,166.8L539.9,166.5L539.1,167.4L538.3,166.7L538.3,165.9L538.4,165.9L540.3,165.9L540.8,165.6L541.7,165.9L542.8,166.0L542.8,165.3L543.7,165.1L544.0,164.2Z',
'Cuba':'M277.0,209.2L279.4,209.3L281.5,209.3L284.1,209.9L285.2,210.5L287.7,210.3L288.7,210.7L291.0,211.8L292.7,212.6L293.6,212.5L295.2,212.9L295.0,213.4L297.0,213.4L299.1,214.1L298.7,214.5L296.9,214.7L295.1,214.8L293.2,214.7L289.3,214.9L291.2,213.9L290.0,213.5L288.3,213.4L287.3,212.9L286.7,211.9L285.2,212.0L282.6,211.5L281.8,211.2L278.3,210.9L277.3,210.6L278.3,210.1L275.7,210.0L273.7,210.9L272.6,211.0L272.2,211.4L270.8,211.6L269.7,211.4L271.1,210.9L271.7,210.3L272.9,209.9L274.3,209.5L276.4,209.4Z',
'Cyprus':'M590.2,187.4L590.3,187.5L590.6,187.5L590.7,187.6L590.9,187.5L591.1,187.4L591.5,187.4L591.6,187.4L591.8,187.4L592.0,187.4L592.1,187.4L592.2,187.5L592.2,187.7L592.4,187.6L592.6,187.7L592.8,187.7L592.9,187.6L593.0,187.6L593.1,187.6L593.2,187.6L593.3,187.5L593.4,187.6L593.6,187.6L593.7,187.6L593.8,187.7L593.5,187.8L593.2,187.8L593.0,187.8L592.8,187.8L592.3,188.1L592.1,188.2L591.7,188.3L591.4,188.3L591.3,188.3L591.1,188.3L591.0,188.4L591.0,188.5L591.0,188.6L590.8,188.5L590.7,188.4L590.6,188.4L590.3,188.4L590.1,188.4L589.6,188.3L589.4,188.2L589.3,188.2L589.1,187.8L589.0,187.6L589.3,187.6L589.5,187.5L589.7,187.4L590.0,187.4Z',
'Czech Republic':'M542.0,152.5L543.3,153.3L545.3,153.5L545.1,154.2L546.6,154.7L547.0,154.1L548.9,154.4L549.1,155.1L551.2,155.3L552.4,156.5L551.6,156.5L551.2,156.9L550.6,157.0L550.4,157.6L549.9,157.7L549.8,157.9L548.9,158.2L547.6,158.1L547.3,158.7L546.0,158.2L544.7,158.3L542.6,157.6L541.7,157.8L540.1,158.8L538.1,158.0L536.6,157.0L535.2,156.4L534.9,155.3L534.4,154.6L536.4,154.1L537.4,153.4L539.4,153.0L540.0,152.5L540.8,152.8Z',
'DR Congo':'M581.0,254.1L581.5,255.5L581.2,256.4L581.7,257.3L583.3,258.2L584.8,260.2L583.7,260.0L580.1,260.3L579.3,260.5L578.5,261.5L579.2,262.2L578.7,264.1L578.3,265.7L579.1,266.0L581.0,266.7L581.7,266.4L582.0,268.1L579.9,268.1L578.7,267.2L577.7,266.5L575.7,266.3L575.0,265.4L573.4,266.0L571.2,265.7L570.3,265.0L568.6,264.8L567.3,264.9L567.1,264.4L566.2,264.3L565.0,264.2L563.3,264.5L562.1,264.4L561.4,264.6L561.6,262.7L560.6,262.1L560.4,261.1L560.8,260.1L560.3,259.5L560.2,258.5L556.9,258.5L557.2,258.0L555.8,258.0L555.6,258.2L554.0,258.3L553.3,259.2L552.9,259.6L551.4,259.4L550.5,259.6L548.7,259.8L547.6,258.9L547.0,258.4L546.2,257.4L545.5,256.3L537.5,256.2L536.5,256.4L535.8,256.4L534.6,256.6L534.2,256.1L534.9,256.0L535.0,255.3L535.5,254.9L536.5,254.5L537.2,254.7L538.1,254.1L539.6,254.1L539.8,254.5L540.8,254.8L542.4,253.8L544.0,253.0L544.7,252.5L544.6,251.2L545.8,249.7L547.0,248.9L548.8,248.1L549.1,247.6L549.2,247.0L549.6,246.5L549.5,245.6L549.8,244.2L550.3,243.2L551.2,242.3L551.3,241.4L551.6,240.3L552.6,239.5L554.1,239.0L556.3,239.5L558.1,240.1L560.1,240.2L562.1,240.6L562.9,239.6L563.3,239.5L564.5,239.6L567.5,238.8L568.6,239.2L569.5,239.1L569.9,238.7L570.9,238.6L573.0,238.8L574.7,238.8L575.6,238.6L577.3,240.0L578.5,240.1L579.2,239.9L580.5,240.0L582.0,239.6L582.6,240.3L585.0,241.4L584.9,243.2L586.0,243.4L585.1,244.0L584.0,244.4L583.0,245.3L582.4,246.0L582.3,247.3L581.6,247.9L581.6,249.1L580.8,249.5L580.7,250.4L580.4,250.6L580.1,251.4L580.8,252.2Z',
'Denmark':'M528.1,142.3L526.3,142.7L524.3,142.3L523.2,140.8L523.1,137.9L523.6,137.1L524.3,136.3L526.7,136.1L527.7,135.3L529.9,134.4L529.8,135.9L529.0,136.9L529.3,137.7L530.8,138.1L530.1,139.2L529.3,138.9L527.4,140.9ZM534.8,139.1L535.6,140.5L534.0,142.8L531.1,141.2L530.8,140.1Z',
'Djibouti':'M616.4,226.9L617.6,227.1L618.4,226.7L619.0,227.2L619.0,227.8L617.4,228.2L618.6,228.7L617.6,229.5L617.0,229.2L616.3,229.4L614.8,229.3L614.7,228.8L614.5,228.4L615.4,227.6Z',
'Dominican Rep.':'M305.8,217.9L305.8,217.4L305.1,216.9L305.8,216.7L306.0,216.0L305.8,215.1L306.1,214.8L308.2,214.8L309.9,215.2L310.6,215.2L311.1,215.8L312.6,215.8L312.5,216.3L313.7,216.3L315.0,216.9L314.0,217.6L312.7,217.3L311.5,217.3L310.6,217.2L310.1,217.6L309.0,217.7L308.6,217.2L307.7,217.5L306.6,218.6L305.9,218.4Z',
'East Timor':'M841.4,261.1L841.7,260.7L844.1,260.3L846.0,260.3L846.8,260.1L847.8,260.3L846.8,260.7L844.0,261.4L841.7,261.9L841.7,261.4Z',
'Ecuador':'M295.8,247.2L296.2,248.4L295.3,249.4L292.4,251.1L289.1,251.7L287.4,253.1L286.9,254.1L285.4,254.8L284.2,254.0L283.1,253.8L282.0,254.0L281.9,253.4L282.7,253.0L282.4,252.3L283.8,251.1L283.2,250.5L282.2,251.2L280.6,250.5L281.1,250.0L280.7,248.6L281.6,248.4L282.1,247.4L283.2,246.4L283.0,245.7L284.5,245.4L286.3,244.8L289.1,245.7L289.6,245.6L290.2,246.3L292.5,246.5L293.3,246.3L294.6,246.8Z',
'Egypt':'M601.5,211.2L590.7,211.2L580.1,211.2L569.2,211.2L569.2,204.8L569.2,198.5L568.3,197.0L569.0,195.9L568.6,195.1L569.6,194.2L573.2,194.2L575.8,194.7L578.5,195.2L579.8,195.5L581.9,194.9L583.0,194.4L585.4,194.2L587.4,194.5L588.1,195.4L588.7,194.8L590.9,195.2L593.0,195.3L594.4,194.9L595.9,197.5L596.2,198.0L595.4,198.8L594.8,200.1L594.1,201.0L593.4,201.4L592.5,200.8L591.3,200.0L589.4,197.4L589.1,197.6L590.2,199.5L591.9,201.3L593.9,204.0L595.0,205.0L595.8,206.0L598.3,207.9L597.7,208.2L597.8,209.3L601.0,210.9Z',
'El Salvador':'M257.7,223.9L258.5,224.0L259.1,224.3L260.0,224.6L260.1,224.8L261.2,224.6L261.8,224.7L262.2,224.9L262.0,225.6L261.7,225.9L260.1,225.9L259.1,225.8L258.0,225.4L256.5,225.3L255.7,225.0L255.8,224.7L256.7,224.3L257.2,224.2L257.1,224.0Z',
'Equatorial Guinea':'M527.3,243.3L531.8,243.4L531.8,245.3L527.8,245.2L526.9,245.3L526.4,245.1Z',
'Eritrea':'M600.3,223.9L600.0,223.2L601.2,220.8L601.4,219.7L602.3,219.2L604.3,218.9L605.7,218.0L607.3,219.9L608.0,221.4L609.5,222.2L613.2,223.7L614.7,224.7L616.2,225.6L617.1,226.2L618.4,226.7L617.6,227.1L616.4,226.9L615.5,226.4L614.4,225.4L613.1,224.9L612.4,224.4L610.1,223.7L608.2,223.7L607.5,223.3L606.0,223.7L604.3,223.0L603.4,224.2Z',
'Estonia':'M577.3,129.1L577.7,129.7L575.7,131.4L576.6,134.3L575.4,135.2L573.1,135.2L570.8,134.1L569.6,133.7L567.3,134.2L567.6,132.5L566.6,132.9L564.9,131.8L564.6,130.0L568.1,129.2L571.5,128.7L574.5,129.2L577.3,129.1Z',
'Eswatini':'M588.4,290.9L587.9,291.7L586.3,291.9L584.6,290.9L584.6,290.3L585.4,289.6L585.6,289.1L586.4,289.0L587.8,289.3L588.2,290.1Z',
'Ethiopia':'M631.2,234.2L623.5,239.0L620.0,239.1L617.5,240.2L615.8,240.2L615.1,240.7L613.2,240.7L612.1,240.2L609.6,240.9L608.8,241.5L607.0,241.4L606.4,241.2L605.7,241.3L604.9,241.2L601.4,239.9L599.5,239.9L598.6,239.4L598.6,238.5L597.2,238.2L595.6,236.5L594.3,236.1L593.9,235.5L592.5,234.7L590.8,234.6L591.7,233.7L593.2,233.6L593.6,233.1L593.6,231.7L594.4,230.0L595.7,229.6L595.9,228.9L597.1,227.7L598.7,226.9L599.8,225.3L600.3,223.9L603.4,224.2L604.3,223.0L606.0,223.7L607.5,223.3L608.2,223.7L610.1,223.7L612.4,224.4L613.1,224.9L614.4,225.4L615.5,226.4L616.4,226.9L615.4,227.6L614.5,228.4L614.7,228.8L614.8,229.3L616.3,229.4L617.0,229.2L617.6,229.5L617.0,230.1L618.0,231.0L619.0,231.8L620.0,232.3L628.9,234.2Z',
'Finland':'M578.9,93.8L578.5,96.8L582.7,99.6L580.2,102.7L583.4,107.2L581.5,110.5L584.0,113.2L582.9,115.6L586.9,118.0L585.9,119.7L583.3,121.7L577.5,125.9L572.6,126.1L567.8,127.3L563.4,128.0L561.8,126.2L559.1,125.2L559.7,121.9L558.4,118.9L559.7,116.9L562.2,114.6L568.4,110.7L570.2,109.9L570.0,108.3L566.2,106.4L565.2,104.9L565.2,98.6L560.9,95.7L557.3,93.6L558.9,92.4L562.0,94.7L565.5,94.5L568.4,95.6L571.0,93.6L572.4,90.3L576.6,88.8L580.1,90.6Z',
'France':'M360.4,240.4L358.8,241.8L357.9,243.0L356.9,243.6L355.6,243.7L355.2,243.2L354.6,243.2L353.8,243.6L352.6,243.3L353.3,242.6L353.5,241.9L354.0,241.2L352.9,240.3L352.7,239.2L354.1,237.8L355.1,238.0L357.1,238.4L359.9,239.7ZM517.9,156.6L519.2,157.2L523.1,157.7L521.8,159.3L521.4,161.0L520.7,161.4L519.4,161.2L519.5,161.8L517.5,163.1L517.5,164.1L518.8,163.8L519.7,164.8L519.6,165.4L520.4,166.2L519.5,166.9L520.2,168.6L521.6,168.9L521.3,169.9L518.9,171.1L513.5,170.5L509.5,171.2L509.2,172.5L506.0,172.8L503.0,171.8L502.0,172.3L497.0,171.3L495.9,170.5L497.3,169.2L497.8,164.7L495.0,162.3L493.0,161.1L488.8,160.2L488.6,158.5L492.1,157.9L496.7,158.6L495.8,155.8L498.4,156.9L504.7,154.9L505.5,152.9L507.9,152.4L508.3,153.3L509.6,153.3L510.8,154.3L512.7,155.5L514.1,155.3L516.5,156.4L517.1,156.6ZM524.9,172.2L526.6,171.4L527.1,173.2L526.2,174.9L525.0,174.4L524.3,173.0Z',
'Gabon':'M531.8,243.4L533.1,243.3L534.7,243.5L536.3,243.3L536.7,243.3L536.5,244.0L537.2,244.9L539.3,244.7L539.9,245.0L538.8,246.9L540.1,247.8L540.4,249.0L540.0,250.1L539.2,250.9L536.8,250.8L535.3,250.0L535.1,250.7L533.3,250.9L532.3,251.3L533.4,252.4L531.3,253.2L528.5,251.6L526.7,250.3L525.0,248.7L525.1,248.2L525.7,247.7L526.4,246.5L526.9,245.3L527.8,245.2L531.8,245.3Z',
'Gambia':'M455.6,225.2L458.5,225.2L459.1,224.8L460.0,224.8L461.1,225.2L461.9,225.2L462.8,224.9L463.4,225.4L462.2,225.7L461.0,225.7L459.8,225.4L458.8,225.7L458.3,225.7L457.7,226.0L455.2,225.9Z',
'Georgia':'M609.9,170.4L610.2,170.2L612.5,170.6L616.5,170.9L620.2,172.0L620.7,172.4L622.4,172.0L624.9,172.5L625.7,173.3L627.4,173.8L626.7,174.1L628.1,175.3L627.7,175.5L626.2,175.4L624.2,174.8L623.5,175.1L619.8,175.5L617.1,174.4L614.2,174.5L614.6,173.6L614.0,172.2L612.4,171.4L610.9,171.1Z',
'Germany':'M539.5,145.6L540.2,147.0L539.4,147.7L540.4,148.6L541.1,150.0L540.9,150.9L542.0,152.5L540.8,152.8L540.0,152.5L539.4,153.0L537.4,153.4L536.4,154.1L534.4,154.6L534.9,155.3L535.2,156.4L536.6,157.0L538.1,158.0L537.1,159.1L536.2,159.4L536.5,160.9L536.3,161.3L535.4,160.9L534.1,160.8L532.2,161.2L529.8,161.1L529.4,161.7L528.0,161.1L527.2,161.2L524.3,160.5L523.7,161.0L521.4,161.0L521.8,159.3L523.1,157.7L519.2,157.2L517.9,156.6L518.1,155.5L517.5,154.9L517.8,153.3L517.4,150.6L519.0,150.6L519.7,149.6L520.4,147.3L519.9,146.4L520.4,145.8L522.7,145.6L523.2,146.2L525.0,144.9L524.4,143.9L524.3,142.3L526.3,142.7L528.1,142.3L528.1,143.3L530.9,144.0L530.9,144.9L533.6,144.4L535.2,143.7L538.2,144.8Z',
'Ghana':'M501.1,229.4L500.9,229.9L502.1,230.7L502.1,231.9L502.3,233.1L503.0,233.7L502.4,235.2L502.6,236.0L503.4,237.0L504.0,237.5L499.7,238.5L498.2,239.0L495.7,239.5L493.3,239.0L493.4,238.4L492.2,237.0L492.9,235.2L494.1,233.9L493.4,231.6L493.0,230.4L493.1,229.5L497.8,229.4L499.0,229.5L499.9,229.3Z',
'Greece':'M572.7,187.1L572.3,187.7L568.4,187.9L568.4,187.6L565.1,187.2L565.6,186.4L567.1,187.0L569.2,186.9L571.2,187.0L571.2,187.4ZM563.6,174.9L565.6,175.0L567.8,174.4L569.7,175.2L572.2,175.0L572.2,173.9L573.5,174.5L572.7,175.8L572.0,176.0L570.4,176.0L569.0,175.8L565.7,176.3L567.5,177.5L566.2,177.8L564.6,177.8L563.2,176.8L562.7,177.2L563.3,178.4L564.7,179.4L563.6,179.8L565.2,180.8L566.5,181.4L566.5,182.5L564.0,182.0L564.8,183.0L563.1,183.2L564.1,184.9L562.3,185.0L560.1,184.1L559.1,182.5L558.6,181.2L557.5,180.3L556.1,179.1L555.9,178.5L557.2,177.5L557.4,176.8L558.3,176.5L558.3,176.0L560.1,175.8L561.1,175.3L562.6,175.4L563.1,175.0Z',
'Guatemala':'M249.9,223.7L250.0,223.2L250.3,222.8L249.9,222.5L251.2,221.2L254.7,221.2L254.8,220.6L254.3,220.5L254.0,220.1L253.0,219.8L252.0,219.2L253.3,219.2L253.3,218.3L255.8,218.3L258.3,218.3L258.3,219.6L258.1,221.5L258.9,221.5L259.8,221.8L260.0,221.5L260.8,221.7L259.6,222.3L258.3,222.8L258.1,223.1L258.3,223.4L257.7,223.9L257.1,224.0L257.2,224.2L256.7,224.3L255.8,224.7L255.7,225.0L254.3,224.7L252.6,224.7L251.4,224.3Z',
'Guinea':'M463.8,226.9L465.1,226.9L467.0,227.3L467.6,227.2L467.8,227.0L469.3,227.2L469.7,227.1L469.9,227.7L470.3,227.7L471.0,227.5L471.5,227.5L472.2,227.9L473.4,228.1L474.1,227.7L475.0,227.5L475.7,227.3L476.2,227.3L476.8,227.7L477.1,228.1L478.3,228.8L477.7,229.2L477.6,229.7L478.2,229.6L478.5,229.8L478.4,230.2L479.2,230.7L478.7,230.8L478.4,231.4L479.1,232.0L479.7,233.3L478.7,233.5L478.5,233.7L478.7,234.0L478.5,234.7L478.1,234.7L477.3,234.7L476.8,235.3L476.0,235.3L475.5,235.0L475.6,234.3L474.5,233.4L473.8,233.5L473.2,233.6L472.5,233.7L472.5,233.1L472.1,232.7L472.1,232.2L471.6,231.5L470.8,231.0L468.6,231.0L468.0,231.3L467.2,231.3L466.8,231.6L466.5,232.1L465.0,232.8L463.8,231.8L462.7,231.2L462.0,231.0L461.4,230.7L461.1,230.0L460.7,229.6L459.9,229.4L461.1,228.6L461.9,228.6L462.6,228.3L463.2,228.3L463.6,228.1L463.4,227.6L463.7,227.4Z',
'Guinea-Bissau':'M455.7,227.2L457.1,226.9L458.0,227.0L458.7,226.8L463.8,226.9L463.7,227.4L463.4,227.6L463.6,228.1L463.2,228.3L462.6,228.3L461.9,228.6L461.1,228.6L459.9,229.4L458.4,228.7L457.3,228.6L456.6,228.1L456.7,227.9L455.8,227.5Z',
'Guyana':'M347.1,243.9L346.4,244.0L344.9,243.9L344.0,244.3L342.8,244.6L342.0,244.6L341.7,244.9L340.3,244.9L338.6,244.1L338.4,243.4L337.7,242.6L338.2,241.2L338.9,240.7L338.3,239.9L337.4,239.7L337.7,239.0L337.1,238.6L335.7,238.7L333.8,237.5L334.6,237.0L334.5,236.3L336.2,236.1L336.9,235.8L335.9,235.2L336.2,234.6L338.3,233.6L340.1,234.2L341.8,235.3L341.9,236.1L342.9,236.1L344.4,236.9L345.4,237.5L345.0,238.9L343.4,239.3L343.5,239.7L343.0,240.5L344.2,241.7L345.1,241.7L345.4,242.6Z',
'Haiti':'M305.8,215.1L306.0,216.0L305.8,216.7L305.1,216.9L305.8,217.4L305.8,217.9L304.0,217.6L302.7,217.7L301.0,217.6L299.8,217.9L298.3,217.4L298.5,216.9L301.1,217.1L303.1,217.2L304.1,216.8L302.8,216.1L302.9,215.5L301.1,215.2L301.8,214.8L303.4,214.8Z',
'Honduras':'M274.6,222.9L273.7,222.9L273.3,223.1L272.4,223.3L271.7,223.3L271.1,223.5L270.6,223.5L270.1,223.2L269.8,223.3L269.5,223.6L269.2,223.6L269.1,224.0L268.2,224.4L267.7,224.6L267.4,224.8L266.6,224.5L266.0,224.9L265.5,224.9L264.8,225.0L264.9,225.8L264.5,225.8L264.1,226.1L263.3,226.2L262.8,225.7L262.0,225.6L262.2,224.9L261.8,224.7L261.2,224.6L260.1,224.8L260.0,224.6L259.1,224.3L258.5,224.0L257.7,223.9L258.3,223.4L258.1,223.1L258.3,222.8L259.6,222.3L260.8,221.7L261.1,221.8L261.7,221.5L262.5,221.5L262.7,221.6L263.1,221.5L264.4,221.7L265.7,221.6L266.5,221.4L266.9,221.3L267.7,221.3L268.4,221.5L269.1,221.4L269.6,221.3L270.9,221.5L271.3,221.5L272.1,221.9L272.9,222.2L273.9,222.5Z',
'Hungary':'M561.2,159.1L562.7,159.7L562.9,160.4L561.3,160.9L560.0,162.4L558.3,164.0L556.1,164.4L554.4,164.3L552.4,164.9L551.3,165.3L549.1,164.8L547.0,163.9L546.2,163.6L545.7,162.8L545.2,162.8L546.1,161.3L545.6,160.8L547.1,160.8L547.3,159.8L548.7,160.4L549.7,160.7L552.0,160.4L552.2,159.9L553.3,159.8L554.6,159.5L554.9,159.6L556.2,159.3L556.8,158.8L557.7,158.6L560.6,159.3Z',
'Iceland':'M461.6,104.7L460.9,107.2L464.0,109.8L460.5,112.6L452.6,115.1L450.3,115.8L446.7,115.3L439.1,114.1L441.8,112.5L435.8,110.7L440.7,110.0L440.5,108.9L434.8,108.0L436.7,105.4L440.8,104.9L445.0,107.5L449.2,105.4L452.6,106.5L457.0,104.4Z',
'India':'M766.1,200.3L766.3,200.9L765.4,201.3L765.6,202.4L763.6,202.0L760.1,203.3L760.2,204.3L758.7,205.8L758.6,206.6L757.3,208.0L755.2,207.6L755.1,209.4L754.5,210.0L754.8,210.7L753.4,211.2L752.0,208.4L751.3,208.4L750.8,209.5L749.3,208.6L750.2,207.7L751.4,207.6L752.6,206.1L751.1,205.8L748.5,205.8L745.9,205.6L745.7,204.3L744.4,204.3L742.3,203.5L741.3,204.7L743.3,205.6L741.6,206.3L740.9,206.9L742.6,207.4L742.2,208.4L743.1,209.7L743.5,211.1L743.1,211.7L741.3,211.7L737.9,212.1L738.1,213.4L736.6,214.4L732.7,215.5L729.7,217.5L727.6,218.5L724.9,219.6L724.9,220.4L723.5,220.8L721.1,221.4L719.8,221.4L719.0,222.7L719.6,224.8L719.7,226.2L718.6,227.7L718.5,230.5L717.1,230.5L715.9,231.8L716.7,232.3L714.2,232.7L713.3,233.8L712.2,234.3L709.7,232.8L708.4,230.5L707.3,228.9L706.4,228.2L704.9,226.6L704.3,224.6L703.8,223.5L701.3,221.3L700.2,218.1L699.4,215.9L699.4,213.9L698.9,212.3L694.9,213.3L693.0,213.1L689.4,211.1L690.7,210.4L689.9,209.8L686.7,208.3L688.5,207.2L694.5,207.2L694.0,205.7L692.5,204.8L692.2,203.4L690.4,202.6L693.4,200.8L696.5,200.9L699.4,199.0L701.1,197.2L703.7,195.3L703.7,194.0L706.0,192.9L703.8,192.0L702.9,190.7L701.9,189.0L703.2,188.2L707.4,188.7L710.4,188.4L713.0,186.8L716.0,189.0L715.7,190.6L716.8,191.6L716.7,192.5L714.7,192.3L715.5,194.3L718.2,195.5L722.0,196.8L720.2,197.6L719.2,199.3L721.8,200.0L724.4,200.9L727.9,201.9L731.7,202.1L733.2,203.0L735.3,203.2L738.6,203.6L740.9,203.6L741.2,202.9L740.8,201.7L741.0,201.0L742.7,200.6L742.9,202.0L743.0,202.3L745.5,203.0L747.2,202.7L749.5,202.9L751.7,202.8L751.9,201.7L750.8,201.1L753.0,200.9L755.5,199.6L758.6,198.4L760.9,198.9L762.8,198.1L764.1,199.2L763.2,200.0Z',
'Indonesia':'M885.1,251.1L885.1,256.2L885.1,261.4L882.7,260.1L880.0,259.8L879.3,260.3L875.8,260.3L877.0,259.0L878.7,258.6L878.0,256.8L876.7,255.5L871.4,254.1L869.2,254.0L865.1,252.5L864.3,253.3L863.2,253.5L862.6,252.9L862.6,252.2L860.5,251.4L863.4,250.8L865.4,250.9L865.2,250.4L861.2,250.4L860.1,249.5L857.7,249.2L856.5,248.4L860.2,248.0L861.6,247.5L865.9,248.2L866.4,248.8L867.1,251.3L870.0,252.3L872.2,250.6L875.4,249.6L877.8,249.6L880.1,250.2L882.1,250.8ZM841.4,261.1L841.7,261.4L841.7,261.9L839.9,263.1L837.6,263.4L837.3,263.2L837.5,262.7L838.7,261.7ZM822.1,240.4L820.5,241.8L822.5,243.3L822.1,244.0L825.1,245.5L821.9,245.7L821.0,246.8L821.1,248.2L818.5,249.3L818.4,250.9L817.4,253.3L817.0,252.7L813.9,253.4L812.8,252.5L810.9,252.4L809.5,251.9L806.3,252.4L805.3,251.7L803.5,251.8L801.2,251.6L800.8,249.5L799.5,249.0L798.2,247.7L797.8,246.3L798.1,244.8L799.7,243.8L800.2,244.8L802.0,245.7L803.8,245.4L805.5,245.5L807.1,244.7L808.4,244.6L811.0,245.0L813.2,244.7L814.6,242.5L815.7,241.9L816.6,240.1L819.7,240.1ZM853.4,251.4L856.4,251.8L857.4,253.1L855.1,252.4L852.8,252.3L851.3,252.4L849.4,252.3L850.0,251.4ZM849.5,243.5L849.7,244.4L851.3,244.5L851.5,245.1L851.4,246.5L850.0,246.4L849.6,247.3L850.7,248.2L849.9,248.4L848.8,247.4L848.0,245.3L848.6,244.1ZM835.8,245.6L839.0,245.5L841.7,244.3L842.1,244.7L839.9,246.3L837.9,246.6L835.3,246.3L830.7,246.3L828.4,246.6L828.0,247.8L830.4,249.2L831.9,248.5L837.0,247.9L836.7,248.6L835.5,248.4L834.4,249.3L832.0,250.0L834.5,252.0L834.0,252.5L836.5,254.4L836.5,255.4L835.0,255.9L834.0,255.3L835.3,254.0L832.6,254.6L831.9,254.2L832.3,253.6L830.3,252.6L830.5,251.1L828.7,251.6L828.9,253.4L829.0,255.7L827.3,255.9L826.1,255.5L826.9,254.0L826.5,252.5L825.4,252.5L824.5,251.4L825.6,250.3L826.0,249.1L827.4,246.7L828.0,246.0L830.3,244.9L832.4,245.3ZM831.5,260.5L833.3,260.4L835.8,259.8L835.4,260.7L831.3,261.1L827.7,260.9L827.6,260.4L829.8,260.0ZM823.1,260.2L824.8,260.1L825.5,260.8L822.3,261.1L820.4,261.3L819.0,261.3L819.9,260.4L821.4,260.4L822.1,259.8ZM796.5,257.1L796.9,257.7L802.1,257.9L802.7,257.2L807.7,258.0L808.7,259.0L812.8,259.3L816.2,260.2L813.1,260.8L810.1,260.2L807.6,260.2L804.8,260.1L802.2,259.8L799.1,259.2L797.1,259.1L795.9,259.3L791.0,258.6L790.5,257.9L788.0,257.8L789.9,256.3L793.2,256.4L795.4,257.0ZM785.3,248.7L785.8,249.8L786.7,250.6L788.7,250.8L790.0,251.8L789.3,253.8L789.2,256.2L786.2,256.3L783.9,254.9L780.4,253.6L779.3,252.7L777.2,251.4L775.9,250.2L773.8,248.0L771.4,246.6L770.6,245.3L769.6,244.1L767.1,243.1L765.7,241.7L763.7,240.8L760.8,239.1L760.6,238.2L762.3,238.3L766.5,238.6L769.0,240.2L771.1,241.3L772.6,241.9L775.1,243.6L777.9,243.6L780.2,244.7L781.8,246.0L783.8,246.8L782.8,248.1L784.3,248.6Z',
'Iran':'M633.3,197.2L631.8,196.3L631.8,195.3L630.9,195.3L631.4,194.0L630.0,192.5L626.6,191.5L624.8,189.7L625.4,188.2L626.8,187.5L626.5,186.4L624.8,185.8L623.0,183.5L621.5,181.9L622.0,181.2L621.2,178.9L623.1,178.3L623.5,179.1L624.9,180.0L626.7,180.3L627.7,180.3L630.9,178.7L632.0,178.6L632.8,179.2L631.8,180.2L633.5,181.3L634.2,181.2L635.1,182.6L637.6,183.1L639.5,184.1L643.4,184.4L647.7,183.9L647.9,183.4L650.3,183.0L652.2,181.9L654.1,181.9L655.3,181.6L657.2,181.8L660.2,182.8L662.4,183.0L665.5,184.7L667.5,184.8L667.8,186.5L666.7,188.9L665.9,190.3L667.1,190.5L665.9,191.6L666.8,193.1L667.0,194.3L669.1,194.6L669.3,195.8L666.8,197.4L668.2,198.4L669.3,199.5L671.9,200.3L672.0,201.8L673.3,202.1L673.5,203.0L669.6,203.9L668.5,205.9L663.4,205.4L660.5,205.0L657.4,204.7L656.2,202.6L654.9,202.3L652.8,202.6L650.1,203.4L646.7,202.9L644.0,201.5L641.4,201.0L639.6,199.3L637.5,196.8L636.1,197.1L634.4,196.5Z',
'Iraq':'M607.8,193.1L606.7,190.8L612.7,188.8L613.8,186.5L613.5,185.1L615.0,184.6L616.4,183.4L617.6,183.0L620.7,183.3L621.7,183.8L623.0,183.5L624.8,185.8L626.5,186.4L626.8,187.5L625.4,188.2L624.8,189.7L626.6,191.5L630.0,192.5L631.4,194.0L630.9,195.3L631.8,195.3L631.8,196.3L633.3,197.2L631.7,197.2L629.9,197.0L627.9,198.8L622.8,198.6L615.1,194.9L611.1,193.6Z',
'Ireland':'M484.2,145.3L484.6,147.2L482.6,149.6L477.8,151.1L473.9,150.7L476.1,148.0L474.7,145.3L478.4,143.2L480.5,141.9L481.0,143.4L480.5,144.8L482.1,144.8Z',
'Israel':'M598.3,192.1L597.9,192.7L596.9,192.4L596.3,193.7L597.0,193.9L596.3,194.1L596.2,194.6L597.5,194.4L597.5,195.1L596.2,198.0L595.9,197.5L594.4,194.9L595.2,194.3L595.0,194.2L595.7,193.3L596.3,191.9L596.7,191.4L597.6,191.4L597.9,191.0L598.6,191.0L598.7,191.8L598.3,192.1Z',
'Italy':'M529.5,162.7L531.2,163.0L531.5,162.6L534.2,162.2L534.8,163.0L538.7,163.6L538.4,164.7L539.0,165.7L536.9,165.3L534.6,166.1L534.8,167.2L534.5,167.9L535.4,169.0L537.9,170.1L539.3,171.9L542.3,173.6L544.4,173.6L545.1,174.1L544.3,174.5L546.8,175.3L548.8,175.9L551.1,177.0L551.4,177.4L550.9,178.1L549.4,177.2L547.0,176.8L545.9,178.2L547.8,178.9L547.5,180.0L546.4,180.1L544.9,181.8L543.8,182.0L543.8,181.4L544.3,180.3L544.9,179.9L543.9,178.7L543.0,177.6L541.9,177.4L541.1,176.5L539.4,176.1L538.2,175.3L536.2,175.1L534.0,174.2L531.6,172.8L529.7,171.5L528.8,169.4L527.5,169.1L525.3,168.4L524.0,168.7L522.5,169.7L521.3,169.9L521.6,168.9L520.2,168.6L519.5,166.9L520.4,166.2L519.6,165.4L519.7,164.8L520.9,165.2L522.2,165.1L523.7,164.4L524.2,164.7L525.5,164.6L526.1,163.7L528.1,164.0L529.3,163.6ZM541.3,181.5L543.3,181.3L542.4,182.9L542.8,183.5L542.2,184.6L540.1,183.8L538.7,183.6L534.9,182.6L535.3,181.6L538.5,181.7ZM524.8,175.9L526.2,175.2L527.8,176.7L527.4,179.4L526.2,179.3L525.1,180.0L524.0,179.4L523.9,177.0L523.3,175.8Z',
'Ivory Coast':'M479.2,230.7L479.6,230.5L480.3,230.8L482.4,230.8L482.9,230.3L483.4,230.4L484.2,230.2L484.6,230.9L485.2,230.7L486.4,230.4L487.6,230.8L488.1,231.3L489.3,231.7L490.2,231.2L491.5,231.2L493.4,231.6L494.1,233.9L492.9,235.2L492.2,237.0L493.4,238.4L493.3,239.0L492.1,239.0L490.2,238.7L488.4,238.7L485.2,239.0L483.3,239.5L480.6,240.1L480.1,240.0L480.3,238.7L480.5,238.5L480.5,237.9L479.3,237.2L478.4,237.1L477.6,236.7L478.2,236.0L478.0,235.2L478.1,234.7L478.5,234.7L478.7,234.0L478.5,233.7L478.7,233.5L479.7,233.3L479.1,232.0L478.4,231.4L478.7,230.8Z',
'Jamaica':'M289.8,217.1L291.7,217.3L293.1,217.7L293.6,218.1L291.6,218.2L290.8,218.5L289.3,218.2L287.7,217.6L288.1,217.2L289.2,217.1Z',
'Japan':'M887.5,179.4L884.9,181.5L885.0,183.5L884.0,185.1L884.4,186.1L883.0,187.5L879.5,188.4L874.7,188.5L870.9,190.7L869.0,189.9L868.9,188.5L864.2,188.9L861.0,189.8L857.8,189.9L860.5,191.3L858.7,194.4L857.0,195.2L855.6,194.5L856.3,192.8L854.6,192.3L853.5,191.0L856.1,190.4L857.5,189.2L860.2,188.2L862.2,186.9L867.6,186.3L870.6,186.7L873.4,183.2L875.2,184.1L879.2,182.2L880.8,181.4L882.5,178.9L882.0,176.6L883.2,175.2L886.1,174.9L887.5,177.8ZM894.9,169.3L896.8,168.4L897.4,170.8L893.4,171.4L891.0,173.6L886.7,172.1L885.2,174.4L882.2,174.5L881.8,172.3L883.2,170.7L886.1,170.6L886.9,167.5L887.7,165.8L890.9,168.1L893.0,168.8ZM861.6,190.7L863.1,189.5L864.6,189.7L865.7,188.9L867.7,189.4L868.1,190.0L866.5,191.2L865.4,190.6L864.0,191.0L863.3,192.1L861.5,191.6Z',
'Jordan':'M597.9,192.7L598.3,192.1L601.4,192.8L606.7,190.8L607.8,193.1L607.3,193.4L601.8,194.3L604.6,196.2L603.7,196.5L603.2,197.1L601.1,197.4L600.5,198.0L599.3,198.6L596.3,198.3L596.2,198.0L597.5,195.1L597.5,194.4L597.9,193.8Z',
'Kazakhstan':'M739.0,157.2L736.9,158.8L734.6,159.0L734.5,161.4L733.0,162.4L727.6,161.7L725.6,165.8L724.2,166.3L718.8,167.2L721.3,171.0L719.4,171.6L719.6,172.8L718.0,172.5L716.6,171.7L712.6,171.5L708.0,171.4L707.1,171.7L703.2,170.7L701.6,171.2L701.2,172.5L696.7,171.7L694.9,172.0L694.3,173.0L692.8,173.4L689.2,174.8L688.0,176.3L687.0,176.4L686.2,175.4L682.8,175.3L682.2,173.6L680.9,173.6L681.1,171.4L677.8,169.8L673.1,170.0L669.9,170.3L667.3,168.3L665.1,167.5L660.9,165.9L660.4,165.7L653.4,167.0L653.5,175.0L652.1,175.1L650.2,173.4L648.3,172.8L645.3,173.3L644.0,174.0L643.9,173.5L644.6,172.6L644.0,171.8L640.9,171.1L639.7,169.1L638.2,168.6L638.1,167.9L640.7,168.1L640.8,166.4L643.1,166.1L645.5,166.4L646.0,164.2L645.5,162.8L642.8,162.9L640.5,162.3L637.3,163.3L634.8,163.8L633.4,163.4L633.7,162.3L631.9,160.7L629.9,160.8L627.6,159.2L629.2,157.3L628.4,156.8L630.6,154.1L633.4,155.6L633.7,153.8L639.3,151.0L643.6,151.0L649.6,152.7L652.8,153.7L655.7,152.7L660.0,152.6L663.5,153.9L664.3,153.2L668.1,153.3L668.8,152.1L664.4,150.3L667.0,149.1L666.5,148.4L669.1,147.7L667.1,145.9L668.4,145.0L678.6,144.0L679.9,143.3L686.7,142.3L689.2,141.2L694.1,141.8L694.9,144.6L697.8,143.9L701.3,144.9L701.0,146.3L703.6,146.2L710.5,143.6L709.5,144.5L712.9,146.6L719.0,153.1L720.5,151.8L724.2,153.2L728.1,152.6L729.6,153.1L731.0,154.5L732.9,155.0L734.0,156.0L737.5,155.7Z',
'Kenya':'M607.8,254.4L603.9,252.8L603.7,251.8L593.9,248.6L593.4,248.4L593.4,246.8L594.2,246.1L595.5,245.1L596.5,243.9L595.3,242.1L595.0,241.3L593.7,240.2L595.4,239.3L597.2,238.2L598.6,238.5L598.6,239.4L599.5,239.9L601.4,239.9L604.9,241.2L605.7,241.3L606.4,241.2L607.0,241.4L608.8,241.5L609.6,240.9L612.1,240.2L613.2,240.7L615.1,240.7L612.7,242.5L612.7,248.3L614.3,249.6L612.4,250.2L611.7,250.9L610.7,251.0L610.3,252.1L609.5,252.8L608.9,253.8Z',
'Kosovo':'M557.1,173.8L557.0,173.1L556.3,172.9L555.7,172.3L556.2,171.8L556.9,171.6L557.3,170.9L557.8,170.8L558.1,171.1L558.7,171.2L559.0,171.6L559.5,171.7L560.0,172.1L560.4,172.1L560.1,172.6L559.7,172.9L559.8,173.0L559.2,173.1L557.6,173.4L557.5,173.9Z',
'Kuwait':'M631.7,197.2L632.3,198.0L632.0,198.4L632.9,199.7L631.0,199.8L630.3,198.9L627.9,198.8L629.9,197.0Z',
'Kyrgyzstan':'M694.3,173.0L694.9,172.0L696.7,171.7L701.2,172.5L701.6,171.2L703.2,170.7L707.1,171.7L708.0,171.4L712.6,171.5L716.6,171.7L718.0,172.5L719.6,172.8L719.3,173.3L715.0,174.4L714.0,175.3L710.5,175.5L709.5,176.9L706.6,176.6L704.7,177.0L702.1,178.0L702.5,178.4L701.7,178.9L696.6,179.2L693.2,178.6L690.2,178.7L690.5,177.5L693.5,177.9L694.5,177.2L696.5,177.4L700.0,175.9L696.8,174.8L694.9,175.4L692.8,174.6L695.1,173.2Z',
'Laos':'M793.5,224.2L791.1,223.6L789.9,224.7L787.6,224.1L788.5,223.4L788.6,222.0L786.4,220.5L786.2,218.9L784.2,217.6L782.1,217.4L781.6,218.0L780.0,218.1L779.2,217.8L776.3,218.8L776.2,217.3L776.9,215.5L775.0,215.4L774.9,214.4L773.7,213.9L774.3,213.3L776.6,212.2L776.9,212.6L778.3,212.6L777.9,210.7L779.3,210.4L780.9,211.8L782.1,213.3L785.5,213.3L786.5,214.8L784.8,215.2L784.0,215.8L787.3,216.8L789.5,218.8L791.3,220.3L793.3,221.4L794.0,222.6Z',
'Latvia':'M575.4,135.2L576.7,135.9L576.9,137.3L577.8,139.0L574.9,140.1L573.2,140.5L570.6,139.2L569.2,139.0L568.8,138.4L566.1,138.7L561.5,138.5L558.4,139.4L558.5,137.2L559.8,135.4L562.4,134.4L564.6,136.6L566.8,136.5L567.3,134.2L569.6,133.7L570.8,134.1L573.1,135.2Z',
'Lebanon':'M598.6,191.0L597.9,191.0L597.6,191.4L596.7,191.4L597.7,189.8L599.1,188.5L599.1,188.4L600.3,188.5L600.8,189.3L599.3,190.0Z',
'Lesotho':'M580.0,294.9L580.9,295.4L580.1,296.3L579.6,296.9L578.1,297.2L577.6,297.8L576.6,297.9L574.6,296.5L576.0,295.4L577.5,294.7L578.8,294.3Z',
'Liberia':'M478.1,234.7L478.0,235.2L478.2,236.0L477.6,236.7L478.4,237.1L479.3,237.2L480.5,237.9L480.5,238.5L480.3,238.7L480.1,240.0L479.4,240.0L476.5,239.3L474.1,238.1L471.8,237.2L469.9,236.2L470.6,235.7L470.7,235.2L471.9,234.3L473.2,233.6L473.8,233.5L474.5,233.4L475.6,234.3L475.5,235.0L476.0,235.3L476.8,235.3L477.3,234.7Z',
'Libya':'M569.2,211.2L569.2,214.6L566.0,214.6L566.0,215.3L555.1,212.1L544.3,208.8L541.5,209.7L539.6,210.4L538.1,209.4L533.7,208.7L532.6,207.6L530.4,206.8L529.1,207.1L528.2,206.2L528.1,205.4L526.5,204.1L527.5,203.4L527.3,202.3L527.6,201.3L527.4,200.5L527.9,199.0L527.8,198.2L526.9,196.5L528.2,196.1L528.5,195.3L528.2,194.6L530.0,193.9L530.9,193.3L532.2,192.7L532.4,191.3L535.6,191.9L536.7,191.8L539.0,192.1L542.6,192.9L543.9,194.6L546.3,194.9L550.1,195.7L553.0,196.6L554.4,196.1L555.7,195.3L555.0,193.9L555.9,193.0L557.9,192.1L559.7,191.8L563.4,192.2L564.4,193.1L565.4,193.1L566.2,193.4L568.9,193.6L569.6,194.2L568.6,195.1L569.0,195.9L568.3,197.0L569.2,198.5L569.2,204.8Z',
'Liechtenstein':'M527.2,162.3L526.9,162.3L526.9,162.2L526.9,162.0L527.0,161.8L527.1,161.9L527.1,162.0L527.1,162.1L527.2,162.1L527.2,162.2L527.2,162.3Z',
'Lithuania':'M573.2,140.5L573.5,141.8L571.2,142.7L570.6,144.2L567.7,145.2L565.0,145.2L564.4,144.4L563.0,144.1L562.8,143.4L563.0,142.6L561.8,142.2L559.0,141.7L558.4,139.4L561.5,138.5L566.1,138.7L568.8,138.4L569.2,139.0L570.6,139.2Z',
'Luxembourg':'M517.7,155.0L517.7,155.2L517.8,155.3L518.0,155.5L518.1,155.6L518.3,155.7L518.6,155.7L518.7,155.8L518.8,155.9L518.7,156.0L518.6,156.0L518.5,156.1L518.4,156.2L518.4,156.5L518.3,156.6L518.2,156.5L518.1,156.5L517.9,156.5L517.7,156.5L517.6,156.6L517.4,156.6L517.3,156.6L517.2,156.5L517.1,156.5L516.9,156.5L516.8,156.4L516.9,156.4L517.0,156.3L517.0,156.2L517.1,156.1L516.9,155.9L516.8,155.9L516.7,155.7L516.7,155.6L516.7,155.5L516.8,155.4L516.9,155.2L517.0,155.1L517.3,154.9L517.6,154.9L517.7,154.9L517.7,155.0Z',
'Madagascar':'M636.0,266.8L636.7,267.5L637.4,268.6L637.8,270.6L638.5,271.3L638.3,272.1L637.8,272.6L636.9,271.6L636.3,272.1L636.9,273.3L636.6,274.0L635.9,274.4L635.7,275.8L634.6,277.8L633.3,280.1L631.6,283.3L630.6,285.7L629.3,287.7L627.1,288.1L624.7,288.9L623.2,288.4L621.0,287.8L620.3,286.9L620.1,285.4L619.1,284.0L618.9,282.8L619.4,281.5L620.6,281.2L620.6,280.7L621.9,279.4L622.2,278.3L621.5,277.5L621.0,276.5L620.8,274.9L621.7,274.0L622.1,273.0L623.5,272.9L625.0,272.6L626.0,272.3L627.2,272.2L628.7,271.3L631.0,270.3L631.8,269.5L631.4,268.8L632.6,269.0L634.1,267.8L634.1,266.9L635.0,266.1Z',
'Malawi':'M590.3,261.6L593.0,261.9L593.5,262.4L594.4,263.1L595.2,265.3L594.4,266.5L595.2,268.6L596.1,268.6L597.1,269.1L598.3,270.3L598.5,272.4L597.3,272.8L596.5,273.9L594.7,272.9L594.5,271.7L595.1,271.0L594.9,270.3L593.8,269.9L593.1,270.1L591.5,269.3L590.1,268.9L590.9,267.3L591.8,266.8L591.3,265.4L591.8,264.1L592.3,263.7L591.6,262.3Z',
'Malaysia':'M773.6,236.7L774.1,236.4L776.3,237.1L776.5,237.9L778.3,237.7L779.2,237.1L779.9,237.2L781.5,238.2L782.6,239.2L782.8,240.3L782.5,241.0L782.7,241.6L782.9,242.5L783.9,243.0L785.0,244.4L784.9,244.9L783.0,245.0L780.4,243.8L777.2,242.6L776.9,241.8L775.3,240.7L774.9,239.4L773.9,238.5L774.2,237.4ZM822.1,240.4L819.7,240.1L816.6,240.1L815.7,241.9L814.6,242.5L813.2,244.7L811.0,245.0L808.4,244.6L807.1,244.7L805.5,245.5L803.8,245.4L802.0,245.7L800.2,244.8L799.7,243.8L801.7,244.3L803.8,244.0L804.4,242.7L805.5,242.4L808.8,242.0L810.7,240.8L812.1,239.8L813.3,240.6L813.9,240.0L815.2,240.1L815.4,239.1L815.5,238.3L817.6,237.2L818.9,235.9L820.0,235.9L821.4,236.7L821.6,237.4L823.4,237.9L825.6,238.4L825.4,239.0L823.6,239.1L824.1,239.8Z',
'Mali':'M469.7,227.1L469.8,226.6L469.6,225.9L468.6,225.5L468.1,224.6L467.9,223.5L468.8,223.2L469.3,222.3L470.2,222.2L472.1,222.7L473.6,222.4L474.7,222.5L475.1,222.1L486.0,222.1L486.6,220.9L486.1,220.7L484.8,213.5L483.5,206.1L487.7,206.1L496.9,209.9L506.0,213.6L506.7,214.4L508.4,214.9L509.6,215.1L509.7,216.2L512.7,216.0L512.7,219.9L511.2,221.0L511.0,222.0L508.6,222.2L504.8,222.4L503.8,223.0L502.1,223.0L500.3,223.0L499.7,222.7L498.2,223.0L495.6,223.6L495.1,224.1L493.0,224.9L492.6,225.3L491.5,225.6L490.2,225.4L489.4,225.8L489.0,226.9L486.9,228.3L486.9,228.8L486.2,229.5L486.4,230.4L485.2,230.7L484.6,230.9L484.2,230.2L483.4,230.4L482.9,230.3L482.4,230.8L480.3,230.8L479.6,230.5L479.2,230.7L478.4,230.2L478.5,229.8L478.2,229.6L477.6,229.7L477.7,229.2L478.3,228.8L477.1,228.1L476.8,227.7L476.2,227.3L475.7,227.3L475.0,227.5L474.1,227.7L473.4,228.1L472.2,227.9L471.5,227.5L471.0,227.5L470.3,227.7L469.9,227.7Z',
'Malta':'M539.7,186.4L540.3,186.4L540.6,186.0L540.0,186.0Z',
'Mauritania':'M454.6,212.9L455.2,212.4L465.9,212.4L465.3,209.9L466.0,209.0L468.6,208.9L468.5,204.4L477.4,204.5L477.4,201.8L487.7,206.1L483.5,206.1L484.8,213.5L486.1,220.7L486.6,220.9L486.0,222.1L475.1,222.1L474.7,222.5L473.6,222.4L472.1,222.7L470.2,222.2L469.3,222.3L468.8,223.2L467.9,223.5L466.1,222.4L464.5,221.2L462.7,220.8L461.4,220.3L459.9,220.3L458.5,220.7L457.2,220.5L456.2,221.1L456.0,220.2L456.8,219.3L457.1,217.8L456.8,216.1L456.5,215.3L456.7,214.5L456.0,213.7Z',
'Mexico':'M182.1,192.4L185.2,192.3L188.7,192.1L188.4,192.4L192.5,193.3L198.7,194.7L204.1,194.6L206.3,194.6L206.3,193.9L211.0,193.9L212.0,194.5L213.4,195.1L215.0,195.9L215.9,196.9L216.6,197.9L218.0,198.4L220.3,199.0L222.0,197.6L224.2,197.5L226.1,198.2L227.5,199.5L228.4,200.5L230.1,201.6L230.7,202.8L231.4,203.6L233.5,204.2L235.5,204.6L236.5,204.5L235.5,206.1L235.0,207.3L234.8,209.6L234.5,210.5L235.0,211.4L235.9,212.2L236.4,213.5L238.2,214.8L238.8,215.8L239.9,216.6L242.8,217.0L243.9,217.7L246.3,217.3L248.4,217.1L250.4,216.8L252.1,216.5L253.9,215.8L254.5,214.8L254.8,213.4L255.2,212.9L257.1,212.5L259.9,212.1L262.4,212.1L264.0,212.0L264.7,212.4L264.6,213.2L263.1,214.2L262.5,215.2L263.0,215.5L262.6,216.2L261.9,217.5L261.2,217.1L260.6,217.1L260.1,217.1L259.1,218.2L258.6,218.0L258.3,218.0L258.3,218.3L255.8,218.3L253.3,218.3L253.3,219.2L252.0,219.2L253.0,219.8L254.0,220.1L254.3,220.5L254.8,220.6L254.7,221.2L251.2,221.2L249.9,222.5L250.3,222.8L250.0,223.2L249.9,223.7L246.8,221.9L245.4,221.4L243.2,220.9L241.7,221.1L239.5,221.7L238.1,221.8L236.2,221.4L234.2,221.1L231.6,220.3L229.6,220.1L226.5,219.3L224.2,218.5L223.5,218.1L222.0,218.0L219.2,217.5L218.1,216.7L215.2,215.8L213.8,214.7L213.1,213.9L214.0,213.7L213.8,213.2L214.4,212.8L214.4,212.2L213.5,211.4L213.2,210.8L212.3,209.9L209.9,208.2L207.2,206.8L205.9,205.7L203.5,205.0L203.0,204.6L203.4,203.5L202.1,203.1L200.4,202.2L199.8,201.0L198.3,200.8L196.7,199.9L195.4,199.0L195.3,198.4L193.9,197.1L192.9,195.7L192.9,195.0L191.0,194.2L190.1,194.3L188.5,193.8L188.1,194.5L188.5,195.4L188.8,196.8L189.7,197.6L191.7,198.8L192.2,199.2L192.6,199.4L193.0,200.0L193.4,200.0L194.0,201.1L194.8,201.6L195.4,202.2L197.1,203.1L198.0,204.8L198.8,205.5L199.6,206.3L199.7,207.3L201.0,207.3L202.1,208.1L203.1,208.9L203.1,209.2L201.9,209.8L201.4,209.8L200.7,208.8L198.9,207.8L197.0,206.9L195.6,206.5L195.7,205.2L195.3,204.3L194.0,203.7L192.1,202.9L191.7,203.2L191.0,202.7L189.4,202.3L187.7,201.2L187.9,201.1L189.1,201.2L190.1,200.5L190.2,199.7L188.1,198.4L186.5,197.9L185.5,196.8L184.5,195.6L183.2,194.1Z',
'Moldova':'M573.6,159.6L574.2,159.2L576.0,159.0L578.0,159.7L579.2,159.8L580.4,160.4L580.2,161.2L581.2,161.6L581.6,162.6L582.5,163.2L582.3,163.5L582.8,163.8L582.1,163.9L580.5,163.9L580.2,163.5L579.7,163.7L579.9,164.1L579.1,164.9L578.6,165.6L578.0,165.9L577.5,164.9L577.8,163.9L577.7,162.9L576.1,161.5L575.2,160.5L574.4,159.8Z',
'Monaco':'M520.7,170.8L520.8,170.8L520.8,170.8Z',
'Mongolia':'M740.0,157.0L742.9,156.6L748.1,154.4L752.2,153.3L754.6,154.0L757.5,154.1L759.3,155.2L762.0,155.3L765.9,155.9L768.6,154.2L767.5,152.7L770.3,150.1L773.3,151.2L775.8,151.5L779.0,152.1L779.5,154.0L783.4,155.0L786.0,154.6L789.4,154.3L792.2,154.6L794.8,155.8L796.5,157.0L799.0,157.0L802.4,157.4L804.9,156.8L808.5,156.4L812.5,154.6L814.1,154.9L815.6,155.7L818.8,155.5L817.5,157.4L815.6,159.8L816.3,160.7L817.8,160.4L820.5,160.8L822.6,159.9L824.8,160.7L827.2,162.3L826.9,163.1L824.8,162.9L820.8,163.2L818.9,163.8L816.9,165.4L812.8,166.2L810.1,167.4L807.3,167.0L805.7,166.8L804.3,168.2L805.2,169.1L805.6,169.8L803.7,170.5L801.8,171.7L798.6,172.4L794.5,172.5L790.1,173.3L786.9,174.4L785.7,173.7L782.4,173.7L778.4,172.4L775.7,172.1L772.1,172.4L766.5,171.9L763.5,172.0L761.9,170.7L760.6,168.7L758.9,168.4L755.6,167.0L752.0,166.7L748.7,166.4L747.8,165.4L748.8,162.7L746.9,160.8L743.0,159.9L740.8,158.7Z',
'Montenegro':'M555.7,172.3L555.0,172.5L554.8,172.1L553.6,173.1L553.8,173.8L553.3,173.6L552.5,172.9L551.3,172.5L551.6,172.1L552.0,171.0L552.9,170.5L553.4,170.3L554.1,170.6L554.5,170.9L555.4,171.2L556.5,171.6L556.2,171.8Z',
'Morocco':'M495.2,187.4L496.2,188.6L496.4,189.8L497.3,191.8L498.0,192.2L497.5,192.9L493.9,193.2L492.7,193.9L491.1,194.1L491.0,195.5L487.8,196.2L486.8,197.1L484.6,197.6L481.8,197.9L477.5,199.2L477.5,201.3L477.1,201.3L477.1,202.3L475.4,202.4L474.6,202.8L473.3,202.8L472.3,202.5L470.0,202.7L469.2,204.1L468.3,204.2L467.0,206.4L463.2,208.3L462.3,210.7L461.2,211.5L460.9,212.1L454.8,212.2L454.7,212.2L454.8,211.4L455.9,211.0L456.8,210.1L456.6,209.5L457.5,208.3L459.1,207.2L460.0,206.9L460.7,205.9L460.8,204.9L461.7,203.8L463.6,203.2L465.3,201.4L466.7,200.7L469.2,200.5L471.4,199.2L472.8,198.8L475.0,197.2L474.3,194.9L475.4,193.3L475.7,192.4L477.5,191.1L480.2,190.2L482.2,189.4L484.1,187.4L484.9,186.2L486.9,186.3L488.6,187.1L491.2,186.9L494.0,187.4Z',
'Mozambique':'M595.2,265.3L597.2,265.2L600.5,265.6L601.2,265.4L603.1,265.4L604.1,264.9L605.7,264.9L608.7,264.3L610.9,263.4L611.3,264.1L611.2,265.7L611.5,267.1L611.6,269.7L612.1,270.5L611.3,271.6L610.2,272.8L608.5,273.8L606.0,274.4L603.0,275.2L599.9,277.0L598.8,277.3L596.9,278.5L595.8,278.9L595.6,280.1L596.9,281.4L597.4,282.4L597.4,282.9L597.9,282.8L597.8,284.5L597.4,285.3L598.0,285.6L597.6,286.3L596.5,286.9L594.3,287.5L591.0,288.5L589.8,289.1L590.0,289.9L590.7,290.0L590.5,290.9L588.4,290.9L588.2,290.1L587.8,289.3L587.5,288.7L588.0,286.7L587.3,285.5L586.0,283.1L588.9,281.2L589.6,279.9L590.0,279.8L590.3,278.8L589.9,278.3L590.0,277.0L590.5,275.9L590.5,273.8L589.1,273.3L587.8,273.1L587.2,272.7L586.0,272.4L583.7,272.4L583.5,271.8L583.3,270.6L591.5,269.3L593.1,270.1L593.8,269.9L594.9,270.3L595.1,271.0L594.5,271.7L594.7,272.9L596.5,273.9L597.3,272.8L598.5,272.4L598.3,270.3L597.1,269.1L596.1,268.6L595.2,268.6L594.4,266.5Z',
'Myanmar':'M773.7,213.9L772.2,214.3L770.6,215.0L768.6,215.1L767.4,216.9L766.3,217.2L767.6,218.7L769.3,219.9L770.4,221.0L769.4,222.4L768.5,222.7L769.1,223.5L770.9,224.8L771.3,225.7L771.2,226.5L772.3,228.0L770.8,229.5L769.5,231.1L769.2,229.9L770.0,228.7L769.1,227.7L769.3,226.0L768.2,225.1L767.3,223.2L766.9,221.1L765.7,219.7L763.9,220.6L760.8,221.7L759.3,221.6L757.6,221.2L758.5,219.2L757.9,217.6L755.8,215.7L756.1,215.1L754.5,214.9L752.6,213.5L752.4,212.1L753.4,212.4L753.4,211.2L754.8,210.7L754.5,210.0L755.1,209.4L755.2,207.6L757.3,208.0L758.6,206.6L758.7,205.8L760.2,204.3L760.1,203.3L763.6,202.0L765.6,202.4L765.4,201.3L766.3,200.9L766.1,200.3L767.7,200.1L768.6,201.2L769.8,201.6L769.9,203.0L769.8,204.4L767.2,205.9L766.9,208.0L769.7,207.7L770.4,209.3L772.1,209.6L771.3,211.0L773.4,211.7L774.5,212.0L776.5,211.5L776.6,212.2L774.3,213.3Z',
'Namibia':'M555.3,287.4L555.3,294.0L552.8,294.9L551.4,295.0L549.6,294.7L548.4,294.6L548.0,293.8L546.9,293.3L545.6,294.2L543.6,292.8L542.5,291.5L541.9,289.8L541.2,288.5L540.3,285.8L540.2,283.8L539.9,282.8L538.8,282.1L537.4,280.7L536.0,278.7L535.4,277.7L533.2,276.0L533.0,274.8L534.3,274.4L536.0,274.2L537.7,274.2L539.4,275.0L539.8,274.8L550.8,274.8L552.7,275.6L559.3,275.8L564.3,275.1L566.5,274.7L568.3,274.8L569.4,275.2L569.4,275.4L567.8,275.7L567.0,275.7L565.3,276.4L564.2,275.7L560.0,276.3L558.0,276.3L557.9,282.3L555.3,282.4Z',
'Nepal':'M741.0,201.0L740.8,201.7L741.2,202.9L740.9,203.6L738.6,203.6L735.3,203.2L733.2,203.0L731.7,202.1L727.9,201.9L724.4,200.9L721.8,200.0L719.2,199.3L720.2,197.6L722.0,196.8L723.1,196.3L725.3,196.9L728.0,198.1L729.5,198.4L730.5,199.2L732.6,199.6L734.8,200.4L737.9,200.8Z',
'Netherlands':'M519.9,146.4L520.4,147.3L519.7,149.6L519.0,150.6L517.4,150.6L517.8,153.3L516.3,152.7L514.6,151.6L512.1,152.1L510.1,151.9L511.5,151.2L513.9,147.4L517.6,146.3Z',
'New Zealand':'M982.8,316.3L981.7,317.4L980.4,318.8L978.3,319.7L977.8,319.1L976.7,318.8L978.3,317.1L977.4,316.0L974.4,315.1L974.5,314.4L976.5,313.7L976.9,312.1L976.8,310.8L975.7,309.5L975.8,309.1L974.5,308.3L972.3,306.6L971.2,305.2L972.2,305.1L973.7,306.2L975.8,306.7L976.6,308.4L978.6,310.5L978.6,309.1L979.8,309.7L980.3,311.2L982.4,311.8L984.3,312.0L985.8,311.2L987.2,311.5L986.6,313.2L985.7,314.4L983.6,314.4L982.9,315.0L983.2,315.9ZM963.1,323.7L965.5,322.6L967.1,321.4L968.3,319.8L969.3,319.3L969.7,318.1L971.6,317.2L972.2,318.1L972.9,318.9L974.8,318.1L975.6,319.0L975.6,319.8L974.6,320.8L972.8,322.4L971.4,323.3L972.4,324.3L970.3,324.4L968.0,325.2L967.3,326.7L965.7,328.9L963.6,330.0L962.2,330.6L959.7,330.6L957.9,329.8L955.0,329.6L954.5,328.8L956.0,327.1L959.4,324.9L961.2,324.5Z',
'Nicaragua':'M273.3,229.5L272.6,229.9L271.8,229.7L271.4,229.4L270.5,229.3L269.9,229.5L268.1,229.1L267.7,229.3L266.7,228.8L265.4,228.1L264.8,227.6L263.7,227.1L262.3,226.3L262.6,226.1L263.1,226.3L263.3,226.2L264.1,226.1L264.5,225.8L264.9,225.8L264.8,225.0L265.5,224.9L266.0,224.9L266.6,224.5L267.4,224.8L267.7,224.6L268.2,224.4L269.1,224.0L269.2,223.6L269.5,223.6L269.8,223.3L270.1,223.2L270.6,223.5L271.1,223.5L271.7,223.3L272.4,223.3L273.3,223.1L273.7,222.9L274.6,222.9L274.4,223.1L274.3,223.4L274.5,224.0L273.9,224.6L273.6,225.3L273.5,226.0L273.7,226.4L273.8,227.1L273.3,227.3L273.1,228.0L273.3,228.4L272.7,228.8L272.8,229.2Z',
'Niger':'M541.5,209.7L542.2,212.4L543.2,212.8L543.2,213.4L544.4,214.0L543.8,214.7L542.7,218.1L542.6,220.2L539.1,221.8L537.9,224.0L539.1,224.6L539.1,225.6L540.8,225.6L540.5,226.4L539.8,226.5L539.7,227.0L539.2,227.1L537.3,225.3L536.7,225.2L534.6,226.1L532.5,225.6L531.0,225.5L530.2,225.8L528.6,225.7L527.0,226.4L525.6,226.5L522.3,225.6L521.0,226.0L519.6,226.0L518.6,225.4L515.9,224.8L513.0,225.0L512.3,225.3L511.9,226.3L511.1,226.9L510.9,228.3L508.8,227.4L507.9,227.4L506.9,227.9L507.0,226.8L503.9,226.4L503.8,225.6L502.2,224.6L501.9,223.8L502.1,223.0L503.8,223.0L504.8,222.4L508.6,222.2L511.0,222.0L511.2,221.0L512.7,219.9L512.7,216.0L516.5,215.3L524.4,212.0L533.7,208.7L538.1,209.4L539.6,210.4Z',
'Nigeria':'M508.4,237.0L508.6,234.4L508.5,233.4L509.0,232.4L509.8,231.9L511.2,230.9L510.9,230.5L511.4,229.8L510.8,228.9L510.9,228.3L511.1,226.9L511.9,226.3L512.3,225.3L513.0,225.0L515.9,224.8L518.6,225.4L519.6,226.0L521.0,226.0L522.3,225.6L525.6,226.5L527.0,226.4L528.6,225.7L530.2,225.8L531.0,225.5L532.5,225.6L534.6,226.1L536.7,225.2L537.3,225.3L539.2,227.1L539.7,227.0L540.8,227.7L540.5,228.0L540.3,228.5L538.0,229.7L537.3,230.8L536.9,231.6L536.4,232.0L535.8,233.1L534.3,233.7L533.9,234.6L533.3,235.2L533.1,235.9L531.2,236.4L529.7,235.7L528.6,235.8L527.0,236.7L526.2,236.7L524.9,238.2L524.2,239.4L521.4,239.9L520.4,239.9L519.3,240.2L517.1,240.2L515.7,239.2L514.8,238.0L512.9,237.0L510.8,237.0Z',
'North Korea':'M856.8,172.7L857.2,173.1L856.2,172.9L855.0,173.7L854.2,174.4L854.3,175.9L852.9,176.4L852.4,176.7L851.4,177.3L849.6,177.7L848.4,178.2L848.3,179.1L848.0,179.4L849.1,179.7L850.6,180.6L850.2,181.1L849.0,181.2L847.1,181.3L846.1,182.2L844.8,182.1L844.7,182.3L843.4,181.9L843.0,182.3L842.2,182.5L842.1,182.1L841.4,181.9L840.7,181.6L841.4,180.7L842.1,180.5L841.8,180.1L842.5,179.0L842.4,178.7L840.8,178.4L839.5,177.9L841.7,176.6L844.7,175.4L846.6,173.9L847.9,174.6L850.2,174.7L849.8,173.6L854.0,172.6L855.1,171.4Z',
'North Macedonia':'M562.0,172.9L563.4,173.5L563.6,174.9L563.1,175.0L562.6,175.4L561.1,175.3L560.1,175.8L558.3,176.0L557.2,175.5L556.8,174.6L557.1,173.8L557.5,173.9L557.6,173.4L559.2,173.1L559.8,173.0L560.8,172.9Z',
'Norway':'M542.3,28.9L543.3,25.8L547.3,25.5L550.8,28.6L559.7,35.0L552.9,38.2L551.4,43.9L549.0,45.3L547.7,51.2L544.4,51.5L538.6,47.2L541.0,44.6L536.9,42.4L531.6,35.7L529.5,29.1L536.9,25.9L538.4,29.0ZM585.8,91.5L581.1,93.4L578.9,93.8L580.1,90.6L576.6,88.8L572.4,90.3L571.0,93.6L568.4,95.6L565.5,94.5L562.0,94.7L558.9,92.4L557.3,93.6L555.6,93.8L555.2,96.6L550.1,95.9L549.4,98.3L546.7,98.3L544.9,101.3L542.2,105.7L538.0,111.1L539.0,112.3L538.0,113.8L535.3,113.7L533.6,117.1L533.7,121.6L535.5,123.3L534.6,127.1L532.3,129.3L531.1,131.0L529.3,129.1L523.9,132.7L520.3,133.4L516.5,131.9L515.5,128.5L514.7,121.0L517.2,118.9L524.4,115.9L529.7,112.2L534.7,106.9L541.3,99.2L545.8,96.0L553.3,90.4L559.3,88.3L563.8,88.6L567.9,84.6L572.9,84.8L577.8,83.9L586.3,87.4L582.8,88.7ZM575.7,25.4L571.7,30.2L563.8,31.3L555.7,29.8L555.3,27.4L551.3,27.2L548.4,23.0L556.8,20.3L560.7,22.6L563.5,19.8L570.4,22.2ZM568.4,43.7L562.3,46.7L557.5,45.0L559.4,43.1L557.7,40.6L563.4,39.1L564.5,42.0Z',
'Oman':'M651.4,210.0L651.5,209.3L652.3,208.6L652.3,207.9L653.5,207.6L653.0,207.3L653.3,206.2L654.7,206.2L655.9,207.4L657.4,208.0L659.4,208.2L661.0,208.5L662.2,209.5L663.0,210.1L663.9,210.3L663.9,210.7L662.9,211.7L662.5,212.2L661.4,212.7L660.3,213.9L659.1,213.8L658.5,214.2L658.1,215.1L658.4,216.2L658.2,216.4L656.9,216.4L655.2,217.0L655.0,217.8L654.3,218.2L652.7,218.2L651.6,218.6L651.6,219.2L650.3,219.7L648.8,219.5L647.0,220.1L645.7,220.2L644.8,219.0L642.7,216.3L650.9,214.6L652.7,211.2Z',
'Pakistan':'M713.0,186.8L710.4,188.4L707.4,188.7L703.2,188.2L701.9,189.0L702.9,190.7L703.8,192.0L706.0,192.9L703.7,194.0L703.7,195.3L701.1,197.2L699.4,199.0L696.5,200.9L693.4,200.8L690.4,202.6L692.2,203.4L692.5,204.8L694.0,205.7L694.5,207.2L688.5,207.2L686.7,208.3L684.7,207.9L683.9,206.6L681.8,205.3L676.8,205.6L672.4,205.7L668.5,205.9L669.6,203.9L673.5,203.0L673.3,202.1L672.0,201.8L671.9,200.3L669.3,199.5L668.2,198.4L666.8,197.4L671.4,198.4L674.1,198.1L675.8,198.3L676.3,197.9L678.2,198.1L681.7,197.3L681.8,195.8L683.4,194.7L685.4,194.7L685.7,194.2L687.8,194.0L688.8,194.1L689.8,193.6L689.7,192.5L690.8,191.3L692.6,190.9L691.5,189.6L694.1,189.7L694.8,189.0L694.7,188.2L696.1,187.4L695.8,186.5L695.1,185.6L696.7,184.8L699.7,184.4L702.8,184.1L704.2,183.8L705.7,183.5L707.8,184.5L708.6,186.0Z',
'Panama':'M290.4,233.2L290.1,233.4L290.7,234.3L290.2,234.8L289.3,234.7L289.0,235.5L288.1,235.0L287.5,234.1L288.2,233.7L287.5,233.6L287.0,233.1L285.6,232.6L284.4,232.7L283.9,233.3L282.8,233.7L282.2,233.8L281.9,234.1L283.2,235.0L282.5,235.2L282.1,235.4L280.8,235.5L280.3,234.5L280.0,234.8L279.1,234.7L278.5,234.1L277.4,234.0L276.7,233.8L275.5,233.8L275.4,234.1L275.1,233.9L275.3,233.6L275.5,233.2L275.4,232.9L275.8,232.8L275.2,232.5L275.2,231.9L276.3,231.7L277.3,232.3L277.2,232.6L278.3,232.7L278.5,232.6L279.3,233.0L280.6,232.9L281.8,232.5L283.4,232.1L284.4,231.6L285.9,231.7L285.8,231.9L287.3,232.0L288.5,232.2L289.4,232.7Z',
'Papua New Guinea':'M885.1,251.1L889.8,252.1L894.8,253.1L896.7,253.9L898.2,254.7L898.6,255.6L903.2,256.6L903.8,257.4L901.3,257.6L901.9,258.7L904.3,259.7L906.1,261.4L907.7,261.4L907.6,262.1L909.7,262.3L908.8,262.6L911.7,263.3L911.4,263.8L909.6,263.9L909.0,263.5L906.6,263.3L903.9,263.1L901.8,262.0L900.2,261.2L898.8,259.8L895.2,259.1L892.9,259.5L891.3,260.0L891.6,261.2L889.5,261.8L888.0,261.5L885.1,261.4L885.1,256.2ZM916.7,252.7L917.8,253.2L918.1,254.1L917.3,254.5L916.7,253.6L916.1,252.9L914.9,252.4L913.3,251.7L911.4,251.3L912.1,250.9L913.6,251.3L914.5,251.7L915.7,252.1ZM913.1,256.2L911.6,256.6L910.2,257.0L908.8,257.0L906.5,256.5L905.0,256.1L905.2,255.6L907.6,255.8L909.1,255.7L909.5,254.9L909.9,254.9L910.2,255.7L911.8,255.6L912.5,255.0L914.0,254.5L913.7,253.5L915.4,253.5L915.9,253.8L915.9,254.7L915.0,255.6L913.5,255.8Z',
'Paraguay':'M342.7,279.6L343.5,280.5L343.3,282.8L346.2,283.1L347.3,282.8L349.1,283.3L349.6,283.8L349.9,285.4L350.2,286.0L351.2,286.1L352.2,285.8L353.2,286.1L353.2,287.1L352.8,288.1L352.3,289.1L351.9,290.7L349.4,292.0L347.2,292.3L344.2,292.1L341.4,291.6L344.1,288.9L343.7,288.1L340.9,287.4L337.6,286.2L335.4,285.9L330.4,283.1L331.4,281.0L331.5,280.1L332.8,278.6L337.6,278.2L340.1,278.2L342.6,279.0Z',
'Peru':'M310.7,253.7L308.3,253.7L307.9,253.9L305.7,254.2L302.6,255.3L302.4,256.0L301.7,256.6L301.9,257.5L300.3,257.9L300.3,258.6L299.6,258.9L300.7,260.3L302.2,261.3L301.7,262.0L303.5,262.1L304.5,262.9L306.9,263.0L309.1,262.0L309.0,264.5L310.2,264.7L311.7,264.4L314.1,267.0L313.5,267.5L313.4,268.7L313.3,270.1L312.2,270.9L312.7,271.5L312.1,272.0L313.3,273.4L311.6,275.2L310.8,276.1L309.4,276.5L306.7,275.5L306.5,274.9L301.1,273.2L296.2,271.4L294.1,270.4L293.0,269.0L293.4,268.6L291.1,266.4L288.4,263.5L285.8,260.3L284.7,259.5L283.9,258.4L281.7,257.3L279.8,256.7L280.7,256.0L279.4,254.4L280.2,253.3L282.4,252.3L282.7,253.0L281.9,253.4L282.0,254.0L283.1,253.8L284.2,254.0L285.4,254.8L286.9,254.1L287.4,253.1L289.1,251.7L292.4,251.1L295.3,249.4L296.2,248.4L295.8,247.2L296.5,247.0L298.3,247.8L299.2,248.5L300.5,248.9L302.1,250.6L304.1,250.8L305.6,250.4L306.6,250.6L308.2,250.5L310.3,251.3L308.6,252.9L309.4,252.9Z',
'Philippines':'M834.9,231.1L835.6,230.6L835.9,229.6L837.4,229.5L837.0,230.6L839.0,229.0L838.7,230.6L837.7,231.1L836.9,232.1L836.0,232.6L834.3,231.5ZM845.2,233.6L845.5,234.6L845.7,235.5L844.7,237.0L843.7,235.4L842.5,236.2L843.3,237.3L842.6,238.1L839.4,237.2L838.6,236.0L839.4,235.3L837.7,234.5L836.8,235.2L835.6,235.1L833.5,236.0L833.1,235.5L834.2,234.2L835.9,233.7L837.4,233.1L838.3,233.8L840.4,233.4L840.8,232.7L842.8,232.7L842.6,231.4L844.8,232.2L845.0,233.0ZM823.8,232.1L820.2,233.6L821.5,232.5L823.5,231.5L825.1,230.4L826.5,228.8L827.0,230.1L825.2,231.0ZM834.2,217.6L833.8,218.3L834.7,219.5L834.0,220.8L832.4,221.4L832.0,222.7L832.6,224.0L834.0,224.2L835.2,224.0L838.6,224.9L838.4,225.8L839.2,226.2L839.0,226.9L836.8,226.1L835.8,225.3L835.1,225.9L833.4,224.9L830.9,225.1L829.6,224.8L829.7,224.1L830.6,223.7L829.7,223.3L829.4,223.9L828.1,223.0L827.6,222.2L827.5,220.7L828.6,221.2L828.9,218.6L829.8,217.1L831.5,217.1L833.1,217.6L834.0,217.2ZM833.4,228.7L833.0,228.0L834.6,228.5L836.4,228.5L836.3,229.1L835.0,229.8L833.3,230.3L833.2,229.6ZM842.8,227.5L843.6,229.3L841.5,228.9L841.6,229.5L842.2,230.4L840.9,230.8L840.8,229.7L840.0,229.6L839.6,228.6L841.2,228.7L841.1,228.1L839.5,226.9L842.1,226.9Z',
'Poland':'M565.0,145.2L565.1,146.4L565.9,147.4L565.9,148.4L564.3,149.0L565.1,150.2L565.1,151.3L566.5,153.5L566.2,154.2L564.9,154.5L562.4,156.5L563.1,157.6L562.5,157.5L559.9,156.6L558.0,156.9L556.7,156.7L555.1,157.2L553.7,156.3L552.6,156.6L552.4,156.5L551.2,155.3L549.1,155.1L548.9,154.4L547.0,154.1L546.6,154.7L545.1,154.2L545.3,153.5L543.3,153.3L542.0,152.5L540.9,150.9L541.1,150.0L540.4,148.6L539.4,147.7L540.2,147.0L539.5,145.6L541.4,144.8L545.6,143.6L549.1,142.7L551.8,143.1L552.0,143.8L554.6,143.8L558.0,144.1L563.0,144.1L564.4,144.4Z',
'Portugal':'M476.5,173.8L477.5,173.3L478.6,172.9L479.3,174.0L480.9,174.0L481.3,173.7L482.9,173.8L483.7,174.9L482.4,175.4L482.4,177.1L481.9,177.4L481.8,178.3L480.7,178.5L481.7,179.7L481.0,181.1L481.9,181.7L481.6,182.2L480.5,183.0L480.8,183.6L479.7,184.1L478.2,183.8L476.8,184.1L477.3,182.5L477.0,181.3L475.8,181.1L475.1,180.3L475.3,179.0L476.4,178.2L476.6,177.4L477.2,176.2L477.1,175.3L476.6,174.5Z',
'Qatar':'M639.4,206.5L639.3,205.2L640.0,204.3L640.7,204.1L641.6,204.6L641.6,205.7L641.0,206.7L640.3,206.8Z',
'Romania':'M578.0,165.9L579.2,166.3L580.5,165.9L581.7,166.3L581.8,166.9L580.4,167.4L579.6,167.2L578.8,169.9L577.2,169.6L575.3,168.8L572.1,169.3L570.7,169.9L566.7,169.8L564.6,169.4L563.6,169.6L562.8,168.7L562.3,168.3L562.9,167.9L562.2,167.7L561.4,168.2L559.8,167.5L559.6,166.6L557.9,166.1L557.6,165.3L556.1,164.4L558.3,164.0L560.0,162.4L561.3,160.9L562.9,160.4L564.1,159.9L565.8,160.1L567.5,160.1L568.8,160.7L569.7,160.3L571.7,160.1L572.4,159.6L573.6,159.6L574.4,159.8L575.2,160.5L576.1,161.5L577.7,162.9L577.8,163.9L577.5,164.9Z',
'Russia':'M987.8,84.3L991.3,82.2L991.3,85.6L988.3,85.8ZM634.8,163.8L633.5,165.2L630.9,165.5L628.2,167.9L630.7,170.0L630.4,171.4L633.4,173.9L631.8,174.8L631.3,175.3L630.1,175.2L628.2,173.9L627.4,173.8L625.7,173.3L624.9,172.5L622.4,172.0L620.7,172.4L620.2,172.0L616.5,170.9L612.5,170.6L610.2,170.2L609.9,170.4L606.4,168.6L603.3,167.8L600.9,166.4L602.9,166.1L605.2,164.2L603.7,163.3L607.7,162.3L607.6,161.8L605.2,162.2L605.3,161.2L606.7,160.5L609.3,160.3L609.7,159.5L609.1,158.2L610.2,157.0L610.2,156.2L606.2,155.4L604.6,155.5L602.9,154.3L600.8,154.7L597.4,153.8L597.4,153.3L596.4,152.3L594.3,152.1L594.0,151.3L594.7,150.8L593.0,149.4L590.2,149.6L589.3,149.5L588.7,150.1L587.6,150.0L587.0,148.3L586.3,147.4L586.8,147.2L589.0,147.3L590.1,146.7L589.3,146.0L587.5,145.5L587.6,145.0L586.5,144.5L584.8,142.8L585.4,142.0L585.1,140.7L582.5,140.0L581.1,140.4L580.7,139.7L577.8,139.0L576.9,137.3L576.7,135.9L575.4,135.2L576.6,134.3L575.7,131.4L577.7,129.7L577.3,129.1L580.4,127.4L577.5,125.9L583.3,121.7L585.9,119.7L586.9,118.0L582.9,115.6L584.0,113.2L581.5,110.5L583.4,107.2L580.2,102.7L582.7,99.6L578.5,96.8L578.9,93.8L581.1,93.4L585.8,91.5L588.6,90.0L593.1,92.7L600.5,93.8L610.8,98.7L612.9,100.6L613.1,103.3L610.0,105.4L605.6,106.5L593.4,103.5L591.4,104.0L595.9,106.9L596.1,108.6L596.2,112.5L599.7,113.6L601.9,114.5L602.2,112.8L600.6,111.2L602.3,109.8L608.9,112.1L611.2,111.2L609.4,108.4L615.7,104.6L618.2,104.8L620.8,106.2L622.3,103.5L620.1,101.1L621.4,98.6L619.4,95.9L627.0,97.3L628.6,99.7L625.1,100.2L625.1,102.5L627.3,103.8L631.5,103.0L632.2,100.4L637.9,98.4L647.4,94.7L649.4,94.9L646.7,97.5L650.1,98.0L652.1,96.5L657.2,96.4L661.2,94.6L664.3,97.2L667.4,94.3L664.5,91.7L666.0,90.2L674.0,91.6L677.8,93.0L687.6,98.0L689.5,95.7L686.7,93.4L686.6,92.5L683.3,92.0L684.2,89.9L682.8,86.2L682.7,84.6L687.7,80.1L689.5,75.4L691.5,74.3L698.7,75.7L699.3,78.7L696.7,82.8L698.4,84.3L699.3,87.7L698.7,94.0L701.7,96.6L700.5,99.5L695.2,105.2L698.3,105.8L699.4,104.4L702.4,103.4L703.1,101.3L705.5,99.4L703.9,97.0L705.1,94.1L702.2,93.7L701.5,91.2L703.7,86.6L700.1,82.6L705.0,79.2L704.4,75.4L705.7,75.3L707.2,78.2L706.1,83.1L709.0,84.0L707.8,80.4L712.3,78.4L718.0,78.1L723.0,81.1L720.6,76.8L720.3,70.9L725.1,69.8L731.6,70.1L737.5,69.3L735.3,66.3L738.4,62.3L741.6,62.1L746.9,59.0L754.1,58.2L755.0,56.4L762.1,55.8L764.4,57.2L770.5,53.7L775.5,53.8L776.2,50.9L778.8,47.9L785.2,44.9L789.9,47.2L786.2,49.0L792.4,50.1L793.1,53.5L795.6,51.8L803.6,51.9L809.7,55.2L811.9,57.7L811.2,61.0L808.2,62.8L801.0,66.2L799.0,67.9L802.4,68.7L806.4,70.2L808.9,69.1L810.2,72.7L811.4,71.2L815.8,70.4L824.5,71.3L825.2,73.9L836.6,74.7L836.7,70.5L842.5,71.4L846.9,71.4L851.3,74.3L852.5,77.7L850.9,79.9L854.3,83.8L858.6,85.8L861.2,80.6L865.6,82.9L870.2,81.5L875.5,83.1L877.5,81.7L882.0,82.4L880.0,77.6L883.6,75.3L908.2,78.8L910.5,81.8L917.6,85.5L928.6,84.6L934.1,85.4L936.3,87.4L936.0,90.8L939.4,92.1L943.0,91.2L947.8,91.0L953.0,91.9L958.1,91.4L962.9,95.4L966.2,94.0L964.0,91.1L965.3,89.1L973.9,90.4L979.6,90.1L987.4,92.3L991.3,94.2L991.3,110.4L991.2,110.4L987.7,112.0L984.2,111.8L986.7,113.7L988.3,116.6L989.5,117.6L989.9,119.0L989.2,119.9L984.1,119.2L976.5,121.7L974.0,122.1L969.9,124.4L965.9,126.4L964.9,127.9L961.0,125.7L953.9,128.1L952.7,127.0L950.1,128.3L946.4,127.9L945.6,130.0L942.3,132.9L942.4,134.1L945.5,134.8L945.1,139.0L942.6,139.1L941.4,141.5L942.6,142.6L937.8,144.0L936.9,147.1L932.8,147.7L932.0,150.4L928.0,152.7L927.0,151.0L925.9,147.2L924.4,141.2L925.7,137.3L928.0,135.5L928.1,134.1L932.3,133.5L937.2,129.6L941.9,126.4L946.8,123.8L949.0,119.1L945.7,119.4L944.0,122.1L937.1,125.7L934.9,121.7L927.9,122.8L921.0,128.2L923.3,130.2L917.2,131.0L913.0,131.3L913.2,129.0L909.0,128.6L905.6,130.1L897.3,129.6L888.3,130.5L879.5,136.3L869.1,143.0L873.3,143.3L874.7,145.0L877.3,145.6L879.1,144.3L882.1,144.5L886.0,147.4L886.1,149.6L884.0,152.2L883.7,155.2L882.5,159.0L878.4,162.4L877.5,164.0L873.8,166.7L870.1,169.2L868.4,170.5L864.7,171.8L863.0,171.8L861.3,170.8L857.6,172.4L857.2,173.1L856.8,172.7L856.8,171.6L858.2,171.5L858.6,169.0L857.9,167.1L860.2,166.3L863.5,166.7L865.4,164.5L866.3,161.9L867.4,161.1L868.8,159.0L864.3,159.7L861.9,160.6L857.8,160.6L856.7,158.4L853.5,156.6L848.7,155.9L847.7,153.4L846.8,151.9L845.7,150.8L844.1,148.2L841.7,147.2L837.6,146.4L834.0,146.5L830.6,147.0L828.3,148.3L829.8,148.9L829.9,150.3L828.4,151.1L825.9,153.8L825.9,154.9L822.1,156.5L818.8,155.5L815.6,155.7L814.1,154.9L812.5,154.6L808.5,156.4L804.9,156.8L802.4,157.4L799.0,157.0L796.5,157.0L794.8,155.8L792.2,154.6L789.4,154.3L786.0,154.6L783.4,155.0L779.5,154.0L779.0,152.1L775.8,151.5L773.3,151.2L770.3,150.1L767.5,152.7L768.6,154.2L765.9,155.9L762.0,155.3L759.3,155.2L757.5,154.1L754.6,154.0L752.2,153.3L748.1,154.4L742.9,156.6L740.0,157.0L739.0,157.2L737.5,155.7L734.0,156.0L732.9,155.0L731.0,154.5L729.6,153.1L728.1,152.6L724.2,153.2L720.5,151.8L719.0,153.1L712.9,146.6L709.5,144.5L710.5,143.6L703.6,146.2L701.0,146.3L701.3,144.9L697.8,143.9L694.9,144.6L694.1,141.8L689.2,141.2L686.7,142.3L679.9,143.3L678.6,144.0L668.4,145.0L667.1,145.9L669.1,147.7L666.5,148.4L667.0,149.1L664.4,150.3L668.8,152.1L668.1,153.3L664.3,153.2L663.5,153.9L660.0,152.6L655.7,152.7L652.8,153.7L649.6,152.7L643.6,151.0L639.3,151.0L633.7,153.8L633.4,155.6L630.6,154.1L628.4,156.8L629.2,157.3L627.6,159.2L629.9,160.8L631.9,160.7L633.7,162.3L633.4,163.4ZM756.5,16.1L762.3,13.8L767.6,18.9L773.9,27.9L773.2,35.6L767.3,36.7L759.7,34.3L755.2,31.0L753.1,24.6L749.4,22.8ZM781.1,32.3L788.0,37.0L787.2,40.2L771.9,43.2L776.8,32.7L779.1,31.7ZM879.1,55.8L886.3,56.1L896.2,59.5L894.0,64.1L884.0,64.0L879.5,65.4L874.1,61.4L875.6,57.0ZM904.7,60.9L911.6,62.5L908.4,64.9L904.1,64.4L899.0,62.0L899.6,59.9ZM882.0,72.5L884.5,70.3L887.9,69.8L891.8,71.9L892.1,73.4L888.0,73.4L882.4,72.8ZM623.2,20.4L628.5,18.6L632.7,18.5L633.2,21.1L634.8,18.8L637.3,17.2L641.4,19.3L640.3,20.8L636.7,22.1L634.2,22.8L633.8,24.3L630.7,25.9L627.7,23.7L629.3,20.7ZM563.0,144.1L558.0,144.1L554.6,143.8L555.2,142.6L559.0,141.7L561.8,142.2L563.0,142.6L562.8,143.4ZM646.8,70.4L653.3,65.3L652.6,62.5L658.7,59.2L667.7,55.0L676.7,53.8L681.4,51.2L686.7,50.3L688.6,53.1L686.7,55.2L677.1,58.4L668.8,61.4L660.3,67.2L656.3,72.7L652.0,77.9L652.5,82.1L657.8,86.1L656.1,86.6L647.2,85.9L646.5,83.8L641.6,82.4L641.2,79.7L644.0,78.6L643.9,75.7L649.3,71.1ZM890.3,145.8L891.2,148.3L891.1,150.9L892.3,153.4L895.0,157.8L891.0,157.0L889.3,160.4L891.9,162.8L891.9,164.4L889.8,163.0L888.0,164.8L887.5,162.9L887.8,160.6L887.5,158.0L888.1,156.2L888.3,152.9L886.7,150.4L886.9,146.8L889.4,145.6L888.3,144.4L889.6,144.0ZM24.7,101.7L24.5,104.2L26.3,105.2L25.7,102.3L33.1,102.9L38.4,106.6L35.7,108.2L31.2,108.6L31.2,112.3L30.1,113.1L27.5,112.9L25.4,111.7L21.8,110.6L21.2,108.9L18.5,108.3L15.4,108.8L13.9,107.5L14.5,106.0L11.2,107.0L12.4,108.8L10.9,110.4L10.9,94.2L17.6,97.5ZM14.4,85.3L10.9,85.6L10.9,82.2L11.2,82.0L13.5,82.0L17.5,83.5L17.3,84.1ZM592.1,164.8L592.8,164.2L594.8,164.7L595.7,164.8L596.0,165.3L596.4,165.3L596.4,165.5L597.8,166.1L600.6,165.9L600.0,166.7L597.0,167.1L593.3,168.4L591.8,168.0L592.4,166.9L589.5,166.3L589.9,165.8L592.5,165.1Z',
'Rwanda':'M583.9,248.7L585.0,249.6L584.8,250.6L584.0,250.8L582.6,250.7L581.8,251.6L580.1,251.4L580.4,250.6L580.7,250.4L580.8,249.5L581.6,249.1L582.3,249.2Z',
'San Marino':'M533.8,170.1L533.8,170.0L534.0,170.0L534.0,170.1Z',
'Saudi Arabia':'M596.3,198.3L599.3,198.6L600.5,198.0L601.1,197.4L603.2,197.1L603.7,196.5L604.6,196.2L601.8,194.3L607.3,193.4L607.8,193.1L611.1,193.6L615.1,194.9L622.8,198.6L627.9,198.8L630.3,198.9L631.0,199.8L632.9,199.7L634.0,201.3L635.3,201.7L635.8,202.3L637.6,203.1L637.8,203.8L637.5,204.4L637.9,205.0L638.7,205.5L639.0,206.0L639.4,206.5L640.3,206.8L641.0,206.7L641.5,207.4L641.6,207.8L642.7,209.5L650.9,210.4L651.4,210.0L652.7,211.2L650.9,214.6L642.7,216.3L634.8,216.9L632.3,217.7L630.3,219.4L629.1,219.7L628.4,219.2L627.3,219.2L624.7,219.1L624.2,218.9L621.1,218.9L620.3,219.1L619.2,218.7L618.5,219.5L618.8,220.2L617.6,220.7L617.2,220.0L616.4,219.5L616.2,218.8L614.8,218.2L613.3,216.8L612.6,215.5L610.7,214.3L609.5,214.0L607.7,212.4L607.3,211.2L607.5,210.2L605.9,208.3L604.6,207.6L603.1,207.3L602.3,206.3L602.4,205.9L601.6,205.0L600.9,204.6L599.8,203.3L598.1,201.8L596.7,200.6L595.4,200.6L595.8,199.6L595.9,199.0Z',
'Senegal':'M455.6,225.2L454.4,223.9L453.1,223.4L454.3,223.0L455.6,221.9L456.2,221.1L457.2,220.5L458.5,220.7L459.9,220.3L461.4,220.3L462.7,220.8L464.5,221.2L466.1,222.4L467.9,223.5L468.1,224.6L468.6,225.5L469.6,225.9L469.8,226.6L469.7,227.1L469.3,227.2L467.8,227.0L467.6,227.2L467.0,227.3L465.1,226.9L463.8,226.9L458.7,226.8L458.0,227.0L457.1,226.9L455.7,227.2L455.2,225.9L457.7,226.0L458.3,225.7L458.8,225.7L459.8,225.4L461.0,225.7L462.2,225.7L463.4,225.4L462.8,224.9L461.9,225.2L461.1,225.2L460.0,224.8L459.1,224.8L458.5,225.2Z',
'Serbia':'M552.4,164.9L554.4,164.3L556.1,164.4L557.6,165.3L557.9,166.1L559.6,166.6L559.8,167.5L561.4,168.2L562.2,167.7L562.9,167.9L562.3,168.3L562.8,168.7L562.1,169.2L562.3,170.0L563.7,170.9L562.6,171.6L562.2,172.3L562.5,172.6L562.0,172.9L560.8,172.9L559.8,173.0L559.7,172.9L560.1,172.6L560.4,172.1L560.0,172.1L559.5,171.7L559.0,171.6L558.7,171.2L558.1,171.1L557.8,170.8L557.3,170.9L556.9,171.6L556.2,171.8L556.5,171.6L555.4,171.2L554.5,170.9L554.1,170.6L553.4,170.3L554.1,170.2L554.4,169.1L553.1,168.3L553.8,167.3L552.8,167.3L553.9,166.5L553.0,165.8Z',
'Sierra Leone':'M465.0,232.8L466.5,232.1L466.8,231.6L467.2,231.3L468.0,231.3L468.6,231.0L470.8,231.0L471.6,231.5L472.1,232.2L472.1,232.7L472.5,233.1L472.5,233.7L473.2,233.6L471.9,234.3L470.7,235.2L470.6,235.7L469.9,236.2L469.2,236.1L467.2,235.4L465.8,234.6L465.3,234.0Z',
'Singapore':'M784.2,244.8L783.8,244.9L783.3,244.8L783.5,244.7L783.8,244.6L784.0,244.7L784.2,244.7L784.3,244.8Z',
'Slovakia':'M562.5,157.5L561.7,158.1L561.2,159.1L560.6,159.3L557.7,158.6L556.8,158.8L556.2,159.3L554.9,159.6L554.6,159.5L553.3,159.8L552.2,159.9L552.0,160.4L549.7,160.7L548.7,160.4L547.3,159.8L547.0,159.0L547.3,158.7L547.6,158.1L548.9,158.2L549.8,157.9L549.9,157.7L550.4,157.6L550.6,157.0L551.2,156.9L551.6,156.5L552.4,156.5L552.6,156.6L553.7,156.3L555.1,157.2L556.7,156.7L558.0,156.9L559.9,156.6Z',
'Slovenia':'M538.7,163.6L540.9,163.7L542.3,163.2L544.7,163.2L545.2,162.8L545.7,162.8L546.2,163.6L544.0,164.2L543.7,165.1L542.8,165.3L542.8,166.0L541.7,165.9L540.8,165.6L540.3,165.9L538.4,165.9L539.0,165.7L538.4,164.7Z',
'Somalia':'M614.3,249.6L612.7,248.3L612.7,242.5L615.1,240.7L615.8,240.2L617.5,240.2L620.0,239.1L623.5,239.0L631.2,234.2L633.1,232.9L634.3,231.9L634.3,231.1L634.3,229.4L634.4,228.8L635.2,228.7L636.5,228.5L637.9,228.3L639.2,227.8L640.3,227.8L640.3,228.2L640.1,229.1L640.1,230.0L639.5,230.6L638.7,232.3L637.4,234.1L635.7,236.1L633.4,238.5L631.1,240.3L627.9,242.4L625.2,243.7L621.1,245.3L618.5,246.5L615.6,248.4L614.9,249.2Z',
'South Africa':'M545.6,294.2L546.9,293.3L548.0,293.8L548.4,294.6L549.6,294.7L551.4,295.0L552.8,294.9L555.3,294.0L555.3,287.4L556.0,287.7L557.6,289.4L557.4,290.4L558.0,291.1L559.9,290.9L561.3,290.1L562.6,289.6L563.2,288.7L564.6,288.3L565.7,288.5L567.0,289.0L569.2,289.1L571.0,288.7L571.2,288.1L571.7,287.3L573.2,287.2L574.0,286.5L574.9,285.4L577.4,284.1L581.2,282.8L582.3,282.8L583.6,283.1L584.6,282.9L586.0,283.1L587.3,285.5L588.0,286.7L587.5,288.7L587.8,289.3L586.4,289.0L585.6,289.1L585.4,289.6L584.6,290.3L584.6,290.9L586.3,291.9L587.9,291.7L588.4,290.9L590.5,290.9L589.8,292.2L589.5,293.7L588.8,294.5L586.9,295.4L586.4,295.7L585.2,296.6L584.5,297.5L582.9,298.9L579.8,300.8L577.9,301.9L575.9,302.8L573.0,303.5L571.6,303.6L571.3,304.1L569.6,303.8L568.3,304.2L565.3,303.8L563.7,304.1L562.5,304.0L559.7,304.7L557.4,305.0L555.7,305.8L554.5,305.8L553.3,305.1L552.4,305.1L551.2,304.2L551.1,304.5L550.8,304.0L550.8,302.9L549.9,301.6L550.8,301.3L550.7,299.8L548.9,298.1L547.5,296.5Z',
'South Korea':'M844.7,182.3L844.8,182.1L846.1,182.2L847.1,181.3L849.0,181.2L850.2,181.1L850.6,180.6L853.0,182.9L853.6,184.2L853.6,186.5L852.6,187.6L850.2,187.9L848.0,188.7L845.5,188.9L845.2,187.8L845.7,186.4L844.5,184.4L846.5,184.0Z',
'South Sudan':'M585.0,241.4L582.6,240.3L582.0,239.6L580.5,240.0L579.2,239.9L578.5,240.1L577.3,240.0L575.6,238.6L575.2,238.1L573.1,237.5L572.5,236.6L571.3,235.9L569.5,235.0L569.5,234.5L568.0,233.9L566.1,233.2L567.0,233.1L567.9,232.8L568.6,231.3L569.3,230.6L571.3,230.4L571.8,230.8L573.2,231.7L573.9,231.9L574.9,231.6L576.9,231.7L577.2,232.0L580.0,232.0L580.0,231.7L581.5,231.4L581.7,230.9L582.8,230.6L585.1,231.5L586.5,231.3L587.8,230.2L589.3,229.3L589.1,228.3L588.4,227.8L590.1,227.8L590.2,227.4L591.5,227.5L591.2,228.7L591.5,229.9L592.9,230.5L593.2,231.1L593.2,231.9L593.6,231.9L593.6,233.1L593.2,233.6L591.7,233.7L590.8,234.6L592.5,234.7L593.9,235.5L594.3,236.1L595.6,236.5L597.2,238.2L595.4,239.3L593.7,240.2L592.0,240.9L590.1,240.9L587.9,241.3L586.2,240.9Z',
'Spain':'M480.8,183.6L480.5,183.0L481.6,182.2L481.9,181.7L481.0,181.1L481.7,179.7L480.7,178.5L481.8,178.3L481.9,177.4L482.4,177.1L482.4,175.4L483.7,174.9L482.9,173.8L481.3,173.7L480.9,174.0L479.3,174.0L478.6,172.9L477.5,173.3L476.5,173.8L476.6,172.3L475.5,171.3L479.3,169.8L482.7,170.2L486.3,170.1L489.2,170.5L491.5,170.4L495.9,170.5L497.0,171.3L502.0,172.3L503.0,171.8L506.0,172.8L509.2,172.5L509.3,173.8L506.8,175.2L503.3,175.6L503.0,176.3L501.4,177.5L500.3,179.2L501.4,180.3L499.8,181.2L499.2,182.5L497.2,182.9L495.2,184.5L491.8,184.5L489.2,184.4L487.5,185.1L486.4,185.9L485.1,185.7L484.1,185.1L483.3,183.9Z',
'Sri Lanka':'M723.8,235.0L723.4,236.7L722.2,237.1L719.9,237.5L718.6,236.2L718.1,233.9L719.3,231.3L721.2,232.2L722.5,233.3Z',
'Sudan':'M568.0,233.9L565.9,233.2L565.0,232.7L564.8,232.2L565.2,231.5L565.2,230.9L563.6,229.9L563.3,229.2L563.4,228.8L562.4,228.3L562.3,227.4L561.8,226.8L560.8,226.8L561.1,226.3L561.8,225.6L561.5,224.9L562.4,224.4L561.8,224.0L562.5,223.0L563.8,221.8L566.1,221.9L566.0,215.3L566.0,214.6L569.2,214.6L569.2,211.2L580.1,211.2L590.7,211.2L601.5,211.2L602.3,212.9L601.7,213.2L602.1,214.9L603.1,216.9L604.2,217.3L605.7,218.0L604.3,218.9L602.3,219.2L601.4,219.7L601.2,220.8L600.0,223.2L600.3,223.9L599.8,225.3L598.7,226.9L597.1,227.7L595.9,228.9L595.7,229.6L594.4,230.0L593.6,231.7L593.6,233.1L593.6,231.9L593.2,231.9L593.2,231.1L592.9,230.5L591.5,229.9L591.2,228.7L591.5,227.5L590.2,227.4L590.1,227.8L588.4,227.8L589.1,228.3L589.3,229.3L587.8,230.2L586.5,231.3L585.1,231.5L582.8,230.6L581.7,230.9L581.5,231.4L580.0,231.7L580.0,232.0L577.2,232.0L576.9,231.7L574.9,231.6L573.9,231.9L573.2,231.7L571.8,230.8L571.3,230.4L569.3,230.6L568.6,231.3L567.9,232.8L567.0,233.1L566.1,233.2Z',
'Suriname':'M352.6,243.3L351.0,242.9L349.7,243.1L348.6,243.0L348.4,243.4L348.8,243.7L348.6,244.1L347.1,243.9L345.4,242.6L345.1,241.7L344.2,241.7L343.0,240.5L343.5,239.7L343.4,239.3L345.0,238.9L345.4,237.5L348.7,237.8L349.0,237.5L351.2,237.4L354.1,237.8L352.7,239.2L352.9,240.3L354.0,241.2L353.5,241.9L353.3,242.6Z',
'Sweden':'M531.1,131.0L532.3,129.3L534.6,127.1L535.5,123.3L533.7,121.6L533.6,117.1L535.3,113.7L538.0,113.8L539.0,112.3L538.0,111.1L542.2,105.7L544.9,101.3L546.7,98.3L549.4,98.3L550.1,95.9L555.2,96.6L555.6,93.8L557.3,93.6L560.9,95.7L565.2,98.6L565.2,104.9L566.2,106.4L561.5,107.5L558.8,110.2L559.3,112.5L554.9,115.4L549.7,118.4L547.7,123.1L549.6,125.4L552.2,127.2L549.7,130.7L546.9,131.5L545.9,136.5L544.3,139.2L541.0,138.9L539.5,141.1L536.3,141.2L535.5,138.6L533.2,135.3Z',
'Switzerland':'M527.2,161.2L527.3,161.6L526.9,162.2L528.1,162.6L529.5,162.7L529.3,163.6L528.1,164.0L526.1,163.7L525.5,164.6L524.2,164.7L523.7,164.4L522.2,165.1L520.9,165.2L519.7,164.8L518.8,163.8L517.5,164.1L517.5,163.1L519.5,161.8L519.4,161.2L520.7,161.4L521.4,161.0L523.7,161.0L524.3,160.5Z',
'Syria':'M598.3,192.1L598.7,191.8L598.6,191.0L599.3,190.0L600.8,189.3L600.3,188.5L599.1,188.4L598.9,186.9L599.5,186.1L600.2,185.7L601.0,185.3L601.1,184.2L602.0,184.6L605.0,184.0L606.5,184.4L608.7,184.4L611.8,183.6L613.3,183.7L616.4,183.4L615.0,184.6L613.5,185.1L613.8,186.5L612.7,188.8L606.7,190.8L601.4,192.8Z',
'Taiwan':'M832.7,207.1L831.1,209.9L829.9,211.3L828.5,209.8L828.2,208.5L829.8,206.8L831.9,205.5L833.2,206.0Z',
'Tajikistan':'M685.8,183.5L687.3,181.5L686.7,180.0L684.7,179.5L685.4,178.6L687.7,178.7L689.0,177.6L689.9,176.2L693.5,175.7L692.9,176.7L693.3,177.3L694.5,177.2L693.5,177.9L690.5,177.5L690.2,178.7L693.2,178.6L696.6,179.2L701.7,178.9L702.4,180.8L703.3,180.6L704.9,181.0L704.9,181.8L705.3,183.0L702.5,183.0L700.6,182.8L698.9,183.7L697.7,183.9L696.7,184.3L695.6,183.7L695.9,182.0L695.1,181.9L695.4,181.3L693.9,180.8L692.7,181.5L692.4,182.3L692.0,182.6L690.4,182.6L689.5,183.5L688.6,183.1L686.6,183.8Z',
'Tanzania':'M593.4,248.4L593.9,248.6L603.7,251.8L603.9,252.8L607.8,254.4L606.6,256.3L606.7,257.2L608.5,257.8L608.6,258.2L607.8,259.2L608.0,259.7L607.8,260.4L608.7,261.4L609.9,263.0L610.9,263.4L608.7,264.3L605.7,264.9L604.1,264.9L603.1,265.4L601.2,265.4L600.5,265.6L597.2,265.2L595.2,265.3L594.4,263.1L593.5,262.4L593.0,261.9L590.3,261.6L588.7,261.1L587.0,260.9L585.9,260.6L584.8,260.2L583.3,258.2L581.7,257.3L581.2,256.4L581.5,255.5L581.0,254.1L582.1,254.0L583.1,253.4L584.1,252.6L584.8,252.3L584.8,251.7L584.2,251.4L584.0,250.8L584.8,250.6L585.0,249.6L583.9,248.7L584.9,248.5L587.9,248.6Z',
'Thailand':'M787.6,224.1L785.1,223.9L781.5,224.2L779.8,225.5L780.4,227.5L778.0,226.8L775.7,226.8L776.1,225.5L773.7,225.5L773.4,227.3L772.0,229.7L771.1,231.1L771.3,232.2L773.1,232.3L774.2,233.8L774.6,235.1L776.2,236.1L777.8,236.2L779.2,237.1L778.3,237.7L776.5,237.9L776.3,237.1L774.1,236.4L773.6,236.7L772.6,236.1L772.1,235.3L770.6,234.4L769.3,233.6L768.9,234.6L768.4,233.7L768.7,232.7L769.5,231.1L770.8,229.5L772.3,228.0L771.2,226.5L771.3,225.7L770.9,224.8L769.1,223.5L768.5,222.7L769.4,222.4L770.4,221.0L769.3,219.9L767.6,218.7L766.3,217.2L767.4,216.9L768.6,215.1L770.6,215.0L772.2,214.3L773.7,213.9L774.9,214.4L775.0,215.4L776.9,215.5L776.2,217.3L776.3,218.8L779.2,217.8L780.0,218.1L781.6,218.0L782.1,217.4L784.2,217.6L786.2,218.9L786.4,220.5L788.6,222.0L788.5,223.4Z',
'Togo':'M503.5,229.4L503.2,230.3L504.0,230.7L505.0,231.3L505.1,232.1L505.6,232.4L505.5,236.1L506.2,237.2L504.0,237.5L503.4,237.0L502.6,236.0L502.4,235.2L503.0,233.7L502.3,233.1L502.1,231.9L502.1,230.7L500.9,229.9L501.1,229.4Z',
'Trinidad and Tobago':'M330.6,229.6L329.2,228.9L327.8,228.9L329.2,229.6Z',
'Tunisia':'M526.9,196.5L525.7,193.2L524.1,192.5L524.0,192.0L521.8,190.9L521.6,189.5L523.2,188.4L523.9,186.8L523.5,184.9L524.0,183.9L527.0,183.1L528.9,183.4L528.8,184.4L531.1,183.6L531.3,184.0L529.9,185.0L529.9,185.9L530.9,186.4L530.5,188.0L528.7,189.0L529.2,190.1L530.6,190.1L531.3,191.0L532.4,191.3L532.2,192.7L530.9,193.3L530.0,193.9L528.2,194.6L528.5,195.3L528.2,196.1Z',
'Turkey':'M623.0,183.5L621.7,183.8L620.7,183.3L617.6,183.0L616.4,183.4L613.3,183.7L611.8,183.6L608.7,184.4L606.5,184.4L605.0,184.0L602.0,184.6L601.1,184.2L601.0,185.3L600.2,185.7L599.5,186.1L598.5,185.2L599.5,184.5L597.9,184.7L595.6,184.2L593.7,185.3L589.6,185.6L587.4,184.5L584.5,184.4L583.8,185.3L582.0,185.5L579.3,184.4L576.3,184.5L574.7,182.5L572.7,181.4L574.1,179.8L572.3,178.8L575.4,176.9L579.6,176.8L580.7,175.2L585.9,175.5L589.2,174.1L592.3,173.5L596.8,173.5L601.6,175.0L605.5,175.8L608.7,175.4L611.0,175.6L614.2,174.5L617.1,174.4L619.8,175.5L620.2,176.2L620.0,177.2L622.0,177.7L623.1,178.3L621.2,178.9L622.0,181.2L621.5,181.9L623.0,183.5ZM572.2,173.9L575.0,173.2L577.3,173.5L577.6,174.3L580.0,175.0L579.5,175.5L576.3,175.7L575.1,176.3L572.9,177.4L572.0,176.5L572.0,176.0L572.7,175.8L573.5,174.5Z',
'Turkmenistan':'M644.0,174.0L645.3,173.3L648.3,172.8L650.2,173.4L652.1,175.1L653.5,175.0L656.6,175.0L656.1,173.9L658.4,173.2L660.7,171.9L664.4,173.1L664.7,174.8L665.7,175.2L668.7,175.1L669.6,175.5L670.9,177.6L674.0,179.0L675.8,180.0L678.7,181.0L682.3,181.9L682.2,183.1L681.4,183.0L680.1,182.5L679.7,183.2L677.4,183.6L676.8,185.2L675.3,185.8L673.2,186.1L672.6,186.9L670.5,187.2L667.8,186.5L667.5,184.8L665.5,184.7L662.4,183.0L660.2,182.8L657.2,181.8L655.3,181.6L654.1,181.9L652.2,181.9L650.3,183.0L647.9,183.4L647.4,182.0L647.8,179.9L645.7,179.2L646.4,177.8L644.6,177.7L645.2,175.9L647.7,176.4L650.1,175.8L648.2,174.5L647.4,173.3L645.2,173.8L644.9,175.4Z',
'UAE':'M641.5,207.4L642.0,207.3L642.1,207.7L644.3,207.5L646.5,207.5L648.1,207.6L650.0,206.4L652.0,205.3L653.8,204.2L654.3,204.8L654.7,206.2L653.3,206.2L653.0,207.3L653.5,207.6L652.3,207.9L652.3,208.6L651.5,209.3L651.4,210.0L650.9,210.4L642.7,209.5L641.6,207.8Z',
'UK':'M484.2,145.3L482.1,144.8L480.5,144.8L481.0,143.4L480.5,141.9L482.7,141.8L485.7,143.5ZM492.6,146.6L492.7,146.6L493.1,145.0L491.2,143.3L487.9,142.8L487.2,142.1L488.2,140.8L487.3,140.1L485.9,141.4L485.7,138.7L484.3,137.2L485.3,134.2L487.4,131.7L489.6,132.0L492.9,131.7L490.0,135.0L492.8,134.6L495.7,134.6L495.0,137.0L492.6,139.5L495.4,139.7L495.6,140.0L498.0,143.3L499.9,143.7L501.6,146.8L502.4,147.8L505.7,148.3L505.3,150.0L503.9,150.7L505.0,152.0L502.6,153.4L498.9,153.3L494.3,154.0L493.0,153.5L491.2,154.7L488.7,154.4L486.8,155.4L485.3,154.9L489.3,152.2L491.8,151.7L487.5,151.3L486.7,150.3L489.6,149.5L488.1,148.1L488.6,146.3Z',
'USA':'M166.5,157.7L174.3,157.7L182.4,157.7L185.0,157.7L193.3,157.7L201.4,157.7L209.5,157.7L217.7,157.7L227.0,157.7L236.3,157.7L241.9,157.7L241.9,156.8L242.9,156.8L243.3,158.1L244.2,158.5L246.1,158.6L248.9,159.0L251.5,159.8L253.7,159.4L257.1,160.1L258.0,160.0L260.4,159.4L263.0,160.2L265.6,161.1L267.8,161.9L269.9,162.7L270.2,163.3L270.8,163.5L270.7,163.7L271.4,163.8L271.9,163.6L272.1,164.1L272.6,164.5L273.4,164.5L273.8,164.7L273.4,165.2L276.3,166.2L276.8,168.2L277.4,170.2L276.6,171.4L275.3,172.6L274.7,173.4L274.7,173.6L275.0,173.9L275.9,174.2L276.6,174.2L279.7,173.1L282.5,172.8L286.1,171.7L286.2,171.5L285.9,170.8L285.5,170.4L286.7,170.0L289.4,170.0L291.9,170.0L292.7,169.2L293.1,169.0L296.0,167.4L297.2,167.0L301.3,167.0L306.3,167.0L306.6,166.4L307.5,166.3L308.6,166.0L309.6,164.9L310.4,163.1L312.5,161.4L313.4,162.0L315.3,161.6L316.5,162.3L316.5,165.4L318.2,166.7L318.7,167.4L315.8,168.5L313.0,169.3L310.1,169.9L308.7,171.2L308.2,171.7L308.2,172.8L309.1,174.0L310.2,174.0L309.9,173.2L310.8,173.7L310.5,174.3L308.7,174.7L307.4,174.6L305.4,175.0L304.2,175.1L302.6,175.2L300.3,175.8L304.3,175.4L305.1,175.8L301.3,176.4L299.6,176.4L299.7,176.2L298.9,176.8L299.7,176.9L299.1,178.3L297.1,179.9L296.9,179.4L296.3,179.3L295.4,178.8L296.0,179.9L296.6,180.2L296.7,181.0L295.8,181.8L294.3,183.4L294.0,183.3L294.9,181.9L293.5,181.2L293.2,179.5L292.6,180.4L293.2,181.6L291.4,181.3L293.3,182.0L293.4,183.9L294.2,184.0L294.5,184.7L294.8,186.7L293.1,188.1L290.3,188.7L288.5,189.8L287.1,189.9L285.8,190.6L285.4,191.2L282.4,192.5L280.9,193.4L279.6,194.5L279.2,195.8L279.6,197.0L280.5,198.6L281.8,199.9L281.8,200.7L283.1,202.7L283.0,203.9L282.9,204.6L282.2,205.7L281.4,205.9L280.0,205.7L279.6,204.9L278.6,204.5L277.1,203.0L275.8,201.6L275.4,200.9L276.0,199.7L275.2,198.8L273.1,197.2L272.0,196.9L269.3,197.8L268.8,197.7L267.5,196.8L265.8,196.4L262.7,196.6L260.3,196.4L258.2,196.5L257.1,196.8L257.6,197.3L257.5,198.0L258.1,198.4L257.6,198.6L256.6,198.4L255.6,198.7L253.6,198.7L251.6,197.7L249.2,197.9L247.2,197.5L245.5,197.6L243.2,198.1L240.7,199.4L238.0,200.2L236.5,201.0L235.9,201.8L235.9,203.1L236.0,203.9L236.5,204.5L235.5,204.6L233.5,204.2L231.4,203.6L230.7,202.8L230.1,201.6L228.4,200.5L227.5,199.5L226.1,198.2L224.2,197.5L222.0,197.6L220.3,199.0L218.0,198.4L216.6,197.9L215.9,196.9L215.0,195.9L213.4,195.1L212.0,194.5L211.0,193.9L206.3,193.9L206.3,194.6L204.1,194.6L198.7,194.7L192.5,193.3L188.4,192.4L188.7,192.1L185.2,192.3L182.1,192.4L181.6,191.5L179.9,190.4L178.6,190.1L178.3,189.6L176.8,189.5L175.8,189.0L173.3,188.8L172.6,188.5L172.3,187.4L169.6,185.5L167.3,182.7L167.4,182.2L166.2,181.6L164.1,179.9L163.8,178.2L162.3,177.1L162.9,175.4L162.8,173.5L161.9,171.9L163.0,169.9L163.3,167.8L163.7,165.8L163.2,162.7L162.3,160.8L161.5,159.7L161.8,159.2L165.8,160.0L167.2,162.2L167.9,161.6L167.5,159.7ZM77.9,214.5L78.4,214.6L78.8,214.8L79.5,215.4L79.4,215.5L78.4,215.9L77.5,216.2L77.1,216.4L76.4,216.2L76.5,215.7L76.0,215.1L76.2,214.9L76.7,214.7L76.5,214.3L76.6,214.2L76.8,214.2ZM47.7,126.3L49.9,126.5L50.2,127.8L48.5,128.3L46.7,127.7L45.1,126.8ZM83.8,133.7L85.6,133.9L86.8,134.8L84.4,136.2L81.7,137.3L80.3,136.6L79.9,135.2L82.3,134.2ZM117.1,90.8L117.1,106.5L117.1,126.5L119.8,126.6L122.4,127.5L124.3,128.9L126.8,130.9L129.4,129.2L132.1,128.2L133.6,129.8L135.4,131.0L137.9,132.4L139.6,134.5L142.4,137.9L147.0,139.7L147.1,141.5L145.6,142.8L144.1,141.7L141.7,140.9L140.9,138.4L137.4,136.1L135.9,133.3L133.3,133.1L129.0,133.0L125.8,132.1L120.2,128.9L117.6,128.3L112.8,127.2L109.0,127.5L103.7,126.0L100.4,124.6L97.4,125.3L98.0,127.6L96.5,127.8L93.3,128.4L90.9,129.5L87.9,130.1L87.5,128.3L88.7,125.2L91.6,124.2L90.9,123.3L87.4,125.2L85.6,127.3L81.6,129.5L83.6,131.0L81.1,133.2L78.1,134.4L75.4,135.3L74.7,136.6L70.5,138.1L69.6,139.5L66.4,140.7L64.6,140.5L62.0,141.2L59.3,142.2L57.0,143.1L52.3,143.9L51.9,143.4L54.9,142.1L57.5,141.3L60.4,139.7L63.8,139.4L65.2,138.3L68.9,136.5L69.5,135.9L71.6,134.9L72.0,132.6L73.4,130.9L70.3,131.8L69.4,131.3L67.9,132.4L66.1,130.8L65.4,131.9L64.4,130.4L61.7,131.6L60.0,131.6L59.8,129.8L60.2,128.6L58.5,127.5L55.0,128.1L52.7,126.6L50.8,125.9L50.8,124.0L48.7,122.6L49.7,120.7L52.0,118.8L52.9,117.0L55.1,116.8L57.0,117.3L59.2,115.6L61.2,115.9L63.2,114.8L62.7,113.2L61.2,112.5L63.2,111.1L61.6,111.1L58.7,111.9L57.8,112.7L55.7,111.9L51.8,112.3L47.9,111.5L46.7,110.0L43.3,107.8L47.1,106.1L53.2,104.2L55.4,104.2L55.0,106.2L60.8,106.0L58.6,103.6L55.2,102.0L53.3,100.0L50.7,98.2L46.9,96.8L48.5,94.6L53.3,94.4L56.7,92.4L57.4,90.2L60.2,88.0L62.8,87.4L68.0,85.3L70.5,85.6L74.7,83.0L78.8,84.1L80.8,86.2L82.0,85.3L86.6,85.6L86.4,86.7L90.6,87.5L93.3,87.0L99.1,88.5L104.3,89.0L106.4,89.6L110.0,88.8L114.2,90.2L117.1,90.8ZM33.4,114.8L35.1,115.4L36.8,115.1L39.0,116.0L41.7,116.5L41.5,116.9L39.4,117.6L37.3,116.8L36.3,116.2L33.9,116.4L33.2,116.1Z',
'Uganda':'M593.4,248.4L587.9,248.6L584.9,248.5L583.9,248.7L582.3,249.2L581.6,249.1L581.6,247.9L582.3,247.3L582.4,246.0L583.0,245.3L584.0,244.4L585.1,244.0L586.0,243.4L584.9,243.2L585.0,241.4L586.2,240.9L587.9,241.3L590.1,240.9L592.0,240.9L593.7,240.2L595.0,241.3L595.3,242.1L596.5,243.9L595.5,245.1L594.2,246.1L593.4,246.8Z',
'Ukraine':'M587.6,150.0L588.7,150.1L589.3,149.5L590.2,149.6L593.0,149.4L594.7,150.8L594.0,151.3L594.3,152.1L596.4,152.3L597.4,153.3L597.4,153.8L600.8,154.7L602.9,154.3L604.6,155.5L606.2,155.4L610.2,156.2L610.2,157.0L609.1,158.2L609.7,159.5L609.3,160.3L606.7,160.5L605.3,161.2L605.2,162.2L603.0,162.4L601.2,163.1L598.6,163.3L596.3,164.1L596.4,165.3L596.0,165.3L595.7,164.8L594.8,164.7L592.8,164.2L592.1,164.8L591.8,164.5L587.5,164.0L587.3,163.1L584.8,163.4L583.8,164.7L581.7,166.3L580.5,165.9L579.2,166.3L578.0,165.9L578.6,165.6L579.1,164.9L579.9,164.1L579.7,163.7L580.2,163.5L580.5,163.9L582.1,163.9L582.8,163.8L582.3,163.5L582.5,163.2L581.6,162.6L581.2,161.6L580.2,161.2L580.4,160.4L579.2,159.8L578.0,159.7L576.0,159.0L574.2,159.2L573.6,159.6L572.4,159.6L571.7,160.1L569.7,160.3L568.8,160.7L567.5,160.1L565.8,160.1L564.1,159.9L562.9,160.4L562.7,159.7L561.2,159.1L561.7,158.1L562.5,157.5L563.1,157.6L562.4,156.5L564.9,154.5L566.2,154.2L566.5,153.5L565.1,151.3L566.4,151.2L567.9,150.5L570.0,150.5L572.8,150.7L575.8,151.3L578.0,151.3L579.0,151.7L580.0,151.2L580.7,151.8L583.2,151.7L584.3,152.0L584.5,150.7L585.3,150.1Z',
'Uruguay':'M344.1,297.2L345.9,297.0L348.6,298.4L349.7,298.3L352.5,299.5L354.6,300.5L356.2,301.8L355.0,302.7L355.7,303.8L354.5,305.0L351.5,306.1L349.5,305.7L348.0,305.9L345.5,305.1L343.6,305.1L342.0,304.1L342.2,302.8L342.8,302.4L342.7,300.5L343.5,298.6Z',
'Uzbekistan':'M653.5,175.0L653.4,167.0L660.4,165.7L660.9,165.9L665.1,167.5L667.3,168.3L669.9,170.3L673.1,170.0L677.8,169.8L681.1,171.4L680.9,173.6L682.2,173.6L682.8,175.3L686.2,175.4L687.0,176.4L688.0,176.3L689.2,174.8L692.8,173.4L694.3,173.0L695.1,173.2L692.8,174.6L694.9,175.4L696.8,174.8L700.0,175.9L696.5,177.4L694.5,177.2L693.3,177.3L692.9,176.7L693.5,175.7L689.9,176.2L689.0,177.6L687.7,178.7L685.4,178.6L684.7,179.5L686.7,180.0L687.3,181.5L685.8,183.5L683.7,183.1L682.2,183.1L682.3,181.9L678.7,181.0L675.8,180.0L674.0,179.0L670.9,177.6L669.6,175.5L668.7,175.1L665.7,175.2L664.7,174.8L664.4,173.1L660.7,171.9L658.4,173.2L656.1,173.9L656.6,175.0Z',
'Venezuela':'M335.7,238.7L336.0,239.1L335.0,239.7L332.0,240.3L330.0,240.6L329.3,241.0L327.1,240.6L325.1,240.4L324.6,240.5L325.8,240.9L325.7,242.0L326.0,243.0L328.4,243.1L328.5,243.5L326.6,243.9L326.2,244.6L325.1,244.8L323.1,245.2L322.6,245.7L320.5,245.8L319.0,245.0L318.1,243.4L317.4,242.8L316.4,242.5L317.8,241.7L317.7,241.3L316.9,240.9L316.4,239.8L316.6,238.7L317.2,238.1L317.7,237.3L316.7,237.0L315.2,237.2L313.2,237.1L312.1,237.3L310.2,235.9L308.6,235.7L305.1,235.8L304.5,235.3L303.8,235.2L303.7,234.8L304.0,234.2L303.8,233.6L303.2,233.2L302.9,232.5L301.4,232.4L302.2,231.4L302.5,230.3L303.3,229.7L304.4,229.2L305.1,228.4L306.8,228.2L306.7,228.5L305.1,228.7L306.0,229.5L306.0,230.3L304.8,231.2L305.8,232.5L307.0,232.4L307.6,231.3L306.8,230.7L306.6,229.5L310.0,228.8L309.6,228.0L310.6,227.5L311.6,228.7L313.5,228.7L315.3,229.6L315.4,230.1L317.8,230.1L320.7,230.0L322.3,230.7L324.4,230.9L325.9,230.4L325.9,230.0L329.3,229.9L332.6,229.9L330.2,230.3L331.2,231.1L333.4,231.2L335.4,232.0L335.8,233.3L337.3,233.3L338.3,233.6L336.2,234.6L335.9,235.2L336.9,235.8L336.2,236.1L334.5,236.3L334.6,237.0L333.8,237.5Z',
'Vietnam':'M785.2,230.2L787.6,229.6L790.4,229.5L789.2,228.5L793.8,227.3L794.1,225.3L793.5,224.2L794.0,222.6L793.3,221.4L791.3,220.3L789.5,218.8L787.3,216.8L784.0,215.8L784.8,215.2L786.5,214.8L785.5,213.3L782.1,213.3L780.9,211.8L779.3,210.4L780.8,210.0L782.9,210.0L785.6,209.8L787.9,208.9L789.2,209.5L791.7,209.9L791.3,210.8L792.6,211.5L795.3,212.0L791.7,213.4L789.4,215.0L788.8,216.2L790.9,218.0L793.4,220.1L795.9,221.1L797.6,222.5L798.8,225.5L798.5,228.3L796.2,229.4L793.1,230.4L790.8,231.8L787.4,233.3L786.5,232.2L787.2,231.2Z',
'Yemen':'M642.7,216.3L644.8,219.0L645.7,220.2L643.7,220.6L643.2,221.4L643.1,221.9L640.4,222.6L636.1,223.4L633.6,224.5L632.4,224.6L631.6,224.5L630.0,225.2L628.3,225.5L626.0,225.6L625.3,225.7L624.7,226.1L624.0,226.3L623.6,226.7L622.2,226.6L621.4,226.9L619.5,226.8L618.8,225.8L618.9,224.9L618.4,224.4L617.9,223.2L617.1,222.6L617.6,222.5L617.4,221.7L617.7,221.4L617.6,220.7L618.8,220.2L618.5,219.5L619.2,218.7L620.3,219.1L621.1,218.9L624.2,218.9L624.7,219.1L627.3,219.2L628.4,219.2L629.1,219.7L630.3,219.4L632.3,217.7L634.8,216.9Z',
'Zambia':'M584.8,260.2L585.9,260.6L587.0,260.9L588.7,261.1L590.3,261.6L591.6,262.3L592.3,263.7L591.8,264.1L591.3,265.4L591.8,266.8L590.9,267.3L590.1,268.9L591.5,269.3L583.3,270.6L583.5,271.8L581.5,272.0L579.9,272.7L579.6,273.2L578.6,273.4L576.2,274.7L574.7,275.8L573.8,275.9L572.9,275.7L569.9,275.5L569.4,275.4L569.4,275.2L568.3,274.8L566.5,274.7L564.3,275.1L562.5,274.1L560.7,272.7L560.8,267.5L566.5,267.6L566.2,267.0L566.6,266.4L566.2,265.6L566.5,264.8L566.2,264.3L567.1,264.4L567.3,264.9L568.6,264.8L570.3,265.0L571.2,265.7L573.4,266.0L575.0,265.4L575.7,266.3L577.7,266.5L578.7,267.2L579.9,268.1L582.0,268.1L581.7,266.4L581.0,266.7L579.1,266.0L578.3,265.7L578.7,264.1L579.2,262.2L578.5,261.5L579.3,260.5L580.1,260.3L583.7,260.0Z',
'Zimbabwe':'M586.0,283.1L584.6,282.9L583.6,283.1L582.3,282.8L581.2,282.8L579.5,282.0L577.4,281.8L576.6,280.7L576.6,280.1L575.4,279.9L572.3,278.1L571.5,277.1L570.9,276.8L569.9,275.5L572.9,275.7L573.8,275.9L574.7,275.8L576.2,274.7L578.6,273.4L579.6,273.2L579.9,272.7L581.5,272.0L583.5,271.8L583.7,272.4L586.0,272.4L587.2,272.7L587.8,273.1L589.1,273.3L590.5,273.8L590.5,275.9L590.0,277.0L589.9,278.3L590.3,278.8L590.0,279.8L589.6,279.9L588.9,281.2Z',
// Island nations (small circle/dot paths at correct geographic positions)
'Fiji':'M972.0,290.0L973.5,289.0L975.0,290.0L974.5,291.5L973.0,291.5Z',
'Samoa':'M987.5,285.0L989.0,284.0L990.5,285.0L990.0,286.5L988.0,286.5Z',
'Tonga':'M979.5,296.0L981.0,295.0L982.5,296.0L982.0,297.5L980.0,297.5Z',
'Maldives':'M710.5,238.0L711.5,236.5L712.5,238.0L712.5,240.5L711.5,241.5L710.5,240.5Z',
'Mauritius':'M650.5,290.5L651.5,289.5L653.0,290.5L652.5,292.0L651.0,292.0Z',
'Seychelles':'M643.5,256.5L644.5,255.5L646.0,256.5L645.5,258.0L644.0,258.0Z',
'Bahamas':'M283.5,205.5L285.0,204.5L287.0,205.5L286.5,207.0L284.5,207.5L283.0,206.5Z',
'Puerto Rico':'M305.5,217.5L307.5,216.8L309.5,217.5L309.0,218.8L307.0,219.3L305.5,218.5Z',
'Barbados':'M316.0,226.5L317.0,226.0L318.0,226.5L317.5,227.5L316.5,227.5Z',
'Antigua and Barbuda':'M313.5,221.0L314.5,220.5L315.5,221.0L315.0,222.0L314.0,222.0Z',
'Grenada':'M311.5,229.5L312.5,229.0L313.5,229.5L313.0,230.5L312.0,230.5Z',
'Saint Lucia':'M314.0,226.0L315.0,225.5L316.0,226.0L315.5,227.0L314.5,227.0Z',
'Saint Kitts and Nevis':'M312.5,220.0L313.5,219.5L314.5,220.0L314.0,221.0L313.0,221.0Z',
'Saint Vincent':'M312.5,228.0L313.5,227.5L314.5,228.0L314.0,229.0L313.0,229.0Z',
'Dominica':'M314.0,224.0L315.0,223.5L316.0,224.0L315.5,225.0L314.5,225.0Z',
'Martinique':'M314.5,225.0L315.5,224.5L316.5,225.0L316.0,226.0L315.0,226.0Z',
'Guadeloupe':'M313.0,222.5L314.0,222.0L315.0,222.5L314.5,223.5L313.5,223.5Z',
'US Virgin Islands':'M309.0,219.0L310.0,218.5L311.0,219.0L310.5,220.0L309.5,220.0Z',
'British Virgin Islands':'M308.0,218.5L309.0,218.0L310.0,218.5L309.5,219.5L308.5,219.5Z',
'Aruba':'M303.0,228.5L304.0,228.0L305.0,228.5L304.5,229.5L303.5,229.5Z',
'Curacao':'M305.0,228.0L306.0,227.5L307.0,228.0L306.5,229.0L305.5,229.0Z',
'Turks and Caicos':'M298.0,212.5L299.5,212.0L301.0,212.5L300.5,213.5L298.5,213.5Z',
'Palau':'M863.0,237.0L864.5,236.0L866.0,237.0L865.5,238.5L864.0,238.5Z',
'Marshall Islands':'M925.0,238.0L927.0,237.0L929.0,238.0L928.5,239.5L925.5,239.5Z',
'Micronesia':'M895.0,240.0L897.0,239.0L899.0,240.0L898.5,241.5L895.5,241.5Z',
'Kiribati':'M960.0,252.0L962.0,251.0L964.0,252.0L963.5,253.5L960.5,253.5Z',
'Nauru':'M931.0,249.5L932.0,249.0L933.0,249.5L932.5,250.5L931.5,250.5Z',
'Tuvalu':'M963.0,270.5L964.5,269.5L966.0,270.5L965.5,271.5L963.5,271.5Z',
'Solomon Islands':'M939.0,268.5L941.5,267.0L944.0,268.5L943.5,270.5L940.0,270.5Z',
'Vanuatu':'M950.5,279.5L952.0,278.0L953.5,279.5L953.0,282.0L951.0,282.0Z',
'Cape Verde':'M443.5,223.5L445.0,222.5L446.5,223.5L446.0,225.0L444.0,225.0Z',
'Sao Tome and Principe':'M510.0,249.0L511.5,248.0L513.0,249.0L512.5,250.5L510.5,250.5Z',
'Comoros':'M616.0,272.0L617.5,271.0L619.0,272.0L618.5,273.5L616.5,273.5Z',
'Vatican City':'M533.5,175.5L534.0,175.0L534.5,175.5L534.0,176.0Z'
};
const NEIGHBORS = {
'Afghanistan':['China','Iran','Pakistan','Tajikistan','Turkmenistan','Uzbekistan'],
'Albania':['Greece','Kosovo','Montenegro','North Macedonia'],
'Algeria':['Libya','Mali','Mauritania','Morocco','Niger','Tunisia'],
'Andorra':['France','Spain'],
'Angola':['Congo','DR Congo','Namibia','Zambia'],
'Argentina':['Bolivia','Brazil','Chile','Paraguay','Uruguay'],
'Armenia':['Azerbaijan','Georgia','Iran','Turkey'],
'Austria':['Czech Republic','Germany','Hungary','Italy','Liechtenstein','Slovakia','Slovenia','Switzerland'],
'Azerbaijan':['Armenia','Georgia','Iran','Russia','Turkey'],
'Bangladesh':['India','Myanmar'],
'Belarus':['Latvia','Lithuania','Poland','Russia','Ukraine'],
'Belgium':['France','Germany','Luxembourg','Netherlands'],
'Belize':['Guatemala','Mexico'],
'Benin':['Burkina Faso','Niger','Nigeria','Togo'],
'Bhutan':['China','India'],
'Bolivia':['Argentina','Brazil','Chile','Paraguay','Peru'],
'Bosnia & Herz.':['Croatia','Montenegro','Serbia'],
'Botswana':['Namibia','South Africa','Zambia','Zimbabwe'],
'Brazil':['Argentina','Bolivia','Colombia','Guyana','Paraguay','Peru','Suriname','Uruguay','Venezuela'],
'Brunei':['Malaysia'],
'Bulgaria':['Greece','North Macedonia','Romania','Serbia','Turkey'],
'Burkina Faso':['Benin','Ivory Coast','Ghana','Mali','Niger','Togo'],
'Burundi':['DR Congo','Rwanda','Tanzania'],
'Cambodia':['Laos','Thailand','Vietnam'],
'Cameroon':['Central African Rep.','Chad','Congo','Equatorial Guinea','Gabon','Nigeria'],
'Canada':['USA'],
'Central African Rep.':['Cameroon','Chad','Congo','DR Congo','South Sudan','Sudan'],
'Chad':['Cameroon','Central African Rep.','Libya','Niger','Nigeria','Sudan'],
'Chile':['Argentina','Bolivia','Peru'],
'China':['Afghanistan','Bhutan','India','Kazakhstan','Kyrgyzstan','Laos','Mongolia','Myanmar','Nepal','North Korea','Pakistan','Russia','Tajikistan','Vietnam'],
'Colombia':['Brazil','Ecuador','Panama','Peru','Venezuela'],
'Congo':['Angola','Cameroon','Central African Rep.','DR Congo','Gabon'],
'Costa Rica':['Nicaragua','Panama'],
'Croatia':['Bosnia & Herz.','Hungary','Montenegro','Serbia','Slovenia'],
'Czech Republic':['Austria','Germany','Poland','Slovakia'],
'DR Congo':['Angola','Burundi','Central African Rep.','Congo','Rwanda','South Sudan','Tanzania','Uganda','Zambia'],
'Denmark':['Germany'],
'Djibouti':['Eritrea','Ethiopia','Somalia'],
'Dominican Rep.':['Haiti'],
'Ecuador':['Colombia','Peru'],
'Egypt':['Israel','Libya','Sudan'],
'El Salvador':['Guatemala','Honduras'],
'Equatorial Guinea':['Cameroon','Gabon'],
'Eritrea':['Djibouti','Ethiopia','Sudan'],
'Estonia':['Latvia','Russia'],
'Eswatini':['Mozambique','South Africa'],
'Ethiopia':['Djibouti','Eritrea','Kenya','Somalia','South Sudan','Sudan'],
'Finland':['Norway','Russia','Sweden'],
'France':['Andorra','Belgium','Germany','Italy','Luxembourg','Monaco','Spain','Switzerland'],
'Gabon':['Cameroon','Congo','Equatorial Guinea'],
'Gambia':['Senegal'],
'Georgia':['Armenia','Azerbaijan','Russia','Turkey'],
'Germany':['Austria','Belgium','Czech Republic','Denmark','France','Luxembourg','Netherlands','Poland','Switzerland'],
'Ghana':['Burkina Faso','Ivory Coast','Togo'],
'Greece':['Albania','Bulgaria','North Macedonia','Turkey'],
'Guatemala':['Belize','El Salvador','Honduras','Mexico'],
'Guinea':['Guinea-Bissau','Ivory Coast','Liberia','Mali','Senegal','Sierra Leone'],
'Guinea-Bissau':['Guinea','Senegal'],
'Guyana':['Brazil','Suriname','Venezuela'],
'Haiti':['Dominican Rep.'],
'Honduras':['El Salvador','Guatemala','Nicaragua'],
'Hungary':['Austria','Croatia','Romania','Serbia','Slovakia','Slovenia','Ukraine'],
'India':['Bangladesh','Bhutan','China','Myanmar','Nepal','Pakistan'],
'Indonesia':['Malaysia','Papua New Guinea'],
'Iran':['Afghanistan','Armenia','Azerbaijan','Iraq','Pakistan','Turkey','Turkmenistan'],
'Iraq':['Iran','Jordan','Kuwait','Saudi Arabia','Syria','Turkey'],
'Israel':['Egypt','Jordan','Lebanon','Syria'],
'Italy':['Austria','France','San Marino','Slovenia','Switzerland'],
'Ivory Coast':['Burkina Faso','Ghana','Guinea','Liberia','Mali'],
'Jordan':['Iraq','Israel','Saudi Arabia','Syria'],
'Kazakhstan':['China','Kyrgyzstan','Russia','Turkmenistan','Uzbekistan'],
'Kenya':['Ethiopia','Somalia','South Sudan','Tanzania','Uganda'],
'Kosovo':['Albania','Montenegro','North Macedonia','Serbia'],
'Kuwait':['Iraq','Saudi Arabia'],
'Kyrgyzstan':['China','Kazakhstan','Tajikistan','Uzbekistan'],
'Laos':['Cambodia','China','Myanmar','Thailand','Vietnam'],
'Latvia':['Belarus','Estonia','Lithuania','Russia'],
'Lebanon':['Israel','Syria'],
'Lesotho':['South Africa'],
'Liberia':['Guinea','Ivory Coast','Sierra Leone'],
'Libya':['Algeria','Chad','Egypt','Niger','Sudan','Tunisia'],
'Liechtenstein':['Austria','Switzerland'],
'Lithuania':['Belarus','Latvia','Poland','Russia'],
'Luxembourg':['Belgium','France','Germany'],
'Malawi':['Mozambique','Tanzania','Zambia'],
'Malaysia':['Brunei','Indonesia','Thailand'],
'Mali':['Algeria','Burkina Faso','Guinea','Ivory Coast','Mauritania','Niger','Senegal'],
'Mauritania':['Algeria','Mali','Senegal'],
'Mexico':['Belize','Guatemala','USA'],
'Moldova':['Romania','Ukraine'],
'Monaco':['France'],
'Mongolia':['China','Russia'],
'Montenegro':['Albania','Bosnia & Herz.','Croatia','Kosovo','Serbia'],
'Morocco':['Algeria','Spain'],
'Mozambique':['Eswatini','Malawi','South Africa','Tanzania','Zambia','Zimbabwe'],
'Myanmar':['Bangladesh','China','India','Laos','Thailand'],
'Namibia':['Angola','Botswana','South Africa','Zambia'],
'Nepal':['China','India'],
'Netherlands':['Belgium','Germany'],
'Nicaragua':['Costa Rica','Honduras'],
'Niger':['Algeria','Benin','Burkina Faso','Chad','Libya','Mali','Nigeria'],
'Nigeria':['Benin','Cameroon','Chad','Niger'],
'North Korea':['China','South Korea','Russia'],
'North Macedonia':['Albania','Bulgaria','Greece','Kosovo','Serbia'],
'Norway':['Finland','Russia','Sweden'],
'Oman':['Saudi Arabia','UAE','Yemen'],
'Pakistan':['Afghanistan','China','India','Iran'],
'Panama':['Colombia','Costa Rica'],
'Papua New Guinea':['Indonesia'],
'Paraguay':['Argentina','Bolivia','Brazil'],
'Peru':['Bolivia','Brazil','Chile','Colombia','Ecuador'],
'Poland':['Belarus','Czech Republic','Germany','Lithuania','Russia','Slovakia','Ukraine'],
'Portugal':['Spain'],
'Qatar':['Saudi Arabia'],
'Romania':['Bulgaria','Hungary','Moldova','Serbia','Ukraine'],
'Russia':['Azerbaijan','Belarus','China','Estonia','Finland','Georgia','Kazakhstan','Latvia','Lithuania','Mongolia','North Korea','Norway','Poland','Ukraine'],
'Rwanda':['Burundi','DR Congo','Tanzania','Uganda'],
'San Marino':['Italy'],
'Saudi Arabia':['Iraq','Jordan','Kuwait','Oman','Qatar','UAE','Yemen'],
'Senegal':['Gambia','Guinea','Guinea-Bissau','Mali','Mauritania'],
'Serbia':['Bosnia & Herz.','Bulgaria','Croatia','Hungary','Kosovo','Montenegro','North Macedonia','Romania'],
'Sierra Leone':['Guinea','Liberia'],
'Singapore':['Malaysia'],
'Slovakia':['Austria','Czech Republic','Hungary','Poland','Ukraine'],
'Slovenia':['Austria','Croatia','Hungary','Italy'],
'Somalia':['Djibouti','Ethiopia','Kenya'],
'South Africa':['Botswana','Eswatini','Lesotho','Mozambique','Namibia','Zimbabwe'],
'South Korea':['North Korea'],
'South Sudan':['Central African Rep.','DR Congo','Ethiopia','Kenya','Sudan','Uganda'],
'Spain':['Andorra','France','Morocco','Portugal'],
'Sudan':['Central African Rep.','Chad','Egypt','Eritrea','Ethiopia','Libya','South Sudan'],
'Suriname':['Brazil','Guyana'],
'Sweden':['Finland','Norway'],
'Switzerland':['Austria','France','Germany','Italy','Liechtenstein'],
'Syria':['Iraq','Israel','Jordan','Lebanon','Turkey'],
'Tajikistan':['Afghanistan','China','Kyrgyzstan','Uzbekistan'],
'Tanzania':['Burundi','DR Congo','Kenya','Malawi','Mozambique','Rwanda','Uganda','Zambia'],
'Thailand':['Cambodia','Laos','Malaysia','Myanmar'],
'Togo':['Benin','Burkina Faso','Ghana'],
'Tunisia':['Algeria','Libya'],
'Turkey':['Armenia','Azerbaijan','Bulgaria','Georgia','Greece','Iran','Iraq','Syria'],
'Turkmenistan':['Afghanistan','Iran','Kazakhstan','Uzbekistan'],
'Uganda':['DR Congo','Kenya','Rwanda','South Sudan','Tanzania'],
'Ukraine':['Belarus','Hungary','Moldova','Poland','Romania','Russia','Slovakia'],
'UAE':['Oman','Saudi Arabia'],
'USA':['Canada','Mexico'],
'Uruguay':['Argentina','Brazil'],
'Uzbekistan':['Afghanistan','Kazakhstan','Kyrgyzstan','Tajikistan','Turkmenistan'],
'Venezuela':['Brazil','Colombia','Guyana'],
'Vietnam':['Cambodia','China','Laos'],
'Yemen':['Oman','Saudi Arabia'],
'Zambia':['Angola','Botswana','DR Congo','Malawi','Mozambique','Namibia','Tanzania','Zimbabwe'],
'Zimbabwe':['Botswana','Mozambique','South Africa','Zambia']
};

const BDR_REGIONS = {
  all:{en:'🌍 All',de:'🌍 Alle',fr:'🌍 Tous',es:'🌍 Todo'},
  europe:{en:'🌍 Europe',de:'🌍 Europa',fr:'🌍 Europe',es:'🌍 Europa'},
  asia:{en:'🌏 Asia',de:'🌏 Asien',fr:'🌏 Asie',es:'🌏 Asia'},
  africa:{en:'🌍 Africa',de:'🌍 Afrika',fr:'🌍 Afrique',es:'🌍 África'},
  americas:{en:'🌎 Americas',de:'🌎 Amerika',fr:'🌎 Amériques',es:'🌎 Américas'},
};

const BDR_REGION_COUNTRIES = {
  europe:['Albania','Andorra','Austria','Belarus','Belgium','Bosnia & Herz.','Bulgaria','Croatia','Czech Republic','Denmark','Estonia','Finland','France','Germany','Greece','Hungary','Italy','Kosovo','Latvia','Liechtenstein','Lithuania','Luxembourg','Moldova','Monaco','Montenegro','Netherlands','North Macedonia','Norway','Poland','Portugal','Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Turkey','Ukraine'],
  asia:['Afghanistan','Armenia','Azerbaijan','Bangladesh','Bhutan','Brunei','Cambodia','China','Georgia','India','Indonesia','Iran','Iraq','Israel','Jordan','Kazakhstan','Kuwait','Kyrgyzstan','Laos','Lebanon','Malaysia','Mongolia','Myanmar','Nepal','North Korea','Oman','Pakistan','Papua New Guinea','Qatar','Saudi Arabia','Singapore','South Korea','Syria','Tajikistan','Thailand','Turkey','Turkmenistan','UAE','Uzbekistan','Vietnam','Yemen'],
  africa:['Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cameroon','Central African Rep.','Chad','Congo','DR Congo','Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia','Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Ivory Coast','Kenya','Lesotho','Liberia','Libya','Malawi','Mali','Mauritania','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','Senegal','Sierra Leone','Somalia','South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe'],
  americas:['Argentina','Belize','Bolivia','Brazil','Canada','Chile','Colombia','Costa Rica','Dominican Rep.','Ecuador','El Salvador','Guatemala','Guyana','Haiti','Honduras','Mexico','Nicaragua','Panama','Paraguay','Peru','Suriname','USA','Uruguay','Venezuela']
};

// ═══════════════════════════════════════════════════════
// MAP SNIPER — Click where the country is on the map
// ═══════════════════════════════════════════════════════
var msState = {};
var msCountryPool = [];
var msCenters = {};

// Manual center overrides for countries with wrapping/distant territories
var MS_CENTER_OVERRIDES = {
  'Russia':{x:680,y:130},
  'USA':{x:190,y:175},
  'France':{x:504,y:166},
  'Canada':{x:215,y:130},
  'Netherlands':{x:512,y:153},
  'Denmark':{x:524,y:141},
  'UK':{x:497,y:148},
  'New Zealand':{x:960,y:320},
  'Portugal':{x:493,y:177},
  'Spain':{x:500,y:175},
  'Norway':{x:527,y:125},
  'Malta':{x:538.5,y:188.5},
  'Vatican City':{x:534.0,y:175.5},
};

// Compute center of each country's SVG path (bounding box center)
function msComputeCenters(){
  if(Object.keys(msCenters).length>0) return;
  for(var name in MAP_PATHS){
    // Use override if available
    if(MS_CENTER_OVERRIDES[name]){
      msCenters[name]=MS_CENTER_OVERRIDES[name];
      continue;
    }
    var d=MAP_PATHS[name];
    var nums=d.match(/[\d.]+/g);
    if(!nums||nums.length<2)continue;
    var xs=[],ys=[];
    for(var i=0;i<nums.length;i+=2){
      xs.push(parseFloat(nums[i]));
      if(i+1<nums.length) ys.push(parseFloat(nums[i+1]));
    }
    var minX=Math.min.apply(null,xs),maxX=Math.max.apply(null,xs);
    var minY=Math.min.apply(null,ys),maxY=Math.max.apply(null,ys);
    // If country spans >400 SVG units, it wraps — skip auto-calculation
    if(maxX-minX>400){
      msCenters[name]={x:500,y:(minY+maxY)/2};
      continue;
    }
    msCenters[name]={x:(minX+maxX)/2,y:(minY+maxY)/2};
  }
}

// Build list of playable countries (ones that exist in MAP_PATHS and have reasonable size)
// Official UN-recognized countries + commonly recognized states (no territories/dependencies/regions)
var MS_OFFICIAL_COUNTRIES = new Set(['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia & Herz.','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cape Verde','Central African Rep.','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','DR Congo','Denmark','Djibouti','Dominican Rep.','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','UAE','UK','USA','Uganda','Ukraine','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe','Kosovo','East Timor','Greenland']);

function msBuildPool(){
  msCenters={}; // reset to recompute with any new islands
  msComputeCenters();
  msCountryPool=[];
  var skip=['Antarctica','French Southern Territories','Western Sahara'];
  for(var name in MAP_PATHS){
    if(skip.indexOf(name)>=0) continue;
    if(!msCenters[name]) continue;
    if(!MS_OFFICIAL_COUNTRIES.has(name)) continue;
    msCountryPool.push(name);
  }
}

// Country difficulty tiers
var MS_TIERS = {
  easy: ['USA','Canada','Brazil','Russia','China','India','Australia','France','Germany','Italy','Spain','UK','Japan','Mexico','Egypt','South Africa','Argentina','Turkey','Saudi Arabia','Iran','Indonesia','Greenland','Mongolia','Kazakhstan','Algeria','Libya','Sudan','DR Congo','Peru','Colombia','Chile','Nigeria','Ethiopia','Tanzania','Kenya','Pakistan','Afghanistan','Iraq','Thailand','Vietnam','North Korea','South Korea','Poland','Ukraine','Sweden','Norway','Finland','Iceland','New Zealand','Cuba','Madagascar','Papua New Guinea'],
  medium: ['Portugal','Ireland','Denmark','Netherlands','Belgium','Switzerland','Austria','Czech Republic','Hungary','Romania','Bulgaria','Greece','Serbia','Croatia','Morocco','Tunisia','Senegal','Ghana','Cameroon','Angola','Mozambique','Zimbabwe','Zambia','Uganda','Nepal','Bangladesh','Myanmar','Cambodia','Laos','Malaysia','Philippines','Sri Lanka','Jordan','Israel','Lebanon','Syria','Oman','UAE','Qatar','Kuwait','Georgia','Azerbaijan','Armenia','Uruguay','Paraguay','Ecuador','Bolivia','Venezuela','Guatemala','Honduras','Panama','Jamaica','Haiti','Dominican Rep.','Trinidad and Tobago','Taiwan'],
  hard: ['Albania','North Macedonia','Montenegro','Bosnia & Herz.','Slovenia','Slovakia','Moldova','Belarus','Lithuania','Latvia','Estonia','Kosovo','Luxembourg','Liechtenstein','Andorra','Monaco','Malta','Cyprus','Bahrain','Bhutan','Brunei','East Timor','Singapore','Djibouti','Eritrea','Gambia','Guinea-Bissau','Lesotho','Eswatini','Burundi','Rwanda','Togo','Benin','Equatorial Guinea','Comoros','Sao Tome and Principe','Cape Verde','Seychelles','Mauritius','Maldives','Fiji','Samoa','Tonga','Vanuatu','Solomon Islands','Kiribati','Nauru','Tuvalu','Palau','Marshall Islands','Micronesia','Bahamas','Barbados','Grenada','Saint Lucia','Saint Kitts and Nevis','Saint Vincent','Dominica','Antigua and Barbuda','Puerto Rico','Martinique','Guadeloupe','Aruba','Curacao','Turks and Caicos','US Virgin Islands','British Virgin Islands']
};

var msDifficulty = 'medium';

// Override launchGTC to show Map Sniper setup
function launchGTC(){
  showScreen('ms-setup');
  msApplyLang();
}

function msApplyLang(){
  var el;
  el=document.getElementById('ms-setup-title');if(el)el.textContent=T.m3name||'Map Sniper';
  el=document.getElementById('ms-setup-sub');if(el)el.textContent=T.m3desc||'A country name appears — click where it is on the map. Closer = more points.';
  el=document.getElementById('ms-setup-start');if(el)el.textContent=T.capStart?T.capStart.replace('Quiz','Map Sniper'):(curLang==='de'?'Spiel starten →':curLang==='fr'?'Commencer →':curLang==='es'?'Iniciar →':'Start Game →');
  el=document.getElementById('ms-diff-easy');if(el){var n=el.querySelector('.diff-name');if(n)n.textContent=T.diffEasy||'Easy';}
  el=document.getElementById('ms-diff-medium');if(el){var n=el.querySelector('.diff-name');if(n)n.textContent=T.diffMedium||'Medium';}
  el=document.getElementById('ms-diff-hard');if(el){var n=el.querySelector('.diff-name');if(n)n.textContent=T.diffHard||'Hard';}
}

function msSetDifficulty(d){
  msDifficulty=d;
  ['easy','medium','hard'].forEach(function(x){
    var btn=document.getElementById('ms-diff-'+x);
    if(btn) btn.classList.toggle('active-violet',x===d);
  });
}

function msStartGame(){
  msBuildPool();
  // Filter pool by difficulty
  var tierPool=[];
  if(msDifficulty==='easy') tierPool=MS_TIERS.easy;
  else if(msDifficulty==='hard') tierPool=MS_TIERS.hard;
  else tierPool=[].concat(MS_TIERS.easy,MS_TIERS.medium);

  var filtered=msCountryPool.filter(function(name){return tierPool.indexOf(name)>=0;});
  if(filtered.length<10) filtered=msCountryPool; // fallback

  msState={
    pool:shuffle([...filtered]).slice(0,10),
    round:0,total:10,score:0,correct:0,lastMode:'gtc',
    clicked:false,rounds:[]
  };
  msRenderMap();
  msRound();
  showScreen('gtc');
}

// Zoom & pan state
var msZoomLevel = 1;
var msPanX = 0, msPanY = 0;
var msDragging = false, msDragStartX = 0, msDragStartY = 0, msPanStartX = 0, msPanStartY = 0;
var msDragMoved = false;

function msZoomAt(factor, cx, cy){
  var wrap = document.getElementById('ms-map-wrap');
  if(!wrap) return;
  var oldZoom = msZoomLevel;
  var newZoom = Math.max(1, Math.min(8, oldZoom * factor));
  // Zoom toward the cursor position
  var wRect = wrap.getBoundingClientRect();
  var mx = cx - wRect.left;
  var my = cy - wRect.top;
  msPanX = mx - (mx - msPanX) * (newZoom / oldZoom);
  msPanY = my - (my - msPanY) * (newZoom / oldZoom);
  msZoomLevel = newZoom;
  if(msZoomLevel <= 1.01){ msZoomLevel = 1; msPanX = 0; msPanY = 0; }
  msClampPan();
  msApplyTransform();
}

function msZoom(factor){
  var wrap = document.getElementById('ms-map-wrap');
  if(!wrap) return;
  var r = wrap.getBoundingClientRect();
  msZoomAt(factor, r.left + r.width/2, r.top + r.height/2);
}

function msZoomReset(){
  msZoomLevel = 1; msPanX = 0; msPanY = 0;
  msApplyTransform();
}

function msClampPan(){
  var wrap = document.getElementById('ms-map-wrap');
  if(!wrap) return;
  var w = wrap.offsetWidth, h = wrap.offsetHeight || w * 0.5;
  var maxPanX = w * (msZoomLevel - 1);
  var maxPanY = h * (msZoomLevel - 1);
  msPanX = Math.max(-maxPanX, Math.min(0, msPanX));
  msPanY = Math.max(-maxPanY, Math.min(0, msPanY));
}

function msApplyTransform(){
  var inner = document.getElementById('ms-map-inner');
  if(inner) inner.style.transform = 'translate('+msPanX+'px,'+msPanY+'px) scale('+msZoomLevel+')';
}

function msInitPanZoom(){
  var wrap = document.getElementById('ms-map-wrap');
  if(!wrap) return;

  // Mouse wheel zoom — zoom toward cursor
  wrap.addEventListener('wheel', function(e){
    e.preventDefault();
    msZoomAt(e.deltaY < 0 ? 1.35 : 1/1.35, e.clientX, e.clientY);
  }, {passive: false});

  // Mouse drag pan
  wrap.addEventListener('mousedown', function(e){
    if(msZoomLevel <= 1) return;
    msDragging = true;
    msDragMoved = false;
    msDragStartX = e.clientX; msDragStartY = e.clientY;
    msPanStartX = msPanX; msPanStartY = msPanY;
    wrap.style.cursor = 'grabbing';
    var inner = document.getElementById('ms-map-inner');
    if(inner) inner.style.transition = 'none';
  });
  window.addEventListener('mousemove', function(e){
    if(!msDragging) return;
    var dx = e.clientX - msDragStartX, dy = e.clientY - msDragStartY;
    if(Math.abs(dx) > 3 || Math.abs(dy) > 3) msDragMoved = true;
    msPanX = msPanStartX + dx;
    msPanY = msPanStartY + dy;
    msClampPan();
    msApplyTransform();
  });
  window.addEventListener('mouseup', function(){
    if(msDragging){
      msDragging = false;
      var wrap2 = document.getElementById('ms-map-wrap');
      if(wrap2) wrap2.style.cursor = 'crosshair';
      var inner = document.getElementById('ms-map-inner');
      if(inner) inner.style.transition = 'transform .2s ease';
    }
  });

  // Touch: pinch zoom + one-finger pan
  var lastTouchDist = 0, lastTouchCX = 0, lastTouchCY = 0;
  wrap.addEventListener('touchstart', function(e){
    if(e.touches.length === 2){
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDist = Math.sqrt(dx*dx + dy*dy);
      lastTouchCX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      lastTouchCY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    } else if(e.touches.length === 1 && msZoomLevel > 1){
      msDragging = true; msDragMoved = false;
      msDragStartX = e.touches[0].clientX; msDragStartY = e.touches[0].clientY;
      msPanStartX = msPanX; msPanStartY = msPanY;
      var inner = document.getElementById('ms-map-inner');
      if(inner) inner.style.transition = 'none';
    }
  }, {passive: true});
  wrap.addEventListener('touchmove', function(e){
    if(e.touches.length === 2){
      e.preventDefault();
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      var dist = Math.sqrt(dx*dx + dy*dy);
      var cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      var cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      if(lastTouchDist > 0){
        msZoomAt(dist / lastTouchDist, cx, cy);
      }
      lastTouchDist = dist;
    } else if(msDragging && e.touches.length === 1){
      e.preventDefault();
      var dx2 = e.touches[0].clientX - msDragStartX;
      var dy2 = e.touches[0].clientY - msDragStartY;
      if(Math.abs(dx2) > 3 || Math.abs(dy2) > 3) msDragMoved = true;
      msPanX = msPanStartX + dx2;
      msPanY = msPanStartY + dy2;
      msClampPan();
      msApplyTransform();
    }
  }, {passive: false});
  wrap.addEventListener('touchend', function(){
    msDragging = false; lastTouchDist = 0;
    var inner = document.getElementById('ms-map-inner');
    if(inner) inner.style.transition = 'transform .2s ease';
  }, {passive: true});
}

// Micro-states that need visible marker circles on the map
var MS_MICROSTATES = {
  'Monaco':{x:520.8,y:170.8},'San Marino':{x:533.9,y:170.1},'Vatican City':{x:534.0,y:175.5},
  'Liechtenstein':{x:527.0,y:162.1},'Andorra':{x:505.4,y:172.4},'Luxembourg':{x:517.8,y:155.8},
  'Malta':{x:538.5,y:188.5},'Singapore':{x:783.8,y:244.8}
};
function msRenderMicrostateMarkers(){
  var html='';
  for(var name in MS_MICROSTATES){
    var m=MS_MICROSTATES[name];
    html+='<circle cx="'+m.x+'" cy="'+m.y+'" r="3" fill="none" stroke="rgba(255,255,255,.45)" stroke-width=".8"/>';
    html+='<circle cx="'+m.x+'" cy="'+m.y+'" r=".8" fill="rgba(255,255,255,.5)"/>';
  }
  return html;
}

function msRenderMap(){
  var svg=document.getElementById('ms-map-svg');
  if(!svg) return;
  var html='<defs>'+
    '<linearGradient id="ms-og" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="500">'+
    '<stop offset="0%" stop-color="#061525"/><stop offset="50%" stop-color="#0d3560"/><stop offset="100%" stop-color="#051220"/>'+
    '</linearGradient></defs>'+
    '<rect width="1000" height="500" fill="url(#ms-og)"/>'+
    '<g opacity=".06" stroke="#9fcee8" stroke-width=".3" fill="none">'+
    '<line x1="0" y1="247" x2="1000" y2="247"/><line x1="0" y1="197" x2="1000" y2="197"/>'+
    '<line x1="0" y1="127" x2="1000" y2="127"/><line x1="0" y1="297" x2="1000" y2="297"/>'+
    '<line x1="0" y1="366" x2="1000" y2="366"/>'+
    '<line x1="174" y1="0" x2="174" y2="500"/><line x1="338" y1="0" x2="338" y2="500"/>'+
    '<line x1="501" y1="0" x2="501" y2="500"/><line x1="665" y1="0" x2="665" y2="500"/>'+
    '<line x1="828" y1="0" x2="828" y2="500"/></g>';
  // Draw all countries
  for(var name in MAP_PATHS){
    html+='<path d="'+MAP_PATHS[name]+'" fill="#2a4a6a" stroke="#000" stroke-width=".5" stroke-linejoin="round" opacity=".85" data-country="'+name.replace(/'/g,'&#39;')+'"/>';
  }
  // Click target layer (transparent, on top)
  // Micro-state markers
  html+=msRenderMicrostateMarkers();
  html+='<rect id="ms-click-layer" width="1000" height="500" fill="transparent" style="cursor:crosshair"/>';
  svg.innerHTML=html;

  // Click handler
  var clickLayer=document.getElementById('ms-click-layer');
  if(clickLayer){
    clickLayer.onclick=function(e){if(!msDragMoved)msClick(e);};
    clickLayer.ontouchend=function(e){
      if(e.touches&&e.touches.length>0) return;
      if(msDragMoved) return;
      var touch=e.changedTouches[0];
      msClick(touch);
      e.preventDefault();
    };
  }

  // Crosshair follow
  var wrap=document.getElementById('ms-map-wrap');
  wrap.onmousemove=function(e){
    var ch=document.getElementById('ms-crosshair');
    var rect=wrap.getBoundingClientRect();
    ch.style.display='block';
    ch.style.left=(e.clientX-rect.left-16)+'px';
    ch.style.top=(e.clientY-rect.top-16)+'px';
  };
  wrap.onmouseleave=function(){document.getElementById('ms-crosshair').style.display='none';};

  // Init zoom/pan (only once)
  if(!wrap._msZoomInit){ msInitPanZoom(); wrap._msZoomInit=true; }
}

function msClick(e){
  if(msState.clicked) return;
  msState.clicked=true;

  var svg=document.getElementById('ms-map-svg');
  var wrap=document.getElementById('ms-map-wrap');
  var wrapRect=wrap.getBoundingClientRect();
  var clickX,clickY;
  if(e.clientX!==undefined){clickX=e.clientX;clickY=e.clientY;}
  else{clickX=e.pageX;clickY=e.pageY;}

  // Convert screen coordinates to SVG coordinates using the SVG's own matrix
  var svg = document.getElementById('ms-map-svg');
  var pt = svg.createSVGPoint();
  pt.x = clickX;
  pt.y = clickY;
  var ctm = svg.getScreenCTM();
  if(ctm) {
    var svgPt = pt.matrixTransform(ctm.inverse());
    var svgX = svgPt.x;
    var svgY = svgPt.y;
  } else {
    // Fallback
    var svgX = (clickX - wrapRect.left - msPanX) / (wrapRect.width * msZoomLevel) * 1000;
    var svgY = (clickY - wrapRect.top - msPanY) / (wrapRect.width * 0.5 * msZoomLevel) * 500;
  }

  var target=msState.pool[msState.round-1];
  var center=msCenters[target];
  if(!center){msNext();return;}

  // Calculate distance in SVG units
  var dx=svgX-center.x, dy=svgY-center.y;
  var dist=Math.sqrt(dx*dx+dy*dy);

  // Check if click is actually INSIDE the country polygon
  var clickedOnCountry = false;
  var svg = document.getElementById('ms-map-svg');
  if(svg){
    var paths = svg.querySelectorAll('path[data-country]');
    for(var pi=0;pi<paths.length;pi++){
      if(paths[pi].getAttribute('data-country')===target){
        var pt2 = svg.createSVGPoint();
        pt2.x = svgX; pt2.y = svgY;
        if(paths[pi].isPointInFill(pt2)){clickedOnCountry=true;}
        break;
      }
    }
  }
  // Score: 100 ONLY if you clicked inside the actual country
  var pts;
  if(clickedOnCountry) pts=100;
  else if(dist<8) pts=85;
  else if(dist<15) pts=70;
  else if(dist<25) pts=55;
  else if(dist<40) pts=40;
  else if(dist<60) pts=25;
  else if(dist<90) pts=12;
  else if(dist<130) pts=5;
  else pts=0;
  msState.score+=pts;
  if(clickedOnCountry) msState.correct++;
  // Save round data for game over recap
  if(!msState.rounds) msState.rounds=[];
  msState.rounds.push({country:target,displayName:document.getElementById('ms-country-name').textContent,pts:pts,dist:dist,hit:clickedOnCountry,clickX:svgX,clickY:svgY,centerX:center.x,centerY:center.y});
  // Achievement tracking
  try{if(clickedOnCountry)achTrack('msBullseye',1);achTrackMax('msBestScore',msState.score);if(msDifficulty==='hard'&&msState.score>=400)achTrack('msHard400',1);}catch(e){}

  // Update score display
  var scoreEl=document.getElementById('ms-score');
  if(scoreEl) scoreEl.textContent=msState.score;

  // XP
  try{awardXP(Math.max(2,Math.round(pts/5)));}catch(ex){}

  // Show marker on click position
  var markerHtml='<circle cx="'+svgX+'" cy="'+svgY+'" r="5" fill="none" stroke="'+(pts>=50?'var(--lime)':'var(--rose)')+'" stroke-width="2" opacity=".8">'+
    '<animate attributeName="r" from="5" to="20" dur="0.6s" fill="freeze"/>'+
    '<animate attributeName="opacity" from=".8" to="0" dur="0.6s" fill="freeze"/>'+
    '</circle>'+
    '<circle cx="'+svgX+'" cy="'+svgY+'" r="3" fill="'+(pts>=50?'var(--lime)':'var(--rose)')+'"/>';

  // Country highlight only (no dot)

  // Draw line between click and correct
  if(dist>15){
    markerHtml+='<line x1="'+svgX+'" y1="'+svgY+'" x2="'+center.x+'" y2="'+center.y+'" stroke="rgba(255,255,255,.15)" stroke-width="1" stroke-dasharray="4 3"/>';
  }

  // Highlight correct country
  var countryPath=MAP_PATHS[target];
  if(countryPath){
    markerHtml+='<path d="'+countryPath+'" fill="rgba(180,77,255,.2)" stroke="var(--violet)" stroke-width="1.2" stroke-linejoin="round"/>';
  }

  svg.innerHTML+=markerHtml;

  // Feedback text
  var fbText=document.getElementById('ms-fb-text');
  var fbDist=document.getElementById('ms-fb-distance');
  var distLabels={
    en:['Bullseye!','Very close!','Close!','Not bad','Way off','Missed!'],
    de:['Volltreffer!','Sehr nah!','Nah dran!','Nicht schlecht','Weit daneben','Daneben!'],
    fr:['Dans le mille!','Très proche!','Proche!','Pas mal','Loin!','Raté!'],
    es:['¡Diana!','¡Muy cerca!','¡Cerca!','No está mal','Muy lejos','¡Fallado!']
  };
  var labels=distLabels[curLang]||distLabels.en;
  var label=clickedOnCountry?labels[0]:dist<15?labels[1]:dist<30?labels[2]:dist<60?labels[3]:dist<100?labels[4]:labels[5];

  fbText.textContent=label+' +'+pts;
  fbText.style.color=pts>=50?'var(--lime)':'var(--rose)';
  fbText.style.textShadow=pts>=50?'0 0 8px rgba(184,255,16,.3)':'0 0 8px rgba(255,45,94,.3)';

  // Distance in km (rough: 1 SVG unit ≈ 40km at equator)
  var kmDist=Math.round(dist*40);
  var distWord={en:'away',de:'entfernt',fr:"d'écart",es:'de distancia'}[curLang]||'away';
  fbDist.textContent=dist<15?'':'~'+kmDist.toLocaleString()+' km '+distWord;

  // Show next button
  document.getElementById('ms-next-btn').style.display='inline-block';
}

function msRound(){
  if(msState.round>=msState.total){
    msShowGameOver();
    return;
  }
  var target=msState.pool[msState.round];
  msState.round++;
  msState.clicked=false;

  // Update HUD
  document.getElementById('ms-round-lbl').textContent=msState.round+'/'+msState.total;
  document.getElementById('gtc-prog').style.width=((msState.round-1)/msState.total*100)+'%';

  // Show country name (translated if possible)
  var displayName=target;
  try{
    var translated=bdrTranslate(target);
    if(translated) displayName=translated;
  }catch(ex){}
  document.getElementById('ms-country-name').textContent=displayName;

  // Clear feedback
  document.getElementById('ms-fb-text').textContent='';
  document.getElementById('ms-fb-distance').textContent='';
  document.getElementById('ms-next-btn').style.display='none';

  // Reset zoom and re-render clean map
  msZoomReset();
  msRenderMap();
}

function msShowGameOver(){
  showScreen('ms-over');
  var rounds=msState.rounds||[];
  var score=msState.score;
  var total=msState.total;
  var correct=msState.correct;
  var acc=total>0?Math.round(correct/total*100):0;
  var avgDist=rounds.length>0?Math.round(rounds.reduce(function(s,r){return s+r.dist;},0)/rounds.length*40):0;

  // Score + ring animation
  document.getElementById('mso-score').textContent=score;
  var maxScore=total*100;
  var pct=maxScore>0?score/maxScore:0;
  var offset=283-(283*pct);
  setTimeout(function(){document.getElementById('mso-ring').setAttribute('stroke-dashoffset',offset);},100);

  // Stats
  document.getElementById('mso-hit').textContent=correct+'/'+total;
  document.getElementById('mso-acc').textContent=acc+'%';
  document.getElementById('mso-avgdist').textContent='~'+avgDist.toLocaleString()+' km';

  // Mini map with dots
  var svg=document.getElementById('mso-map-svg');
  var html='<rect width="1000" height="500" fill="#061525"/>'+
    '<g opacity=".04" stroke="#9fcee8" stroke-width=".3" fill="none">'+
    '<line x1="0" y1="247" x2="1000" y2="247"/><line x1="0" y1="197" x2="1000" y2="197"/>'+
    '<line x1="0" y1="297" x2="1000" y2="297"/>'+
    '<line x1="174" y1="0" x2="174" y2="500"/><line x1="501" y1="0" x2="501" y2="500"/>'+
    '<line x1="828" y1="0" x2="828" y2="500"/></g>';
  // Draw country outlines faintly
  for(var name in MAP_PATHS){
    html+='<path d="'+MAP_PATHS[name]+'" fill="#1a3050" stroke="#0a1a2a" stroke-width=".3" opacity=".5"/>';
  }
  // Draw click dots
  rounds.forEach(function(r){
    var col=r.hit?'var(--lime)':r.pts>=50?'var(--amber)':'var(--rose)';
    html+='<circle cx="'+r.clickX+'" cy="'+r.clickY+'" r="5" fill="'+col+'" stroke="#fff" stroke-width="1" opacity=".85"/>';
  });
  svg.innerHTML=html;

  // Best/Worst
  if(rounds.length>0){
    var best=rounds.slice().sort(function(a,b){return b.pts-a.pts;})[0];
    var worst=rounds.slice().sort(function(a,b){return a.pts-b.pts;})[0];
    document.getElementById('mso-bestworst').innerHTML=
      'Best: <span style="color:var(--lime)">'+best.displayName+'</span> ('+best.pts+') · '+
      'Worst: <span style="color:var(--rose)">'+worst.displayName+'</span> ('+worst.pts+')';
  }

  // XP + achievements
  try{flushXP();}catch(e){}
  try{incGames();}catch(e){}
  setTimeout(function(){try{checkAchievements();}catch(e){}},600);
}

function msNext(){
  msRound();
}

// ═══════════════════════════════════════════════════════
// COUNTRY CHAIN — Party Game
// ═══════════════════════════════════════════════════════
var chainState={};
var chainTimerVal=10;
var chainTimerIv=null;
var chainPlayerCount=2;

var CHAIN_T={
  en:{title:'Country Chain',sub:'Last letter → first letter. Take turns naming countries before time runs out!',players:'PLAYERS',timer:'SECONDS PER TURN',start:'Start Game →',prompt:'NAME A COUNTRY STARTING WITH',badge:'Country Chain',player:'Player',out:'is out!',wins:'wins!',used:'Already used!',wrong:'Wrong starting letter!',notCountry:'Not a country!',timesUp:"Time's up!",draw:'Draw!'},
  de:{title:'Länder-Kette',sub:'Letzter Buchstabe → erster Buchstabe. Nennt Länder bevor die Zeit abläuft!',players:'SPIELER',timer:'SEKUNDEN PRO RUNDE',start:'Spiel starten →',prompt:'NENNE EIN LAND DAS MIT BEGINNT',badge:'Länder-Kette',player:'Spieler',out:'ist raus!',wins:'gewinnt!',used:'Schon benutzt!',wrong:'Falscher Anfangsbuchstabe!',notCountry:'Kein Land!',timesUp:'Zeit abgelaufen!',draw:'Unentschieden!'},
  fr:{title:'Chaîne de Pays',sub:'Dernière lettre → première lettre. Nommez des pays avant la fin du temps!',players:'JOUEURS',timer:'SECONDES PAR TOUR',start:'Commencer →',prompt:'NOMMEZ UN PAYS COMMENÇANT PAR',badge:'Chaîne de Pays',player:'Joueur',out:'est éliminé!',wins:'gagne!',used:'Déjà utilisé!',wrong:'Mauvaise lettre!',notCountry:'Pas un pays!',timesUp:'Temps écoulé!',draw:'Égalité!'},
  es:{title:'Cadena de Países',sub:'Última letra → primera letra. ¡Nombra países antes de que se acabe el tiempo!',players:'JUGADORES',timer:'SEGUNDOS POR TURNO',start:'Iniciar →',prompt:'NOMBRA UN PAÍS QUE EMPIECE CON',badge:'Cadena de Países',player:'Jugador',out:'¡eliminado!',wins:'¡gana!',used:'¡Ya se usó!',wrong:'¡Letra incorrecta!',notCountry:'¡No es un país!',timesUp:'¡Se acabó el tiempo!',draw:'¡Empate!'}
};

// ═══════════════════════════════════════════════════════
// GEOSPY — Find the Imposter
// ═══════════════════════════════════════════════════════
var spyState={};
var spyPlayerCount=3;
var spyTimerIv=null;
var SPY_T={
  en:{title:'Truth or Lie',sub:'Everyone gets a real fact about a country — except one player who must bluff. Vote out the liar!',players:'PLAYERS',names:'PLAYER NAMES',start:'Start Game →',player:'Player',passTo:'PASS THE PHONE TO',tap:'TAP TO REVEAL',yourFact:'YOUR FACT',youSpy:'YOU ARE THE SPY',hint:'The country is in',makeUp:'INVENT A BELIEVABLE FACT!',discuss:'DISCUSSION TIME',voteNow:'Vote Now',whoSpy:'Who is the Spy?',voteLbl:'VOTE',found:'THE SPY WAS FOUND!',notFound:'WRONG! The Spy survived!',spyWas:'The Spy was',country:'The country was',nextRound:'Next Round →',home:'← Home',continueBtn:'Continue →',m7name:'GeoSpy',m7desc:'Everyone gets a fact — except the Spy. Find the imposter!'},
  de:{title:'Truth or Lie',sub:'Jeder bekommt einen echten Fakt — bis auf einer der bluffen muss. Stimmt den Lügner raus!',players:'SPIELER',names:'SPIELERNAMEN',start:'Spiel starten →',player:'Spieler',passTo:'GIB DAS HANDY AN',tap:'TIPPE ZUM AUFDECKEN',yourFact:'DEIN FAKT',youSpy:'DU BIST DER SPION',hint:'Das Land liegt in',makeUp:'ERFINDE EINEN GLAUBWÜRDIGEN FAKT!',discuss:'DISKUSSIONSZEIT',voteNow:'Jetzt abstimmen',whoSpy:'Wer ist der Spion?',voteLbl:'ABSTIMMUNG',found:'DER SPION WURDE GEFUNDEN!',notFound:'FALSCH! Der Spion hat überlebt!',spyWas:'Der Spion war',country:'Das Land war',nextRound:'Nächste Runde →',home:'← Startseite',continueBtn:'Weiter →',m7name:'GeoSpy',m7desc:'Jeder bekommt einen Fakt — außer der Spion. Finde den Imposter!'},
  fr:{title:'Truth or Lie',sub:'Chacun reçoit un vrai fait — sauf un joueur qui doit bluffer. Votez le menteur!',players:'JOUEURS',names:'NOMS DES JOUEURS',start:'Commencer →',player:'Joueur',passTo:'PASSEZ LE TÉLÉPHONE À',tap:'APPUYEZ POUR RÉVÉLER',yourFact:'VOTRE FAIT',youSpy:'VOUS ÊTES L\'ESPION',hint:'Le pays est en',makeUp:'INVENTEZ UN FAIT CRÉDIBLE!',discuss:'TEMPS DE DISCUSSION',voteNow:'Voter maintenant',whoSpy:'Qui est l\'espion?',voteLbl:'VOTE',found:'L\'ESPION A ÉTÉ TROUVÉ!',notFound:'FAUX! L\'espion a survécu!',spyWas:'L\'espion était',country:'Le pays était',nextRound:'Manche suivante →',home:'← Accueil',continueBtn:'Continuer →',m7name:'GeoSpy',m7desc:'Chacun reçoit un fait — sauf l\'espion. Trouvez l\'imposteur!'},
  es:{title:'Truth or Lie',sub:'Todos reciben un dato real — excepto uno que debe mentir. ¡Vota al mentiroso!',players:'JUGADORES',names:'NOMBRES',start:'Iniciar →',player:'Jugador',passTo:'PASA EL TELÉFONO A',tap:'TOCA PARA REVELAR',yourFact:'TU DATO',youSpy:'ERES EL ESPÍA',hint:'El país está en',makeUp:'¡INVENTA UN DATO CREÍBLE!',discuss:'TIEMPO DE DISCUSIÓN',voteNow:'Votar ahora',whoSpy:'¿Quién es el espía?',voteLbl:'VOTO',found:'¡EL ESPÍA FUE ENCONTRADO!',notFound:'¡INCORRECTO! ¡El espía sobrevivió!',spyWas:'El espía era',country:'El país era',nextRound:'Siguiente ronda →',home:'← Inicio',continueBtn:'Continuar →',m7name:'GeoSpy',m7desc:'Todos reciben un dato — excepto el espía. ¡Encuentra al impostor!'}
};
var SPY_CONTINENTS={en:{europe:'Europe',asia:'Asia',africa:'Africa',americas:'the Americas',oceania:'Oceania'},de:{europe:'Europa',asia:'Asien',africa:'Afrika',americas:'Amerika',oceania:'Ozeanien'},fr:{europe:'Europe',asia:'Asie',africa:'Afrique',americas:'les Amériques',oceania:'Océanie'},es:{europe:'Europa',asia:'Asia',africa:'África',americas:'las Américas',oceania:'Oceanía'}};
var SPY_COUNTRY_CONTINENTS={'Germany':'europe','France':'europe','Italy':'europe','Spain':'europe','UK':'europe','Poland':'europe','Netherlands':'europe','Belgium':'europe','Sweden':'europe','Norway':'europe','Finland':'europe','Denmark':'europe','Austria':'europe','Switzerland':'europe','Portugal':'europe','Greece':'europe','Czech Republic':'europe','Romania':'europe','Hungary':'europe','Ireland':'europe','Croatia':'europe','Serbia':'europe','Bulgaria':'europe','Slovakia':'europe','Ukraine':'europe','Russia':'europe','Turkey':'europe','Iceland':'europe','Brazil':'americas','USA':'americas','Canada':'americas','Mexico':'americas','Argentina':'americas','Colombia':'americas','Peru':'americas','Chile':'americas','Venezuela':'americas','Cuba':'americas','Ecuador':'americas','Bolivia':'americas','Guatemala':'americas','Jamaica':'americas','China':'asia','Japan':'asia','India':'asia','South Korea':'asia','Thailand':'asia','Vietnam':'asia','Indonesia':'asia','Philippines':'asia','Malaysia':'asia','Bangladesh':'asia','Pakistan':'asia','Iran':'asia','Iraq':'asia','Saudi Arabia':'asia','UAE':'asia','Israel':'asia','Jordan':'asia','Nepal':'asia','Sri Lanka':'asia','Mongolia':'asia','Kazakhstan':'asia','Myanmar':'asia','Cambodia':'asia','Laos':'asia','Afghanistan':'asia','Egypt':'africa','South Africa':'africa','Nigeria':'africa','Kenya':'africa','Ethiopia':'africa','Ghana':'africa','Morocco':'africa','Tanzania':'africa','Algeria':'africa','Tunisia':'africa','Senegal':'africa','Madagascar':'africa','Cameroon':'africa','Uganda':'africa','Mozambique':'africa','Angola':'africa','DR Congo':'africa','Sudan':'africa','Australia':'oceania','New Zealand':'oceania'};

function launchSpySetup(){showScreen('spy-setup');spyApplyLang();spyRenderNameInputs();}
function spyApplyLang(){
  var t=SPY_T[curLang]||SPY_T.en;
  var el;
  el=document.getElementById('spy-setup-title');if(el)el.textContent=t.title;
  el=document.getElementById('spy-setup-sub');if(el)el.textContent=t.sub;
  el=document.getElementById('spy-lbl-players');if(el)el.textContent=t.players;
  el=document.getElementById('spy-lbl-names');if(el)el.textContent=t.names;
  el=document.getElementById('spy-start-btn');if(el)el.textContent=t.start;
}
function spySetPlayers(n){
  spyPlayerCount=n;
  [3,4,5,6].forEach(function(x){var btn=document.getElementById('spy-p'+x);if(btn)btn.classList.toggle('active-amber',x===n);});
  spyRenderNameInputs();
}
function spyRenderNameInputs(){
  var t=SPY_T[curLang]||SPY_T.en;
  var wrap=document.getElementById('spy-name-inputs');if(!wrap)return;
  wrap.innerHTML='';
  for(var i=0;i<spyPlayerCount;i++){
    var inp=document.createElement('input');
    inp.id='spy-name-'+i;inp.placeholder=t.player+' '+(i+1);inp.maxLength=15;
    inp.style.cssText='width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid rgba(255,192,32,.15);background:var(--ink);color:var(--text);font-family:inherit;font-size:.85rem;outline:none;border-left:3px solid '+MPARTY_COLORS[i];
    wrap.appendChild(inp);
  }
}

function spyStartGame(){
  var t=SPY_T[curLang]||SPY_T.en;
  // Pick random country from GTC_DATA
  var country=GTC_DATA[Math.floor(Math.random()*GTC_DATA.length)];
  var facts=(country.facts[curLang]||country.facts.en).slice();
  // Shuffle facts
  for(var i=facts.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var tmp=facts[i];facts[i]=facts[j];facts[j]=tmp;}
  // Pick spy
  var spyIdx=Math.floor(Math.random()*spyPlayerCount);
  // Build players
  var players=[];
  for(var i=0;i<spyPlayerCount;i++){
    var nameInp=document.getElementById('spy-name-'+i);
    var pName=(nameInp&&nameInp.value.trim())?sanitize(nameInp.value.trim()):(t.player+' '+(i+1));
    players.push({name:pName,color:MPARTY_COLORS[i],isSpy:i===spyIdx,fact:i===spyIdx?null:facts[i%facts.length],vote:null});
  }
  // Get continent for spy hint
  var cName=country.n;
  var continent=SPY_COUNTRY_CONTINENTS[cName]||'europe';
  var contLabel=(SPY_CONTINENTS[curLang]||SPY_CONTINENTS.en)[continent]||continent;
  var displayName=(country.names&&country.names[curLang])?country.names[curLang]:cName;

  spyState={players:players,country:cName,displayName:displayName,continent:contLabel,currentDeal:0,flipped:false,votes:{},round:1};
  showScreen('spy-deal');
  spyShowDealScreen();
}

function spyShowDealScreen(){
  var t=SPY_T[curLang]||SPY_T.en;
  var p=spyState.players[spyState.currentDeal];
  var card=document.getElementById('spy-card');
  var cardInner=document.getElementById('spy-card-inner');

  // 1. Hide card completely while changing content
  card.style.visibility='hidden';
  card.classList.remove('flipped');
  spyState.flipped=false;

  // 2. Reset BOTH fronts to identical neutral state before setting content
  document.getElementById('spy-card-normal').style.display='none';
  document.getElementById('spy-card-spy').style.display='none';

  document.getElementById('spy-pass-lbl').textContent=t.passTo;
  document.getElementById('spy-pass-name').textContent=p.name;
  document.getElementById('spy-pass-name').style.color=p.color;
  document.getElementById('spy-tap-lbl').textContent=t.tap;
  document.getElementById('spy-deal-next').style.display='none';
  document.getElementById('spy-deal-next').textContent=t.continueBtn;

  // 3. Set front content WHILE card is hidden and showing back
  setTimeout(function(){
    if(p.isSpy){
      document.getElementById('spy-card-spy').style.display='flex';
      document.getElementById('spy-you-are-spy').textContent=t.youSpy;
      document.getElementById('spy-hint').textContent=t.hint+' '+spyState.continent;
      document.getElementById('spy-card-spy-lbl').textContent=t.makeUp;
    } else {
      document.getElementById('spy-card-normal').style.display='flex';
      document.getElementById('spy-card-fact').textContent=p.fact;
      document.getElementById('spy-card-role-lbl').textContent=t.yourFact;
    }
    // 4. Show card (back side visible, front is hidden behind)
    card.style.visibility='visible';
  }, 50);
}

function spyFlipCard(){
  if(spyState.flipped) return;
  spyState.flipped=true;
  document.getElementById('spy-card').classList.add('flipped');
  setTimeout(function(){document.getElementById('spy-deal-next').style.display='inline-block';},800);
}

function spyDealNext(){
  spyState.currentDeal++;
  if(spyState.currentDeal>=spyState.players.length){
    // All players have seen their cards — go to discussion
    spyStartDiscussion();
  } else {
    spyShowDealScreen();
  }
}

function spyStartDiscussion(){
  var t=SPY_T[curLang]||SPY_T.en;
  showScreen('spy-discuss');
  document.getElementById('spy-discuss-lbl').textContent=t.discuss;
  document.getElementById('spy-vote-now-text').textContent=t.voteNow;
  // Show all facts
  var list=document.getElementById('spy-facts-list');
  list.innerHTML='';
  spyState.players.forEach(function(p,i){
    var div=document.createElement('div');
    div.className='spy-fact-card';
    div.style.animationDelay=(i*0.08)+'s';
    div.innerHTML='<div class="spy-fact-num" style="color:'+p.color+';border-color:'+p.color+'33;background:'+p.color+'12">'+(i+1)+'</div><div><div class="spy-fact-text">'+(p.isSpy?'???':p.fact)+'</div><div class="spy-fact-name" style="color:'+p.color+'">'+p.name+'</div></div>';
    list.appendChild(div);
  });
  // Wait — spy's fact shows ??? — they had to memorize their made-up fact during the deal phase
  // Start 3 min timer
  var timeLeft=180;
  var timerEl=document.getElementById('spy-timer');
  function tick(){
    var m=Math.floor(timeLeft/60);
    var s=timeLeft%60;
    timerEl.textContent=m+':'+String(s).padStart(2,'0');
    if(timeLeft<=30){timerEl.style.color='var(--rose)';timerEl.style.textShadow='0 0 16px rgba(255,45,94,.4)';}
    else{timerEl.style.color='var(--amber)';timerEl.style.textShadow='0 0 16px rgba(255,192,32,.3)';}
    if(timeLeft<=0){clearInterval(spyTimerIv);spyStopDiscussion();}
    timeLeft--;
  }
  tick();
  clearInterval(spyTimerIv);
  spyTimerIv=setInterval(tick,1000);
}

function spyStopDiscussion(){
  clearInterval(spyTimerIv);
  spyState.currentVoter=0;
  showScreen('spy-vote');
  spyShowVoteScreen();
}

function spyShowVoteScreen(){
  var t=SPY_T[curLang]||SPY_T.en;
  var voter=spyState.players[spyState.currentVoter];
  document.getElementById('spy-vote-pass-lbl').textContent=t.passTo;
  document.getElementById('spy-vote-player').textContent=voter.name;
  document.getElementById('spy-vote-player').style.color=voter.color;
  document.getElementById('spy-who-spy-lbl').textContent=t.whoSpy;
  var wrap=document.getElementById('spy-vote-buttons');
  wrap.innerHTML='';
  spyState.players.forEach(function(p,i){
    if(i===spyState.currentVoter) return; // can't vote for yourself
    var btn=document.createElement('button');
    btn.className='spy-vote-btn';
    btn.innerHTML='<div style="width:10px;height:10px;border-radius:50%;background:'+p.color+';flex-shrink:0"></div>'+p.name;
    btn.onclick=function(){spyCastVote(i);};
    wrap.appendChild(btn);
  });
}

function spyCastVote(targetIdx){
  spyState.players[spyState.currentVoter].vote=targetIdx;
  spyState.currentVoter++;
  if(spyState.currentVoter>=spyState.players.length){
    spyReveal();
  } else {
    spyShowVoteScreen();
  }
}

function spyReveal(){
  var t=SPY_T[curLang]||SPY_T.en;
  showScreen('spy-reveal');
  // Count votes
  var voteCounts={};
  spyState.players.forEach(function(p){
    if(p.vote!==null&&p.vote!==undefined){voteCounts[p.vote]=(voteCounts[p.vote]||0)+1;}
  });
  // Find most voted
  var maxVotes=0,accused=-1;
  for(var k in voteCounts){if(voteCounts[k]>maxVotes){maxVotes=voteCounts[k];accused=parseInt(k);}}
  // Find spy
  var spyIdx=spyState.players.findIndex(function(p){return p.isSpy;});
  var spyPlayer=spyState.players[spyIdx];
  var found=accused===spyIdx;
  // Achievement tracking
  try{achTrack('tolPlayed',1);if(found)achTrack('tolDetected',1);if(!found)achTrack('tolSurvived',1);}catch(e){}

  // Show result
  var iconEl=document.getElementById('spy-reveal-icon');
  var titleEl=document.getElementById('spy-reveal-title');
  var subEl=document.getElementById('spy-reveal-sub');
  var countryEl=document.getElementById('spy-reveal-country');
  var btnEl=document.getElementById('spy-reveal-btn');

  if(found){
    iconEl.innerHTML='<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>';
    titleEl.textContent=t.found;
    titleEl.style.color='var(--lime)';
    subEl.textContent=t.spyWas+' '+spyPlayer.name;
  } else {
    iconEl.innerHTML='<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--rose)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></svg>';
    titleEl.textContent=t.notFound;
    titleEl.style.color='var(--rose)';
    subEl.textContent=t.spyWas+' '+spyPlayer.name;
  }
  // Always show both buttons: Next Round + Home
  btnEl.textContent=t.nextRound;
  btnEl.onclick=function(){spyNextRound();};
  // Add home button if not already there
  var homeBtn=document.getElementById('spy-reveal-home');
  if(!homeBtn){
    homeBtn=document.createElement('button');
    homeBtn.id='spy-reveal-home';
    homeBtn.style.cssText='padding:10px 32px;border-radius:100px;background:transparent;color:var(--muted2);font-weight:700;font-size:.85rem;cursor:pointer;border:1.5px solid var(--border);font-family:inherit;margin-top:4px';
    btnEl.parentNode.insertBefore(homeBtn,btnEl.nextSibling);
  }
  homeBtn.textContent=t.home;
  homeBtn.onclick=function(){goHome();};
  countryEl.textContent=t.country+': '+spyState.displayName;

  // Show vote breakdown
  var votesEl=document.getElementById('spy-reveal-votes');
  votesEl.innerHTML='';
  spyState.players.forEach(function(p,i){
    var div=document.createElement('div');
    div.className='spy-reveal-vote';
    var votedFor=p.vote!==null?spyState.players[p.vote].name:'—';
    div.innerHTML='<span style="color:'+p.color+';font-weight:700">'+p.name+'</span><span style="color:var(--muted2)">→ '+votedFor+'</span>';
    votesEl.appendChild(div);
  });
}

function spyNextRound(){
  // New round with new country + new spy
  var t=SPY_T[curLang]||SPY_T.en;
  var country=GTC_DATA[Math.floor(Math.random()*GTC_DATA.length)];
  var facts=(country.facts[curLang]||country.facts.en).slice();
  for(var i=facts.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var tmp=facts[i];facts[i]=facts[j];facts[j]=tmp;}
  var spyIdx=Math.floor(Math.random()*spyState.players.length);
  var cName=country.n;
  var continent=SPY_COUNTRY_CONTINENTS[cName]||'europe';
  var contLabel=(SPY_CONTINENTS[curLang]||SPY_CONTINENTS.en)[continent]||continent;
  var displayName=(country.names&&country.names[curLang])?country.names[curLang]:cName;
  spyState.players.forEach(function(p,i){p.isSpy=i===spyIdx;p.fact=i===spyIdx?null:facts[i%facts.length];p.vote=null;});
  spyState.country=cName;spyState.displayName=displayName;spyState.continent=contLabel;
  spyState.currentDeal=0;spyState.flipped=false;spyState.round++;
  showScreen('spy-deal');
  spyShowDealScreen();
}

function spyNextRoundOrEnd(){
  var btn=document.getElementById('spy-reveal-btn');
  if(btn&&btn.onclick) btn.onclick();
}

// Keep old chain functions as stubs so nothing breaks
function launchChainSetup(){launchSpySetup();}
function chainSetPlayers(){}
function chainRenderNameInputs(){}
function chainStart(){}
function chainSubmit(){}
function chainApplyLang(){
  var t=CHAIN_T[curLang]||CHAIN_T.en;
  var el;
  el=document.getElementById('chain-setup-title');if(el)el.textContent=t.title;
  el=document.getElementById('chain-setup-sub');if(el)el.textContent=t.sub;
  el=document.getElementById('chain-lbl-players');if(el)el.textContent=t.players;
  el=document.getElementById('chain-lbl-timer');if(el)el.textContent=t.timer;
  el=document.getElementById('chain-start-btn');if(el)el.textContent=t.start;
  el=document.getElementById('chain-badge');if(el)el.textContent=t.badge;
}
function chainSetPlayers(n){
  chainPlayerCount=n;
  [2,3,4,5].forEach(function(x){
    var btn=document.getElementById('chain-p'+x);
    if(btn) btn.classList.toggle('active-amber',x===n);
  });
  chainRenderNameInputs();
}
function chainRenderNameInputs(){
  var t=CHAIN_T[curLang]||CHAIN_T.en;
  var wrap=document.getElementById('chain-name-inputs');
  if(!wrap) return;
  wrap.innerHTML='';
  for(var i=0;i<chainPlayerCount;i++){
    var inp=document.createElement('input');
    inp.id='chain-name-'+i;
    inp.placeholder=t.player+' '+(i+1);
    inp.maxLength=15;
    inp.style.cssText='width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid rgba(255,192,32,.15);background:var(--ink);color:var(--text);font-family:inherit;font-size:.85rem;outline:none;transition:border-color .2s';
    inp.style.borderLeftWidth='3px';
    inp.style.borderLeftColor=MPARTY_COLORS[i];
    wrap.appendChild(inp);
  }
}
function chainStart(){
  var t=CHAIN_T[curLang]||CHAIN_T.en;
  // Build all country names list
  var allNames=Object.keys(MAP_PATHS).filter(function(n){return n.length>2;});
  chainState={
    players:[], used:[], currentPlayer:0, chain:[], allNames:allNames,
    requiredLetter:'', timeLeft:chainTimerVal, maxTime:chainTimerVal
  };
  for(var i=0;i<chainPlayerCount;i++){
    var nameInp=document.getElementById('chain-name-'+i);
    var pName=(nameInp&&nameInp.value.trim())?sanitize(nameInp.value.trim()):(t.player+' '+(i+1));
    chainState.players.push({name:pName,alive:true,score:0,color:MPARTY_COLORS[i]});
  }
  // Pick random starting country
  var start=allNames[Math.floor(Math.random()*allNames.length)];
  chainState.chain.push(start);
  chainState.used.push(start.toLowerCase());
  chainState.requiredLetter=start.slice(-1).toUpperCase();
  if(chainState.requiredLetter==='A'&&start.endsWith('ia'))chainState.requiredLetter=start.slice(-1).toUpperCase();
  showScreen('chain');
  chainRender();
  chainStartTimer();
}
function chainRender(){
  var t=CHAIN_T[curLang]||CHAIN_T.en;
  var p=chainState.players[chainState.currentPlayer];
  document.getElementById('chain-player-tag').textContent=p.name;
  document.getElementById('chain-player-tag').style.color=p.color;
  document.getElementById('chain-letter').textContent=chainState.requiredLetter;
  document.getElementById('chain-prompt-lbl').textContent=t.prompt;
  document.getElementById('chain-round-pill').textContent=chainState.chain.length+' '+({en:'countries',de:'Länder',fr:'pays',es:'países'}[curLang]||'countries');
  // Chain chips
  var list=document.getElementById('chain-list');
  list.innerHTML='';
  chainState.chain.slice(-8).forEach(function(c){
    var chip=document.createElement('span');
    chip.style.cssText='display:inline-block;padding:4px 10px;border-radius:100px;background:rgba(255,192,32,.06);border:1px solid rgba(255,192,32,.15);font-size:.72rem;font-weight:700;color:var(--amber);animation:fadeUp .2s ease';
    chip.textContent=c;
    list.appendChild(chip);
  });
  // Input
  var inp=document.getElementById('chain-inp');
  inp.value='';inp.disabled=false;
  inp.placeholder=chainState.requiredLetter+'...';
  inp.style.borderColor='rgba(255,192,32,.2)';
  setTimeout(function(){inp.focus();},100);
  document.getElementById('chain-feedback').textContent='';
  // Eliminated
  var elim=chainState.players.filter(function(p){return !p.alive;});
  document.getElementById('chain-eliminated').textContent=elim.map(function(p){return p.name+' ✗';}).join('  ');
}
function chainStartTimer(){
  chainState.timeLeft=chainState.maxTime;
  var bar=document.getElementById('chain-timer-bar');
  bar.style.width='100%';bar.style.background='var(--amber)';
  clearInterval(chainTimerIv);
  chainTimerIv=setInterval(function(){
    chainState.timeLeft-=0.5;
    var pct=Math.max(0,chainState.timeLeft/chainState.maxTime*100);
    bar.style.width=pct+'%';
    bar.style.transition='width .5s linear';
    if(pct<30) bar.style.background='var(--rose)';
    else if(pct<60) bar.style.background='var(--amber)';
    if(chainState.timeLeft<=0){
      clearInterval(chainTimerIv);
      chainEliminate();
    }
  },500);
}
function chainSubmit(){
  var t=CHAIN_T[curLang]||CHAIN_T.en;
  var inp=document.getElementById('chain-inp');
  var val=inp.value.trim();
  if(!val) return;
  var fb=document.getElementById('chain-feedback');
  // Check starts with required letter
  if(val[0].toUpperCase()!==chainState.requiredLetter){
    fb.textContent=t.wrong;fb.style.color='var(--rose)';
    inp.style.borderColor='var(--rose)';setTimeout(function(){inp.style.borderColor='rgba(255,192,32,.2)';},600);
    return;
  }
  // Check if real country (fuzzy match)
  var matched=null;
  for(var i=0;i<chainState.allNames.length;i++){
    if(normalizeStr(chainState.allNames[i])===normalizeStr(val)||fuzzyMatch(val,chainState.allNames[i])){
      matched=chainState.allNames[i];break;
    }
  }
  if(!matched){fb.textContent=t.notCountry;fb.style.color='var(--rose)';return;}
  // Check not already used
  if(chainState.used.indexOf(matched.toLowerCase())>=0){
    fb.textContent=t.used;fb.style.color='var(--rose)';return;
  }
  // Success!
  clearInterval(chainTimerIv);
  chainState.chain.push(matched);
  chainState.used.push(matched.toLowerCase());
  chainState.players[chainState.currentPlayer].score++;
  chainState.requiredLetter=matched.slice(-1).toUpperCase();
  // Next alive player
  chainNextPlayer();
  chainRender();
  chainStartTimer();
}
function chainNextPlayer(){
  var alive=chainState.players.filter(function(p){return p.alive;});
  if(alive.length<=1){chainGameOver();return;}
  do{
    chainState.currentPlayer=(chainState.currentPlayer+1)%chainState.players.length;
  }while(!chainState.players[chainState.currentPlayer].alive);
}
function chainEliminate(){
  var t=CHAIN_T[curLang]||CHAIN_T.en;
  var p=chainState.players[chainState.currentPlayer];
  p.alive=false;
  document.getElementById('chain-feedback').textContent=p.name+' '+t.timesUp+' '+t.out;
  document.getElementById('chain-feedback').style.color='var(--rose)';
  document.getElementById('chain-inp').disabled=true;
  var alive=chainState.players.filter(function(p){return p.alive;});
  if(alive.length<=1){
    setTimeout(chainGameOver,1500);
  } else {
    chainNextPlayer();
    setTimeout(function(){chainRender();chainStartTimer();},1500);
  }
}
function chainGameOver(){
  clearInterval(chainTimerIv);
  var t=CHAIN_T[curLang]||CHAIN_T.en;
  var alive=chainState.players.filter(function(p){return p.alive;});
  var winner=alive.length===1?alive[0]:null;
  var title=winner?winner.name+' '+t.wins:t.draw;
  document.getElementById('chain-player-tag').textContent=title;
  document.getElementById('chain-player-tag').style.color=winner?winner.color:'var(--amber)';
  document.getElementById('chain-letter').textContent=chainState.chain.length;
  document.getElementById('chain-prompt-lbl').textContent={en:'COUNTRIES NAMED',de:'LÄNDER GENANNT',fr:'PAYS NOMMÉS',es:'PAÍSES NOMBRADOS'}[curLang]||'COUNTRIES NAMED';
  document.getElementById('chain-inp').disabled=true;
  document.getElementById('chain-feedback').textContent='';
}

// ═══════════════════════════════════════════════════════
// MAP PARTY — Party Game
// ═══════════════════════════════════════════════════════
var mpartyState={};
var mpartyRoundsVal=5;
var mpartyPlayerCount=2;
var MPARTY_COLORS=['#3da0ff','#ff2d5e','#00ffd5','#ffc020','#b44dff'];

var MPARTY_T={
  en:{title:'Map Party',sub:'Everyone clicks where the country is — closest pin wins the round!',players:'PLAYERS',rounds:'ROUNDS',start:'Start Game →',badge:'Map Party',player:'Player',turn:"'s turn — find:",wins:'wins!',closest:'Closest!',next:'Next Round →',results:'Final Scores'},
  de:{title:'Karten-Party',sub:'Alle klicken wo das Land ist — nächster Pin gewinnt die Runde!',players:'SPIELER',rounds:'RUNDEN',start:'Spiel starten →',badge:'Karten-Party',player:'Spieler',turn:' ist dran — finde:',wins:'gewinnt!',closest:'Am nächsten!',next:'Nächste Runde →',results:'Endergebnis'},
  fr:{title:'Carte Party',sub:'Tout le monde clique où se trouve le pays — le plus proche gagne!',players:'JOUEURS',rounds:'MANCHES',start:'Commencer →',badge:'Carte Party',player:'Joueur',turn:' — trouvez:',wins:'gagne!',closest:'Le plus proche!',next:'Manche suivante →',results:'Scores finaux'},
  es:{title:'Mapa Party',sub:'Todos hacen clic donde está el país — ¡el pin más cercano gana!',players:'JUGADORES',rounds:'RONDAS',start:'Iniciar →',badge:'Mapa Party',player:'Jugador',turn:' — encuentra:',wins:'¡gana!',closest:'¡Más cerca!',next:'Siguiente ronda →',results:'Puntuaciones finales'}
};

function launchMapPartySetup(){showScreen('mparty-setup');mpartyApplyLang();mpartyRenderNameInputs();}
function mpartyApplyLang(){
  var t=MPARTY_T[curLang]||MPARTY_T.en;
  var el;
  el=document.getElementById('mparty-setup-title');if(el)el.textContent=t.title;
  el=document.getElementById('mparty-setup-sub');if(el)el.textContent=t.sub;
  el=document.getElementById('mparty-lbl-players');if(el)el.textContent=t.players;
  el=document.getElementById('mparty-lbl-rounds');if(el)el.textContent=t.rounds;
  el=document.getElementById('mparty-start-btn');if(el)el.textContent=t.start;
  el=document.getElementById('mparty-badge');if(el)el.textContent=t.badge;
}
function mpartySetPlayers(n){
  mpartyPlayerCount=n;
  [2,3,4,5].forEach(function(x){
    var btn=document.getElementById('mparty-p'+x);
    if(btn) btn.classList.toggle('active-amber',x===n);
  });
  mpartyRenderNameInputs();
}
function mpartyRenderNameInputs(){
  var t=MPARTY_T[curLang]||MPARTY_T.en;
  var wrap=document.getElementById('mparty-name-inputs');
  if(!wrap) return;
  wrap.innerHTML='';
  for(var i=0;i<mpartyPlayerCount;i++){
    var inp=document.createElement('input');
    inp.id='mparty-name-'+i;
    inp.placeholder=t.player+' '+(i+1);
    inp.maxLength=15;
    inp.style.cssText='width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid rgba(255,192,32,.15);background:var(--ink);color:var(--text);font-family:inherit;font-size:.85rem;outline:none;transition:border-color .2s';
    inp.style.borderLeftWidth='3px';
    inp.style.borderLeftColor=MPARTY_COLORS[i];
    wrap.appendChild(inp);
  }
}
function mpartyStart(){
  msBuildPool();
  var t=MPARTY_T[curLang]||MPARTY_T.en;
  var pool=shuffle([...msCountryPool]).slice(0,mpartyRoundsVal);
  mpartyState={
    pool:pool, round:0, totalRounds:mpartyRoundsVal, playerCount:mpartyPlayerCount,
    players:[], currentPlayer:0, roundClicks:[]
  };
  for(var i=0;i<mpartyPlayerCount;i++){
    var nameInp=document.getElementById('mparty-name-'+i);
    var pName=(nameInp&&nameInp.value.trim())?sanitize(nameInp.value.trim()):(t.player+' '+(i+1));
    mpartyState.players.push({name:pName,score:0,color:MPARTY_COLORS[i]});
  }
  showScreen('mparty');
  mpartyRenderMap();
  mpartyNextRound();
}
// Map Party zoom/pan state
var mpZoomLevel=1,mpPanX=0,mpPanY=0,mpDragging=false,mpDragMoved=false,mpDragStartX=0,mpDragStartY=0,mpPanStartX=0,mpPanStartY=0;

function mpZoomAt(factor,cx,cy){
  var wrap=document.getElementById('mparty-map-wrap');if(!wrap)return;
  var old=mpZoomLevel,nw=Math.max(1,Math.min(8,old*factor));
  var r=wrap.getBoundingClientRect();
  var mx=cx-r.left,my=cy-r.top;
  mpPanX=mx-(mx-mpPanX)*(nw/old);mpPanY=my-(my-mpPanY)*(nw/old);
  mpZoomLevel=nw;
  if(mpZoomLevel<=1.01){mpZoomLevel=1;mpPanX=0;mpPanY=0;}
  mpClampPan();mpApplyTransform();
}
function mpZoom(f){var w=document.getElementById('mparty-map-wrap');if(!w)return;var r=w.getBoundingClientRect();mpZoomAt(f,r.left+r.width/2,r.top+r.height/2);}
function mpZoomReset(){mpZoomLevel=1;mpPanX=0;mpPanY=0;mpApplyTransform();}
function mpClampPan(){var w=document.getElementById('mparty-map-wrap');if(!w)return;var ww=w.offsetWidth,hh=w.offsetHeight||ww*.5;mpPanX=Math.max(-ww*(mpZoomLevel-1),Math.min(0,mpPanX));mpPanY=Math.max(-hh*(mpZoomLevel-1),Math.min(0,mpPanY));}
function mpApplyTransform(){var i=document.getElementById('mparty-map-inner');if(i)i.style.transform='translate('+mpPanX+'px,'+mpPanY+'px) scale('+mpZoomLevel+')';}
function mpInitPanZoom(){
  var wrap=document.getElementById('mparty-map-wrap');if(!wrap||wrap._mpZoomInit)return;
  wrap._mpZoomInit=true;
  wrap.addEventListener('wheel',function(e){e.preventDefault();mpZoomAt(e.deltaY<0?1.35:1/1.35,e.clientX,e.clientY);},{passive:false});
  wrap.addEventListener('mousedown',function(e){if(mpZoomLevel<=1)return;mpDragging=true;mpDragMoved=false;mpDragStartX=e.clientX;mpDragStartY=e.clientY;mpPanStartX=mpPanX;mpPanStartY=mpPanY;wrap.style.cursor='grabbing';var i=document.getElementById('mparty-map-inner');if(i)i.style.transition='none';});
  window.addEventListener('mousemove',function(e){if(!mpDragging)return;var dx=e.clientX-mpDragStartX,dy=e.clientY-mpDragStartY;if(Math.abs(dx)>3||Math.abs(dy)>3)mpDragMoved=true;mpPanX=mpPanStartX+dx;mpPanY=mpPanStartY+dy;mpClampPan();mpApplyTransform();});
  window.addEventListener('mouseup',function(){if(mpDragging){mpDragging=false;var w=document.getElementById('mparty-map-wrap');if(w)w.style.cursor='crosshair';var i=document.getElementById('mparty-map-inner');if(i)i.style.transition='transform .2s ease';}});
  var lastDist=0;
  wrap.addEventListener('touchstart',function(e){if(e.touches.length===2){var dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY;lastDist=Math.sqrt(dx*dx+dy*dy);}else if(e.touches.length===1&&mpZoomLevel>1){mpDragging=true;mpDragMoved=false;mpDragStartX=e.touches[0].clientX;mpDragStartY=e.touches[0].clientY;mpPanStartX=mpPanX;mpPanStartY=mpPanY;var i=document.getElementById('mparty-map-inner');if(i)i.style.transition='none';}},{passive:true});
  wrap.addEventListener('touchmove',function(e){if(e.touches.length===2){e.preventDefault();var dx=e.touches[0].clientX-e.touches[1].clientX,dy=e.touches[0].clientY-e.touches[1].clientY,d=Math.sqrt(dx*dx+dy*dy),cx=(e.touches[0].clientX+e.touches[1].clientX)/2,cy=(e.touches[0].clientY+e.touches[1].clientY)/2;if(lastDist>0)mpZoomAt(d/lastDist,cx,cy);lastDist=d;}else if(mpDragging&&e.touches.length===1){e.preventDefault();var dx2=e.touches[0].clientX-mpDragStartX,dy2=e.touches[0].clientY-mpDragStartY;if(Math.abs(dx2)>3||Math.abs(dy2)>3)mpDragMoved=true;mpPanX=mpPanStartX+dx2;mpPanY=mpPanStartY+dy2;mpClampPan();mpApplyTransform();}},{passive:false});
  wrap.addEventListener('touchend',function(){mpDragging=false;lastDist=0;var i=document.getElementById('mparty-map-inner');if(i)i.style.transition='transform .2s ease';},{passive:true});
}

function mpartyRenderMap(){
  var svg=document.getElementById('mparty-map-svg');
  if(!svg) return;
  var html='<defs>'+
    '<linearGradient id="mp-og" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="500">'+
    '<stop offset="0%" stop-color="#061525"/><stop offset="50%" stop-color="#0d3560"/><stop offset="100%" stop-color="#051220"/>'+
    '</linearGradient></defs>'+
    '<rect width="1000" height="500" fill="url(#mp-og)"/>'+
    '<g opacity=".06" stroke="#9fcee8" stroke-width=".3" fill="none">'+
    '<line x1="0" y1="247" x2="1000" y2="247"/><line x1="0" y1="197" x2="1000" y2="197"/>'+
    '<line x1="0" y1="127" x2="1000" y2="127"/><line x1="0" y1="297" x2="1000" y2="297"/>'+
    '<line x1="0" y1="366" x2="1000" y2="366"/>'+
    '<line x1="174" y1="0" x2="174" y2="500"/><line x1="338" y1="0" x2="338" y2="500"/>'+
    '<line x1="501" y1="0" x2="501" y2="500"/><line x1="665" y1="0" x2="665" y2="500"/>'+
    '<line x1="828" y1="0" x2="828" y2="500"/></g>';
  for(var name in MAP_PATHS){
    html+='<path d="'+MAP_PATHS[name]+'" fill="#2a4a6a" stroke="#000" stroke-width=".5" stroke-linejoin="round" opacity=".85"/>';
  }
  html+='<g id="mp-markers"></g>';
  html+=msRenderMicrostateMarkers();
  html+='<rect id="mp-click-layer" width="1000" height="500" fill="transparent" style="cursor:crosshair"/>';
  svg.innerHTML=html;
  document.getElementById('mp-click-layer').onclick=function(e){if(!mpDragMoved)mpartyClick(e);};
  mpInitPanZoom();
}
function mpartyNextRound(){
  mpZoomReset();
  var t=MPARTY_T[curLang]||MPARTY_T.en;
  if(mpartyState.round>=mpartyState.totalRounds){
    mpartyGameOver();return;
  }
  mpartyState.currentPlayer=0;
  mpartyState.roundClicks=[];
  mpartyState.round++;
  var target=mpartyState.pool[mpartyState.round-1];
  mpartyState.currentTarget=target;
  var displayName=target;
  try{var tr=bdrTranslate(target);if(tr)displayName=tr;}catch(e){}
  document.getElementById('mparty-round-lbl').textContent=mpartyState.round+'/'+mpartyState.totalRounds;
  document.getElementById('mparty-country').textContent=displayName;
  document.getElementById('mparty-fb-text').textContent='';
  document.getElementById('mparty-fb-dist').textContent='';
  document.getElementById('mparty-next-btn').style.display='none';
  // Clear markers on map
  var markers=document.getElementById('mp-markers');
  if(markers) markers.innerHTML='';
  mpartyShowPlayerTurn();
  mpartyRenderScores();
}
function mpartyShowPlayerTurn(){
  var t=MPARTY_T[curLang]||MPARTY_T.en;
  var p=mpartyState.players[mpartyState.currentPlayer];
  document.getElementById('mparty-player-tag').textContent=p.name+t.turn;
  document.getElementById('mparty-player-tag').style.color=p.color;
}
function mpartyClick(e){
  if(mpartyState.currentPlayer>=mpartyState.playerCount) return;
  var svg=document.getElementById('mparty-map-svg');
  var wrap=document.getElementById('mparty-map-wrap');
  var wrapRect=wrap.getBoundingClientRect();
  var clickX=e.clientX,clickY=e.clientY;
  // Use same zoom-aware coordinate conversion as Map Sniper
  var pt=svg.createSVGPoint();pt.x=clickX;pt.y=clickY;
  var ctm=svg.getScreenCTM();
  var svgPt=ctm?pt.matrixTransform(ctm.inverse()):{x:0,y:0};
  var target=mpartyState.currentTarget;
  msComputeCenters();
  var center=msCenters[target];
  if(!center) return;
  var dx=svgPt.x-center.x,dy=svgPt.y-center.y;
  var dist=Math.sqrt(dx*dx+dy*dy);
  var p=mpartyState.players[mpartyState.currentPlayer];
  mpartyState.roundClicks.push({player:mpartyState.currentPlayer,x:svgPt.x,y:svgPt.y,dist:dist});
  // DON'T show pin yet — hide until all players have clicked
  var remaining=mpartyState.playerCount-(mpartyState.currentPlayer+1);
  var t=MPARTY_T[curLang]||MPARTY_T.en;
  document.getElementById('mparty-fb-text').textContent=p.name+' ✓';
  document.getElementById('mparty-fb-text').style.color=p.color;
  document.getElementById('mparty-fb-dist').textContent=remaining>0?(remaining+' '+(remaining===1?({en:'player left',de:'Spieler übrig',fr:'joueur restant',es:'jugador restante'}[curLang]||'player left'):({en:'players left',de:'Spieler übrig',fr:'joueurs restants',es:'jugadores restantes'}[curLang]||'players left'))):'';
  mpartyState.currentPlayer++;
  if(mpartyState.currentPlayer>=mpartyState.playerCount){
    // All players clicked — reveal everything
    setTimeout(mpartyRoundResult,500);
  } else {
    mpartyShowPlayerTurn();
  }
}
function mpartyRoundResult(){
  var t=MPARTY_T[curLang]||MPARTY_T.en;
  var target=mpartyState.currentTarget;
  var center=msCenters[target];
  var markers=document.getElementById('mp-markers');
  var svg=document.getElementById('mparty-map-svg');
  var html='';

  // Check which players clicked inside the country
  var targetPath=null;
  if(svg){
    var paths=svg.querySelectorAll('path');
    for(var pi=0;pi<paths.length;pi++){
      // Match by checking if the path data matches MAP_PATHS[target]
      var pd=paths[pi].getAttribute('d');
      if(pd && MAP_PATHS[target] && pd===MAP_PATHS[target]){targetPath=paths[pi];break;}
    }
  }
  mpartyState.roundClicks.forEach(function(c){
    c.hitCountry=false;
    if(targetPath){
      var pt=svg.createSVGPoint();pt.x=c.x;pt.y=c.y;
      c.hitCountry=targetPath.isPointInFill(pt);
    }
  });

  var playersInCountry=mpartyState.roundClicks.filter(function(c){return c.hitCountry;});
  var hitLabels={en:'Hit!',de:'Treffer!',fr:'Touché!',es:'¡Acertó!'};
  var missLabels={en:'Miss',de:'Daneben',fr:'Raté',es:'Falló'};
  var hitLbl=hitLabels[curLang]||hitLabels.en;
  var missLbl=missLabels[curLang]||missLabels.en;

  // Highlight correct country
  var cp=MAP_PATHS[target];
  if(cp) html+='<path d="'+cp+'" fill="rgba(255,192,32,.15)" stroke="var(--amber)" stroke-width="1"/>';

  // Draw all pins + lines
  mpartyState.roundClicks.forEach(function(c){
    var p=mpartyState.players[c.player];
    html+='<line x1="'+c.x+'" y1="'+c.y+'" x2="'+center.x+'" y2="'+center.y+'" stroke="'+p.color+'" stroke-width=".8" stroke-dasharray="4 3" opacity=".5"/>';
    var pinColor=c.hitCountry?'var(--lime)':p.color;
    var pinStroke=c.hitCountry?'var(--lime)':'#fff';
    html+='<circle cx="'+c.x+'" cy="'+c.y+'" r="5" fill="'+pinColor+'" stroke="'+pinStroke+'" stroke-width="1.5" opacity=".9"/>';
    var km=Math.round(c.dist*40);
    var label=c.hitCountry?hitLbl:(km+'km');
    html+='<text x="'+(c.x+8)+'" y="'+(c.y-6)+'" font-family="var(--font-m)" font-size="5" fill="'+p.color+'" opacity=".7">'+label+'</text>';
  });

  // Correct location marker
  html+='<circle cx="'+center.x+'" cy="'+center.y+'" r="6" fill="var(--amber)" stroke="#fff" stroke-width="2"/>'+
    '<circle cx="'+center.x+'" cy="'+center.y+'" r="16" fill="none" stroke="var(--amber)" stroke-width="1" opacity=".4"><animate attributeName="r" from="6" to="28" dur="0.8s" fill="freeze"/><animate attributeName="opacity" from=".4" to="0" dur="0.8s" fill="freeze"/></circle>';
  markers.innerHTML=html;

  // Scoring logic
  var fbText='', fbColor='var(--amber)';
  if(playersInCountry.length>0){
    // All players who hit the country get a point
    playersInCountry.forEach(function(c){mpartyState.players[c.player].score++;});
    if(playersInCountry.length===1){
      var wp=mpartyState.players[playersInCountry[0].player];
      fbText=wp.name+' — '+hitLbl;
      fbColor=wp.color;
    } else {
      var names=playersInCountry.map(function(c){return mpartyState.players[c.player].name;});
      var allHitLbl={en:' all hit the country!',de:' haben alle getroffen!',fr:' ont tous touché!',es:' ¡todos acertaron!'}[curLang]||' all hit!';
      fbText=names.join(' & ')+allHitLbl;
      fbColor='var(--lime)';
    }
  } else {
    // Nobody hit — closest wins
    var sorted=mpartyState.roundClicks.slice().sort(function(a,b){return a.dist-b.dist;});
    var winner=sorted[0];
    mpartyState.players[winner.player].score++;
    var wp2=mpartyState.players[winner.player];
    var closestLbl={en:'Closest — nobody hit the country',de:'Am nächsten — niemand hat getroffen',fr:'Le plus proche — personne n\'a touché',es:'Más cerca — nadie acertó'}[curLang]||'Closest';
    fbText=wp2.name+' — '+closestLbl;
    fbColor=wp2.color;
  }

  // Results text
  var resultText=mpartyState.roundClicks.map(function(c){
    var p=mpartyState.players[c.player];
    var km=Math.round(c.dist*40);
    var prefix=c.hitCountry?'✓ ':'';
    return prefix+p.name+': '+(c.hitCountry?hitLbl:'~'+km.toLocaleString()+' km');
  }).join('  |  ');

  document.getElementById('mparty-fb-text').textContent=fbText;
  document.getElementById('mparty-fb-text').style.color=fbColor;
  document.getElementById('mparty-fb-dist').textContent=resultText;
  document.getElementById('mparty-player-tag').textContent='';
  document.getElementById('mparty-next-btn').style.display='inline-block';
  document.getElementById('mparty-next-btn').textContent=mpartyState.round>=mpartyState.totalRounds?({en:'See Results',de:'Ergebnis',fr:'Résultats',es:'Resultados'}[curLang]||'See Results'):t.next;
  mpartyRenderScores();
}
function mpartyRenderScores(){
  var el=document.getElementById('mparty-scores');
  el.innerHTML='';
  mpartyState.players.forEach(function(p){
    var div=document.createElement('div');
    div.style.cssText='padding:8px 14px;border-radius:10px;background:rgba(255,255,255,.03);border:1px solid '+p.color+'33;text-align:center;min-width:60px';
    div.innerHTML='<div style="font-family:var(--font-d);font-size:1.2rem;color:'+p.color+'">'+p.score+'</div><div style="font-family:var(--font-m);font-size:.5rem;color:var(--muted);letter-spacing:.08em;margin-top:2px">'+p.name+'</div>';
    el.appendChild(div);
  });
}
function mpartyGameOver(){
  var t=MPARTY_T[curLang]||MPARTY_T.en;
  var sorted=mpartyState.players.slice().sort(function(a,b){return b.score-a.score;});
  var winner=sorted[0];
  try{achTrack('mpPlayed',1);achTrack('mpWins',1);}catch(e){}
  document.getElementById('mparty-country').textContent=winner.name+' '+t.wins;
  document.getElementById('mparty-country').style.color=winner.color;
  document.getElementById('mparty-player-tag').textContent=t.results;
  document.getElementById('mparty-player-tag').style.color='var(--muted2)';
  document.getElementById('mparty-fb-text').textContent='';
  document.getElementById('mparty-fb-dist').textContent='';
  document.getElementById('mparty-next-btn').style.display='inline-block';
  document.getElementById('mparty-next-btn').textContent='← Home';
  document.getElementById('mparty-next-btn').onclick=function(){goHome();this.onclick=function(){mpartyNextRound();};};
  mpartyRenderScores();
}

const BDR_TIMERS = [
  {val:60,lbl:'1 min'},{val:120,lbl:'2 min'},{val:180,lbl:'3 min'},{val:300,lbl:'5 min'},{val:600,lbl:'10 min'},{val:900,lbl:'15 min'},{val:0,lbl:'∞'}
];

let bdr = {region:'europe',timerVal:0,visited:[],current:null,hints:3,timer:null,timeLeft:0,running:false,pool:[]};

function launchBorderSetup(){
  showScreen('bdr-setup');
  const regEl=document.getElementById('bdr-region-opts');
  regEl.innerHTML='';
  Object.keys(BDR_REGIONS).forEach(k=>{
    const c=document.createElement('button');
    c.className='bdr-setup-chip'+(k===bdr.region?' active':'');
    c.textContent=BDR_REGIONS[k][curLang]||BDR_REGIONS[k].en;
    c.onclick=()=>{bdr.region=k;regEl.querySelectorAll('.bdr-setup-chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');};
    regEl.appendChild(c);
  });
  const tmEl=document.getElementById('bdr-timer-opts');
  tmEl.innerHTML='';
  BDR_TIMERS.forEach(t=>{
    const c=document.createElement('button');
    c.className='bdr-setup-chip'+(t.val===bdr.timerVal?' active':'');
    c.textContent=t.val===0?(T.bdrUnlimited||'Unlimited'):t.lbl;
    c.onclick=()=>{bdr.timerVal=t.val;tmEl.querySelectorAll('.bdr-setup-chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');};
    tmEl.appendChild(c);
  });
  const ge=id=>document.getElementById(id);
  if(ge('bdr-setup-badge'))ge('bdr-setup-badge').textContent=T.bdrBadge||'🗺️ Border Run';
  if(ge('bdr-setup-title'))ge('bdr-setup-title').textContent=T.bdrSetupTitle||'Border Run';
  if(ge('bdr-setup-sub'))ge('bdr-setup-sub').textContent=T.bdrSetupSub||'Chain through neighboring countries. How far can you go?';
  if(ge('bdr-lbl-region'))ge('bdr-lbl-region').textContent=T.bdrRegion||'REGION';
  if(ge('bdr-lbl-timer'))ge('bdr-lbl-timer').textContent=T.bdrTimer||'TIMER';
  if(ge('bdr-start-btn'))ge('bdr-start-btn').textContent=T.bdrStart||'Start Border Run →';
}

function launchBorderGame(){
  let pool;
  if(bdr.region==='all'){
    pool=Object.keys(NEIGHBORS);
  } else {
    pool=BDR_REGION_COUNTRIES[bdr.region]||Object.keys(NEIGHBORS);
  }
  pool=pool.filter(c=>NEIGHBORS[c]&&NEIGHBORS[c].some(n=>pool.includes(n)));
  if(pool.length<5){showToast('Not enough connected countries in this region');return;}
  bdr.pool=pool;
  /* For "All" region pick one start in the Americas and one in the rest of the world */
  if(bdr.region==='all'){
    const amPool=BDR_REGION_COUNTRIES.americas.filter(c=>pool.includes(c));
    const woPool=pool.filter(c=>!BDR_REGION_COUNTRIES.americas.includes(c));
    const pickBest=arr=>{const g=arr.filter(c=>(NEIGHBORS[c]||[]).filter(n=>pool.includes(n)).length>=2);const s=g.length>0?g:arr;return s[Math.floor(Math.random()*s.length)];};
    const startAm=pickBest(amPool);
    const startWo=pickBest(woPool);
    bdr.visited=[startAm,startWo];
    bdr.current=startWo;
  } else {
    const good=pool.filter(c=>(NEIGHBORS[c]||[]).filter(n=>pool.includes(n)).length>=2);
    const startPool=good.length>0?good:pool;
    const start=startPool[Math.floor(Math.random()*startPool.length)];
    bdr.visited=[start];
    bdr.current=start;
  }
  bdr.hints=3;
  bdr.running=true;
  Object.keys(BDR_COLORS).forEach(k=>delete BDR_COLORS[k]);_bdrHueOffset=Math.floor(Math.random()*360);
  if(bdr.timer)clearInterval(bdr.timer);
  bdr.timer=null;
  bdr.timeLeft=bdr.timerVal;

  showScreen('bdr');
  bdrUpdateUI();
  bdrInitPanZoom();
  /* Zoom to show both start countries when in All mode, else zoom to single start */
  setTimeout(()=>bdr.visited.length>1?bdrZoomToAll(800):bdrZoomToCountry(bdr.visited[0],800),100);

  const timerEl=document.getElementById('bdr-hud-timer');
  if(bdr.timerVal>0){
    timerEl.textContent=bdrFmtTime(bdr.timeLeft);
    timerEl.classList.remove('danger');
    bdr.timer=setInterval(()=>{
      bdr.timeLeft--;
      timerEl.textContent=bdrFmtTime(bdr.timeLeft);
      if(bdr.timeLeft<=10)timerEl.classList.add('danger');
      if(bdr.timeLeft<=0){clearInterval(bdr.timer);bdr.running=false;bdrShowFb(T.bdrTimesUp||"⏱ Time's up!",'bad');setTimeout(()=>bdrEnd(),1500);}
    },1000);
  } else {
    timerEl.textContent='∞';
  }

  const inp=document.getElementById('bdr-input');
  inp.value='';inp.focus();
  inp.oninput=()=>bdrAutoComplete();
  inp.onkeydown=(e)=>{if(e.key==='Enter')bdrSubmit();if(e.key==='Escape'){document.getElementById('bdr-suggestions').classList.remove('show');}};
  document.addEventListener('click',bdrCloseSuggest);
}

function bdrFmtTime(s){const m=Math.floor(s/60);const ss=s%60;return m+':'+(ss<10?'0':'')+ss;}

function bdrUpdateUI(){
  const ge=id=>document.getElementById(id);
  ge('bdr-badge').textContent=T.bdrBadge||'🗺️ Border Run';
  ge('bdr-hud-count').textContent=bdr.visited.length;
  ge('bdr-st-countries').textContent=bdr.visited.length;
  ge('bdr-st-hints').textContent=bdr.hints;
  ge('bdr-st-total').textContent=bdr.pool.length;
  ge('bdr-lbl-found').textContent=T.bdrFound||'COUNTRIES FOUND';
  ge('bdr-lbl-hints').textContent=T.bdrHintsLeft||'HINTS LEFT';
  ge('bdr-lbl-total').textContent=T.bdrInRegion||'IN REGION';
  ge('bdr-sub-prompt').textContent=T.bdrPrompt2||'NAME A NEIGHBOR OF ANY COLORED COUNTRY';
  ge('bdr-hint-text').textContent=T.bdrHint||'Hint';
  ge('bdr-hint-count').textContent=bdr.hints;
  ge('bdr-end-btn').innerHTML='🏁 '+(T.bdrEndRun||'End Run');
  ge('bdr-input').placeholder=T.bdrPlaceholder||'Type a country name...';
  ge('bdr-current-name').textContent=bdr.visited.length+' / '+bdr.pool.length;
  bdrRenderMap();
  const pct=Math.round(bdr.visited.length/bdr.pool.length*100);
  ge('bdr-prog').style.width=pct+'%';
}

/* Continent color palettes (classic political map style) */
const COUNTRY_COLORS = {};
(function(){
  const palettes = {
    europe:['#f4d03f','#a9dfbf','#85c1e9','#d7bde2','#f5b7b1','#abebc6','#f9e79f','#d5f5e3','#fadbd8','#d4efdf','#fdebd0','#e8daef','#d6eaf8','#fcf3cf','#aed6f1','#f2d7d5','#a3e4d7','#f8c471','#bb8fce','#76d7c4','#7fb3d8','#f0b27a','#73c6b6','#82e0aa','#f7dc6f'],
    asia:['#ec7063','#cd6155','#e74c3c','#d4ac0d','#f39c12','#e67e22','#d35400','#ca6f1e','#eb984e','#f0b27a','#e59866','#dc7633','#af7ac5','#a569bd','#8e44ad','#7d3c98','#2ecc71','#27ae60','#1abc9c','#16a085','#48c9b0','#45b39d'],
    africa:['#f9e79f','#f4d03f','#f0b27a','#e59866','#eb984e','#dc7633','#e67e22','#d35400','#82e0aa','#73c6b6','#45b39d','#27ae60','#229954','#1e8449','#a9dfbf','#abebc6','#d5f5e3','#a3e4d7','#76d7c4','#48c9b0','#d2b4de','#c39bd3','#bb8fce','#a569bd','#8e44ad','#f5b7b1','#f1948a','#ec7063'],
    americas:['#5dade2','#3498db','#2e86c1','#85c1e9','#aed6f1','#7fb3d8','#2ecc71','#27ae60','#82e0aa','#a9dfbf','#f39c12','#e67e22','#f0b27a','#eb984e','#ec7063','#e74c3c','#af7ac5','#bb8fce','#d2b4de','#a569bd'],
    oceania:['#e67e22','#27ae60','#e74c3c','#3498db','#8e44ad']
  };
  const assign=(list,pal)=>{list.forEach((c,i)=>{COUNTRY_COLORS[c]=pal[i%pal.length];});};
  assign(BDR_REGION_COUNTRIES.europe||[],palettes.europe);
  assign(BDR_REGION_COUNTRIES.asia||[],palettes.asia);
  assign(BDR_REGION_COUNTRIES.africa||[],palettes.africa);
  assign(BDR_REGION_COUNTRIES.americas||[],palettes.americas);
  ['Australia','New Zealand','Papua New Guinea','East Timor'].forEach((c,i)=>{COUNTRY_COLORS[c]=palettes.oceania[i%palettes.oceania.length];});
})();

const BDR_COLORS={};
let _bdrHueOffset=Math.floor(Math.random()*360);
function bdrRandomColor(){
  /* Golden angle distribution, but skip blue hues (170-240) to avoid ocean confusion */
  _bdrHueOffset=(_bdrHueOffset+137.508)%360;
  let hue=Math.floor(_bdrHueOffset);
  if(hue>=170&&hue<=240) hue=(hue+80)%360;
  const sat=60+Math.floor(Math.random()*25);
  const lit=52+Math.floor(Math.random()*16);
  return `hsl(${hue},${sat}%,${lit}%)`;
}
function bdrColor(n){if(!BDR_COLORS[n]){BDR_COLORS[n]=bdrRandomColor();}return BDR_COLORS[n];}

function bdrRenderMap(){
  const svg=document.getElementById('bdr-map-svg');
  if(!svg)return;
  let html=`<defs>
<linearGradient id="og" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="500" y2="500">
  <stop offset="0%" stop-color="#061525"/>
  <stop offset="50%" stop-color="#0d3560"/>
  <stop offset="100%" stop-color="#051220"/>
</linearGradient>
</defs>
<rect width="1000" height="500" fill="url(#og)"/>
<g opacity=".06" stroke="#9fcee8" stroke-width=".3" fill="none">
  <line x1="0" y1="247" x2="1000" y2="247"/>
  <line x1="0" y1="197" x2="1000" y2="197"/>
  <line x1="0" y1="127" x2="1000" y2="127"/>
  <line x1="0" y1="297" x2="1000" y2="297"/>
  <line x1="0" y1="366" x2="1000" y2="366"/>
  <line x1="174" y1="0" x2="174" y2="500"/>
  <line x1="338" y1="0" x2="338" y2="500"/>
  <line x1="501" y1="0" x2="501" y2="500"/>
  <line x1="665" y1="0" x2="665" y2="500"/>
  <line x1="828" y1="0" x2="828" y2="500"/>
</g>`;
  /* Layer 0: Decorative islands (countries without NEIGHBORS — shown as gray silhouettes) */
  for(const name of Object.keys(MAP_PATHS)){
    if(NEIGHBORS[name])continue; /* skip playable countries */
    const path=MAP_PATHS[name];
    html+=`<path d="${path}" fill="#2a5f82" stroke="#1e4a66" stroke-width=".4" stroke-linejoin="round" opacity=".65"><title>${bdrTranslate(name)}</title></path>`;
  }
  /* Layer 1: Country fills */
  for(const name of bdr.visited){
    const path=MAP_PATHS[name];
    if(!path)continue;
    const col=bdrColor(name);
    html+=`<path class="land revealed" d="${path}" style="fill:${col}"><title>${bdrTranslate(name)}</title></path>`;
  }
  /* Layer 2: Borders on top (always visible, even between same-color neighbors) */
  for(const name of bdr.visited){
    const path=MAP_PATHS[name];
    if(!path)continue;
    html+=`<path class="land-border" d="${path}"/>`;
  }
  /* Layer 3: Labels */
  for(const name of bdr.visited){
    const path=MAP_PATHS[name];
    if(!path)continue;
    /* Use largest subpath bbox center so labels don't land in the ocean for multi-part countries */
    const subs=path.split(/Z/i);
    let bestA=-1,bestCx=0,bestCy=0,bestW=0,bestH=0;
    for(const sub of subs){const ns=sub.match(/[\d.]+/g);if(!ns||ns.length<4)continue;let x0=9999,x1=0,y0=9999,y1=0;for(let i=0;i<ns.length;i+=2){const x=parseFloat(ns[i]),y=parseFloat(ns[i+1]||0);if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}const a=(x1-x0)*(y1-y0);if(a>bestA){bestA=a;bestCx=(x0+x1)/2;bestCy=(y0+y1)/2;bestW=x1-x0;bestH=y1-y0;}}
    if(bestA<0)continue;
    const fs=Math.max(1.8,Math.min(4,Math.min(bestW,bestH)*0.18));
    html+=`<text class="country-label" x="${bestCx}" y="${bestCy+fs*0.35}" style="font-size:${fs}px">${bdrTranslate(name)}</text>`;
  }
  svg.innerHTML=html;
}

/* Pan & Zoom system */
let bdrView={x:0,y:0,w:1000,h:500,dragging:false,startX:0,startY:0,startVx:0,startVy:0,pinchDist:0};

function bdrInitPanZoom(){
  const wrap=document.getElementById('bdr-map-wrap');
  const svg=document.getElementById('bdr-map-svg');
  if(!wrap||!svg)return;
  bdrView={x:0,y:0,w:1000,h:500,dragging:false,startX:0,startY:0,startVx:0,startVy:0,pinchDist:0};
  bdrApplyView();
  // Mouse wheel zoom
  wrap.onwheel=(e)=>{e.preventDefault();const f=e.deltaY<0?1.25:0.8;bdrZoomAt(f,e.offsetX,e.offsetY);};
  // Mouse drag
  wrap.onmousedown=(e)=>{if(e.button!==0)return;bdrView.dragging=true;bdrView.startX=e.clientX;bdrView.startY=e.clientY;bdrView.startVx=bdrView.x;bdrView.startVy=bdrView.y;};
  window.addEventListener('mousemove',bdrMouseMove);
  window.addEventListener('mouseup',()=>{bdrView.dragging=false;});
  // Touch
  wrap.ontouchstart=(e)=>{if(e.touches.length===1){bdrView.dragging=true;bdrView.startX=e.touches[0].clientX;bdrView.startY=e.touches[0].clientY;bdrView.startVx=bdrView.x;bdrView.startVy=bdrView.y;}
  else if(e.touches.length===2){bdrView.dragging=false;bdrView.pinchDist=Math.hypot(e.touches[1].clientX-e.touches[0].clientX,e.touches[1].clientY-e.touches[0].clientY);}};
  wrap.ontouchmove=(e)=>{e.preventDefault();
    if(e.touches.length===1&&bdrView.dragging){const dx=e.touches[0].clientX-bdrView.startX;const dy=e.touches[0].clientY-bdrView.startY;const rect=wrap.getBoundingClientRect();const sx=bdrView.w/rect.width;const sy=bdrView.h/rect.height;bdrView.x=bdrView.startVx-dx*sx;bdrView.y=bdrView.startVy-dy*sy;bdrApplyView();}
    else if(e.touches.length===2){const d=Math.hypot(e.touches[1].clientX-e.touches[0].clientX,e.touches[1].clientY-e.touches[0].clientY);if(bdrView.pinchDist>0){const f=bdrView.pinchDist/d;const cx=(e.touches[0].clientX+e.touches[1].clientX)/2;const cy=(e.touches[0].clientY+e.touches[1].clientY)/2;const rect=wrap.getBoundingClientRect();bdrZoomAt(f,(cx-rect.left),(cy-rect.top));}bdrView.pinchDist=d;}};
  wrap.ontouchend=()=>{bdrView.dragging=false;bdrView.pinchDist=0;};
}

function bdrMouseMove(e){
  if(!bdrView.dragging)return;
  const wrap=document.getElementById('bdr-map-wrap');
  if(!wrap)return;
  const dx=e.clientX-bdrView.startX;const dy=e.clientY-bdrView.startY;
  const rect=wrap.getBoundingClientRect();
  const sx=bdrView.w/rect.width;const sy=bdrView.h/rect.height;
  bdrView.x=bdrView.startVx-dx*sx;bdrView.y=bdrView.startVy-dy*sy;
  bdrApplyView();
}

function bdrZoomAt(factor,px,py){
  const wrap=document.getElementById('bdr-map-wrap');
  if(!wrap)return;
  const rect=wrap.getBoundingClientRect();
  const svgX=bdrView.x+(px/rect.width)*bdrView.w;
  const svgY=bdrView.y+(py/rect.height)*bdrView.h;
  const nw=Math.max(100,Math.min(1000,bdrView.w*factor));
  const nh=nw/2;
  bdrView.x=svgX-(px/rect.width)*nw;
  bdrView.y=svgY-(py/rect.height)*nh;
  bdrView.w=nw;bdrView.h=nh;
  bdrApplyView();
}

function bdrZoom(factor){
  const wrap=document.getElementById('bdr-map-wrap');
  if(!wrap)return;
  const rect=wrap.getBoundingClientRect();
  bdrZoomAt(1/factor,rect.width/2,rect.height/2);
}

function bdrResetView(){
  bdrView.x=0;bdrView.y=0;bdrView.w=1000;bdrView.h=500;
  bdrApplyView();
}

function bdrApplyView(){
  const svg=document.getElementById('bdr-map-svg');
  if(!svg)return;
  svg.setAttribute('viewBox',`${bdrView.x} ${bdrView.y} ${bdrView.w} ${bdrView.h}`);
}

/* ── Smart Zoom helpers ── */
function bdrGetBBox(name){
  const path=MAP_PATHS[name];
  if(!path)return null;
  const nums=path.match(/[\d.]+/g);
  if(!nums||nums.length<4)return null;
  let minX=9999,maxX=0,minY=9999,maxY=0;
  for(let i=0;i<nums.length;i+=2){
    const x=parseFloat(nums[i]),y=parseFloat(nums[i+1]||0);
    if(x<minX)minX=x;if(x>maxX)maxX=x;
    if(y<minY)minY=y;if(y>maxY)maxY=y;
  }
  return {x:minX,y:minY,w:maxX-minX,h:maxY-minY,cx:(minX+maxX)/2,cy:(minY+maxY)/2};
}

function bdrAnimateView(tx,ty,tw,th,duration){
  const sx=bdrView.x,sy=bdrView.y,sw=bdrView.w,sh=bdrView.h;
  const start=performance.now();
  function ease(t){return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;} /* easeInOutQuad */
  function step(now){
    const elapsed=now-start;
    const t=Math.min(1,elapsed/duration);
    const e=ease(t);
    bdrView.x=sx+(tx-sx)*e;
    bdrView.y=sy+(ty-sy)*e;
    bdrView.w=sw+(tw-sw)*e;
    bdrView.h=sh+(th-sh)*e;
    bdrApplyView();
    if(t<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function bdrZoomToCountry(name,duration){
  const bb=bdrGetBBox(name);
  if(!bb)return;
  const pad=2.5; /* how much padding around the country */
  const vw=Math.max(bb.w*pad,60);
  const vh=vw/2;
  const vx=bb.cx-vw/2;
  const vy=bb.cy-vh/2;
  bdrAnimateView(vx,vy,vw,vh,duration||600);
}

function bdrZoomToAll(duration){
  if(bdr.visited.length===0)return;
  let minX=9999,maxX=0,minY=9999,maxY=0;
  for(const name of bdr.visited){
    const bb=bdrGetBBox(name);
    if(!bb)continue;
    if(bb.x<minX)minX=bb.x;
    if(bb.x+bb.w>maxX)maxX=bb.x+bb.w;
    if(bb.y<minY)minY=bb.y;
    if(bb.y+bb.h>maxY)maxY=bb.y+bb.h;
  }
  const pad=1.4;
  const cw=(maxX-minX)*pad;
  const ch=(maxY-minY)*pad;
  /* keep 2:1 aspect ratio */
  let vw=Math.max(cw,ch*2,80);
  let vh=vw/2;
  /* don't zoom out beyond world view */
  if(vw>1000){vw=1000;vh=500;}
  const cx=(minX+maxX)/2, cy=(minY+maxY)/2;
  bdrAnimateView(cx-vw/2,cy-vh/2,vw,vh,duration||500);
}

function bdrTranslate(enName){
  if(curLang==='en')return enName;
  const entry=ALL_WORLD_COUNTRIES.find(c=>c.n===enName);
  return entry&&entry.names&&entry.names[curLang]?entry.names[curLang]:enName;
}

function bdrReverseLookup(input){
  const low=input.toLowerCase().trim();
  if(!low)return null;
  const enMatch=Object.keys(NEIGHBORS).find(c=>c.toLowerCase()===low);
  if(enMatch)return enMatch;
  for(const wc of ALL_WORLD_COUNTRIES){
    if(wc.names){
      if(wc.names[curLang]&&wc.names[curLang].toLowerCase()===low&&NEIGHBORS[wc.n]!==undefined)return wc.n;
      for(const l of Object.values(wc.names)){
        if(l.toLowerCase()===low&&NEIGHBORS[wc.n]!==undefined)return wc.n;
      }
    }
  }
  return null;
}

function bdrAutoComplete(){
  const inp=document.getElementById('bdr-input');
  const list=document.getElementById('bdr-suggestions');
  const val=inp.value.toLowerCase().trim();
  if(val.length<2){list.classList.remove('show');return;}
  const matches=bdr.pool.filter(c=>{
    if(bdr.visited.includes(c))return false;
    const tn=bdrTranslate(c).toLowerCase();
    const en=c.toLowerCase();
    const bestLen=Math.min(tn.length,en.length);
    const ratio=val.length/bestLen;
    return ratio>=0.75&&(tn.startsWith(val)||en.startsWith(val)||tn.includes(val));
  }).slice(0,6);
  if(matches.length===0){list.classList.remove('show');return;}
  list.innerHTML='';
  matches.forEach(c=>{
    const item=document.createElement('div');
    item.className='bdr-suggest-item';
    item.textContent=bdrTranslate(c);
    item.onclick=()=>{inp.value=bdrTranslate(c);list.classList.remove('show');bdrSubmit();};
    list.appendChild(item);
  });
  list.classList.add('show');
}

function bdrCloseSuggest(e){
  if(!e.target.closest('.bdr-suggest'))document.getElementById('bdr-suggestions').classList.remove('show');
}

function bdrShowFb(msg,type){
  const fb=document.getElementById('bdr-fb');
  fb.textContent=msg;fb.className='bdr-fb show '+type;
  setTimeout(()=>{fb.className='bdr-fb';},2000);
}

function bdrSubmit(){
  if(!bdr.running)return;
  const inp=document.getElementById('bdr-input');
  const val=inp.value.trim();
  if(!val)return;
  document.getElementById('bdr-suggestions').classList.remove('show');

  const country=bdrReverseLookup(val);
  if(!country){bdrShowFb(T.bdrNotFound||'Country not found!','bad');inp.value='';inp.focus();return;}
  if(bdr.visited.includes(country)){bdrShowFb(T.bdrAlready||'Already visited!','bad');inp.value='';inp.focus();return;}

  /* Check if country is a neighbor of ANY visited country */
  let isNeighbor=false;
  for(const v of bdr.visited){
    const nb=(NEIGHBORS[v]||[]).filter(n=>bdr.pool.includes(n));
    if(nb.includes(country)){isNeighbor=true;break;}
  }
  if(!isNeighbor){
    bdrShowFb(T.bdrWrong||'✗ Not a neighbor!','bad');
    try{GeoAudio.playSFX('wrong');}catch(e){}
    inp.value='';inp.focus();
    return;
  }

  bdr.visited.push(country);
  bdr.current=country;
  bdrShowFb(T.bdrCorrect||'✓ Correct neighbor!','ok');
  try{GeoAudio.playSFX('correct');}catch(e){}
  inp.value='';inp.focus();
  bdrUpdateUI();
  /* Smooth zoom to fit all visited countries */
  bdrZoomToCountry(country,500);

  if(bdr.visited.length>=bdr.pool.length){
    bdr.running=false;if(bdr.timer)clearInterval(bdr.timer);
    setTimeout(()=>bdrEnd(),1000);
    return;
  }
  // Check if completely stuck (no unvisited neighbors from any visited country)
  let anyNeighborsLeft=false;
  for(const v of bdr.visited){
    const nb=(NEIGHBORS[v]||[]).filter(n=>bdr.pool.includes(n)&&!bdr.visited.includes(n));
    if(nb.length>0){anyNeighborsLeft=true;break;}
  }
  if(!anyNeighborsLeft){bdr.running=false;if(bdr.timer)clearInterval(bdr.timer);setTimeout(()=>bdrEnd(),1500);}
}

function bdrHint(){
  if(!bdr.running)return;
  if(bdr.hints<=0){bdrShowFb(T.bdrNoHints||'No hints left!','bad');return;}
  /* Collect all unvisited neighbors from ALL visited countries */
  const allNeighbors=new Set();
  for(const v of bdr.visited){
    (NEIGHBORS[v]||[]).filter(n=>bdr.pool.includes(n)&&!bdr.visited.includes(n)).forEach(n=>allNeighbors.add(n));
  }
  if(allNeighbors.size===0){bdrShowFb('No unvisited neighbors!','bad');return;}
  bdr.hints--;
  const arr=[...allNeighbors];
  const hint=arr[Math.floor(Math.random()*arr.length)];
  const name=bdrTranslate(hint);
  bdrShowFb(T.bdrHintMsg?T.bdrHintMsg(name):'💡 Try: '+name,'ok');
  document.getElementById('bdr-hint-count').textContent=bdr.hints;
  document.getElementById('bdr-st-hints').textContent=bdr.hints;
}

function bdrEnd(){
  bdr.running=false;
  if(bdr.timer)clearInterval(bdr.timer);
  document.removeEventListener('click',bdrCloseSuggest);
  const score=bdr.visited.length*10;
  awardXP(Math.min(250,bdr.visited.length*4));
  // Region record tracking
  const recKey='bdr_rec_'+(bdr.region||'all');
  const prevRec=parseInt(localStorage.getItem(recKey)||'0');
  const isNewRec=bdr.visited.length>prevRec;
  if(isNewRec) localStorage.setItem(recKey,bdr.visited.length);
  const pct=bdr.pool.length>0?Math.round(bdr.visited.length/bdr.pool.length*100):0;
  try{
    achTrackMax('bdrBest',bdr.visited.length);
    if(bdr.hints===3&&bdr.visited.length>=10)achTrack('bdrNoHint10',1);
    if(bdr.timerVal>0){const elapsed=bdr.timerVal-bdr.timeLeft;if(bdr.visited.length>=15&&elapsed<=120)achTrack('bdrSpeed15',1);}
    if(bdr.region==='europe'&&bdr.visited.length>=bdr.pool.length)achSave(Object.assign(achStore(),{bdrEurope:true}));
    if(bdr.region==='asia'&&bdr.visited.length>=bdr.pool.length)achSave(Object.assign(achStore(),{bdrAsia:true}));
    if(bdr.region==='africa'&&bdr.visited.length>=bdr.pool.length)achSave(Object.assign(achStore(),{bdrAfrica:true}));
  }catch(e){}
  showOver({score:score,correct:bdr.visited.length,total_q:bdr.pool.length,bestStreak:bdr.visited.length,lastMode:'border',total:bdr.pool.length,
    bdrPct:pct,bdrIsNewRec:isNewRec,bdrPrevRec:prevRec,bdrRegion:bdr.region||'all'});
}


(function(){
  const saved=localStorage.getItem('geovs_lang');
  if(saved&&LANGS[saved]) { curLang=saved; T=LANGS[saved]; }
  document.querySelectorAll('.lang-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === curLang);
  });
  applyTranslations();
  initHome();
})();
