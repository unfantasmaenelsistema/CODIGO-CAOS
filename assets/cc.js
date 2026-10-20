/* cc.js — base común de CÓDIGO CAOS (Un Fantasma en el Sistema, MIT)
 * Cabecera y pie de la casa, idioma ES/EN, tema claro/oscuro, progreso y comprobación de flags.
 * Las flags solo están aquí como SHA-256: leer este archivo no las revela. */
(function () {
  'use strict';

  var HASHES = {
    1: 'dea8bf24596384c1f09a507d50ec694381a6174333ed590d0f4b566275a5d8e3',
    2: 'd555d75d9b3440ddb8131a4c3c52fefa10f99aa129a2cb68780680577566315e',
    3: '35105e46028bb1f4eb3ccaea87069c56ff16db89a206e24791b37baedd22cb32',
    4: 'ae1932e4cded9d38bf47d077be1d137d0f46f66e21389118582c90eb482a18e8',
    5: 'f3f2a9a183d46661c3b85ed0f2ae98ca2a70bc3179cbfcf8be0bd800c0523f4d',
    6: '31962d593b48efe0187783da78798b8c1f89e6162c0fcb0a4a7240e4bda562ad',
    7: '8209fa3fe4895ee5ebac388b4f4230cf167c04531cfce03b0d2b7ebb4c9b1e38',
    8: '326a721b1062723b4cfa1b59916bb389821a1e1426c9cce3430c3421cc529dfc',
    9: '597e0a45ecc6a58fa58c5b8e1adbb5570ac5edb0b3148789bf5ae45e3f0198dc',
    10: '7f3333b278d4502a98f90545a8f5a7a417f33f3d660f05d3f4842bc3538ed7cc'
  };
  var TOTAL = 10;
  var REPO = 'https://github.com/unfantasmaenelsistema/CODIGO-CAOS';

  var COMMON = {
    es: {
      back: '← Volver a la misión', prev: '← Anterior', next: 'Siguiente →', reto: 'Reto',
      placeholder: 'FLAG{...}', verify: 'Verificar', checking: 'Verificando...', hint: 'Pista', learnTitle: 'Qué has aprendido',
      flagLbl: 'Introduce la bandera (flag):',
      ok: '¡Bandera correcta! Acceso concedido.', okLast: '¡CTF completado! Has encontrado la bandera maestra.', ko: 'Bandera incorrecta. Inténtalo de nuevo.', empty: 'Escribe una bandera primero.',
      goNext: 'Ir al reto {n} →', goHome: 'Volver a la misión →', solved: 'Superado',
      locked: '🔒 Este reto aún está bloqueado: la misión pide completar antes el reto {p}. Aunque… el bloqueo solo existe en tu navegador, así que nada te impide jugarlo (y eso ya es una lección).',
      themeTitle: 'Cambiar tema', langTitle: 'English', fLocal: 'Todo funciona en tu navegador',
      writeup: 'Writeup (spoilers)', easy: 'Fácil', medium: 'Media'
    },
    en: {
      back: '← Back to the mission', prev: '← Previous', next: 'Next →', reto: 'Challenge',
      placeholder: 'FLAG{...}', verify: 'Check', checking: 'Checking...', hint: 'Hint', learnTitle: 'What you learned',
      flagLbl: 'Enter the flag:',
      ok: 'Correct flag! Access granted.', okLast: 'CTF complete! You found the master flag.', ko: 'Wrong flag. Try again.', empty: 'Type a flag first.',
      goNext: 'Go to challenge {n} →', goHome: 'Back to the mission →', solved: 'Solved',
      locked: '🔒 This challenge is still locked: the mission asks you to finish challenge {p} first. Then again… the lock only exists in your browser, so nothing stops you from playing it (and that is already a lesson).',
      themeTitle: 'Toggle theme', langTitle: 'Español', fLocal: 'Everything runs in your browser',
      writeup: 'Writeup (spoilers)', easy: 'Easy', medium: 'Medium'
    }
  };

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var lang = store('cc-lang') || ((navigator.language || 'es').slice(0, 2) === 'es' ? 'es' : 'en');
  if (lang !== 'es' && lang !== 'en') lang = 'es';
  var page = { es: {}, en: {} }, onLang = null, validator = null;

  function t(k, vars) {
    var s = page[lang][k]; if (s === undefined) s = COMMON[lang][k];
    if (s === undefined) s = page.es[k] !== undefined ? page.es[k] : COMMON.es[k];
    if (s === undefined) return k;
    if (vars) s = String(s).replace(/\{(\w+)\}/g, function (_, v) { return vars[v]; });
    return s;
  }

  function solvedList() { try { var a = JSON.parse(store('cc-solved') || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function markSolved(n) { var s = solvedList(); if (s.indexOf(n) < 0) { s.push(n); store('cc-solved', JSON.stringify(s)); } }
  // Un reto está disponible si es el 1 o si el anterior está superado.
  function unlocked(n) { return n === 1 || solvedList().indexOf(n - 1) > -1; }

  /* SHA-256: Web Crypto cuando hay contexto seguro (https, localhost) y una versión
     en JS puro para file:// u otros casos en que crypto.subtle no existe. */
  function sha256js(str) {
    var K = [], H = [], i, j, p = 2, n;
    function frac(x) { return ((x - Math.floor(x)) * 4294967296) | 0; }
    for (n = 0; n < 64; p++) { for (j = 2; j * j <= p; j++) if (p % j === 0) break; if (j * j > p) { if (n < 8) H[n] = frac(Math.pow(p, 1 / 2)); K[n++] = frac(Math.pow(p, 1 / 3)); } }
    var bytes = Array.from(new TextEncoder().encode(str)), bl = bytes.length * 8;
    bytes.push(0x80); while (bytes.length % 64 !== 56) bytes.push(0);
    for (i = 7; i >= 0; i--) bytes.push(i > 3 ? 0 : (bl >>> (i * 8)) & 255);
    var W = [], ror = function (x, r) { return (x >>> r) | (x << (32 - r)); };
    for (i = 0; i < bytes.length; i += 64) {
      for (j = 0; j < 64; j++) {
        if (j < 16) W[j] = (bytes[i + j * 4] << 24) | (bytes[i + j * 4 + 1] << 16) | (bytes[i + j * 4 + 2] << 8) | bytes[i + j * 4 + 3];
        else { var a = W[j - 15], b = W[j - 2]; W[j] = (W[j - 16] + (ror(a, 7) ^ ror(a, 18) ^ (a >>> 3)) + W[j - 7] + (ror(b, 17) ^ ror(b, 19) ^ (b >>> 10))) | 0; }
      }
      var h = H.slice();
      for (j = 0; j < 64; j++) {
        var t1 = (h[7] + (ror(h[4], 6) ^ ror(h[4], 11) ^ ror(h[4], 25)) + ((h[4] & h[5]) ^ (~h[4] & h[6])) + K[j] + W[j]) | 0;
        var t2 = ((ror(h[0], 2) ^ ror(h[0], 13) ^ ror(h[0], 22)) + ((h[0] & h[1]) ^ (h[0] & h[2]) ^ (h[1] & h[2]))) | 0;
        h = [(t1 + t2) | 0, h[0], h[1], h[2], (h[3] + t1) | 0, h[4], h[5], h[6]];
      }
      for (j = 0; j < 8; j++) H[j] = (H[j] + h[j]) | 0;
    }
    return H.map(function (x) { return (x >>> 0).toString(16).padStart(8, '0'); }).join('');
  }
  function sha256(str) {
    if (window.crypto && crypto.subtle && window.isSecureContext) {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function (buf) {
        return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
      });
    }
    return Promise.resolve(sha256js(str));
  }

  function header() {
    var el = document.getElementById('cc-header'); if (!el) return;
    el.outerHTML = '<header class="cc-header">' +
      '<a href="index.html" class="cc-logo"><img src="icono.png" alt="Un Fantasma en el Sistema"><span>CÓDIGO <b>CAOS</b></span></a>' +
      '<div class="cc-right"><a class="cc-site" href="https://www.unfantasmaenelsistema.com" target="_blank" rel="noopener">unfantasmaenelsistema.com</a>' +
      '<button class="cc-btn" id="cc-lang" type="button"></button><button class="cc-btn" id="cc-theme" type="button"></button></div></header>';
    document.getElementById('cc-lang').onclick = function () { lang = lang === 'es' ? 'en' : 'es'; store('cc-lang', lang); apply(); };
    document.getElementById('cc-theme').onclick = function () {
      var nt = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nt); store('cc-theme', nt); syncTheme();
    };
  }
  function footer() {
    var el = document.getElementById('cc-footer'); if (!el) return;
    el.outerHTML = '<footer class="cc-footer"><a href="https://www.unfantasmaenelsistema.com" target="_blank" rel="noopener" class="cc-fbrand">' +
      '<img src="icono.png" alt="Un Fantasma en el Sistema" width="28" height="28"><span><b>Un Fantasma en el Sistema</b><small>unfantasmaenelsistema.com</small></span></a>' +
      '<div class="cc-flinks"><span data-i18n="fLocal"></span><span>·</span><a href="' + REPO + '" target="_blank" rel="noopener">GitHub</a><span>·</span>' +
      '<a href="' + REPO + '/blob/main/writeup/WRITEUP.md" target="_blank" rel="noopener" data-i18n="writeup"></a><span>·</span><span>MIT</span></div></footer>';
  }
  function syncTheme() {
    var b = document.getElementById('cc-theme'); if (!b) return;
    b.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀' : '☾';
    b.title = t('themeTitle');
  }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
    if (page[lang].docTitle) document.title = page[lang].docTitle + ' · CÓDIGO CAOS';
    var lb = document.getElementById('cc-lang'); if (lb) { lb.textContent = lang === 'es' ? 'EN' : 'ES'; lb.title = t('langTitle'); }
    syncTheme(); renderState();
    if (onLang) onLang(lang);
  }

  function renderState() {
    var n = +document.body.getAttribute('data-reto'); if (!n) return;
    var done = solvedList().indexOf(n) > -1;
    var badge = document.getElementById('solvedBadge'); if (badge) { badge.classList.toggle('hidden', !done); badge.textContent = '✓ ' + t('solved'); }
    var learn = document.getElementById('learn'); if (learn) learn.classList.toggle('hidden', !done);
    var lock = document.getElementById('lockNote'); if (lock) { lock.classList.toggle('hidden', unlocked(n)); lock.textContent = t('locked', { p: n - 1 }); }
    var go = document.getElementById('goNext');
    if (go) { go.classList.toggle('hidden', !done); go.textContent = n < TOTAL ? t('goNext', { n: n + 1 }) : t('goHome'); }
  }

  // Bloque estándar: barra de terminal, caja de flag, pistas, aprendizaje y paginación.
  function buildChallenge(n) {
    var bar = document.getElementById('cc-bar');
    if (bar) bar.innerHTML = '<span>Reto_' + n + '.exe — <span data-i18n="cat"></span></span><span class="dots"><i></i><i></i><i></i></span>';
    var top = document.getElementById('cc-top');
    if (top) top.innerHTML = '<a href="index.html" class="crumb" data-i18n="back"></a>' +
      '<div class="reto-meta"><span class="reto-num"><span data-i18n="reto"></span> ' + n + ' / ' + TOTAL + '</span>' +
      '<span class="tag" data-i18n="cat"></span><span class="tag lvl" data-i18n="lvl"></span><span class="tag ok hidden" id="solvedBadge"></span></div>' +
      '<p class="lock hidden" id="lockNote"></p>';
    var box = document.getElementById('cc-flag');
    if (box) {
      var hints = '';
      for (var i = 1; page.es['h' + i]; i++) hints += '<details class="hint"><summary><span data-i18n="hint"></span> ' + i + '</summary><p data-i18n-html="h' + i + '"></p></details>';
      box.innerHTML = '<form class="flagbox" id="flagForm" autocomplete="off"><label for="flagInput" data-i18n="flagLbl"></label>' +
        '<div class="row"><input id="flagInput" spellcheck="false" data-i18n-ph="placeholder"><button type="submit" class="btn" data-i18n="verify"></button></div></form>' +
        '<p id="feedback" role="status"></p><a class="btn ghost hidden" id="goNext" href="' + (n < TOTAL ? 'reto' + (n + 1) + '.html' : 'index.html') + '"></a>' + hints +
        '<div class="learn hidden" id="learn"><b data-i18n="learnTitle"></b><p data-i18n-html="learn"></p></div>' +
        '<nav class="pager">' + (n > 1 ? '<a href="reto' + (n - 1) + '.html" data-i18n="prev"></a>' : '<span></span>') +
        (n < TOTAL ? '<a href="reto' + (n + 1) + '.html" data-i18n="next"></a>' : '<a href="index.html" data-i18n="back"></a>') + '</nav>';
      document.getElementById('flagForm').addEventListener('submit', function (ev) {
        ev.preventDefault();
        var v = document.getElementById('flagInput').value.trim(), fb = document.getElementById('feedback');
        if (!v) { fb.textContent = t('empty'); fb.className = 'bad'; return; }
        fb.textContent = t('checking'); fb.className = '';
        var check = validator ? Promise.resolve(!!validator(v)) : sha256(v).then(function (h) { return h === HASHES[n]; });
        check.then(function (ok) {
          setTimeout(function () {
            fb.textContent = ok ? (n === TOTAL ? t('okLast') : t('ok')) : t('ko'); fb.className = ok ? 'good' : 'bad';
            if (ok) { markSolved(n); renderState(); }
          }, 350);
        });
      });
    }
  }

  window.CC = {
    t: t, lang: function () { return lang; }, solved: solvedList, unlocked: unlocked, total: TOTAL, sha256: sha256, sha256js: sha256js, repo: REPO,
    resetProgress: function () { store('cc-solved', '[]'); apply(); },
    init: function (opts) {
      opts = opts || {};
      page = { es: opts.es || {}, en: opts.en || {} };
      onLang = opts.onLang || null;
      validator = opts.validate || null;
      header(); footer();
      var n = +document.body.getAttribute('data-reto');
      if (n) buildChallenge(n);
      apply();
    }
  };
})();
