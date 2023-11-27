---
title: 타입스크립트와 graphql-codegen 에 대하여
author: Changhee Park
date: 2023-03-20 00:00:00 +0900
categories: [Nextjs]
tags: [graphql, nextjs]
render_with_liquid: false
---

# graphQL-codegen이란?

graphQL을 이용하면서 백엔드에 정의 되어있는 타입을 불러와서 자동으로 사용할 수 있는 라이브러리

# 설치방법

**1-1) 라이브러리 설치**

```jsx
**yarn add -D @graphql-codegen/cli
yarn add -D @graphql-codegen/typescript**
```

---

**1-2) config.yml 파일 생성**

```jsx
schema: [graphql을 받아올 주소]
generates:
	./src/commons/types/generated/types.ts:[graphql을 받아와서 생성되는 파일 위치]
		plugins:
			- typescript [형태]
		config:
			typesPrefix: I [타입 앞에 붙는 글자]
```

❗️들여쓰기로 config.yml을 인식하므로 띄어쓰기로 될 경우 인식이 안될수 있음

---

**1-3) package.json 설정파일에 항목 추가**

```jsx
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    **"generate": "graphql-codegen"**
  },
```

---

**1-4) yarn generate 명령어 실행**

```jsx
**yarn generate**
```
