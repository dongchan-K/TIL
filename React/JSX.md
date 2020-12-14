# JSX

JSX는 Babel에 의해 JavaScript로 트랜스파일링(브라우저가 이해하기 쉬운 언어로 변환하는 행위)된다.

⚠ Templete 언어는 HTML로 트랜스파일링 된다

## JSX란 ?

```JSX
const element = <h1>Hello, world!</h1>;
```

- 위와 같은 문법을 JSX라 하며 JavaScript를 확장한 문법이다.
- JSX는 React 엘리먼트(element)를 생성한다.

React에서는 이벤트가 처리되는 방식, 시간에 따라 state(상태)가 변하는 방식, 화면에 표시하기 위해 데이터가 준비되는 방식 등 렌더링 로직이 다른 UI 로직과 연결된다.

때문에 React는 별도의 파일에 마크업과 로직을 넣어 기술을 분리하는 대신, 둘 다 포함하는 '컴포넌트'라는 유닛으로 관계를 분리한다.

## JSX 문법

**1. JSX의 중괄호 안에는 유효한 모든 Javascript 표현식을 넣을 수 있다**

예시

```JSX
const name = 'Dongchan Kim';
const element = <h1>Hello, {name}</h1>;
```

```JSX
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Dongchan',
  lastName: 'Kim'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
)
```

JSX도 표현식이다. 컴파일이 끝나면, JSX 표현식이 정규 JavaScript 함수 호출이 되고 JavaScript 객체로 인식된다.

**2. JSX 속성 정의**

속성에 따옴표를 이용해 문자열 리터럴을 정의할 수 있다.

```JSX
const element = <div tabIndex="0"></div>;
```

중괄호를 사용하여 어트리뷰트에 JavaScript 표현식을 삽입할 수 있다.

```JSX
const element = <img src={user.avatarUrl}></img>;
```

❌ 어트리뷰트에 JavaScript 표현식을 삽입할 때 문자열 값은 따옴표를 사용, 표현식은 중괄호를 사용(중괄호 주변에 따옴표 생략)하자 -> 두 가지를 동시에 사용하면 안된다.

⚠ React DOM은 camelCase 프로퍼티 명명 규칙을 따른다. 예를 들어 JSX에서 어트리뷰트 class는 className이 되고 tabindex는 tabIndex가 되고 for은 htmlFor이 된다.

**3. JSX로 자식 정의**

태그가 비어있다면 꼭 닫아주어야 한다.

```JSX
const element = <img src={user.avatarUrl} />;
```

JSX 태그는 자식(children)을 포함할 수 있다.

```JSX
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

**4. JSX는 주입 공격을 방지한다**

기본적으로 React DOM은 JSX에 삽입된 모든 값을 렌더링 하기 전에 이스케이프 하고, 모든 항목은 렌더링 되기 전에 문자열로 변환되기 때문에 [XSS(cross-site-scripting)](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8C%85) 공격을 방지할 수 있다.

**5. JSX는 객체를 표현한다**

Babel은 JSX를 `React.createElement()` 호출로 컴파일한다.

```JSX
// 다음 두 코드는 동일하다
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()`는 몇가지 검사를 수행하며, 다음과 같은 객체를 생성한다.

```JSX
// 단순화하여 구조를 나타냄
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

위와 같은 객체를 **React 엘리먼트** 라고 한다.

**6. 삼항 조건 연산자**

JSX 내부의 자바스크립트 표현식에서 if문을 사용할 수는 없다.

조건에 따라 다른 내용을 렌더링해야 할 때는 JSX 밖에서 if 문을 사용하거나, JSX 내부의 { } 안에 삼항 조건 연산자를 사용할 수 있다.

삼항 조건 연산자 또한 표현식으로 평가되기 때문

```JSX
// 삼항 조건 연산자 예시
function App() {
  const name = 'Dongchan';
  return (
    <div>
      {name === 'Dongchan' ? <h1>Hello, {name}</h1> : <h2> 이름이 다릅니다.</h2>}
    </div>
  );
}
```

**7. 하나의 부모 요소**

컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 한다 -> Virtual DOM에서 컴포넌트 변화를 감지할 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙이 있기 때문

불필요한 `<div>` 태그를 사용하고 싶지 않다면 리액트 v16 이상부터 도입된 Fragment를 사용할 수 있다.

`<Fragment>` 또는 `<>` 로 사용 가능하며 실제 DOM에 표현되지 않는다.

```JSX
function App() {
  return (
    // 부모 요소로 감싸져 있지 않기 때문에 에러가 발생한다
    <h1>Welcome</h1>
    <h2>Dongchan</h2>
  )
}
```

```JSX
// Fragment 예시
function App() {
  return (
    <>
      <h1>Welcome</h1>
      <h2>Dongchan</h2>
    </>
  )
}
```

Fragment로 감싼 위 코드의 실행 결과

![Fragment](https://user-images.githubusercontent.com/67866773/102054447-c7699280-3e2c-11eb-9994-34b5ee25185b.PNG)

**8. 인라인 스타일링**

리액트에서 DOM 요소에 스타일을 적용할 때는 객체 형태로 넣어 주어야 하며 카멜 케이스 표기법을 사용해야 한다.

```JSX
function App() {
  const style = {
    backgroundColor: 'tomato',
    fontSize: '48px'
  };
  return (
    <div style={style}>Hello!</div>
  );
}
```

```JSX
function App() {
  return (
    <div stlye={{
      backgroundColor: 'tomato',
      fontSize: '48px'
    }}>
    Hello!
    </div>
  );
}
```

**9. undefined 처리**

클래스 컴포넌트의 render 함수 내부 또는 함수 컴포넌트에서는 undefined만 반환하면 에러가 발생한다.

```JSX
// 다음 예시는 에러가 발생한다

// 클래스 컴포넌트 예시
class App extends Component {
  render() {
    const name = undefined;
    return name;
  }
}

// 함수 컴포넌트 예시
function App() {
  const name = undefined;
  return name;
}
```

특정 값이 undefined일 수도 있다면, OR(||)연산자를 사용해 에러를 방지할 수 있다.

```JSX
class App extends Component {
  render() {
    const name = undefined;
    return name || 'undefined 입니다';
  }
}

function App() {
  const name = undefined;
  return name || 'undefined 입니다';
}
```

JSX 내부에서 undefined를 렌더링하는 것은 괜찮다.

```JSX
function App() {
  const name = undefined;
  return <div>{name}</div>;
}
```

🎯 출처 : https://ko.reactjs.org/docs/introducing-jsx.html
