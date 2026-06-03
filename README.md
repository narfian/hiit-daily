# ⚡ HIIT Daily

집에서 화면을 보면서 따라 하는 **HIIT 인터벌 타이머** 웹앱입니다. 서버가 필요 없는 순수 정적 사이트(빌드 과정 없음)로, **GitHub Pages**에 그대로 올려서 아이폰·아이패드·PC·맥 어디서나 사용할 수 있습니다.

> A follow-along **HIIT interval timer** for home. A pure static site (no build step) that you can host on **GitHub Pages** and use on iPhone, iPad, PC, or Mac.

## 주요 기능
- **추천 루틴** + **난이도 프리셋**(초·중·상급) + **운동/휴식/라운드/준비 시간 슬라이더 조절**
- **나만의 루틴 만들기·저장** — 운동 라이브러리(~23종)에서 골라 순서·운동별 시간 지정
- **운동별 시간 + 전체 시간**을 시작 전 미리보기와 진행 중에 표시
- **층간소음 모드** — 점프 동작을 자동으로 저소음 동작으로 교체
- **음성·효과음 안내** — 3·2·1 카운트다운 비프 + "운동/휴식", 운동 이름 음성(한/영)
- **화면 꺼짐 방지(Wake Lock)** + **진동 피드백** + **워밍업/쿨다운**
- **한국어 / 영어 전환**, 다크·라이트·시스템 테마
- **PWA** — 홈 화면에 설치하면 전체화면 앱처럼 동작, **오프라인 사용** 가능

## 로컬에서 실행
ES 모듈·서비스워커는 `file://`에서 동작하지 않으므로 간단한 정적 서버로 엽니다.

```bash
python3 -m http.server 8000
# 또는: npx --yes serve .
```
브라우저에서 `http://localhost:8000/` 접속.

## GitHub Pages 배포

### 방법 A — 브랜치에서 바로 배포(가장 간단, 권장)
1. 이 코드를 기본 브랜치(`main`)에 병합합니다.
2. 저장소 **Settings → Pages → Build and deployment → Source = "Deploy from a branch"**
3. **Branch: `main` / 폴더: `/ (root)`** 선택 후 **Save**
4. 잠시 후 `https://<사용자>.github.io/hiit-daily/` 에서 열립니다.

모든 경로가 상대 경로라 하위 경로(`/hiit-daily/`)에서 그대로 동작합니다.

### 방법 B — GitHub Actions로 자동 배포
저장소에 `.github/workflows/deploy.yml`이 포함되어 있습니다.
1. **Settings → Pages → Source = "GitHub Actions"** 선택(최초 1회).
2. `main`에 푸시하거나 **Actions 탭에서 수동 실행**하면 자동 배포됩니다.

## 아이콘 다시 만들기
디자인 원본은 `icons/icon.svg`이며, PNG는 의존성 없는 Node 스크립트로 생성합니다.
```bash
node tools/gen-icons.mjs
```

## 운동 사진/GIF 추가하기
운동 동작은 기본적으로 미니멀 SVG 일러스트로 표시되며, 사진을 넣으면 자동으로 사진(여러 장이면 움직이는 플립북)으로 바뀝니다.
1. 생성 프롬프트 문서를 만듭니다(이미 포함되어 있음): `node tools/gen-prompts.mjs` → **`images/PROMPTS.md`**
2. 그 프롬프트로 이미지를 생성(ChatGPT/DALL·E, Midjourney, Stable Diffusion 등)해 **`images/exercises/`** 에 **정확한 파일명**으로 저장합니다.
   - 단일 동작: `squat.jpg` 처럼 1장 / 여러 동작(예: 버피): `burpee-1.jpg … burpee-4.jpg`
   - 직접 만든 애니메이션 GIF가 있으면 `burpee.gif` 로 저장해도 됩니다.
3. 커밋하면 끝. **없는 운동은 SVG로 자동 표시**되므로 하나씩 점진적으로 채워도 됩니다.

프레임 수·확장자·재생 속도는 `js/data/media.js`(`MEDIA`, `EXT`, `ms`)에서 조정합니다. 사진은 서비스워커가 처음 볼 때 캐시해 **오프라인에서도** 보입니다.

## 알아두기(특히 iOS)
- **소리가 안 들리면** 기기의 **무음 스위치를 해제**하세요(iOS는 무음 모드에서 효과음이 막힘).
- **화면 꺼짐 방지**는 iOS 18.4+에서 동작합니다(이전 버전은 화면이 어두워질 수 있음).
- **진동**은 iOS Safari에서 지원되지 않아 동작하지 않을 수 있습니다(안드로이드는 지원).
- 운동 전 가벼운 준비운동을 권장하며, 무릎·허리·심혈관 질환이 있으면 강도를 낮추고 통증 시 즉시 중단하세요.

## 구조
```
index.html · manifest.webmanifest · sw.js · offline.html
css/   reset · theme(다크/라이트 변수) · styles
js/    app(진입) · timer(드리프트 없는 엔진) · compiler(구간 컴파일)
       audio · wakelock · haptics · i18n · storage · state · pwa
js/data/  exercises · routines · strings(ko/en)
js/ui/    screen-home · screen-builder · screen-preview · screen-timer · components
icons/    icon.svg + 생성된 PNG들
```
