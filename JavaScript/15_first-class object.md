# 함수와 일급 객체

## 1. 일급 객체
**다음 조건을 만족하는 객체를 일급 객체(first-class object)라고 한다**

1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성 가능하다 -> 무명의 리터럴은 변수에 할당하지 않으면 사용할 수 없다. 즉, 변수에 할당한다는 것은 런타임에 생성된다는 것이다
2. 변수나 자료구조(객체,배열 등)에 저장할 수 있다
3. 함수의 매개변수에 전달할 수 있다. 즉, 값으로 평가된다
4. 함수의 반환값으로 사용할 수 있다. 즉, 값으로 평가된다

- 자바스크립트의 함수는 위 조건을 모두 만족하기 때문에 일급 객체다
- 일급 객체로서 함수가 가지는 특징은 객체와 동일하게 값이므로 값과 동일하기 취급하여 값을 사용할 수 있는 곳 어디서든지 리터럴로 정의할 수 있으며 런타임에 함수 객체로 평가된다. 
- **때문에 함수의 매개변수에 전달할 수 있으며 함수의 반환값으로도 사용할 수 있다는 것이 함수형 프로그래밍을 가능케 하는 자바스크립트의 장점 중 하나이다**
- **함수 객체와 일반 객체의 차이는 함수는 호출 가능하지만 일반 객체는 호출할 수 없고 함수 객체는 고유의 프로퍼티를 소유한다**

**아래 예시로 살펴보자**
```js
// 1. 함수는 무명 리터럴로 생성할 수 있다
// 2. 변수에 저장할 수 있다
const increase = function (num){
  return ++num;
};

// 2. 객체에 저장할 수 있다
const predicates = {increase};

// 3. 함수의 매개변수에 전달할 수 있다
// 4. 함수의 반환값으로 사용할 수 있다
function makeCounter(predicate) {
  let num = 0;

  return function () {
    num = predicate(num);
    return num;
  };
}

// 3. 함수의 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2
```

## 2. 함수 객체의 프로퍼티
- 함수도 객체이기 때문에 프로퍼티를 가질 수 있다
- arguments, caller, length, name, prototype 프로퍼티는 함수 객체 고유의 프로퍼티이다

**아래 예시로 살펴볼 수 있다**
```js
function square(number) {
  return number * number;
}

console.log(Object.getOwnPropertyDescriptors(square));
/*
{
  length: {value: 1, writable: false, enumerable: false, configurable: true},
  name: {value: "square", writable: false, enumerable: false, configurable: true},
  arguments: {value: null, writable: false, enumerable: false, configurable: false},
  caller: {value: null, writable: false, enumerable: false, configurable: false},
  prototype: {value: {...}, writable: true, enumerable: false, configurable: false}
}
*/
```
### 2-1. arguments 프로퍼티
- 함수 객체의 arguments 프로퍼티 값은 arguments 객체다. arguments 객체는 함수 호출 시 전달된 인수(argument)들의 정보를 담고 있는 순회 가능한(iterable) 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용된다. 즉, 함수 외부에서는 참조할 수 없다
- arguments 객체는 `인수의 순서(프로퍼티 키) : 인수(프로퍼티 값) `를 나타낸다
- arguments 객체의 callee 프로퍼티는 호출되어 arguments 객체를 생성한 함수를 가리키고, arguments 객체의 length 프로퍼티는 인수(argument)의 개수를 가리킨다
- arguments 객체의 Symbol(Symbol.iterator) 프로퍼티는 arguments 객체를 순회 가능한 구조인 이터러블(iterable)로 만들기 위한 프로퍼티이다
```js
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

console.log(multiply());        // NaN
console.log(multiply(1));       // NaN
console.log(multiply(1, 2));    // 2
console.log(multiply(1, 2, 3)); // 2
```
![arguments 객체의 프로퍼티](https://user-images.githubusercontent.com/67866773/93888709-53cf5200-fd23-11ea-82f1-2461f872a847.png)
- **arguments 객체는 매개변수 객체를 확정할 수 없는 가변인자 함수를 구현할 때 유용하다**
- arguments 객체는 유사 배열 객체(array-like object)이다
- 유사 배열 객체 : length 프로퍼티를 가진 객체로 for 문으로 순회할 수 있는 객체를 말한다
- 유사 배열 객체는 배열이 아니므로 배열 메서드를 사용할 경우 에러가 발생하기 때문에 배열 메서드를 사용하기 위해서는 Function.prototype.call , Function.prototype.apply를 사용해 간접 호출해야 한다
```js
function sum() {
  let res = 0;

  // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있다.
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }

  return res;
}

console.log(sum());        // 0
console.log(sum(1, 2));    // 3
console.log(sum(1, 2, 3)); // 6
```
```js
function sum() {
  // arguments 객체를 배열로 변환
  const array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

### 2-2. caller 프로퍼티
- 함수 객체의 caller 프로퍼티는 함수 자신을 호출한 함수를 가리킨다

**아래 예시로 살펴볼 수 있다**
```js
function foo(func) {
  return func();
}

function bar() {
  return 'caller : ' + bar.caller;
}

// 브라우저에서의 실행한 결과
console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar());    // caller : null
```

### 2-3. length 프로퍼티
- 함수 객체의 length 프로퍼티는 함수를 정의할 때 선언한 매개변수(parameter)의 개수를 가리킨다

**아래 예시로 살펴볼 수 있다**
```js
function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2
```

### 2-4. name 프로퍼티
- 함수 객체의 name 프로퍼티는 함수 이름을 나타낸다
- 익명 함수 표현식의 경우 ES5에서는 빈 문자열을 값으로 갖고, ES6에서는 함수 객체를 가리키는 식별자를 값으로 갖는다

**아래 예시로 살펴볼 수 있다**
```js
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function() {};
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다.
// ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() {}
console.log(bar.name); // bar

```

### 2-5. `__proto__` 접근자 프로퍼티
- 모든 객체는 [[Prototype]] 이라는 내부 슬롯을 갖는다. 이는 객체 지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다
- `__proto__` 프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다

**예시를 통해 살펴보자**
```js
const obj = { a: 1 };

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
// hasOwnProperty 메서드는 Object.prototype의 메서드다.
console.log(obj.hasOwnProperty('a'));         // true
console.log(obj.hasOwnProperty('__proto__')); // false
```
- hasOwnProperty 메서드 : 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다

### 2-6. prototype 프로퍼티
- prototype 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티이며 일반 객체와 non-constructor에는 prototpye 프로퍼티가 없다

**예시**
```js
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty('prototype'); // -> true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty('prototype'); // -> false
```
- prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.

## 강의 내용 요약
- 일급 객체 : 무명의 리터럴로 생성할 수 있다, 변수나 자료구조(객체,배열 등)에 저장할 수 있다, 함수의 매개변수에 전달할 수 있다(즉, 값으로 평가된다), 함수의 반환값으로 사용할 수 있다(즉, 값으로 평가된다) <- 이와 같은 조건을 만족하는 객체를 일급 객체라 한다
- 함수 객체는 고유의 프로퍼티 `arguments`, `caller`, `length`, `name`, `__proto__` 접근자 프로퍼티, prototype 프로퍼티를 갖는다
- arguments 프로퍼티의 값인 arguments 객체는 함수 호출 시 전달된 인수들의 정보를 갖는 유사배열 객체이다
- arguments 프로퍼티는 ES3에서부터 표준에서 폐지되었기 때문에 함수 내부에서 지역 변수처럼 참조 가능한 arguments 객체를 참조할 것
- length 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다
- name 프로퍼티는 함수 객체의 함수 이름을 가리킨다
- 모든 객체는 Object.prototype 으로부터 상속받은 `__proto__` 접근자 프로퍼티를 가지며 `__proto__` 를 통해 간접적으로 내부 슬롯 [[Prototype]]에 접근 가능하다
- prototype 프로퍼티는 constructor 함수 객체만 소유하며 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다