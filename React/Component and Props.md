# Components and Props

React는 컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 살펴볼 수 있다.

## 함수 컴포넌트와 클래스 컴포넌트

1. 컴포넌트를 정의하는 가장 간단한 방법은 JavaScript 함수를 작성하는 것이다.
```JSX
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
위 함수는 데이터를 가진 하나의 'props' 객체 인자를 받은 후 React 엘리먼트를 반환하므로 유효한 React 컴포넌트이다.

props : 속성을 나타내는 데이터

2. ES6 class를 사용하여 컴포넌트를 정의할 수도 있다.
```JSX
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## 컴포넌트 렌더링

React 엘리먼트는 DOM 태그 또는 사용자 정의 컴포넌트로도 나타낼 수 있다
```JSX
// DOM 태그
const element = <div />;
// 사용자 정의 컴포넌트
const elem = <Welcome name="Dongchan" />;
```

React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달한다. 이 객체를 **'props'** 라 한다.
```JSX
// Hello, Dongchan을 렌더링하는 예시
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Dongchan" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

⚠ **컴포넌트의 이름은 항상 대문자로 시작한다.**

React는 소문자로 시작하는 컴포넌트를 DOM 태그로 처리한다.

## 컴포넌트 합성

컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있다. 이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미한다.

```JSX
// Welcome을 여러 번 렌더링 하는 App 컴포넌트 예시
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Dongchan" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## 컴포넌트 추출

컴포넌트를 여러 개의 작은 컴포넌트로 나눌 수 있다.

다음 Comment 컴포넌트를 살펴보자.
```JSX
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        / >
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
위 Comment 컴포넌트는 구성요소들이 모두 중첩 구조로 이루어져 있어 변경하기 어려울 수 있으며, 각 구성요소를 개별적으로 재사용하기 힘들기 때문에 몇 가지 컴포넌트를 추출해보자.

먼저 Avatar를 추출
```JSX
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    / >
  );
}
```
Avatar는 자신이 Comment 내에서 렌더링 된다는 것을 알 필요가 없기 때문에 props의 이름을 author에서 더욱 일반화된 user로 변경

**props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장**

다음으로 UserInfo 컴포넌트 추출
```JSX
function UserInfo(props) {
  return (
    <div className="UserInfo">
    <Avatar user={props.user} />
      <div className="UserInfo-name">
      {props.user.name}
      </div>
    </div>
  );
}
```

추출된 컴포넌트로 구성된 Comment는 더욱 단순해진다.
```JSX
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
UI 일부가 여러 번 사용되거나  자체적으로 복잡한 경우에는 별도의 컴포넌트로 만드는게 좋다.

### props는 읽기 전용이다

함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 된다.

**모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다.**