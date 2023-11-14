---
title: React에서 modal창 만들기 (ReactPortal)
author:
  name: Changhee Park
  link: https://github.com/Appletrick
date: 2022-09-02 00:00:00 +0900
categories: [react]
description: 설명
tags: [활용, typescript, react, reactportal]
---

# React modal 창 만들기

React에서 modal 창을 만드려고 한다.

현재까지 방법은 다음과 같다

1. react portal을 이용
2. react-modal 라이브러리 이용
3. 순수하게 modal 창 만들기

이중에서 react-portal 이란 기능을 사용하기로 하였다.

# React Portal이란?

Portal 는 리액트 프로젝트에서 컴포넌트를 렌더링할때, 렌더링 위치를 사전에 선택하여 부모 컴포넌트의 바깥에 렌더링 할 수 있게 해주는 기능이다.

```tsx
...

  <body>
    <div id="root"></div>
    <div id="modal"></div>
  </body>
...
```

일반적인 React는 root div안에서 모든 컴포넌트를 생성, 활용, 재활용들을 한다.

그럼 ReactPortal은 무엇이냐? root div외부에 또 다른 div태그를 생성하여, 다른 div를 다루는 기능이다.

프로젝트로 들어가보자

<img width="266" alt="스크린샷 2022-09-02 오후 6 28 05" src="https://user-images.githubusercontent.com/31761527/188115620-49f13a42-4adb-4143-88ea-24dcd2e8d121.png">

components 폴더안에 - modal 창 폴더를 만든다.

# code로 보기

### ModalPortal.tsx

```tsx
import ReactDOM from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const modalRoot = document.getElementById("modal") as HTMLElement;
  return ReactDOM.createPortal(children, modalRoot);
};

export default ModalPortal;
```

Modal 창을 외부돔에 설정하는 제일 기본적인 코드이다.

### Modal.tsx

```tsx
import ModalPortal from "./ModalPortal";
import styled from "styled-components";
import CharacterAddModal from "./CharacterAddModal";

// 인자에서 modal 창을 닫을 수 있는 props를 가지고 온다.
type ModalProps = {
  onClose: () => void;
};

const Background = styled.div`
  z-index: 999;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: #00000033;
`;

const ModalBox = styled.div`
  width: 25rem;
  background-color: white;
`;

const Modal = ({ onClose }: ModalProps) => {
  return (
    <>
      <ModalPortal>
        <Background>
          <ModalBox>
            // 안에서 구현한 components 를 입력해준다.
            <CharacterAddModal onClose={onClose} />
          </ModalBox>
        </Background>
      </ModalPortal>
    </>
  );
};

export default Modal;
```

실제로 구현될 모달 창의 형태이다. return 의 요소로 ModalPortal.tsx가 하위 요소를 감싸주는 역할이다.

CharacterAddModal.tsx은 하위요소에서 구현될 컴포넌트이다.

onClose는 모달이 닫히는 함수이다.

### CharacterAddModal.tsx

```tsx
import { AddsCharacter } from "modules/CharacterSchedule";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

type CharacterData = {
  characterName: string;
  characterJob: string;
  characterLevel: number;
  guardianRestGage: number;
  choseDungeonRestGage: number;
};

type CharacterAddModalProps = {
  onClose: () => void;
};

const CharacterAddModal = ({ onClose }: CharacterAddModalProps) => {
  const dispatch = useDispatch();
  const onSubmit = (e: FormEvent) => {
    dispatch(
      AddsCharacter({
        CharacterName: characterData.characterName,
        Level: characterData.characterLevel,
        Job: characterData.characterJob,
        GaurdianRestGage: characterData.guardianRestGage,
        ChaosDungeonRestGage: characterData.choseDungeonRestGage,
      })
    );

    e.preventDefault();
    onClose();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCharacterData({ ...characterData, [id]: value });
  };

  const [characterData, setCharacterData] = useState<CharacterData>({
    characterName: "",
    characterJob: "",
    characterLevel: 0,
    guardianRestGage: 0,
    choseDungeonRestGage: 0,
  });

  const {
    characterName,
    characterJob,
    characterLevel,
    guardianRestGage,
    choseDungeonRestGage,
  } = characterData;

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <h3>이름</h3>
        <input
          id="characterName"
          placeholder="케릭터 이름을 입력해주세요."
          value={characterName}
          onChange={onChange}
        />
        <h3>직업</h3>
        <input
          id="characterJob"
          placeholder="케릭터 직업을 입력해주세요."
          value={characterJob}
          onChange={onChange}
        />
        <h3>레벨</h3>
        <input
          id="characterLevel"
          placeholder="케릭터 레벨을 입력해주세요."
          value={characterLevel}
          onChange={onChange}
        />
        <h3>카던 휴게</h3>
        <input
          id="guardianRestGage"
          placeholder="가디언 휴식게이지를 입력해주세요."
          value={guardianRestGage}
          onChange={onChange}
        />
        <h3>가디언토벌 휴게</h3>
        <input
          id="choseDungeonRestGage"
          placeholder="카오스던전 휴식게이지를 입력해주세요."
          value={choseDungeonRestGage}
          onChange={onChange}
        />
        <button type="submit">등록</button>
        <button onClick={onClose}>나가기</button>
      </form>
    </>
  );
};

export default CharacterAddModal;
```

하위요소 구성요소이다.

# 모달 창을 open 하는 버튼 code

AddCharacterButton.tsx

```tsx
import Modal from "components/modal/Modal";
import { useState } from "react";
import styled from "styled-components";

const AddCharacterButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const AddCharacterButton = () => {
  // 1.-------------------------
  const [ModalOpen, setModalOpen] = useState<boolean>(false);

  const modalOn = () => {
    setModalOpen(true);
  };
  const modalClose = () => {
    setModalOpen(false);
  };

  return (
    // 2.-------------------------
    <AddCharacterButtonDiv>
      <AddButton onClick={modalOn}>추가하기</AddButton>
      {ModalOpen && <Modal onClose={modalClose} />}
    </AddCharacterButtonDiv>
  );
};
```

1. useState 변수로 모달창 관리

```tsx
const [ModalOpen, setModalOpen] = useState<boolean>(false);

const modalOn = () => {
  setModalOpen(true);
};
const modalClose = () => {
  setModalOpen(false);
};
```

1. useState 변수 클릭시 modal 창 화면에 구현

```tsx
<AddButton onClick={modalOn}>추가하기</AddButton>;
{
  ModalOpen && <Modal onClose={modalClose} />;
}
```

# 참조링크

- react Portal

[https://velog.io/@song961003/React-모달-여러개-띄우기](https://velog.io/@song961003/React-%EB%AA%A8%EB%8B%AC-%EC%97%AC%EB%9F%AC%EA%B0%9C-%EB%9D%84%EC%9A%B0%EA%B8%B0)

- 리액트 포탈 모달 스크롤 막기, createPortal

[https://velog.io/@do_dadu/React에서-Modal-구현하기feat.-createPortal-스크롤-막기](https://velog.io/@do_dadu/React%EC%97%90%EC%84%9C-Modal-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0feat.-createPortal-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%A7%89%EA%B8%B0)
