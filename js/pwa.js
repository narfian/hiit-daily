// 서비스워커 등록(상대 경로 + scope './' → Pages 하위 경로에서 앱 영역만 제어).
export function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  // file:// 에서는 SW 등록 불가 — 조용히 건너뜀
  if (location.protocol !== 'http:' && location.protocol !== 'https:') return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => { /* 무시 */ });
  });
}

// 설치 가능 시점 감지(선택적 안내 배너용)
let deferredPrompt = null;
export function watchInstallPrompt(onAvailable) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    onAvailable?.();
  });
}
export async function promptInstall() {
  if (!deferredPrompt) return false;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  return outcome === 'accepted';
}
export function canInstall() { return !!deferredPrompt; }
