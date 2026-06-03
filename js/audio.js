// Web Audio 비프(오디오 파일 불필요) + SpeechSynthesis 음성 안내.
// iOS: AudioContext는 suspended로 시작 → 사용자 제스처(Start)에서 unlockAudio() 필요.

let ctx = null;
let voices = [];
const prefs = { sound: true, speech: true };

export function configureAudio(p) { Object.assign(prefs, p); }

export function unlockAudio() {
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    // iOS 잠금 해제용 무음 버퍼 1회 재생
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  } catch { /* 무시 */ }
  // 음성 워밍업(iOS는 voiceschanged 전까지 비어있음)
  loadVoices();
}

export function beep(freq = 880, durMs = 120, type = 'sine', gain = 0.18) {
  if (!prefs.sound || !ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(gain, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + durMs / 1000);
    osc.connect(g).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + durMs / 1000 + 0.02);
  } catch { /* 무시 */ }
}

export const cues = {
  countdown: () => beep(880, 90, 'sine', 0.16),
  workStart: () => beep(1320, 260, 'square', 0.16),
  restStart: () => beep(440, 260, 'sine', 0.18),
  complete: () => { beep(660, 150); setTimeout(() => beep(880, 150), 170); setTimeout(() => beep(1175, 320), 340); },
};

function loadVoices() {
  try { voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; } catch { voices = []; }
}
if (window.speechSynthesis) {
  loadVoices();
  speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
}

function pickVoice(lang) {
  const want = lang === 'ko' ? 'ko' : 'en';
  return voices.find((v) => v.lang?.toLowerCase().startsWith(want)) || null;
}

export function announce(text, lang) {
  if (!prefs.sound || !prefs.speech || !window.speechSynthesis || !text) return;
  try {
    speechSynthesis.cancel(); // 중복/큐 누적 방지
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'ko' ? 'ko-KR' : 'en-US';
    const v = pickVoice(lang);
    if (v) u.voice = v;       // ko 음성 없으면 기본 음성(lang은 유지)
    u.rate = 1.0;
    u.pitch = 1.0;
    speechSynthesis.speak(u);
  } catch { /* 무시 */ }
}

export function stopSpeech() { try { speechSynthesis?.cancel(); } catch { /* 무시 */ } }
