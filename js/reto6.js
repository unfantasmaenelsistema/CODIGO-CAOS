/* Reto 6 — Estado del jugador en localStorage */
const STORAGE_KEY = "ctf_player_level";
const REQUIRED_LEVEL = 99;
const _d = "9ZzXPlVVU91UF91TU5URJ1UQOV0QB1ETBt3RBxkR";

let currentLevel = localStorage.getItem(STORAGE_KEY);
if (currentLevel === null) {
  currentLevel = "1"; // Nivel por defecto al empezar
  localStorage.setItem(STORAGE_KEY, currentLevel);
}
const unlockedNow = parseInt(currentLevel, 10) >= REQUIRED_LEVEL;
if (unlockedNow) {
  console.log("%c¡ACCESO DESBLOQUEADO! / ACCESS UNLOCKED!", "color:#00ff41;font-weight:bold");
  console.log("FLAG:", atob(_d.split("").reverse().join("")));
}

CC.init({
  es: {
    docTitle: 'El engaño del navegador', title: 'RETO 6: El engaño del navegador', cat: 'localStorage', lvl: 'Media',
    lvlLbl: 'Nivel del jugador:', reqLbl: 'Nivel requerido:',
    lowMsg: 'Nivel insuficiente. Necesitas el nivel 99 para ver la bandera.', highMsg: '¡NIVEL DE ACCESO AUTORIZADO! La bandera se ha revelado en la consola.',
    story: '<p>Para que no tengas que empezar la misión cada vez, guardamos tu progreso en la «memoria local» de tu navegador. El sistema de verificación la consulta antes de darte acceso.</p><p class="mission">Descubre dónde está guardado tu estado de jugador y cómo se llama la clave. ¿Qué valor necesitas para convencer al sistema de que tienes el nivel 99?</p>',
    h1: 'F12 → <b>Aplicación</b> → <b>Almacenamiento local</b> (en Firefox, <b>Almacenamiento</b> → <b>Almacenamiento local</b>). Busca la clave <code>ctf_player_level</code>.',
    h2: 'Cambia su valor a <code>99</code> (doble clic sobre el valor) o, desde la consola, <code>localStorage.setItem(\'ctf_player_level\', \'99\')</code>. Recarga la página y mira la consola.',
    learn: '<code>localStorage</code> es almacenamiento del navegador que el usuario controla por completo. Guardar en él niveles, roles, saldos o el estado de una compra permite falsearlos. El servidor debe ser la fuente de verdad de todo lo que importe.'
  },
  en: {
    docTitle: 'The browser trick', title: 'CHALLENGE 6: The browser trick', cat: 'localStorage', lvl: 'Medium',
    lvlLbl: 'Player level:', reqLbl: 'Required level:',
    lowMsg: 'Level too low. You need level 99 to see the flag.', highMsg: 'ACCESS LEVEL AUTHORISED! The flag has been revealed in the console.',
    story: '<p>So you do not have to restart the mission every time, we store your progress in your browser’s “local memory”. The verification system checks it before granting access.</p><p class="mission">Find out where your player state is stored and what the key is called. Which value do you need to convince the system you are level 99?</p>',
    h1: 'F12 → <b>Application</b> → <b>Local storage</b> (in Firefox, <b>Storage</b> → <b>Local Storage</b>). Look for the <code>ctf_player_level</code> key.',
    h2: 'Change its value to <code>99</code> (double-click the value) or, from the console, <code>localStorage.setItem(\'ctf_player_level\', \'99\')</code>. Reload the page and check the console.',
    learn: '<code>localStorage</code> is browser storage the user fully controls. Keeping levels, roles, balances or purchase state there lets anyone fake them. The server must be the source of truth for anything that matters.'
  },
  onLang: function () {
    var lv = document.getElementById('playerLevel'), msg = document.getElementById('levelMsg');
    lv.textContent = currentLevel;
    lv.classList.toggle('on', unlockedNow);
    msg.textContent = CC.t(unlockedNow ? 'highMsg' : 'lowMsg');
    msg.className = 'result ' + (unlockedNow ? 'ok' : 'info');
  }
});
