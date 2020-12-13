# State and Lifecycle

이번에는 Clock 컴포넌트를 완전히 재사용하고 캡슐화 하는 방법을 알아보자.

스스로 타이머를 설정하고 매초 스스로 업데이트 하는 컴포넌트를 만들어보자
```JSX
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
위 예시에는 Clock이 타이머를 설정하고 매초 UI를 업데이트하는 것이 누락되어있다.

이상적으로 한 번만 코드를 작성하고 Clock이 스스로 업데이트하도록 만들기 위해서 Clock 컴포넌트에 'state'를 추가해야 한다.

**state는 props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어된다.**

## 함수에서 클래스로 변환하기

다섯 단계로 Clock과 같은 함수 컴포넌트를 클래스로 변환할 수 있다.

1. React.Component를 확장하는 동일한 이름의 ES6 class를 생성
2. render()라고 불리는 빈 메서드를 추가
3. 함수의 내용을 render() 메서드 안으로 이동
4. render() 내용 안에 있는 props를 this.props로 변경
5. 남아있는 빈 함수 선언을 삭제

```JSX
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello,world</h1>
        <h2>Ite is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
render 메서드는 업데이트가 발생할 때마다 호출되지만, 같은 DOM노드로 `<Clock />`을 렌더링 하는경우 Clock 클래스의 단일 인스턴스만을 사용한다. 

이는 로컬 state와 생명주기 메서드와 같은 부가적인 기능을 사용할 수 있게 해준다.

## 클래스에 로컬 State 추가하기

1. render() 메서드 안에 있는 this.props.date를 this.state.date로 변경
```JSX
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2. 초기 this.state를 지정하는 class constructor를 추가
```JSX
class Clock extends React.Component {
  construnctor(props) {
    super(props);
    this.state = {dae: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }  
}
```
클래스 컴포넌트는 항상 props로 기본 constructor를 호출해야 한다.

3. <Clock /> 요소에서 date prop을 삭제
```JSX
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

state를 추가한 코드는 다음과 같다
```JSX
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

## 생명주기 메서드를 클래스에 추가하기

많은 컴포넌트가 있는 애플리케이션에서 컴포넌트가 삭제될 때 해당 컴포넌트가 사용 중이던 리소스를 확보하는 것이 중요하다.

컴포넌트가 처음 DOM에 렌더링 될 때마다 타이머를 설정하려고 한다. 이것을 React에서 **마운팅** 이라 한다.

또한 컴포넌트에 의해 생성된 DOM이 삭제될 때마다 타이머를 해제하려고 한다. 이것을 **언마운트** 라고 한다.

컴포넌트 클래스에서 특별한 메서드를 선언하여 컴포넌트가 마운트되거나 언마운트 될 때 일부 코드를 작동할 수 있는데 이를 **생명주기 메서드** 라 부른다.

### v16.3 이전 생명주기 메서드

**1. Component 생성 및 마운트**
- constructor
- componentWillMount
- render()
- componentDidMount

**2. Component props, state 변경**
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render()
- componentDidUpdate

**3. Component 언마운트**
- componentWillUnmount

![16 3 이전 생명주기 메서드](https://user-images.githubusercontent.com/67866773/101789918-33a27880-3b45-11eb-996a-114366996f8b.PNG)

### v16.3 생명주기 메서드

**1. Component 생성 및 마운트**
- constructor
- static getDerivedStateFromProps
- render()
- componentDidMount

**2. Component props, state 변경**
- static getDerivedStateFromProps (props 변경)
- shouldComponentUpdate (state 변경)
- render()
- getSnapshotBeforeUpdate (DOM에 적용)
- componentDidUpdate

**3. Component 언마운트**
- componentWillUnmount

**4. Component 에러캐치**
- componentDidCatch

![v16 3 생명주기 메서드](https://user-images.githubusercontent.com/67866773/101789921-34d3a580-3b45-11eb-8b02-af16c8cf64f5.PNG)

코드를 통해 알아보자.
```JSX
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }
  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

componentDidMount() 메서드는 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행된다. 때문에 타이머를 설정하기 좋다
```JSX
componentDidMount() {
  this.timerID = setInterval(() => this.tick(), 
  1000
  );
}
```

componentWillUnmount() 메서드를 통해 타이머를 분해해 보자
```JSX
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

마지막으로 tick() 메서드를 구현해 시계를 완성해보자
```JSX
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
    () => this.tick(),
    1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

## 올바른 State 사용법

setState() 메서드는 세가지 주의점이 있다.

### 1. 직접 State를 수정하지 말 것
```JSX
// X
this.state.comment = 'Hello';

// O
this.setState({comment: 'Hello'});
```
this.state를 지정할 수 있는 유일한 공간은 constructor 이다.

### 2. State 업데이트는 비동기일 수도 있다.

React는 성능을 위해 여러 setState() 호출을 단일 업데이트로 한번에 처리할 수 있다.

this.props와 this.state 가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안 된다.

**이전 state를 사용할 경우 setState() 인수로 함수를 전달하고, 이전 state를 사용하지 않을 경우 객체를 전달하는 것이 일반적이다.**
```JSX
// X
this.setState({
  counter: this.state.counter + this.props.increment
});

// O
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### 3. State 업데이트는 병합된다

setState()를 호출할 때 React는 제공한 객체를 현재 state로 병합한다.

예를 들어, state는 다양한 독립적인 변수를 포함할 수 있다.
```JSX
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```

별도의 setState() 호출로 변수를 독립적으로 업데이트 할 수 있다.
```JSX
componentDidMount() {
  fetchPosts().then(reponse => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```
병합은 얕게 이루어진다.

## 데이터는 아래로 흐른다

부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 또는 무상태인지 알 수 없고, 함수나 클래스 어떤 것으로 정의되었는지 관심을 가질 필요가 없다.

유상태 방식(Stateful) : 접속이 계속 유지된 상태의 방식

무상태 방식(Stateless) : 필요한 경우에만 연결을 맺는 방식

때문에 state는 종종 로컬 또는 캡슐화 라고 불린다.

state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없다.

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다.
```JSX
<FormattedDate date={this.state.date} />
```

FormattedDate 컴포넌트는 date를 자신의 props로 받을 것이고 이것이 Clock의 state로부터 왔는지, Clock의 props에서 왔는지, 수동으로 입력한 것인지 알지 못한다.
```JSX
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

**이러한 특성을 '하향식(top-down)' 또는 '단반향식' 데이터 흐름이라고 한다.**

**모든 state는 항상 특정한 컴포넌트가 소유하고 있으며 그 state로부터 파생된 UI 또는 데이터는 오직 트리 구조에서 자신의 '아래'에 있는 컴포넌트에만 영향을 미친다.**

```JSX
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
위 코드의 각 Clock은 자신만의 타이머를 설정하고 독립적으로 업데이트 한다.

### props와 state의 차이

컴포넌트에서는 props와 state 두개의 데이터를 다룬다.

**props는 부모 컴포넌트가 자식 컴포넌트에게 전달하는 값이며 자식 컴포넌트에서는 props를 받아올 뿐 수정할 수는 없다.**

**state는 컴포넌트 내부에서 선언하며 내부에서 값을 변경할 수 있다.**

출처 : https://ko.reactjs.org/docs/state-and-lifecycle.html