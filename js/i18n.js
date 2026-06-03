import { STRINGS } from './data/strings.js';
import { patchSettings } from './storage.js';
import { bus } from './state.js';

let lang = 'ko';

export function getLang() { return lang; }

// 최초 언어 결정: 저장값 > navigator.language(ko면 ko) > 기본 ko
export function initLang(savedLang) {
  if (savedLang === 'ko' || savedLang === 'en') {
    lang = savedLang;
  } else {
    const nav = (navigator.language || '').toLowerCase();
    lang = nav.startsWith('ko') ? 'ko' : (nav.startsWith('en') ? 'en' : 'ko');
  }
  document.documentElement.lang = lang;
  return lang;
}

export function setLang(next) {
  if (next !== 'ko' && next !== 'en') return;
  lang = next;
  patchSettings({ lang });
  document.documentElement.lang = lang;
  applyI18n(document);
  bus.emit('lang', lang);
}

export function toggleLang() { setLang(lang === 'ko' ? 'en' : 'ko'); }

// UI 문자열. 값이 함수면 인자를 적용한다.
export function t(key, ...args) {
  const dict = STRINGS[lang] || STRINGS.ko;
  const v = dict[key];
  if (v == null) return key;
  return typeof v === 'function' ? v(...args) : v;
}

// 인라인 콘텐츠 객체 {ko, en} → 현재 언어 문자열
export function tx(bilingual) {
  if (!bilingual) return '';
  return bilingual[lang] ?? bilingual.ko ?? bilingual.en ?? '';
}

// [data-i18n] 텍스트, [data-i18n-ph] placeholder, [data-i18n-aria] aria-label 일괄 적용
export function applyI18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t(n.dataset.i18n); });
  root.querySelectorAll('[data-i18n-ph]').forEach((n) => { n.setAttribute('placeholder', t(n.dataset.i18nPh)); });
  root.querySelectorAll('[data-i18n-aria]').forEach((n) => { n.setAttribute('aria-label', t(n.dataset.i18nAria)); });
}
