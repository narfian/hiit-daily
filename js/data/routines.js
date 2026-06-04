// 추천(프리셋) 루틴, 난이도 프리셋, 워밍업/쿨다운 블록.
// 루틴 mode: 'interval'(기본) | 'tabata' | 'emom' | 'amrap' | 'ladder'
//   interval: work/rest/rounds. tabata: 각 item을 8×(20/10) 블록으로(blockRest로 블록 간 휴식).
//   emom: slot(초)마다 item 1개, items[].reps. amrap: timeCapMin 동안 item 목록 반복(라운드 카운터).
//   ladder: ladderSeconds[r]을 라운드별 work로(휴식 rest).

export const DIFFICULTIES = {
  beginner:     { work: 30, rest: 30, rounds: 3 },
  intermediate: { work: 40, rest: 20, rounds: 4 },
  advanced:     { work: 45, rest: 15, rounds: 5 },
};

export const PRESET_ROUTINES = [
  {
    id: 'default-main', custom: false, mode: 'interval',
    name: { ko: '기본 루틴', en: 'Default Routine' },
    desc: { ko: '온몸을 골고루 쓰는 5가지 기본 동작', en: 'Five staple moves for the whole body' },
    work: 40, rest: 20, rounds: 4,
    items: [{ exerciseId: 'squat' }, { exerciseId: 'pushup' }, { exerciseId: 'mountain-climber' }, { exerciseId: 'lunge' }, { exerciseId: 'plank' }],
  },
  {
    id: 'beginner-fullbody', custom: false, mode: 'interval',
    name: { ko: '초급 전신', en: 'Beginner Full-body' },
    desc: { ko: '저충격 위주, 처음 시작하기 좋은 30/30', en: 'Low-impact start, 30/30' },
    work: 30, rest: 30, rounds: 2,
    items: [{ exerciseId: 'standing-knee-raise' }, { exerciseId: 'squat' }, { exerciseId: 'incline-pushup' }, { exerciseId: 'glute-bridge' }, { exerciseId: 'side-step-jack' }, { exerciseId: 'plank' }, { exerciseId: 'mountain-climber' }],
  },
  {
    id: 'intermediate-fullbody', custom: false, mode: 'interval',
    name: { ko: '중급 전신', en: 'Intermediate Full-body' },
    desc: { ko: '점프 포함 40/20 × 3라운드', en: 'With jumps, 40/20 × 3' },
    work: 40, rest: 20, rounds: 3,
    items: [{ exerciseId: 'jump-squat' }, { exerciseId: 'pushup' }, { exerciseId: 'skater' }, { exerciseId: 'plank-shoulder-tap' }, { exerciseId: 'high-knees' }, { exerciseId: 'reverse-lunge' }, { exerciseId: 'bicycle-crunch' }, { exerciseId: 'burpee' }],
  },
  {
    id: 'advanced-hiit', custom: false, mode: 'interval',
    name: { ko: '상급 고강도', en: 'Advanced HIIT' },
    desc: { ko: '45/15 × 4라운드. 충분히 적응된 사람만', en: '45/15 × 4. Adapted athletes only' },
    work: 45, rest: 15, rounds: 4,
    items: [{ exerciseId: 'burpee' }, { exerciseId: 'jump-lunge' }, { exerciseId: 'plank-updown' }, { exerciseId: 'tuck-jump' }, { exerciseId: 'plank-shoulder-tap' }, { exerciseId: 'skater' }, { exerciseId: 'mountain-climber' }, { exerciseId: 'squat-thrust' }],
  },
  {
    id: 'lower-focus', custom: false, mode: 'interval',
    name: { ko: '하체 집중', en: 'Lower-body Focus' },
    desc: { ko: '다리·엉덩이 위주 40/20 × 3', en: 'Legs and glutes, 40/20 × 3' },
    work: 40, rest: 20, rounds: 3,
    items: [{ exerciseId: 'jump-squat' }, { exerciseId: 'reverse-lunge' }, { exerciseId: 'single-leg-glute-bridge' }, { exerciseId: 'wall-sit' }, { exerciseId: 'curtsy-lunge' }, { exerciseId: 'calf-raise' }],
  },
  {
    id: 'upper-core', custom: false, mode: 'interval',
    name: { ko: '상체 + 코어', en: 'Upper + Core' },
    desc: { ko: '미는 힘과 코어 위주 40/20 × 3', en: 'Push and core, 40/20 × 3' },
    work: 40, rest: 20, rounds: 3,
    items: [{ exerciseId: 'pushup' }, { exerciseId: 'pike-pushup' }, { exerciseId: 'chair-dip' }, { exerciseId: 'plank-updown' }, { exerciseId: 'side-plank' }, { exerciseId: 'hollow-hold' }],
  },
  {
    id: 'quiet-focus', custom: false, mode: 'interval',
    name: { ko: '저소음 집중', en: 'Quiet Focus' },
    desc: { ko: '점프 없이 조용하게, 코어·하체 위주', en: 'No jumping — quiet core and legs' },
    work: 40, rest: 20, rounds: 4,
    items: [{ exerciseId: 'glute-bridge' }, { exerciseId: 'bird-dog' }, { exerciseId: 'reverse-lunge' }, { exerciseId: 'side-plank' }, { exerciseId: 'dead-bug' }, { exerciseId: 'wall-sit' }],
  },
  {
    id: 'express-10', custom: false, mode: 'interval',
    name: { ko: '10분 익스프레스', en: '10-min Express' },
    desc: { ko: '바쁜 날 5동작 × 2라운드', en: 'Busy day: 5 moves × 2 rounds' },
    work: 40, rest: 20, rounds: 2,
    items: [{ exerciseId: 'burpee' }, { exerciseId: 'jump-squat' }, { exerciseId: 'pushup' }, { exerciseId: 'mountain-climber' }, { exerciseId: 'plank' }],
  },
  {
    id: 'fullbody-burner', custom: false, mode: 'interval',
    name: { ko: '전신 버너', en: 'Full-body Burner' },
    desc: { ko: '점프 포함 고강도. 저소음 모드로 대체 가능', en: 'High-intensity with jumps; low-noise can swap them' },
    work: 40, rest: 20, rounds: 4,
    items: [{ exerciseId: 'jumping-jack' }, { exerciseId: 'burpee' }, { exerciseId: 'jump-squat' }, { exerciseId: 'high-knees' }, { exerciseId: 'plank' }],
  },
  {
    id: 'tabata-classic', custom: false, mode: 'tabata',
    name: { ko: 'Tabata 클래식', en: 'Tabata Classic' },
    desc: { ko: '20초/10초 × 8, 동작별 4분 블록', en: '20s/10s × 8 — a 4-min block per move' },
    work: 20, rest: 10, blockRest: 30,
    items: [{ exerciseId: 'jump-squat' }, { exerciseId: 'pushup' }, { exerciseId: 'mountain-climber' }, { exerciseId: 'burpee' }],
  },
  {
    id: 'emom-grind', custom: false, mode: 'emom',
    name: { ko: 'EMOM 그라인드', en: 'EMOM Grind' },
    desc: { ko: '매 1분 정해진 횟수, 남는 시간 휴식 × 6라운드', en: 'Reps each minute, rest the remainder × 6' },
    slot: 60, rounds: 6,
    items: [{ exerciseId: 'burpee', reps: 12 }, { exerciseId: 'jump-squat', reps: 20 }, { exerciseId: 'pushup', reps: 15 }, { exerciseId: 'mountain-climber', reps: 40 }],
  },
  {
    id: 'amrap-12', custom: false, mode: 'amrap',
    name: { ko: 'AMRAP 12분', en: 'AMRAP 12 min' },
    desc: { ko: '12분 동안 최대한 많은 라운드', en: 'As many rounds as possible in 12 min' },
    timeCapMin: 12,
    items: [{ exerciseId: 'squat', reps: 15 }, { exerciseId: 'pushup', reps: 10 }, { exerciseId: 'reverse-lunge', reps: 10 }, { exerciseId: 'mountain-climber', reps: 20 }],
  },
  {
    id: 'ladder-pyramid', custom: false, mode: 'ladder',
    name: { ko: '피라미드 래더', en: 'Pyramid Ladder' },
    desc: { ko: '20→30→40→50→40→30→20초로 오르내림', en: 'Time climbs then drops: 20→50→20s' },
    ladderSeconds: [20, 30, 40, 50, 40, 30, 20], rest: 15,
    items: [{ exerciseId: 'burpee' }, { exerciseId: 'squat' }],
  },
];

// 워밍업(~4분): 점진적으로 심박↑ + 가동범위 확보. id로 사진 매칭, 없으면 figure/emoji.
export const WARMUP_BLOCK = [
  { id: 'warmup-march', emoji: '🚶', seconds: 30, figure: 'standing-knee-raise', name: { ko: '제자리 걷기', en: 'March in Place' }, desc: { ko: '가볍게 제자리에서 걷기', en: 'Walk lightly in place' } },
  { id: 'warmup-jacks', emoji: '🤸', seconds: 30, figure: 'jumping-jack', name: { ko: '가벼운 점핑잭', en: 'Light Jumping Jacks' }, desc: { ko: '낮은 강도로 천천히', en: 'Easy, low effort' } },
  { id: 'warmup-arm-circles', emoji: '🙆', seconds: 30, name: { ko: '팔 돌리기', en: 'Arm Circles' }, desc: { ko: '양팔을 앞뒤로 크게', en: 'Big circles forward and back' } },
  { id: 'warmup-leg-swings', emoji: '🦵', seconds: 30, name: { ko: '다리 스윙', en: 'Leg Swings' }, desc: { ko: '앞뒤·좌우로 다리 흔들기', en: 'Swing legs front-back, side-side' } },
  { id: 'warmup-hip-circles', emoji: '🔄', seconds: 30, name: { ko: '고관절 돌리기', en: 'Hip Circles' }, desc: { ko: '골반을 천천히 크게', en: 'Circle the hips slowly' } },
  { id: 'warmup-squat', emoji: '🦵', seconds: 30, figure: 'squat', name: { ko: '맨몸 스쿼트', en: 'Bodyweight Squats' }, desc: { ko: '가동범위 확인하며 천천히', en: 'Slow, find your range' } },
  { id: 'warmup-lunge-twist', emoji: '🔁', seconds: 30, figure: 'lunge', name: { ko: '런지 비틀기', en: 'Lunge with Twist' }, desc: { ko: '런지 자세에서 상체 회전', en: 'Rotate the torso in a lunge' } },
  { id: 'warmup-inchworm', emoji: '🐛', seconds: 30, figure: 'walkout-plank', name: { ko: '인치웜', en: 'Inchworm' }, desc: { ko: '손으로 걸어 플랭크까지 갔다 오기', en: 'Walk hands out to plank and back' } },
];

export const COOLDOWN_BLOCK = [
  { id: 'cooldown-march', emoji: '🚶', seconds: 30, name: { ko: '가벼운 제자리 걷기', en: 'Easy March' }, desc: { ko: '심박을 천천히 낮추기', en: 'Bring the heart rate down' } },
  { id: 'cooldown-thigh', emoji: '🦵', seconds: 40, name: { ko: '허벅지 스트레칭', en: 'Thigh Stretch' }, desc: { ko: '허벅지 앞쪽을 늘려주기 (좌우)', en: 'Stretch the front thighs (both)' } },
  { id: 'cooldown-calf', emoji: '🦶', seconds: 40, name: { ko: '종아리 스트레칭', en: 'Calf Stretch' }, desc: { ko: '벽을 밀며 종아리 늘리기', en: 'Push the wall, stretch calves' } },
  { id: 'cooldown-chest', emoji: '🫁', seconds: 40, name: { ko: '가슴 스트레칭', en: 'Chest Stretch' }, desc: { ko: '양손을 뒤로 깍지 껴 가슴 펴기', en: 'Clasp hands behind, open the chest' } },
  { id: 'cooldown-shoulder', emoji: '💪', seconds: 40, name: { ko: '어깨 스트레칭', en: 'Shoulder Stretch' }, desc: { ko: '팔을 가슴 앞으로 당겨 늘리기', en: 'Pull an arm across the chest' } },
  { id: 'cooldown-child-pose', emoji: '🧘', seconds: 40, name: { ko: '차일드 포즈', en: 'Child’s Pose' }, desc: { ko: '엎드려 등·허리 이완', en: 'Kneel and relax the back' } },
];
