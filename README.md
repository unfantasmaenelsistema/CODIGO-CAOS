# CÓDIGO CAOS

**CTF de seguridad web con 10 retos encadenados que se juega en el navegador**, de [Un Fantasma en el Sistema](https://www.unfantasmaenelsistema.com).

▶ **Jugar:** https://unfantasmaenelsistema.github.io/CODIGO-CAOS/

Cada reto esconde una bandera `FLAG{…}` y, al validarla, se desbloquea el siguiente. Solo hacen falta el navegador y sus herramientas de desarrollador (`F12`).

## Retos

| # | Reto | Técnica | Nivel |
|---|---|---|---|
| 1 | La cortina | Código fuente (comentarios HTML) | Fácil |
| 2 | El velo invisible | CSS / DOM (`display: none`) | Fácil |
| 3 | El algoritmo transparente | Validación en JavaScript | Fácil |
| 4 | El código enmascarado | Base64 | Fácil |
| 5 | El mapa del sitio | `robots.txt` | Fácil |
| 6 | El engaño del navegador | `localStorage` | Media |
| 7 | Inyección en el login | Inyección SQL | Media |
| 8 | El buscador sin filtros | XSS | Media |
| 9 | El nivel VIP | Cookies | Media |
| 10 | El último archivo | Recursos olvidados | Media |

Cada reto trae dos pistas y, al superarlo, explica la lección de seguridad real que hay detrás y cómo se evita. El progreso se guarda en tu navegador.

**El reto 7 usa un evaluador SQL de verdad** (`js/minisql.js`): construye la consulta concatenando lo que escribes y evalúa el `WHERE` contra una tabla en memoria, con precedencia `NOT` > `AND` > `OR`, comentarios (`--`, `#`, `/* */`) y errores de sintaxis como los de MySQL. Funcionan los payloads clásicos (`admin' -- `, `' OR 1=1 -- `…), y `' OR '1'='1` solo en el usuario falla, igual que contra una base de datos real.

## Writeup

📖 [**writeup/WRITEUP.md**](writeup/WRITEUP.md): los diez retos paso a paso, con 20 capturas, las salidas reales, las rutas alternativas y el porqué de cada fallo. **Contiene spoilers.**

## Cómo se comprueban las banderas

`assets/cc.js` guarda solo el SHA-256 de cada bandera y compara el hash de lo que escribes (con Web Crypto, o con una implementación en JS cuando la página no está en un contexto seguro). La excepción es el reto 3, que valida con su propia función para que la vía «reescribe la lógica desde la consola» funcione. Para cambiar una bandera:

```bash
printf '%s' 'FLAG{nueva}' | sha256sum
```

## Estructura

```
index.html                               portada de la misión: retos, progreso y bloqueo
reto1.html … reto10.html                 un reto por página
js/reto1.js … reto10.js                  mecánica y textos (ES/EN) de cada reto
js/minisql.js                            evaluador SQL del reto 7 (también se carga en Node)
assets/cc.js                             común: cabecera y pie, idioma, tema, pistas, progreso y verificación
assets/cc.css                            estilos
robots.txt                               pista del reto 5
archivo_secreto_del_administrador.html   bandera del reto 5
external_secrets.js                      parte 2 de la bandera del reto 10
icono.png                                logo de la casa
writeup/                                 WRITEUP.md y sus capturas
```

Para probar en local: `python -m http.server` y abre `http://localhost:8000`.

## English

**CÓDIGO CAOS** is a 10-challenge chained web security CTF played in the browser: HTML comments, CSS-hidden elements, client-side JavaScript validation, Base64, `robots.txt`, `localStorage`, SQL injection (against a real WHERE-clause evaluator with proper operator precedence), XSS, cookie tampering and forgotten resources. Each challenge has two hints and explains the real-world lesson once solved. Flags are checked against SHA-256 hashes. Progress and unlocking are stored in your browser. Bilingual (ES/EN), light/dark themes. A full step-by-step writeup (in Spanish) is in [`writeup/WRITEUP.md`](writeup/WRITEUP.md).

## Licencia / License

[MIT](LICENSE) © Un Fantasma en el Sistema.
