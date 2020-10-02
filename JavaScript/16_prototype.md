# 프로토타입
**자바스크립트는 프로토타입 기반의 객체지향 프로그래밍 언어이며, 자바스크립트를 이루고 있는 것의 거의 모든 것이 객체다**

## 1. 객체지향 프로그래밍
- 객체지향 프로그래밍은 여러개의 독립적 단위, 즉 객체(object)의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다
- 객체지향 프로그래밍은 실체(사물이나 개념)를 인식하는 철학적 사고를 프로그래밍에 접목하였다
- 실체는 특징이나 성질을 나타내는 **속성(attribute/property)** 을 가지고 있고 속성을 통해 실체를 인식하거나 구별할 수 있다
- 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 표현하는 것을 **추상화(abstraction)** 라 한다
- **속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라 한다**
- **객체의 프로퍼티는 상태를 나타내는 데이터이며 메서드는 동작이다**
- **객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조라고 할 수 있다**

아래는 객체지향 프로그래밍 예시
```js
// 원의 반지름과 지름을 구하는 동작 속성을 갖는 객체
const circle = {
  radius: 5, // 프로퍼티, 상태를 나타내는 데이터
  // 메서드, 동작
  getDiameter(){
    return 2 * this.radius;
  }
};

console.log(circle.getDiameter()); // 10
```

## 2. 상속과 프로토타입
- **상속(inheritance)은 어떤 객체의 프로퍼티나 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는것을 말하며 자바스크립트는 프로토타입을 기반으로 상속을 구현하여 중복을 제거한다**
- 생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해두면 생성자 함수가 생성할 모든 인스턴스는 별도이 구현 없이 상위(부모) 객체인 프로토타입의 자산을 공유하여 사용할 수 있다

아래는 상속에 의한 메서드 공유 예시
```js
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해서 사용할 수 있도록 프로토타입에 추가한다
// 프로토타입은 CircLe 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다
Circle.prototype.getArea = function() {
  return Math.PI * this.radius ** 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스터느는 부모 객체 역할을 하는 Circle.prototype 프로토타입 객체로부터 getArea 메서드를 상속받는다
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다
console.log(circle1.getArea === circle2.getArea); // true
```
![상속에 의한 메서드 공유](https://user-images.githubusercontent.com/67866773/94434813-4b6c9080-01d5-11eb-9313-fc459be48125.png)

## 3. 프로토타입 객체
- 프로토타입 객체(프로토타입)는 어떤 객체의 상위(부모) 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티(메시드 포함)를 제공한다
- 모든 객체는 [[Prototype]] 이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조(null인 경우도 있다)다.
- [[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다. 즉, 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장된다
- [[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만 `__proto__ ` 접근자 프로퍼티를 통해 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있다

아래는 객체와 프로토타입과 생성자 함수의 연결 관계 예시
![객체 프로토타입 생성자 함수의 관계](https://user-images.githubusercontent.com/67866773/94437701-16623d00-01d9-11eb-96fe-33c3cd310bc8.png)

### 3-1. `__proto__` 접근자 프로퍼티
- **모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근할 수 있다**
- 접근자 프로퍼티는 자체적으로 값([[Value]] 프로퍼티 어트리뷰트)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 [[Get]], [[Set]] 프로퍼티 어트리뷰트로 구성된 프로퍼티다
- Object.prototype의 접근자 프로퍼티인 `__proto__`는 getter/setter 함수라고 부르는 접근자 함수를 통해 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다

아래는 `__proto__` 접근자 프로퍼티를 통한 getter/setter 예시
```js
const obj = {};
const parent = { x : 1 };

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
obj.__proto__;
// setter 함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체

console.log(obj.x); // 1
```
- **`__proto__` 접근자 프로퍼티는 상속을 통해 사용된다**
  - 즉, `__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티다. 모든 객체는 상속을 통해 `Object.prototype.__proto__` 접근자 프로퍼티를 사용할 수 있다

아래는 접근자 프로퍼티 상속 예시
```js
const person = { name: 'Kim' };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__)); 
// { get: f, set: f, enumerable: false, configurable: true }

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다
console.log({}.__proto === Object.prototype); // true
```
- **`__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위함이다**
  - 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다. 순환 참조(circular reference)하는 프로토타입 체인이 만들어지면 종점이 존재하지 않기 때문에 프로토타입 체인에서 프로퍼티를 검색할 때 무한 루프에 빠지게 된다
  - 때문에 무조건적으로 프로토타입을 교체할 수 없도록 `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있다

- **`__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다**
  - 모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는것은 아니기 때문
  - 예를들면 Object.prototype을 상속받지 않는 객체는 `__proto__` 접근자 프로퍼티를 사용할 수 없다
  - 따라서 프로토타입의 참조를 취득하고 싶은 경우에는 Object.getPrototypeOf 메서드를 사용하고, 프로토타입을 교체하고 싶은 경우에는 Object.setPrototypeOf 메서드를 사용할 것

아래는 프로토타입 취득 및 교체 메서드 사용 예시
```js
const obj = {};
const parent = { x: 1 };

Object.getPrototypeOf(obj); // obj.__proto__;

Object.setPrototypeOf(obj); // obj.__proto__ = parent;

console.log(obj.x); // 1
```

### 3-2. 함수 객체의 prototype 프로퍼티
- **함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다. 즉, constructor 만이 prototype 프로퍼티를 갖는다**
- **모든 객체가 가지고 있는 `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다.** 하지만 사용하는 주체가 다르다
![prototype 프로퍼티](https://user-images.githubusercontent.com/67866773/94442176-9f2fa780-01de-11eb-9ed1-47a4e27470b9.PNG)

```js
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 결국 Person.prototype과 me.__proto__는 동일한 프로토타입을 가리킨다
console.log(Person.prototype === me.__proto__)
```
![접근자 프로퍼티와 prototype 프로퍼티](https://user-images.githubusercontent.com/67866773/94442450-f03f9b80-01de-11eb-86f7-0ef759beedeb.png)

### 3-3. 프로토타입의 constructor 프로퍼티와 생성자 함수
- 모든 프로토타입은 constructor 프로퍼티를 갖는다. constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다. 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이뤄진다
```js
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// me 객체의 생성자 함수는 Person 이다
console.log(me.constructor === Person); // true
```
![constructor 프로퍼티](https://user-images.githubusercontent.com/67866773/94442831-5f1cf480-01df-11eb-995f-aeb66dc80f97.png)

- 따라서 me 객체는 프로토타입인 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있다

### 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
- 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 있다

리터럴 표기법에 의한 생성 방식 예시
```js
// 객체 리터럴
const obj = {};

// 함수 리터럴
const add = function(a, b) { return a + b };

// 배열 리터럴
const arr = [1, 2, 3];
```
```js
// 객체 리터럴
const obj = {};

// obj 객체의 생성자 함수는 Object 생성자 함수
console.log(obj.constructor === Object); // true
```
- 위 예제의 obj 객체는 객체 리터럴에 의해 생성된 객체이지만 obj 객체는 Object 생성자 함수와 constructor 프로퍼티로 연결되어 있다

추상 연산(abstract operation) : 추상 연산은 ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현한 것이다. ECMAScript 사양에서 설명을 위해 사용되는 함수와 유사한 의사 코드라고 이해할 수 있다
- 객체 리터럴이 평가될 때는 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하도록 정의되어 있다
- 따라서 Object 생성자 함수 호출과 객체 리터럴의 평가는 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성하는 점에서 동일하나 new.target의 확인이나 프로퍼티를 추가하는 처리 등 세부 내용은 다르기 때문에 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다

- 하지만 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하기 때문에 가상적인 생성자 함수를 가진다
  - **프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있다. 즉, 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍(pair)으로 존재한다**

- 즉, 리터럴 표기법에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아니지만 객체로서 동일한 특성을 갖는다
![리터럴 표기법으로 생성된 객체의 프로토타입](https://user-images.githubusercontent.com/67866773/94444845-b7ed8c80-01e1-11eb-9204-39ec170791c9.PNG)

### 5. 프로토타입의 생성 시점
- 결국 모든 객체는 생성자 함수와 연결되어 있다
- **프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다**

### 5-1. 사용자 정의 생성자 함수와 프로토타입 생성 시점
- **생성자 함수로서 호출할수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다**

```js
// 함수 정의가 평가되어 함수 객체르 생성하는 시점에 프로토타입도 더불어 생성된다
console.log(Person.prototype); // {constructor: f}

// 생성자 함수
function Person(name) {
  this.name = name;
}
```
- 함수 선언문은 런타임 이전에 먼저 실행된다. 따라서 함수 선언문으로 정의된 생성자 함수는 런타임 이전에 평가되어 함수 객체가 된다. 이때 프로토타입도 더불어 생성되며 생성된 프로토타입은 Person 생성자 함수의 prototype 프로퍼티에 바인딩된다
- 생성된 프로토타입은 오직 constructor 프로퍼티만을 갖는 객체다
- 모든 객체는 프로토타입을 가지므로 생성된 프로토타입의 프로토타입은 Object.prototype 이다
<img width="572" alt="프로토타입의 프로토타입" src="https://user-images.githubusercontent.com/67866773/94447793-297b0a00-01e5-11eb-94c5-22902c4e4709.png">

### 5-2. 빌트인 생성자 함수와 프로토타입 생성 시점
- 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다
- 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다
![Object 생성자 함수와 프로토타입](https://user-images.githubusercontent.com/67866773/94448199-968e9f80-01e5-11eb-9da2-708c1217f311.png)

**전역 객체(global object)** : 전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체이다. 전역 객체는 클라이언트 사이드 환경(브라우저)에서는 window, 서버 사이드 환경(Node.js)에서는 global 객체를 의미한다.
전역 객체는 표준 빌트인 객체(Object, String, Number, Function, Array 등)들과 환경에 따른 호스트 객체(클라이언트 web API 또는 Node.js의 호스트 API), 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다. Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 생성자 함수이다

- **객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다. 이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당된다**

## 6. 객체 생성 방식과 프로토타입의 결정
- 객체는 다양한 방식으로 생성할 수 있으며 추상 연산 OrdinaryObjectCreate에 의해 생성된다는 공통점이 있다
- 추상 연산 OrdinaryObjectCreate는 자신이 생성할 객체의 프로토타입을 인수로 전달받는다. 즉, 프로토타입은 추상 연산 OrdinaryObjectCreate에 전달되는 인수에 의해 결정된다. 이 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다

### 6-1. 객체 리터럴에 의해 생성된 객체의 프로토타입
```js
const obj = { x: 1};
```
![객체 리터럴에 의해 생성된 객체의 프로토타입](https://user-images.githubusercontent.com/67866773/94450171-e8382980-01e7-11eb-80ce-5d959bf0c162.png)
- 이처럼 obj 객체는 constructor 프로퍼티와 hasOwnProperty 메서드 등을 소유하지 않지만 자신의 프로토타입인 Object.prototype의 constructor 프로퍼티와 hasOwnProperty 메서드를 자신의 자산인 것처럼 자유롭게 사용할 수 있다
- obj 객체가 자신의 프로토타입인 Object.prototype 객체를 상속받았기 때문이다
```js
const obj = { x: 1 };

// 객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 상속받는다
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x')); // true
```

### 6-2. Object 생성자 함수에 의해 생성된 객체의 프로토타입
- Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성된다
- 추상 연산 OrdinaryObjectCreate 에 전달되는 프로토타입은 Object.prototype 이다
- 객체 리터럴과 Object 생성자 함수에 의한 생성 방식의 차이는 프로퍼티를 추가하는 방식에 있다
```js
const obj = new Object();
obj.x = 1;
```
![Object 생성자 함수에 의해 생성된 객체의 프로토타입](https://user-images.githubusercontent.com/67866773/94450983-df942300-01e8-11eb-962d-4a58b4efa103.png)
```js
const obj = new Object();
obj.x = 1;

// Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 상속받는다
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x'));    // true
```

### 6-3. 생성자 함수에 의해 생성된 객체의 프로토타입
- new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 추상 연산 OrdinaryObjectCreate가 호출된다 
- 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어있는 객체다
```js
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');
```
![생성자 함수에 의해 생성된 객체의 프로토타입](https://user-images.githubusercontent.com/67866773/94451497-6ea13b00-01e9-11eb-9d70-a22097a0e33c.png)
- 사용자 정의 생성자 함수 Person과 더불어 생성된 프로토타입은 Person.prototype의 프로퍼티는 constructor 뿐이다
- **일반 객체와 같이 프로토타입에도 프로퍼티를 추가/삭제할 수 있다. 이렇게 추가/삭제된 프로퍼티는 프로토타입 체인에 즉각 반영된다**
```js
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello();  // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```
- Person 생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 sayHello 메서드를 상속받아 자신의 메서드처럼 사용할 수 있다

![프로토타입의 확장과 상속](https://user-images.githubusercontent.com/67866773/94452446-80371280-01ea-11eb-868a-83d3e9221c31.png)

## 7. 프로토타입 체인
```js
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty('name')); // true
```
- 위 예제를 살펴보면 me 객체가 Person.prototype 뿐 아니라 Object.prototype 도 상속 받았다는것을 알 수 있다
- 아래와 같은 예시로 표현할 수 있다
![프로토타입 체인](https://user-images.githubusercontent.com/67866773/94454005-51ba3700-01ec-11eb-91f5-1310320bf140.png)
- **자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 프로토타입 체인이라 한다**
- 프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype 이다. 따라서 모든 객체는 Object.prototype을 상속받는다
- **Object.prototype을 프로토타입 체인의 종점(end of prototype chain)이라 한다**
- 프로토타입 체인의 종점에서도 프로퍼티를 검색할 수 없을 경우, undefined를 반환한다 -> 에러가 아님을 주의할 것
- **프로토타입 체인은 상속과 프로퍼티 검색을 위한 매커니즘**이라 할 수 있다
- **스코프 체인은 식별자 검색을 위한 매커니즘**이라 할 수 있다

```js
me.hasOwnProperty('name');
```

위 예제의 경우 먼저 스코프 체인에서 me 식별자를 검색한다. me 식별자는 전역에서 선언되었으므로 전역 스코프에서 검색된다 me 식별자를 검색한 다음 ->  me 객체의 프로토타입 체인에서 hasOwnProperty 메서드를 검색한다
- **스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용된다**

## 8. 오버라이딩과 프로퍼티 새도잉
예시로 살펴보자
```js
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
}());

const me = new Person('Lee');

// 인스턴스 메서드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```
<img width="675" alt="오버라이딩과 프로퍼티 새도잉" src="https://user-images.githubusercontent.com/67866773/94456883-caba8e00-01ee-11eb-999c-ff3384541522.png">

- 프로토타입이 소유한 프로퍼티(메서드 포함)을 프로토타입 프로퍼티, 인스턴스가 소유한 프로퍼티(메서드 포함)을 인스턴스 프로퍼티라 한다
- 인스턴스 메서드 sayHello는 프로토타입 메서드 sayHello를 오버라이딩 했고 프로토타입 메서드 sayHello는 가려진다

프로퍼티 새도잉(property shadowing) : 상속 관계에 의해 프로퍼티가 가려지는 현상
오버라이딩(overriding) : 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식

- 하위 객체를 통해 프로토타입의 프로퍼티를 삭제/변경 하는 것은 불가능하다. 즉 하위 객체를 통해 프로토타입에 get은 허용되나 set은 허용되지 않는다
- 프로토타입 프로퍼티를 삭제/변경 하려면 프로토타입 체인으로 접근하는 것이 아니라 프로토타입에 직접 접근해야 한다

## 9. 프로토타입의 교체
- 프로토타입은 생성자 함수 혹은 인스턴스에 의해 동적으로 변경 가능하다

### 9-1. 생성자 함수에 의한 프로토타입 교체
- 생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것이다
```js
const Person = (function (){
  function Person(name){
    this.name = name;
  }
  
  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello(){
      console.log(`Hi! My name is ${this.name}`);
    }
  };

  return Person;
}());

const me = new Person('Lee');
```

아래는 생성자 함수에 의한 프로토타입 교체 예시

![생성자 함수에 의한 프로토타입 교체](https://user-images.githubusercontent.com/67866773/94770563-e2149980-03ef-11eb-95e0-a48dcca18d0f.png)

위 예시와 같이 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수간의 연결이 파괴된다

```js
console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

아래 예시와 같이 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하여 연결을 되살릴 수 있다

```js
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
    constructor: Person,
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };

  return Person;
}());

const me = new Person('Lee');

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```

### 9-2. 인스턴스에 의한 프로퍼티의 교체
- 인스턴스의 `__proto__` 접근자 프로퍼티 또는 Object.setPrototypeOf 메서드를 통해 프로토타입을 교체할 수 있다
- `__proto__` 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다
```js
function Person(name){
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
  sayHello(){
    console.log(`Hi! My name is ${this.name}`);
  }
};

// me 객체의 프로토타입을 parent 객체로 교체한다
Object.setPrototypeOf(me, parent);
// 위 코드는 me.__proto__ = parent; 와 동일하게 동작한다

me.sayHello(); // Hi! My name is Lee
```

아래는 인스턴스에 의한 프로토타입의 교체 예시

![인스턴스에 의한 프로토타입의 교체](https://user-images.githubusercontent.com/67866773/94771022-30766800-03f1-11eb-8dc0-b886ea3d80ed.png)

```js
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```

아래는 프로토타입 교체 방식에 따른 차이 예시

![프로토타입 교체 방식에 의해 발생하는 차이](https://user-images.githubusercontent.com/67866773/94771122-75020380-03f1-11eb-8f60-31df6c854ae7.png)

아래 예시와 같이 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하고 생성자 함수의 prototype 프로퍼티를 재설정하여 연결을 되살릴 수 있다

```js
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  }
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```

- 프로토타입 교체를 통해 객체 간의 상속 관계를 동적으로 변경하는것은 번거롭기 때문에 직접 교체하지 않는것이 좋다. 직접 상속 또는 ES6에서 도입된 클래스를 사용하면 간편하고 직관적으로 변경할 수 있다

## 10. instanceof 연산자
- instanceof 연산자는 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다. 우변의 피연산자가 함수가 아닌경우 TypeError가 발생한다
- **우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변 객체의 프로토타입 체인 상에 존재하면 true, 그렇지 않으면 false로 평가된다**

```js
function Person(name){
  this.name = name;
}

const me = new Person('Lee');

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true
console.log(me instanceof Object); // true
``` 

아래 예시처럼 인스턴스에 의해 프로토타입을 교체하면 me 객체의 프로토타입 체인상에  Person.prototype이 존재하지 않기 때문에 false로 평가된다
```js
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 때문에 false로 평가된다.
console.log(me instanceof Person); // false

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

아래 예시처럼 프로토타입으로 교체한 객체 parent를 Person 생성자 함수의 prototype 프로퍼티에 바인딩하면 true로 평가된다
```js
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩한다.
Person.prototype = parent;

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

**아래 예시처럼 instanceof 연산자는 생성자 함수의 prototype 프로퍼티에 바인딩 된 객체가 프로토타입 체인 상에 존재하는지 확인한다**

![instanceof 연산자](https://user-images.githubusercontent.com/67866773/94773328-800b6280-03f6-11eb-90b2-2718abe0b324.png)

- 따라서 instanceof 연산자는 
  - **생성자 함수에 의해 프로토타입이 교체** 되어 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴되어도 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결은 파괴되지 않기 때문에 영향을 받지 않는다 
  - **인스턴스에 의해 프로토타입이 교체** 되면 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결이 파괴되기 때문에 false로 평가된다

## 11. 직접 상속

### 11-1. Object.create에 의한 직접 상속
- Object.creat 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다
- Object.creat 메서드도 다른 객체 생성 방식과 동일하게 추상 연산 OrdinaryObjectCreat를 호출한다
- Object.creat 메서드의 첫번째 매개변수에는 생성할 객체의 프로토타입으로 지정할 객체를 전달하고 두번째 매개변수에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이루어진 객체를 전달한다. 이때 두번째 인수는 옵션이다

```js
// 프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로토타입 체인의 종점에 위치한다
// obj -> null
let obj = Object.creat(null)
console.log(Object.getPrototypeOf(obj) === null); // true
// Object.prototype을 상속받지 못한다
console.log(obj.toString()); // TypeError : obj.toString is not a function

// obj -> Object.prototype -> null
// obj = {}; 와 동일하다
obj = Object.creat(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj -> Object.prototype -> null
// obj = { x: 1 }; 와 동일하다
obj = Object.creat(Object.prototype, {x: {value:1, writable: true, enumerable: true, configurable: true}});
// 위 코드는 다음과 동일하다
// obj = Object.creat(Object.prototype);
// obj.x = 1;
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = { x: 10 };
// 임의의 객체를 직접 상속받는다
obj = Object.creat(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

// 생성자 함수
function Person(name){
  this.name = name;
}

// obj -> Person.prototype -> Object.prototype -> null
// obj = new Person('Lee')와 동일하다
obj = Object.creat(Person.prototype);
obj.name = 'Lee';
console.log(obj.name); // Lee
console.log(Object.getPrototypeOf(obj) === Person.prototype) // true
```
- 즉 Object.creat 메서드는 첫번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성하면서 직접적으로 상속을 구현한다

Object.creat 메서드의 장점
- new 연산자가 없이도 객체를 생성할 수 있다
- 프로토타입을 지정하면서 객체를 생성할 수 있다
- 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다

Object.creat 메서드를 통해 프로토타입 체인의 종점에 위치하는 객체를 생성하게 되면 Object.prototype의 빌트인 메서드를 사용할 수 없기 때문에 Object.prototype의 빌트인 메서드를 객체가 직접 호출하는 것을 권장하지 않는다

```js
// 프로토타입이 null인 객체, 즉 프로토타입 체인의 종점에 위치하는 객체를 생성한다
const obj = Object.creat(null);
obj.a = 1;

console.log(Object.getPrototypeOf(obj) === null); // true

// obj는 Object.prototype의 빌트인 메서드를 사용할 수 없다
console.log(obj.hasOwnProperty('a')); // TypeError: obj.hasOwnProperty is not a function
```

따라서 Object.prototype 빌트인 메서드는 아래 예시와 같이 간접적으로 호출하는 것이 좋다

```js
// 프로토타입이 null인 객체를 생성한다
const obj = Object.creat(null);
obj.a = 1;

// Object.prototype의 빌트인 메서드는 객체로 직접 호출하지 않는다
console.log(Object.prototype.hasOwnProperty.call(obj, 'a')); // true
```

### 11-2. 객체 리티럴 내부에서 `__proto__`에 의한 직접 상속
- ES6에서는 객체 리터럴 내부에서 `__proto__` 접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있다

```js
const myProto = { x: 10 };

//객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다
const obj = {
  y: 20,
  // 객체를 직접 상속받는다
  // obj -> myProto -> Object.prototype -> null
  __proto__: myProto
};

/* 위 코드는 아래와 동일하다
const obj = Object.creat(myProto, { y: {value: 20, writable: true, enumerable: true, configurable: true}});
*/

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```


