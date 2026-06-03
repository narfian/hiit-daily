// 의존성 없는 아이콘 생성기. Node 내장 zlib만 사용(오프라인 동작).
// icon.svg의 디자인(다크 라운드 배경 + 번개)을 픽셀로 직접 그려 PNG로 인코딩한다.
//   실행: node tools/gen-icons.mjs
import zlib from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'icons');

const lerp = (a, b, t) => a + (b - a) * t;
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const BG_TOP = hex('#1e293b'), BG_BOT = hex('#0b1220');
const BOLT_A = hex('#818cf8'), BOLT_B = hex('#ec4899');

// 번개 폴리곤(viewBox 512 기준) → 0..1 정규화
const BOLT = [[300, 92], [160, 286], [238, 286], [208, 420], [360, 214], [276, 214]].map(([x, y]) => [x / 512, y / 512]);

function pointInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
    if (((yi > py) !== (yj > py)) && (px < ((xj - xi) * (py - yi)) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}

function insideRoundedRect(x, y, w, h, r) {
  const cx = Math.min(Math.max(x, r), w - r);
  const cy = Math.min(Math.max(y, r), h - r);
  const dx = x - cx, dy = y - cy;
  return dx * dx + dy * dy <= r * r || (x >= r && x <= w - r) || (y >= r && y <= h - r);
}

function render(size, { maskable = false, opaque = false } = {}) {
  const SS = 2, N = size * SS;
  const hi = new Float32Array(N * N * 4);
  const radius = (maskable || opaque) ? 0 : 0.22 * N; // 'any'만 둥근 모서리(투명)
  const boltScale = maskable ? 0.78 : 1.0;             // 마스커블은 안전영역으로 축소
  const cx = N / 2, cy = N / 2;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const i = (y * N + x) * 4;
      if (radius > 0 && !insideRoundedRect(x, y, N, N, radius)) { hi[i + 3] = 0; continue; }
      const t = y / N;
      let r = lerp(BG_TOP[0], BG_BOT[0], t), g = lerp(BG_TOP[1], BG_BOT[1], t), b = lerp(BG_TOP[2], BG_BOT[2], t);
      const bx = (x - cx) / boltScale + cx, by = (y - cy) / boltScale + cy;
      if (pointInPoly(bx / N, by / N, BOLT)) {
        const d = ((bx / N) + (by / N)) / 2;
        r = lerp(BOLT_A[0], BOLT_B[0], d); g = lerp(BOLT_A[1], BOLT_B[1], d); b = lerp(BOLT_A[2], BOLT_B[2], d);
      }
      hi[i] = r; hi[i + 1] = g; hi[i + 2] = b; hi[i + 3] = 255;
    }
  }
  // SS 다운샘플(안티앨리어싱)
  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let r = 0, g = 0, b = 0, a = 0;
    for (let dy = 0; dy < SS; dy++) for (let dx = 0; dx < SS; dx++) {
      const i = (((y * SS + dy) * N) + (x * SS + dx)) * 4;
      r += hi[i]; g += hi[i + 1]; b += hi[i + 2]; a += hi[i + 3];
    }
    const n = SS * SS, o = (y * size + x) * 4;
    out[o] = Math.round(r / n); out[o + 1] = Math.round(g / n); out[o + 2] = Math.round(b / n); out[o + 3] = Math.round(a / n);
  }
  return out;
}

// ── PNG 인코딩 ──
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; }
  return t;
})();
function crc32(buf) { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}
function encodePNG(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) { raw[y * (stride + 1)] = 0; rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride); }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0)),
  ]);
}

function save(name, size, opts) { writeFileSync(join(OUT, name), encodePNG(size, size, render(size, opts))); console.log('wrote', name); }

save('icon-192.png', 192, {});
save('icon-512.png', 512, {});
save('icon-maskable-512.png', 512, { maskable: true });
save('apple-touch-icon.png', 180, { opaque: true });
console.log('done');
