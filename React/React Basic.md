# React Basic

## What is React ?

리액트는 [CBD(Component Based Development) 방법론](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8_%EA%B8%B0%EB%B0%98_%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%EA%B3%B5%ED%95%99)을 기반으로 하는 사용자 인터페이스(UI / View)를 만들기 위한 JavaScript 라이브러리이다.

## What is SPA ?

모던 웹 애플리케이션은 제공되는 정보가 많고 사용자와 인터랙션이 월등히 증가하여, SSR(Server Side Rendering)방식은 성능에 문제를 가져오게 되었고 클라이언트 성능이 좋아짐에 따라 CSR(Client Side Rendering)방식이 각광받기 시작했다.

**SSR(Server Side Rendering)**

![Server Side Rendering](https://user-images.githubusercontent.com/67866773/101499381-8bf44180-39b0-11eb-9cdc-0d44512e38b5.PNG)

**CSR(Client Side Rendering)**

![Client Side Rendering](https://user-images.githubusercontent.com/67866773/101499375-8a2a7e00-39b0-11eb-9ddd-eea19a65eb8b.PNG)

⚠ SSR방식과 CSR방식을 적용하는 잣대는 프로젝트 성격에 따라 다르게 판단하는 것이 좋다.

🎯 [SSR, CSR 참고자료](https://developers.google.com/web/updates/2019/02/rendering-on-the-web?hl=ko)

단일 페이지 애플리케이션(Single Page Application, SPA)은 모던 웹의 패러다임이다. SPA는 기본적으로 단일 페이지로 구성되며 기존의 서버 사이드 렌더링과 비교할 때, 배포가 간단하며 네이티브 앱과 유사한 사용자 경험을 제공할 수 있다는 장점이 있다.

**SPA는 웹 애플리케이션에 필요한 모든 정적 리소스를 최초에 한번 다운로드하기 때문에 초기 구동 속도가 상대적으로 느리다. 하지만 화면이동 시에 필요한 리소스를 서버사이드에서 HTML로 전달받지 않고 필요한 데이터만 서버로부터 JSON으로 전달받아 동적으로 렌더링하기 때문에 SPA는 트래픽의 감소와 속도, 사용성, 반응성의 향상등의 장점이 있다.**

이처럼 모던 웹 애플리케이션에서 SPA가 각광받기 시작하면서 Angular, React, Vue 등의 SPA 라이브러리, 프레임워크가 생겨나게 되었다.

## Why React ?

각각의 라이브러리, 프레임워크는 추구하는 방향과 특징이 다르다.

리액트는 기본적으로 자유도가 높은 라이브러리이다. 오직 UI(View)에 집중되어 있는 라이브러리 이며, 나머지 기능은 써드 파티 라이브러리가 담당하게 된다. 라우터쪽은 Netx.js, After.js, React-router 등이 있으며 상태 관리 라이브러리는 Redux, MobX 등이 있다.

리액트의 특징 3가지를 살펴보자
- **Component 단위 작성** : 리액트의 모든 view는 컴포넌트로 이루어져 있으며, 여러곳에 필요한 컴포넌트의 경우 하나의 컴포넌트를 생성하고 필요에 따라 가져다 사용할 수 있다. 이는 **생산성을 높이고 유지 보수를 용이하게 한다**

- **JSX** : JSX는 JavaScript의 확장이기 때문에 Babel에 의해 JavaScript로 트랜스파일링(브라우저가 이해하기 쉬운 언어로 변환하는 행위)되며 컴포넌트 로직은 템플릿(Templete)이 아닌 JSX(JavaScript)로 작성되기 때문에 쉽게 적응할 수 있고 가독성이 뛰어나다.

- **Virtual DOM 사용** : DOM을 직접 제어하는 것이 아닌 작성한 코드는 Virtual DOM(가상의 돔)을 업데이트 하고, React는 기존의 DOM과 Virtual DOM을 비교해 필요한 부분만 렌더링하기 때문에 브라우저 내에서 발생하는 연산의 양을 줄이면서 성능 개선이 가능하다.

![Virtual DOM](https://user-images.githubusercontent.com/67866773/101502027-ce6b4d80-39b3-11eb-8147-9f199b62741c.PNG)

위와 같이 Virtual DOM은 부모 요소가 변경될 때 자식 요소도 변경될 수 있다는 것을 전제하지만, 자식 요소가 변경되지 않는 경우를 찾아 최적화 할 필요성이 있다.

🎯 [Virtual DOM 참고자료](https://www.youtube.com/watch?v=BYbgopx44vo)


