// 운동 사진/GIF 미디어 레이어 (점진적 향상).
// 사진을 둘 운동만 MEDIA에 선언한다. 없는 운동은 자동으로 SVG 일러스트로 폴백한다.
// 파일 규칙(images/exercises/): 프레임 1개 → "<id>.jpg", 여러 개 → "<id>-1.jpg"...; 또는 "<id>.gif".
// positions(영문)는 tools/gen-prompts.mjs가 생성 프롬프트를 만드는 데 쓰인다. 프레임 수 = positions.length.
import { renderFigure } from './figures.js';

const BASE = 'images/exercises/';
const PRIMARY_EXT = 'png';                          // 프롬프트 문서에서 제안하는 기본 확장자(ChatGPT는 png 출력)
const OTHER_EXTS = ['jpg', 'jpeg', 'webp'];          // png 다음으로 시도할 확장자

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

  // ── 워밍업 ──
  'warmup-march': { positions: ['marching in place, right knee lifted', 'marching in place, left knee lifted'] },
  'warmup-jacks': { positions: ['feet together, arms at the sides', 'feet wide, arms overhead, light effort'] },
  'warmup-arm-circles': { positions: ['arms extended out to the sides, circling forward', 'arms extended, circling backward'] },
  'warmup-leg-swings': { positions: ['standing on one leg, the other leg swung forward', 'the same leg swung back'] },
  'warmup-hip-circles': { positions: ['hands on hips, hips circled to one side', 'hands on hips, hips circled to the other side'] },
  'warmup-squat': { positions: ['standing tall, relaxed', 'shallow bodyweight squat, finding range of motion'] },
  'warmup-lunge-twist': { positions: ['in a lunge, torso facing forward', 'in a lunge, torso rotated over the front thigh'] },
  'warmup-inchworm': { positions: ['standing, hinging forward to place hands on the floor', 'hands walked out halfway', 'full plank position'] },

  // ── 쿨다운(스트레칭, 정적 1컷) ──
  'cooldown-march': { positions: ['walking gently in place to cool down'] },
  'cooldown-thigh': { positions: ['standing quad stretch, holding one foot behind the glute, knees together'] },
  'cooldown-calf': { positions: ['standing calf stretch, hands on a wall, one leg straight back with the heel down'] },
  'cooldown-chest': { positions: ['standing chest stretch, hands clasped behind the back, chest open'] },
  'cooldown-shoulder': { positions: ['standing shoulder stretch, one arm pulled across the chest'] },
  'cooldown-child-pose': { positions: ['child pose, kneeling with arms extended forward and forehead near the floor'] },
};

export function frameCount(id) {
  const m = MEDIA[id];
  if (!m) return 0;
  if (m.gif) return 1;
  return (m.positions && m.positions.length) || m.frames || 1;
}

// 프롬프트 문서가 제안하는 파일명(기본 확장자). 실제 로드는 여러 확장자를 자동 인식한다.
export function frameUrls(id) {
  const m = MEDIA[id];
  if (!m) return null;
  if (m.gif) return [`${BASE}${id}.gif`];
  const n = frameCount(id);
  return n === 1 ? [`${BASE}${id}.${PRIMARY_EXT}`] : Array.from({ length: n }, (_, i) => `${BASE}${id}-${i + 1}.${PRIMARY_EXT}`);
}

export function stopMedia(container) {
  if (container && container._mediaTimer) { clearInterval(container._mediaTimer); container._mediaTimer = null; }
}

// 사진을 표시(없으면 SVG/이모지 폴백). 확장자(png/jpg/webp/gif) 자동 인식.
// 우선순위: 단일 이미지 "<id>.{gif,png,...}"(있으면 그것만; gif는 자체 애니메이션)
//          → 다중 프레임 스틸 "<id>-1.{ext}"…(animate면 플립북) → SVG.
export function renderExerciseMedia(container, item, { animate = false } = {}) {
  stopMedia(container);
  const id = (item && (item.exerciseId || item.id)) || null;
  const m = id && MEDIA[id];
  if (!m) { renderFigure(container, item && item.figure, item && item.emoji); return; }

  const n = frameCount(id);
  // png 우선(단일 → 프레임1), 그다음 gif/기타 확장자 — 흔한 경우를 1~2번 요청 안에 맞춘다.
  const candidates = [`${BASE}${id}.png`];
  if (n > 1) candidates.push(`${BASE}${id}-1.png`);
  candidates.push(`${BASE}${id}.gif`);
  for (const e of OTHER_EXTS) candidates.push(`${BASE}${id}.${e}`);
  if (n > 1) for (const e of OTHER_EXTS) candidates.push(`${BASE}${id}-1.${e}`);

  const img = document.createElement('img');
  img.className = 'ex-photo';
  img.alt = '';
  img.loading = 'lazy';
  img.decoding = 'async';
  container.innerHTML = '';
  container.classList.add('has-photo');
  container.classList.remove('is-emoji');
  container.appendChild(img);

  let idx = 0, resolved = false;
  img.addEventListener('error', () => {
    if (resolved) return;                 // 해결 후의 에러(애니메이션 프레임)는 무시
    idx += 1;
    if (idx < candidates.length) img.src = candidates[idx];
    else { stopMedia(container); renderFigure(container, item.figure, item.emoji); } // 전부 없으면 SVG
  });
  img.addEventListener('load', () => {
    if (resolved) return;
    resolved = true;
    // 프레임1로 해결됐고 animate면 플립북 시작(단일 이미지/gif면 그대로 표시)
    const url = candidates[idx];
    if (animate && n > 1 && url.includes(`${id}-1.`)) {
      startFlipbook(container, img, id, n, url.split('.').pop(), m.ms || 650);
    }
  });
  img.src = candidates[0];
}

// 다중 프레임을 미리 로드해 존재하는 프레임만 순환(404 프레임으로 src를 바꾸지 않음).
function startFlipbook(container, img, id, n, ext, ms) {
  const slots = new Array(n).fill(null);
  slots[0] = `${BASE}${id}-1.${ext}`;
  for (let i = 2; i <= n; i += 1) {
    const url = `${BASE}${id}-${i}.${ext}`;
    const pre = document.createElement('img');
    pre.addEventListener('load', () => { slots[i - 1] = url; });
    pre.src = url;
  }
  let k = 0;
  container._mediaTimer = setInterval(() => {
    for (let step = 1; step <= n; step += 1) {
      const j = (k + step) % n;
      if (slots[j]) { k = j; img.src = slots[j]; break; }
    }
  }, ms);
}
