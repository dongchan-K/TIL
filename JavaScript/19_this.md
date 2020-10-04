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
  getDiameter(){
    // this는 메서드를 호출한 객체를 가리킨다
    return 2 * this.radius; 
  }
};

console.log(circle.getDiameter()); // 10
```
- 위 예시처럼 객체 리터럴의 메서드의 내부에서의 this는 메서드를 호출한 객체, 즉 circle을 가리킨다

```js
// 생성자 함수
function Circle(radius){
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다
  this.radius = radius;
}

Circle.prototype.getDiameter = function(){
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다
  return 2 * this.raidus;
};

// 인스턴스 생성
const cirlce = new Circle(5);
console.log(circle.getDiameter()); // 10
```
- 위 예시처럼 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다




