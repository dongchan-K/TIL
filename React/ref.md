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
