---
title: kakao map with nextjs
author: Changhee Park
date: 2023-11-26 00:00:00 +0900
categories: [Nextjs]
tags: [kakaomap, nextjs]
render_with_liquid: false
---

[Kakao Developers](https://developers.kakao.com/)

카카오 지도를 구현하는 것은 간단하지만 문제는 Next.js 에서 구현할때 Next와 충돌하는 부분을 해결해야된다.

# 카카오 지도에서 구현

kakao-developer 사이트로 가서 내 애플리케이션으로 가서 추가한다.

앱이름과 사업자명은 각각 알아서 적용

- REST-API 키는 axios로 요청하는 부분
- Javascript키는 <script/> 를 통해 다운을 받을때 사용하는 부분

[Kakao 지도 API](https://apis.map.kakao.com/web/)

## 웹 플랫폼에서 주소등록

<img width="623" alt="스크린샷 2023-11-24 오후 6 18 59" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/28eb0039-7b9b-46dc-9b1b-b61e3953e098">

꼭 사용하는 주소를 적어주자.

Next.Js code

```tsx
export default function KakaoMapPage(): JSX.Element {
  return (
    <>
      <script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`}
      ></script>
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </>
  );
}
```

<script/> 코드를 다운 받을 경우 브라우저에서는 window.kakao가 생기게된다.

kakaoExampleCode

```jsx
var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
```

Next.js 에서는 다음 코드를 실행하기 위해 useEffect 안에서 위의 코드를 사용한다.

```jsx
useEffect(() => {
  const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
  const options = {
    // 지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
    level: 3 // 지도의 레벨(확대, 축소 정도)
  };

  new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
}, []);
```

!다음과 같은 오류가 발생하는 이유

<img width="555" alt="스크린샷 2023-11-24 오후 6 12 45" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/a7851001-4b64-4bfe-8f14-96a09168b594">

window 안에 kakao가 없기 때문에 다음과 같은 오류가 발생한다.

```jsx
declare const window: typeof globalThis & {
  kakao: any;
};
```

window 와 현 페이지에 script로 다운받은 kakao 가 있다고 명시해주면된다.

## 전체코드

```jsx
import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage(): JSX.Element {
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
  return (
    <>
      <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`}></script>
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </>
  );
}
```

# 문제점!

첫 페이지가 지도페이지가 아니고 이동할 경우 위와 같은 코드는 정상적으로 동작하지 않는다.!

<img width="986" alt="스크린샷 2023-11-24 오후 6 35 08" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/77530ff9-e964-4fb1-bda7-8ed2bed42458">

Next에서 SPA는 프론트엔드 서버에서 다른 페이지의 목록까지 html, css, js의 모든 데이터를 다 받아오기 때문에 더 이상의 접속의 요청(api) 제외하고 딜레이 없이 페이지 이동이 가능하다.

여기서 생기는 문제는 kakao 지도의 경우 script의 페이지를 다운받기 전에 화면이 구현되서 오류가 발생

다음과 같은 문제를 해결하는 방법은

1. useEffect 안에 script 코드를 직접 작성

   ```jsx
   const script = document.createElement("script");
   script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`;
   document.head.appendChild(script);
   ```

2. 주소에 파라메터로 `autoload=false` 를 지정
3. 카카오에서 만든 `kakao.maps.load(**function**(){})` 사용하여 지도를 만들때 사용한 코드를 함수안에 넣어준다.

결과로 다음과 같이 수정이 가능하다.

```jsx
import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function KakaoMapPage(): JSX.Element {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`;
    document.head.appendChild(script);

		// onload를 추가해준다.
    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
        console.log(map);
      });
    };
  }, []);
  return (
		<>
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </>
  );
}
```

[Kakao 지도 API](https://apis.map.kakao.com/web/documentation/#load_load)
