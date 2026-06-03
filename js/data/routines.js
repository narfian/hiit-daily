// 추천(프리셋) 루틴, 난이도 프리셋, 워밍업/쿨다운 블록.
// 루틴은 라이브러리를 id로 참조한다. work/rest/rounds는 전역 기본값이며
// item.work / item.rest로 개별 오버라이드할 수 있다.

export const DIFFICULTIES = {
  beginner:     { work: 30, rest: 30, rounds: 3 },
  intermediate: { work: 40, rest: 20, rounds: 4 },
  advanced:     { work: 45, rest: 15, rounds: 5 },
};

export const PRESET_ROUTINES = [
  {
    id: 'default-main', custom: false,
    name: { ko: '기본 루틴', en: 'Default Routine' },
    desc: { ko: '온몸을 골고루 쓰는 5가지 기본 동작', en: 'Five staple moves for the whole body' },
    work: 40, rest: 20, rounds: 4,
    items: [
      { exerciseId: 'squat' },
      { exerciseId: 'pushup' },
      { exerciseId: 'mountain-climber' },
      { exerciseId: 'lunge' },
      { exerciseId: 'plank' },
    ],
  },
  {
    id: 'quiet-focus', custom: false,
    name: { ko: '저소음 집중', en: 'Quiet Focus' },
    desc: { ko: '점프 없이 조용하게, 코어와 하체 위주', en: 'No jumping — quiet core and lower-body work' },
    work: 40, rest: 20, rounds: 4,
    items: [
      { exerciseId: 'glute-bridge' },
      { exerciseId: 'bird-dog' },
      { exerciseId: 'reverse-lunge' },
      { exerciseId: 'side-plank' },
      { exerciseId: 'dead-bug' },
    ],
  },
  {
    id: 'fullbody-burner', custom: false,
    name: { ko: '전신 버너', en: 'Full-body Burner' },
    desc: { ko: '점프 포함 고강도. 저소음 모드로 대체 가능', en: 'High-intensity with jumps. Low-noise mode can swap them' },
    work: 40, rest: 20, rounds: 4,
    items: [
      { exerciseId: 'jumping-jack' },
      { exerciseId: 'burpee' },
      { exerciseId: 'jump-squat' },
      { exerciseId: 'high-knees' },
      { exerciseId: 'plank' },
    ],
  },
];

// 워밍업/쿨다운 블록 — 라이브러리와 분리(빌더에서 선택 대상 아님).
// 각 항목은 자체 name/desc/emoji/seconds를 가진다.
export const WARMUP_BLOCK = [
  { emoji: '🚶', seconds: 60, name: { ko: '제자리 걷기', en: 'March in Place' },
    desc: { ko: '가볍게 제자리에서 걷기', en: 'Walk lightly in place' } },
  { emoji: '🙆', seconds: 60, name: { ko: '팔 돌리기', en: 'Arm Circles' },
    desc: { ko: '양팔을 크게 앞뒤로 돌리기', en: 'Circle your arms forward and back' } },
  { emoji: '🔄', seconds: 60, name: { ko: '고관절 돌리기', en: 'Hip Circles' },
    desc: { ko: '골반을 천천히 크게 돌리기', en: 'Circle your hips slowly' } },
];

export const COOLDOWN_BLOCK = [
  { emoji: '🦵', seconds: 40, name: { ko: '허벅지 스트레칭', en: 'Thigh Stretch' },
    desc: { ko: '허벅지 앞쪽을 천천히 늘려주기 (좌우)', en: 'Stretch the front of your thighs (both)' } },
  { emoji: '🦶', seconds: 40, name: { ko: '종아리 스트레칭', en: 'Calf Stretch' },
    desc: { ko: '벽을 밀며 종아리를 늘려주기', en: 'Push the wall and stretch your calves' } },
  { emoji: '🫁', seconds: 40, name: { ko: '가슴 스트레칭', en: 'Chest Stretch' },
    desc: { ko: '양손을 뒤로 깍지 껴 가슴 펴기', en: 'Clasp hands behind you and open the chest' } },
  { emoji: '💪', seconds: 40, name: { ko: '어깨 스트레칭', en: 'Shoulder Stretch' },
    desc: { ko: '팔을 가슴 앞으로 당겨 어깨 늘리기', en: 'Pull an arm across to stretch the shoulder' } },
];
