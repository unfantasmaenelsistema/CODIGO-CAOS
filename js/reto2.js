/* Reto 2 — Elemento oculto con una clase CSS */
CC.init({
  es: {
    docTitle: 'El velo invisible', title: 'RETO 2: El velo invisible', cat: 'CSS / DOM', lvl: 'Fácil',
    story: '<p>Has demostrado que encuentras notas en el código, pero ¿qué pasa cuando el contenido está ahí y la <b>interfaz no te lo enseña</b>? La bandera de este reto está en el DOM, tapada por un velo.</p><p class="mission">Usa el inspector para analizar los elementos de la página y descubre qué regla de estilo le dice al navegador que no muestre el elemento secreto.</p>',
    h1: 'F12 → <b>Elementos</b> (<b>Inspector</b> en Firefox). Los elementos que no se ven salen atenuados.',
    h2: 'Selecciona el <code>div</code> con id <code>hiddenFlag</code>. En el panel <b>Estilos</b>, la clase <code>.oculto-css</code> tiene <code>display: none</code>: desmárcala y la bandera aparece. Ojo, que el texto también está pintado del color del fondo.',
    learn: 'CSS controla cómo se ve una página, no quién puede leerla. Todo el HTML llega al cliente: ocultar algo con <code>display: none</code>, <code>visibility: hidden</code> o texto del color del fondo no protege nada.'
  },
  en: {
    docTitle: 'The invisible veil', title: 'CHALLENGE 2: The invisible veil', cat: 'CSS / DOM', lvl: 'Easy',
    story: '<p>You have shown you can find notes in the code, but what happens when the content is there and the <b>interface does not show it</b>? This challenge’s flag is in the DOM, covered by a veil.</p><p class="mission">Use the inspector to analyse the page elements and find out which style rule tells the browser not to show the secret element.</p>',
    h1: 'F12 → <b>Elements</b> (<b>Inspector</b> in Firefox). Elements that are not displayed appear dimmed.',
    h2: 'Select the <code>div</code> with id <code>hiddenFlag</code>. In the <b>Styles</b> panel, the <code>.oculto-css</code> class has <code>display: none</code>: untick it and the flag appears. Note the text is also painted in the background colour.',
    learn: 'CSS controls how a page looks, not who can read it. All the HTML reaches the client: hiding something with <code>display: none</code>, <code>visibility: hidden</code> or text in the background colour protects nothing.'
  }
});
