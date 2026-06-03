import { el, mount, toast } from './components.js';
import { t, tx, getLang } from '../i18n.js';
import { EXERCISES, EXERCISE_MAP } from '../data/exercises.js';
import { newRoutineId } from '../storage.js';

const clone = (o) => JSON.parse(JSON.stringify(o));

export function render(container, ctx) {
  const existing = ctx.params.routineId ? ctx.getRoutine(ctx.params.routineId) : null;
  const draft = existing && existing.custom ? clone(existing)
    : { id: newRoutineId(), custom: true, name: { ko: '', en: '' },
        work: ctx.settings.work, rest: ctx.settings.rest, rounds: ctx.settings.rounds, items: [] };

  let selectedWrap;

  function renderSelected() {
    const items = draft.items;
    const node = el('div', { class: 'sel-list' },
      items.length === 0 ? el('p', { class: 'hint' }, t('emptyRoutine')) : null,
      ...items.map((item, i) => {
        const ex = EXERCISE_MAP[item.exerciseId];
        return el('div', { class: 'sel-item' },
          el('span', { class: 'si-emoji' }, ex?.emoji || '•'),
          el('span', { class: 'si-name' }, ex ? tx(ex.name) : item.exerciseId),
          el('input', {
            type: 'number', class: 'si-work', min: 5, max: 120,
            placeholder: String(draft.work), value: item.work ?? '',
            'aria-label': t('workSec'),
            on: { input: (e) => { const v = Number(e.target.value); if (v > 0) item.work = v; else delete item.work; } },
          }),
          el('div', { class: 'si-actions' },
            el('button', { class: 'mini', 'aria-label': t('moveUp'), disabled: i === 0 ? '' : null, on: { click: () => move(i, -1) } }, '↑'),
            el('button', { class: 'mini', 'aria-label': t('moveDown'), disabled: i === items.length - 1 ? '' : null, on: { click: () => move(i, 1) } }, '↓'),
            el('button', { class: 'mini danger', 'aria-label': t('remove'), on: { click: () => remove(i) } }, '✕')));
      }));
    if (selectedWrap) { selectedWrap.replaceWith(node); }
    selectedWrap = node;
    return node;
  }

  function add(id) { draft.items.push({ exerciseId: id }); renderSelected(); toast(t('addedToast')); }
  function move(i, dir) { const j = i + dir; if (j < 0 || j >= draft.items.length) return; [draft.items[i], draft.items[j]] = [draft.items[j], draft.items[i]]; renderSelected(); }
  function remove(i) { draft.items.splice(i, 1); renderSelected(); }

  const nameInput = el('input', { type: 'text', class: 'name-input', value: tx(draft.name), 'data-i18n-ph': 'routineNamePlaceholder', placeholder: t('routineNamePlaceholder') });

  function save() {
    const name = nameInput.value.trim();
    if (!name) { toast(t('nameRequired')); nameInput.focus(); return; }
    if (!draft.items.length) { toast(t('needOneExercise')); return; }
    draft.name = { ko: name, en: name };
    draft.work = ctx.settings.work; draft.rest = ctx.settings.rest; draft.rounds = ctx.settings.rounds;
    ctx.saveRoutine(draft);
    ctx.update({ selectedRoutineId: draft.id });
    toast(t('savedToast'));
    ctx.nav('home');
  }

  function del() {
    if (!existing) return;
    if (confirm(t('deleteConfirm'))) { ctx.deleteRoutine(existing.id); ctx.nav('home'); }
  }

  const library = el('div', { class: 'lib-grid' },
    ...EXERCISES.map((ex) => el('button', { class: 'lib-card', on: { click: () => add(ex.id) } },
      el('span', { class: 'lib-emoji' }, ex.emoji),
      el('span', { class: 'lib-name' }, tx(ex.name)),
      ex.quiet ? el('span', { class: 'badge quiet' }, t('quietBadge')) : null)));

  const root = el('div', { class: 'screen builder' },
    el('header', { class: 'sub-header' },
      el('button', { class: 'chip', on: { click: () => ctx.nav('home') } }, t('back')),
      el('h2', {}, t('builder')),
      existing ? el('button', { class: 'chip danger', on: { click: del } }, t('delete')) : null),

    el('section', { class: 'card' },
      el('label', { class: 'field-label' }, t('routineName')), nameInput),

    el('section', { class: 'card' },
      el('h3', {}, t('selectedExercises')), renderSelected()),

    el('section', { class: 'card' },
      el('h3', {}, t('exerciseLibrary')), library),

    el('div', { class: 'cta-row sticky' },
      el('button', { class: 'btn primary block', on: { click: save } }, t('saveRoutine'))));

  mount(container, root);
}
