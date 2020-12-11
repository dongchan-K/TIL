# 조건부 렌더링

React에서는 원하는 동작을 캡슐화하는 컴포넌트를 만들수 있다. 이를 통해 애플리케이션의 상태에 따라서 컴포넌트 중 몇개만을 렌더링할 수 있다.

if나 삼항조건 연산자를 통해 특정 컴포넌트만을 렌더링할 수 있다.
```JSX
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // isLoggedIn prop에 따라 다른 컴포넌트를 렌더링
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

## 엘리먼트 변수

엘리먼트를 저장하기 위해 변수를 사용할 수 있다. 이를 통해 컴포넌트의 일부를 조건부로 렌더링할 수 있다.
```JSX
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

아래 예시에서는 LoginControl이라는 유상태 컴포넌트를 만들어 현재 상태에 맞게 `<LoginButton />`이나 `<LogoutButton />`을 렌더링한다.
또한 이전 예시의 `<Greeting />`도 함께 렌더링한다.
```JSX
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

## 논리 && 연산자로 If를 인라인으로 표현하기

JSX 안에는 중괄호를 이용해서 표현식을 포함할 수 있다. 그 안에 논리 연산자 &&를 사용하면 쉽게 엘리먼트를 조건부로 넣을 수 있다.
```JSX
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && 
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];

ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

## 삼항조건 연산자로 If-Else 구문 인라인으로 표현하기

엘리먼트를 조건부로 렌더링하는 다른 방법은 삼항조건 연산자를 사용하는 것이다.
```JSX
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

## 컴포넌트가 렌더링되는 것을 막기

다른 컴포넌트에 의해 렌더링될 때 컴포넌트 자체를 숨기고 싶다면 null을 반환하면 해결할 수 있다.
```JSX
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.sate = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

컴포넌트의 render 메서드로부터 null을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않는다.

🎯 출처 : https://ko.reactjs.org/docs/conditional-rendering.html