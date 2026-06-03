import { bus } from './state.js';
import { loadSettings, saveSettings, loadRoutines, saveRoutine as storeSaveRoutine, deleteRoutine as storeDeleteRoutine } from './storage.js';
import { initLang, getLang, t, tx } from './i18n.js';
import { labelKeyForKind } from './ui/components.js';
import { compileSession } from './compiler.js';
import { PRESET_ROUTINES } from './data/routines.js';
import { TimerEngine } from './timer.js';
import { configureAudio, unlockAudio, cues, announce, stopSpeech } from './audio.js';
import { configureHaptics, haptics } from './haptics.js';
import * as wakelock from './wakelock.js';
import { registerSW } from './pwa.js';

import * as Home from './ui/screen-home.js';
import * as Builder from './ui/screen-builder.js';
import * as Preview from './ui/screen-preview.js';
import * as Timer from './ui/screen-timer.js';
import * as Library from './ui/screen-library.js';
import * as Guide from './ui/screen-guide.js';

const SCREENS = { home: Home, builder: Builder, preview: Preview, timer: Timer, library: Library, guide: Guide };

const settings = loadSettings();
const engine = new TimerEngine();
const appRoot = document.getElementById('app');
let current = { name: null, params: {}, cleanup: null };

// ── 부팅 설정 적용 ──
initLang(settings.lang);
applyTheme();
configureAudio({ sound: settings.sound, speech: settings.speech });
configureHaptics({ haptics: settings.haptics });
wakelock.bindReacquire();
registerSW();

// ── 엔진 ↔ 오디오/햅틱/화면유지 연결(화면 전환과 무관하게 유지) ──
engine.on('segment:enter', ({ segment }) => {
  if (segment.kind === 'work') { cues.workStart(); haptics.workStart(); }
  else if (segment.kind === 'rest') { cues.restStart(); haptics.restStart(); }
  else if (segment.kind === 'warmup' || segment.kind === 'cooldown') { cues.restStart(); haptics.restStart(); }
  const word = t(labelKeyForKind(segment.kind));
  const exName = segment.name ? tx(segment.name) : '';
  announce(exName ? `${word}. ${exName}` : word, getLang());
});
engine.on('countdown', () => { cues.countdown(); haptics.tick(); });
engine.on('complete', () => { cues.complete(); haptics.complete(); wakelock.release(); });
engine.on('stop', () => { stopSpeech(); wakelock.release(); });

// ── 화면 라우팅 ──
function nav(name, params = {}) {
  if (current.cleanup) { try { current.cleanup(); } catch { /* 무시 */ } }
  ctx.params = params;
  const cleanup = SCREENS[name].render(appRoot, ctx);
  current = { name, params, cleanup };
  window.scrollTo(0, 0);
}

// ── 설정 변경(병합+영속+부수효과) ──
function update(patch) {
  Object.assign(settings, patch);
  saveSettings(settings);
  if ('sound' in patch || 'speech' in patch) configureAudio({ sound: settings.sound, speech: settings.speech });
  if ('haptics' in patch) configureHaptics({ haptics: settings.haptics });
  if ('theme' in patch) applyTheme();
  return settings;
}

function applyTheme() {
  const tm = settings.theme;
  if (tm === 'light' || tm === 'dark') document.documentElement.setAttribute('data-theme', tm);
  else document.documentElement.removeAttribute('data-theme'); // 시스템 → CSS prefers-color-scheme
}

// ── 루틴 도우미 ──
const allRoutines = () => [...PRESET_ROUTINES, ...loadRoutines()];
const getRoutine = (id) => allRoutines().find((r) => r.id === id) || null;
// 인터벌 모드만 홈 슬라이더 타이밍을 덮어쓴다. 고급 모드는 루틴 자체 정의 사용.
const effectiveRoutine = (r) => ((r.mode || 'interval') === 'interval'
  ? { ...r, work: settings.work, rest: settings.rest, rounds: settings.rounds }
  : { ...r });
const buildSession = (r) => compileSession(effectiveRoutine(r), settings);

function startSession(routine) {
  unlockAudio();          // 사용자 제스처 내에서 오디오 잠금 해제
  wakelock.acquire();     // 화면 꺼짐 방지
  engine.load(buildSession(routine));
  nav('timer', { routineId: routine.id });
  engine.start();
}

// ── 공유 컨텍스트 ──
const ctx = {
  settings, engine, params: {},
  nav, update,
  allRoutines, getRoutine, effectiveRoutine, buildSession, startSession,
  saveRoutine: (r) => storeSaveRoutine(r),
  deleteRoutine: (id) => storeDeleteRoutine(id),
};

// 언어 변경 → 현재 화면 다시 렌더
bus.on('lang', (lang) => { settings.lang = lang; nav(current.name, current.params); });

// 키보드(타이머 화면): Space=일시정지/계속, ←/→=이전/다음
document.addEventListener('keydown', (e) => {
  if (current.name !== 'timer') return;
  if (e.code === 'Space') { e.preventDefault(); engine.toggle(); }
  else if (e.code === 'ArrowLeft') { engine.prev(); }
  else if (e.code === 'ArrowRight') { engine.next(); }
});

nav('home');
