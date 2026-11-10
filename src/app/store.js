/* Persistence for the negotiation sheet.
 *
 * The sheet is the user's own preparation for a real negotiation, so it never
 * leaves the browser: one localStorage key, no network, no analytics. Every
 * access is wrapped because storage throws in private windows and can come
 * back empty after the user clears site data.
 *
 * Stored shape (localStorage key 'pliego.v1'):
 *   {
 *     updatedAt: '2026-11-09T12:00:00.000Z',   // ISO 8601, UTC
 *     objetivo: '',                            // kind 'text'
 *     resumen: '',                             // kind 'text'
 *     etiquetas: ['', '', ''],                 // kind 'list', 3 slots
 *     preguntas: ['', '', '', '', ''],         // kind 'list', 5 slots
 *     noEconomicas: ['', '', '', '']           // kind 'list', 4 slots
 *   }
 *
 * The empty shape is derived from PLIEGO.SHEET, so adding a section to the
 * data file is enough: storage and UI follow.
 */
window.PLIEGO = window.PLIEGO || {};

PLIEGO.STORAGE_KEY = 'pliego.v1';

PLIEGO.emptySheet = function () {
  var out = { updatedAt: null };
  PLIEGO.SHEET.forEach(function (s) {
    if (s.kind === 'list') {
      out[s.key] = [];
      for (var i = 0; i < s.slots; i++) out[s.key].push('');
    } else {
      out[s.key] = '';
    }
  });
  return out;
};

/* Reads storage and reconciles it against the current section list: unknown
 * keys are dropped, missing ones get their empty value, and short lists are
 * padded. A stored file from an older version therefore still loads. */
PLIEGO.load = function () {
  var base = PLIEGO.emptySheet();
  var raw = null;
  try {
    raw = window.localStorage.getItem(PLIEGO.STORAGE_KEY);
  } catch (e) {
    return base;
  }
  if (!raw) return base;

  var saved;
  try {
    saved = JSON.parse(raw);
  } catch (e) {
    return base;
  }
  if (!saved || typeof saved !== 'object') return base;

  if (typeof saved.updatedAt === 'string') base.updatedAt = saved.updatedAt;

  PLIEGO.SHEET.forEach(function (s) {
    var v = saved[s.key];
    if (s.kind === 'list') {
      if (!Array.isArray(v)) return;
      for (var i = 0; i < base[s.key].length; i++) {
        base[s.key][i] = typeof v[i] === 'string' ? v[i] : '';
      }
    } else if (typeof v === 'string') {
      base[s.key] = v;
    }
  });
  return base;
};

PLIEGO.save = function (data) {
  data.updatedAt = new Date().toISOString();
  try {
    window.localStorage.setItem(PLIEGO.STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    /* Quota or a blocked origin. The sheet stays usable in memory; the UI
       reports that it could not be saved instead of failing silently. */
    return false;
  }
};

PLIEGO.clearSheet = function () {
  try {
    window.localStorage.removeItem(PLIEGO.STORAGE_KEY);
  } catch (e) {
    /* Nothing to do: an unreadable store is also an unwritable one. */
  }
  return PLIEGO.emptySheet();
};

/* How much of the sheet is actually written. Blank slots in a list do not
 * count, so three of five questions reads as three of five. */
PLIEGO.progress = function (data) {
  var filled = 0, total = 0;
  PLIEGO.SHEET.forEach(function (s) {
    if (s.kind === 'list') {
      total += s.slots;
      data[s.key].forEach(function (v) { if (v.trim()) filled++; });
    } else {
      total += 1;
      if (String(data[s.key]).trim()) filled++;
    }
  });
  return { filled: filled, total: total, pct: total ? Math.round(filled * 100 / total) : 0 };
};

/* Plain text, ready to print or paste into a notes app. The book is explicit
 * that the sheet has to travel to the table on paper. */
PLIEGO.toText = function (data) {
  var lines = ['PLIEGO DE NEGOCIACION', ''];
  if (data.updatedAt) lines.push('Actualizado: ' + data.updatedAt, '');

  PLIEGO.SHEET.forEach(function (s) {
    lines.push('SECCION ' + s.n + ' - ' + s.title.toUpperCase());
    if (s.kind === 'list') {
      var any = false;
      data[s.key].forEach(function (v) {
        if (v.trim()) { lines.push('  - ' + v.trim()); any = true; }
      });
      if (!any) lines.push('  (sin completar)');
    } else {
      lines.push(String(data[s.key]).trim() || '  (sin completar)');
    }
    lines.push('');
  });
  return lines.join('\n');
};
