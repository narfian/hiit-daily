// 가이드 콘텐츠(한/영). 블록 타입: p(문단) | list(불릿) | table(표).
export const GUIDE = [
  {
    icon: '⚡', title: { ko: 'HIIT 기본 원리', en: 'How HIIT works' },
    blocks: [
      { p: { ko: 'HIIT는 짧고 강한 전력 구간(work)과 회복 구간(rest)을 번갈아 반복합니다. 핵심은 work 구간에서 “대화가 어려운” 강도(주관적 운동강도 RPE 8~9/10)를 내는 것. 강도가 낮으면 그냥 서킷 운동이지 HIIT가 아닙니다.',
        en: 'HIIT alternates short all-out work bouts with recovery. The key is hitting an intensity where talking is hard (RPE 8–9/10) during work. Too easy and it’s just circuit training, not HIIT.' } },
      { p: { ko: 'work:rest 비율은 입문 1:2 → 적응 1:1 → 숙련 2:1 이상으로 점점 좁혀갑니다.',
        en: 'Tighten the work:rest ratio over time: 1:2 for beginners → 1:1 with adaptation → 2:1+ when trained.' } },
    ],
  },
  {
    icon: '⏱️', title: { ko: '프로토콜', en: 'Protocols' },
    blocks: [
      { table: {
        head: [{ ko: '프로토콜', en: 'Protocol' }, { ko: '구성', en: 'Format' }, { ko: '난이도', en: 'Level' }],
        rows: [
          [{ ko: 'Tabata', en: 'Tabata' }, { ko: '20초/10초 × 8 (4분)', en: '20s/10s × 8 (4 min)' }, { ko: '매우 높음', en: 'Very high' }],
          [{ ko: '30/30', en: '30/30' }, { ko: '30초 운동 / 30초 휴식', en: '30s work / 30s rest' }, { ko: '초급', en: 'Beginner' }],
          [{ ko: '40/20', en: '40/20' }, { ko: '40초 운동 / 20초 휴식', en: '40s work / 20s rest' }, { ko: '중급', en: 'Intermediate' }],
          [{ ko: '45/15', en: '45/15' }, { ko: '45초 운동 / 15초 휴식', en: '45s work / 15s rest' }, { ko: '상급', en: 'Advanced' }],
          [{ ko: 'EMOM', en: 'EMOM' }, { ko: '매 1분 정해진 횟수, 남는 시간 휴식', en: 'Set reps each minute, rest the rest' }, { ko: '중급', en: 'Intermediate' }],
          [{ ko: 'AMRAP', en: 'AMRAP' }, { ko: '제한시간 내 최대 라운드', en: 'Max rounds within a time cap' }, { ko: '중상급', en: 'Upper-int.' }],
          [{ ko: '피라미드/래더', en: 'Pyramid/Ladder' }, { ko: '시간·횟수를 늘렸다 줄임', en: 'Reps/time ramp up then down' }, { ko: '가변', en: 'Varies' }],
        ],
      } },
    ],
  },
  {
    icon: '📅', title: { ko: '주간 구성', en: 'Weekly structure' },
    blocks: [
      { p: { ko: 'HIIT는 매일 하는 운동이 아닙니다. 성장은 회복 중에 일어납니다.',
        en: 'HIIT isn’t a daily workout — adaptation happens during recovery.' } },
      { list: [
        { ko: '입문: 주 2회, 비연속(예: 화·금)', en: 'Beginner: 2×/week, non-consecutive (e.g. Tue/Fri)' },
        { ko: '적응 후: 주 3회(월·수·금), 사이엔 휴식이나 가벼운 활동', en: 'Adapted: 3×/week (Mon/Wed/Fri), easy activity between' },
        { ko: '고강도 HIIT를 이틀 연속으로 넣지 마세요.', en: 'Don’t stack hard HIIT on back-to-back days.' },
        { ko: '근력·체성분이 목표면 저항 운동 + 저강도 유산소(Zone 2)와 병행.', en: 'For strength/body comp, pair with resistance training + Zone 2 cardio.' },
      ] },
    ],
  },
  {
    icon: '📈', title: { ko: '강도 올리는 법', en: 'Progressive overload' },
    blocks: [
      { p: { ko: '같은 루틴이 쉬워지면 아래 레버를 한 번에 하나씩만 조절하세요.', en: 'When a routine gets easy, change one lever at a time:' } },
      { list: [
        { ko: 'work 시간↑ 또는 rest↓ (비율 좁히기)', en: 'More work time or less rest (tighten the ratio)' },
        { ko: '라운드 추가', en: 'Add a round' },
        { ko: '동작 난이도↑ (무릎 푸시업 → 정식 → 디클라인)', en: 'Harder variation (knee → full → decline push-up)' },
        { ko: '폭발력↑ (스쿼트 → 점프 스쿼트)', en: 'Add power (squat → jump squat)' },
        { ko: '라운드 간 휴식↓', en: 'Less rest between rounds' },
      ] },
    ],
  },
  {
    icon: '🤸', title: { ko: '워밍업 · 쿨다운', en: 'Warm-up & cool-down' },
    blocks: [
      { p: { ko: '워밍업(약 5분): 심박을 점진적으로 올리고 관절 가동범위를 확보합니다. 차가운 상태에서 바로 전력 점프는 부상 위험이 큽니다.',
        en: 'Warm-up (~5 min): gradually raise the heart rate and open the joints. Going all-out cold invites injury.' } },
      { p: { ko: '쿨다운(약 5분): 급정지하지 말고 1~2분 걷다가, 부위별 20~30초씩 정적 스트레칭. 회복과 다음 세션 컨디션에 직접 영향을 줍니다.',
        en: 'Cool-down (~5 min): don’t stop abruptly — walk 1–2 min, then static stretches 20–30s each. It directly affects recovery.' } },
    ],
  },
  {
    icon: '⚠️', title: { ko: '주의 & 과훈련 신호', en: 'Safety & overtraining' },
    blocks: [
      { list: [
        { ko: '심혈관·고혈압·관절 문제·임신·장기 비활동이면 의사 상담 후 저충격 버전부터.', en: 'Heart/BP/joint issues, pregnancy, or long inactivity: see a doctor; start low-impact.' },
        { ko: '속도보다 폼이 우선. 마지막 5초에 자세가 무너지면 횟수를 줄이세요.', en: 'Form over speed. If form breaks in the last 5s, cut reps — not form.' },
        { ko: '맨바닥보다 매트 위에서. 무릎·손목·층간소음 부담이 줍니다.', en: 'Use a mat — easier on knees, wrists, and neighbors.' },
        { ko: '주 2~4회로 상한을 두고 회복일을 확보하세요. 더 한다고 더 좋아지지 않습니다.', en: 'Cap at 2–4×/week with recovery days. More is not better.' },
      ] },
      { p: { ko: '과훈련 신호: 가시지 않는 통증, 안정시 심박 상승, 수면 악화, 수행능력 하락, 기분 저하 — 보이면 강도·빈도를 줄이세요.',
        en: 'Overtraining signs: lingering pain, elevated resting HR, worse sleep, dropping performance, low mood — back off intensity/frequency.' } },
      { p: { ko: '결과를 가장 크게 가르는 건 루틴의 다양성이 아니라 수면·영양·수분·일관성입니다.',
        en: 'What moves the needle most isn’t routine variety — it’s sleep, nutrition, hydration, and consistency.' } },
    ],
  },
];
