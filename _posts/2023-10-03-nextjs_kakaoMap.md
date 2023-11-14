---
title: NextJs에서 Kakao 지도구현
author:
  name: Changhee Park
  link: https://github.com/Appletrick
date: 2023-10-03 00:00:00 +0900
categories: [nextjs]
description: 설명
tags: [nextjs, kakao지도]
---

# NextJs에서 Kakao 지도구현

[Kakao 지도 API](https://apis.map.kakao.com/web/)

카카오 개발자 문서에서 참조

# 일반적인 Kakao지도 구현

- 웹상에서 NextJS에서 <Head> 태그를 생성하려면 아래와 같이 생성

  ```jsx
  import Head from "next/head";

  const myLink = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`;

  <Head>
    <script type="text/javascript" src={myLink}></script>
  </Head>;
  ```

- TypeScript에서 kakao에 대한 타입을 선언시켜줘야 되기 때문에 gloabaThis 타입과 kakao를 합쳐줌
  ```jsx
  declare const window: typeof globalThis & {
    kakao: any;
  };
  ```
- useEffect를 통해 컴포넌트가 렌더링 되었을때 지도에 구현

  ```jsx
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    console.log(map);
  }, []);
  ```

- 전체코드

```jsx
import Head from "next/head";
import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage() {
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  const myLink = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`;

  return (
    <>
      <Head>
        <script type="text/javascript" src={myLink}></script>
      </Head>
      <div id="map"></div>
    </>
  );
}
```

# 라우팅을 통한 Kakao 지도 구현

NextJS는 SPA 이기때무넹 페이지를 구현할때 사전에 다른 페이지까지 미리 데이터를 다 받아온다.

이를 통해 버튼 클릭으로 이동했을때 빠르게 화면이 전환되는 장점을 가지고 있다.

하지만 버튼 클릭하여 kakao지도가 구현된 페이지는 빠른 전환때문에 미처 kakao 지도 라이브러리를 다 받지 못하고 구현되기 때문에 오류가 발생한다.

다음과 같은 오류를 해결 하기위해서는 페이지가 구현되고 다운을 받아오게 변경하면 된다.

- script의 태그를 직접 만들준다.
  ```jsx
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`;
  document.head.appendChild(script);
  ```
- script태그가 dom데이터가 로딩 되었을때 진행 카카오 지도를 구현해주면 된다.
  ```jsx
  script.onload = () => {};
  ```
- 전체코드
