# 이벤트 처리하기

- React의 이벤트는 소문자 대신 카멜 케이스(camelCase)를 사용한다
- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달

```HTML
<!-- HTMl 예시 -->
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

```JSX
// React 예시
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

- React에서는 false를 반환해도 기본 동작을 방지할 수 없으며, 반드시 preventDefault를 명시적으로 호출해야 한다.
```JSX
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <a href="#" onClick={handleClick}>
    Click me
    </a>
  );
}
```

React를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 `addEventListener`를 호출할 필요 없이, 엘리먼트가 처음 렌더링 될 때 리스너를 제공하면 된다.

ES6클래스를 사용하여 사용자가 On 과 OFF 상태를 토글할 수 있는 버튼을 렌더링해보자.
```JSX
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOne ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

JSX 콜백 안에서 this 바인딩에 주의하자.

this.handleClick을 바인딩하지 않고 onClick에 전달하였다면, 함수가 실제 호출될 때 this는 undefined가 된다.

bind를 호출하는 대신 클래스 필드를 사용하거나 화살표 함수를 사용할 수 있다.

클래스 필드를 사용
```JSX
// 이 문법은 아직 제안 단계이다
class LoginButton extends React.Component {
  handleClick = () => {
    
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    )
  }
}
```

화살표 함수를 사용
```JSX
class LoginButton extends React.Component {
  handleClick() {

  }

  render() {
    return (
      <button onClick={() => this.handleClick}>
        Click me
      </button>
    );
  }
}
```
화살표 함수의 문제점은 LoginButton이 렌더링될 때마다 다른 콜백이 생성된다는 것이다.

콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있다.

이러한 성능 문제를 피하고자, 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장한다.

## 이벤트 핸들러에 인자 전달하기

```JSX
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

위 두 코드는 동일하며 두 경우 모두 React 이벤트를 나타내는 e 인자가 ID 뒤에 두 번째 인자로 전달된다. 화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 bind를 사용할 경우 추가 인자가 자동으로 전달된다.
