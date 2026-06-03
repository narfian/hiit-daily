// UI 문자열 사전 (한/영). 콘텐츠(운동명/설명)는 data 객체에 인라인이고,
// 여기에는 화면 UI 텍스트만 둔다. 함수형 값은 (args) => string.
export const STRINGS = {
  ko: {
    appName: 'HIIT 데일리',
    tagline: '집에서 보면서 하는 인터벌 타이머',

    // 공통 버튼/네비
    start: '시작', pause: '일시정지', resume: '계속', stop: '정지',
    restart: '다시 시작', prev: '이전', next: '다음', skip: '건너뛰기',
    back: '← 뒤로', save: '저장', delete: '삭제', cancel: '취소',
    edit: '편집', add: '추가', close: '닫기', preview: '미리보기', done: '완료',
    confirm: '확인',

    // 화면 제목
    home: '홈', builder: '루틴 만들기', previewTitle: '운동 미리보기',
    settings: '설정',

    // 상태 라벨
    getReady: '준비', work: '운동', rest: '휴식',
    warmup: '워밍업', cooldown: '쿨다운', complete: '완료!',

    // 타이머/요약
    roundXofY: (x, y) => `라운드 ${x} / ${y}`,
    elapsed: '경과', totalRemaining: '남은 시간', totalTime: '총 시간',
    nextUp: '다음', perExerciseTime: '운동별 시간',

    // 설정/조절
    presets: '추천 루틴', difficulty: '난이도',
    beginner: '초보자', intermediate: '중급자', advanced: '상급자',
    beginnerHint: '30초 운동 · 30초 휴식 · 3라운드',
    intermediateHint: '40초 운동 · 20초 휴식 · 4라운드',
    advancedHint: '45초 운동 · 15초 휴식 · 5라운드',
    workSec: '운동(초)', restSec: '휴식(초)', rounds: '라운드',
    getReadySec: '준비 카운트다운(초)',
    lowNoise: '층간소음 모드', lowNoiseHint: '점프 동작을 저소음 동작으로 자동 교체',
    warmupToggle: '워밍업 포함', cooldownToggle: '쿨다운 포함',
    sound: '효과음', speech: '음성 안내', haptics: '진동',
    theme: '테마', themeSystem: '시스템', themeLight: '라이트', themeDark: '다크',
    language: '언어',

    // 빌더
    createNew: '+ 새 루틴 만들기',
    savedRoutines: '내 루틴', noSaved: '저장된 루틴이 없습니다.',
    routineName: '루틴 이름', routineNamePlaceholder: '예: 아침 코어 루틴',
    exerciseLibrary: '운동 라이브러리', selectedExercises: '선택한 운동',
    emptyRoutine: '아래에서 운동을 추가하세요.',
    moveUp: '위로', moveDown: '아래로', remove: '제거',
    customBadge: '내 루틴', quietBadge: '저소음',
    saveRoutine: '루틴 저장', deleteConfirm: '이 루틴을 삭제할까요?',
    addedToast: '추가됨', savedToast: '저장됨',
    nameRequired: '루틴 이름을 입력하세요.',
    needOneExercise: '운동을 하나 이상 추가하세요.',

    // 태그
    tag_legs: '하체', tag_core: '코어', tag_cardio: '유산소',
    tag_upper: '상체', tag_fullbody: '전신', tag_back: '등',

    // 미리보기/완료/안내
    safety: '⚠️ 무릎·허리·심혈관 질환이 있으면 강도를 낮추고, 통증이 생기면 즉시 중단하세요. 운동 전 가벼운 준비운동을 권장합니다.',
    estimatedTotal: '예상 총 시간',
    startWorkout: '운동 시작',
    greatJob: '수고하셨어요! 💪',
    completedIn: (t) => `총 ${t} 동안 완료했어요`,
    exercisesDone: (n) => `운동 ${n}개 완료`,
    goHome: '홈으로', doAgain: '다시 하기',

    // 시스템 안내
    silentHint: '소리가 안 들리면 기기의 무음 모드를 해제하세요.',
    wakeLockOn: '운동 중 화면이 꺼지지 않습니다.',
    wakeLockUnsupported: '이 기기는 화면 꺼짐 방지를 지원하지 않을 수 있어요.',
    installHint: '홈 화면에 추가하면 앱처럼 전체화면으로 쓸 수 있어요.',
    offlineReady: '오프라인에서도 사용할 수 있어요.',
    keyboardHint: '스페이스: 일시정지/계속 · ← →: 이전/다음',
  },
  en: {
    appName: 'HIIT Daily',
    tagline: 'A follow-along interval timer for home',

    start: 'Start', pause: 'Pause', resume: 'Resume', stop: 'Stop',
    restart: 'Restart', prev: 'Prev', next: 'Next', skip: 'Skip',
    back: '← Back', save: 'Save', delete: 'Delete', cancel: 'Cancel',
    edit: 'Edit', add: 'Add', close: 'Close', preview: 'Preview', done: 'Done',
    confirm: 'OK',

    home: 'Home', builder: 'Build a Routine', previewTitle: 'Workout Preview',
    settings: 'Settings',

    getReady: 'Get Ready', work: 'Work', rest: 'Rest',
    warmup: 'Warm-up', cooldown: 'Cool-down', complete: 'Done!',

    roundXofY: (x, y) => `Round ${x} of ${y}`,
    elapsed: 'Elapsed', totalRemaining: 'Remaining', totalTime: 'Total',
    nextUp: 'Next', perExerciseTime: 'Per-exercise time',

    presets: 'Suggested routines', difficulty: 'Difficulty',
    beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced',
    beginnerHint: '30s work · 30s rest · 3 rounds',
    intermediateHint: '40s work · 20s rest · 4 rounds',
    advancedHint: '45s work · 15s rest · 5 rounds',
    workSec: 'Work (s)', restSec: 'Rest (s)', rounds: 'Rounds',
    getReadySec: 'Get-ready countdown (s)',
    lowNoise: 'Low-noise mode', lowNoiseHint: 'Auto-swap jumping moves for quiet ones',
    warmupToggle: 'Include warm-up', cooldownToggle: 'Include cool-down',
    sound: 'Sound', speech: 'Voice cues', haptics: 'Vibration',
    theme: 'Theme', themeSystem: 'System', themeLight: 'Light', themeDark: 'Dark',
    language: 'Language',

    createNew: '+ Create new routine',
    savedRoutines: 'My routines', noSaved: 'No saved routines yet.',
    routineName: 'Routine name', routineNamePlaceholder: 'e.g. Morning core',
    exerciseLibrary: 'Exercise library', selectedExercises: 'Selected exercises',
    emptyRoutine: 'Add exercises from below.',
    moveUp: 'Up', moveDown: 'Down', remove: 'Remove',
    customBadge: 'Custom', quietBadge: 'Quiet',
    saveRoutine: 'Save routine', deleteConfirm: 'Delete this routine?',
    addedToast: 'Added', savedToast: 'Saved',
    nameRequired: 'Please enter a routine name.',
    needOneExercise: 'Add at least one exercise.',

    tag_legs: 'Legs', tag_core: 'Core', tag_cardio: 'Cardio',
    tag_upper: 'Upper', tag_fullbody: 'Full body', tag_back: 'Back',

    safety: '⚠️ If you have knee, back, or cardiovascular issues, lower the intensity and stop immediately if you feel pain. A light warm-up first is recommended.',
    estimatedTotal: 'Estimated total',
    startWorkout: 'Start workout',
    greatJob: 'Great job! 💪',
    completedIn: (t) => `Completed in ${t}`,
    exercisesDone: (n) => `${n} exercises done`,
    goHome: 'Home', doAgain: 'Do it again',

    silentHint: 'No sound? Turn off your device’s silent mode.',
    wakeLockOn: 'Your screen stays on during the workout.',
    wakeLockUnsupported: 'This device may not support keeping the screen awake.',
    installHint: 'Add to Home Screen to use it full-screen like an app.',
    offlineReady: 'Works offline too.',
    keyboardHint: 'Space: pause/resume · ← →: prev/next',
  },
};
