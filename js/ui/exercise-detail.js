import { el } from './components.js';
import { t, tx } from '../i18n.js';
import { renderFigure } from '../data/figures.js';

// 운동 상세 모달. onAdd가 있으면 "루틴에 추가" 버튼 표시.
export function openExercise(ex, { onAdd } = {}) {
  const figBox = el('div', { class: 'detail-fig' });
  renderFigure(figBox, ex.figure, ex.emoji);

  const muscles = tx(ex.muscles) || [];
  const cues = tx(ex.cues) || [];
  const mistakes = tx(ex.mistakes) || [];

  const listBlock = (title, items, cls = '') => (items && items.length)
    ? el('div', { class: 'detail-block' }, el('h4', {}, title), el('ul', { class: 'detail-ul ' + cls }, ...items.map((x) => el('li', {}, x))))
    : null;
  const varBlock = (label, val) => val ? el('div', { class: 'detail-var' }, el('strong', {}, label), ' ', tx(val)) : null;

  function close() { overlay.remove(); document.removeEventListener('keydown', onKey); }
  function onKey(e) { if (e.key === 'Escape') close(); }

  const overlay = el('div', { class: 'modal-overlay', on: { click: (e) => { if (e.target === overlay) close(); } } },
    el('div', { class: 'modal', attrs: { role: 'dialog', 'aria-modal': 'true' } },
      el('button', { class: 'modal-close', 'aria-label': t('close'), on: { click: close } }, '✕'),
      figBox,
      el('h3', { class: 'detail-name' }, tx(ex.name), ex.quiet ? el('span', { class: 'badge quiet' }, t('quietBadge')) : null),
      el('p', { class: 'detail-desc' }, tx(ex.desc)),
      muscles.length ? el('div', { class: 'detail-block' }, el('h4', {}, t('targetMuscles')),
        el('div', { class: 'chips' }, ...muscles.map((m) => el('span', { class: 'chip-sm' }, m)))) : null,
      listBlock(t('formCues'), cues),
      listBlock(t('commonMistakes'), mistakes, 'bad'),
      el('div', { class: 'detail-vars' }, varBlock(t('easierVar'), ex.easier), varBlock(t('harderVar'), ex.harder)),
      onAdd ? el('button', { class: 'btn primary block', on: { click: () => { onAdd(ex); close(); } } }, t('addToRoutine')) : null));

  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
  return close;
}
