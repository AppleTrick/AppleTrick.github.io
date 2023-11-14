---
title: WebSocket, WebRTC란
author:
  name: Changhee Park
  link: https://github.com/Appletrick
date: 2022-10-18 00:00:00 +0900
categories: [개념]
description: 설명
tags: [web, 개념, 공부, websocket, webrtc]
---

# WebSocket, WebRTC 란

web을 사용할때 서로간의 통신을 공부하다가 알게된지식이다.

흔히 우리가 유저와 서버가 데이터를 주고 받으려면 http 요청을 통해서 데이터를 주고 받는다.

과거에는 모든 웹 서비스가 http 통신으로만 모든 웹서비스가 구현되었다.

최근 들어서, 코인서비스, 주식, 채팅서비스 같은 실시간 서비스가 등장하면서, 이를 이용한다면 매초마다 새로운 정보를 받아야되기 때문에 서버에 지속적으로 요청을 해야된다.

직접 요청하지 않고 서버에서 지속적으로 보내는 방법을 구현한 것이 WebSocket이다

# WebSocket이란?

서버와 클라이언트가 실시간으로 양방향 통신을 할 수 있게 해주는 Socket이다.

서버와 클라이언트 서로간의 연결은 유지되고 있다.

## Socket.io 는?

socket.io는 웹소켓 프로토콜을 이용하는 라이브러리이다.

# WebRTC란

WebRTC(Web Real-Time Communication)은 클라이언트와 서버가 통신하는게 아니라 유저간읜 브라우저끼리 통신하여 중간자인 서버없이 브라우저 간에 오디오, 영상 미디어, 데이터등을 교환할 수 있도록 하는 기술이다

## WebSocket이 있는데 WebRTC를 쓰는 이유

- WebRTC는 영상, 오디오, 데이터 통신이 고성능, 고품질이도록 설계되었다.
- WebRTC는 브라우저간 직접 통신이므로, 훨씬 전송 속도가 빠르다.
- WebRTC는 네트워크 지연시간이 짧다

### ❗️but

다만, WebRTC만으로 제어하기 어려운 부분이 있으므로 WebSocket, 또는 Socket.io 를 사용해 신호를 주고받을 수 있는 Signaling 서버는 필요하다.
