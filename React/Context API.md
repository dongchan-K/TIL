# Context API

Context API는 리액트에서 전역으로 사용할 데이터가 있을 때 유용하다.

- 로그인 정보
- 애플리케이션 환경 설정
- 테마 등...

## Context API의 전역 상태 관리 흐름

일반적으로 리액트는 컴포넌트 간의 데이터를 props로 전달하기 때문에 여기저기서 필요한 데이터가 있을 경우 주로 최상위 컴포넌트인 App의 state에서 관리한다.

![React global state](https://user-images.githubusercontent.com/67866773/103433012-066d5580-4c2d-11eb-8f77-142b41b42d8f.PNG)

이러한 방식은 하나하나 컴포넌트를 거치기 때문에 유지 보수성이 낮아진다.

Context API를 사용하면 Context를 만들어 단 한번에 원하는 값을 받아와서 사용할 수 있다.

![React ContextAPI](https://user-images.githubusercontent.com/67866773/103433013-079e8280-4c2d-11eb-8fd7-72b7af27774f.PNG)

🎯 참고 서적 : 리액트를 다루는 기술
