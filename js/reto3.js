/* Reto 3 — La lógica de validación está en el cliente.
 * La bandera está «troceada» para que no aparezca de una pieza: concatenar no es cifrar. */
const part1 = "FLAG{";
const part2 = "JAVASCRIPT_ES_FACIL_DE_LEER_3";
const part3 = "}";
const CORRECT_FLAG = part1 + part2 + part3;

/**
 * Función de validación. Como se ejecuta en tu navegador, puedes leerla… o sustituirla.
 * @returns {boolean} true si la bandera es correcta.
 */
function validateFlag(input) {
  return input === CORRECT_FLAG;
}

CC.init({
  // Este reto valida con validateFlag (y no con el hash común) para que redefinirla funcione.
  validate: function (v) { return window.validateFlag(v); },
  es: {
    docTitle: 'El algoritmo transparente', title: 'RETO 3: El algoritmo transparente', cat: 'JavaScript', lvl: 'Fácil',
    story: '<p>Esta vez la bandera no está en un comentario ni en un estilo oculto: está en la <b>lógica del programa</b>. Para pasar, convence a la función de verificación de que conoces la bandera.</p><p class="mission">Analiza el script <code>js/reto3.js</code>. Cuando entiendas cómo verifica, puedes pasar de dos maneras:</p><ol style="margin:0 0 12px 22px"><li>Descubrir el valor de la bandera.</li><li>Cambiar la lógica del programa mientras se ejecuta (¡usa la consola!).</li></ol>',
    h1: 'F12 → <b>Fuentes</b> (<b>Depurador</b> en Firefox) → <code>js/reto3.js</code>. Fíjate en cómo se construye <code>CORRECT_FLAG</code>.',
    h2: 'Vía 1: escribe <code>CORRECT_FLAG</code> en la consola. Vía 2: redefine la función con <code>validateFlag = () =&gt; true</code> y pulsa Verificar con cualquier texto.',
    learn: 'Todo el código JavaScript que valida en el navegador se puede leer y modificar. Trocear una cadena no la oculta, y una función de validación del cliente se puede sustituir desde la consola. Las comprobaciones que importan se hacen en el servidor.'
  },
  en: {
    docTitle: 'The transparent algorithm', title: 'CHALLENGE 3: The transparent algorithm', cat: 'JavaScript', lvl: 'Easy',
    story: '<p>This time the flag is not in a comment or a hidden style: it is in the <b>program logic</b>. To pass, convince the verification function that you know the flag.</p><p class="mission">Analyse the <code>js/reto3.js</code> script. Once you understand how it checks, you can pass in two ways:</p><ol style="margin:0 0 12px 22px"><li>Find the value of the flag.</li><li>Change the program logic while it runs (use the console!).</li></ol>',
    h1: 'F12 → <b>Sources</b> (<b>Debugger</b> in Firefox) → <code>js/reto3.js</code>. Look at how <code>CORRECT_FLAG</code> is built.',
    h2: 'Way 1: type <code>CORRECT_FLAG</code> in the console. Way 2: redefine the function with <code>validateFlag = () =&gt; true</code> and press Check with any text.',
    learn: 'Any JavaScript that validates in the browser can be read and modified. Splitting a string does not hide it, and a client-side validation function can be replaced from the console. The checks that matter are made on the server.'
  }
});
