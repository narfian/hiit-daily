import { el, mount } from './components.js';
import { t, tx } from '../i18n.js';
import { EXERCISES, ALL_TAGS } from '../data/exercises.js';
import { renderFigure } from '../data/figures.js';
import { openExercise } from './exercise-detail.js';

export function render(container, ctx) {
  let activeTag = 'all';
  let grid, filterBar;

  function buildGrid() {
    const list = activeTag === 'all' ? EXERCISES : EXERCISES.filter((e) => e.tags.includes(activeTag));
    const g = el('div', { class: 'lib-grid big' }, ...list.map((ex) => {
      const fig = el('div', { class: 'lib-fig' });
      renderFigure(fig, ex.figure, ex.emoji);
      return el('button', { class: 'lib-card', on: { click: () => openExercise(ex, {}) } },
        fig, el('span', { class: 'lib-name' }, tx(ex.name)),
        ex.quiet ? el('span', { class: 'badge quiet' }, t('quietBadge')) : null);
    }));
    if (grid) grid.replaceWith(g);
    grid = g;
    return g;
  }

  function select(tag) {
    activeTag = tag;
    filterBar.querySelectorAll('.filter-chip').forEach((b) => b.classList.toggle('active', b.dataset.tag === tag));
    buildGrid();
  }

  filterBar = el('div', { class: 'filter-bar' },
    ...['all', ...ALL_TAGS].map((tag) => el('button', {
      class: 'filter-chip' + (tag === 'all' ? ' active' : ''), dataset: { tag },
      on: { click: () => select(tag) },
    }, tag === 'all' ? t('filterAll') : t('tag_' + tag))));

  const root = el('div', { class: 'screen library' },
    el('header', { class: 'sub-header' },
      el('button', { class: 'chip', on: { click: () => ctx.nav('home') } }, t('back')),
      el('h2', {}, t('library'))),
    filterBar,
    buildGrid());

  mount(container, root);
}
