# 이거 모르는 마케터 없게 해주세요 — 회차별 상세 노트

인스타그램 [@ai.marketing.honey](https://www.instagram.com/ai.marketing.honey/) 릴스와 유튜브 [@ai.marketinghoney](https://www.youtube.com/@ai.marketinghoney) 영상의 회차별 상세 페이지예요.
목록(`index.html`)은 **인스타 릴스 · 유튜브 탭**으로 나뉘고(`#reels` 기본 · `#youtube`), 주소도 릴스는 `ep/NN/`, 유튜브는 `yt/NN/`으로 따로예요.
릴스에서 다 못 한 설명, 바로 복사해 쓰는 프롬프트, 써 보기 전에 알아 둘 점을 정리해요.

- 사이트: https://goofee-9p.github.io/ai-marketing-honey/
- EP.01 ego lite가 뭐예요? → `ep/01/`
- EP.02 ego lite 쓰는 법 → `ep/02/`
- EP.03 매일 아침 소재 교체 에이전트 · 브랜드 가이드 양식 → `ep/03/`
- EP.04 테슬라 로드스터 밈 · 24시간 뉴스재킹 플레이북 → `ep/04/`
- EP.05 포토샵 구독 중인 마케터, 무료로 바꾸는 법(PhotoCraft · Codex + Claude) → `ep/05/`
- EP.07 Alt+Tab 누르는 마케터 없게 해주세요(연속 붙여넣기 툴) → `ep/07/`
- EP.08 Anthropic 마케터는 어떻게 일할까요?(공식 사례 · 요청문 전문) → `ep/08/`
- EP.12 해외 카피, GPT로 돌리고 끝내지 마세요(리뷰로 소비자 말투 찾기 · 검수) → `ep/12/`
- EP.13 터진 공식 따라 했는데 왜 내 건 안 터질까(비슷한 계정 벤치마킹 · ego lite로 받아 적기) → `ep/13/`
- 유튜브 01 GPT·클로드로 광고 소재 한 세트 만드는 6단계 → `yt/01/`
- EP.06 마케터 몸값 두 배 올려주는 클로드 스킬 · 무료 마케팅 스킬 7개 → `ep/06/`

## 구조

빌드 없는 정적 사이트(GitHub Pages, `main` 브랜치 루트).

```
index.html            회차 목록
ep/NN/index.html      릴스 회차 페이지
yt/NN/index.html      유튜브 회차 페이지(목록은 index.html의 #youtube 탭)
assets/style.css      릴스와 같은 무드(흰 바탕 · 격자 · 꿀색 형광펜)
assets/site.js        프롬프트 복사 버튼 + GA4(측정 ID가 있을 때만)
assets/config.js      GA4 측정 ID
assets/img/epNN/      영상 장면 캡처 · 커버
assets/img/ytNN/      유튜브 장면 · 16:9 썸네일(cover_169.jpg)
```

## 회차 추가

1. `ep/NN/index.html`을 직전 회차에서 복사해 내용만 바꿔요(프롬프트는 `<div class="prompt" id="...">` 안의 `<pre>`).
2. `assets/img/epNN/`에 장면 캡처와 3:4 커버(`cover_34.jpg`)를 넣어요.
3. `index.html` 회차 목록 맨 위에 카드를 하나 추가해요.

## 방문 측정 (GA4)

`assets/config.js`의 `GA_ID`에 측정 ID(`G-`로 시작)를 넣으면 모든 페이지에 GA4가 붙어요. 비워 두면 분석 스크립트를 아예 불러오지 않아요.
프롬프트 복사 버튼을 누르면 `copy_prompt` 이벤트(`prompt_id` = 카드 id)가 함께 기록돼요.

인스타에서 거는 링크에는 회차별 UTM을 붙여요.

```
https://goofee-9p.github.io/ai-marketing-honey/ep/02/?utm_source=instagram&utm_medium=social&utm_campaign=ep02
```

영상 속 광고 관리 화면은 이해를 돕기 위한 예시 화면이에요. ego lite는 citrolabs가 만든 브라우저로, 이 노트와는 관계가 없어요.
