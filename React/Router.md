# Router

## React-Router

**리액트는 [SPA](https://github.com/dongchan-K/TIL/blob/master/React/React%20Basic.md#what-is-spa-) 라이브러리로서 아래와 같은 방식을 따른다.**

![react app](https://user-images.githubusercontent.com/67866773/102231614-8018fa00-3f31-11eb-933e-a8db523acf81.PNG)

![SPA](https://user-images.githubusercontent.com/67866773/102231618-814a2700-3f31-11eb-9e6c-7e20a842044d.PNG)

**SPA의 라우팅 과정**

1. 브라우저에서 최초로 '/' 경로로 요청을 하게되면 React Web App을 내려준다.
2. 내려받은 React App에서 '/' 경로에 맞는 컴포넌트를 보여준다.
3. React App에서 다른 페이지로 이동하는 동작을 수행하면, 새로운 경로에 맞는 컴포넌트를 보여준다.

위처럼 동작하는 SPA 방식의 경우에는 요청에 따라 페이지를 새로 불러오지 않고 하나의 페이지에서 각기 다른 컴포넌트를 렌더링 하기 때문에 이를 위한 라우팅 라이브러리가 필요하다.

**가장 대표적인 라우팅 라이브러리인 react-router 를 설치하는 방법은 다음과 같다.**

- cra(create-react-app)에 내장되어 있지 않다.
- facebook의 공식 패키지는 아니다.

```
npm i react-router-dom
```

## 라우터 적용

**`<BrowserRouter>` 컴포넌트는 history API를 활용하여 UI를 업데이트 하며 `<Route>` 컴포넌트들을 감싼다.**

**`<Route>` 컴포넌트에 path="경로" 와 component="{컴포넌트}" 를 설정하여 브라우저에서 요청한 경로에 Route의 path가 포함되어있다면 component 를 보여준다.**

`Route` 컴포넌트에 path 생략 시, 모든 상황에 렌더링된다.

**`<Route>` 컴포넌트는 location, history, match 라는 props 객체를 component의 컴포넌트에 전달한다.**

## 정적 라우팅(Static Routing)

설치가 완료되었다면 특정 경로에서 보여줄 컴포넌트를 준비한다.

- '/' : Home 컴포넌트
- '/profile' : Profile 컴포넌트
- '/about' : About 컴포넌트

```JSX
// src/pages/Home.jsx
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};
```

```JSX
// src/pages/Profile.jsx
import React from 'react';

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};
```

```JSX
// src/pages/About.jsx
import React from 'react';

export default function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
};
```

react-router 라이브러리를 적용하기 위한 파일을 준비한다.

```JSX
// src/App.js
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;
```

결과를 살펴보자.

![home](https://user-images.githubusercontent.com/67866773/102238071-b4dc7f80-3f38-11eb-892e-94f0b653f0b2.PNG)

![profile](https://user-images.githubusercontent.com/67866773/102238074-b60dac80-3f38-11eb-9dcc-37457505c136.PNG)

![about](https://user-images.githubusercontent.com/67866773/102238077-b6a64300-3f38-11eb-8b43-5addb3b57628.PNG)

/profile , /about 요청한 경로에도 Home 컴포넌트가 같이 렌더링 된 것을 확인할 수 있다.

이는 위에서 언급했듯이 path가 **포함되어있다면** 해당 component 를 보여주기 때문이다.

**정확히 일치하는 component만 렌더링 하기 위해서는 `exact` props를 추가해야 한다.**

'/' Route를 다음과 같이 수정해보자.

```JSX
<Route exact path="/" component={Home} />
```

![exact profile](https://user-images.githubusercontent.com/67866773/102238798-84e1ac00-3f39-11eb-82f7-096abd22051d.PNG)

![exact about](https://user-images.githubusercontent.com/67866773/102238794-84491580-3f39-11eb-8fe2-8adf7ed10f56.PNG)

위와 같은 결과를 얻을 수 있다.

## 동적 라우팅(Dynamic Routing)

### URL 파라미터(params)

**`/profile:id` 규칙으로 경로를 지정하면 Route 컴포넌트에서 받아오는 props의 match 객체 안의 params 값을 참조하여 id를 조회할 수 있다.**

-> 꼭 id어야 하는 것은 아니고 : 규칙 뒤에 지정한 경로에 따라 다르게 params에 저장된다. 단적인 예시일 뿐이다.

이때 params의 type은 string 형태이다.

App.js 파일을 다음과 같이 수정하자.

```JSX
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile:id" component={Profile} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;
```

Profile.jsx 파일을 다음과 같이 수정하자.

```JSX
import React from 'react';

export default function Profile(props) {
  const id = props.match.params.id;
  return (
    <div>
      <h1>Profile</h1>
      {/* id가 존재한다면 출력 */}
      {id && <p>id는 {id}입니다.</p>}
    </div>
  );
};
```

![profile id1](https://user-images.githubusercontent.com/67866773/102244516-bd848400-3f3f-11eb-9e27-218f39ed5a85.PNG)

### URL 쿼리

**쿼리는 Route 컴포넌트에서 받아오는 props의 location 객체 안의 search 값을 참조하여 조회할 수 있다.**

쿼리는 문자열에 여러 가지 값을 설정할 수 있기 때문에 searh 값에서 특정 값을 읽어오기 위해서는 문자열을 객체로 변환해야한다.

#### 1. URLSearchParams 내장 객체를 이용한 쿼리 값 조회

🎯 URLSearchParams MDN : https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams

App.js 파일은 수정하지 않는다.

```JSX
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile:id" component={Profile} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;

```

About.jsx 파일을 다음과 같이 수정하자.

```JSX
import React from 'react';

export default function About(props) {
  const searchParams = new URLSearchParams(props.location.search);
  const name = searchParams.get('name');
  return (
    <div>
      <h1>About</h1>
      {/* name이 존재한다면 출력 */}
      {name && <p>이름은 {name}입니다.</p>}
    </div>
  );
};
```

#### 2. 외부 라이브러리를 이용한 쿼리 값 조회

🎯 query-string 라이브러리 : https://www.npmjs.com/package/query-string

`npm install query-string` 명령어를 통해 라이브러리 설치

About.jsx 파일을 다음과 같이 수정하자.

```JSX
import React from 'react';
import queryString from 'query-string';

export default function About(props) {
  const query = queryString.parse(props.location.search);
  // 디스트럭처링 할당
  const { name } = query;
  return (
    <div>
      <h1>About</h1>
      {name && <p>이름은 {name}입니다.</p>}
    </div>
  );
};
```

![about name](https://user-images.githubusercontent.com/67866773/102247078-d04c8800-3f42-11eb-834f-91f046539fd2.PNG)

## Switch와 Not Found

**Switch 컴포넌트**

- `<Route>` 컴포넌트들을 감싼다. -> `<BrowserRouter>` 보다는 아래 위치
- **여러 Route 중 가장 먼저 일치하는 하나만을 렌더링한다.**
- 위 특성을 이용하여 exact 없는 로직을 만들 수 있다.
- 루트 경로 '/' 는 exact를 생략하지 않는다. -> 생략 시 모든 규칙이 루트 경로에 일치하기 때문
- 가장 마지막에 path를 생략하여 모든 규칙과 일치하지 않을 때 보여줄 Not Found 페이지를 구현할 수 있다.

App.js 파일을 다음과 같이 수정하자.

```JSX
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
// 모든 규칙과 일치하지 않을 때 보여줄 Not Found 페이지
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile:id" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route exact path="/" component={Home} />
        {/* path를 생략하여 규칙에 맞지 않을 때 모든 상황에 Not Found 렌더링 */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
```

위 예시에서 루트 경로를 제외하고는 exact를 생략하였다. 이때 about 경로와 profile 경로는 순서가 상관 없지만, profile 간에는 profile:id 경로가 항상 위에 위치해야 한다. -> 집합 관계에서 생각하자

**유효하지 않은 url 입력 시 다음과 같이 NotFound 컴포넌트를 렌더링한다.**

![not found](https://user-images.githubusercontent.com/67866773/102252931-0b05ee80-3f4a-11eb-9a43-60e3ab931f08.PNG)
