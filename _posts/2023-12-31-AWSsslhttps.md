---
title: SSL 과 HTTPS 의 이해
author: Changhee Park
date: 2023-12-31 00:00:00 +0900
categories: [Aws]
tags: [aws, ssl, https]
render_with_liquid: false
---

# SSL 과 HTTPS 의 이해

- SSL (Secure-Socket-Layer)
  SSL은 인증서로 사면서 구매를 할수도 있다.
  https로 접속할수있게해준다.
- TLS (Transport-Layer-Security)
  SSL의 상위 단계

로드밸런서에 SSL 인증서는 AWS나 클라우드에서 딸각만 하면되므로 매우 쉽다. 그러나 VM 인스턴스에 SSL 인증서를 설치하기위해서는 직접 설치를 해야되기 때문에 매우 복잡하다.

## 브라우저에서 https로 통신하는 방법

1. 로드밸런서와 VM인스턴스에 모두 SSL 인증서 설치하기 (복잡하더라도 하면된다)
2. 로드밸런서에만 SSL 인증서 설치, VM인스턴스는 http 로 통신 ⇒ (리버스 프록시)

로드밸런서 or CDN에 SSL 을 설치 하면 된다.

# AWS에서 SSL 이용하기

브라우저에 접속할때 물리적인 컴퓨터의 거리가 성능에 영향이 있다. 때문에 VM-instance 는 가까운게 좋다

(가상머신은 서비스할 지역 가까이에 두는 것이 좋다.

# CDN (Contnet Delivery Network)

모든 글로벌지역에 뽑아서 가장 가까운곳에서 가지고온다.

# ACM (\***\*AWS Certificate Manager)\*\***

CDN이 global 이기 때문에 ACM은 CDN의 default인 **버지니아 북부**로 설정을 꼭 해줘야된다.

## 인증서 구현 과정

<img width="922" alt="1" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/2d3e0820-2ad6-49a2-8758-bf568d6d0b25">

퍼블릭 인증서 요청 → 다음

<img width="895" alt="2" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/d6980a4b-8beb-4711-8b6f-0e908c4d6a45">

- 인증할 도메인 주소 입력 ex) www.example.com

이외 나머지는 default로 설정하고 요청한다.

> ❗️만약 서브 도메인이 있을 경우 서브도메인의 인증서를 또 만들어야 된다.

<img width="848" alt="3" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/9f411aad-42fc-4a04-856c-d7b6bdfa42be">

본인 도메인 주소가 맞는지 CNAME 과 CNAME 값을 도메인에 입력하여 인증을 받는다.

만약 직접 생성하려면 Route53에 들어가 직접 CNAME을 입력해준다.

<img width="420" alt="4" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/c77bebe5-c5fe-4cb0-8a03-b67d8a1113d6">

아마존은 매우 친절하기 때문에 위에 별도의 버튼이 존재한다. → Route 53에서 레코드 생성

버튼 누르고 생성한다

이후 시간이 지나면 아래와 같이 변한다.

<img width="477" alt="5" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/445438e3-9149-45bd-9661-a191733e47d6">

<img width="474" alt="6" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/f3f8e0ea-4b56-4ea8-83fd-3c2c8654cac3">

처음에는 검증 대기지만 이후에 발급으로 변경된다.

# Cloud Front 만들기

Cloud Front 검색하여 생성

<img width="746" alt="7" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/a8091401-23ae-4e49-ad8a-c60ee48f642c">

- 원본 도메인 ⇒ storage 기본 주소를 입력

<img width="701" alt="8" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/10155f71-675b-4042-9657-3fd4c5cfffe6">

- 대체 도메인 주소 본인

Cloud-Front가 생성 되면 해당주소를 Route 53에서 A레코드를 변경해주면 된다.
