import { el, mount, toast } from './components.js';
import { t, tx } from '../i18n.js';
import { EXERCISES, EXERCISE_MAP } from '../data/exercises.js';
import { newRoutineId } from '../storage.js';
import { renderExerciseMedia } from '../data/media.js';
import { openExercise } from './exercise-detail.js';

const clone = (o) => JSON.parse(JSON.stringify(o));
const MODES = ['interval', 'tabata', 'emom', 'amrap', 'ladder'];
const MODE_KEY = { interval: 'modeInterval', tabata: 'modeTabata', emom: 'modeEmom', amrap: 'modeAmrap', ladder: 'modeLadder' };

export function render(container, ctx) {
  const existing = ctx.params.routineId ? ctx.getRoutine(ctx.params.routineId) : null;
  const draft = existing && existing.custom ? clone(existing) : {
    id: newRoutineId(), custom: true, mode: 'interval', name: { ko: '', en: '' },
    work: ctx.settings.work, rest: ctx.settings.rest, rounds: ctx.settings.rounds,
    slot: 60, timeCapMin: 12, ladderSeconds: [20, 30, 40, 30, 20], blockRest: 30, items: [],
  };
  draft.items = draft.items || [];
  if (!Array.isArray(draft.ladderSeconds)) draft.ladderSeconds = [20, 30, 40, 30, 20];

  let selectedWrap, paramsWrap;
  const usesReps = () => draft.mode === 'emom' || draft.mode === 'amrap';

  const numInput = (value, { min, max, step = 1, onChange, placeholder, cls = 'param-input' }) => {
    const inp = el('input', { type: 'number', class: cls, min, max, step, value: value ?? '', placeholder: placeholder ?? '' });
    inp.addEventListener('input', () => onChange(inp.value));
    return inp;
  };
  const paramRow = (labelKey, input) => el('div', { class: 'param-row' }, el('label', { class: 'field-label' }, t(labelKey)), input);

  function renderParams() {
    const m = draft.mode;
    const node = el('div', { class: 'params' });
    if (m === 'interval') {
      node.append(
        paramRow('workSec', numInput(draft.work, { min: 5, max: 120, step: 5, onChange: (v) => draft.work = +v || draft.work })),
        paramRow('restSec', numInput(draft.rest, { min: 0, max: 90, step: 5, onChange: (v) => draft.rest = +v || 0 })),
        paramRow('rounds', numInput(draft.rounds, { min: 1, max: 12, onChange: (v) => draft.rounds = +v || 1 })));
    } else if (m === 'tabata') {
      node.append(el('p', { class: 'hint' }, t('modeTabataHint')));
    } else if (m === 'emom') {
      node.append(
        paramRow('slotSec', numInput(draft.slot, { min: 20, max: 180, step: 5, onChange: (v) => draft.slot = +v || 60 })),
        paramRow('rounds', numInput(draft.rounds, { min: 1, max: 20, onChange: (v) => draft.rounds = +v || 1 })),
        el('p', { class: 'hint' }, t('emomTip')));
    } else if (m === 'amrap') {
      node.append(
        paramRow('timeCapMin', numInput(draft.timeCapMin, { min: 3, max: 40, onChange: (v) => draft.timeCapMin = +v || 12 })),
        el('p', { class: 'hint' }, t('amrapTip')));
    } else if (m === 'ladder') {
      const seq = el('input', { type: 'text', class: 'param-input wide', value: draft.ladderSeconds.join(','), placeholder: '20,30,40,30,20' });
      seq.addEventListener('input', () => { draft.ladderSeconds = seq.value.split(',').map((x) => parseInt(x.trim(), 10)).filter((n) => n > 0); });
      node.append(paramRow('ladderSeq', seq),
        paramRow('restSec', numInput(draft.rest, { min: 0, max: 60, step: 5, onChange: (v) => draft.rest = +v || 0 })));
    }
    if (paramsWrap) paramsWrap.replaceWith(node);
    paramsWrap = node;
    return node;
  }

  function itemField(item) {
    const ex = EXERCISE_MAP[item.exerciseId];
    if (usesReps()) {
      const inp = el('input', { type: 'number', class: 'si-work', min: 1, max: 100, placeholder: String(ex?.reps ?? 10), value: item.reps ?? '', 'aria-label': t('repsLabel') });
      inp.addEventListener('input', () => { const v = +inp.value; if (v > 0) item.reps = v; else delete item.reps; });
      return inp;
    }
    if (draft.mode === 'interval') {
      const inp = el('input', { type: 'number', class: 'si-work', min: 5, max: 120, placeholder: String(draft.work), value: item.work ?? '', 'aria-label': t('workSec') });
      inp.addEventListener('input', () => { const v = +inp.value; if (v > 0) item.work = v; else delete item.work; });
      return inp;
    }
    return null;
  }

  function renderSelected() {
    const node = el('div', { class: 'sel-list' },
      draft.items.length === 0 ? el('p', { class: 'hint' }, t('emptyRoutine')) : null,
      ...draft.items.map((item, i) => {
        const ex = EXERCISE_MAP[item.exerciseId];
        const fig = el('span', { class: 'si-fig' });
        renderExerciseMedia(fig, ex || { emoji: '•' }, { animate: false });
        return el('div', { class: 'sel-item' }, fig,
          el('button', { class: 'si-name link', on: { click: () => ex && openExercise(ex, {}) } }, ex ? tx(ex.name) : item.exerciseId),
          itemField(item),
          el('div', { class: 'si-actions' },
            el('button', { class: 'mini', 'aria-label': t('moveUp'), disabled: i === 0 ? '' : null, on: { click: () => move(i, -1) } }, '↑'),
            el('button', { class: 'mini', 'aria-label': t('moveDown'), disabled: i === draft.items.length - 1 ? '' : null, on: { click: () => move(i, 1) } }, '↓'),
            el('button', { class: 'mini danger', 'aria-label': t('remove'), on: { click: () => remove(i) } }, '✕')));
      }));
    if (selectedWrap) selectedWrap.replaceWith(node);
    selectedWrap = node;
    return node;
  }

  function add(id) { draft.items.push({ exerciseId: id }); renderSelected(); toast(t('addedToast')); }
  function move(i, d) { const j = i + d; if (j < 0 || j >= draft.items.length) return; [draft.items[i], draft.items[j]] = [draft.items[j], draft.items[i]]; renderSelected(); }
  function remove(i) { draft.items.splice(i, 1); renderSelected(); }

  function modeSelector() {
    const wrap = el('div', { class: 'seg-group modes' });
    for (const m of MODES) {
      wrap.appendChild(el('button', {
        class: 'seg-btn' + (draft.mode === m ? ' active' : ''), dataset: { m },
        on: { click: () => { draft.mode = m; wrap.querySelectorAll('.seg-btn').forEach((x) => x.classList.toggle('active', x.dataset.m === m)); renderParams(); renderSelected(); } },
      }, el('strong', {}, t(MODE_KEY[m]))));
    }
    return wrap;
  }

  const nameInput = el('input', { type: 'text', class: 'name-input', value: tx(draft.name), placeholder: t('routineNamePlaceholder') });

  const library = el('div', { class: 'lib-grid' },
    ...EXERCISES.map((ex) => {
      const fig = el('span', { class: 'lib-fig' });
      renderExerciseMedia(fig, ex, { animate: false });
      return el('div', { class: 'lib-card' },
        el('button', { class: 'lib-add', 'aria-label': t('add'), on: { click: () => add(ex.id) } }, fig, el('span', { class: 'lib-name' }, tx(ex.name))),
        el('button', { class: 'lib-info', 'aria-label': tx(ex.name), on: { click: () => openExercise(ex, { onAdd: (e) => add(e.id) }) } }, 'ⓘ'),
        ex.quiet ? el('span', { class: 'badge quiet' }, t('quietBadge')) : null);
    }));

  function save() {
    const name = nameInput.value.trim();
    if (!name) { toast(t('nameRequired')); nameInput.focus(); return; }
    if (!draft.items.length) { toast(t('needOneExercise')); return; }
    draft.name = { ko: name, en: name };
    ctx.saveRoutine(draft);
    ctx.update({ selectedRoutineId: draft.id });
    toast(t('savedToast'));
    ctx.nav('home');
  }

  function del() { if (existing && confirm(t('deleteConfirm'))) { ctx.deleteRoutine(existing.id); ctx.nav('home'); } }

  const root = el('div', { class: 'screen builder' },
    el('header', { class: 'sub-header' },
      el('button', { class: 'chip', on: { click: () => ctx.nav('home') } }, t('back')),
      el('h2', {}, t('builder')),
      existing ? el('button', { class: 'chip danger', on: { click: del } }, t('delete')) : null),

    el('section', { class: 'card' }, el('label', { class: 'field-label' }, t('routineName')), nameInput),
    el('section', { class: 'card' }, el('h3', {}, t('mode')), modeSelector(), renderParams()),
    el('section', { class: 'card' }, el('h3', {}, t('selectedExercises')), renderSelected()),
    el('section', { class: 'card' }, el('h3', {}, t('exerciseLibrary')), library),

    el('div', { class: 'cta-row sticky' },
      el('button', { class: 'btn primary block', on: { click: save } }, t('saveRoutine'))));

  mount(container, root);
}
