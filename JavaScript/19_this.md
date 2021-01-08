# this

## 1. this 키워드

- 객체는 상태(state)를 나타내는 프로퍼티와 동작(behavior)을 나타내는 메서드를 하나의 논리적인 단위로 묶은 복합적인 자료 구조이다
- 이때 메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다

```js
function Circle(radius){
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다
  ????.radius = radius;
}

Circle.prototype.getDiameter = function(){
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다
  return 2 * ????.radius
}

// 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야 한다
const circle = new Circle(5);
```

- 위와 같이 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수가 존재해야 한다

**this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referencing variable)이다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다**

**함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다**

**this 바인딩 : 바인딩(name binding)이란 식별자와 값을 연결하는 과정을 뜻한다. this 바인딩은 this와 this가 가리킬 객체를 바인딩 한다**

```js
// 객체 리터럴
const circle = {
  radius: 5,
  getDiameter() {
    // this는 메서드를 호출한 객체를 가리킨다
    return 2 * this.radius;
  },
};

console.log(circle.getDiameter()); // 10
```

- 위 예시처럼 객체 리터럴의 메서드의 내부에서의 this는 메서드를 호출한 객체, 즉 circle을 가리킨다

```js
// 생성자 함수
function Circle(radius) {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다
  return 2 * this.raidus;
};

// 인스턴스 생성
const cirlce = new Circle(5);
console.log(circle.getDiameter()); // 10
```

- 위 예시처럼 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다

## 2. 함수 호출 방식과 this 바인딩

**this 바인딩(this에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다**

**렉시컬 스코프와 this 바인딩은 결정 시기가 다르다** : 함수의 상위 스코프를 결정하는 방식인 **렉시컬 스코프(lexical scope)는 함수 정의가 평가되어 함수 객체가 생성되는 시점** 에 상위 스코프를 결정하지만 **this 바인딩은 함수 호출 시점** 에 결정된다

함수 호출 방식

- 일반 함수 호출
- 메서드 호출
- 생성자 함수 호출
- Function.prototype.apply/call/bind 메서드에 의한 간접 호출

```js
// this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다
const foo = function () {
  console.dir(this);
};

// 1. 일반 함수 호출
// foo 함수를 일반적인 방식으로 호출
// foo 함수 내부의 this는 전역 객체 window를 가리킨다
foo(); // window

// 2. 메서드 호출
// foo 함수를 프로퍼티 값으로 할당하여 호출
// foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다
const obj = { foo };
obj.foo(); // obj

// 3. 생성자 함수 호출
// foo 함수를 new 연산자와 함께 생성자 함수로 호출
// foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다
new foo(); // foo {}

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// foo 함수 내부의 this는 인수에 의해 결정된다
const bar = { name: "bar" };

foo.call(bar); // bar
foo.apply(bar); // bar
foo.bind(bar)(); // bar
```

### 2-1. 일반 함수 호출

- \*\*기본적으로 this에는 전역 객체(global object)가 바인딩된다
- 전역 함수는 물론이고 중첩 함수또한 일반 함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩된다
- this는 객체를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서 this는 의미가 없기 때문에 strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다

```js
function foo() {
  "use strict";

  console.log(this); // undefined
  function bar() {
    console.log(this); // undefined
  }
  bar();
}
foo();
```

- 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 함수 내부의 this에는 전역 객체가 바인딩된다

```js
// var 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티다
var value = 1;
// const,let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아님을 주의

const obj = {
  value: 100,
  foo() {
    console.log(this); // {value: 100, foo: f}
    console.log(this.value); // 100

    // 메서드 내에서 정의한 중첩 함수
    function bar() {
      console.log(this); // window
      console.log(this.value); // 1
    }

    // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다
    bar();
  },
};

obj.foo();
```

- 콜백 함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩된다

```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log(this); // {value: 100, foo: ƒ}
    // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function () {
      console.log(this); // window
      console.log(this.value); // 1
    }, 100);
  },
};

obj.foo();
```

**이처럼 일반 함수로 호출된 모든 함수 내부의 this에는 전역 객체가 바인딩된다**

- 하지만 메서드 내에서 정의한 중첩 함수 또는 메서드에게 전달한 콜백 함수가 일반 함수로 호출될 때 메서드 내의 중첩 함수 또는 콜백 함수의 this가 전역 객체를 바인딩하는 것은 문제가 있다
- 때문에 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법은 아래와 같다

```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    // this 바인딩(obj)을 변수 that에 할당한다
    const that = this;

    // 콜백 함수 내부에서 this 대신 that을 참조한다
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  },
};

obj.foo();
```

- 이 외에도 Function.prototype.apply/call/bind 메서드를 사용하거나 화살표 함수를 사용하는 방법도 있다

### 2-2. 메서드 호출

- 메서드 내부의 this에는 메서드를 호출한 객체가 바인딩된다

```js
const person = {
  name: "Lee",
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다
    return this.name;
  },
};

// 메서드 getName을 호출한 객체는 person이다
console.log(person.getName()); // Lee
```

- 위 예시의 person 객체의 getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다. getName 프로퍼티가 함수 객체를 가리키고 있을 뿐이다

```js
const person = {
  name: "Lee",
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

const anotherPerson = {
  name: "Kim",
};

// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다
// 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 '' 이다
// Node.js 환경에서 this.name은 undefined 이다
```

- 따라서 메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와는 관계가 없고 메서드를 호출한 객체에 바인딩된다

```js
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

const me = new Person("Lee");

// getName 메서드를 호출한 객체는 me다
console.log(me.getName()); // Lee

Person.prototype.name = "Kim";

// getName 메서드를 호출한 객체는 Person.prototype 이다
console.log(Person.prototype.getName()); // Kim
```

### 2-3. 생성자 함수 호출

- 생성자 함수 내부의 this에는 생성자 함수가 (미래에)생성할 인스턴스가 바인딩된다

```js
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20

// 일반 함수로의 호출
const circle3 = Circle(15);

// 일반 함수로 호출된 Circle에는 반환문이 없기 때문에 암묵적으로 undefined를 반환
console.log(circle3); // undefined

// 일반 함수로 호출된 Circle 내부의 this는 전역 객체를 가리킨다
console.log(radius); // 15
```

### 2-4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

- apply, call, bind 메서드는 Function.prototype의 메서드 이기 때문에 모든 함수가 상속받아 사용할 수 있다

- apply 메서드 사용법

```js
/*
 * 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출
 * thisArg - this로 사용할 객체
 * argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
 * returns 호출된 함수의 반환값
*/
Function.prototype.apply(thisArg[, argsArray])
```

- call 메서드 사용법

```js
/**
 * 주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출
 * thisArg - this로 사용할 객체
 * arg1, arg2, ... - 함수에게 전달할 인수 리스트
 * returns 호출된 함수의 반환값
*/
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```

```js
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); // window

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다
console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}
```

- **apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다**
- apply와 call 메서드는 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다
- 아래 예시는 apply, call 메서드를 통한 함수 호출 및 인수 전달

```js
function getThisBinding() {
  consolelog(arguments);
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다
// apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다
console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) [1, 2, 3, callee: f, Symbol(Symbol.iterator): f]
// {a: 1}

// call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) [1, 2, 3, callee: f, Symbol(Symbol.iterator): f]
// {a: 1}
```

- bind 메서드는 함수를 호출하지 않고 this로 사용할 객체만 전달한다

```js
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 함수에 this로 사용할 객체를 전달한다
// bind 메서드는 함수를 호출하지 않는다
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지는 않기 때문에 명시적으로 호출해야 한다
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

- bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다

```js
const person = {
  name: "Lee",
  foo(callback) {
    // bind 메서드로 callback 함수 내부의 this 바인딩을 전달
    setTimeout(callback.bind(this), 100);
  },
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // Hi! my name is Lee
});
```

출처 : https://poiemaweb.com/
