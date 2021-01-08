# 클래스

## 1. 클래스는 프로토타입의 문법적 설탕인가?

자바스크립트는 [명령형](https://ko.wikipedia.org/wiki/%EB%AA%85%EB%A0%B9%ED%98%95_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D), [함수형](https://ko.wikipedia.org/wiki/%ED%95%A8%EC%88%98%ED%98%95_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D), [프로토타입 기반의 객체지향 프로그래밍](https://ko.wikipedia.org/wiki/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_%EA%B8%B0%EB%B0%98_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)을 지원하는 [멀티 패러다임 프로그래밍 언어](https://ko.wikipedia.org/wiki/%EB%8B%A4%EC%A4%91_%ED%8C%A8%EB%9F%AC%EB%8B%A4%EC%9E%84_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%96%B8%EC%96%B4)이다.

프로토타입 기반 객체지향 언어는 클래스가 필요 없는(class free) 객체지향 프로그래밍 언어이다.

하지만 ES6에서 도입된 클래스는 클래스 기반 객체지향 프로그래밍에 익숙한 프로그래머가 더욱 빠르게 학습할 수 있도록 새로운 객체 생성 매커니즘을 제시한다.

사실 클래스는 함수이며 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 [문법적 설탕](https://en.wikipedia.org/wiki/Syntactic_sugar)이라고 볼 수도 있다.

클래스는 생성자 함수와 유사하게 동작하지만 몇가지 차이가 있다.

1. 클래스를 new 연산자 없이 호출하면 에러가 발생한다.
2. 클래스는 상속을 지원하는 extends와 super 키워드를 제공한다.
3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작한다.
4. 클래스 내의 모든 코드에는 암묵적으로 strict mode가 지정된다.
5. 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 [[Enumerable]]의 값이 false이다. 즉, 열거되지 않는다.

**클래스는 객체(인스턴스)만을 생성하는 함수라고 정의할 수 있다.**

## 2. 클래스 정의

클래스는 class 키워드를 사용하여 정의하며, 클래스 이름은 파스칼 케이스를 사용하는 것이 일반적이다.

```JS
// 클래스 선언문
class Person {}
```

클래스는 표현식으로 정의할 수도 있다.

```JS
// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class MyClass {};
```

클래스는 함수이기 때문에 값처럼 사용할 수 있는 [**일급 객체**](https://github.com/dongchan-K/TIL/blob/master/JavaScript/15_first-class%20object.md#1-%EC%9D%BC%EA%B8%89-%EA%B0%9D%EC%B2%B4)이다.

클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다. 클래스 몸체에서 정의할 수 있는 메서드는 constructor(생성자), 프로토타입 메서드, 정적 메서드의 세 가지가 있다.

```JS
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 정적 메서드
  static sayHello() {
    console.log('Hello!');
  }
}

// 인스턴스 생성
const me = new Person('Kim');

// 인스턴스의 프로퍼티 참조
console.log(me.name); // Kim
// 프로토타입 메서드 호출
me.sayHi(); // Hi! My name is Kim
// 정적 메서드 호출
Person.sayHello(); // Hello!
```

## 3. 클래스 호이스팅

클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 소스코드 평가 과정, 즉 런타임 이전에 먼저 평가되어 함수 객체를 생성한다. 클래스는 constructor 이기 때문에 프로토타입 또한 함수 객체 생성 시점에 더불어 생성된다.

```JS
class Person {}
console.log(typeof Person); // function
```

클래스는 정의 이전에 참조할 수 없다.

```JS
console.log(Person);
// ReferenceError: Cannot access 'Person' before initialization

class Person {}
```

클래스 선언문은 일시적 사각지대(Temporal Dead Zone, TDZ)에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

```JS
const Person = '';

{
  // 호이스팅이 발생하지 않는다면 ''이 출력되어야 한다.
  console.log(Person);
  // ReferenceError: Cannot access 'Person' before initialization

  class Person {}
}
```

## 4. 인스턴스 생성

클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성한다.

```JS
class Person {}

// 인스턴스 생성
const me = new Person();
console.log(me); // Person {}
```

클래스 표현식으로 정의된 클래스는 클래스 이름이 아닌 식별자를 사용해 인스턴스를 생성해야 한다.

```JS
const Person = class MyClass {};

const me = new Person(); // O

const you = new MyClass(); // X
```

## 5. 메서드

클래스 몸체에는 0개 이상의 메서드만 선언할 수 있다.

### 5-1. constructor

constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드다.

```JS
class Person {
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
}
```

클래스는 함수로 평가되기 때문에 함수 객체 고유의 프로퍼티를 모두 갖고 있으며, 함수와 동일하게 프로토타입과 연결되어 있고 자신의 스코프 체인을 구성한다.

아래 예시를 살펴보면 프로토타입 객체의 constructor 프로퍼티는 클래스 자신을 가리키는데, 이는 클래스가 인스턴스를 생성하는 생성자 함수라는 것을 의미한다.

```JS
class Person {
  constructor(name) {
    this.name = name;
  }
}

const me = new Person('Lee');
console.log(me);
```

**constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.**

constructor는 생성자 함수와 유사하지만 몇 가지 차이가 있다.

1. constructor는 클래스 내에 최대 한 개만 존재할 수 있다.
2. constructor는 생략할 수 있다.
3. constructor를 생략하면 빈 constructor가 암묵적으로 정의된다.

```JS
class Person {
  constructor() {}
}

const me = new Person();
console.log(me); // Person {}
```

4. 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다.

```JS
class Person {
  constructor() {
    // 고정값으로 인스턴스 초기화
    this.name = 'Kim';
    this.address = 'Seoul';
  }
}

const me = new Person();
console.log(me); // Person {name: 'Kim', address: 'Seoul'}
```

5. 인스턴스를 생성할 때 클래스 외부에서 인스턴스 프로퍼티의 초기값을 전달하려면 constructor에 매개변수를 선언하고 인스턴스를 생성할 때 초기값을 전달한다.

```JS
class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
}

const me = new Person('Kim', 'Seoul');
console.log(me); // Person {name: 'Kim', address: 'Seoul'}
```

constructor는 별도의 반환문을 갖지 않아야 한다. new 연산자와 함께 클래스가 호출되면 생성자 함수와 동일하게 암묵적으로 this, 즉 인스턴스를 반환하기 때문이다.

### 5-2. 프로토타입 메서드

클래스 몸체에서 정의한 메서드는 기본적으로 프로토타입 메서드가 된다.

```JS
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

const me = new Person('Kim');
me.sayHi(); // Hi! My name is Kim
```

### 5-3. 정적 메서드

클래스에서는 메서드에 static 키워드를 붙이면 정적 메서드가 된다.

```JS
class Person {
  constructor(name) {
    this.name = name;
  }

  static sayHi() {
    console.log('Hi!');
  }
}
```

정적 메서드는 클래스로 호출한다.

```JS
// 정적 메서드는 클래스로 호출한다
Person.sayHi();
```

### 5-4. 정적 메서드와 프로토타입 메서드의 차이

1. 정적 메서드와 프로토타입 메서드는 속해 있는 프로토타입 체인이 다르다.
2. 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
3. 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

즉, 메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 있다면 this를 사용해야 하며, 프로토타입 메서드로 정의해야 한다.

```JS
class Square {
  // 정적 메서드
  static area(width, height) {
    return width * height;
  }
}

console.log(Square.area(10, 10)); // 100
```

```JS
class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // 프로토타입 메서드
  area() {
    return this.width * this.height;
  }
}

const square = new Square(10, 10);
console.log(square.area()); // 100
```

### 5-5. 클래스에서 정의한 메서드의 특징

**클래스에서 정의한 메서드는 다음과 같은 특징을 갖는다.**

1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요 없다.
3. 암묵적으로 [strict 모드](https://github.com/dongchan-K/TIL/blob/master/JavaScript/17_strict%20mode.md)로 실행된다.
4. for...in 문이나 Object.keys 메서드 등으로 열거할 수 없다. 즉, 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false이다.
5. 내부 메서드 [[Constructor]]를 갖지 않는 non-constructor이다.

## 6. 클래스의 인스턴스 생성 과정

**1. 인스턴스 생성과 this 바인딩**

new 연산자와 함께 클래스를 호출하면 constructor의 내부 코드가 실행되기에 앞서 암묵적으로 빈 객체가 생성된다. 이 빈 객체가 바로 클래스가 생성한 인스턴스다. 이때 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정되며 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다. 따라서 **constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.**

**2. 인스턴스 초기화**

constructor의 내부 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화한다.

**3. 인스턴스 반환**

클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

```JS
class Person {
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // Person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  }
}
```

## 7. 프로퍼티

### 7-1. 인스턴스 프로퍼티

인스턴스 프로퍼티는 constructor 내부에서 정의해야 한다.

```JS
class Person {
  constructor(name) {
    // 인스턴스 프로퍼티
    this.name = name; // name 프로퍼티는 public 하다.
  }
}

const me = new Person('Kim');
console.log(me); // Person {name: 'Kim'}
```

### 7-2. 접근자 프로퍼티

접근자 프로퍼티는 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수, 즉 getter 함수와 setter 함수로 구성되어 있다.

```JS
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
}

const me = new Person('Dongchan', 'Kim');

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(`${me.firstName} ${me.lastName}`); // Dongchan Kim

// 접근자 프로퍼티를 통한 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
me.fullName = 'Dongchan Lee';
console.log(me); // {firstName: 'Dongchan', lastName: 'Lee'}

// 접근자 프로퍼티를 통한 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(me.fullName); // Dongchan Lee
```

### 7-3. 클래스 필드 정의 제안

클래스 필드는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어이다.

자바스크립트는 클래스 몸체(class body)에는 메서드 만을 선언할 수 있지만 인스턴스 프로퍼티를 클래스 기반 객체지향 언어의 클래스 필드처럼 정의할 수 있는 새로운 표준 사양인 ["Class field declarations"](https://github.com/tc39/proposal-class-fields#field-declarations)가 [TC39 프로세스](https://tc39.es/process-document/)의 [stage3](https://github.com/tc39/proposals/blob/master/README.md)에 제안되어 있다.

```JS
class Person {
  // 클래스 필드 정의
  name = 'Kim';
}

const me = new Person();
console.log(me); // Person {name: 'Kim'}
```

클래스 필드를 정의하는 경우, this에 클래스 필드를 바인딩해서는 안된다. **this는 클래스의 constructor와 메서드 내에서만 유효하다.**

클래스 필드를 참조하는 경우 this를 반드시 사용해야 한다.

```JS
class Person {
  name = 'Kim';

  constructor() {
    console.log(name); // ReferenceError: name is not defined
    console.log(this.name); // Kim
  }
}
```

함수는 일급객체이므로 함수를 클래스 필드에 할당할 수 있다. 이 경우 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다

```JS
class Person {
  name = 'Kim';

  getName = function() {
    return this.name;
  }
}

const me = new Person();
console.log(me); // Person {name: 'Kim', getName: f}
console.log(me.getName()); // Kim
```

### 7-4. private 필드 정의 제안

자바스크립트는 접근 제한자를 지원하지 않기 때문에 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다. 즉, 언제나 public이다.

[private 필드를 정의할 수 있는 새로운 표준 사양이 제안](https://github.com/tc39/proposal-class-fields#private-fields)되었다.

private 필드의 선두에는 #을 붙여준다. 참조할 때도 #을 붙어주어야 한다.

```JS
class Person {
  // private 필드 정의
  #name = '';

  constructor(name) {
    // private 필드 참조
    this.#name = name;
  }
}

const me = new Person('Kim');

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
console.log(me.#name);
// SyntaxError: Private field '#name' must be declared in an enclosing class
```

private 필드는 클래스 내부에서만 참조할 수 있다.

private 필드는 반드시 클래스 몸체에 정의해야 한다.

### 7-5. static 필드 정의 제안

static public 필드, static private 필드, static private 메서드를 정의할 수 있는 새로운 표준 사양인 ["Static clas features"](https://github.com/tc39/proposal-static-class-features) TC39 프로세스의 stage 3에 제안되어 있다.

```JS
class MyMath {
  // static public 필드 정의
  static PI = 22 / 7;

  // static private 필드 정의
  static #num = 10;

  // static 메서드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
```

## 8. 상속에 의한 클래스 확장

### 8-1. 클래스 상속과 생성자 함수 상속

**상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장(extends)하여 정의하는 것이다.**

아래 예시와 같이 Bird 클래스와 Lion 클래스는 상속을 통해 Animal 클래스의 속성을 그대로 사용하고 자신의 고유한 속성을 추가하여 확장할 수 있다. 이처럼 상속에 의한 클래스 확장은 코드 재사용 관점에서 매우 유용하다.

```JS
class Animal {
  constructor(age, wegiht) {
    this.age = age;
    this.weight = weight;
  }

  eat() { return 'eat'; }

  move() { return 'move'; }
}

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
  fly() { return 'fly'; }
}

const bird = new Bird(1, 5);

console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true

console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly
```

상속에 의해 확장된 클래스 Bird를 통해 생성된 인스턴스의 프로토타입 체인은 다음과 같다.

**클래스는 상속을 통해 다른 클래스를 확장할 수 있는 문법인 extends 키워드가 제공된다.**

### 8-2. extends 키워드

상속을 통해 클래스를 확장하려면 extends 키워드를 사용하여 상속받을 클래스를 정의한다.

상속을 통해 확장된 클래스를 서브클래스(subclass)라 부르고, 서브클래스에게 상속된 클래스를 수퍼클래스(superclass)라 부른다.

수퍼클래스와 서브클래스는 인스턴스의 프로토타입 체인 뿐 아니라, 클래스 간의 프로토타입 체인도 생성한다. 이를 통해 프로토타입 메서드, 정적 메서드 모두 상속이 가능하다.

### 8-3. 동적 상속

extends 키워드는 클래스 뿐만 아니라 생성자 함수를 상속받아 클래스를 확장할 수도 있다. 단, extends 키워드 앞에는 반드시 클래스가 와야한다.

```JS
function Base(a) {
  this.a = a;
}

class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```

### 8-4. 서브클래스의 constructor

서브클래스에서 constructor를 생략하면 클래스에 다음과 같은 constructor가 암묵적으로 정의된다. args는 new 연산자와 함께 클래스를 호출할 때 전달한 인수의 리스트다.

```JS
constructor(...args) { super(...args); }
```

super()는 수퍼클래스의 constructor를 호출하여 인스턴스를 생성한다.

### 8-5. super 키워드

super 키워드는 함수처럼 호출할 수도 있고 this와 같이 식별자처럼 참조할 수 있는 특수한 키워드다.

- super를 호출하면 수퍼클래스의 constructor를 호출한다
- super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다

**super 호출**

```JS
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

class Derived extends Base {
  // 다음과 같이 암묵적으로 constructor가 정의된다
  // constructor(...args) { super(...args); }
}

const derived = new Derived(1, 2);
console.log(derived); // Derived {a: 1, b: 2}
```

다음과 같이 수퍼클래에서 추가한 프로퍼티와 서브클래스에서 추가한 프로퍼티를 갖는 인스턴스를 생성한다면 서브클래스의 constructor를 생략할 수 없다.

```JS
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

class Derived extends Base {
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}

const derived = new Derived(1, 2, 3);
console.log(derived); // Derived {a: 1, b: 2, c: 3}
```

**1. 서브클래스에서 constructor를 생략하지 않는 경우 서브클래스의 constructor에서는 반드시 super를 호출해야 한다**

```JS
class Base{}

class Derived extends Base {
  constructor() {
    // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    console.log('constructor call');
  }
}

const derived = new Derived();
```

**2. 서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다**

```JS
class Base {}

class Derived extends Base {
  constructor() {
    // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    this.a = 1;
    super();
  }
}

const derived = new Derived(1);
```

**3. super는 반드시 서브클래스의 constructor에서만 호출한다. 서브클래스가 아닌 클래스의 constructor나 함수에서 super를 호출하면 에러가 발생한다**

```JS
const Base {
  constructor() {
    super(); // SyntaxError: 'super' keyword unexpected here
  }
}

function Foo() {
  super(); // SyntaxError: 'super' keyword unexpected here
}
```

**super 참조**

메서드 내에서 super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

**1. 서브클래스의 프로토타입 메서드 내에서 super.sayHi는 수퍼클래스의 프로토타입 메서드 sayHi를 가리킨다**

```JS
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  sayHi() {
    // super.sayHi는 수퍼클래스의 프로토타입 메서드를 가리킨다
    return `${super.sayHi()}. how are you doing?`;
  }
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

**2. 서브클래스의 정적 메서드 내에서 super.sayHi 는 수퍼클래스의 정적 메서드 sayHi를 가리킨다**

```JS
class Base {
  static sayHi() {
    return 'Hi!';
  }
}

class Derived extends Base {
  static sayHi() {
    // super.sayHi는 수퍼클래스의 정적 메서드를 가리킨다
    return `${super.sayHi()} how are you doing?`;
  }
}

console.log(Derived.sayHi()); // Hi! how are you doing?
```

### 8-6. 상속 클래스의 인스턴스 생성 과정

직사각형을 추상화한 Rectangle 클래스와 상속을 통해 Rectangle 클래스를 확장한 ColorRectangle 클래스를 정의해보자

```JS
// 수퍼클래스
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  toString() {
    return `width = ${this.width}, height = ${this.height}`;
  }
}

// 서브클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);
    this.color = color;
  }

  // 메서드 오버라이딩
  toString() {
    return super.toString() + `, color = ${this.color}`;
  }
}

const colorRectangle = new ColorRectangle(2, 4, 'red');
console.log(colorRectangle); // ColorRectangle {width: 2, height: 4, color: 'red'}

// 상속을 통해 getArea 메서드 호출
console.log(colorRectangle.getArea()); // 8

// 오버라이딩 된 toString 메서드를 호출
console.log(colorRectangle.toString()); // width = 2, height = 4, color = red
```

서브클래스 ColorRectangle이 new 연산자와 함께 호출되면 다음 과정을 통해 인스턴스를 생성한다.

**1. 서브클래스의 super 호출**

**서브 클래스는 자신이 직접 인스턴스를 생성하지 않고 수퍼클래스에게 인스턴스 생성을 위임한다. 이것이 바로 서브클래스의 constructor에서 반드시 super를 호출해야 하는 이유다**

만약 서브클래스 constructor 내부에 super 호출이 없으면 에러가 발생한다. 실제로 인스턴스를 생성하는 주체는 수퍼클래스이므로 수퍼클래스의 constructor를 호출하는 super가 호출되지 않으면 인스턴스를 생성할 수 없기 때문이다.

**2. 수퍼클래스의 인스턴스 생성과 this 바인딩**

수퍼클래스의 constructor 내부의 코드가 실행되기 이전에 암묵적으로 빈 객체를 생성한다. 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다. 따라서 수퍼클래스의 constructor 내부의 this는 생성된 인스턴스를 가리킨다.

인스턴스는 new.target이 가리키는 서브 클래스가 생성한 것으로 처리된다.

**3. 수퍼클래스의 인스턴스 초기화**

수퍼클래스의 constructor 가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.

**4. 서브클래스 constructor로의 복귀와 this 바인딩**

super의 호출이 종료되고 흐름이 서브클래스 constructor로 돌아온다. **이때 super가 반환한 인스턴스가 this에 바인딩된다. 서브클래스는 별도의 인스턴스를 생성하지 않고 super가 반환한 인스턴스를 this에 바인딩하여 그대로 사용한다.**

**이처럼 super가 호출되지 않으면 인스턴스가 생성되지 않으며, this 바인딩도 할 수 없다 서브 클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없는 이유가 바로 이 때문이다.**

**5. 서브클래스의 인스턴스 초기화**

super 호출 이후, 서브클래스의 constructor에 기술되어 있는 인스턴스 초기화가 실행된다.

**6. 인스턴스 반환**

클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

출처 : https://poiemaweb.com/
