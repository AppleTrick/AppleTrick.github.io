---
title: MongoDB Atlas 프로젝트 삭제하기
author: Changhee Park
date: 2024-04-09 00:00:00 +0900
categories: [Mongodb]
tags: [mongodb]
render_with_liquid: false
---

<img width="1386" alt="1" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/c1ea2dc9-b3e4-4ddd-b7e8-7a3d85f55f4b">

MongoDB Atlas에 아래와 같은 프로젝트들중 하나를 삭제하려한다.

<img width="331" alt="2" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/83a400b7-1d23-451f-a82d-0b68a6b95592">

> This project cannot be deleted if there are active clusters or has enabled Backup Compliance Policy with active snapshots

하지만 삭제를 하려면 위와 같은 문구가 나오면서 삭제를 할 수 가 없다.

<img width="1034" alt="3" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/f2a888dc-d9cf-4e99-b9b9-de1daf7bbe0b">

이렇게 나오는 경우 해당 프로젝트에 가서 Terminate 를 해준다. 이후 클러스터 이름을 입력해 준 다음

<img width="429" alt="4" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/10f5169b-76dc-4689-85df-d16e4deb6812">

프로젝트 목록으로 가서 보면 삭제버튼이 활성화 된다.
