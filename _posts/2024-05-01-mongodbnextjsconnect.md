---
title: MongoDB 와 Next.JS 연결하기
author: Changhee Park
date: 2024-05-01 00:00:00 +0900
categories: [Mongodb]
tags: [nextjs, mongodb]
render_with_liquid: false
---

MongoDB 와 Next.js 를 알기전에 mongoose에 대해 먼저 알아봐야한다.

# Mongoose란

Mongoose는 Node.js 와 MongoDB를 위한 ODM**(Object Data Mapping)** 라이브러리다.

mongoose가 하는 역할은 DB의 데이터를 javascript 객체로 바꿔주는 역할을 해준다.

# MongoDB Atlas 설정해주기

<img width="690" alt="1" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/7778db60-235d-46bc-8ef7-8328df34cb1a">

개발용으로 사용하기 위해 Security - Network Access 부분에서 ALLOW ACCESS FROM ANYWHERE 을 하나 추가 해준다.

<img width="717" alt="2" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/dff4ffc0-d3a1-416b-b641-7631a17bb081">

DEVELOYMENT - DATABASE 부분에 들어가면 위 와 같은 화면이 나오는 여기서 connect로 연결 시켜준다.

<img width="784" alt="3" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/d30eddad-6ef5-493c-9ea1-c6e249b4ae13">

여기서 Drivers를 선택하면 아래와 같은 화면이 나온다.

<img width="795" alt="4" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/d3b731ce-8f0d-44dc-a44b-46f732c6d57f">

View full code sample 에는 아래와 같은 형식이 있는데 해당 부분은 .env 파일에 사용된다.

```jsx
mongodb+srv://[아이디]:[패스워드]@cluster0~~~~~~mongodb.net/[DB이름]~~~~
```

해당 형식에서 [아이디] 부분을 프로젝트 admin 아이디, [패스워드] 부분을 프로젝트 admin 패스워드로 바꿔준다.

> ex) 아이디 admin , 패스워드 1234 일 경우
> ⇒ mongodb+srv://admin:1234@cluster0.~~~~~~ 와 같은형식으로 변경시켜준다.

뒤에 [DB] 이름에는 클러스터에 자신이 사용할 데이터베이스 명을 사용하면된다.

```jsx
MONGODB_URI =
  "mongodb+srv://[아이디]:[패스워드]@cluster0~~~~~~mongodb.net/[DB이름]~~~~";
```

.env 파일을 반드시 만들어주자.

> ❗️만약 DB 명을 입력하지 않는 경우 DB명은 test란 이름으로 새롭게 하나가 생성된다.
> 필자는 이 부분을 설정 하지 않아서 꽤나 고생했다.

# Mongodb, Mongoose 설치

```jsx
npm install mongoose
npm install --save-dev @types/mongoose
```

npm으로 mongodb 와 mongoose 도 설치가 필요하다.

# typescript 형태로 DB 연결하기

src/lib/utils.ts 파일사용

```jsx
import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI || "";

export const connectToDb = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    const db = await mongoose.connect(DB_URI);
    const isConnected = db.connections[0].readyState;
    console.log("몽고디비와의 연결상태:", mongoose.connection.readyState);
  } catch (error) {
    console.log(error);
    throw new Error("몽고디비와 연결이 실패되었습니다.");
  }
};
```

# 모델 스키마 만들어주기

<img width="383" alt="5" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/3cdb1e41-6abd-4172-aa3b-1f1bbee7dea0">

위의 사진과 같은 데이터를 사용하기위에 아래와 같은 모델 스키마를 만들었다.

```jsx
import mongoose, { Schema } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
}

const userSchema =
  new Schema() <
  IUser >
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  };

const User =
  mongoose.models.User || mongoose.model < IUser > ("User", userSchema);

export default User;
```

# Next.js API를 이용하여 데이터 불러오기

app/api/users/route.ts

```jsx
import User from "@/lib/model";
import { connectToDb } from "@/lib/utils";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (request: NextApiRequest) => {
  try {
    connectToDb();
    const users = await User.find();
    console.log(users);
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    throw new Error("유저목록을 가지고 오는 것을 실패함");
  }
};
```

`http://localhost:3000/api/users` 에 접속하면 정상적으로 데이터가 오는걸 알 수 있다.

<img width="381" alt="6" src="https://github.com/AppleTrick/AppleTrick.github.io/assets/31761527/1df348e6-9c8c-4d1e-9775-d736d5b018f1">
