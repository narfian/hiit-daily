// 운동 사진/GIF 미디어 레이어 (점진적 향상).
// 사진을 둘 운동만 MEDIA에 선언한다. 없는 운동은 자동으로 SVG 일러스트로 폴백한다.
// 파일 규칙(images/exercises/): 프레임 1개 → "<id>.jpg", 여러 개 → "<id>-1.jpg"...; 또는 "<id>.gif".
// positions(영문)는 tools/gen-prompts.mjs가 생성 프롬프트를 만드는 데 쓰인다. 프레임 수 = positions.length.
import { renderFigure } from './figures.js';

const BASE = 'images/exercises/';
const EXT = 'jpg';

export const MEDIA = {
  // 하체
  squat: { positions: ['standing tall, feet shoulder-width', 'bottom of the squat, thighs parallel, hips back'] },
  'jump-squat': { positions: ['quarter-squat loading', 'deep squat, arms swung back', 'airborne, legs extended'] },
  lunge: { positions: ['standing, about to step forward', 'deep lunge, both knees about 90 degrees'] },
  'reverse-lunge': { positions: ['standing tall', 'deep reverse lunge, back knee toward the floor'] },
  'jump-lunge': { positions: ['lunge, right leg forward', 'airborne switching legs', 'lunge, left leg forward'] },
  'bulgarian-split-squat': { positions: ['standing, rear foot resting on a chair behind', 'bottom of the split squat, front thigh parallel'] },
  'curtsy-lunge': { positions: ['standing tall', 'curtsy lunge, one leg crossed diagonally behind'] },
  'wall-sit': { positions: ['wall sit hold, back flat against the wall, thighs parallel'] },
  'calf-raise': { positions: ['standing flat-footed', 'up on the balls of the feet, heels high'] },
  'glute-bridge': { positions: ['lying on back, knees bent, hips down', 'hips lifted into a bridge, glutes squeezed'] },
  'single-leg-glute-bridge': { positions: ['lying on back, one leg extended, hips down', 'hips lifted, one leg extended in line'] },
  'broad-jump': { positions: ['loading squat, arms swung back', 'airborne, broad jump forward', 'soft landing in a squat'] },

  // 상체
  pushup: { positions: ['top of a push-up, arms extended, body straight', 'bottom of a push-up, chest near the floor'] },
  'incline-pushup': { positions: ['top of an incline push-up, hands on a bench', 'bottom, chest near the bench'] },
  'decline-pushup': { positions: ['top of a decline push-up, feet on a bench', 'bottom, chest near the floor'] },
  'diamond-pushup': { positions: ['top of a diamond push-up, hands together', 'bottom, elbows tucked close to the body'] },
  'pike-pushup': { positions: ['pike position, hips high in an inverted V', 'bottom, head lowered toward the floor'] },
  'chair-dip': { positions: ['top of a triceps dip, arms extended on a chair', 'bottom, elbows bent about 90 degrees'] },
  'plank-updown': { positions: ['forearm plank', 'high plank on the hands'] },

  // 코어
  plank: { positions: ['forearm plank hold, body in one straight line'] },
  'side-plank': { positions: ['side plank hold, hips high, top arm reaching up'] },
  'plank-shoulder-tap': { positions: ['high plank, both hands down', 'high plank, tapping the opposite shoulder'] },
  'mountain-climber': { positions: ['high plank, right knee driven to chest', 'high plank, left knee driven to chest'] },
  'bicycle-crunch': { positions: ['lying, right elbow toward left knee', 'lying, left elbow toward right knee'] },
  'flutter-kick': { positions: ['lying on back, legs low, right leg up', 'legs switched, left leg up'] },
  'dead-bug': { positions: ['lying on back, right arm and left leg extended', 'left arm and right leg extended'] },
  'hollow-hold': { positions: ['hollow hold, shoulders and legs lifted into a banana shape'] },
  superman: { positions: ['lying face down, relaxed', 'superman, arms and legs lifted off the floor'] },
  'bird-dog': { positions: ['on all fours, neutral spine', 'bird dog, opposite arm and leg extended'] },

  // 유산소 / 플라이오 / 전신
  'jumping-jack': { positions: ['feet together, arms down', 'feet wide, arms overhead'] },
  'side-step-jack': { positions: ['feet together, arms down', 'stepped out to one side, arms up (no jump)'] },
  'high-knees': { positions: ['running in place, right knee high', 'running in place, left knee high'] },
  'standing-knee-raise': { positions: ['standing, right knee lifted to waist height', 'standing, left knee lifted to waist height'] },
  'butt-kicks': { positions: ['jogging in place, right heel to glute', 'jogging in place, left heel to glute'] },
  skater: { positions: ['lateral bound landing on the right leg, left leg behind', 'lateral bound landing on the left leg, right leg behind'] },
  'lateral-bound': { positions: ['loaded on one leg before the bound', 'landed on the other leg, stabilized'] },
  burpee: { positions: ['standing tall', 'squat with hands on the floor', 'full plank position', 'jumping up, arms overhead'] },
  'walkout-plank': { positions: ['standing, hinging to place hands on the floor', 'hands walked out halfway', 'full plank position'] },
  'squat-thrust': { positions: ['standing', 'hands on the floor in a squat', 'feet kicked back to a plank (no jump)'] },
  'tuck-jump': { positions: ['loading in a quarter squat', 'airborne with knees tucked to the chest'] },
};

export function frameCount(id) {
  const m = MEDIA[id];
  if (!m) return 0;
  if (m.gif) return 1;
  return (m.positions && m.positions.length) || m.frames || 1;
}

export function frameUrls(id) {
  const m = MEDIA[id];
  if (!m) return null;
  if (m.gif) return [`${BASE}${id}.gif`];
  const n = frameCount(id);
  return n === 1 ? [`${BASE}${id}.${EXT}`] : Array.from({ length: n }, (_, i) => `${BASE}${id}-${i + 1}.${EXT}`);
}

export function stopMedia(container) {
  if (container && container._mediaTimer) { clearInterval(container._mediaTimer); container._mediaTimer = null; }
}

// 사진을 표시(없으면 SVG/이모지 폴백). animate=true면 다중 프레임을 순환(플립북).
export function renderExerciseMedia(container, item, { animate = false } = {}) {
  stopMedia(container);
  const id = (item && (item.exerciseId || item.id)) || null;
  const urls = id ? frameUrls(id) : null;
  if (!urls) { renderFigure(container, item && item.figure, item && item.emoji); return; }

  const img = document.createElement('img');
  img.className = 'ex-photo';
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.addEventListener('error', () => { stopMedia(container); renderFigure(container, item.figure, item.emoji); });
  img.src = urls[0];
  container.innerHTML = '';
  container.classList.add('has-photo');
  container.classList.remove('is-emoji');
  container.appendChild(img);

  const m = MEDIA[id];
  if (animate && urls.length > 1 && !m.gif) {
    let i = 0; const ms = m.ms || 650;
    container._mediaTimer = setInterval(() => { i = (i + 1) % urls.length; img.src = urls[i]; }, ms);
  }
}
