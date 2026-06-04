import { EXERCISE_MAP } from './data/exercises.js';
import { DIFFICULTIES, WARMUP_BLOCK, COOLDOWN_BLOCK } from './data/routines.js';

// 난이도 프리셋을 루틴에 머지한 복사본 반환(전역 work/rest/rounds만 덮어씀).
export function applyDifficulty(routine, difficultyKey) {
  const d = DIFFICULTIES[difficultyKey];
  if (!d) return { ...routine };
  return { ...routine, work: d.work, rest: d.rest, rounds: d.rounds };
}

// 루틴 + 설정 → 평탄한 구간 목록(타이머가 소비하는 유일한 구조). 모드별로 분기한다.
// segment = { kind, seconds, name, desc, emoji, figure, exerciseId, reps, items, round, totalRounds, startAt, endAt }
export function compileSession(routine, settings, library = EXERCISE_MAP) {
  const segments = [];
  prelude(segments, settings);
  const mode = routine.mode || 'interval';
  if (mode === 'tabata') compileTabata(routine, settings, library, segments);
  else if (mode === 'emom') compileEmom(routine, settings, library, segments);
  else if (mode === 'amrap') compileAmrap(routine, settings, library, segments);
  else if (mode === 'ladder') compileLadder(routine, settings, library, segments);
  else compileInterval(routine, settings, library, segments);
  postlude(segments, settings);
  return finalize(segments, routine);
}

export function totalForRoutine(routine, settings, library = EXERCISE_MAP) {
  return compileSession(routine, settings, library).totalSeconds;
}

// ── 모드별 컴파일 ──
function compileInterval(routine, settings, library, segments) {
  const rounds = Math.max(1, Number(routine.rounds) || 1);
  const items = routine.items || [];
  for (let r = 1; r <= rounds; r++) {
    items.forEach((item, i) => {
      const ex = resolveExercise(item, settings, library);
      if (!ex) return;
      segments.push(workSeg('work', posInt(item.work, routine.work, 40), ex, { round: r, totalRounds: rounds }));
      const restSec = posInt(item.rest, routine.rest, 20);
      const isLast = r === rounds && i === items.length - 1;
      if (!isLast && restSec > 0) segments.push(seg('rest', restSec, { round: r, totalRounds: rounds }));
    });
  }
}

function compileTabata(routine, settings, library, segments) {
  const items = routine.items || [];
  const W = posInt(null, routine.work, 20), R = posInt(null, routine.rest, 10);
  const blockRest = Number(routine.blockRest) || 0;
  items.forEach((item, bi) => {
    const ex = resolveExercise(item, settings, library);
    if (!ex) return;
    for (let k = 1; k <= 8; k++) {
      segments.push(workSeg('work', W, ex, { round: k, totalRounds: 8 }));
      if (k < 8) segments.push(seg('rest', R, { round: k, totalRounds: 8 }));
    }
    if (bi < items.length - 1 && blockRest > 0) segments.push(seg('rest', blockRest, {}));
  });
}

function compileEmom(routine, settings, library, segments) {
  const slot = Number(routine.slot) || 60;
  const rounds = Math.max(1, Number(routine.rounds) || 1);
  const items = routine.items || [];
  for (let r = 1; r <= rounds; r++) {
    items.forEach((item) => {
      const ex = resolveExercise(item, settings, library);
      if (!ex) return;
      segments.push(workSeg('work', slot, ex, { round: r, totalRounds: rounds, reps: item.reps ?? ex.reps ?? 10 }));
    });
  }
}

function compileAmrap(routine, settings, library, segments) {
  const cap = (Number(routine.timeCapMin) || 10) * 60;
  const items = (routine.items || []).map((item) => {
    const ex = resolveExercise(item, settings, library);
    return ex ? { id: ex.id, name: ex.name, emoji: ex.emoji, figure: ex.figure || null, reps: item.reps ?? ex.reps ?? 10 } : null;
  }).filter(Boolean);
  segments.push(seg('amrap', cap, { emoji: '🔁', items }));
}

function compileLadder(routine, settings, library, segments) {
  const ladder = Array.isArray(routine.ladderSeconds) && routine.ladderSeconds.length ? routine.ladderSeconds : [20, 30, 40, 30, 20];
  const items = routine.items || [];
  const rest = posInt(null, routine.rest, 15);
  ladder.forEach((sec, idx) => {
    const r = idx + 1;
    items.forEach((item, i) => {
      const ex = resolveExercise(item, settings, library);
      if (!ex) return;
      segments.push(workSeg('work', Math.max(1, Math.round(sec)), ex, { round: r, totalRounds: ladder.length }));
      const isLast = idx === ladder.length - 1 && i === items.length - 1;
      if (!isLast && rest > 0) segments.push(seg('rest', rest, { round: r, totalRounds: ladder.length }));
    });
  });
}

// ── 공통 ──
function prelude(segments, settings) {
  const g = Number(settings.getReady) || 0;
  if (g > 0) segments.push(seg('getready', g, { emoji: '⏱️' }));
  if (settings.warmup) for (const w of WARMUP_BLOCK) segments.push(seg('warmup', w.seconds, { name: w.name, desc: w.desc, emoji: w.emoji, figure: w.figure || null, exerciseId: w.id || null }));
}

function postlude(segments, settings) {
  if (settings.cooldown) for (const c of COOLDOWN_BLOCK) segments.push(seg('cooldown', c.seconds, { name: c.name, desc: c.desc, emoji: c.emoji, figure: c.figure || null, exerciseId: c.id || null }));
  segments.push(seg('done', 0, { emoji: '🎉' }));
}

function finalize(segments, routine) {
  let acc = 0, workCount = 0;
  for (const s of segments) {
    s.startAt = acc; acc += s.seconds; s.endAt = acc;
    if (s.kind === 'work') workCount += 1;
  }
  return { segments, totalSeconds: acc, workCount, routineName: routine.name, mode: routine.mode || 'interval' };
}

function resolveExercise(item, settings, library) {
  let ex = library[item.exerciseId];
  if (!ex) return null;
  if (settings.lowNoise && ex.quietAltId && library[ex.quietAltId]) ex = library[ex.quietAltId];
  return ex;
}

function workSeg(kind, seconds, ex, extra = {}) {
  return seg(kind, seconds, { name: ex.name, desc: ex.desc, emoji: ex.emoji, figure: ex.figure || null, exerciseId: ex.id, ...extra });
}

function seg(kind, seconds, extra = {}) {
  return {
    kind, seconds,
    name: null, desc: null, emoji: null, figure: null, exerciseId: null, reps: null, items: null,
    round: null, totalRounds: null, startAt: 0, endAt: 0,
    ...extra,
  };
}

function posInt(primary, fallback, dflt) {
  const v = Number(primary);
  if (Number.isFinite(v) && v > 0) return Math.round(v);
  const f = Number(fallback);
  if (Number.isFinite(f) && f > 0) return Math.round(f);
  return dflt;
}
