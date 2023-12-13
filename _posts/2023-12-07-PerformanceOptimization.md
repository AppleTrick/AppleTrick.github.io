---
title: 성능최적화
author: Changhee Park
date: 2023-12-07 00:00:00 +0900
categories: [React]
tags: [성능최적화, next, react]
render_with_liquid: false
---

# 프론트엔드 성능 최적화 방법

1. **Page Speed Insights** 를 통한 성능 점검
2. **memoization** - memo, useMemo, useCallback
3. 브라우저 - Layout (=Reflow 최소화)
4. **dynamic import**
   - 컴포넌트 렌더링 ⇒ 버튼 클릭시 보여지는 컴포넌트 (Next - next/dynamic 사용 , React - React/lazy사용 )
   - 기능 ⇒ 버튼 클릭시 실행되는 기능 (useEffect 에서 import 사용 , onClicK에서 import 사용)
5. **lazyload** - 시야에서 안보이는 이미지를 천천히 렌더링
6. **prefetch**
   - 다음페이지 - 다음에 보여질 페이지를 미리 다운로드
   - 다음페이지의 데이터 - 다음 페이지에 보여질 데이터를 미리 다운로드
7. **preload**
   - 다음페이지의 이미지 - 다음 페이지에 보여질 이미지를 미리 다운로드
   - 현재 페이지 - 현재페이지의 다운로드 순서를 조작, 용량이 큰 이미지 먼저 다운로드하여 전체 다운로드 시간 축소
8. **optimistic UI** - 실패해도 크게 영향이 안끼칠 데이터를 받기전에 미리 수정하고 데이터비교
