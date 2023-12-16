---
title: 라이브러리 하위 모듈 고정
author: Changhee Park
date: 2023-12-16 00:00:00 +0900
categories: [Node]
tags: [tip, library]
render_with_liquid: false
---

> ❗️ **라이브러리 하위 모듈 버전 고정하는 방법**
> 사용하고 있는 외부 라이브러리가 의존하는 모듈의 특정 버전으로 고정시키고 싶을 경우
> **yarn 패키지 매니저** 사용 시 **package.json** 에 다음을 추가
>
> ```jsx
> {
> 	"devDependencies": {
> 	...
> 	},
> 	"resolutions": {
> 	"@types/react" : "17.0.2"
> }
> ```
>
> **npm 패키지 매니저** 사용 시 **package.json**에 다음을 추가
>
> ```jsx
> {
> 	"devDependencies": {
> 	...
> 	},
> 	"overrides": {
> 	"@types/react" : "17.0.2"
> }
> ```
