# 프로퍼티 어트리뷰트

## 1. 내부 슬롯과 내부 메서드
**내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티(pseudo property)와 의사 메서드(pseudo method)이다**
- 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 내부 로직이므로 원칙적으로는 직접적으로 접근하거나 호출할 수 없지만, 일부에 한해서 간접적으로 접근할 수 있는 수단을 제공한다
- 예를 들어, 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는다. 직접적으로 접근할 수는 없지만 __proto__를 통해 간접적으로 접근할 수 있다
```js
const o = {};
// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
console.log(o.[[Prototype]]); // -> Uncaught SyntaxError: Unexpected token '['
// 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
console.log(o.__proto__) // -> {}
```

## 2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
**자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다**
- 프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값(meta-property)인 내부 슬롯 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]이다. 
- 프로퍼티 디스크립터 객체는 프로퍼티 어트리뷰트 정보를 제공하는 객체이다
- 프로퍼티 어트리뷰트에 직접 접근할 수 없지만, Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수 있다
- Object.getOwnPropertyDescriptor 메서드는 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환하지만 ES8에서 도입된 Object.getOwnPropertyDescriptors 메서드는 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.

**예시**
```js
const person = {
  name : 'Lee'
};
person.age = 20;
// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// { value: 'Lee', writable: true, enumerable: true, configurable: true }

// 모든 프로퍼티의 프로퍼티 어트리뷰트를 제공하는 프로퍼티 디스크립터 객체들을 반환한다
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
```

## 3. 데이터 프로퍼티와 접근자 프로퍼티
- **데이터 프로퍼티(data property)** : 키와 값으로 구성된 일반적인 프로퍼티이다
![데이터 프로퍼티](https://user-images.githubusercontent.com/67866773/93182202-5e627800-f774-11ea-88bc-bfa85422c5f7.PNG)
- 프로퍼티가 생성될 때 [[Value]]의 값은 프로퍼티 값으로 초기화 되고 [[Writable]], [[Enumerable]], [[Configurable]]의 값은 true로 초기화된다. 프로퍼티를 동적 추가해도 마찬가지다
```js
const person = {
  name : 'Lee'
};
person.age = 20;

console.log(Object.getOwnPropertyDescriptos(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
```
- **접근자 프로퍼티(accessor property)** : 자체적으로는 값을 갖지 않고  다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수(accessor function)으로 구성된 프로퍼티이다
![접근자 프로퍼티](https://user-images.githubusercontent.com/67866773/93182302-8356eb00-f774-11ea-8512-2ad4364977c4.PNG)
- 접근자 함수는 getter/setter 함수라고도 부른다
- 접근자 프로퍼티는 getter와 setter 함수를 모두 정의할 수도 있고 하나만 정의할 수도 있다
- 아래 예시의 firstName 과 lastName 프로퍼티는 데이터 프로퍼티이며, fullName이 접근자 프로퍼티이다
```js
const person = {
  // 데이터 프로퍼티
  firstName : 'Dongchan',
  lastName : 'Kim',

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다
  // getter 함수
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set fullName(name){
    // 배열 디스트럭처링 할당 (추후 배열 디스트럭처링 할당 참고)
    [this.firstName, this.lastName] = name.split('');
  }
};

// 데이터 프로퍼티를 통한 값의 참조
console.log(person.firstName + ' ' + person.lastName); // Dongchan Kim

// 접근자 프로퍼티를 통한 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다
person.fullName = 'Heegun Lee';
console.log(person); // {firstName : "Heegun", lastName : "Lee"}

// 접근자 프로퍼티를 통한 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다
console.log(person.fullName); // Heegun Lee

// firstName은 데이터 프로퍼티다
// 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: "Heegun", writable: true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티다
// 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```
- 접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법은 아래 예시와 같다
```js
// 일반 객체의 __proto__는 접근자 프로퍼티다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티다.
Object.getOwnPropertyDescriptor(function() {}, 'prototype');
// {value: {...}, writable: true, enumerable: false, configurable: false}
```
- **프로토 타입(prototype)** : 프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체이다. 프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메서드를 상속한다. 상속받은 하위 객체는 자신의 프로퍼티 또는 메서드인 것처럼 자유롭게 사용 가능하다
- **프로토타입 체인** : 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조를 말한다. 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례대로 검색한다









