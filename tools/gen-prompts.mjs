// EXERCISES + MEDIA에서 운동 사진 생성용 프롬프트 문서를 만든다.
//   실행: node tools/gen-prompts.mjs  →  images/PROMPTS.md
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { EXERCISES } from '../js/data/exercises.js';
import { MEDIA, frameUrls } from '../js/data/media.js';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'images', 'PROMPTS.md');

const BASE = 'photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose';

const fname = (url) => url.split('/').pop();

let md = `# 운동 사진 생성 프롬프트 / Exercise image prompts

이 문서는 자동 생성됩니다(\`node tools/gen-prompts.mjs\`). 운동 일러스트(SVG)를 사진/움직이는 이미지로 바꾸기 위한 가이드입니다.

## 사용 방법
1. 아래 **공통 스타일**을 기준으로, 각 운동의 프레임별 프롬프트로 이미지를 생성하세요(ChatGPT/DALL·E, Midjourney, Stable Diffusion 등).
2. 생성한 이미지를 **\`images/exercises/\`** 폴더에 **정확한 파일명**으로 저장하고 커밋하세요.
3. 여러 프레임이 있는 운동(예: 버피)은 앱이 자동으로 순환 재생(플립북)해 움직임을 보여줍니다. 단일 애니메이션 GIF를 직접 만든 경우 \`<id>.gif\`로 저장하면 그대로 사용됩니다.
4. 아직 이미지가 없는 운동은 기존 SVG 일러스트로 자동 표시되므로, **하나씩 점진적으로 채워도 됩니다.**

## 일관성 팁
- 같은 인물로 보이게 하려면 동일한 시드/캐릭터 레퍼런스(또는 첫 이미지를 참조 이미지로)로 시리즈를 생성하세요.
- 정사각형(1:1) 또는 세로(3:4)로, 전신이 잘리지 않게. 배경은 단색에 가깝게.
- 파일 형식은 기본 \`.jpg\`(원하면 \`js/data/media.js\`의 \`EXT\`/프레임 수를 조정).

## 공통 스타일 (모든 프롬프트 앞에 공통 적용)
> ${BASE}.

---
`;

for (const ex of EXERCISES) {
  const m = MEDIA[ex.id];
  if (!m) continue;
  const urls = frameUrls(ex.id);
  const positions = m.positions || Array.from({ length: urls.length }, (_, i) => `position ${i + 1}`);
  md += `\n### ${ex.name.ko} (${ex.name.en}) — \`${ex.id}\`\n`;
  md += `${ex.desc.ko} / ${ex.desc.en}\n\n`;
  positions.forEach((pos, i) => {
    md += `- **${fname(urls[i])}** — \`${BASE}, ${pos}.\`\n`;
  });
}

md += `\n---\n_총 ${Object.keys(MEDIA).length}개 운동 / generated for ${Object.keys(MEDIA).length} exercises._\n`;

writeFileSync(OUT, md);
console.log('wrote images/PROMPTS.md for', Object.keys(MEDIA).length, 'exercises');
