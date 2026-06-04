# 워밍업 사진 생성 프롬프트 / Warm-up image prompts

워밍업 동작 이미지를 위한 프롬프트 모음입니다. 같은 트레이너로 가볍게 준비운동하는 자세를 만드세요. 파일은 운동 이미지와 같은 `images/exercises/` 폴더에 넣으면 됩니다.

## 사용 방법
1. 아래 **공통 스타일**을 기준으로 이미지를 생성하세요(ChatGPT/DALL·E, Midjourney, Stable Diffusion 등).
2. **`images/exercises/`** 폴더에 저장하고 커밋하세요. 확장자는 **png·jpg·webp·gif 모두 자동 인식**됩니다(ChatGPT는 png 출력).
   - **한 동작에 한 장만**: `<id>.png` 으로 저장 — 이것만으로 바로 표시됩니다.
   - **움직임(여러 컷)**: 아래 프레임별로 만들어 `<id>-1.png`, `<id>-2.png` … 로 저장하면 자동 순환(플립북).
   - **애니메이션 GIF**가 있으면 `<id>.gif` 로 저장하면 그대로 재생됩니다.
3. 아직 이미지가 없는 동작은 기존 이모지/SVG로 자동 표시되므로 **하나씩 점진적으로** 채워도 됩니다.
4. 단일 `<id>.png` 와 프레임 `<id>-1.png` 이 모두 있으면 **단일 이미지가 우선**합니다.

## 일관성 팁
- 같은 인물로 보이게 하려면 동일한 시드/캐릭터 레퍼런스(또는 첫 이미지를 참조 이미지로)로 시리즈를 생성하세요.
- **세로 3:4 비율(권장, 예: 1086×1448)**, 전신이 잘리지 않게. 배경은 단색에 가깝게. (앱이 타이머에서 3:4 세로 틀로 표시)
- 프레임 수·재생 속도는 `js/data/media.js`의 `MEDIA`/`ms`에서 조정.

## 공통 스타일 (모든 프롬프트 앞에 공통 적용)
> photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose.

---

### 제자리 걷기 (March in Place) — `warmup-march`
가볍게 제자리에서 걷기 / Walk lightly in place

- **warmup-march-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, marching in place, right knee lifted.`
- **warmup-march-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, marching in place, left knee lifted.`

### 가벼운 점핑잭 (Light Jumping Jacks) — `warmup-jacks`
낮은 강도로 천천히 / Easy, low effort

- **warmup-jacks-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, feet together, arms at the sides.`
- **warmup-jacks-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, feet wide, arms overhead, light effort.`

### 팔 돌리기 (Arm Circles) — `warmup-arm-circles`
양팔을 앞뒤로 크게 / Big circles forward and back

- **warmup-arm-circles-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, arms extended out to the sides, circling forward.`
- **warmup-arm-circles-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, arms extended, circling backward.`

### 다리 스윙 (Leg Swings) — `warmup-leg-swings`
앞뒤·좌우로 다리 흔들기 / Swing legs front-back, side-side

- **warmup-leg-swings-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing on one leg, the other leg swung forward.`
- **warmup-leg-swings-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, the same leg swung back.`

### 고관절 돌리기 (Hip Circles) — `warmup-hip-circles`
골반을 천천히 크게 / Circle the hips slowly

- **warmup-hip-circles-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, hands on hips, hips circled to one side.`
- **warmup-hip-circles-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, hands on hips, hips circled to the other side.`

### 맨몸 스쿼트 (Bodyweight Squats) — `warmup-squat`
가동범위 확인하며 천천히 / Slow, find your range

- **warmup-squat-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing tall, relaxed.`
- **warmup-squat-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, shallow bodyweight squat, finding range of motion.`

### 런지 비틀기 (Lunge with Twist) — `warmup-lunge-twist`
런지 자세에서 상체 회전 / Rotate the torso in a lunge

- **warmup-lunge-twist-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, in a lunge, torso facing forward.`
- **warmup-lunge-twist-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, in a lunge, torso rotated over the front thigh.`

### 인치웜 (Inchworm) — `warmup-inchworm`
손으로 걸어 플랭크까지 갔다 오기 / Walk hands out to plank and back

- **warmup-inchworm-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing, hinging forward to place hands on the floor.`
- **warmup-inchworm-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, hands walked out halfway.`
- **warmup-inchworm-3.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, full plank position.`

---
_총 8개 동작 / 8 items._
