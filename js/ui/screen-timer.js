import { el, mount, formatTime, labelKeyForKind } from './components.js';
import { t, tx } from '../i18n.js';
import { renderExerciseMedia, stopMedia } from '../data/media.js';

export function render(container, ctx) {
  const engine = ctx.engine;
  const routine = ctx.getRoutine(ctx.params.routineId);
  const unsubs = [];
  let isAmrap = false, amrapActive = false, amrapRounds = 0, roundsN = null;

  // refs
  const topPhase = el('div', { class: 'tt-phase' });
  const topRemain = el('div', { class: 'tt-remain' });
  const stateBadge = el('div', { class: 'state-badge' });
  const figureBox = el('div', { class: 'tt-figure' });
  const name = el('div', { class: 'tt-name' });
  const reps = el('div', { class: 'tt-reps' });
  const desc = el('div', { class: 'tt-desc' });
  const count = el('div', { class: 'tt-count', 'aria-live': 'assertive' }, '–');
  const segBar = el('div', { class: 'bar-fill' });
  const amrapBox = el('div', { class: 'tt-amrap' });
  const nextLine = el('div', { class: 'tt-next' });
  const totalBar = el('div', { class: 'bar-fill total' });
  const elapsed = el('div', { class: 'tt-elapsed' });
  const pauseBtn = el('button', { class: 'btn round big', 'aria-label': t('pause'), on: { click: () => engine.toggle() } }, '⏸');
  const prevBtn = el('button', { class: 'btn round', 'aria-label': t('prev'), on: { click: () => engine.prev() } }, '⏮');
  const nextBtn = el('button', { class: 'btn round', 'aria-label': t('next'), on: { click: () => engine.next() } }, '⏭');

  const root = el('div', { class: 'screen timer k-getready' },
    el('div', { class: 'tt-top' }, topPhase, topRemain),
    el('div', { class: 'tt-stage' },
      stateBadge, figureBox, name, reps, desc, count,
      el('div', { class: 'bar seg' }, segBar), amrapBox, nextLine),
    el('div', { class: 'tt-bottom' },
      el('div', { class: 'bar total-wrap' }, totalBar),
      elapsed,
      el('div', { class: 'ctrl-row' }, prevBtn, pauseBtn, nextBtn,
        el('button', { class: 'btn round danger', 'aria-label': t('stop'), on: { click: stop } }, '⏹'))));

  function buildAmrap(segment) {
    amrapActive = true; amrapRounds = 0;
    roundsN = el('span', { class: 'amrap-num' }, '0');
    const list = el('div', { class: 'amrap-list' }, ...(segment.items || []).map((it) =>
      el('div', { class: 'amrap-item' },
        el('span', { class: 'ai-emoji' }, it.emoji || '•'),
        el('span', { class: 'ai-name' }, tx(it.name)),
        el('span', { class: 'ai-reps' }, t('repsN', it.reps)))));
    const plus = el('button', { class: 'btn amrap-plus', on: { click: () => { amrapRounds++; roundsN.textContent = amrapRounds; } } }, t('addRound'));
    mount(amrapBox, el('div', { class: 'amrap-counter' }, roundsN, el('span', { class: 'amrap-lbl' }, t('rounds'))), list, plus, el('p', { class: 'tt-hint' }, t('amrapTip')));
  }

  function applyState(segment) {
    root.className = `screen timer k-${segment.kind}`;
    isAmrap = segment.kind === 'amrap';
    stateBadge.textContent = isAmrap ? 'AMRAP' : t(labelKeyForKind(segment.kind));
    renderExerciseMedia(figureBox, segment, { animate: true });
    name.textContent = segment.name ? tx(segment.name) : '';
    desc.textContent = segment.desc ? tx(segment.desc) : '';
    reps.textContent = segment.reps ? t('repsN', segment.reps) : '';
    reps.hidden = !segment.reps;
    topPhase.textContent = segment.round ? t('roundXofY', segment.round, segment.totalRounds) : (isAmrap ? '' : t(labelKeyForKind(segment.kind)));
    // AMRAP 특수 UI
    root.classList.toggle('is-amrap', isAmrap);
    figureBox.hidden = isAmrap;
    desc.hidden = isAmrap;
    if (isAmrap) buildAmrap(segment); else mount(amrapBox);
    prevBtn.hidden = isAmrap;
    nextBtn.hidden = isAmrap;
  }

  function applyTick(s) {
    count.textContent = s.remainingSec;
    segBar.style.width = (s.segmentProgress01 * 100).toFixed(1) + '%';
    totalBar.style.width = (s.totalProgress01 * 100).toFixed(1) + '%';
    topRemain.textContent = `${t('totalRemaining')} ${formatTime(s.totalRemainingMs / 1000)}`;
    elapsed.textContent = `${t('elapsed')} ${formatTime(s.elapsedMs / 1000)} / ${formatTime(s.totalMs / 1000)}`;
    nextLine.textContent = (!isAmrap && s.next) ? `${t('nextUp')}: ${s.next.emoji || ''} ${tx(s.next.name)}` : '';
    pauseBtn.textContent = s.paused ? '▶' : '⏸';
    pauseBtn.setAttribute('aria-label', s.paused ? t('resume') : t('pause'));
    root.classList.toggle('paused', !!s.paused);
  }

  function showComplete(info) {
    const summary = amrapActive
      ? el('p', { class: 'done-line big' }, t('roundsDoneN', amrapRounds))
      : el('p', { class: 'done-line' }, t('exercisesDone', info.workCount));
    const done = el('div', { class: 'screen complete' },
      el('div', { class: 'done-emoji' }, '🎉'),
      el('h2', {}, t('greatJob')),
      el('p', { class: 'done-line' }, t('completedIn', formatTime(info.totalSeconds))),
      summary,
      el('div', { class: 'cta-row' },
        el('button', { class: 'btn ghost', on: { click: () => ctx.nav('home') } }, t('goHome')),
        routine ? el('button', { class: 'btn primary', on: { click: () => ctx.startSession(routine) } }, t('doAgain')) : null));
    mount(container, done);
  }

  function stop() { engine.stop(); ctx.nav('home'); }

  unsubs.push(engine.on('segment:enter', ({ segment }) => applyState(segment)));
  unsubs.push(engine.on('tick', (s) => applyTick(s)));
  unsubs.push(engine.on('complete', (info) => showComplete(info)));

  mount(container, root);
  const snap = engine.snapshot();
  if (snap) { applyState(snap.segment); applyTick(snap); }

  return () => { unsubs.forEach((u) => u()); stopMedia(figureBox); };
}
