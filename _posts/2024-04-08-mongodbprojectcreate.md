---
title: MongoDB Atlas 프로젝트 생성방법
author: Changhee Park
date: 2024-04-08 00:00:00 +0900
categories: [Mongodb]
tags: [mongodb]
render_with_liquid: false
---

# MongoDB Atlas

## **1. Project 생성하기**

<img width="727" alt="1" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/ce846167-3683-4ff0-adcc-a9afb7eb04ad">

## **2. Project Member 추가하기**

<img width="707" alt="2" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/5aed853e-6178-40bc-a770-09d793fa7f83">

멤버를 안추가해도 상관 없다.

## **3. Cluster 만들고 요금제 설정 및 기본 세팅해주기**

<img width="1622" alt="3" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/4678361c-391f-4aca-a1d5-e3933957e6fc">

Create를 해주면 아래와 같은 화면에 나오는데

<img width="1146" alt="4" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/66fbefff-6dbd-4406-9bcd-1095de6445de">

요금제는 다음과 같은데 연습할용도로 사용하려면 M0 무료 요금제를 사용하자

이름을 지정해주고, 아래에 두가지 옵션이 있다.

- `Automate security setup` : 처음 기본 설정을 작업을 단순화 시켜준다.
- `Add sample dataset` : 샘플 데이터를 생성해준다.

만약 sample dataset을 하면 아래와 같은 샘플 데이터가 생성되는데 필요 없으면 옵션을 빼주자

<img width="1163" alt="5" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/eac103fe-1aa0-42de-88b6-e5faf0b23231">

## 4. Security Setting

<img width="778" alt="6" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/0fe90036-ba8c-47fc-b441-09f09fad9002">

위에서 `Automate security setup` 옵션을 설정해주면 위에 설정이 빠르고 간단하게 세팅이 되어있다

만약 옵션을 뺏다면 Add Yout Current IP Address 눌러주고 Username Password 설정해주기.

<img width="784" alt="7" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/b716a45c-7592-4ca8-b2ef-1d940e5796c6">

## 4-1. Security Setting 별도로 해주기

Automate security setup도 안했고 만약 둘다 Cancel 했다면

- DataBase Access 설정하고 ADD NEW DATABASE USER로 해준다.

<img width="1679" alt="8" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/6ded73d0-dfe6-444e-8c0d-3b7e3e7aa87d">

ADD NEW DATABASE USER에서는 `Built-in-Role`을 `Atlas admin`으로 꼭 설정해주자

- NetworkAccess 설정해주기

<img width="1672" alt="9" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/6d0eddcc-de10-422f-ab06-b636dcb15f50">

NetworkAccess ip 접근을 어떻게 설정할것인지 해준다.

<img width="699" alt="10" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/873055a5-d9bc-4d26-bd55-fb6f45307009">

간단하게 나만 접근하려면 ADD CURRENT IP ADDRESS , 모든 접근 허용하려면 ALLOW ACCESS FROM ANYWHERE 해주면 된다.
