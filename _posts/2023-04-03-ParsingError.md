---
title: ❗️Parsing error ESLint was configured to run on <tsconfigRootDir>/.eslintrc.js
author:
  name: Changhee Park
  link: https://github.com/Appletrick
date: 2023-04-03 00:00:00 +0900
categories: [error]
description: 설명
tags: [eslint, typescript, nextjs]
---

NextJS에서 eslint 설정하는 과정에서 생긴 오류

## ❗️오류 해결

**Error)** ❗️Parsing error: ESLint was configured to run on <tsconfigRootDir>/.eslintrc.js

```jsx
Parsing error: ESLint was configured to run on `<tsconfigRootDir>/???/.eslintrc.js` using `parserOptions.project`: /???/tsconfig.json
However, that TSConfig does not include this file. Either:
- Change ESLint's list of included files to not include this file
- Change that TSConfig to include this file
- Create a new TSConfig that includes this file and include it in your parserOptions.project
See the typescript-eslint docs for more info: https://typescript-eslint.io/linting/troubleshooting#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-fileeslint
```

**Solution) tsconfig.json에 내용 추가**

```jsx
"include": [
    "**/*.js",
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".eslintrc.js"
  ],
```

tsconfig.json 파일에 includes 항목에 `".eslintrc.js”` 내용을 추가하여 해결함
