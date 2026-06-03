import { el, mount } from './components.js';
import { t, tx } from '../i18n.js';
import { GUIDE } from '../data/guide.js';

function blockEl(b) {
  if (b.p) return el('p', { class: 'g-p' }, tx(b.p));
  if (b.list) return el('ul', { class: 'g-list' }, ...b.list.map((li) => el('li', {}, tx(li))));
  if (b.table) {
    return el('div', { class: 'g-table-wrap' }, el('table', { class: 'g-table' },
      el('thead', {}, el('tr', {}, ...b.table.head.map((h) => el('th', {}, tx(h))))),
      el('tbody', {}, ...b.table.rows.map((row) => el('tr', {}, ...row.map((c) => el('td', {}, tx(c))))))));
  }
  return null;
}

export function render(container, ctx) {
  const root = el('div', { class: 'screen guide' },
    el('header', { class: 'sub-header' },
      el('button', { class: 'chip', on: { click: () => ctx.nav('home') } }, t('back')),
      el('h2', {}, t('guide'))),
    ...GUIDE.map((sec, i) => el('details', { class: 'g-section', ...(i === 0 ? { open: '' } : {}) },
      el('summary', {}, el('span', { class: 'g-ico' }, sec.icon), tx(sec.title)),
      el('div', { class: 'g-body' }, ...sec.blocks.map(blockEl)))));
  mount(container, root);
}
