# 이벤트

## 1. 이벤트 드리븐 프로그래밍

만약 애플리케이션이 특정 타입의 이벤트에 대해 반응하여 어떤 일을 하고 싶다면 해당하는 타입의 이벤트가 발생했을 때 호출될 함수를 브라우저에게 알려 호출을 위임한다

이벤트가 발생했을 때 호출될 함수를 **이벤트 핸들러(event handler)** 라 한다

이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것을 **이벤트 핸들러 등록** 이라 한다

프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 **이벤트 드리븐 프로그래밍(event-driven programming)** 이라 한다

## 2. 이벤트 타입

이벤트 타입(event type)은 이벤트의 종류를 나타내는 문자열이다

- 마우스 이벤트

  - click : 마우스 버튼을 클릭했을 때 이벤트 발생
  - mousedown : 마우스 버튼을 눌렀을 때 이벤트 발생
  - mouseup : 누르고 있던 마우스 버튼을 놓았을 때 이벤트 발생
  - mousemove : 마우스 커서를 움직였을 때 이벤트 발생

- 키보드 이벤트

  - keydown : 모든 키를 눌렀을 때 이벤트 발생
  - keypress : 문자 키를 눌렀을 때 연속적으로 이벤트 발생
  - keyup : 누르고 있던 키를 놓았을 때 한 번만 이벤트 발생

- 포커스 이벤트

  - focus : HTML 요소가 포커스를 받았을 때 이벤트 발생
  - blur : HTML 요소가 포커스를 잃었을 때 이벤트 발생

- 폼 이벤트

  - submit : form 요소 내의 submit 버튼을 클릭했을 때 이벤트 발생
  - reset : form 요소 내의 reset 버튼을 클릭했을 때 이벤트 발생

- 값 변경 이벤트

  - input : input, select, textarea 요소의 값이 입력되었을 때 이벤트 발생
  - change : input, select, textarea 요소의 입력이 종료되어 값이 변경되면 이벤트 발생

- DOM 뮤테이션 이벤트

  - DOMContentLoaded : HTML 문서의 로드와 파싱이 완료되어 DOM 생성이 완료되었을 때 이벤트 발생

- 뷰 이벤트

  - resize : 브라우저 윈도우(window)의 크기를 리사이즈 할 때 연속적으로 이벤트 발생
  - scroll : 웹페이지(document) 또는 HTML 요소를 스크롤 할 때 연속적으로 이벤트 발생

- 리소스 이벤트
  - load : 모든 리소스의 로딩이 완료 되었을 때 이벤트 발생
  - abort : 리소스 로딩이 중단되었을 때 이벤트 발생
  - error : 리소스 로딩이 실패했을 때 이벤트 발생

## 3. 이벤트 핸들러 등록

**이벤트 핸들러(event handler) : 이벤트가 발생했을 브라우저에 의해 호출될 함수**

### 3-1. 이벤트 핸들러 어트리뷰트 방식

HTML 요소의 어트리뷰트 중에는 이벤트에 대응하는 이벤트 핸들러 어트리뷰트가 있는데 이름은 onclick 과 같이 on 접두사와 이벤트 타입으로 이루어져 있다

이벤트 핸들러 어트리뷰트 값으로 함수 호출문 등의 문을 할당하면 이벤트 핸들러가 등록된다

**이벤트 핸들러 어트리뷰트 값을 암묵적으로 생성될 이벤트 핸들러의 함수 몸체를 의미한다**

이런 암묵적인 동작을 하는 이유는 이벤트 핸들러에 인수를 전달하기 위해서다

결국 이벤트 핸들러 어트리뷰트 값으로 할당한 문자열은 암묵적으로 생성되는 이벤트 핸들러의 함수 몸체이기 때문에 값으로 여러 개의 문을 할당할 수 있다

### 3-2. 이벤트 핸들러 프로퍼티 방식

window 객체와 Document, HTMLElement 타입의 DOM 노드 객체는 이벤트에 대응하는 이벤트 핸들러 프로퍼티를 가지고 있다

이벤트 핸들러 프로퍼티 키는 onclick 과 같이 on 접두사와 이벤트 타입으로 이루어져 있다

이벤트 핸들러 프로퍼티에 함수를 바인딩하면 이벤트 핸들러가 등록된다

**이벤트 타깃(event target) : 이벤트를 발생시킬 객체**

**이벤트 타입(event type) : 이벤트의 종류를 나타내는 문자열**

**이벤트 핸들러(event handler) : 이벤트가 발생했을 때 호출될 함수**

이벤트 핸들러 프로퍼티 방식은 하나의 이벤트에 하나의 이벤트 핸들러만 바인딩 할 수 있다는 단점이 있다

**사용 예시**

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      // 이벤트 핸들러 프로퍼티 방식은 하나의 이벤트에 하나의 이벤트 핸들러만 바인딩할 수 있다.
      // 첫 번째로 바인딩된 이벤트 핸들러는 두 번째 바인딩된 이벤트 핸들러에 의해 재할당되어 실행되지 않는다.
      $button.onclick = function () {
        console.log("Button clicked 1");
      };

      // 두 번째로 바인딩된 이벤트 핸들러
      $button.onclick = function () {
        console.log("Button clicked 2");
      };
    </script>
  </body>
</html>
```

### 3-3. addEventListener 메서드 방식

첫 번째 매개변수에 이벤트의 종류를 나타내는 문자열인 이벤트 타입을 전달할 때 on 접두사를 붙이지 않는다

addEventListener 메서드 방식은 이벤트 핸들러 프로퍼티에 바인딩된 이벤트 핸들러에 영항을 주지 않는다

addEventListener 메서드는 하나 이상의 이벤트 핸들러를 등록할 수 있고 이때 등록된 순서대로 호출된다

단, 참조가 동일한 이벤트 핸들러를 중복 등록하면 하나의 이벤트 핸들러만 등록된다

**사용 예시**

```html
<!DOCTYPE html>
<html>
  <body>
    <button>Click me!</button>
    <script>
      const $button = document.querySelector("button");

      $button.addEventListener("click", function () {
        console.log("button click");
      });
    </script>
  </body>
</html>
```

## 4. 이벤트 제거

addEventListener 메서드로 등록한 이벤트 핸들러를 제거하려면 EventTarget.prototype.removeEventListener 메서드를 사용한다. 단, 제거할 addEventListener 메서드와 동일한 인수를 전달해야 한다

무명 함수를 이벤트 핸들러로 등록한 경우 제거할 수 없다

단, 기명 이벤트 핸들러 내부에서 removeEventListener 메서드를 호출하여 이벤트 핸들러를 제거하는 것은 가능하다. 이때 이벤트 핸들러는 한 번만 호출된다

무명 함수가 이벤트 핸들러로 등록된 경우 핸들러 내부에서 removeEventListener 메서드를 호출 후 함수 자신을 가리키는 arguments.callee 를 두 번째 인수로 전달해 제거할 수 있다

이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러는 null을 재할당 해 제거할 수 있다

## 5. 이벤트 객체

**이벤트가 발생하면 이벤트에 관련한 정보를 담고 있는 이벤트 객체가 동적으로 생성되고 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다**

**예시**

```html
<!DOCTYPE html>
<html>
  <body>
    <p>클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
    <em class="message"></em>
    <script>
      const $msg = document.querySelector(".message");

      // 클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다.
      function showCoords(e) {
        $msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
      }

      document.onclick = showCoords;
    </script>
  </body>
</html>
```

이벤트 핸들러 어트리뷰트 방식으로 이벤트 핸들러를 등록했다면 반드시 event를 매개변수에 명시해야 이벤트 객체를 전달받을 수 있다

### 5-1. 이벤트 객체의 상속 구조

위 이미지의 Event, UIEvent, MouseEvent 등 모두는 생성자 함수이기 떄문에 생성자 함수를 호출하여 이벤트 객체를 생성할 수 있다

예를 들어, click 이벤트가 발생하면 암묵적으로 생성되는 MouseEvent 타입의 이벤트 객체는 다음과 같은 프로토타입 체인의 일원이 된다

이벤트 객체의 프로퍼티는 발생한 이벤트의 타입에 따라 달라진다

출처 : https://poiemaweb.com/
