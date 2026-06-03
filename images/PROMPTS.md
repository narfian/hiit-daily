# 운동 사진 생성 프롬프트 / Exercise image prompts

이 문서는 자동 생성됩니다(`node tools/gen-prompts.mjs`). 운동 일러스트(SVG)를 사진/움직이는 이미지로 바꾸기 위한 가이드입니다.

## 사용 방법
1. 아래 **공통 스타일**을 기준으로 이미지를 생성하세요(ChatGPT/DALL·E, Midjourney, Stable Diffusion 등).
2. **`images/exercises/`** 폴더에 저장하고 커밋하세요. 확장자는 **png·jpg·webp·gif 모두 자동 인식**됩니다(ChatGPT는 png 출력).
   - **한 운동에 한 장만**: `<id>.png` 으로 저장(예: `squat.png`) — 이것만으로 바로 표시됩니다.
   - **움직임(여러 동작)**: 아래 프레임별로 만들어 `<id>-1.png`, `<id>-2.png` … 로 저장하면 자동 순환(플립북).
   - **애니메이션 GIF**가 있으면 `<id>.gif` 로 저장하면 그대로 재생됩니다.
3. 아직 이미지가 없는 운동은 기존 SVG 일러스트로 자동 표시되므로 **하나씩 점진적으로** 채워도 됩니다.
4. 단일 `<id>.png` 와 프레임 `<id>-1.png` 이 모두 있으면 **단일 이미지가 우선**합니다.

## 일관성 팁
- 같은 인물로 보이게 하려면 동일한 시드/캐릭터 레퍼런스(또는 첫 이미지를 참조 이미지로)로 시리즈를 생성하세요.
- 정사각형(1:1) 또는 세로(3:4)로, 전신이 잘리지 않게. 배경은 단색에 가깝게.
- 파일 형식은 **png·jpg·webp·gif** 자동 인식(권장: png). 프레임 수·재생 속도는 `js/data/media.js`의 `MEDIA`/`ms`에서 조정.

## 공통 스타일 (모든 프롬프트 앞에 공통 적용)
> photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose.

---

### 스쿼트 (Squat) — `squat`
엉덩이를 뒤로 빼며 앉았다 일어나기 / Sit hips back, then stand up

- **squat-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing tall, feet shoulder-width.`
- **squat-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, bottom of the squat, thighs parallel, hips back.`

### 점프 스쿼트 (Jump Squat) — `jump-squat`
스쿼트 후 위로 폭발적으로 점프 / Squat, then jump up explosively

- **jump-squat-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, quarter-squat loading.`
- **jump-squat-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, deep squat, arms swung back.`
- **jump-squat-3.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, airborne, legs extended.`

### 런지 (Lunge) — `lunge`
한 발 앞으로 내디뎌 무릎을 90도로 / Step forward, both knees to 90°

- **lunge-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing, about to step forward.`
- **lunge-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, deep lunge, both knees about 90 degrees.`

### 리버스 런지 (Reverse Lunge) — `reverse-lunge`
다리를 뒤로 빼며 앉기 (무릎 부담 적음) / Step back into a lunge (knee-friendly)

- **reverse-lunge-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing tall.`
- **reverse-lunge-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, deep reverse lunge, back knee toward the floor.`

### 점프 런지 (Jump Lunge) — `jump-lunge`
런지 자세에서 점프로 다리 교체 / Switch legs with a jump from a lunge

- **jump-lunge-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lunge, right leg forward.`
- **jump-lunge-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, airborne switching legs.`
- **jump-lunge-3.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lunge, left leg forward.`

### 불가리안 스플릿 스쿼트 (Bulgarian Split Squat) — `bulgarian-split-squat`
뒷발을 의자에 올리고 한 다리 스쿼트 / Rear foot on a chair, single-leg squat

- **bulgarian-split-squat-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing, rear foot resting on a chair behind.`
- **bulgarian-split-squat-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, bottom of the split squat, front thigh parallel.`

### 커시 런지 (Curtsy Lunge) — `curtsy-lunge`
뒤·옆 대각선으로 교차해 내려가기 / Cross one leg diagonally behind

- **curtsy-lunge-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing tall.`
- **curtsy-lunge-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, curtsy lunge, one leg crossed diagonally behind.`

### 월 싯 (Wall Sit) — `wall-sit`
벽에 등을 대고 허벅지 수평으로 버티기 / Hold a seated position against a wall

- **wall-sit.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, wall sit hold, back flat against the wall, thighs parallel.`

### 카프 레이즈 (Calf Raise) — `calf-raise`
발뒤꿈치를 들었다 천천히 내리기 / Raise and slowly lower your heels

- **calf-raise-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing flat-footed.`
- **calf-raise-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, up on the balls of the feet, heels high.`

### 글루트 브릿지 (Glute Bridge) — `glute-bridge`
누워서 엉덩이를 들어올렸다 내리기 / Lie down, lift and lower your hips

- **glute-bridge-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lying on back, knees bent, hips down.`
- **glute-bridge-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, hips lifted into a bridge, glutes squeezed.`

### 한 다리 글루트 브릿지 (Single-leg Glute Bridge) — `single-leg-glute-bridge`
한 다리를 뻗은 채 엉덩이 들기 / Bridge with one leg extended

- **single-leg-glute-bridge-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lying on back, one leg extended, hips down.`
- **single-leg-glute-bridge-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, hips lifted, one leg extended in line.`

### 브로드 점프 (Broad Jump) — `broad-jump`
앞으로 멀리 점프 후 부드럽게 착지 / Jump forward, land softly

- **broad-jump-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, loading squat, arms swung back.`
- **broad-jump-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, airborne, broad jump forward.`
- **broad-jump-3.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, soft landing in a squat.`

### 푸시업 (Push-up) — `pushup`
몸을 일자로, 가슴이 바닥 가까이 / Body in a line, chest toward the floor

- **pushup-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, top of a push-up, arms extended, body straight.`
- **pushup-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, bottom of a push-up, chest near the floor.`

### 인클라인 푸시업 (Incline Push-up) — `incline-pushup`
손을 의자·벽에 올려 쉬운 푸시업 / Hands on a chair/wall — easier push-up

- **incline-pushup-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, top of an incline push-up, hands on a bench.`
- **incline-pushup-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, bottom, chest near the bench.`

### 디클라인 푸시업 (Decline Push-up) — `decline-pushup`
발을 의자에 올려 강도 높인 푸시업 / Feet elevated — harder push-up

- **decline-pushup-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, top of a decline push-up, feet on a bench.`
- **decline-pushup-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, bottom, chest near the floor.`

### 다이아몬드 푸시업 (Diamond Push-up) — `diamond-pushup`
양손을 모아 삼두 집중 푸시업 / Hands together — triceps-focused

- **diamond-pushup-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, top of a diamond push-up, hands together.`
- **diamond-pushup-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, bottom, elbows tucked close to the body.`

### 파이크 푸시업 (Pike Push-up) — `pike-pushup`
엉덩이를 높이 들고 머리를 바닥으로 / Hips high, lower the head to the floor

- **pike-pushup-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, pike position, hips high in an inverted V.`
- **pike-pushup-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, bottom, head lowered toward the floor.`

### 의자 트라이셉 딥 (Chair Tricep Dip) — `chair-dip`
의자를 잡고 팔을 굽혔다 펴기 / Bend and straighten arms using a chair

- **chair-dip-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, top of a triceps dip, arms extended on a chair.`
- **chair-dip-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, bottom, elbows bent about 90 degrees.`

### 플랭크 업다운 (Plank Up-down) — `plank-updown`
팔꿈치↔손 번갈아 오르내리기 / Alternate forearm ↔ hand plank

- **plank-updown-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, forearm plank.`
- **plank-updown-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, high plank on the hands.`

### 플랭크 (Plank) — `plank`
복부에 힘을 주고 자세를 버티기 / Brace your core and hold

- **plank.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, forearm plank hold, body in one straight line.`

### 사이드 플랭크 (Side Plank) — `side-plank`
옆으로 누워 몸을 일직선으로 (좌우 교대) / Hold a side plank, switch sides

- **side-plank.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, side plank hold, hips high, top arm reaching up.`

### 플랭크 숄더탭 (Plank Shoulder Tap) — `plank-shoulder-tap`
플랭크에서 좌우 어깨를 번갈아 터치 / In plank, tap opposite shoulders

- **plank-shoulder-tap-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, high plank, both hands down.`
- **plank-shoulder-tap-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, high plank, tapping the opposite shoulder.`

### 마운틴 클라이머 (Mountain Climber) — `mountain-climber`
플랭크 자세에서 무릎을 번갈아 당기기 / In plank, drive knees in alternately

- **mountain-climber-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, high plank, right knee driven to chest.`
- **mountain-climber-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, high plank, left knee driven to chest.`

### 바이시클 크런치 (Bicycle Crunch) — `bicycle-crunch`
반대쪽 팔꿈치와 무릎을 번갈아 / Opposite elbow to knee, alternating

- **bicycle-crunch-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lying, right elbow toward left knee.`
- **bicycle-crunch-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lying, left elbow toward right knee.`

### 플러터 킥 (Flutter Kick) — `flutter-kick`
누워서 다리를 교차로 빠르게 차기 / Lie down, flutter legs up and down

- **flutter-kick-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lying on back, legs low, right leg up.`
- **flutter-kick-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, legs switched, left leg up.`

### 데드버그 (Dead Bug) — `dead-bug`
누워서 반대쪽 팔다리를 번갈아 내리기 / Lower opposite arm and leg, alternating

- **dead-bug-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lying on back, right arm and left leg extended.`
- **dead-bug-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, left arm and right leg extended.`

### 할로우 홀드 (Hollow Hold) — `hollow-hold`
어깨·다리를 들어 바나나 자세 유지 / Lift shoulders and legs into a banana shape

- **hollow-hold.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, hollow hold, shoulders and legs lifted into a banana shape.`

### 슈퍼맨 (Superman) — `superman`
엎드려 팔다리를 동시에 들어올리기 / Lie face down, lift arms and legs

- **superman-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lying face down, relaxed.`
- **superman-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, superman, arms and legs lifted off the floor.`

### 버드독 (Bird Dog) — `bird-dog`
네발 자세에서 반대쪽 팔다리 뻗기 / On all fours, extend opposite arm and leg

- **bird-dog-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, on all fours, neutral spine.`
- **bird-dog-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, bird dog, opposite arm and leg extended.`

### 점핑잭 (Jumping Jack) — `jumping-jack`
팔다리를 벌리며 가볍게 점프 / Jump arms and legs out and in

- **jumping-jack-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, feet together, arms down.`
- **jumping-jack-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, feet wide, arms overhead.`

### 사이드 스텝잭 (Side Step Jack) — `side-step-jack`
점프 없이 좌우로 스텝하며 팔 올리기 / Step side to side, raise arms, no jump

- **side-step-jack-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, feet together, arms down.`
- **side-step-jack-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, stepped out to one side, arms up (no jump).`

### 하이 니 (High Knees) — `high-knees`
무릎을 골반 높이로 올리며 제자리 뛰기 / Run in place, knees to hip height

- **high-knees-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, running in place, right knee high.`
- **high-knees-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, running in place, left knee high.`

### 제자리 무릎 올리기 (Standing Knee Raise) — `standing-knee-raise`
제자리에서 무릎을 번갈아 올리기(저소음) / March in place, lift knees (low-noise)

- **standing-knee-raise-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing, right knee lifted to waist height.`
- **standing-knee-raise-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing, left knee lifted to waist height.`

### 버트 킥 (Butt Kicks) — `butt-kicks`
발뒤꿈치로 엉덩이를 차며 제자리 뛰기 / Run in place, heels to glutes

- **butt-kicks-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, jogging in place, right heel to glute.`
- **butt-kicks-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, jogging in place, left heel to glute.`

### 스케이터 (Skater) — `skater`
좌우로 크게 뛰며 무게 옮기기 / Bound side to side, shifting weight

- **skater-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lateral bound landing on the right leg, left leg behind.`
- **skater-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, lateral bound landing on the left leg, right leg behind.`

### 래터럴 바운드 (Lateral Bound) — `lateral-bound`
옆으로 멀리 점프해 한 발 착지·정지 / Jump laterally, stick the landing

- **lateral-bound-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, loaded on one leg before the bound.`
- **lateral-bound-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, landed on the other leg, stabilized.`

### 버피 (Burpee) — `burpee`
스쿼트→플랭크→(푸시업)→점프로 연결 / Squat, kick to plank, (push-up), jump up

- **burpee-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing tall.`
- **burpee-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, squat with hands on the floor.`
- **burpee-3.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, full plank position.`
- **burpee-4.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, jumping up, arms overhead.`

### 워크아웃 플랭크 (Walk-out Plank) — `walkout-plank`
손으로 걸어 나가 플랭크, 다시 돌아오기 / Walk hands out to a plank and back

- **walkout-plank-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing, hinging to place hands on the floor.`
- **walkout-plank-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, hands walked out halfway.`
- **walkout-plank-3.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, full plank position.`

### 스쿼트 스러스트 (Squat Thrust) — `squat-thrust`
버피에서 점프를 뺀 저소음 버전 / Burpee without the jump (low-noise)

- **squat-thrust-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing.`
- **squat-thrust-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, hands on the floor in a squat.`
- **squat-thrust-3.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, feet kicked back to a plank (no jump).`

### 턱 점프 (Tuck Jump) — `tuck-jump`
제자리에서 무릎을 가슴으로 당겨 점프 / Jump and pull knees to chest

- **tuck-jump-1.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, loading in a quarter squat.`
- **tuck-jump-2.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, airborne with knees tucked to the chest.`

---
_총 40개 운동 / generated for 40 exercises._
