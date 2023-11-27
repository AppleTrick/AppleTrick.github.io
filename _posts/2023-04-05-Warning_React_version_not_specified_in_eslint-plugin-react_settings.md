---
title: ❗️Error) Warning React version not specified in eslint-plugin-react settings.
author: Changhee Park
date: 2023-04-04 00:00:01 +0900
categories: [Error]
tags: [eslint, typescript, nextjs]
render_with_liquid: false
---

eslint의 오류를 잡으려고 `npx eslint .` 을 실행했음해도 결과가 나타나지 않을때 오류 발생

## ❗️오류 해결

**Error) Warning: React version not specified in eslint-plugin-react settings.**

eslint 상으로 오류는 있지만 npx eslint . 으로 에러가 잡히지 않는다

```jsx
Warning: React version not specified in eslint-plugin-react settings.
See https://github.com/jsx-eslint/eslint-plugin-react#configuration .
```

**Solution)** **명령어는 다음과 같이 변경시켜준다.**

```jsx
npx eslint --ext .js,.ts,.tsx src
```

- 참고

> [https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html](https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html) > [https://velog.io/@dev_lynn/Eslint-Warning](https://velog.io/@dev_lynn/Eslint-Warning)
