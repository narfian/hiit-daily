// 미니멀 라인 일러스트(인라인 SVG, 별도 이미지 파일 없음).
// stroke="currentColor" 이므로 다크/라이트 테마에 자동 적응.
// 관절 좌표로 막대 인물을 조립해 일관된 스타일을 유지한다. viewBox 0..100.

function poly(pts) { return `<polyline points="${pts.map((p) => p[0] + ',' + p[1]).join(' ')}"/>`; }

// 관절: head, neck, hip, kneeL/footL, kneeR/footR, elL/haL, elR/haR (팔은 neck에서 출발)
function fig(j, o = {}) {
  const p = [];
  if (o.ground !== false) p.push(`<line class="gnd" x1="10" y1="90" x2="90" y2="90"/>`);
  if (o.extra) p.push(o.extra);
  if (j.neck && j.hip) p.push(poly([j.neck, j.hip]));
  if (j.hip && j.kneeL && j.footL) p.push(poly([j.hip, j.kneeL, j.footL]));
  if (j.hip && j.kneeR && j.footR) p.push(poly([j.hip, j.kneeR, j.footR]));
  if (j.neck && j.elL && j.haL) p.push(poly([j.neck, j.elL, j.haL]));
  if (j.neck && j.elR && j.haR) p.push(poly([j.neck, j.elR, j.haR]));
  if (j.head) p.push(`<circle cx="${j.head[0]}" cy="${j.head[1]}" r="6"/>`);
  return `<svg viewBox="0 0 100 100" class="figure" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${p.join('')}</svg>`;
}

function arrow(x1, y1, x2, y2) {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 5;
  const pt = (t) => [(x2 + h * Math.cos(a + t)).toFixed(1), (y2 + h * Math.sin(a + t)).toFixed(1)];
  const u = pt(2.6), v = pt(-2.6);
  return `<g class="arr"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><polyline points="${u[0]},${u[1]} ${x2},${y2} ${v[0]},${v[1]}"/></g>`;
}

const POSES = {
  // 하체
  squat: [{ head: [55, 30], neck: [52, 37], hip: [44, 60], kneeL: [60, 66], footL: [56, 88],
    kneeR: [60, 66], footR: [56, 88], elL: [56, 44], haL: [70, 42], elR: [56, 44], haR: [70, 42] },
    { extra: arrow(80, 44, 80, 62) }],
  'jump-squat': [{ head: [55, 19], neck: [52, 26], hip: [46, 46], kneeL: [60, 52], footL: [58, 70],
    kneeR: [60, 52], footR: [58, 70], elL: [50, 22], haL: [42, 12], elR: [54, 24], haR: [64, 14] },
    { extra: arrow(82, 56, 82, 32) }],
  lunge: [{ head: [44, 22], neck: [44, 29], hip: [46, 52], kneeL: [34, 66], footL: [30, 88],
    kneeR: [62, 70], footR: [78, 88], elL: [40, 40], haL: [38, 54], elR: [48, 40], haR: [50, 54] }, {}],
  'reverse-lunge': [{ head: [56, 22], neck: [56, 29], hip: [56, 52], kneeR: [66, 66], footR: [70, 88],
    kneeL: [40, 70], footL: [24, 88], elL: [52, 40], haL: [50, 54], elR: [60, 40], haR: [62, 54] }, {}],
  'wall-sit': [{ head: [40, 26], neck: [40, 33], hip: [40, 56], kneeL: [66, 56], footL: [66, 88],
    kneeR: [66, 58], footR: [70, 88], elL: [40, 44], haL: [40, 56], elR: [42, 44], haR: [44, 56] },
    { extra: `<line class="gnd" x1="34" y1="14" x2="34" y2="90"/>` }],
  'calf-raise': [{ head: [50, 18], neck: [50, 25], hip: [50, 50], kneeL: [46, 68], footL: [46, 84],
    kneeR: [54, 68], footR: [54, 84], elL: [44, 38], haL: [42, 52], elR: [56, 38], haR: [58, 52] },
    { extra: arrow(72, 80, 72, 64) }],
  'glute-bridge': [{ head: [22, 64], neck: [30, 62], hip: [54, 50], kneeL: [70, 56], footL: [78, 74],
    elL: [30, 70], haL: [34, 76] }, { ground: true, extra: arrow(54, 66, 54, 50) }],

  // 코어
  plank: [{ head: [20, 52], neck: [28, 54], hip: [60, 62], kneeR: [74, 66], footR: [88, 70],
    elL: [28, 66], haL: [28, 74] }, { ground: false, extra: `<line class="gnd" x1="10" y1="76" x2="92" y2="76"/>` }],
  'side-plank': [{ head: [20, 44], neck: [28, 48], hip: [60, 66], kneeR: [74, 74], footR: [88, 80],
    elL: [26, 66], haL: [26, 78], elR: [34, 36], haR: [38, 24] }, { ground: false, extra: `<line class="gnd" x1="10" y1="80" x2="92" y2="80"/>` }],
  'plank-shoulder-tap': [{ head: [20, 52], neck: [28, 54], hip: [60, 62], kneeR: [74, 66], footR: [88, 70],
    elL: [28, 66], haL: [28, 74], elR: [40, 56], haR: [44, 50] }, { ground: false, extra: `<line class="gnd" x1="10" y1="76" x2="92" y2="76"/>` }],
  'mountain-climber': [{ head: [20, 50], neck: [28, 52], hip: [60, 60], kneeR: [70, 70], footR: [80, 78],
    kneeL: [50, 60], footL: [44, 52], elL: [28, 64], haL: [28, 74] }, { ground: false, extra: `<line class="gnd" x1="10" y1="76" x2="92" y2="76"/>` }],
  'dead-bug': [{ head: [22, 60], neck: [30, 60], hip: [60, 60], kneeL: [70, 46], footL: [80, 40],
    elR: [40, 46], haR: [46, 38] }, { ground: false, extra: `<line class="gnd" x1="10" y1="70" x2="92" y2="70"/>` }],
  'bicycle-crunch': [{ head: [26, 54], neck: [34, 56], hip: [58, 60], kneeL: [70, 50], footL: [80, 46],
    kneeR: [60, 70], footR: [66, 82], elR: [44, 48], haR: [54, 48] }, { ground: false, extra: `<line class="gnd" x1="10" y1="72" x2="92" y2="72"/>` }],
  'hollow-hold': [{ head: [22, 56], neck: [30, 56], hip: [56, 60], kneeR: [72, 52], footR: [86, 46],
    elL: [30, 46], haL: [34, 38] }, { ground: false, extra: `<line class="gnd" x1="10" y1="72" x2="92" y2="72"/>` }],
  superman: [{ head: [20, 54], neck: [28, 56], hip: [60, 60], kneeR: [74, 56], footR: [88, 50],
    elL: [24, 46], haL: [16, 40] }, { ground: false, extra: `<line class="gnd" x1="10" y1="72" x2="92" y2="72"/>` }],
  'bird-dog': [{ head: [22, 48], neck: [30, 50], hip: [58, 56], kneeR: [72, 68], footR: [86, 76],
    kneeL: [58, 70], footL: [58, 82], elL: [30, 64], haL: [16, 44] }, { ground: false, extra: `<line class="gnd" x1="10" y1="84" x2="92" y2="84"/>` }],

  // 상체
  pushup: [{ head: [18, 50], neck: [27, 52], hip: [58, 58], kneeR: [72, 61], footR: [86, 64],
    elL: [27, 64], haL: [27, 74] }, { ground: false, extra: `<line class="gnd" x1="10" y1="76" x2="92" y2="76"/>` + arrow(44, 40, 44, 52) }],
  'incline-pushup': [{ head: [22, 44], neck: [30, 47], hip: [58, 60], kneeR: [72, 66], footR: [86, 72],
    elL: [30, 58], haL: [34, 66] }, { ground: false, extra: `<line class="gnd" x1="28" y1="66" x2="92" y2="66"/>` }],
  'pike-pushup': [{ head: [30, 64], neck: [36, 58], hip: [52, 36], kneeR: [66, 56], footR: [78, 74],
    elL: [34, 70], haL: [34, 78] }, { ground: false, extra: `<line class="gnd" x1="10" y1="80" x2="92" y2="80"/>` }],
  'chair-dip': [{ head: [50, 26], neck: [50, 34], hip: [50, 58], kneeL: [66, 62], footL: [70, 84],
    elL: [40, 48], haL: [38, 60], elR: [42, 48], haR: [40, 60] }, { extra: `<line class="gnd" x1="30" y1="60" x2="44" y2="60"/>` + arrow(74, 50, 74, 64) }],
  'walkout-plank': [{ head: [24, 54], neck: [32, 56], hip: [58, 56], kneeR: [70, 66], footR: [82, 78],
    elL: [32, 66], haL: [30, 76] }, { ground: false, extra: `<line class="gnd" x1="10" y1="80" x2="92" y2="80"/>` + arrow(40, 44, 26, 50) }],

  // 유산소 / 플라이오
  'jumping-jack': [{ head: [50, 16], neck: [50, 23], hip: [50, 48], kneeL: [40, 64], footL: [32, 84],
    kneeR: [60, 64], footR: [68, 84], elL: [40, 16], haL: [30, 8], elR: [60, 16], haR: [70, 8] }, {}],
  'side-step-jack': [{ head: [50, 18], neck: [50, 25], hip: [50, 50], kneeL: [40, 66], footL: [30, 86],
    kneeR: [58, 64], footR: [66, 86], elL: [42, 22], haL: [32, 14], elR: [58, 30], haR: [66, 40] },
    { extra: arrow(74, 60, 84, 60) }],
  'high-knees': [{ head: [50, 18], neck: [50, 25], hip: [50, 50], kneeL: [56, 46], footL: [60, 56],
    kneeR: [50, 70], footR: [50, 86], elL: [44, 36], haL: [40, 28], elR: [56, 38], haR: [60, 48] }, {}],
  'standing-knee-raise': [{ head: [50, 20], neck: [50, 27], hip: [50, 52], kneeL: [58, 52], footL: [64, 62],
    kneeR: [50, 72], footR: [50, 88], elL: [44, 40], haL: [42, 52], elR: [56, 40], haR: [58, 52] }, {}],
  skater: [{ head: [38, 24], neck: [40, 31], hip: [46, 52], kneeL: [38, 66], footL: [30, 84],
    kneeR: [60, 64], footR: [74, 78], elL: [44, 42], haL: [56, 44], elR: [36, 42], haR: [24, 48] },
    { extra: arrow(70, 60, 82, 56) }],
  burpee: [{ head: [22, 56], neck: [30, 58], hip: [58, 62], kneeR: [70, 68], footR: [82, 74],
    elL: [30, 68], haL: [30, 76] }, { ground: false, extra: `<line class="gnd" x1="10" y1="78" x2="92" y2="78"/>` + arrow(46, 44, 46, 30) }],
  'butt-kicks': [{ head: [50, 18], neck: [50, 25], hip: [50, 50], kneeL: [50, 68], footL: [40, 60],
    kneeR: [52, 70], footR: [52, 86], elL: [44, 36], haL: [40, 46], elR: [56, 38], haR: [60, 48] }, {}],
  'tuck-jump': [{ head: [50, 16], neck: [50, 23], hip: [50, 42], kneeL: [40, 44], footL: [34, 56],
    kneeR: [60, 44], footR: [66, 56], elL: [42, 18], haL: [34, 12], elR: [58, 18], haR: [66, 12] },
    { extra: arrow(78, 60, 78, 38) }],
};

export const FIGURES = {};
for (const [id, [j, o]] of Object.entries(POSES)) FIGURES[id] = fig(j, o);

// 컨테이너에 일러스트를 렌더(없으면 emoji 폴백). innerHTML은 신뢰된 자체 콘텐츠.
export function renderFigure(container, id, emoji = '') {
  const svg = id && FIGURES[id];
  if (svg) { container.innerHTML = svg; container.classList.add('has-fig'); container.classList.remove('is-emoji', 'has-photo'); }
  else { container.innerHTML = ''; container.textContent = emoji || ''; container.classList.add('is-emoji'); container.classList.remove('has-fig', 'has-photo'); }
}

export function hasFigure(id) { return !!(id && FIGURES[id]); }
