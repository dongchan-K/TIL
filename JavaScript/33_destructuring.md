# 디스트럭처링 할당

디스트럭처링 할당(destructuring assignment)은 구조화된 배열과 같은 이터러블 또는 객체를 destructuring(비구조화)하여 1개 이상의 변수에 개별적으로 할당하는 것을 말한다

## 1. 배열 디스트럭처링 할당

- ES6의 배열 디스트럭처링 할당은 배열의 각 요소를 배열로부터 추출하여 1개 이상의 변수에 할당한다. 이때 **배열 디스트럭처링 할당의 대상(할당문의 우변)은 이터러블이어야 하며, 할당 기준은 배열의 인덱스다**

```js
const arr = [1, 2, 3];

const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
```

- 배열 디스트럭처링 할당의 기준은 배열의 인덱스다. 즉, 순서대로 할당된다. 이때 변수의 개수와 이터러블의 요소 개수가 반드시 일치할 필요는 없다

```js
const [a, b] = [1, 2];
console.log(a, b); // 1 2

const [c, d] = [1];
console.log(c, d); // 1 undefined

const [e, f] = [1, 2, 3];
console.log(e, f); // 1 2

const [g, , h] = [1, 2, 3];
console.log(g, h); // 1 3
```

- 배열 디스트럭처링 할당을 위한 변수에 Rest 파라미터와 유사하게 **Rest 요소(Rest element)** `...`을 사용할 수 있다. Rest 요소는 Rest 파라미터와 마찬가지로 반드시 마지막에 위치해야 한다

## 2. 객체 디스트럭처링 할당

- ES6의 객체 디스트럭처링 할당은 객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당한다. 이때 객체 디스트럭처링 할당의 대상(할당문의 우변)은 객체이어야 하며, **할당 기준은 프로퍼티 키다.** 즉, 순서는 의미가 없으며 선언된 변수 이름과 프로퍼티 키가 일치하면 할당된다

```js
const user = { firstName: "Dongchan", lastName: "Kim" };

const { lastName, firstName } = user;

console.log(firstName, lastName); // Dongchan Kim
```

- 객체의 프로퍼티 키와 다른 변수 이름으로 프로퍼티 값을 할당받으려면 다음과 같이 변수를 선언한다

```js
const user = { firstName: "Dongchan", lastName: "Kim" };

const { lastName: ln, firstName: fn } = user;

console.log(fn, ln); // Dongchan Kim
```

- 중첩 객체의 경우는 다음과 같이 사용한다

```js
const user = {
  name: "Kim",
  address: {
    zipCode: "03068",
    city: "Seoul",
  },
};

const {
  address: { city },
} = user;
console.log(city); // 'Seoul'
```

- 객체 디스트럭처링 할당을 위한 변수에 Rest 파라미터나 Rest 요소와 유사하게 **Rest 프로퍼티** `...` 을 사용할 수 있다. Rest 프로퍼티는 Rest 파라미터나 Rest 요소와 마찬가지로 반드시 마지막에 위치해야 한다

출처 : https://poiemaweb.com/
