---
title: DOM & Virtual DOM에 대하여
author:
  name: Changhee Park
  link: https://github.com/Appletrick
date: 2022-10-12 00:00:00 +0900
categories: [개념]
description: 설명
tags: [dom, virtual_dom, 개념, 브라우져렌더링]
---

# 브라우져의 동작 원리

![Untitled](https://user-images.githubusercontent.com/31761527/195149637-35af5500-15b4-493d-9818-e77c70261cee.png)

- 1.DOM 트리 생성 : 렌더링 엔진이 HTML을 파싱하여 DOM 노드로 이루어진 트리 생성
- 2.render tree 생성 : css 파일이나 inline 스타일을 파싱하여 CSSOM 생성, CSSOM + DOM 트리를 결합 하여 render tree 생성(문서의 시각적인 구조를 나타냄)
- 3.Layout(reflow) : viewport내에서 생성된 render tree의 각 노드들이 어느 공간에 위치해야될지 결정 (position 이나 size가 결정)
- 4.paint : 실제로 화면에 그리는 repaint 과정을 통해서 브라우저에 화면이 표기 됨

## 인터렉션에 의해 DOM에 변화가 가해지면?

→ render tree 가 다시 재생성 되면서 reflow→ repaint 과정을 또 다시 거쳐야된다.

! DOM 조작을 효율적으로 해야되는 최적화가 필요함 ⇒ virtual DOM의 등장

# Virtual DOM 이란?

Virtual DOM이란, DOM의 추상화 버젼이다.

실제 DOM에서 처리하는 방식이 아닌 Virtual DOM과 메모리에서 미리 처리하고 저장한 후 실제 DOM과 동기화하는 프로그래밍 개념

실제 DOM에 여러가지 변화가 있을때, Virtual DOM은 변화를 전부 포함한 내용을 한번 Rerendering 하여 이전에가지고 있던 Virtual DOM과 비교하여 바뀐 부분만 실제 DOM에 전달한다.

### 특징

- DOM의 추상화 버젼 실제 DOM object가 가지는 속성은 가지지만, API는 가지고 있지 않는다.
- javascript의 객체 형태로 표현되어 있다.
- 메모리 상에서 동작하고 실제로 렌더링 되지는 않는다.

### DOM code

```tsx
<ul class="fruits">
  <li>Apple</li>
  <li>Orange</li>
  <li>Banana</li>
</ul>
```

### Virtual DOM

```tsx
{
  type: "ul",
  props: {
    "class": "fruits"
  },
  children: [
    {
      type: "li",
      props: null,
      children: [
        "Apple"
      ]
    },
    {
      type: "li",
      props: null,
      children: [
        "Orange"
      ]
    },
    {
      type: "li",
      props: null,
      children: [
        "Banana"
      ]
    }
  ]
}
```

### 장점

브라우저의 렌더링 연산의 양을 줄이면서 성능을 개선한다.

# QnA

Q. 브라우져 렌더링의 원리에 대해 설명하세요

A. 렌더링 엔진이 HTML을 파싱하여 DOM 노드로 이루어진 Dom Tree를 생성하고 CSS 나 inline CSS를 파싱하여 CSSOM 을 생성 처음에 만든 DOM 과 CSSOM 을 결합하여 Render Tree 를 생성합니다. ViewPort에 Render Tree의 각각의 노드들의 크기와 위치들이 결정되고 이를 화면에 출력하는 과정이 이뤄집니다.

Q. DOM이 무엇인가요?

A. DOM이란 Document Object Model의 약자로 HTML 코드로 설계된 웹페이지가 브라우저 안에서 기능들을 수행할 객체들로 실체화된 형태이다.

A. XML이나 HTML 문서에 접근하기 위한 일종의 인터페이스로, 객체 모델은 문서 내의 모든 요소를 정의하고, 각각의 요소에 접근하는 방법을 제공

Q. Virtual DOM 이 무엇일까요?

A. Virtual DOM은 가상 DOM으로, 실제 DOM에서 처리하는 방식이 아닌 Virtual DOM과 메모리에서 미리 처리하고 저장한 후 실제 DOM과 동기화하는 프로그래밍 개념

Q. Virtual DOM 작동원리에 대해 설명해주세요

A. 실제 DOM 수정사항이 발생할 경우, 실제 DOM을 메모리에 저장하고, Virtual DOM에 수정사항을 적용시킨다. 이 때, 이전의 Virtual DOM 과 현재의 Virtual DOM을 비교하여 변경된 값만 실제 DOM에 전달합니다.

# 참고

[https://doqtqu.tistory.com/316](https://doqtqu.tistory.com/316)

[https://www.youtube.com/watch?v=PN_WmsgbQCo](https://www.youtube.com/watch?v=PN_WmsgbQCo)
