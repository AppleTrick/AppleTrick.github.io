---
title: 스토리북 설치중 에러
author: Changhee Park
date: 2024-02-02 00:00:00 +0900
categories: [Error]
tags: [storybook, error]
render_with_liquid: false
---

# 에러코드

```jsx
🔴 Error: It looks like you are having a known issue with package hoisting.
Please check the following issue for details and solutions: https://github.com/storybookjs/storybook/issues/22431#issuecomment-1630086092

/Users/park/Desktop/project/heeground/heeground/node_modules/cli-table3/node_modules/string-width/index.js:2
const stripAnsi = require('strip-ansi');
                  ^

Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/park/Desktop/project/heeground/heeground/node_modules/strip-ansi/index.js from /Users/park/Desktop/project/heeground/heeground/node_modules/cli-table3/node_modules/string-width/index.js not supported.
Instead change the require of /Users/park/Desktop/project/heeground/heeground/node_modules/strip-ansi/index.js in /Users/park/Desktop/project/heeground/heeground/node_modules/cli-table3/node_modules/string-width/index.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous> (/Users/park/Desktop/project/heeground/heeground/node_modules/cli-table3/node_modules/string-width/index.js:2:19) {
  code: 'ERR_REQUIRE_ESM'
}

Node.js v21.1.0
error Command failed with exit code 7.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

# 해결방법

- yarn.lock 파일 삭제
- yarn install 명령어 적용
- yarn storybook 명령어 다시 실행하면 해결 완료
