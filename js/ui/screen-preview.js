import { el, mount, formatTime, labelKeyForKind } from './components.js';
import { t, tx, getLang } from '../i18n.js';
import { renderExerciseMedia } from '../data/media.js';
import { openExercise } from './exercise-detail.js';
import { EXERCISE_MAP } from '../data/exercises.js';

const secLabel = (n) => (getLang() === 'ko' ? `${n}초` : `${n}s`);
const modeKey = (m) => ({ interval: 'modeInterval', tabata: 'modeTabata', emom: 'modeEmom', amrap: 'modeAmrap', ladder: 'modeLadder' }[m] || 'modeInterval');

export function render(container, ctx) {
  const routine = ctx.getRoutine(ctx.params.routineId) || ctx.allRoutines()[0];
  const session = ctx.buildSession(routine);

  const detailRow = (ex, reps, secs, kindLabel, round) => {
    const fig = el('span', { class: 'seg-fig' });
    renderExerciseMedia(fig, ex || { emoji: '•' }, { animate: false });
    return el(ex ? 'button' : 'div', {
      class: 'seg-row k-work' + (ex ? ' tappable' : ''),
      ...(ex ? { on: { click: () => openExercise(ex, {}) } } : {}),
    }, fig,
      el('span', { class: 'seg-name' }, ex ? tx(ex.name) : '',
        round ? el('span', { class: 'seg-round' }, `R${round}`) : null,
        reps ? el('span', { class: 'seg-reps' }, t('repsN', reps)) : null),
      el('span', { class: 'seg-kind' }, kindLabel || ''),
      secs != null ? el('span', { class: 'seg-sec' }, secLabel(secs)) : el('span', { class: 'seg-sec' }, ''));
  };

  let rows;
  if (session.mode === 'amrap') {
    const aseg = session.segments.find((s) => s.kind === 'amrap');
    rows = [
      el('p', { class: 'amrap-cap-line' }, `${t('modeAmrap')} · ${formatTime(aseg.seconds)} · ${t('amrapTip')}`),
      ...aseg.items.map((it) => detailRow(EXERCISE_MAP[it.id], it.reps, null, '', null)),
    ];
  } else {
    rows = session.segments
      .filter((s) => s.kind !== 'done' && s.kind !== 'getready')
      .map((s) => {
        const ex = s.exerciseId && EXERCISE_MAP[s.exerciseId];
        const fig = el('span', { class: 'seg-fig' });
        renderExerciseMedia(fig, { exerciseId: s.exerciseId, figure: s.figure, emoji: s.emoji || (s.kind === 'rest' ? '😮‍💨' : '•') }, { animate: false });
        const clickable = !!ex;
        return el(clickable ? 'button' : 'div', {
          class: `seg-row k-${s.kind}` + (clickable ? ' tappable' : ''),
          ...(clickable ? { on: { click: () => openExercise(ex, {}) } } : {}),
        }, fig,
          el('span', { class: 'seg-name' }, s.name ? tx(s.name) : t(labelKeyForKind(s.kind)),
            s.round ? el('span', { class: 'seg-round' }, `R${s.round}`) : null,
            s.reps ? el('span', { class: 'seg-reps' }, t('repsN', s.reps)) : null),
          el('span', { class: 'seg-kind' }, t(labelKeyForKind(s.kind))),
          el('span', { class: 'seg-sec' }, secLabel(s.seconds)));
      });
  }

  const root = el('div', { class: 'screen preview' },
    el('header', { class: 'sub-header' },
      el('button', { class: 'chip', on: { click: () => ctx.nav('home') } }, t('back')),
      el('h2', {}, t('previewTitle'))),

    el('div', { class: 'preview-title' },
      el('span', { class: 'pt-name' }, tx(routine.name), el('span', { class: 'mode-chip' }, t(modeKey(session.mode)))),
      el('span', { class: 'pt-total' }, `${t('totalTime')} ${formatTime(session.totalSeconds)}`)),

    el('div', { class: 'seg-list' }, ...rows),

    el('p', { class: 'safety' }, t('safety')),

    el('div', { class: 'cta-row sticky' },
      el('button', { class: 'btn primary block', on: { click: () => ctx.startSession(routine) } },
        `▶ ${t('startWorkout')} · ${formatTime(session.totalSeconds)}`)));

  mount(container, root);
}
