# 비동기 프로그래밍

## 1. 동기 처리와 비동기 처리

함수를 호출하면 함수 코드가 평가되어 함수 실행컨텍스트가 생성된다. 이때 생성된 함수 실행 컨텍스트는 실행 컨텍스트 스택(콜 스택이라고도 부른다)에 푸시되고 함수 코드가 실행된다. 함수 코드의 실행이 종료하면 함수 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다

![실행 컨텍스트 스택](https://user-images.githubusercontent.com/67866773/97959221-34334b00-1df2-11eb-8028-8af3668ad17b.png)

함수가 실행되려면 함수 코드 평가 과정에서 생성된 함수 실행 컨텍스트가 실행 컨텍스트 스택에 푸시되어야 한다. 실행 컨텍스트 스택에 함수 실행컨텍스트가 푸시되는 것이 함수의 실행의 시작을 의미한다. 함수가 호출된 순서대로 순차적으로 실행되는 이유는 함수가 호출된 순서대로 함수 실행 컨텍스트가 실행 컨텍스트 스택에 푸시되기 때문이다. **즉, 함수의 실행 순서는 실행 컨텍스트 스택으로 관리한다**

**자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 갖는다** 이는 동시에 2개 이상의 함수를 실행할 수 없다는 것을 의미한다. 실행 컨텍스트 스택의 최상위 요소인 '실행 중인 실행 컨텍스트'를 제외한 모든 실행 컨텍스트는 모두 실행 대기 중인 태스크(task)들이다. 대기 중인 태스크들은 현재 실행중인 실행 컨텍스트가 팝되어 실행 컨텍스트 스택에서 제거되면, 즉 현재 실행중인 함수가 종료하면 비로소 실행되기 시작한다

자바스크립트 엔진은 한 번에 하나의 태스크만 실행할 수 있는 **싱글 스레드(single thread)** 방식으로 동작한다

싱글 스레드 방식은 한 번에 하나의 태스크만 실행할 수 있기 때문에 처리에 시간이 걸리는 태스크를 실행하는 경우 **블로킹(blocking, 작업 중단)**이 발생한다

실행 중인 태스크가 종료할 때까지 다음 실행될 태스크가 대기하는 방식을 **동기(synchronous)처리** 라고 한다
- 동기 처리방식은 태스크를 순서대로 하나씩 처리하므로 실행 순서가 보장된다는 장점이 있다
- 동기 처리방식은 앞선 태스크가 종료할 때까지 이후 태스크들이 블로킹되는 단점이 있다

![동기 처리](https://user-images.githubusercontent.com/67866773/97963237-17027a80-1dfa-11eb-8177-6d0729aafb5a.png)

현재 실행 중인 태스크가 종료 되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방식을 **비동기(asynchronous)처리** 라고 한다
- 비동기 처리 방식은 현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하므로 블로킹이 발생하지 않는다는 장점이 있다
- 비동기 처리 방식은 태스크의 실행 순서가 보장되지 않는 단점이 있다

![비동기 처리](https://user-images.githubusercontent.com/67866773/97963541-af98fa80-1dfa-11eb-8fa7-f7e86c374afe.png)

비동기 처리를 수행하는 비동기 함수는 전통적으로 콜백 패턴을 사용한다. 비동기 처리를 위한 콜백 패턴은 콜백 헬(callback hell)을 발생시켜 가독성을 나쁘게 하고, 비동기 처리 중 발생한 에러의 예외 처리가 곤란하며, 여러 개의 비동기 처리를 한번에 처리하는 데도 한계가 있다

타이머 함수인 setTimeout과 setInterval, HTTP 요청, 이벤트 핸들러는 비동기 처리 방식으로 동작한다

## 2. 이벤트 루프와 태스크 큐

자바스크립트의 특징 중 하나인 싱글 스레드 방식은 한 번에 하나의 태스크만 처리할 수 있지만 브라우저가 동작하는 것을 살펴보면 많은 태스크가 동시에 처리되는 것처럼 느껴진다

예를 들어, HTML 요소가 애니메이션 효과를 통해 움직이면서 이벤트를 처리하기도 하고, HTTP 요청을 통해 서버로부터 데이터를 가지고 오면서 렌더링하기도 한다. 이처럼 자바스크립트의 동시성(concurrency)을 지원하는 것이 바로 **이벤트 루프(event loop)** 다

<img width="759" alt="이벤트 루프와 브라우저 환경" src="https://user-images.githubusercontent.com/67866773/97974484-027aae00-1e0b-11eb-94e9-5d3754a44bd9.png">

- 콜 스택(call stack) : 소스코드(전역 코드나 함수 코드 등) 평가 과정에서 생성된 실행 컨텍스트가 추가되고 제거되는 스택 자료구조인 실행 컨텍스트 스택이 바로 콜 스택이다.
함수를 호출하면 함수 실행 컨텍스트가 순차적으로 콜 스택에 푸시되어 순차적으로 실행된다. 자바스크립트 엔진은 단 하나의 콜 스택을 사용하기 때문에 최상위 실행 컨텍스트(실행 중인 실행 컨텍스트)가 종료되어 콜 스택에서 제거되기 전까지는 다른 어떤 태스크도 실행되지 않는다

- 힙(heap) : 힙은 객체가 저장되는 메모리 공간이다. 콜 스택의 요소인 실행 컨텍스트는 힙에 저장된 객체를 참조한다. 메모리에 값을 저장혀려면 먼저 값을 저장할 메모리 공간의 크기를 결정해야 한다. 객체는 원시값과는 달리 크기가 정해져 있지 않으므로 할당해야 할 메모리 공간의 크기를 런타임에 결정(동적 할당)해야 한다. 따라서 객체가 저장되는 메모리 공간인 힙은 구조화되어 있지 않다는 특징이 있다

이처럼 콜 스택과 힙으로 구성되어 있는 자바스크립트 엔진은 단순히 태스크가 요청되면 콜 스택을 통해 요청된 작업을 순차적으로 실행할 뿐이다. **비동기 처리에서 소스코드의 평가와 실행을 제외한 모든 처리는 자바스크립트 엔진을 구동하는 환경인 브라우저 또는 Node.js가 담당한다** 

- 태스크 큐(task queue / event queue / callback queue) : setTimeout이나 setInterval과 같은 비동기 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역이다. 태스크 큐와는 별도로 프로미스의 후속 처리 메서드의 콜백 함수가 일시적으로 보관되는 마이크로태스크 큐도 존재한다
- 이벤트 루프(event loop) : 이벤트 루프는 콜 스택에 현재 실행 중인 실행 컨텍스트가 있는지, 그리고 태스크 큐에 대기 중인 함수(콜백 함수, 이벤트 핸들러 등)가 있는지 반복해서 확인한다. **만약 콜 스택이 비어 있고 태스크 큐에 대기 중인 함수가 있다면 이벤트 루프는 순차적(FIFO, First In First Out)으로 태스크 큐에 대기 중인 함수를 콜 스택으로 이동시킨다** 이때 콜 스택으로 이동한 함수는 실행된다. 즉, 태스크 큐에 보관된 함수들은 비동기 처리 방식으로 동작한다

**자바스크립트는 싱글 스레드 방식으로 동작한다. 이때 싱글 스레드로 동작하는 것은 브라우저가 아니라 브라우저에 내장된 자바스크립트 엔진이라는 것에 주의해야 한다. 만약 모든 자바스크립트 코드가 자바스크립트 엔진에서 싱글 스레드 방식으로 동작한다면 자바스크립트는 비동기로 동작할 수 없다. 즉, 자바스크립트 엔진은 싱글 스레드로 동작하지만 브라우저는 멀티 스레드로 동작한다