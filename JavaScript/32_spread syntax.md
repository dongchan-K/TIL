# 스프레드 문법 

- ES6에서 도입된 스프레드 문법`...`은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만든다

- 스프레드 문법을 사용할 수 있는 대상은 Array, String, Map, Set, DOM 컬렉션(NodeList, HTMLCollection), arguments와 같이 for...of 문으로 순회할 수 있는 이터러블에 한정된다

- 스프레드 문법의 결과는 값이 아닌 값들의 목록이기 때문에 변수에 할당하는 등 값으로 사용할 수 없고 값의 목록을 사용하는 문맥에서만 사용할 수 있다
  - 함수 호출문의 인수 목록
  - 배열 리터럴의 요소 목록
  - 객체 리터럴의 프로퍼티 목록

## 1. 함수 호출문의 인수 목록에서 사용하는 경우

```js
// 스프레드 문법 예시

const arr = [1, 2, 3];

const max = Math.max(...arr);  // -> 3
```

```js
// Rest 파라미터는 인수들의 목록을 배열로 전달받는다

function foo(...rest) {
  console.log(rest);
}

foo(...[1, 2, 3]);
```

- Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받기 위해 매개변수 이름 앞에 `...`을 붙이는 것이므로 반대의 개념이라는 것을 주의하자

## 2. 배열 리터럴 내부에서 사용하는 경우

### 2-1. concat

```js
// ES5
var arr = [1, 2].concat([3, 4]);
console.log(arr); // [1, 2, 3, 4]
```

```js
// ES6
const arr = [...[1, 2], ...[3, 4]];
console.log(arr); // [1, 2, 3, 4]
```

### 2-2. splice

```js
// ES5
var arr1 = [1, 4];
var arr2 = [2, 3];

Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));
console.log(arr1); // [1, 2, 3, 4]
```

```js
// ES6
const arr1 = [1, 4];
const arr2 = [2, 3];

arr1.splice(1, 0, ...arr2);
console.log(arr1); // [1, 2, 3, 4]
```

### 2-3. 배열 복사

```js
// ES5
var origin = [1, 2];
var copy = origin.slice();

console.log(copy); // [1, 2]
console.log(copy === origin); // false
```

```js
// ES6
const origin = [1, 2];
const copy = [...origin];

console.log(copy); // [1, 2]
console.log(copy === origin); // false
```

- 이때 원본 배열의 각 요소를 얕은 복사(shallow copy)하여 새로운 복사본을 생성한다

### 2-4. 이터러블을 배열로 변환

```js
// ES5
function sum() {
  // 이터러블이면서 유사 배열 객체인 arguments를 배열로 변환
  var args = Array.prototype.slice.call(arguments);

  return args.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3)); // 6
```

```js
// ES6
function sum() {
  // 이터러블이면서 유사 배열 객체인 arguments를 배열로 변환
  return [...arguments].reduce((pre, cur) => pre + cur , 0);

  console.log(sum(1, 2, 3)); // 6
}
```

- Rest 파라미터를 사용하면 더 쉽게 구현할 수 있다

```js
// Rest 파라미터 args는 함수에 전달된 인수들의 목록을 배열로 전달받는다
const sum = (...args) => args.reduce((pre, cur) => pre + cur, 0);

console.log(sum(1, 2, 3)); // 6
```

- Array.from 메서드를 사용해 변환할 수도 있다

```js
// Array.from은 유사 배열 객체 또는 이터러블을 배열로 변환한다
Array.from(arrayLike); // [1, 2, 3]
```

## 3. 객체 리터럴 내부에서 사용하는 경우

- 스프레드 프로퍼티를 사용하면 객체 리터럴의 프로퍼티 목록에서도 스프레드 문법을 사용할 수 있다

- 스프레드 문법의 대상은 이터러블이어야 하지만 스프레드 프로퍼티는 일반 객체를 대상으로도 스프레드 문법의 사용을 허용한다

```js
// 객체 병합. 프로퍼티가 중복되는 경우, 뒤에 위치한 프로퍼티가 우선권을 갖는다
const merged = {...{x: 1, y: 2}, ...{y: 10, z: 3}};
console.log(merged); // {x: 1, y: 10, z: 3}

// 특정 프로퍼티 변경
const changed = {...{x: 1, y: 2}, y: 100};
// changed = {...{x: 1, y: 2}, ...{y: 100}}
console.log(changed); // {x: 1, y: 100}

// 프로퍼티 추가
const added = {...{x: 1, y: 2}, z: 0};
// added = {...{x: 1, y: 2}, z: 0};
console.log(added); // {x: 1, y: 2, z: 0}
```
