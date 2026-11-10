/* Wiring. Holds the only two pieces of mutable state in the app — the sheet
 * and the current drill run — and connects them to the DOM through delegated
 * listeners, so re-rendering never leaves a dangling handler.
 */
(function () {
  'use strict';

  var sheet = null;          /* loaded from storage on boot */
  var saveTimer = null;

  var drill = { id: null, beat: 0, picked: null, score: [], answers: [], done: false };

  /* ------------------------------------------------------------------ tabs */

  function showTab(name) {
    var tabs = document.querySelectorAll('[data-tab]');
    for (var i = 0; i < tabs.length; i++) {
      var on = tabs[i].getAttribute('data-tab') === name;
      tabs[i].classList.toggle('on', on);
      tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
    }
    var panels = document.querySelectorAll('[data-panel]');
    for (var j = 0; j < panels.length; j++) {
      panels[j].hidden = panels[j].getAttribute('data-panel') !== name;
    }
    if (location.hash !== '#' + name) {
      history.replaceState(null, '', '#' + name);
    }
  }

  /* ----------------------------------------------------------------- sheet */

  function refreshProgress() {
    PLIEGO.renderProgress(PLIEGO.el('progress'), sheet);
  }

  function flushSave() {
    var ok = PLIEGO.save(sheet);
    var note = PLIEGO.el('save-note');
    if (!ok) {
      note.textContent = 'No se pudo guardar: el navegador bloquea el almacenamiento local. ' +
        'Exportá el pliego antes de cerrar la pestaña.';
      note.hidden = false;
    } else {
      note.hidden = true;
    }
    refreshProgress();
  }

  /* Typing is debounced: one write per pause, not one per keystroke. */
  function queueSave() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { saveTimer = null; flushSave(); }, 400);
  }

  function onSheetInput(e) {
    var ta = e.target;
    if (!ta || ta.tagName !== 'TEXTAREA') return;
    var key = ta.getAttribute('data-key');
    if (!key) return;
    var idx = ta.getAttribute('data-idx');
    if (idx === null) sheet[key] = ta.value;
    else sheet[key][Number(idx)] = ta.value;
    queueSave();
  }

  function exportSheet() {
    var text = PLIEGO.toText(sheet);
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'pliego-de-negociacion.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  /* Two-step wipe instead of a modal: the first click arms the button, a
     second click within five seconds clears. No browser dialog involved. */
  var wipeArmed = false, wipeTimer = null;
  function wipeSheet(btn) {
    if (!wipeArmed) {
      wipeArmed = true;
      btn.textContent = '¿Seguro? Borrar todo';
      btn.classList.add('armed');
      wipeTimer = setTimeout(function () { disarmWipe(btn); }, 5000);
      return;
    }
    disarmWipe(btn);
    sheet = PLIEGO.clearSheet();
    PLIEGO.renderSheet(PLIEGO.el('sheet'), sheet);
    refreshProgress();
  }

  function disarmWipe(btn) {
    wipeArmed = false;
    if (wipeTimer) { clearTimeout(wipeTimer); wipeTimer = null; }
    btn.textContent = 'Borrar el pliego';
    btn.classList.remove('armed');
  }

  /* ---------------------------------------------------------------- drills */

  function drillMount() { return PLIEGO.el('practice'); }

  function startDrill(id) {
    drill = { id: id, beat: 0, picked: null, score: [], answers: [], done: false };
    PLIEGO.renderDrillBeat(drillMount(), drill);
  }

  function exitDrill() {
    drill.id = null;
    PLIEGO.renderDrillMenu(drillMount());
  }

  function pickOption(i) {
    if (drill.picked !== null) return;          /* already answered this beat */
    var beat = PLIEGO.drillById(drill.id).beats[drill.beat];
    var opt = beat.options[i];
    if (!opt) return;
    drill.picked = i;
    drill.answers[drill.beat] = i;
    drill.score[drill.beat] = PLIEGO.VERDICTS[opt.verdict].points;
    PLIEGO.renderDrillBeat(drillMount(), drill);
  }

  function nextBeat() {
    var d = PLIEGO.drillById(drill.id);
    if (drill.beat >= d.beats.length - 1) {
      drill.done = true;
      PLIEGO.renderDrillEnd(drillMount(), drill);
      return;
    }
    drill.beat++;
    drill.picked = null;
    PLIEGO.renderDrillBeat(drillMount(), drill);
  }

  /* ------------------------------------------------------------- listeners */

  function onClick(e) {
    var t = e.target;
    if (!t || !t.getAttribute) return;

    var tab = t.getAttribute('data-tab');
    if (tab) { showTab(tab); return; }

    if (t.getAttribute('data-export')) { exportSheet(); return; }
    if (t.getAttribute('data-wipe')) { wipeSheet(t); return; }

    var start = t.getAttribute('data-drill');
    if (start) { startDrill(start); return; }

    var opt = t.getAttribute('data-opt');
    if (opt !== null) { pickOption(Number(opt)); return; }

    if (t.getAttribute('data-next')) { nextBeat(); return; }
    if (t.getAttribute('data-exit')) { exitDrill(); return; }

    /* Link from a drill's feedback to the technique card that explains it. */
    var goto = t.getAttribute('data-goto-tech');
    if (goto) {
      e.preventDefault();
      showTab('tecnicas');
      var card = PLIEGO.el('tech-' + goto);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        card.classList.add('flash');
        setTimeout(function () { card.classList.remove('flash'); }, 1600);
      }
    }
  }

  /* ------------------------------------------------------------------ boot */

  function init() {
    sheet = PLIEGO.load();

    PLIEGO.renderTechniques(PLIEGO.el('techniques'));
    PLIEGO.renderSheet(PLIEGO.el('sheet'), sheet);
    refreshProgress();
    PLIEGO.renderDrillMenu(drillMount());

    document.addEventListener('click', onClick);
    PLIEGO.el('sheet').addEventListener('input', onSheetInput);

    /* A pending debounced write must not be lost when the tab goes away. */
    window.addEventListener('beforeunload', function () {
      if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; PLIEGO.save(sheet); }
    });

    var hash = (location.hash || '').replace('#', '');
    showTab(['tecnicas', 'pliego', 'practica'].indexOf(hash) !== -1 ? hash : 'tecnicas');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
