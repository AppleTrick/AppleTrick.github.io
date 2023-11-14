---
title: apollo-client 이미지 업로드 초기 세팅 방법
author:
  name: Changhee Park
  link: https://github.com/Appletrick
date: 2023-07-19 00:00:00 +0900
categories: [nextjs]
description: 설명
tags: [nextjs, typescript, gql, apollo]
---

...

# ImageUpload

gql에서 이미지 업로드 하기 위해서는 apollo-upload-clinet 를 설치해야된다.

```bash
// 일반설치
yarn add apollo-upload-client --dev

// 타입스크립트설치
yarn add @types/apollo-upload-client --dev
```

## apollo 설정파일

```jsx
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

// 타입
interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const uploadLink = createUploadLink({
    uri: `업로드할 gql uri`,
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
```

`createUploadLink` 로 업로드할 uri를 작성하고 해당 값을 작성해준다,

`ApolloClient` 의 link에 해당 값을 배열 형태로 연결시킨다. (이후에 추가로 다른 기능을 연결 할 수 있음)

uploadLink를 제대로 설정해 주지 않으면 파일의 uri값을 설정하지 않았다고 오류가 발생.
