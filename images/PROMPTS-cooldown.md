# 쿨다운 사진 생성 프롬프트 / Cool-down image prompts

쿨다운(스트레칭) 동작 이미지를 위한 프롬프트 모음입니다. 같은 트레이너로 차분한 정적 스트레칭 자세를 만드세요. 파일은 같은 `images/exercises/` 폴더에 넣으면 됩니다.

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

### 가벼운 제자리 걷기 (Easy March) — `cooldown-march`
심박을 천천히 낮추기 / Bring the heart rate down

- **cooldown-march.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, walking gently in place to cool down.`

### 허벅지 스트레칭 (Thigh Stretch) — `cooldown-thigh`
허벅지 앞쪽을 늘려주기 (좌우) / Stretch the front thighs (both)

- **cooldown-thigh.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing quad stretch, holding one foot behind the glute, knees together.`

### 종아리 스트레칭 (Calf Stretch) — `cooldown-calf`
벽을 밀며 종아리 늘리기 / Push the wall, stretch calves

- **cooldown-calf.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing calf stretch, hands on a wall, one leg straight back with the heel down.`

### 가슴 스트레칭 (Chest Stretch) — `cooldown-chest`
양손을 뒤로 깍지 껴 가슴 펴기 / Clasp hands behind, open the chest

- **cooldown-chest.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing chest stretch, hands clasped behind the back, chest open.`

### 어깨 스트레칭 (Shoulder Stretch) — `cooldown-shoulder`
팔을 가슴 앞으로 당겨 늘리기 / Pull an arm across the chest

- **cooldown-shoulder.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, standing shoulder stretch, one arm pulled across the chest.`

### 차일드 포즈 (Child’s Pose) — `cooldown-child-pose`
엎드려 등·허리 이완 / Kneel and relax the back

- **cooldown-child-pose.png** — `photorealistic full-body studio photograph of the same young female fitness trainer, mid-20s, athletic build, hair in a ponytail, wearing fitted athletic shorts over leggings and a fitted tank top (no brand logos, no text), neutral light-gray seamless background, soft even lighting, camera at a front three-quarter angle, the entire body fully in frame, clear exercise-demonstration pose, child pose, kneeling with arms extended forward and forehead near the floor.`

---
_총 6개 동작 / 6 items._
