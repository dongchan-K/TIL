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

### 라우터 적용

**`<BrowserRouter>` 컴포넌트는 history API를 활용하여 UI를 업데이트 하며 `<Route>` 컴포넌트들을 감싼다.**

**`<Route>` 컴포넌트에 path(경로) 와 component(컴포넌트) 를 설정하여 브라우저에서 요청한 경로에 Route의 path가 포함되어있다면 component 를 보여준다**

### 정적 라우팅(Static Routing)

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
