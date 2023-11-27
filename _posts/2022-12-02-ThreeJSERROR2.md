---
title: Uncaught TypeError THREE.scene is not a constructor ❗️
author: Changhee Park
date: 2022-12-02 00:00:00 +0900
categories: [Error]
tags: [threejs, error, js]
---

❗️Uncaught TypeError: THREE.scene is not a constructor

```jsx
let scene = new THREE.Scene();
```

해당 부분의 오타일 확률이 높다 오타를 수정해주자

작성자의 경우 대소문자를 잘못쳐서 오류가 났다.

```jsx
// 오류 코드
let scene = new THREE.scene();

// 수정 코드
let scene = new THREE.Scene();
```
