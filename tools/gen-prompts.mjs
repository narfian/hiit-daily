// 운동/워밍업 사진 생성용 프롬프트 문서를 만든다.
//   실행: node tools/gen-prompts.mjs  →  images/PROMPTS.md, images/PROMPTS-warmup.md
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { EXERCISES } from '../js/data/exercises.js';
import { WARMUP_BLOCK } from '../js/data/routines.js';
import { MEDIA, frameUrls } from '../js/data/media.js';

const IMAGES = join(dirname(fileURLToPath(import.meta.url)), '..', 'images');
const BASE = 'photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose';
const fname = (url) => url.split('/').pop();

const USAGE = `## 사용 방법
1. 아래 **공통 스타일**을 기준으로 이미지를 생성하세요(ChatGPT/DALL·E, Midjourney, Stable Diffusion 등).
2. **\`images/exercises/\`** 폴더에 저장하고 커밋하세요. 확장자는 **png·jpg·webp·gif 모두 자동 인식**됩니다(ChatGPT는 png 출력).
   - **한 동작에 한 장만**: \`<id>.png\` 으로 저장 — 이것만으로 바로 표시됩니다.
   - **움직임(여러 컷)**: 아래 프레임별로 만들어 \`<id>-1.png\`, \`<id>-2.png\` … 로 저장하면 자동 순환(플립북).
   - **애니메이션 GIF**가 있으면 \`<id>.gif\` 로 저장하면 그대로 재생됩니다.
3. 아직 이미지가 없는 동작은 기존 이모지/SVG로 자동 표시되므로 **하나씩 점진적으로** 채워도 됩니다.
4. 단일 \`<id>.png\` 와 프레임 \`<id>-1.png\` 이 모두 있으면 **단일 이미지가 우선**합니다.

## 일관성 팁
- 같은 인물로 보이게 하려면 동일한 시드/캐릭터 레퍼런스(또는 첫 이미지를 참조 이미지로)로 시리즈를 생성하세요.
- **세로 3:4 비율(권장, 예: 1086×1448)**, 전신이 잘리지 않게. 배경은 단색에 가깝게. (앱이 타이머에서 3:4 세로 틀로 표시)
- 프레임 수·재생 속도는 \`js/data/media.js\`의 \`MEDIA\`/\`ms\`에서 조정.

## 공통 스타일 (모든 프롬프트 앞에 공통 적용)
> ${BASE}.

---
`;

function writeDoc(file, title, intro, items) {
  let md = `# ${title}\n\n${intro}\n\n${USAGE}`;
  let count = 0;
  for (const it of items) {
    const m = MEDIA[it.id];
    if (!m) continue;
    count += 1;
    const urls = frameUrls(it.id);
    const positions = m.positions || Array.from({ length: urls.length }, (_, i) => `position ${i + 1}`);
    md += `\n### ${it.name.ko} (${it.name.en}) — \`${it.id}\`\n`;
    md += `${it.desc.ko} / ${it.desc.en}\n\n`;
    positions.forEach((pos, i) => { md += `- **${fname(urls[i])}** — \`${BASE}, ${pos}.\`\n`; });
  }
  md += `\n---\n_총 ${count}개 동작 / ${count} items._\n`;
  writeFileSync(join(IMAGES, file), md);
  console.log(`wrote images/${file} for ${count} items`);
}

writeDoc('PROMPTS.md', '운동 사진 생성 프롬프트 / Exercise image prompts',
  '운동 동작(라이브러리) 이미지를 위한 프롬프트 모음입니다. 자동 생성: `node tools/gen-prompts.mjs`.', EXERCISES);

writeDoc('PROMPTS-warmup.md', '워밍업 사진 생성 프롬프트 / Warm-up image prompts',
  '워밍업 동작 이미지를 위한 프롬프트 모음입니다. 같은 트레이너로 가볍게 준비운동하는 자세를 만드세요. 파일은 운동 이미지와 같은 `images/exercises/` 폴더에 넣으면 됩니다.', WARMUP_BLOCK);
