/* Reto 8 — XSS reflejado: el buscador pinta tu texto con innerHTML sin filtrar */
window.secretFlag8 = atob("==Qf481UTh1XUBVSSN0UfVERf50TJN0QFllTJt3RBxkR".split("").reverse().join(""));

function performSearch(text) {
  // ¡VULNERABLE! La entrada del usuario se inserta como HTML.
  document.getElementById('resultOutput').innerHTML = CC.t('searchFor') + ' ' + text;
}

CC.init({
  es: {
    docTitle: 'El buscador sin filtros', title: 'RETO 8: El buscador sin filtros', cat: 'XSS', lvl: 'Media',
    searchLbl: 'Buscar en el sitio', searchBtn: 'Buscar', resultLbl: 'Resultado de la búsqueda', searchFor: 'Búsqueda por:',
    story: '<p>Esta aplicación tiene un buscador muy simple: para ayudarte, pinta en la página exactamente lo que has buscado. Por desgracia, no filtra los caracteres especiales.</p><p class="mission">La bandera está en la variable global <code>window.secretFlag8</code>. Inyecta código en el buscador para que su valor aparezca en la página.</p>',
    h1: 'Busca <code>&lt;b&gt;hola&lt;/b&gt;</code>: si sale en negrita, la página está interpretando tu texto como HTML.',
    h2: 'Un <code>&lt;script&gt;</code> metido con <code>innerHTML</code> no se ejecuta, pero un atributo de evento sí: <code>&lt;img src=x onerror="alert(secretFlag8)"&gt;</code>. La imagen falla al cargar y <code>onerror</code> ejecuta tu JavaScript.',
    learn: 'Esto es <b>XSS</b> (<i>Cross-Site Scripting</i>): un atacante consigue ejecutar JavaScript en la página de otro usuario y robarle la sesión o actuar en su nombre. Se evita tratando la entrada como texto (<code>textContent</code>), codificando la salida según el contexto y con una política CSP.'
  },
  en: {
    docTitle: 'The unfiltered search', title: 'CHALLENGE 8: The unfiltered search', cat: 'XSS', lvl: 'Medium',
    searchLbl: 'Search the site', searchBtn: 'Search', resultLbl: 'Search result', searchFor: 'Search for:',
    story: '<p>This app has a very simple search box: to help you, it shows exactly what you searched for on the page. Unfortunately, it does not filter special characters.</p><p class="mission">The flag is in the global variable <code>window.secretFlag8</code>. Inject code into the search box so its value shows up on the page.</p>',
    h1: 'Search for <code>&lt;b&gt;hello&lt;/b&gt;</code>: if it comes out bold, the page is interpreting your text as HTML.',
    h2: 'A <code>&lt;script&gt;</code> inserted with <code>innerHTML</code> does not run, but an event attribute does: <code>&lt;img src=x onerror="alert(secretFlag8)"&gt;</code>. The image fails to load and <code>onerror</code> runs your JavaScript.',
    learn: 'This is <b>XSS</b> (Cross-Site Scripting): an attacker gets JavaScript running on another user’s page and steals their session or acts on their behalf. It is prevented by treating input as text (<code>textContent</code>), encoding output for its context, and with a CSP policy.'
  }
});

document.getElementById('searchForm').addEventListener('submit', function (ev) {
  ev.preventDefault();
  performSearch(document.getElementById('searchInput').value);
});
