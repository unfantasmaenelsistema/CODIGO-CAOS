/* Reto 5 — robots.txt. La bandera NO está en este script: solo su SHA-256, en assets/cc.js. */
CC.init({
  es: {
    docTitle: 'El mapa del sitio', title: 'RETO 5: El mapa del sitio', cat: 'Reconocimiento', lvl: 'Fácil',
    story: '<p>La bandera no está en esta página ni en su JavaScript. Está en un lugar que los motores de búsqueda <b>no deberían</b> visitar.</p><p class="mission">¿Qué archivo usan las webs para decir a los <i>crawlers</i> dónde no deben buscar? Ese archivo contiene la ruta de la bandera.</p>',
    h1: 'Es un archivo de texto estándar que vive en la raíz de los sitios web y se llama <code>robots.txt</code>.',
    h2: 'Abre <code>robots.txt</code> en la misma carpeta que esta página (cambia <code>reto5.html</code> por <code>robots.txt</code> en la barra de direcciones) y visita las rutas de las líneas <code>Disallow</code>.',
    learn: '<code>robots.txt</code> es una petición de cortesía para los buscadores, no un control de acceso: cualquiera puede leerlo, y los atacantes lo miran precisamente para encontrar rutas «interesantes». Lo que no deba ser público se protege con autenticación en el servidor.'
  },
  en: {
    docTitle: 'The site map', title: 'CHALLENGE 5: The site map', cat: 'Reconnaissance', lvl: 'Easy',
    story: '<p>The flag is not on this page or in its JavaScript. It is somewhere search engines <b>should not</b> visit.</p><p class="mission">Which file do websites use to tell crawlers where not to look? That file contains the path to the flag.</p>',
    h1: 'It is a standard text file that lives at the root of websites and is called <code>robots.txt</code>.',
    h2: 'Open <code>robots.txt</code> in the same folder as this page (replace <code>reto5.html</code> with <code>robots.txt</code> in the address bar) and visit the paths in the <code>Disallow</code> lines.',
    learn: '<code>robots.txt</code> is a courtesy request for search engines, not access control: anyone can read it, and attackers check it precisely to find “interesting” paths. Anything that must not be public is protected with server-side authentication.'
  }
});
