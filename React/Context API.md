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

## 동적 Context 사용하기

Context의 값을 동적으로 업데이트해야 하는 경우 어떻게 해야 하는지 알아보자.

### 1. Context 파일 수정하기

Context의 value에는 상태 값 뿐만 아니라 함수를 전달해 줄 수 있다.

기존에 작성한 ColorContext의 코드를 수정해보자.

```JSX
// .src/contexts/color.js

import React, { createContext, useState } from 'react';

const ColorContext = createContext({
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubColor: () => {}
  }
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor }
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { Consumer: ColorConsumer } = ColorContext;

export { ColorProvider, ColorConsumer };

export default ColorContext;
```

### 2. Context를 프로젝트에 반영하기

새로 작성된 Context를 프로젝트에 반영해보자.

```JSX
// App.js

import React from 'react';
import ColorBox from './components/ColorBox';
import { ColorProvider } from './contexts/color';

const App = () => {
  return (
    <ColorProvider>
      <div>
        <ColorBox />
      </div>
    </ColorProvider>
  );
};

export default App;
```

```JSX
// .src/components/ColorBox.jsx

import React from 'react';
import { ColorConsumer } from '../contexts/color';

const ColorBox = () => {
  return (
    <ColorConsumer>
      {({ state }) => (
        <>
          <div
            style={{
              width: '64px',
              height: '64px',
              background: state.color
            }}
          />
          <div
            style={{
              width: '32px',
              height: '32px',
              background: state.subcolor
            }}
          />
        </>
      )}
    </ColorConsumer>
  );
};

export default ColorBox;
```

### 3. 색상 선택 컴포넌트 만들기

Context의 actions에 넣어 준 함수를 호출하는 컴포넌트를 만들어 보자.

onContextMenu 이벤트는 마우스 오른쪽 클릭 이벤트이다.

```JSX
// .src/components/SelectColor.jsx

import React from 'react';
import { ColorConsumer } from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'blue', 'green', 'tomato', 'indigo', 'violet'];

const SelectColors = () => {
  return (
    <div>
      <h2>색상을 선택하세요.</h2>
      <ColorConsumer>
        {({ actions }) => (
          <div style={{ display: 'flex' }}>
            {colors.map(color => (
              <div
                key={color}
                style={{ background: color, width: '24px', height: '24px', cursor: 'pointer' }}
                onClick={() => actions.setColor(color)}
                onContextMenu={e => {
                  e.preventDefault();
                  actions.setSubcolor(color);
                }}
              />
            ))}
          </div>
        )}
      </ColorConsumer>
      <hr />
    </div>
  );
};

export default SelectColors;
```

App에 SelectColors 컴포넌트를 추가해보자.

```JSX
// App.js

import React from 'react';
import ColorBox from './components/ColorBox';
import { ColorProvider } from './contexts/color';
import SelectColors from './components/SelectColors';

const App = () => {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
  );
};

export default App;
```

## Consumer 대신 Hook 또는 static contextType 사용하기

### 1. useContext Hook 사용하기

useContext Hook을 사용하면 함수형 컴포넌트에서 Context를 편하게 사용할 수 있다.

ColorBox 컴포넌트를 수정해보자.

```JSX
// .src/components/ColorBox.jsx

import React, { useContext } from 'react';
import ColorContext from '../contexts/color';

const ColorBox = () => {
  const { state } = useContext(colorContext);

  return (
    <>
      <div
        style={{
          width: '64px',
          height: '64px',
          background: state.color
        }}
      />
      <div
        style={{
          width: '32px',
          height: '32px',
          background: state.subColor
        }}
      />
    </>
  );
};

export default ColorBox;
```

### 2. static contextType 사용하기

static contextType을 정의하면 클래스형 컴포넌트에서 Context를 편하게 사용할 수 있다.

장점 : 클래스 메서드에서도 Context에 넣어 둔 함수를 호출할 수 있다.

단점 : 한 클래스에서 하나의 Context밖에 사용하지 못한다.

SelectColor 컴포넌트를 수정해보자.

```JSX
// .src/components/SelectColors.jsx

import React, { Component } from 'react';
import ColorContext from '../context/color';

const colors = ['red', 'orange', 'yellow', 'blue', 'green', 'tomato', 'indigo', 'violet'];

class SelectColors extends Component {
  static contextType = ColorContext;

  handleSetColor = color => {
    this.context.actions.setColor(color);
  };
  handleSetSubcolor = color => {
    this.context.actions.setSubColor(subcolor);
  };

  render () {
    return (
      <div>
        <h2>색상을 선택하세요.</h2>
        <div style={{ display: flex }}>
        {colors.map(color => (
          <div
            key={color}
            style={{
              background: color,
              width: '24px',
              height: '24px',
              cursor: 'pointer'
            }}
            onClick={() => this.handleSetColor(color)}
            onContextMenu={e => {
              e.preventDefault();
              this.handleSetSubcolor(color);
            }}
          />
        ))}
      </div>
    );
  }
}
```

🎯 참고 서적 : 리액트를 다루는 기술
