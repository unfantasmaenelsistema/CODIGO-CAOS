/* minisql.js — evaluador SQL mínimo para el reto 7 (Un Fantasma en el Sistema, MIT)
 * Evalúa de verdad la cláusula WHERE de la consulta vulnerable contra una tabla en memoria,
 * con la precedencia real (NOT > AND > OR), comentarios (-- # /* *) y errores de sintaxis
 * como los de MySQL. Así funcionan todos los payloads clásicos y no solo uno de memoria.
 * Funciona en el navegador (window.MiniSQL) y en Node (module.exports). */
(function (root) {
  'use strict';

  function SqlError(msg) { this.message = msg; }

  function tokenize(src) {
    var t = [], i = 0, n = src.length;
    while (i < n) {
      var c = src[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === '-' && src[i + 1] === '-') break;             // comentario hasta el final
      if (c === '#') break;
      if (c === '/' && src[i + 1] === '*') { var e = src.indexOf('*/', i + 2); if (e < 0) break; i = e + 2; continue; }
      if (c === ';') break;                                    // no se ejecutan consultas apiladas
      if (c === "'" || c === '"') {
        var q = c, s = '', j = i + 1, closed = false;
        while (j < n) {
          if (src[j] === q && src[j + 1] === q) { s += q; j += 2; continue; }
          if (src[j] === q) { closed = true; break; }
          s += src[j++];
        }
        if (!closed) throw new SqlError("You have an error in your SQL syntax; check the manual near '" + src.slice(i, i + 20) + "'");
        t.push({ k: 'str', v: s }); i = j + 1; continue;
      }
      var m;
      if ((m = /^\d+(\.\d+)?/.exec(src.slice(i)))) { t.push({ k: 'num', v: parseFloat(m[0]) }); i += m[0].length; continue; }
      if ((m = /^(<=|>=|<>|!=|=|<|>)/.exec(src.slice(i)))) { t.push({ k: 'op', v: m[0] }); i += m[0].length; continue; }
      if (c === '(' || c === ')') { t.push({ k: c }); i++; continue; }
      if ((m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(src.slice(i)))) {
        var w = m[0].toUpperCase();
        if (w === 'AND' || w === 'OR' || w === 'NOT') t.push({ k: w });
        else if (w === 'TRUE' || w === 'FALSE') t.push({ k: 'num', v: w === 'TRUE' ? 1 : 0 });
        else t.push({ k: 'id', v: m[0].toLowerCase() });
        i += m[0].length; continue;
      }
      if (c === '|' && src[i + 1] === '|') { t.push({ k: 'OR' }); i += 2; continue; }
      if (c === '&' && src[i + 1] === '&') { t.push({ k: 'AND' }); i += 2; continue; }
      throw new SqlError("You have an error in your SQL syntax; check the manual near '" + src.slice(i, i + 20) + "'");
    }
    return t;
  }

  // Árbol sintáctico: or → and → not → comparación → primario
  function parse(tokens) {
    var p = 0;
    function peek() { return tokens[p]; }
    function eat(k) { var x = tokens[p]; if (!x || x.k !== k) throw new SqlError('You have an error in your SQL syntax near end of WHERE'); p++; return x; }
    function or() { var l = and(); while (peek() && peek().k === 'OR') { p++; l = { t: 'or', l: l, r: and() }; } return l; }
    function and() { var l = not(); while (peek() && peek().k === 'AND') { p++; l = { t: 'and', l: l, r: not() }; } return l; }
    function not() { if (peek() && peek().k === 'NOT') { p++; return { t: 'not', e: not() }; } return cmp(); }
    function cmp() { var l = prim(); if (peek() && peek().k === 'op') { var op = tokens[p++].v; return { t: 'cmp', op: op, l: l, r: prim() }; } return l; }
    function prim() {
      var x = peek();
      if (!x) throw new SqlError('You have an error in your SQL syntax near end of WHERE');
      if (x.k === '(') { p++; var e = or(); eat(')'); return e; }
      if (x.k === 'str' || x.k === 'num') { p++; return { t: 'lit', v: x.v }; }
      if (x.k === 'id') { p++; return { t: 'col', v: x.v }; }
      throw new SqlError('You have an error in your SQL syntax near ' + (x.v || x.k));
    }
    if (!tokens.length) throw new SqlError('You have an error in your SQL syntax near WHERE');
    var tree = or();
    if (p < tokens.length) throw new SqlError("You have an error in your SQL syntax near '" + (tokens[p].v !== undefined ? tokens[p].v : tokens[p].k) + "'");
    return tree;
  }

  // Conversión como MySQL: cadena → número leyendo el prefijo numérico ('1abc' = 1, 'abc' = 0)
  function toNum(v) { if (typeof v === 'number') return v; var m = /^\s*-?\d+(\.\d+)?/.exec(String(v)); return m ? parseFloat(m[0]) : 0; }
  function truthy(v) { return toNum(v) !== 0; }
  function compare(a, b, op) {
    var r;
    if (typeof a === 'string' && typeof b === 'string') { a = a.toLowerCase(); b = b.toLowerCase(); r = a < b ? -1 : a > b ? 1 : 0; }
    else { a = toNum(a); b = toNum(b); r = a < b ? -1 : a > b ? 1 : 0; }
    switch (op) { case '=': return r === 0; case '!=': case '<>': return r !== 0; case '<': return r < 0; case '>': return r > 0; case '<=': return r <= 0; default: return r >= 0; }
  }
  function evaluate(node, row) {
    switch (node.t) {
      case 'or': return truthy(evaluate(node.l, row)) || truthy(evaluate(node.r, row)) ? 1 : 0;
      case 'and': return truthy(evaluate(node.l, row)) && truthy(evaluate(node.r, row)) ? 1 : 0;
      case 'not': return truthy(evaluate(node.e, row)) ? 0 : 1;
      case 'cmp': return compare(evaluate(node.l, row), evaluate(node.r, row), node.op) ? 1 : 0;
      case 'lit': return node.v;
      case 'col':
        if (!(node.v in row)) throw new SqlError("Unknown column '" + node.v + "' in 'where clause'");
        return row[node.v];
    }
  }

  function buildQuery(user, pass) {
    return "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + pass + "'";
  }

  // Devuelve { query, rows } o { query, error }
  function login(table, user, pass) {
    var query = buildQuery(user, pass);
    try {
      var tree = parse(tokenize(query.slice(query.indexOf('WHERE') + 5)));
      return { query: query, rows: table.filter(function (row) { return truthy(evaluate(tree, row)); }) };
    } catch (e) {
      if (e instanceof SqlError) return { query: query, error: e.message };
      throw e;
    }
  }

  var api = { login: login, buildQuery: buildQuery };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MiniSQL = api;
})(typeof window !== 'undefined' ? window : this);
