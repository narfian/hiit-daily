// localStorage 래퍼 — 네임스페이스 + 버전 + 안전 파싱.
// 사적 모드/장기 미사용 시 비워질 수 있으므로 모든 읽기는 방어적이다.
const NS = 'hiitdaily.';
const KEYS = { settings: NS + 'settings.v1', routines: NS + 'routines.v1' };

export const DEFAULT_SETTINGS = {
  v: 1,
  lang: 'ko',
  sound: true,
  speech: true,
  haptics: true,
  difficulty: 'intermediate',
  // 활성 타이밍(난이도 버튼/슬라이더가 갱신). 시작 시 이 값으로 효과 루틴을 만든다.
  work: 40,
  rest: 20,
  rounds: 4,
  lowNoise: false,
  warmup: true,
  cooldown: true,
  theme: 'system',
  getReady: 5,
  selectedRoutineId: 'default-main',
};

function clone(obj) {
  // structuredClone 폴백 포함
  try { return structuredClone(obj); } catch { return JSON.parse(JSON.stringify(obj)); }
}

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : clone(fallback);
  } catch {
    return clone(fallback);
  }
}

function safeSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* quota/private mode */ }
}

function migrate(s) {
  // 미래 버전 마이그레이션 자리. 누락 키는 기본값으로 채운다.
  return { ...DEFAULT_SETTINGS, ...s, v: 1 };
}

export function loadSettings() {
  return migrate(safeGet(KEYS.settings, DEFAULT_SETTINGS));
}

export function saveSettings(s) {
  safeSet(KEYS.settings, { ...s, v: 1 });
  return s;
}

export function patchSettings(patch) {
  const next = { ...loadSettings(), ...patch };
  return saveSettings(next);
}

// 사용자가 만든 커스텀 루틴만 저장(프리셋/라이브러리는 코드에 내장).
export function loadRoutines() {
  const db = safeGet(KEYS.routines, { v: 1, list: [] });
  return Array.isArray(db.list) ? db.list : [];
}

export function saveRoutine(routine) {
  const list = loadRoutines();
  const idx = list.findIndex((r) => r.id === routine.id);
  if (idx >= 0) list[idx] = routine; else list.push(routine);
  safeSet(KEYS.routines, { v: 1, list });
  return routine;
}

export function deleteRoutine(id) {
  const list = loadRoutines().filter((r) => r.id !== id);
  safeSet(KEYS.routines, { v: 1, list });
}

export function newRoutineId() {
  return 'custom-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
}
