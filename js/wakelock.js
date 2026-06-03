// 화면 꺼짐 방지(Screen Wake Lock). iOS는 18.4+에서 지원(이전은 무해한 no-op).
// 탭이 숨겨지면 자동 해제되므로 포그라운드 복귀 시 재획득해야 한다.

let lock = null;
let active = false; // 운동 중 여부(재획득 판단용)

export const supported = typeof navigator !== 'undefined' && 'wakeLock' in navigator;

export async function acquire() {
  active = true;
  if (!supported) return false;
  if (lock) return true;
  try {
    lock = await navigator.wakeLock.request('screen');
    lock.addEventListener?.('release', () => { lock = null; });
    return true;
  } catch {
    lock = null; // 저전력/정책 거부 → 조용히 폴백
    return false;
  }
}

export async function release() {
  active = false;
  try { await lock?.release(); } catch { /* 무시 */ }
  lock = null;
}

// 부팅 시 1회 호출: 탭 복귀 + 운동 중 + 락 없음이면 재요청
export function bindReacquire() {
  if (!supported) return;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && active && !lock) acquire();
  });
}
