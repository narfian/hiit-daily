import { EXERCISE_MAP } from './data/exercises.js';
import { DIFFICULTIES, WARMUP_BLOCK, COOLDOWN_BLOCK } from './data/routines.js';

// 난이도 프리셋을 루틴에 머지한 복사본 반환(전역 work/rest/rounds만 덮어씀).
export function applyDifficulty(routine, difficultyKey) {
  const d = DIFFICULTIES[difficultyKey];
  if (!d) return { ...routine };
  return { ...routine, work: d.work, rest: d.rest, rounds: d.rounds };
}

// 루틴 + 설정 → 평탄한 구간 목록(타이머가 소비하는 유일한 구조).
// segment = { kind, seconds, name|null, desc|null, emoji|null, round|null, totalRounds|null, startAt, endAt }
export function compileSession(routine, settings, library = EXERCISE_MAP) {
  const segments = [];

  // 1) 준비 카운트다운
  const getReady = Number(settings.getReady) || 0;
  if (getReady > 0) {
    segments.push(seg('getready', getReady, { emoji: '⏱️' }));
  }

  // 2) 워밍업
  if (settings.warmup) {
    for (const w of WARMUP_BLOCK) {
      segments.push(seg('warmup', w.seconds, { name: w.name, desc: w.desc, emoji: w.emoji }));
    }
  }

  // 3) 메인 루프
  const rounds = Math.max(1, Number(routine.rounds) || 1);
  const items = Array.isArray(routine.items) ? routine.items : [];
  for (let r = 1; r <= rounds; r++) {
    items.forEach((item, i) => {
      let ex = library[item.exerciseId];
      if (!ex) return;
      // 저소음 모드: 점프 동작을 대체 동작으로
      if (settings.lowNoise && ex.quietAltId && library[ex.quietAltId]) {
        ex = library[ex.quietAltId];
      }
      const workSec = posInt(item.work, routine.work, 40);
      segments.push(seg('work', workSec, {
        name: ex.name, desc: ex.desc, emoji: ex.emoji, round: r, totalRounds: rounds,
      }));

      const restSec = posInt(item.rest, routine.rest, 20);
      const isLastOfAll = r === rounds && i === items.length - 1;
      if (!isLastOfAll && restSec > 0) {
        segments.push(seg('rest', restSec, { round: r, totalRounds: rounds }));
      }
    });
  }

  // 4) 쿨다운
  if (settings.cooldown) {
    for (const c of COOLDOWN_BLOCK) {
      segments.push(seg('cooldown', c.seconds, { name: c.name, desc: c.desc, emoji: c.emoji }));
    }
  }

  // 5) 종료 마커
  segments.push(seg('done', 0, { emoji: '🎉' }));

  // 누적 오프셋 + 총합
  let acc = 0;
  let workCount = 0;
  for (const s of segments) {
    s.startAt = acc;
    acc += s.seconds;
    s.endAt = acc;
    if (s.kind === 'work') workCount += 1;
  }

  return { segments, totalSeconds: acc, workCount, routineName: routine.name };
}

export function totalForRoutine(routine, settings, library = EXERCISE_MAP) {
  return compileSession(routine, settings, library).totalSeconds;
}

function seg(kind, seconds, extra = {}) {
  return {
    kind, seconds,
    name: null, desc: null, emoji: null, round: null, totalRounds: null,
    startAt: 0, endAt: 0,
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
