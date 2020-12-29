# Hooks

Hooks는 리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공한다.

## Basic Hooks

### useState

useState는 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해준다.

useState 기능을 사용해 숫자 카운터를 구현해 보자.

```JSX
// .src/Counter.js

import React, { useState } from 'react';

const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};

export default Counter;
```

useState는 import 구문을 통해 불러오고, 다음과 같이 사용한다.

```JSX
const [상태 값, 상태 변경 함수] = useState(상태 초기값);
```

**useState 함수의 파라미터에는 상태의 초기값을 설정하고, useState 함수가 호출되면 배열을 반환하는데, 그 배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수이다.**

반환된 함수에 파라미터를 넣고 호출하면 전달받은 파라미터로 상태 값이 바뀌고 컴포넌트가 정상적으로 리렌더링된다.

하나의 useState 함수는 하나의 상태 값만 관리할 수 있기 때문에 여러 개의 상태를 관리해야 한다면 useState를 여러 번 사용해야 한다.

```JSX
// .src/Info.js

import React, { useState } from 'react';

const Info = () => {
  const [name,setName] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickName = e => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```
