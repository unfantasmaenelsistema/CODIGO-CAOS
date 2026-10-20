/* Reto 4 — Bandera «enmascarada» en Base64 */
const ENCODED_FLAG = "RkxBR3tCQVNFNjRfTk9fRVNfU0VDUkVUT180fQ==";

CC.init({
  es: {
    docTitle: 'El código enmascarado', title: 'RETO 4: El código enmascarado', cat: 'Codificación', lvl: 'Fácil',
    story: '<p>El algoritmo anterior era demasiado obvio. Esta vez el código secreto se ha <b>enmascarado</b> con una codificación sencilla que a menudo se confunde con cifrado.</p><p class="mission">Busca en el script la variable que guarda la bandera codificada. Tiene un patrón reconocible: letras, números, <code>+</code> y <code>/</code>, y a menudo termina en <code>=</code>. Descodifícala y tendrás la clave.</p>',
    h1: 'F12 → <b>Fuentes</b> → <code>js/reto4.js</code>. La variable se llama <code>ENCODED_FLAG</code>.',
    h2: 'Es Base64. En la consola: <code>atob(ENCODED_FLAG)</code>. En una terminal: <code>echo \'…\' | base64 -d</code>. En CyberChef: «From Base64».',
    learn: 'Base64 es una <b>codificación</b>, no un cifrado ni un hash: no tiene clave y se deshace al instante. Sirve para transportar bytes como texto, nunca para proteger secretos.'
  },
  en: {
    docTitle: 'The masked code', title: 'CHALLENGE 4: The masked code', cat: 'Encoding', lvl: 'Easy',
    story: '<p>The previous algorithm was too obvious. This time the secret code has been <b>masked</b> with a simple encoding that is often mistaken for encryption.</p><p class="mission">Look in the script for the variable holding the encoded flag. It has a recognisable pattern: letters, numbers, <code>+</code> and <code>/</code>, and it often ends in <code>=</code>. Decode it and you have the key.</p>',
    h1: 'F12 → <b>Sources</b> → <code>js/reto4.js</code>. The variable is called <code>ENCODED_FLAG</code>.',
    h2: 'It is Base64. In the console: <code>atob(ENCODED_FLAG)</code>. In a terminal: <code>echo \'…\' | base64 -d</code>. In CyberChef: “From Base64”.',
    learn: 'Base64 is an <b>encoding</b>, not encryption or a hash: it has no key and is undone instantly. It exists to carry bytes as text, never to protect secrets.'
  }
});
