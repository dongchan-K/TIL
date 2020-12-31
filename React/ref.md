# ref

리액트에서 특정 DOM에 직접적으로 건드려야 할 때 ref를 사용한다.

- 특정 input에 포커스 주기
- 스크롤 박스 조작하기
- Canvas 요소에 그림 그리기 등...

ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동한다.

## ref 사용

### 콜백 함수를 통한 ref 설정

1. ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달한다.

2. 콜백 함수는 ref 값을 파라미터로 전달받아 함수 내부에서 ref를 컴포넌트의 멤버 변수로 설정한다.

예시로 살펴보자.

```JSX
// ref의 이름은 this.free=ref 처럼 자유롭게 지정 가능하다.
<input ref={(ref) => {this.input=ref}} />
```

### createRef를 통한 ref 설정

리액트 내장 함수인 createRef를 사용하여 ref를 만들수 있다.

1. 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아 주어야 한다.

2. 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어준다.

3. ref를 설정한 DOM에 this.input.current와 같이 .current를 조회한다.

예시로 살펴보자.

```JSX
import React, { Component } from 'react';

export default class RefSample extends Component {
  input = React.createRef();

  handleFocus = () => {
    this.input.current.focus();
  }

  render() {
    return (
      <div>
        <input ref={this.input} />
      </div>
    );
  }
}
```

## 컴포넌트에서 ref 사용

이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 사용한다.

### 1. 사용법

아래와 같이 컴포넌트에 ref를 props로 지정하면 MyComponent 내부의 메서드 및 멤버 변수에도 접근할 수 있다.

ex) myComponent.handleClick, myComponent.input 등...

```JSX
<MyComponent ref={(ref) => {this.myComponent=ref}} />
```

### 2. 컴포넌트 초기 설정

ScrollBox 컴포넌트를 만들어보자.

```JSX
// .src/ScrollBox.jsx
import React, { Component } from 'react';

export default class ScrollBox extends Component {
  render() {
    const style = {
      border: '1px solid black',
      height: '300px',
      width: '300px',
      overflow: 'auto',
      position: 'relative'
    };

    const innerStyle = {
      width: '100%',
      height: '650px',
      background: 'linear-gradient(white, black)'
    }

    return (
      <div style={style} ref={(ref) => {this.box=ref}}>
        <div style={innerStyle} />
      </div>
    );
  }
}
```

App 컴포넌트에서 ScrollBox 컴포넌트를 렌더링 해보자.

```JSX
// .src/App.js

import React, { Component } from 'react';
import ScrollBox from './ScrollBox';

class App extends Compoent {
  render() {
    return (
      <div>
        <ScrollBox />
      </div>
    );
  }
}

export default App;
```

### 3. 컴포넌트에 메서드 생성

ScrollBox 컴포넌트에 스크롤바를 맨 아래로 내리는 메서드를 추가해보자.

```JSX
// .src/ScrollBox.jsx

import React, { Component } from 'react';

export default class ScrollBox extends Component {

  scrollToBottom = () => {
    const { scrollHeight, clientHeight } = this.box;

    this.box.scrollTop = scrollHeight - clientHeight;
  }

  render () {
    ...
  }
}
```

### 4. 컴포넌트에 ref 달고 내부 메서드 사용

App 컴포넌트에서 ScrollBox 컴포넌트에 ref를 달고 버튼을 만들어보자.

```JSX
// .src/App.js
import React, { Component } from 'react';
import ScrollBox from './ScrollBox';

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={(ref) => this.scrollBox=ref} />
        <button onClick={() => this.scrollBox.scrollToBottom()}>
        맨 밑으로
        </button>
      </div>
    );
  }
}

export default App;
```

서로 다른 컴포넌트끼리 데이터를 교류할 때 ref를 사용하는 것이 아니라는 점을 주의하자.

이는 redux 혹은 Context API를 사용하여 효율적으로 데이터를 교류할 수 있다.
