# Component Styling

**리액트는 스타일이 스코핑되지 않는다는 단점을 갖는다.** 때문에 아래와 같은 문제를 야기할 수 있다.

- 클래스의 중복
- 네임스페이스의 오염

리액트에서 컴포넌트를 스타일링할 때는 다양한 방식을 사용할 수 있다.

자주 사용하는 스타일링 방식을 알아보자.

## Style Loaders

[Webpack](https://webpack.js.org/)은 import 구문을 만나면 나누어진 모듈들을 묶어(번들링 하여) 파일 확장자에 맞는 loader에게 위임한다.

![loader](https://user-images.githubusercontent.com/67866773/102732875-25dbc700-437f-11eb-9e9d-ef515cb75f0c.PNG)

[CRA(Create React App)](https://github.com/dongchan-K/TIL/blob/master/React/React%20Basic.md#create-react-appcra)를 이용하여 리액트 프로젝트 생성 시, 기본적으로 css, sass, module loader가 내장 되어있다.

CRA에서 지원하지 않는 확장자를 변경하고 싶거나, 수동으로 설정을 변경하고 싶을 때는 eject 명령어를 사용하여 CRA 내장 되어있는 모든 파일을 꺼내 변경할 수 있다.

`npm run eject`

-> eject 시 CRA로 돌아갈 수 없다. 즉, CRA의 새로운 기능을 사용할 수 없게 되며 설정에 대한 지원을 받을 수 없으므로 주의하자.

- css loader 설정

![eject](https://user-images.githubusercontent.com/67866773/102733752-6ccabc00-4381-11eb-9aa6-1f5850a94668.PNG)

`import './App.css';`

- css module loader 설정

![cssMoudle](https://user-images.githubusercontent.com/67866773/102734035-27f35500-4382-11eb-8da9-b9e2abd55485.PNG)

`import styles from './App.module.css';`

- sass loader 설정

![sass](https://user-images.githubusercontent.com/67866773/102734037-288beb80-4382-11eb-955b-83d1f7929ed8.PNG)

```
import './App.scss';
import './App.sass';
```

- sass module loader 설정

![sass module](https://user-images.githubusercontent.com/67866773/102734039-29248200-4382-11eb-8155-28162e46f1d0.PNG)

```
import styles from './App.module.scss';
import styles from './App.module.sass';
```

## CSS, SASS

두 방법을 나누는 기준은 아래와 같다.

- 특별한 규칙을 따르겠다 : CSS
- 구조화된 클래스 관리를 하겠다 : SCSS

### CSS

CSS를 작성할 때 가장 중요한 점은 클래스를 중복되지 않게 만드는 것이다.

- 클래스 이름을 지을 때 특별한 규칙(네이밍 컨벤션)을 사용한다
- CSS Selector를 활용한다

#### 네이밍 컨벤션

네이밍 컨벤션 방법론 중 하나로 [BEM](http://getbem.com/naming/) 이 있다.

BEM은 이름을 지을 때 일종의 규칙을 준수하여 해당 클래스가 어디에서 어떤 용도로 사용되는지 명확하게 작성하는 방식이다.

- 아래는 BEM 네이밍 예시

![BEM html](https://user-images.githubusercontent.com/67866773/102735211-2aa37980-4385-11eb-8c36-de922dbfb665.PNG)

![BEM CSS](https://user-images.githubusercontent.com/67866773/102735213-2b3c1000-4385-11eb-83f7-6092cc78e3b3.PNG)

#### CSS Selector

CSS Selector를 사용하면 CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있다.

- 아래는 CSS Selector 예시

![CSS Selector html](https://user-images.githubusercontent.com/67866773/102735411-c59c5380-4385-11eb-952d-f7ec4b23f430.PNG)

![CSS Selector css](https://user-images.githubusercontent.com/67866773/102735412-c634ea00-4385-11eb-994a-af802a9fa16f.PNG)

### SASS

[SASS](https://github.com/dongchan-K/TIL/blob/master/CSS/Sass%20Basic.md)는 CSS pre-processor(전처리기)로서 CSS의 한계와 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS의 확장이다.

SASS 에는 SCSS 표기법, SASS 표기법이 있지만 좀 더 CSS와 유사한 SCSS 사용법을 사용하자. -> 확장자를 .scss로 사용

SASS를 CSS로 컴파일 해주는 [node-sass](https://www.npmjs.com/package/node-sass) 라이브러리를 설치하자.

`npm install node-sass@4.14.1`

- 아래는 scss 예시

![scss html](https://user-images.githubusercontent.com/67866773/102738319-15324d80-438d-11eb-8f07-e15e22076625.PNG)

![scss css](https://user-images.githubusercontent.com/67866773/102738321-15cae400-438d-11eb-8874-1f253eea26ea.PNG)

## CSS Module & SASS Module

### CSS Module

**CSS Module은 CSS를 불러와서 사용할 때 클래스 이름을 고유한 값인 [파일이름]\_[클래스 이름]\_\_[해시값]** 형태로 자동으로 만들어 클래스 이름의 중첩을 방지해 주는 기술이다.

CSS Module은 확장자를 .module.css로 설정해 주어야 한다.

CSS Module 사용시 클래스 이름을 지을 때 고유성에 대해 고민하지 않아도 된다는 장점이 있다.

- 아래는 CSS Module 예시

![module css html](https://user-images.githubusercontent.com/67866773/102739423-7e679000-4390-11eb-91a8-8e3cd307c2e4.PNG)

![module css css](https://user-images.githubusercontent.com/67866773/102739424-7f002680-4390-11eb-9524-e358e029f848.PNG)

CSS Module이 적용된 스타일 파일을 불러오면 CSS Module에서 사용한 클래스 이름과 해당 이름을 고유화한 값이 key-value 형태를 갖는 객체를 전달한다.

아래와 같이 확인해보자.

![object css module](https://user-images.githubusercontent.com/67866773/102739629-fc2b9b80-4390-11eb-86ea-fc2f04ab6361.PNG)

![object css module2](https://user-images.githubusercontent.com/67866773/102739631-fcc43200-4390-11eb-8896-999385901597.PNG)

고유한 클래스 이름을 사용하려면 JSX 엘리먼트에 className={styles.[클래스 이름]} 형태로 전달해 주면 된다.

```JSX
<div className={styles.App}></div>
```

:global을 사용하여 전역으로 선언한 클래스는 그냥 문자열로 전달하면 된다.

```JSX
<div className="App"></div>
```

CSS Module을 사용한 클래스 이름을 두 개 이상 적용할 때는 템플릿 리터럴을 이용하면 된다.

```JSX
<div className={`${styles.App} ${styles.logo}`}></div>
```

### Classnames

**[classnames](https://www.npmjs.com/package/classnames)는 css 클래스를 조건부로 설정하거나 여러 클래스를 적용할 때 매우 유용한 라이브러리이다.**

classnames 라이브러리를 설치하자.
` npm i classnames`

설치가 완료되었다면 classnames의 기본적인 사용법을 알아보자.

```JSX
import classNames from 'classnames';

console.log(classNames('one', 'two')); // 'one two'

console.log(classNames('one', { two: true })); // 'one two'

console.log(classNames('one', { two: false })); // 'one'

console.log(classNames('one', ['two', 'three'])); // 'one two three'

const myClass = 'hello';

console.log(classNames('one', myClass, { myCondition: true })); // 'one hello myCondition'
```

여러 파라미터를 조합해 CSS 클래스를 설정할 수 있기 때문에 조건부로 클래스를 설정할 때 매우 편리하다.

**클래스를 입력받아 truthy 값만 추출한다.**

```JSX
import classNames from 'classnames';

console.log(classNames('foo', 'bar')); // "foo bar"
console.log(classNames('foo', 'bar', 'baz')); // "foo bar baz"

console.log(classNames({ foo: true }, { bar: true })); // "foo bar"
console.log(classNames({ foo: true }, { bar: false })); // "foo"
console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')); // "bar 1"
console.log(classNames(styles.button, styles.loading)); // Button_button__2Ce79 Button_loading__XEngF
```

```JSX
// Button.jsx
import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

export default class Button extends React.Component {
  state = {
    loading: false
  };

  startLoading = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    const { loading } = this.state;
    retrun (
      <button
        className={
          loading ? className(styles.button, styles.loading) : styles.button
        }
        onClick={this.startLoading}
      />
    );
  }
}
```

**classnames에 내장되어 있는 bind 함수를 사용하면 작성한 클래스 이름으로 바인딩 해준다.**

```JSX
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

console.log(cx('button', 'loading')); // Button_button__2Ce79 Button_loading__XEngF
console.log(cx('button', { loading: false })); // Button_button__2Ce79
```

```JSX
import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Button extends React.Component {
  state = {
    loading: false,
  };

  startLoading = () => {
    console.log('start');
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    const { loading } = this.state;
    return (
      <button
        className={cx('button', { loading })}
        onClick={this.startLoading}
      />
    );
  }
}
```

### SASS Module

SASS Module을 사용할 때도 확장자를 .module.scss 설정해 주어야 한다는 점을 제외하면 CSS Module과 동일하다.

## Style Components

**컴포넌트 스타일의 또 다른 방법은 자바스크립트 파일 안에 스타일을 선언하는 방식이 있다.**

이 방식을 'CSS-in-JS'라고 부른다.

대표적인 'CSS-in-JS' 방식의 라이브러리인 [styled-components](https://github.com/styled-components/styled-components)와 [emotion](https://github.com/emotion-js/emotion) 중 styled-components를 사용해보자.

styled-components를 설치해보자.

`npm i styled-components`

styled-components를 사용하면 자바스크립트 파일 하나에 스타일까지 작성할 수 있기 때문에 별도의 css 파일을 만들지 않아도 된다는 장점이 있다.

`import styled from 'styled-component`

styled-components의 여러가지 기능들에 대해 알아보자.

### 스타일링된 엘리먼트 만들기

컴포넌트 상단에서 styled를 불러오고, styled.`태그명`을 사용하면 엘리먼트를 만들 수 있다.

`(백틱)으로 감싼 문법을 Tagged 템플릿 리터럴이라고 부른다.

styled.div 뒤에 Tagged 템플릿 리터럴 문법을 통해 스타일을 넣어주면 해당 스타일이 적용된 div 리액트 컴포넌트가 생성된다.

```JSX
// components/StyleButton.jsx
import styled from 'styled-components';

const StyleButton = styled.button`
background: transparent;
border-radius: 3px;
border: 2px solid palevioletred;
color: palevioletred;
margin: 0 1em;
padding: 0.25em 1em;
`;

export default StyledButton;
```

```JSX
// App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <StyledButton>버튼</StyledButton>
        </p>
      </header>
    </div>
  );
}

export default App;
```

![styled 태그`스타일`](https://user-images.githubusercontent.com/67866773/102793736-aa652e80-43ed-11eb-9037-6a75be7dc6e6.PNG)

### 스타일에서 props 조회

styled-components를 사용하면 스타일 쪽에서 컴포넌트에게 전달된 props 값을 참조할 수 있다.

```JSX
// components/StyledButton
import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${props => props.color || 'palevioletred'};
  color: ${props => props.color || 'palevioletred'};
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 1em;
`;

export default StyledButton;
```

```JSX
// App.js
import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton>button</StyledButton>
        <StyledButton color="red">red button</StyledButton>
        <StyledButton color="green">green button</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

![스타일에서 props 조회](https://user-images.githubusercontent.com/67866773/102841717-d366dd00-4448-11eb-93f7-340a19687d83.PNG)

### props에 따른 조건부 스타일링

스타일 코드 여러 줄을 props에 따라 넣어 주어야 할 때는 css 를 styled-components에서 불러와야 한다.

`import styled, { css } from 'styled-component';`

```JSX
// components/StyledButton.jsx
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

export default StyledButton;
```

```JSX
// App.js
import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return(
    <div className="App">
    <p>
        <StyledButton>버튼</StyledButton>
        <StyledButton primary>Primary 버튼</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

![styled-components props](https://user-images.githubusercontent.com/67866773/102838769-559fd300-4442-11eb-883a-5bf9cbc6cf66.PNG)

### as="태그" as={컴포넌트} 활용

as="태그" 를 사용하면 styled-components로 생성된 컴포넌트의 태그를 변경할 수 있다.

```JSX
// components/StyledButton.jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 1em;
  display: inline-block;

  text-decoration: none;
`;

export default StyledButton;
```

```JSX
// App.js
import React from 'react';
import StyledButton from './components/StyledButton';

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton as="a" href="/">
          a 태그 버튼
        </StyledButton>
        <StyledButton>버튼</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

![as 를 활용한 태그 변경](https://user-images.githubusercontent.com/67866773/102840284-d90ef380-4445-11eb-8c81-326f08d9c491.PNG)

as={컴포넌트} 를 사용하면 styled-components로 생성된 컴포넌트에 특정 기능을 넣을 수 있다.

```JSX
// components/StyledButton.jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 1em;
  display: inline-block;
`;

export default StyledButton;
```

```JSX
// App.js
import React from 'react';
import StyledButton from './components/StyledButton';

const UppercaseButton = props => (
  <button {...props} children={props.children.toUpperCase()} />
);

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton as={UppercaseButton}>button</StyledButton>
        <StyledButton>button</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

![as를 활용한 컴포넌트](https://user-images.githubusercontent.com/67866773/102841007-6c94f400-4447-11eb-8667-df138e6fac93.PNG)

## React Shadow

[Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components)을 이용한 리액트 스타일링으로서 개별 스코핑을 지원하는 라이브러리이다.

[React Shadow](https://www.npmjs.com/package/react-shadow)

설치 명령어는 다음과 같다.

`npm i react-shadow`

설치가 완료되었다면 라이브러리를 활용해보자.

```JSX
// App.js
import React from "react";
import logo from "./logo.svg";
import root from "react-shadow";

const styles = `...`;

function App() {
  return (
    <root.div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <style type="text/css">{styles}</style>
    </root.div>
  );
}

export default App;
```

![shadow dom](https://user-images.githubusercontent.com/67866773/102842729-fbefd680-444a-11eb-9f63-fcc0e610a0b4.PNG)

## Ant Design

[Ant Design](https://ant.design/)은 CSS 스타일 라이브러리이다.

Ant Design 설치 명령어는 다음과 같다.

`npm i antd`

우선 index.js 파일에 전역 스타일을 추가하자.

```JSX
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; // 전역 스타일 추가
import "./index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  document.getElementById('root')
);
```

1. Ant Design을 활용해서 그리드 레이아웃을 구성해보자.

`<Col span={24 중에 어느정도 차지할 지 정수} />`

`<Row gutter={16 + 8n의 정수} />`

`<Col offset={24중 건너띄고 싶은 정수} />`

```JSX
// App.js
import React from 'react';
import { Row, Col } from 'antd'; // Row, Col 컴포넌트 추가

const colStyle = () => ({
  height: 50,
  backgroundColor: 'red',
  opacity: Math.round(Math.random() * 100) / 100
});

export default function App() {
  return(
    <div className="App">
      <Row>
        <Col span={12} style={colStyle()} />
        <Col span={12} style={colStyle()} />
      </Row>
      <Row>
        <Col span={8} style={colStyle()} />
        <Col span={8} style={colStyle()} />
        <Col span={8} style={colStyle()} />
      </Row>
      <Row>
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
      </Row>
    </div>
  );
}
```

![antd Row Col span](https://user-images.githubusercontent.com/67866773/102951854-24da9f00-4511-11eb-9bc2-0aea67c3f1d6.PNG)

2. Ant Design을 활용해서 flex 레이아웃을 구성해보자.

`<Row type="flex" justify="좌우정렬" align="위아래정렬" />`

```JSX
// App.js
import React from 'react';
import { Row, Col } from 'antd';

function MyCol({ span, offset }) {
  const opacity = Math.round(Math.random() * 10) / 10;
  return (
    <Col span={span} offset={offset}>
      <div style={{ height: 50, backgroundColor: 'red', opacity }} />
    </Col>
  );
}

export default function App() {
  return (
    <div className="App">
      <Row
        style={{
          height: 300,
        }}
        type="flex"
        justify="center"
        align="middle"
      >
        <MyCol span={4} />
        <MyCol span={4} />
        <MyCol span={4} />
        <MyCol span={4} />
      </Row>
    </div>
  );
}
```

![Row Col flex](https://user-images.githubusercontent.com/67866773/102952579-c2829e00-4512-11eb-91a0-fb20b89ea8ea.PNG)
