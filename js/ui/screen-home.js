import { el, mount, formatTime, toast } from './components.js';
import { t, tx, getLang, toggleLang } from '../i18n.js';
import { DIFFICULTIES } from '../data/routines.js';
import { EXERCISE_MAP } from '../data/exercises.js';
import { compileSession } from '../compiler.js';

function firstEmoji(ctx, r) {
  const it = r.items?.[0];
  return (it && EXERCISE_MAP[it.exerciseId]?.emoji) || '🏋️';
}
function routineTotalOwn(ctx, r) {
  return compileSession(r, { ...ctx.settings, work: r.work, rest: r.rest, rounds: r.rounds }).totalSeconds;
}
function matchDifficulty(s) {
  for (const [k, d] of Object.entries(DIFFICULTIES)) {
    if (d.work === s.work && d.rest === s.rest && d.rounds === s.rounds) return k;
  }
  return null;
}

export function render(container, ctx) {
  const sliderInputs = {}; // key -> {input, val}
  let totalNode, diffGroup, listWrap;

  const selected = () => ctx.getRoutine(ctx.settings.selectedRoutineId) || ctx.allRoutines()[0];

  function refresh() {
    if (totalNode) totalNode.textContent = formatTime(ctx.buildSession(selected()).totalSeconds);
    const cur = matchDifficulty(ctx.settings);
    diffGroup?.querySelectorAll('.seg-btn').forEach((b) => b.classList.toggle('active', b.dataset.diff === cur));
    for (const [key, ref] of Object.entries(sliderInputs)) {
      ref.input.value = ctx.settings[key];
      ref.val.textContent = ctx.settings[key] + (ref.suffix || '');
    }
    listWrap?.querySelectorAll('.routine-card').forEach((c) =>
      c.classList.toggle('selected', c.dataset.rid === ctx.settings.selectedRoutineId));
  }

  function sliderRow({ key, labelKey, min, max, step = 1, suffix = '' }) {
    const val = el('span', { class: 'slider-val' }, ctx.settings[key] + suffix);
    const input = el('input', {
      type: 'range', min, max, step, value: ctx.settings[key],
      on: { input: (e) => { ctx.update({ [key]: Number(e.target.value) }); val.textContent = e.target.value + suffix; refresh(); } },
    });
    sliderInputs[key] = { input, val, suffix };
    return el('div', { class: 'slider-row' },
      el('div', { class: 'slider-head' }, el('span', {}, t(labelKey)), val), input);
  }

  function toggleRow(key, labelKey, hintKey) {
    const input = el('input', { type: 'checkbox', class: 'switch' });
    input.checked = !!ctx.settings[key];
    input.addEventListener('change', () => { ctx.update({ [key]: input.checked }); refresh(); });
    return el('label', { class: 'toggle-row' },
      el('span', { class: 'toggle-label' }, el('span', {}, t(labelKey)), hintKey ? el('small', { class: 'hint' }, t(hintKey)) : null),
      input);
  }

  function diffButtons() {
    const wrap = el('div', { class: 'seg-group' });
    for (const key of ['beginner', 'intermediate', 'advanced']) {
      const d = DIFFICULTIES[key];
      wrap.appendChild(el('button', {
        class: 'seg-btn', dataset: { diff: key },
        on: { click: () => { ctx.update({ difficulty: key, work: d.work, rest: d.rest, rounds: d.rounds }); refresh(); } },
      }, el('strong', {}, t(key)), el('small', {}, t(key + 'Hint'))));
    }
    diffGroup = wrap;
    return wrap;
  }

  function routineList() {
    const list = el('div', { class: 'routine-list' });
    for (const r of ctx.allRoutines()) {
      list.appendChild(el('button', {
        class: 'routine-card' + (r.id === ctx.settings.selectedRoutineId ? ' selected' : ''),
        dataset: { rid: r.id },
        on: { click: () => { ctx.update({ selectedRoutineId: r.id, work: r.work, rest: r.rest, rounds: r.rounds }); refresh(); } },
      },
        el('div', { class: 'rc-emoji' }, firstEmoji(ctx, r)),
        el('div', { class: 'rc-main' },
          el('div', { class: 'rc-name' }, tx(r.name), r.custom ? el('span', { class: 'badge' }, t('customBadge')) : null),
          el('div', { class: 'rc-desc' }, tx(r.desc || { ko: '', en: '' })),
          el('div', { class: 'rc-meta' }, `${(r.items || []).length} · ${formatTime(routineTotalOwn(ctx, r))}`)),
        r.custom ? el('span', { class: 'rc-edit', 'aria-label': t('edit'), on: { click: (e) => { e.stopPropagation(); ctx.nav('builder', { routineId: r.id }); } } }, '✎') : null));
    }
    list.appendChild(el('button', { class: 'routine-card new', on: { click: () => ctx.nav('builder') } }, t('createNew')));
    listWrap = list;
    return list;
  }

  const themeLabel = () => ({ system: '🌓', light: '☀️', dark: '🌙' }[ctx.settings.theme] || '🌓');
  const cycleTheme = (b) => { const order = ['system', 'light', 'dark']; const i = order.indexOf(ctx.settings.theme); const next = order[(i + 1) % 3]; ctx.update({ theme: next }); b.textContent = themeLabel(); };

  const root = el('div', { class: 'screen home' },
    el('header', { class: 'app-header' },
      el('div', { class: 'brand' }, el('div', { class: 'logo' }, '⚡'), el('div', {}, el('h1', {}, t('appName')), el('p', { class: 'tagline' }, t('tagline')))),
      el('div', { class: 'header-actions' },
        el('button', { class: 'chip', on: { click: () => toggleLang() } }, getLang() === 'ko' ? 'EN' : '한'),
        el('button', { class: 'chip', on: { click: (e) => cycleTheme(e.currentTarget) } }, themeLabel()))),

    el('section', { class: 'card' }, el('h2', {}, t('presets')), routineList()),

    el('section', { class: 'card' }, el('h2', {}, t('difficulty')), diffButtons(),
      sliderRow({ key: 'work', labelKey: 'workSec', min: 10, max: 90, step: 5, suffix: 's' }),
      sliderRow({ key: 'rest', labelKey: 'restSec', min: 0, max: 60, step: 5, suffix: 's' }),
      sliderRow({ key: 'rounds', labelKey: 'rounds', min: 1, max: 10 }),
      sliderRow({ key: 'getReady', labelKey: 'getReadySec', min: 0, max: 15 })),

    el('section', { class: 'card' },
      toggleRow('lowNoise', 'lowNoise', 'lowNoiseHint'),
      toggleRow('warmup', 'warmupToggle'),
      toggleRow('cooldown', 'cooldownToggle'),
      toggleRow('sound', 'sound'),
      toggleRow('speech', 'speech'),
      toggleRow('haptics', 'haptics')),

    el('div', { class: 'total-line' }, el('span', {}, t('estimatedTotal')), (totalNode = el('strong', { class: 'total-val' }))),

    el('div', { class: 'cta-row' },
      el('button', { class: 'btn ghost', on: { click: () => ctx.nav('preview', { routineId: selected().id }) } }, t('preview')),
      el('button', { class: 'btn primary', on: { click: () => ctx.startSession(selected()) } }, t('startWorkout'))),

    el('footer', { class: 'home-foot' },
      el('p', { class: 'safety' }, t('safety')),
      el('p', { class: 'hint small' }, t('installHint') + ' · ' + t('offlineReady'))));

  mount(container, root);
  refresh();
}
