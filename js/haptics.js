// 진동 피드백. iOS Safari는 사실상 미지원 → 그곳에선 순수 no-op.
const prefs = { haptics: true };
export const supported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

export function configureHaptics(p) { Object.assign(prefs, p); }

function buzz(pattern) {
  if (!prefs.haptics || !supported) return;
  try { navigator.vibrate(pattern); } catch { /* 무시 */ }
}

export const haptics = {
  tick: () => buzz(20),
  workStart: () => buzz([60, 40, 60]),
  restStart: () => buzz(40),
  complete: () => buzz([100, 60, 100, 60, 200]),
};
