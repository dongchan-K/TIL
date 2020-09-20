# 생성자 함수에 의한 객체 생성
**생성자 함수(constructor)란 new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말하며, 생성자 함수에 의해 생성된 객체를 인스턴스(instance)라 한다**

## 1. Object 생성자 함수
**new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈 객체 생성후 프로퍼티 또는 메서드를 추가하여 객체를 완성할 수 있다**

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