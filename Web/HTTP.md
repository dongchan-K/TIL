# HTTP

## HTTP란 ?

- HTTP(HyperText Transfer Protocol)는 웹에서 브라우저와 서버가 통신을 하기 위한 프로토콜(규약)이다.
- HTTP는 Connectionless(비 연결지향)와 Stateless(상태정보 유지X)의 특징을 갖는다
  - Connectionless : 클라이언트에서 서버에 요청을 보내면 서버는 클라이언트에 응답을 하고 접속을 끊는 특성
  - Statelss : HTTP 통신은 요청을 응답하고 접속을 끊기 때문에 클라이언트의 상태정보를 알 수 없다

### HTTP/1.1

![HTTP1 1](https://user-images.githubusercontent.com/67866773/100821154-21fd0900-3493-11eb-9e29-418296e59de9.PNG)

- HTTP/1.1은 기본적으로 커넥션(connection)당 하나의 요청과 응답만 처리한다. 즉, 여러 개의 요청을 한 번에 전송할 수 없고 응답 또한 마찬가지다
- 리소스의 동시 전송이 불가능한 구조이므로 요청할 리소스의 개수에 비례하여 응답 시간도 증가하는 단점이 있다

### HTTP/2

![HTTP2](https://user-images.githubusercontent.com/67866773/100821159-22959f80-3493-11eb-97d0-55704476f60f.PNG)

- HTTP/2는 다중 요청/응답이 가능하다
