/* Reto 10 — La bandera final está repartida en tres sitios:
 * la parte 1 en un comentario de reto10.html, la parte 2 en external_secrets.js
 * y la parte 3 aquí. La comprobación usa el SHA-256 de assets/cc.js. */

// PARTE 3: expuesta en una variable que nadie usa.
const FINAL_FLAG_PART_3 = "FU3NT3";

CC.init({
  es: {
    docTitle: 'El último archivo', title: 'RETO 10: El último archivo', cat: 'Reconocimiento', lvl: 'Media', formatLbl: 'Formato de la bandera final',
    story: '<p>El equipo de desarrollo ha dejado información sensible por todas partes: en comentarios HTML, en variables de JavaScript y en archivos que se enlazan pero no se usan.</p><p class="mission">Misión final: la bandera está dividida en tres partes. Busca en el código fuente de esta página y en <b>todos</b> los scripts que enlaza, y ensámblala.</p>',
    h1: 'Empieza con <b>Ctrl+U</b>: busca un comentario con la parte 1 y fíjate en qué archivos <code>.js</code> carga la página (las etiquetas <code>&lt;script src="…"&gt;</code> del final).',
    h2: 'Hay un script con un nombre muy sugerente, <code>external_secrets.js</code>, que guarda la parte 2 en una variable sin usar. La parte 3 está en <code>js/reto10.js</code>. Une las tres con guiones bajos dentro de <code>FLAG{…}</code>.',
    learn: 'El código del cliente es un libro abierto: comentarios, variables sin usar y scripts olvidados se descargan igual. En un pentest se revisan todos los recursos que carga la página (en F12 → <b>Red</b> o <b>Fuentes</b>), porque ahí aparecen claves de API, endpoints internos y restos de desarrollo.'
  },
  en: {
    docTitle: 'The last file', title: 'CHALLENGE 10: The last file', cat: 'Reconnaissance', lvl: 'Medium', formatLbl: 'Final flag format',
    story: '<p>The development team left sensitive information everywhere: in HTML comments, in JavaScript variables and in files that are linked but never used.</p><p class="mission">Final mission: the flag is split into three parts. Search this page’s source and <b>every</b> script it links, and put it together.</p>',
    h1: 'Start with <b>Ctrl+U</b>: look for a comment with part 1 and check which <code>.js</code> files the page loads (the <code>&lt;script src="…"&gt;</code> tags at the end).',
    h2: 'There is a script with a very suggestive name, <code>external_secrets.js</code>, which keeps part 2 in an unused variable. Part 3 is in <code>js/reto10.js</code>. Join the three with underscores inside <code>FLAG{…}</code>.',
    learn: 'Client-side code is an open book: comments, unused variables and forgotten scripts are downloaded all the same. A pentest reviews every resource the page loads (F12 → <b>Network</b> or <b>Sources</b>), because that is where API keys, internal endpoints and development leftovers show up.'
  }
});
