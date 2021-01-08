# 빌트인 객체

## 1. 자바스크립트 객체의 분류

- 표준 빌트인 객체(standard built-in objects / native objects / global objects) : ECMAScript 사양에 정의된 객체를 말하며, 실행환경에 관계없이 사용할 수 있고 전역 객체의 프로퍼티로서 제공되기 때문에 언제나 참조할 수 있다
- 호스트 객체(host objects) : 자바스크립트 실행 환경(브라우저 환경 또는 Node.js 환경)에서 추가로 제공하는 객체를 말한다
- 사용자 정의 객체(user-defined objects) : 사용자가 직접 정의한 객체를 말한다

## 2. 표준 빌트인 객체

- 자바스크립트는 40여개의 표준 빌트인 객체를 제공한다
- Math, Reflect, JSON 는 정적 메소드만 제공하며 앞의 3개를 제외한 표준 빌트인 객체는 생성자 함수 객체로서 프로토타입 메서드와 정적 메소드를 제공한다

```js
// 표준 빌트인 객체인 String, Number,Boolean은 생성자 함수로 호출하여 인스턴스를 생성할 수 있다

const strObj = new String("Kim"); // String {'Kim'}
console.log(typeof strObj); // object

const numObj = new Number(12); // Number {12}
console.log(typeof numObj); // object

const boolObj = new Boolean(true); // Boolean {true}
console.log(typeof boolObj); // object
```

- 생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체이다

```js
const strObj = new String("Kim"); // String {'Kim'}
console.log(Object.getPrototypeOf(strObj) === String.prototype); // true
```

- 표준 빌트인 객체의 prototype에 바인딩된 객체는 다양한 기능의 빌트인 프로토타입 메서드를 제공한다. 그리고 표준 빌트인 객체는 인스턴스 없이도 호출 가능한 빌트인 정적 메서드를 제공한다

```js
// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1.5); // Number {1.5}

// toFixed는 Number.prototype의 프로토타입 메서드이다
// Number.prototype.toFixed는 소수점 자리를 반올림하여 문자열로 반환한다
console.log(numObj.toFixed()); // 2

// inInteger는 Number의 정적 메서드이다
// Number.isInteger는 인수가 정수인지 검사하여 그 결과를 Boolean으로 반환한다
console.log(Number.isInteger(0.5)); // false
```

## 3. 원시값과 래퍼 객체

- 원시값인 문자열, 숫자, 불리언 값의 경우 마치 객체처럼 마침표 표기법(또는 대괄호 표기법)으로 접근하면 자바스크립트 엔진이 암묵적으로 원시값을 연관된 객체를 생성하여 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌린다

```js
const str = "hello";

// 원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작한다
console.log(str.length); // 5
console.log(str.toUpperCase); // HELLO
```

- **문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼 객체(wrapper object)라 한다**

```js
const str = "hi";

// 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환된다
console.log(str.length); // 2
console.log(str.toUpperCase); // HI

// 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 이후 다시 원시값으로 되돌린다
console.log(typeof str); // string
```

위 예시의 문자열 래퍼 객체인 String 생성자 함수의 인스턴스는 String.prototype의 메서드를 상속받아 사용할 수 있다

- 위와 같은 이유로 표준 빌트인 객체인 String, Number, Boolean 생성자 함수를 new 연산자와 함께 호출하여 인스턴스를 생성할 필요가 없다

## 4. 전역 객체

- 전역 객체(global object)는 코드가 실행되기 이전에 자바스크립트 엔진에 의해 생성되는 특수한 객체이며, 어떤 객체에도 속하지 않는 최상위 객체이다

globalThis : ES11에서 도입된 브라우저 환경과 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일한 식별자이다

```js
// 브라우저 환경
globalThis === this; // true
globalThis === window; // true
globalThis === self; // true
globalThis === frames; // true

// Node.js 환경(12.0.0 이상)
globalThis === this; // true
globalThis === global; // true
```

전역 객체의 특징

- 전역 객체는 개발자가 의도적으로 생성할 수 없다. 즉, 전역 객체를 생성할 수 있는 생성자 함수가 제공되지 않는다
- 전역 객체의 프로퍼티를 참조할 때 window(또는 global)를 생략할 수 있다
- 전역 객체는 표준 빌트인 객체를 프로퍼티로 가지고 있다
- 자바스크립트 실행환경에 따라 추가적으로 프로퍼티와 메서드를 갖는다. 브라우저 환경에서는 클라이언트 사이드 Web API를 호스트 객체로 제공하고 Node.js 환경에서는 Node.js 고유의 API를 호스트 객체로 제공한다
- var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다

```js
// var 키워드로 선언한 전역 변수
var foo = 1;
console.log(window.foo); // 1

// 선언하지 않은 변수에 값을 암묵적 전역. bar는 전역 변수가 아니라 전역 객체의 프로퍼티다
bar = 2; // window.bar = 2
console.log(window.bar); // 2

// 전역 함수
function baz() {
  return 3;
}
console.log(window.baz()); // 3
```

- let이나 const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드)내에 존재하게 된다

```js
let foo = 123;
console.log(window.foo); // undefined
```

- 브라우저 환경의 모든 자바스크립트 코드는 여러개의 script 태그를 통해 분리해도 하나의 전역 객체 window를 공유한다

### 4-1. 빌트인 전역 프로퍼티

- 빌트인 전역 프로퍼티(built-in global property)는 전역 객체의 프로퍼티를 의미한다

#### 4-1-1. Infinity

- Infinity 프로퍼티는 무한대를 나타내는 숫자값 Infinity를 갖는다

```js
// 전역 프로퍼티는 window를 생략하고 참조할 수 있다.
console.log(window.Infinity === Infinity); // true

// 양의 무한대
console.log(3 / 0); // Infinity
// 음의 무한대
console.log(-3 / 0); // -Infinity
// Infinity는 숫자값이다.
console.log(typeof Infinity); // number
```

#### 4-1-2. NaN

- NaN 프로퍼티는 숫자가 아님을 나타내는 숫자값 NaN을 갖는다. Number.NaN 프로퍼티와 같다

```js
console.log(window.NaN); // NaN

console.log(Number("xyz")); // NaN
console.log(1 * "string"); // NaN
console.log(typeof NaN); // number
```

#### 4-1-3. undefined

- undefined 프로퍼티는 원시 타입 undefined를 값으로 갖는다

```js
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined
```

### 4-2. 빌트인 전역 함수

- 빌트인 전역 함수(built-in global function)는 애플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역 객체의 메서드이다

#### 4-2-1. eval

- eval 함수는 자바스크립트 코드를 나타내는 문자열을 인수로 전달받아 전달받은 코드가 표현식이라면 문자열 코드를 런타임에 평가하여 값을 생성하고, 표현식이 아닌 문이라면 문자열 코드를 런타임에 실행한다

```js
// 표현식인 문
eval("1 + 2;"); // 3
// 표현식이 아닌 문
eval("var x = 5;"); // undefined

// eval 함수에 의해 런타임에 변수 선언문이 실행되어 x 변수가 선언됨
console.log(x); // 5

// 객체 리터럴은 반드시 괄호로 묶는다
const o = eval("({ a: 1 })");
console.log(o); // {a: 1}

// 함수 리터럴은 반드시 괄호로 묶는다
const f = eval("(function(){ return 1; })");
console.log(f()); // 1
```

- 인수로 전달받은 코드가 여러개의 문으로 이루어져 있다면 모든 문을 실행한 다음, 마지막 결과값을 반환한다

```js
console.log(eval("1 + 2; 3 + 4;")); // 7
```

- **eval 함수는 자신이 호출된 위치에 해당하는 기존의 스코프를 런타임에 동적으로 수정한다**

```js
const x = 1;

function foo() {
  // eval 함수는 런타임에 foo 함수의 스코프를 동적으로 수정한다
  eval("var x = 2;");
  console.log(x); // 2
}

foo();
console.log(x); // 1
```

- 단, strict mode(엄격 모드)에서 eval 함수는 기존의 스코프를 수정하지 않고 eval 함수 자신의 자체적인 스코프를 생성한다

```js
const x = 1;

function foo() {
  "use strict";

  // strict mode에서 eval 함수는 기존의 스코프를 수정하지 않고 eval 함수 자신의 자체적인 스코프를 생성한다
  eval("var x = 2; console.log(x);"); // 2
  console.log(x); // 1
}

foo();
console.log(x); // 1
```

- 또한 인수로 전달받은 문자열 코드가 let, const 키워드를 사용한 변수 선언문이라면 암묵적으로 strict mode가 적용된다

```js
const x = 1;
function foo() {
  eval("var x = 2; console.log(x);"); // 2
  // let, const 키워드를 사용한 변수 선언문은 strict mode가 적용된다
  eval("const x = 3; console.log(x);"); // 3
  console.log(x); // 2
}

foo();
console.log(x); // 1
```

- 결론적으로 eval 함수는 보안에 매우 취약하고 자바스크립트 엔진에 의해 최적화가 수행되지 않기 때문에 실행 처리 속도가 느리다. 따라서 **eval 함수의 사용은 금지해야 한다**

#### 4-2-2. isFinite

- 전달받은 인수가 유한수인지 검사하여 유한수이면 true를 반환, 무한수이면 false를 반환한다. 숫자 타입이 아닌경우 숫자로 타입 변환 후 검사를 수행하는데 이때 인수가 NaN으로 평가되는 값이라면 false를 반환한다

```js
// 인수가 유한수이면 true를 반환한다.
isFinite(0); // true
isFinite(2e64); // true
isFinite("10"); // true: '10' → 10
isFinite(null); // true: null → 0

// 인수가 무한수 또는 NaN으로 평가되는 값이라면 false를 반환한다.
isFinite(Infinity); // false
isFinite(-Infinity); // false

// 인수가 NaN으로 평가되는 값이라면 false를 반환한다.
isFinite(NaN); // false
isFinite("Hello"); // false
isFinite("2005/12/12"); // false
```

#### 4-2-3. isNaN

- 전달받은 인수가 NaN인지 검사하여 그 결과를 불리언 타입으로 반환한다. 숫자 타입이 아닌경우 숫자로 타입 변환 후 검사를 수행한다

```js
// 숫자
isNaN(NaN); // true
isNaN(10); // false

// 문자열
isNaN("blabla"); // true: 'blabla' => NaN
isNaN("10"); // false: '10' => 10
isNaN("10.12"); // false: '10.12' => 10.12
isNaN(""); // false: '' => 0
isNaN(" "); // false: ' ' => 0

// 불리언
isNaN(true); // false: true → 1
isNaN(null); // false: null → 0

// undefined
isNaN(undefined); // true: undefined => NaN

// 객체
isNaN({}); // true: {} => NaN

// date
isNaN(new Date()); // false: new Date() => Number
isNaN(new Date().toString()); // true:  String => NaN
```

#### 4-2-4. parseFloat

- 전달받은 문자열 인수를 부동 소수점 숫자, 즉 실수로 해석하여 반환한다

```js
// 문자열을 실수로 해석하여 반환
parseFloat("3.14"); // 3.14
parseFloat("10.00"); // 10

// 공백으로 구분된 문자열은 첫 번째 문자열만 반환
parseFloat("34 45 66"); // 34
parseFloat("40 years"); // 40

// 첫 번째 문자열을 숫자로 변환할 수 없다면 NaN 반환
parseFloat("He was 40"); // NaN

// 앞뒤 공백은 무시
parseFloat(" 60 "); // 60
```

#### 4-2-5. parseInt

- 전달받은 문자열 인수를 정수로 해석하여 반환한다. 문자열이 아니라면 문자열로 변환 후 정수로 해석하여 반환한다

```js
// 문자열을 정수로 해석하여 반환
parseInt("10"); // 10
parseInt("10.123"); // 10

// 문자열로 변환 후 정수로 해석하여 반환
parseInt(10); // 10
parseInt(10.123); // 10
```

- 두 번째 인수로 진법을 나타내는 기수(2 ~ 36)를 전달할 수 있다. 기수를 지정하면 첫 번째 인수로 전달된 문자열을 해당 기수의 숫자로 해석하여 10진수로 반환한다

```js
// 10'을 10진수로 해석하고 그 결과를 10진수 정수로 반환
parseInt("10"); // 10
// '10'을 2진수로 해석하고 그 결과를 10진수 정수로 반환
parseInt("10", 2); // 2
// '10'을 8진수로 해석하고 그 결과를 10진수 정수로 반환
parseInt("10", 8); // 8
// '10'을 16진수로 해석하고 그 결과를 10진수 정수로 반환
parseInt("10", 16); // 16
```

- 기수를 지정하여 10진수 숫자를 해당 기수의 문자열로 변환하여 반환하고 싶을때는 Number.prototype.toString 메서드를 사용한다

```js
const x = 15;

// 10진수 15를 2진수로 변환하여 그 결과를 문자열로 반환
x.toString(2); // '1111'
// 문자열 '1111'을 2진수로 해석하고 그 결과를 10진수로 반환
parseInt(x.toString(2), 2); // 15

// 10진수 15를 8진수로 변환하여 그 결과를 문자열로 반환
x.toString(8); // '17'
// 문자열 '17'을 8진수로 해석하고 그 결과를 10진수 정수로 반환
parseInt(x.toString(8), 8); // 15

// 10진수 15를 16진수로 변환하여 그 결과를 문자열로 반환
x.toString(16); // -> 'f'
// 문자열 'f'를 16진수로 해석하고 그 결과를 10진수 정수로 반환
parseInt(x.toString(8), 8); // 15

// 숫자값을 문자열로 변환
x.toString(); // '15'
// 문자열 '15'를 10진수로 해석하고 그 결과를 10진수 정수로 반환
parseInt(x.toString()); // 15
```

- 두 번째 인수로 진법을 나타내는 기수를 지정하지 않더라도 첫 번째 인수로 전달된 문자열이 '0x' 또는 '0X'로 시작하는 16진수 리터럴이라면 16진수로 해석하여 10진수 정수로 반환한다

```js
// 16진수 리터럴 '0xf'를 16진수로 해석하고 10진수 정수로 그 결과를 반환한다.
parseInt("0xf"); // 15
// 위 코드와 같다.
parseInt("f", 16); // 15
```

#### 4-2-6. encodeURI / decodeURI

- encodeURI 함수는 완전한 URI(Uniform Resource Identifier)를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다. URI는 인터넷이 있는 자원을 나타내는 유일한 주소를 말한다

인코딩 : URI의 문자들을 이스케이프 처리하는 것을 말한다
이스케이프 처리 : 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자 셋(ASCII Character-set)으로 변환하는 것이다

### 4-2-6. encodeURIComponent / decodeURIComponent

- encodeURIComponent 함수는 전달된 URI 구성 요소를 인코딩한다

### 4-3. 암묵적전역

```js
var x = 10; // 전역 변수

function foo() {
  y = 20;
}

foo();

// 선언하지 않은 식별자 y를 전역에서 참조할 수 있다
console.log(x + y); // 30
```

- 위 예시와 같이 선언하지 않은 식별자 y는 마치 선언된 전역 변수처럼 동작한다. 즉 자바스크립트 엔진은 `y = 20`을 `window.y = 20` 으로 해석하여 전역 객체에 프로퍼티를 동적 생성한다. 결국 y는 전역 객체의 프로퍼티가 되어 마치 전역 변수처럼 동작하는데 이러한 현상을 **암묵적 전역(implicit global)이라 한다**

- 하지만 y는 단지 전역 객체의 프로퍼티로 추가되었을 뿐, y는 변수가 아니기 때문에 호이스팅이 발생하지 않는다

```js
// 전역 변수 x는 호이스팅이 발생한다.
console.log(x); // undefined
// 전역 변수가 아니라 단지 전역 객체의 프로퍼티인 y는 호이스팅이 발생하지 않는다.
console.log(y); // ReferenceError: y is not defined

var x = 10; // 전역 변수

function foo() {
  // 선언하지 않은 식별자에 값을 할당
  y = 20; // window.y = 20;
}
foo();

// 선언하지 않은 식별자 y를 전역에서 참조할 수 있다.
console.log(x + y); // 30
```

- 변수가 아니라 단지 프로퍼티인 y는 delete 연산자로 삭제할 수 있다. 전역 변수는 프로퍼티이지만 delete 연산자로 삭제할 수 없다

```js
var x = 10; // 전역 변수

function foo() {
  // 선언하지 않은 식별자에 값을 할당
  y = 20; // window.y = 20;
  console.log(x + y);
}

foo(); // 30

console.log(window.x); // 10
console.log(window.y); // 20

delete x; // 전역 변수는 삭제되지 않는다.
delete y; // 프로퍼티는 삭제된다.

console.log(window.x); // 10
console.log(window.y); // undefined
```

출처 : https://poiemaweb.com/
