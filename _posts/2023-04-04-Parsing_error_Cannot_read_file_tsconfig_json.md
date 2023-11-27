---
title: ❗️Error) Parsing error Cannot read file tsconfig.json'.eslint
author: Changhee Park
date: 2023-04-04 00:00:00 +0900
categories: [Error]
tags: [eslint, typescript, nextjs]
render_with_liquid: false
---

vscode에서 프로젝트를 두개를 띄운 상태로 프로젝트를 진행할때 tsconfig.json의 위치를 제대로 못잡는 상황

## ❗️오류 해결

**Error) Parsing error: Cannot read file tsconfig.json'.eslint**

```jsx
Parsing error: Cannot read file '/users/park/desktop/project/codecamp/tsconfig.json'.eslint
```

tsconfig.json에서

**Solution) .eslintrc.js 에 내용 추가**

```jsx

parserOptions:
    project: "./tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
  ,
```

## + 내용 추가

**Solution) .eslintrc.js 에 내용 추가**

"\*\*/tsconfig.json" 으로 변경해도 문제 해결 가능
다음과 같이할 경우 `npx eslint .` 해도 문제 해결 나으

```jsx
parserOptions: {
    project: "**/tsconfig.json",
    sourceType: "module",
    ecmaVersion: "latest",
  },
```
