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

const me = new Person('Kim');

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

const me = new Person('Kim');

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
