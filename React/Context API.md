# Context API

Context API는 리액트에서 전역으로 사용할 데이터가 있을 때 유용하다.

- 로그인 정보
- 애플리케이션 환경 설정
- 테마 등...

## Context API의 전역 상태 관리 흐름

일반적으로 리액트는 컴포넌트 간의 데이터를 props로 전달하기 때문에 여기저기서 필요한 데이터가 있을 경우 주로 최상위 컴포넌트인 App의 state에서 관리한다.

![React global state](https://user-images.githubusercontent.com/67866773/103433012-066d5580-4c2d-11eb-8f77-142b41b42d8f.PNG)

이러한 방식은 하나하나 컴포넌트를 거치기 때문에 유지 보수성이 낮아진다.

Context API를 사용하면 Context를 만들어 단 한번에 원하는 값을 받아와서 사용할 수 있다.

![React ContextAPI](https://user-images.githubusercontent.com/67866773/103433013-079e8280-4c2d-11eb-8fd7-72b7af27774f.PNG)

## Context API 사용

### 1. 새 Context 만들기

Context API를 사용해 데이터를 set 하기 위해서는 다음과 같은 순서를 따른다.

- createContext 함수를 통해 Context 생성 및 value값 설정

createContext 함수를 사용해 Context를 만들어보자

```JSX
// .src/contexts/color.js

import { createContext } from 'react';

const ColorContext = createContext({ color: 'black' });

export default ColorContext;
```

### 2. Consumer 사용하기

Consumer를 사용해 데이터를 get하기 위해서는 다음과 같은 순서를 따른다.

- Context를 가져온다
- Context.Consumer를 사용한다
- Consumer 내부에서 함수를 통해 value 접근

ColorContext 안에 들어있는 Consumer 컴포넌트를 통해 색상을 조회해보자.

```JSX
// .src/component/ColorBox.jsx

import React from 'react';
import ColorContext from '../contexts/color';

const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {value => (
        <div
          style={{
            width: '64px',
            height: '64px',
            background: value.color
          }}
        />
      )}
    </ColorContext.Consumer>
  );
};

export default ColorBox;
```

App에서 렌더링해보자.

```JSX
// App.js

import React from 'react';
import ColorBox from './components/ColorBox';

const App = () => {
  return (
    <div>
      <ColorBox />
    </div>
  );
};

export default App;
```

### 3. Provider

Provider를 사용하면 Context의 value를 변경할 수 있다.

- Context.Provider 사용
- Provider에 value값 명시

Provider를 사용해 Context의 value를 변경해보자.

```JSX
// App.js

import React from 'react';
import ColorBox from './components/ColorBox';
import ColorContext from './contexts/color';

const App = () => {
  return (
    <ColorContext.Provider value={ color: 'red' }>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
};
```

🎯 참고 서적 : 리액트를 다루는 기술
