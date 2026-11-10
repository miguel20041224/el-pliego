/* Rendering. Builds markup from the data files; no framework, no templates.
 * Every string that comes from data goes through esc() because the sheet
 * contains text the user typed.
 */
window.PLIEGO = window.PLIEGO || {};

PLIEGO.esc = function (s) {
  return String(s === null || s === undefined ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

PLIEGO.el = function (id) { return document.getElementById(id); };

/* ---------------------------------------------------------------- techniques */

PLIEGO.techniqueCard = function (t) {
  var says = t.say.map(function (s) {
    return '<li>' + PLIEGO.esc(s) + '</li>';
  }).join('');

  return '' +
    '<article class="card" id="tech-' + PLIEGO.esc(t.id) + '">' +
      '<header class="card-head">' +
        '<span class="num">' + t.n + '</span>' +
        '<div>' +
          '<h3>' + PLIEGO.esc(t.name) + '</h3>' +
          '<p class="claim">' + PLIEGO.esc(t.claim) + '</p>' +
        '</div>' +
        '<span class="chap">cap. ' + t.chapter + '</span>' +
      '</header>' +
      '<div class="block"><h4>Qué es</h4><p>' + PLIEGO.esc(t.what) + '</p></div>' +
      '<div class="block"><h4>Por qué funciona</h4><p>' + PLIEGO.esc(t.why) + '</p></div>' +
      '<div class="block"><h4>Cómo suena</h4><ul class="says">' + says + '</ul></div>' +
      '<div class="block warn"><h4>El error que casi todos cometen</h4><p>' +
        PLIEGO.esc(t.mistake) + '</p></div>' +
    '</article>';
};

PLIEGO.renderTechniques = function (mount) {
  mount.innerHTML = PLIEGO.TECHNIQUES.map(PLIEGO.techniqueCard).join('');
};

/* --------------------------------------------------------------------- sheet */

PLIEGO.sheetSection = function (s, data) {
  var hints = s.how.map(function (h) {
    return '<li>' + PLIEGO.esc(h) + '</li>';
  }).join('');

  var inputs;
  if (s.kind === 'list') {
    inputs = data[s.key].map(function (v, i) {
      return '<div class="slot">' +
        '<span class="slot-n">' + (i + 1) + '</span>' +
        '<textarea rows="2" data-key="' + PLIEGO.esc(s.key) + '" data-idx="' + i + '"' +
          ' placeholder="' + PLIEGO.esc(s.placeholder) + '"' +
          ' aria-label="' + PLIEGO.esc(s.title) + ', entrada ' + (i + 1) + '">' +
          PLIEGO.esc(v) + '</textarea>' +
      '</div>';
    }).join('');
  } else {
    inputs = '<textarea rows="4" data-key="' + PLIEGO.esc(s.key) + '"' +
      ' placeholder="' + PLIEGO.esc(s.placeholder) + '"' +
      ' aria-label="' + PLIEGO.esc(s.title) + '">' + PLIEGO.esc(data[s.key]) + '</textarea>';
  }

  return '' +
    '<section class="sec">' +
      '<header class="sec-head">' +
        '<span class="num">' + PLIEGO.esc(s.n) + '</span>' +
        '<h3>' + PLIEGO.esc(s.title) + '</h3>' +
      '</header>' +
      '<p class="ask">' + PLIEGO.esc(s.ask) + '</p>' +
      '<details class="guide">' +
        '<summary>Por qué esta sección existe</summary>' +
        '<p>' + PLIEGO.esc(s.why) + '</p>' +
        '<ul>' + hints + '</ul>' +
      '</details>' +
      '<div class="inputs">' + inputs + '</div>' +
    '</section>';
};

PLIEGO.renderSheet = function (mount, data) {
  mount.innerHTML = PLIEGO.SHEET.map(function (s) {
    return PLIEGO.sheetSection(s, data);
  }).join('');
};

PLIEGO.renderProgress = function (mount, data) {
  var p = PLIEGO.progress(data);
  var when = '';
  if (data.updatedAt) {
    var d = new Date(data.updatedAt);
    if (!isNaN(d.getTime())) {
      when = '<span class="saved-at">guardado ' +
        PLIEGO.esc(d.toLocaleString('es-AR')) + '</span>';
    }
  }
  mount.innerHTML =
    '<div class="bar"><i style="width:' + p.pct + '%"></i></div>' +
    '<p class="bar-text"><strong>' + p.filled + ' de ' + p.total + '</strong> campos ' +
    'completos' + (when ? ' · ' + when : '') + '</p>';
};

/* -------------------------------------------------------------------- drills */

PLIEGO.VERDICTS = {
  good:    { label: 'Bien jugado',       points: 2 },
  partial: { label: 'A medias',          points: 1 },
  bad:     { label: 'Error clásico',     points: 0 }
};

PLIEGO.renderDrillMenu = function (mount) {
  var cards = PLIEGO.DRILLS.map(function (d) {
    return '' +
      '<article class="drill-card">' +
        '<h3>' + PLIEGO.esc(d.title) + '</h3>' +
        '<p>' + PLIEGO.esc(d.context) + '</p>' +
        '<button class="primary" data-drill="' + PLIEGO.esc(d.id) + '">Entrar a la mesa</button>' +
      '</article>';
  }).join('');

  mount.innerHTML =
    '<p class="lead">Cuatro intervenciones por escena. No hay dados ni puntajes ocultos: ' +
    'cada respuesta trae su explicación, también cuando acertás.</p>' +
    '<div class="drill-grid">' + cards + '</div>';
};

PLIEGO.renderDrillBeat = function (mount, state) {
  var d = PLIEGO.drillById(state.id);
  var beat = d.beats[state.beat];

  var opts = beat.options.map(function (o, i) {
    return '<button class="option" data-opt="' + i + '">' + PLIEGO.esc(o.text) + '</button>';
  }).join('');

  var feedback = '';
  if (state.picked !== null) {
    var o = beat.options[state.picked];
    var v = PLIEGO.VERDICTS[o.verdict];
    var t = PLIEGO.techniqueById(o.tech);
    var last = state.beat === d.beats.length - 1;
    feedback = '' +
      '<div class="feedback ' + PLIEGO.esc(o.verdict) + '">' +
        '<h4>' + PLIEGO.esc(v.label) + '</h4>' +
        '<p>' + PLIEGO.esc(o.why) + '</p>' +
        (t ? '<p class="ref">Técnica ' + t.n + ': ' + PLIEGO.esc(t.name) +
             ' <a href="#tech-' + PLIEGO.esc(t.id) + '" data-goto-tech="' +
             PLIEGO.esc(t.id) + '">ver la ficha</a></p>' : '') +
        '<button class="primary" data-next="1">' +
          (last ? 'Ver el cierre' : 'Siguiente intervención') +
        '</button>' +
      '</div>';
  }

  mount.innerHTML = '' +
    '<div class="drill-run">' +
      '<header class="run-head">' +
        '<button class="ghost" data-exit="1">&larr; Salir</button>' +
        '<h3>' + PLIEGO.esc(d.title) + '</h3>' +
        '<span class="step">' + (state.beat + 1) + ' / ' + d.beats.length + '</span>' +
      '</header>' +
      '<p class="context">' + PLIEGO.esc(d.context) + '</p>' +
      '<blockquote class="them">' + PLIEGO.esc(beat.them) + '</blockquote>' +
      (state.picked === null
        ? '<div class="options">' + opts + '</div>'
        : '<p class="you">Dijiste: <em>' +
            PLIEGO.esc(beat.options[state.picked].text) + '</em></p>') +
      feedback +
    '</div>';
};

PLIEGO.renderDrillEnd = function (mount, state) {
  var d = PLIEGO.drillById(state.id);
  var max = d.beats.length * 2;
  var got = state.score.reduce(function (a, b) { return a + b; }, 0);

  var verdict;
  if (got === max) verdict = 'Mesa impecable: aplicaste la técnica en las cuatro.';
  else if (got >= max - 2) verdict = 'Buena mesa. Un paso se te fue de las manos.';
  else if (got >= max / 2) verdict = 'La mesa se sostuvo, pero dejaste valor sobre el tablero.';
  else verdict = 'Esta mesa la perdiste. Volvé a las fichas y jugala de nuevo.';

  var detail = d.beats.map(function (beat, i) {
    var o = beat.options[state.answers[i]];
    return '<li class="' + PLIEGO.esc(o.verdict) + '">' +
      '<strong>' + (i + 1) + '.</strong> ' + PLIEGO.esc(o.text) + '</li>';
  }).join('');

  mount.innerHTML = '' +
    '<div class="drill-end">' +
      '<h3>' + PLIEGO.esc(d.title) + '</h3>' +
      '<p class="score"><strong>' + got + ' / ' + max + '</strong> &middot; ' +
        PLIEGO.esc(verdict) + '</p>' +
      '<ol class="recap">' + detail + '</ol>' +
      '<div class="block"><h4>Lo que estaba en juego</h4><p>' +
        PLIEGO.esc(d.debrief) + '</p></div>' +
      '<div class="row">' +
        '<button class="primary" data-drill="' + PLIEGO.esc(d.id) + '">Jugarla de nuevo</button>' +
        '<button class="ghost" data-exit="1">Elegir otra escena</button>' +
      '</div>' +
    '</div>';
};
