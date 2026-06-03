// 앱셸 캐시(cache-first). 자산 변경 시 VERSION을 올리면 옛 캐시가 정리된다.
// 모든 경로는 './' 상대 → Pages 하위 경로(/hiit-daily/)에서 올바르게 동작.
const VERSION = 'v3';
const CACHE = `hiit-${VERSION}`;
const ASSETS = [
  './', './index.html', './offline.html', './manifest.webmanifest',
  './css/reset.css', './css/theme.css', './css/styles.css',
  './js/app.js', './js/state.js', './js/storage.js', './js/i18n.js', './js/compiler.js',
  './js/timer.js', './js/audio.js', './js/wakelock.js', './js/haptics.js', './js/pwa.js',
  './js/data/exercises.js', './js/data/routines.js', './js/data/strings.js',
  './js/data/figures.js', './js/data/guide.js', './js/data/media.js',
  './js/ui/components.js', './js/ui/screen-home.js', './js/ui/screen-builder.js',
  './js/ui/screen-preview.js', './js/ui/screen-timer.js',
  './js/ui/screen-library.js', './js/ui/screen-guide.js', './js/ui/exercise-detail.js',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png',
  './icons/icon-maskable-512.png', './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      // 일부 자산 누락이 전체 설치를 막지 않도록 개별 추가
      .then((c) => Promise.allSettled(ASSETS.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // 운동 사진/GIF: 런타임 캐시(처음 보면 받아서 저장 → 이후 오프라인 사용 가능)
  if (url.pathname.includes('/images/')) {
    e.respondWith(caches.open(CACHE).then(async (c) => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      try {
        const res = await fetch(e.request);
        if (res && res.ok) c.put(e.request, res.clone());
        return res;
      } catch {
        return hit || Response.error();
      }
    }));
    return;
  }

  // 앱셸: cache-first → 네트워크 → 오프라인 폴백
  e.respondWith(
    caches.match(e.request).then((hit) =>
      hit || fetch(e.request).catch(() => caches.match('./offline.html')))
  );
});
