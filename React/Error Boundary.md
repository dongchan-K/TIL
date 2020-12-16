# Error Boundary

Error Boundary(에러 바운더리)는 자식 컴포넌트 트리 내의 자바스크립트 오류를 감지하고, 해당 오류를 기록하며 충돌이 발생한 컴포넌트 트리를 대신하여 대체 UI를 표시하는 React 컴포넌트이다.

**React 16부터는 컴포넌트의 Lifecycle에서 에러가 발생하면 컴포넌트 트리의 모든 컴포넌트를 Unmount 시키기 때문에 사용자에게 보이는 뷰는 아무것도 없는 하얀 뷰만 보이게 된다.**

-> 개발 모드에서는 에러창이 뷰에 보여지지만 프로덕션 모드에서는 하얀 뷰만 보이게 된다.

이때 Error Boundary를 사용하여 에러 화면을 보여줄 수 있다.

## Error Boundary를 사용한 에러 처리

Error Boundary는 특정 에러만을 감지할 수 있다.

- [생명주기 메서드](https://github.com/dongchan-K/TIL/blob/master/React/State%20and%20Lifecycle.md#v163-%EC%83%9D%EB%AA%85%EC%A3%BC%EA%B8%B0-%EB%A9%94%EC%84%9C%EB%93%9C)에 대한 에러 감지
- 생성자에 대한 에러 감지
- **Error Boundary 하위 트리에 존재하는 컴포넌트에 대한 에러만을 감지(자기 자신에 대한 에러는 감지할 수 없다)**

⚠ production mode에서 강제로 에러를 발생시켜 보자.

```JSX
import React from 'react';

class Button extends React.Component {
  render() {
    throw new Error('에러');
    return <div>hello!</div>;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Button />
      </div>
    );
  }
}

export default App;
```

다음과 같이 production mode 에서는 아무것도 렌더링 되지 않는다.

![production mode error](https://user-images.githubusercontent.com/67866773/102307111-32d76f80-3fa7-11eb-8621-d33a0cbc0e43.PNG)

⚠ 에러 바운더리 컴포넌트를 만들어 에러 화면을 렌더링 해보자.

```JSX
import React from 'react';

class Button extends React.Component {
  render() {
    throw new Error('에러');
    return <div>hello!</div>;
  }
}

class ErrorBoundary extends React.Component {
  // 에러 상태 감지를 위한 state
  state = {
    hasError: false,
  };
  // 자손 컴포넌트에서 오류가 발생했을 때 호출된다
  componentDidCatch(error, info) {
    // 에러를 감지하면 state를 true로 변경
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생하면 보여줄 뷰
      return <div>에러 화면</div>;
    }
    return (
      <div>
        {/* 에러가 발생하지 않으면 보여줄 컴포넌트*/}
        <Button />
      </div>
    );
  }
}

export default ErrorBoundary;
```

다음과 같이 에러가 발생하여도 ErrorBoundary 컴포넌트를 렌더링한다.

![error boundary](https://user-images.githubusercontent.com/67866773/102306844-88f7e300-3fa6-11eb-8278-df7a7b3bce74.PNG)

### Error Boundary 라이브러리

Error Boundary를 위한 라이브러리도 다양하게 존재한다.

🎯 react-error-boundary 라이브러리 : https://www.npmjs.com/package/react-error-boundary

`npm install --save react-error-boundary` 명령어를 통해 라이브러리를 설치해보자.

Error Bounadry 라이브러리를 적용해보자.

```JSX
import React from 'react';
// ErrorBoundary 라이브러리 사용
import { ErrorBoundary } from 'react-error-boundary';

class Button extends React.Component {
  render() {
    throw new Error('에러');
    return <div>hello!</div>;
  }
}

class ErrorPage extends React.Component {
  render() {
    return <div>에러 발생!</div>;
  }
}

class App extends React.Component {
  render() {
    return (
      // FallbackComponent로 에러 발생시 보여줄 컴포넌트 지정
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <div>
          <Button />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
```

다음과 같이 잘 적용되었다.

![error boundary library](https://user-images.githubusercontent.com/67866773/102308009-058bc100-3fa9-11eb-87d6-4ca3457f5691.PNG)

🎯 참고 자료 : https://ko.reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper
