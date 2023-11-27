---
title: Custom Checkbox 만들기(React, styled-componet, Typescript)
author: Changhee Park
date: 2022-09-01 00:00:00 +0900
categories: [Ts]
tags: [활용, typescript, react, styled-componenet]
---

> 이글에 작성되는 내용은 아래와 같은 라이브러리,프레임워크를 사용합니다

- React
- TypeScript
- styledcomponent
- react-icon
- react-redux (dispatch를 사용하는 경우)

# 완성된 결과물

단순 체크 버튼만 있는 버튼

![숫자없음](https://user-images.githubusercontent.com/31761527/187896149-45114df8-e229-4444-a085-973e35d95f5f.gif)

체크가 되기전에 정보가 있는 버튼

![숫자있음](https://user-images.githubusercontent.com/31761527/187896135-34bdb191-56d8-47f0-a16a-bc7994eb2282.gif)

코드에 정답은 없고 이 코드 또한 기록과 참고용을 사용되었으면 싶습니다.

### 컴포넌트 생성과 라이브러리 등록하기

```tsx
import styled from "styled-components";

const CheckboxButton = () => {
  return <></>;
};

export default CheckboxButton;
```

처음에 기본적인 컴포넌트를 등록해주고 styled-components 라이브러리를 추가해줍니다.

### Props를 받아올경우

```tsx
import styled from "styled-components";

// props 를 받지 않을경우 삭제해도 무방합니다.
type CheckBoxButtonProps = {
  isDone: boolean;
  RestGage?: number;
};

// props 가 필요 없을경우 인자가 없어도 무방합니다.
const CheckboxButton = ({ isDone, RestGage }: CheckBoxButtonProps) => {
  return <></>;
};

export default CheckboxButton;
```

매개변수에서 받아올 타입선언을 해줍니다.

### CheckButton Div 만들어주기

input checkBox를 만들어도 되지만, 안에 react-icon을 넣어서 구현하려니, TypeScript에서 이상한 타입 넣지 말라고 해서 화나서 div로 CheckButton을 만들었습니다.

```tsx
import { AiOutlineCheck } from "react-icons/ai";
```

react-icons 를 추가해주고 싶은 요소를 import 해줍시다.

```tsx
const Check = styled.div`
  height: 30px;
  width: 30px;
  background-color: #d5d5d5;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;

const Icon = styled.span`
  font-size: 1em;
`;
```

styled-component div 요소를 만들어주고 , react-icon이 들어올 span요소도하나 생성해줍니다.

```tsx
import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";

const Check = styled.div`
  height: 30px;
  width: 30px;
  background-color: #d5d5d5;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;

const Icon = styled.span`
  font-size: 1em;
`;

type CheckBoxButtonProps = {
  isDone: boolean;
  RestGage?: number;
};

const CheckboxButton = ({ isDone, RestGage }: CheckBoxButtonProps) => {
  return (
    <Check>
      <Icon>
        <AiOutlineCheck />
      </Icon>
    </Check>
  );
};

export default CheckboxButton;
```

### props를 이용하여 체크버튼을 구현해봅시다.

각각의 props의 정보를 useState로 만들어도 무방합니다.

props의 요소의 역할은 다음과 같습니다.

- isDone : 체크가 되어있는지 안되어있는지 확인할 요소
- RestGage : 체크가 되기전에 표기될 항목입니다.

```tsx
const CheckboxButton = ({ isDone, RestGage }: CheckBoxButtonProps) => {
  const [isRestGage] = useState<undefined | number>(RestGage);

  return (
    <Check>
      <Icon>
        {isDone ? (
          <AiOutlineCheck fontSize={"2em"} />
        ) : isRestGage !== undefined ? (
          `${isRestGage}`
        ) : (
          ""
        )}
      </Icon>
    </Check>
  );
};
```

useState로 RestGage의 값이 undifined일 경까지 생각해서 값을 변경해줍니다.

isDone 체크 여부에 따라 보여줄 요소를 정의해줍니다.

코드 해석

```tsx
if(isDone){
	return <AiOutlineCheck fontSize={"2em"} />
}else{
	if(isRestGage !=== undefined){
		return `${isRestGage}`
	}else {
		return ""
	}
}
```

체크가 되어있을경우 `<AiOutlineCheck fontSize={"2em"} />` 를 리턴시키고

체크가 안되있을때, )

- 표기될 값이 있을경우 `${isRestGage}` 값을 표기시키고
- 표기되 값이 없을경우 `“”` 아무값도 표기하지 않습니다.

### styled-component에 isDone 체크값과, 누를시 작동하는 함수를 구현해줍시다.

```tsx
const CheckboxButton = ({ isDone, RestGage }: CheckBoxButtonProps) => {
  const [isRestGage] = useState<undefined | number>(RestGage);
  // 1. useState를 사용한다면 이런 식으로 해줍시다.
  // const [isDone, setIsDone] = useState<boolean>(false);

  // 2. redux를 사용하는 경우
  const dispatch = useDispatch();

  // 클릭시 작동되는 함수
  const onClick = () => {
    // 1. useState를 사용한다면 이런 식으로 해줍시다.
    // setIsDone(!isDone)

    // 2 .redux를 사용하는 경우
    dispatch(
      IsDone_Toggle({
        IsDone: !isDone,
        ItemName: ItemName,
        ID: ID
      })
    );
  };

  return (
    <Check isChecked={isDone} onClick={onClick}>
      <Icon>
        {isDone ? (
          <AiOutlineCheck fontSize={"2em"} />
        ) : isRestGage !== undefined ? (
          `${isRestGage}`
        ) : (
          ""
        )}
      </Icon>
    </Check>
  );
};
```

- Check Div 부분 수정해주기

```tsx
const Check = styled.div<{ isChecked: boolean }>`
  height: 30px;
  width: 30px;
  background-color: ${(props) => (props.isChecked ? "#5bcd3e" : "#d5d5d5")};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;

  &:hover {
    background-color: ${(props) => (props.isChecked ? "#2d7c19" : "#a5a5a5")};
  }
`;
```

Check Div 가 props를 받기때문에 Typescript를 정의해주고 props를 받아와 체크될시 background를 바꿔주고 hover 요소도 추가해줍니다.

## 완성된 코드 (redux를 사용하는 경우)

```tsx
import styled from "styled-components";
import {AiOutlineCheck} from 'react-icons/ai'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IsDone_Toggle } // 알아서 가져오기!

const Check = styled.div<{isChecked : boolean}>`
    height: 30px;
    width: 30px;
    background-color: ${(props) => props.isChecked ? "#5bcd3e" : "#d5d5d5"};
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;

    &:hover{
        background-color: ${(props) => props.isChecked ? "#2d7c19" : "#a5a5a5"};
    }
`
const Icon = styled.span`
    font-size: 1em;
`

type CheckBoxButtonProps = {
    isDone: boolean
    RestGage?: number
}

const CheckboxButton = ({isDone , RestGage} : CheckBoxButtonProps) => {
    const [isRestGage] = useState<undefined | number>(RestGage);

    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(IsDone_Toggle(
            {
                IsDone: !isDone,
            }
        ))
    }

    return (
        <Check isChecked={isDone} onClick={onClick} >
            <Icon>
                {isDone ? <AiOutlineCheck fontSize={"2em"} /> : isRestGage !== undefined ? `${isRestGage}` : ""}
            </Icon>
        </Check>
    )
}

export default CheckboxButton;
```

## 완성된 코드 ( useState를 사용하는 경우)

```tsx
import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";
import { useState } from "react";

const Check = styled.div<{ isChecked: boolean }>`
  height: 30px;
  width: 30px;
  background-color: ${(props) => (props.isChecked ? "#5bcd3e" : "#d5d5d5")};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;

  &:hover {
    background-color: ${(props) => (props.isChecked ? "#2d7c19" : "#a5a5a5")};
  }
`;
const Icon = styled.span`
  font-size: 1em;
`;

type CheckBoxButtonProps = {
  isDone: boolean;
  RestGage?: number;
};

const CheckboxButton = ({ isDone, RestGage }: CheckBoxButtonProps) => {
  const [isRestGage, setIsRestGage] = useState<undefined | number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  const onClick = () => {
    setIsDone(!isDone);
  };

  return (
    <Check isChecked={isDone} onClick={onClick}>
      <Icon>
        {isDone ? (
          <AiOutlineCheck fontSize={"2em"} />
        ) : isRestGage !== undefined ? (
          `${isRestGage}`
        ) : (
          ""
        )}
      </Icon>
    </Check>
  );
};

export default CheckboxButton;
```

# 후기

react , TS, styled-components , React-Icons 를 이용해서 커스텀 체크박스를 만드려는데 안나와서 이렇게 만들었습니다.. 좀 더 많은 지식이 널리 퍼져서 제가 나중에 삽질 안하기를 바라며
