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

⚠ React DOM은 camelCase 프로퍼티 명명 규칙을 따른다. 예를 들어 JSX에서 class는 className이 되고 tabindex는 tabIndex가 된다.

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

🎯 출처 : https://ko.reactjs.org/docs/introducing-jsx.html