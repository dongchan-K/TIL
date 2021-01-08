# strict mode

## 1. strict mode 란?

- **ES5 부터 추가된 strict mode(엄격 모드)는 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 소지가 있는 코드에 대해 명시적인 에러를 발생시킨다**

```js
function foo() {
  x = 10;
}
foo();

console.log(x); // 10
```

- 위 예시는 foo 함수 내에서 선언하지 않은 x 변수에 값 10을 할당했다. 따라서 자바스크립트 엔진은 x 변수가 어디서 선언되었는지 스코프 체인을 따라 x 변수의 선언을 검색한다
- 전역 스코프에도 x 변수의 선언이 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같지만 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다. 이때 전역 객체의 x 프로퍼티는 마치 전역 변수처럼 사용가능하다. 이러한 현상을 **암묵적 전역(implicit global)** 이라 한다
- 따라서 반드시 var, const, let 키워드를 사용해서 변수를 선언한 후 사용해야 하지만 실수를 방지하기 위해 strict mode 혹은 ESLint 같은 도구를 사용하여 잠재적인 오류를 방지할 수 있다
- ES6에서 도입된 클래스와 모듈은 기본적으로 strict mode가 적용된다

## 2. strict mode의 적용

- strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 `'use strict';` 를 추가한다

```js
// 스크립트 전체에 strict mode 적용
"use strict";

function foo() {
  x = 10; // ReferenceError : x is not defined
}
foo();
```

```js
function foo() {
  // 해당 함수와 중첩 함수에 대해 strict mode 적용
  "use strict";

  x = 10; // ReferenceError: x is not defined
}
foo();
```

## 3. 전역에 strict mode를 적용하는 것은 피하자

- 전역에 적용한 strict mode는 스크립트 단위로 적용된다

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      "use strict";

    </script>
    <script>
      x = 1; // 에러가 발생하지 않는다.
      console.log(x); // 1
    </script>
    <script>
      "use strict";

      y = 1; // ReferenceError: y is not defined
      console.log(y);
    </script>
  </body>
</html>
```

- 위와 같이 strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다. 이런 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다

```js
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
  "use strict";

  // Do something...

})();
```

## 4. 함수 단위로 strict mode를 적용하는 것도 피하자

- 모든 함수에 일일히 strict mode를 적용하는 것은 번거로우며, 어떤 함수는 strict mode를 사용하고 어떤 함수는 non-strict 인 것은 바람직하지 않다
- strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다

```js
(function () {
  // non-strict mode
  var let = 10; // 에러 발생하지 않음

  function foo() {
    "use strict";

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
})();
```

## 5. strict mode가 발생시키는 에러

- 아래는 strict mode를 적용했을 때 에러를 발생시키는 대표적인 사례임

### 5-1. 암묵적 전역

- 선언하지 않은 변수를 참조하면 ReferenceError 가 발생

```js
(function () {
  "use strict";

  x = 1;
  console.log(x); // ReferenceError: x is not defined
})();
```

### 5-2. 변수, 함수, 매개변수의 삭제

- delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생 -> 이전에 delete 연산자 사용이 필요한 코드 자체의 문제가 있다고 알아봤다

```js
(function () {
  "use strict";

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
})();
```

### 5-3. 매개변수 이름의 중복

- 중복된 매개변수 이름을 사용하면 SyntaxError가 발생

```js
(function () {
  "use strict";

  // SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
})();
```

### 5-4. with 문의 사용

- with 문은 전달된 객체를 스코프 체인에 추가하는데 성능과 가독성이 나빠지기 때문에 사용하지 않는 것이 좋다
- with 문을 사용하면 SyntaxError가 발생

```js
(function(){
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with({ x: 1 }){
    console.log(x);
  }
}())'
```

## 6. strict mode 적용에 의한 변화

### 6-1. 일반 함수의 this

- strict mode 에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다
- 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기에 에러를 발생시키지 않음

```js
(function () {
  "use strict";

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
})();
```

### 6-2. arguments 객체

- strict mode 에서는 매개변수에 전달된 인수를 재할당 하여도 arguments 객체에 반영되지 않는다

```js
(function (a) {
  "use strict";

  // 매개변수에 전달된 인수를 재할당
  a = 2;

  // 재할당 된 인수가 arguments 객체에 반영되지 않음
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```

출처 : https://poiemaweb.com/
