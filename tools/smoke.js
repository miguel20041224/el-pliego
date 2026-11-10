/* Headless smoke test: data integrity + store round-trip + renderers output. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const store = {};
const localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: k => { delete store[k]; }
};

const nodes = {};
function fakeEl(id) { return { id, innerHTML: '', hidden: false, textContent: '' }; }
const document = {
  getElementById: id => (nodes[id] = nodes[id] || fakeEl(id))
};

const ctx = { console, localStorage, document, Date, JSON, isNaN, Number, String, Math, setTimeout };
ctx.window = ctx;
vm.createContext(ctx);

['src/data/techniques.js','src/data/sheet.js','src/data/drills.js',
 'src/app/store.js','src/app/ui.js'].forEach(f => {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
});

const P = ctx.PLIEGO;
let fails = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.log('FAIL: ' + msg); } };

/* --- data --- */
ok(P.TECHNIQUES.length === 9, 'nine techniques');
const ids = new Set(P.TECHNIQUES.map(t => t.id));
ok(ids.size === 9, 'technique ids unique');
P.TECHNIQUES.forEach(t => {
  ok(t.id && t.name && t.claim && t.what && t.why && t.mistake, 'technique fields: ' + t.id);
  ok(Array.isArray(t.say) && t.say.length > 0, 'technique say[]: ' + t.id);
});
ok(P.SHEET.length === 5, 'five sheet sections');
P.SHEET.forEach(s => {
  ok(s.key && s.title && s.ask && s.why && Array.isArray(s.how), 'sheet fields: ' + s.key);
  if (s.kind === 'list') ok(typeof s.slots === 'number' && s.slots > 0, 'slots: ' + s.key);
});
ok(P.DRILLS.length === 3, 'three drills');
P.DRILLS.forEach(d => {
  ok(d.beats.length === 4, 'four beats: ' + d.id);
  ok(!!d.debrief, 'debrief: ' + d.id);
  d.beats.forEach((b, i) => {
    ok(b.them && b.options.length === 3, 'beat shape: ' + d.id + '/' + i);
    b.options.forEach(o => {
      ok(['good','partial','bad'].indexOf(o.verdict) !== -1, 'verdict: ' + d.id + '/' + i);
      ok(P.techniqueById(o.tech) !== null, 'tech ref "' + o.tech + '" in ' + d.id + '/' + i);
      ok(!!o.why, 'why: ' + d.id + '/' + i);
    });
    ok(b.options.some(o => o.verdict === 'good'), 'at least one good: ' + d.id + '/' + i);
  });
});

/* --- store --- */
let data = P.load();
ok(P.progress(data).filled === 0, 'empty sheet has 0 filled');
ok(P.progress(data).total === 1 + 1 + 3 + 5 + 4, 'total slots = 14');
data.objetivo = 'Cerrar en 120k';
data.etiquetas[1] = 'Parece que el precio te expone';
ok(P.save(data) === true, 'save returns true');
let again = P.load();
ok(again.objetivo === 'Cerrar en 120k', 'text round-trip');
ok(again.etiquetas[1] === 'Parece que el precio te expone', 'list round-trip');
ok(P.progress(again).filled === 2, 'progress counts 2');
ok(!!again.updatedAt && !isNaN(new Date(again.updatedAt).getTime()), 'updatedAt ISO');

/* stored garbage must not crash load */
store['pliego.v1'] = '{not json';
ok(P.load().objetivo === '', 'corrupt storage falls back to empty');
store['pliego.v1'] = JSON.stringify({ objetivo: 'x', unknownKey: 1, etiquetas: ['a'] });
const rec = P.load();
ok(rec.unknownKey === undefined, 'unknown key dropped');
ok(rec.etiquetas.length === 3, 'short list padded');

const txt = P.toText(again);
ok(txt.indexOf('Cerrar en 120k') !== -1, 'export contains text');

P.clearSheet();
ok(P.load().objetivo === '', 'clear wipes sheet');

/* --- renderers --- */
P.renderTechniques(document.getElementById('techniques'));
ok(nodes.techniques.innerHTML.indexOf('id="tech-espejo"') !== -1, 'technique anchor id');
P.renderSheet(document.getElementById('sheet'), P.load());
ok(nodes.sheet.innerHTML.indexOf('data-key="objetivo"') !== -1, 'sheet data-key');
ok((nodes.sheet.innerHTML.match(/<textarea/g) || []).length === 14, '14 textareas');
P.renderProgress(document.getElementById('progress'), P.load());
ok(nodes.progress.innerHTML.indexOf('class="bar"') !== -1, 'progress bar');
P.renderDrillMenu(document.getElementById('practice'));
ok(nodes.practice.innerHTML.indexOf('data-drill="aumento"') !== -1, 'drill menu');

/* escaping: user text must not inject markup */
const evil = P.load();
evil.objetivo = '<img src=x onerror="boom">';
P.renderSheet(document.getElementById('sheet'), evil);
ok(nodes.sheet.innerHTML.indexOf('<img') === -1, 'user text escaped');

/* full drill run, picking the good option every time */
const st = { id: 'proveedor', beat: 0, picked: null, score: [], answers: [] };
const d = P.drillById(st.id);
for (let i = 0; i < d.beats.length; i++) {
  st.beat = i; st.picked = null;
  P.renderDrillBeat(document.getElementById('practice'), st);
  const gi = d.beats[i].options.findIndex(o => o.verdict === 'good');
  st.picked = gi; st.answers[i] = gi; st.score[i] = P.VERDICTS[d.beats[i].options[gi].verdict].points;
  P.renderDrillBeat(document.getElementById('practice'), st);
  ok(nodes.practice.innerHTML.indexOf('data-next="1"') !== -1, 'feedback shows next at beat ' + i);
}
P.renderDrillEnd(document.getElementById('practice'), st);
ok(nodes.practice.innerHTML.indexOf('8 / 8') !== -1, 'perfect run scores 8/8');

console.log(fails === 0 ? 'ALL CHECKS PASSED' : fails + ' CHECK(S) FAILED');
