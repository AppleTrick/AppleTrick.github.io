---
title: Next Image 사용하는 방법
author: Changhee Park
date: 2024-03-04 00:00:00 +0900
categories: [Nextjs]
tags: [image, nextjs]
render_with_liquid: false
---

Next.js 에서는 별도의 Image 컴포넌트가 존재한다 .

Image 컴포넌트의 장점은 다음과 같다

- 향상된 성능: 최신 이미지 형식을 사용하여 각 디바이스에 대한 올바른 크기의 이미지 제공
- 시각적 안정성: 자동으로 **layout shift** 방지
- 빠른 페이지 로드: 이미지가 뷰포트에 들어갈 때만 로드되며 **placeholder** 제공
- 유연성: 원격 서버에 저장된 이미지에 대해서도 온디맨드 이미지 크기 조정

## Sample Code

page.tsx 파일

```tsx
import Image from "next/image";
import styles from "./imagepage.module.css";

const ImagePage = () => {
  return (
    <div className={styles.imgcontainer}>
      <Image className={styles.img} src="/ann.jpg" alt="" fill />
    </div>
  );
};

export default ImagePage;
```

imagepage.module.css 파일

```css
.imgcontainer {
  position: relative;
  display: flex;
  width: 500px;
  height: 500px;
  background-color: red;
}

.img {
  object-fit: contain;
  /* object-fit: cover; */
}
```

- position : relative 를 통해 크기를 맞춘다.
- objectfit 을 통해 화면에 그림을 전부 덮을지(cover) 아니면 빈 부분이 생겨도 괜찮게 크기를 변경할지 선택 가능

## 외부 이미지 적용하는 법

Next Image 컴포넌트를 외부 이미지에 사용하기 위해서 는 `next.config.mjs` 파일을 수정시켜준다.

```css
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
}
```

port 와 pathname은 생략 가능하다.

hostname 에서는 내가 가지고 올 이미지의 사이트의 주소를 가지고 온다 생각하면된다.

ex) example.com/photos/18965342.jpg 일 경우 example.com만 넣으면 된다.
