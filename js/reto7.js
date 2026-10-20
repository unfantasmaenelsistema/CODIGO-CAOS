/* Reto 7 — Inyección SQL en el login (base de datos simulada con js/minisql.js).
 * La consulta se construye pegando el texto del usuario, como en un backend vulnerable:
 *   "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"  */
const USERS = [
  { id: 1, username: 'admin', password: 'Zq7#vR2!mK9xLp', role: 'admin' },
  { id: 2, username: 'invitado', password: 'invitado', role: 'user' }
];
const _d = "==Qf381czRDc5J0XOBTMUN0MK5USfxUUTt3RBxkR";
let lastState = null;

function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

function showQuery() {
  const u = document.getElementById('usernameInput').value, p = document.getElementById('passwordInput').value;
  document.getElementById('queryOut').innerHTML =
    "SELECT * FROM users WHERE username = '<mark>" + esc(u) + "</mark>' AND password = '<mark>" + esc(p) + "</mark>'";
}

function renderResult() {
  const box = document.getElementById('loginResult');
  if (!lastState) { box.className = 'result info'; box.textContent = CC.t('loginIdle'); return; }
  if (lastState.error) { box.className = 'result err'; box.textContent = 'SQL ERROR: ' + lastState.error; return; }
  const row = lastState.rows[0];
  if (!row) { box.className = 'result err'; box.textContent = CC.t('loginFail'); return; }
  if (row.role !== 'admin') { box.className = 'result info'; box.textContent = CC.t('loginUser').replace('{u}', row.username); return; }
  box.className = 'result ok';
  box.innerHTML = esc(CC.t('loginAdmin')) + ' <code>' + esc(atob(_d.split('').reverse().join(''))) + '</code>';
}

CC.init({
  es: {
    docTitle: 'Inyección en el login', title: 'RETO 7: Inyección en el login', cat: 'Inyección SQL', lvl: 'Media',
    userLbl: 'Nombre de usuario', passLbl: 'Contraseña', loginBtn: 'Iniciar sesión', queryLbl: 'Consulta que ejecuta el servidor',
    loginIdle: 'Esperando credenciales…', loginFail: 'Error de autenticación: usuario o contraseña incorrectos.',
    loginUser: 'Sesión iniciada como «{u}», pero solo el administrador ve la bandera.', loginAdmin: '¡BYPASS CONSEGUIDO! Has entrado como admin. La bandera es:',
    story: '<p>Este formulario de acceso construye la consulta SQL <b>pegando lo que escribes</b>. Debajo ves en directo la consulta que ejecutaría el servidor contra una tabla <code>users</code> (simulada en tu navegador, pero evaluada de verdad).</p><p class="mission">Entra como <code>admin</code> sin conocer su contraseña.</p>',
    h1: 'Escribe una comilla simple <code>\'</code> en el usuario y mira la consulta: la comilla cierra la cadena antes de tiempo y el resto se lee como código SQL (verás un error de sintaxis).',
    h2: 'Haz que la condición sea siempre verdadera o anula la comprobación de contraseña con un comentario: <code>admin\' -- </code> o <code>\' OR 1=1 -- </code> (con un espacio tras <code>--</code>). Fíjate: <code>\' OR \'1\'=\'1</code> solo en el usuario no basta, porque <code>AND</code> va antes que <code>OR</code>.',
    learn: 'La inyección SQL aparece al construir consultas concatenando texto del usuario. La solución son las <b>consultas parametrizadas</b> (<i>prepared statements</i>): el valor viaja aparte y nunca se interpreta como SQL. Además, las contraseñas se guardan con un hash lento (bcrypt, Argon2), nunca en claro.'
  },
  en: {
    docTitle: 'Login injection', title: 'CHALLENGE 7: Login injection', cat: 'SQL injection', lvl: 'Medium',
    userLbl: 'Username', passLbl: 'Password', loginBtn: 'Log in', queryLbl: 'Query the server runs',
    loginIdle: 'Waiting for credentials…', loginFail: 'Authentication error: wrong username or password.',
    loginUser: 'Logged in as “{u}”, but only the administrator sees the flag.', loginAdmin: 'BYPASS ACHIEVED! You are logged in as admin. The flag is:',
    story: '<p>This login form builds the SQL query by <b>pasting what you type</b>. Below you can see, live, the query the server would run against a <code>users</code> table (simulated in your browser, but really evaluated).</p><p class="mission">Log in as <code>admin</code> without knowing their password.</p>',
    h1: 'Type a single quote <code>\'</code> in the username and watch the query: the quote closes the string early and the rest is read as SQL code (you will get a syntax error).',
    h2: 'Make the condition always true or cancel the password check with a comment: <code>admin\' -- </code> or <code>\' OR 1=1 -- </code> (with a space after <code>--</code>). Note: <code>\' OR \'1\'=\'1</code> in the username alone is not enough, because <code>AND</code> binds before <code>OR</code>.',
    learn: 'SQL injection appears when queries are built by concatenating user text. The fix is <b>parameterised queries</b> (prepared statements): the value travels separately and is never interpreted as SQL. Passwords are also stored with a slow hash (bcrypt, Argon2), never in plain text.'
  },
  onLang: renderResult
});

['usernameInput', 'passwordInput'].forEach(function (id) { document.getElementById(id).addEventListener('input', showQuery); });
document.getElementById('loginForm').addEventListener('submit', function (ev) {
  ev.preventDefault();
  lastState = MiniSQL.login(USERS, document.getElementById('usernameInput').value, document.getElementById('passwordInput').value);
  renderResult();
});
showQuery();
