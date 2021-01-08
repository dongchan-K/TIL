# 생성자 함수에 의한 객체 생성

**생성자 함수(constructor)란 new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말하며, 생성자 함수에 의해 생성된 객체를 인스턴스(instance)라 한다**

## 1. Object 생성자 함수

**new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈 객체 생성후 프로퍼티 또는 메서드를 추가하여 객체를 완성할 수 있다**

- 자바스크립트는 Object 생성자 함수 이외에도 String, Number, Boolean, Array, Function, Date, Promise 등의 빌트인(built-in, 내장) 생성자 함수를 제공한다
- 반드시 Object 생성자 함수를 이용해 빈 객체를 생성할 필요는 없다

```js
// 빈 객체 생성
const person = new Object();

// 프로퍼티 추가
person.name = "Kim";
person.sayHello = function () {
  console.log("Hello! My name is " + this.name);
};

console.log(person); // {name: 'Kim', sayHello: function}
person.sayHello(); // Hello! My name is Kim
```

## 2. 생성자 함수

### 2-1. 객체 리터럴에 의한 객체 생성 방식의 문제점

- 객체 리터럴에 의한 객체 생성 방식은 직관적이고 간편하다는 장점이 있지만, 단 하나의 객체만 생성하기 때문에 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적이다
- 객체는 프로퍼티를 통해 객체 고유의 상태(state)를 표현한다. 그리고 메서드를 통해 상태 데이터인 프로퍼티를 참조하고 조작하는 동작(behavior)을 표현한다. 따라서 프로퍼티는 객체마다 프로퍼티 값이 다를 수 있지만 메서드는 내용이 동일한 경우가 일반적이다

```js
// circle1 과 circle2 는 프로퍼티 구조가 동일하다. 객체 고유의 상태 데이터인 radius 프로퍼티의 값은 객체마다 다를 수 있지만 getDiameter 메서드는 동일하다
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle2.getDiameter()); // 20
```

### 2-2. 생성자 함수에 의한 객체 생성 방식의 장점

- 생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다

```js
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스의 생성
const circle1 = new Circle(5); // 반지름이 5인 Circle 객체 생성
const circle2 = new Circle(10); // 반지름이 10인 Circle 객체 생성

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

- this는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수(self-referencing variable)다. **this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다**

![this바인딩](https://user-images.githubusercontent.com/67866773/93732615-0fea2900-fc0d-11ea-9fd1-cbeaa9444e70.PNG)

```js
function foo() {
  console.log(this);
}

// 일반적인 함수 호출
foo(); // window

// 메서드로서 호출
const obj = { foo };
obj.foo(); // obj

// 생성자 함수로서 호출
const inst = new foo(); // inst
```

- 생성자 함수는 이름 그대로 객체(인스턴스)를 생성하는 함수다. 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 **new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다.** 만약 new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작한다

```js
// 일반 함수로 동작한다
const circle3 = Circle(15);

console.log(circle3); // undefined

console.log(radius); // 15
```

### 2-3. 생성자 함수의 인스턴스 생성 과정

- 생성자 함수가 몸체에서 수행해야 하는 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로서 동작하여 **인스턴스를 생성**하는 것과 **생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)** 하는 것이다

```js
// 생성자 함수
function Circle(radius){
  // 인스턴스 초기화
  this.radius = radius;
  this.getDiameter = function(){
    return * 2 this.radius;
  };
}

// 인스턴스 생성
const circle1 = new Circle(5); // 반지름이 5인 Circle 객체 생성
```

**i. 인스턴스 생성과 this 바인딩**

- 암묵적으로 생성자 함수가 생성한 인스턴스를 생성한다. 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩 된다. 때문에 생성자 함수 내부의 this가 생성자 함수가 생성할 인스턴스를 가리키게 된다
- 이와 같은 처리는 런타임 이전에 실행된다

**바인딩(binding)** : 식별자와 값을 연결하는 과정을 의미한다. this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다)와 this가 가리킬 객체를 바인딩하는 것이다

**ii. 인스턴스 초기화**

- 생성자 함수에 기술되어 있는 코드가 한 줄씩 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다

**iii. 인스턴스 반환**

- 생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다
- this가 아닌 다른 객체를 명시적으로 반환하면 return 문에 명시된 객체가 반환되고, 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다. 이처럼 생성자 내부에서 this가 아닌 다른 값을 반환할 경우 생성자 함수의 기본 동작을 훼손하므로 생성자 함수 내부에서 return 문을 반드시 생략해야 한다

```js
function Circle(radius) {
  // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩된다

  //2. this에 바인딩되어 있는 인스턴스를 초기화한다
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다
}

// 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다
const circle = new Circle(1);
console.log(circle); // Circle {radius: 1l, getDiameter: f}
```

### 2-4. 내부 메서드 [[Call]] 과 [[Construct]]

- 함수는 객체이므로 일반 객체(ordinary object)와 동일하게 동작할 수 있다.(같다는 것은 아님) 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있기 때문

```js
function foo() {}

// 함수는 객체이므로 프로퍼티를 가질 수 있다
foo.prop = 10;

// 함수는 객체이므로 메서드를 가질 수 있다
foo.method = function () {
  console.log(this.prop);
};

foo.method(); // 10
```

- 함수는 객체이지만 일반 객체와 다르다. **일반 객체는 호출할 수 없지만 함수는 호출할 수 있다**
- 함수가 일반 함수로서 호출되면 함수 객체의 내부 메서드 [[Call]]이 호출되고 new 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 [[Construct]]가 호출된다

```js
function foo() {}

// 일반적인 함수로서 호출: [[Call]]이 호출된다.
foo();

// 생성자 함수로서 호출: [[Construct]]가 호출된다.
new foo();
```

- 내부 메서드 [[Call]]을 갖는 함수 객체를 callable, 내부 메서드 [[Construct]]를 갖는 함수 객체를 constructor, [[Construct]]를 갖지 않는 함수 객체를 non-constructor 이라 한다
- 즉, callable은 함수(호출할 수 있는 객체), constructor는 생성자 함수로서 호출할 수 있는 함수, non-constructor는 객체를 생성자 함수로서 호출할 수 없는 함수를 의미한다
- 함수는 호출 가능하므로 함수 객체는 반드시 callable 이지만, 반드시 constructor, non-constructor는 아니다. 즉, 모든 함수 객체는 호출 가능하지만 모든 함수 객체를 생성자 함수로서 호출할 수 있는 것은 아니다
- 일반 함수로서 호출하면 [[Call]]이 호출되고 new 연산자와 함께 생성자 함수로서 호출하면 [[Constructor]]가 호출된다

```js
function foo() {}

// 일반 함수로서 호출
// [[Call]]이 호출된다. 모든 함수 객체는 [[Call]]이 구현되어 있다.
foo();

// 생성자 함수로서 호출
// [[Construct]]가 호출된다. 이때 [[Construct]]를 갖지 않는다면 에러가 발생한다.
new foo();
```

![call과constructor](https://user-images.githubusercontent.com/67866773/93768618-9fff9100-fc54-11ea-9464-a5a3bd185458.png)

### 2-5. constructor와 non-constructor의 구분

**자바스크립트 엔진은 함수 객체를 생성할 때 함수 정의 방식에 따라 함수를 constructor 와 non-constructor로 구분한다**

- constructor : 함수 선언문, 함수 표현식, 클래스(클래스도 함수다)
- non-constructor : 메서드(ES6 메서드 축약 표현), 화살표 함수
- 함수를 프로퍼티 값으로 사용하면 일반적으로 메서드로 통칭하지만 ECMAScript 사양에 따르면 함수가 어디에 할당되어 있는지에 따라 메서드인지를 판단하는 것이 아니라 함수 정의 방식에 따라 constructor와 non-constructor를 구분한다

```js
// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo() {}
const bar = function () {};
// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다.
const baz = {
  x: function () {},
};

// 일반 함수로 정의된 함수만이 constructor이다.
new foo(); // -> foo&nbsp;{}
new bar(); // -> bar&nbsp;{}
new baz.x(); // -> x&nbsp;{}

// 화살표 함수 정의
const arrow = () => {};

new arrow(); // TypeError: arrow is not a constructor

// 메서드 정의: ES6의 메서드 축약 표현만을 메서드로 인정한다.
const obj = {
  x() {},
};

new obj.x(); // TypeError: obj.x is not a constructor
```

### 2-6. new 연산자

- new 연산자와 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작한다. 때문에 [[Constructor]]가 호출되고 new 연산자와 함께 호출하는 함수는 non-constructor가 아닌 constructor이어야 한다

```js
// 생성자 함수로서 정의하지 않은 일반 함수
function add(x, y) {
  return x + y;
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
let inst = new add();
// 함수가 객체를 반환하지 않았으므로 반환문이 무시된다. 따라서 빈 객체가 생성되어 반환된다.
console.log(inst); // {}

// 객체를 반환하는 일반 함수
function createUser(name, role) {
  return { name, role };
}

// 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
inst = new createUser("Kim", "admin");
// 함수가 생성한 객체를 반환한다.
console.log(inst); // {name: "Kim", role: "admin"}
```

- new 연산자 없이 생성자 함수를 호출하면 일반 함수로 호출된다

```js
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출된다.
const circle = Circle(5);
console.log(circle); // undefined

// 일반 함수 내부의 this는 전역 객체 window를 가리킨다.
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter();
// TypeError: Cannot read property 'getDiameter' of undefined
```

- 위 예시처럼 Circle 함수를 new 연산자와 함께 생성자 함수로서 호출하면 함수 내부의 this는 Circle 생성자 함수가 생성할 인스턴스를 가리킨다. 하지만 Circle 함수를 일반적인 함수로서 호출하면 함수 내부의 this는 전역 객체 window를 가리킨다

### 2-7. new.target

- new.target은 this와 유사하게 constructor인 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티라고 부른다
- 함수 내부에서 new.target을 사용하면 new 연산자와 함께 생성자 함수로서 호출되었는지 확인할 수 있다. **new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다. new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target은 undefined이다**
- 따라서 new.target을 사용하여 생성자 함수로서 호출했는지 확인하여 그렇지 않은 경우 new 연산자와 함께 재귀 호출을 통해 생성자 함수로서 호출할 수 있다

```js
// 생성자 함수
function Circle(radius) {
  // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined다.
  if (!new.target) {
    // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter());
```

\*\*스코프 셰이프 생성자 패턴(scope-safe constructor)

```js
// Scope-Safe Constructor Pattern
function Circle(radius) {
  // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고
  // this에 바인딩한다. 이때 this와 Circle은 프로토타입에 의해 연결된다.

  // 이 함수가 new 연산자와 함께 호출되지 않았다면 이 시점의 this는 전역 객체 window를 가리킨다.
  // 즉, this와 Circle은 프로토타입에 의해 연결되지 않는다.
  if (!(this instanceof Circle)) {
    // new 연산자와 함께 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```

- new 연산자와 함께 생성자 함수에 의해 생성된 객체(인스턴스)는 프로토타입에 의해 생성자 함수와 연결된다
- 대부분의 빌트인 생성자 함수(Object, String, Number, Boolean, Function, Array 등)는 new 연산자와 함께 호출되었는지 확인한 후 적절한 값을 반환한다
- 예를들어 Object, Function 생성자 함수는 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 동작한다

```js
let obj = new Object();
console.log(obj); // {}

obj = Object();
console.log(obj); // {}

let f = new Function("x", "return x ** x");
console.log(f); // ƒ anonymous(x) { return x ** x }

f = Function("x", "return x ** x");
console.log(f); // ƒ anonymous(x) { return x ** x }
```

- 하지만 String, Number, Boolean 생성자 함수는 new 연산자와 함께 호출했을 때 String, Number, Boolean 객체를 생성하여 반환하지만 new 연산자 없이 호출하면 명시적 타입 변환에 의해 문자열, 숫자, 불리언 값을 반환한다

## 강의 내용 요약

- 생성자 함수는 따로 문법이 있는 것이 아니라 일반 함수와 구분하기 위해 생성자 함수 이름을 대문자로 시작한다(파스칼 케이스)
- 함수 내부는 문이기 때문에 세미콜론(;) 으로 각 문을 구분한다
- 객체 리터럴 생성 방식의 단점은 동일한 프로퍼티를 갖는 객체를 여러 개 생성할 경우 비효율적이다
- 아래 예시를 통해 호출 방식에 따른 동작을 이해할 것

```js
function foo() {
  console.log(this);
}

foo(); // 일반 함수로서 호출 , this는 전역 객체 window를 가리킨다
console.log(foo()); // undefined를 반환

new foo(); // 생성자 함수로서 호출, this는 생성자 함수가 생성할 인스턴스를 가리킴
console.log(new foo()); // 빈 객체(foo {})를 반환

const o = { x: foo }; // 메서드로서 호출, this는 메서드를 호출한 객체 o를 가리킴
console.log(o); // {x: [Function: foo]}를 반환
```

- 일반 함수로서 호출하게 되면 [[Call]] 내부 메서드가 호출된다
- 생성자 함수로서 호출하게 되면 [[Construct]] 내부 메서드가 호출된다
- 메서드 축약 표현 사용시 [[Call]] 만 존재하고 [[Construct]] 는 존재하지 않는다

**1. 면적을 계산할 수 있는 사각형 객체 생성 예시**

```js
function Rectangle(width, height) {
  // 생성자 함수로 호출되었기 때문에 this 는 생성자 함수가 생성할 Rectangle 인스턴스(객체)를 가리킨다
  this.width = width; // 프로퍼티(상태)
  this.height = height; // 프로퍼티(상태)
  // 메서드(동작)
  this.getArea = function () {
    return this.width * this.height;
  };
}

const r = new Rectangle(2, 4); // 생성자 함수로서 호출
const area = r.getArea(); // 생성자 함수로 생성된 인스턴스 Rectangle 의 메서드로서 호출
console.log("면적 : ", area); // 면적 : 8
```

**2. 생성자 함수로서 호출하지 않아도 생성자 함수처럼 동작하기 위한 예시**

```js
function Circle(radius) {
  // Circle을 일반 함수로서(new를 생략하고) 호출 했을 경우 실행될 재귀함수
  if (!new.target) {
    return new Circle(radius); // 생성자 함수로서 호출
  }
  // 생성자 함수로 호출 되었기 때문에 this는 생성자 함수가 생성할 인스턴스(객체) Circle을 가리킨다
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle = Circle(10); // 일반 함수로서 호출
const diameter = circle.getDiameter(); // 생성자 함수로 생성된 Circle 인스턴스의 메서드로서 호출
console.log(diameter); // 20
```

**3. 생성자 함수로서 호출했을때의 자바스크립트 엔진의 암묵적인 동작 예시**

```js
function Circle(radius) {
  // this = {}
  console.log(this); // Circle {}

  this.radius = radius;
  console.log(this); // Circle {radius: 5}

  this.getDiameter = function () {
    return 2 * this.radius;
  };
  console.log(this); // Circle {radius: 5, getDiameter: f}

  // return this; -> 생성자'함수' 이기 때문에 반환문이 필요하지만 생략되어도 암묵적으로 this가 반환된다
}

const circle = new Circle(5); // 생성자 함수로서 호출, 빈 객체를 생성
console.log("circle: ", circle); // circle: Circle {radius: 5, getDiameter: f}

const radius = circle.getDiameter(); // 메서드로서 호출
console.log(radius); // 10
```

## 강의 내용 요약

- 객체 생성 방식에는 객체 리터럴, 생성자 함수가 있다
- 객체 리터럴에 의한 객체 생성 방식의 단점은 동일한 프로퍼티를 갖는 객체를 여러 개 생성할 경우 비효율적이다
- 생성자 함수에 의한 객체 생성 방식의 장점은 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다
- new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다
- 모든 함수 객체는 내부 메서드 [[Call]] 을 갖는다
- 내부 메서드 [[Constructor]] 를 갖는 함수 객체를 constructor, 갖지 않는 함수 객체를 non-constructor 라 한다
- 모든 함수 객체는 호출할 수는 있지만 constructor 함수 객체만이 생성자 함수로 호출할 수 있다
- constructor 함수에는 함수 선언문, 함수 표현식, 클래스가 있다
- non-constructor 함수에는 메서드(ES6 메서드 축약 표현), 화살표 함수가 있다. 이때 ES6 메서드 축약 표현은 함수 내부가 아닌 객체에서만 사용 가능하다
- constructor는 함수 호출에 의해 일반 함수 또는 생성자 함수가 결정된다
- 생성자 함수로서 호출한 함수 객체는 암묵적으로 인스턴스가 바인딩 된 this를 반환한다 -> 때문에 생성자 함수로 호출된 함수는 return 문을 생략하는 것이 일반적이다
- 생성자 함수로서 호출한 함수객체는 명시적으로 객체를 반환(return)하면 객체가 반환되고 명시적으로 원시값을 반환하면 무시되고 인스턴스가 바인딩 된 this가 반환된다
- 생성자 함수로서 호출된 함수 내부에서 new.target은 함수 자신을 가리키고 일반 함수로 호출된 함수 내부에서 new.target은 undfined 이다

출처 : https://poiemaweb.com/
