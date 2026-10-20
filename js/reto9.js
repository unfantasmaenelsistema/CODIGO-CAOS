/* Reto 9 — Nivel de acceso en una cookie sin firmar */
const COOKIE_NAME = "session_access_level";
const REQUIRED_LEVEL = 10;
const _d = "==Qf58VQZVFVfNVRfVUSL90TD9VQMt3RBxkR";
// La misma ruta que usa el navegador por defecto (RFC 6265), para que
// «document.cookie = "session_access_level=10"» desde la consola sustituya a esta cookie.
const COOKIE_PATH = location.pathname.replace(/\/[^\/]*$/, "") || "/";

function getCookie(name) {
  const pair = document.cookie.split(";").map(c => c.trim()).find(c => c.indexOf(name + "=") === 0);
  return pair ? pair.slice(name.length + 1) : null;
}
if (getCookie(COOKIE_NAME) === null) document.cookie = `${COOKIE_NAME}=1; Max-Age=86400; Path=${COOKIE_PATH}; SameSite=Lax`;
const accessLevel = parseInt(getCookie(COOKIE_NAME), 10) || 1;
const isVip = accessLevel >= REQUIRED_LEVEL;

CC.init({
  es: {
    docTitle: 'El nivel VIP', title: 'RETO 9: El nivel VIP', cat: 'Cookies', lvl: 'Media',
    lvlLbl: 'Nivel de acceso:', reload: 'Recargar', denied: 'Acceso denegado (se requiere nivel 10)', granted: 'ACCESO VIP CONCEDIDO',
    welcome: '¡Bandera VIP encontrada! La bandera es:',
    story: '<p>El nivel de acceso del usuario se guarda en una cookie del navegador. Para obtener la bandera tienes que subir al estatus VIP (nivel 10).</p><p class="mission">Descubre cómo se llama la cookie del nivel de acceso, cambia su valor a 10 y recarga la página.</p>',
    h1: 'F12 → <b>Aplicación</b> (<b>Almacenamiento</b> en Firefox) → <b>Cookies</b>. Hay una cookie cuyo valor coincide con el nivel que ves en pantalla.',
    h2: 'Cambia <code>session_access_level</code> a <code>10</code> y recarga. Desde la consola: <code>document.cookie = "session_access_level=10"</code> y recarga.',
    learn: 'Una cookie es un dato que el cliente guarda y devuelve; puede editarla a su antojo. Si la autorización depende de ella, hay que firmarla (HMAC, JWT validado en el servidor) o, mejor, guardar solo un identificador de sesión aleatorio y los permisos en el servidor.'
  },
  en: {
    docTitle: 'The VIP level', title: 'CHALLENGE 9: The VIP level', cat: 'Cookies', lvl: 'Medium',
    lvlLbl: 'Access level:', reload: 'Reload', denied: 'Access denied (level 10 required)', granted: 'VIP ACCESS GRANTED',
    welcome: 'VIP flag found! The flag is:',
    story: '<p>The user’s access level is stored in a browser cookie. To get the flag you have to rise to VIP status (level 10).</p><p class="mission">Find out the name of the access-level cookie, change its value to 10 and reload the page.</p>',
    h1: 'F12 → <b>Application</b> (<b>Storage</b> in Firefox) → <b>Cookies</b>. One cookie’s value matches the level shown on screen.',
    h2: 'Change <code>session_access_level</code> to <code>10</code> and reload. From the console: <code>document.cookie = "session_access_level=10"</code> and reload.',
    learn: 'A cookie is data the client stores and sends back; it can edit it at will. If authorisation depends on it, it must be signed (HMAC, a JWT validated on the server) or, better, store only a random session ID and keep permissions on the server.'
  },
  onLang: function () {
    document.getElementById('accessLevel').textContent = accessLevel;
    document.getElementById('accessLevel').classList.toggle('on', isVip);
    const st = document.getElementById('accessStatus');
    st.textContent = CC.t(isVip ? 'granted' : 'denied');
    st.classList.toggle('on', isVip);
  }
});

if (isVip) {
  document.getElementById('flagOut').textContent = atob(_d.split("").reverse().join(""));
  document.getElementById('reveal').classList.remove('hidden');
}
