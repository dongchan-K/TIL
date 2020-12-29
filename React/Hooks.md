# Hooks

Hooks는 리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공한다.

## Basic Hooks

### useState

useState는 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해준다.

useState 기능을 사용해 숫자 카운터를 구현해 보자.

```JSX
// .src/Counter.jsx

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

useState 함수의 파라미터에는 상태의 초기값을 설정하고, useState 함수가 호출되면 배열을 반환하는데, 그 배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수이다.

반환된 함수에 파라미터를 넣고 호출하면 전달받은 파라미터로 상태 값이 바뀌고 컴포넌트가 정상적으로 리렌더링된다.

#### useState 여러 번 사용하기

하나의 useState 함수는 하나의 상태 값만 관리할 수 있기 때문에 여러 개의 상태를 관리해야 한다면 useState를 여러 번 사용해야 한다.

```JSX
// .src/Info.jsx

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

### useEffect

useEffect는 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook 이다.

useEffect는 import 구문을 통해 불러오고, 다음과 같이 사용한다.

```JSX
useEffect(할 일, 시점);
```

**useEffect의 시점(의존성)을 아는것이 중요하다!!**

🎯 useEffect 참고 자료 : https://rinae.dev/posts/a-complete-guide-to-useeffect-ko

기존에 만들었던 Info 컴포넌트에 useEffect를 적용해보자.

```JSX
// .src/Info.jsx

import React { useState, useEffect } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickName, setNickname] = useState('');

  useEffect(() => {
    console.log('componentDidMount & componentDidUpdate');
    console.log({
      name,
      nickname
    });
  });

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
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

useEffect 함수의 두 번째 인자를 생략한다면 componentDidMount와 componentDidUpdate를 합친 형태와 비슷하다.

#### 마운트될 때만 실행하고 싶을 때

useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음에 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 두 번째 인자로 빈 배열을 넣어주면 된다.

```JSX
useEffect(() => {}, [])
```

기존 Info 컴포넌트의 useEffect 코드를 변경해보자.

```JSX
useEffect(() => {
  console.log('componentDidMount');
}, []);
```

#### 특정 값이 업데이트될 때만 실행하고 싶을 때

특정 값이 업데이트 될때만 호출하고 싶다면, useEffect의 두 번째 인자로 특정 값을 배열안에 넣어주면 된다.

배열 안에는 useState를 통해 관리하고 있는 상태를 넣어도 되고, props로 전달받은 값을 넣어도 된다.

```JSX
useEffect(() => {}, [특정 값]);
```

기존 Info 컴포넌트의 useEffect 코드를 변경해보자.

```JSX
useEffect(() => {
  console.log(name);
}, [name]);
```

#### 뒷정리하기

useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다.

컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect에서 뒷정리(cleanup) 함수를 반환해 주어야 한다.

기존 Info 컴포넌트의 useEffect 코드를 변경해보자.

```JSX
useEffect(() => {
  console.log('effect');
  console.log(name);

  return () => {
    console.log('cleanup');
    console.log(name);
  };
});
```

App 컴포넌트에서 Info 컴포넌트의 가시성을 바꿀 수 있게 해 보자.

```JSX
// .src/App.js

import React, { useState } from 'react';
import Info from './Info';

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => {
        setVisible(!visible);
      }}>
        {visible ? '숨기기' : '보이기'}
      </button>
      <hr />
      {visible && <Info />}
    </div>
  )
}
```

useEffect 함수의 두 번째 인자를 생략한다면, 렌더링될 때마다 뒷정리 함수가 계속 나타나게 된다. 그리고 뒷정리 함수가 호출될 때는 업데이트되기 직전의 값을 보여준다.

오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두 번째 인자에 비어있는 배열을 넣어주면 된다.

기존 Info 컴포넌트의 useEffect 코드를 변경해보자.

```JSX
useEffect(() => {
  console.log('effect');
  console.log(name);

  return () => {
    console.log('cleanup');
    console.log(name);
  };
}, []);
```

특정 상태가 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두 번째 인자의 배열 안에 특정 값을 넣어주면 된다.

```JSX
useEffect(() => {
  console.log('effect');
  console.log(name);

  return () => {
    console.log('cleanup');
    console.log(name);
  }
}, [name]);
```

## Additional Hooks

### useReducer

useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트할 경우 사용하는 Hook 이다.

리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달받아 새로운 상태를 반환하는 함수이다.

리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜야한다.

```JSX
const [state, dispatch] = useReducer(reducer, initialState)
```

#### useReducer를 이용한 카운터 구현

useReducer를 사용하여 기존의 Counter 컴포넌트를 다시 구현해보자.

```JSX
// .src/Counter.jsx

import React, { useReducer } from 'react';

function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch(action.type) {
    case: 'INCREMENT':
      return { value: state.value + 1 };
    case: 'DECREMENT':
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );
};

export default Counter;
```

useReducer의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본 값을 넣어준다.

이 Hook을 사용하면 state 값과 dispatch 함수를 받아 온다.

state는 현재 가리키고 있는 상태이고, dispatch는 액션을 발생시키는 함수이다.

dispatch(action) 과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조이다.

useReducer를 사용했을 때 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 뺄 수 있다는 것이다.

기존 App.js 를 수정해보자.

```JSX
import React from 'react';
import Counter from './Counter';

const App = () => {
  return <Counter />;
};

export default App;
```

#### useReducer를 이용한 input 상태 관리

기존 Info 컴포넌트 코드를 수정해보자.

```JSX
// .src/Info.jsx

import React, { useReducer } from 'react';

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    nickname: '',
  });
  const { name, nickname } = state;
  const onChange = e => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={change} />
        <input name="nickname" value={nickname} onChange={change} />
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

useReducer에서의 액션은 어떤 값도 사용 가능하다.

기존 App.js를 수정해보자.

```JSX
// .src/App.js

import React from 'react';
import Info from './Info';

const App = () => {
  return <Info />;
};

export default App;
```
