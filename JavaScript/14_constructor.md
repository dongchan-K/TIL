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
person.name = 'Kim';
person.sayHello = function(){
  console.log('Hello! My name is ' + this.name); 
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
  }
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle2.getDiameter()); // 20
```
### 2-2. 생성자 함수에 의한 객체 생성 방식의 장점
- 생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다
```js
// 생성자 함수
function Circle(radius){
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다
  this.radius = radius;
  this.getDiameter = function (){
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
function foo(){
  console.log(this);
}

// 일반적인 함수 호출
foo(); // window

// 메서드로서 호출
const obj = {foo};
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
function Circle(radius){
  // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩된다

  //2. this에 바인딩되어 있는 인스턴스를 초기화한다
  this.radius = radius;
  this.getDiameter = function(){
    return 2 * this.radius;
  };

  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다
}

// 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다
const circle = new Circle(1);
console.log(circle); // Circle {radius: 1l, getDiameter: f}
```
### 2-4. 내부 메서드 [[Call]] 과 [[Construct]]
- 

