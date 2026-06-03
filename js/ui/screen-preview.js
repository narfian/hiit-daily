import { el, mount, formatTime, labelKeyForKind } from './components.js';
import { t, tx, getLang } from '../i18n.js';

const secLabel = (n) => (getLang() === 'ko' ? `${n}초` : `${n}s`);

export function render(container, ctx) {
  const routine = ctx.getRoutine(ctx.params.routineId) || ctx.allRoutines()[0];
  const session = ctx.buildSession(routine);

  const rows = session.segments
    .filter((s) => s.kind !== 'done' && s.kind !== 'getready')
    .map((s) => el('div', { class: `seg-row k-${s.kind}` },
      el('span', { class: 'seg-emoji' }, s.emoji || (s.kind === 'rest' ? '😮‍💨' : '•')),
      el('span', { class: 'seg-name' },
        s.name ? tx(s.name) : t(labelKeyForKind(s.kind)),
        s.round ? el('span', { class: 'seg-round' }, `R${s.round}`) : null),
      el('span', { class: 'seg-kind' }, t(labelKeyForKind(s.kind))),
      el('span', { class: 'seg-sec' }, secLabel(s.seconds))));

  const root = el('div', { class: 'screen preview' },
    el('header', { class: 'sub-header' },
      el('button', { class: 'chip', on: { click: () => ctx.nav('home') } }, t('back')),
      el('h2', {}, t('previewTitle'))),

    el('div', { class: 'preview-title' },
      el('span', { class: 'pt-name' }, tx(routine.name)),
      el('span', { class: 'pt-total' }, `${t('totalTime')} ${formatTime(session.totalSeconds)}`)),

    el('div', { class: 'seg-list' }, ...rows),

    el('p', { class: 'safety' }, t('safety')),

    el('div', { class: 'cta-row sticky' },
      el('button', { class: 'btn primary block', on: { click: () => ctx.startSession(routine) } },
        `▶ ${t('startWorkout')} · ${formatTime(session.totalSeconds)}`)));

  mount(container, root);
}
