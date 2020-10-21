# Array HOF 연습 문제

## 1. html 생성

**Question**

아래 배열을 사용하여 html을 생성하는 함수를 작성하라

```js
const todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function render() {
    let html = '';

    todos.forEach((todo) => {});

    return html;
}

console.log(render());
/*
<li id="3">
  <label><input type="checkbox">HTML</label>
</li>
<li id="2">
  <label><input type="checkbox" checked>CSS</label>
</li>
<li id="1">
  <label><input type="checkbox">Javascript</label>
</li>
*/
```

**Answer**

```js
const todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function render() {
    let html = '';

    todos.forEach((todo) => {
        html += `<li id="${todo.id}">
    <label><input type="checkbox">${todo.content}</label>
<li>
`;
    });

    return html;
}

console.log(render());
/*
<li id="3">
<label><input type="checkbox">HTML</label>
</li>
<li id="2">
<label><input type="checkbox" checked>CSS</label>
</li>
<li id="1">
<label><input type="checkbox">Javascript</label>
</li>
*/
```

## 2. 특정 프로퍼티 추출

**Question**

요소의 프로퍼티(id, content, completed)를 문자열 인수로 전달하면 todos의 각 요소 중, 해당 프로퍼티의 값만을 추출한 배열을 반환하는 함수를 작성하라.

단, for 문이나 Array#forEach는 사용하지 않도록 하자.

```js
const todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function getValues(key) {}

console.log(getValues('id')); // [3, 2, 1]
console.log(getValues('content')); // ['HTML', 'CSS', 'Javascript']
console.log(getValues('completed')); // [false, true, false]
```

**Answer**

```js
const todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function getValues(key) {
    return todos.map((todo) => todo[key]);
}

console.log(getValues('id')); // [3, 2, 1]
console.log(getValues('content')); // ['HTML', 'CSS', 'Javascript']
console.log(getValues('completed')); // [false, true, false]
```

## 3. 프로퍼티 정렬

**Question**

요소의 프로퍼티(id, content, completed)를 문자열 인수로 전달하면 todos의 요소를 정렬하는 함수를 작성하라

단, todos는 변경되지 않도록 하자

```js
const todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function sortBy(key) {}

console.log(sortBy('id'));
/*
[
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false }
]
*/
console.log(sortBy('content'));
/*
[
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/
console.log(sortBy('completed'));
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true }
]
*/
```

**Answer**

```js
const todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function sortBy(key) {
    return todos.sort((todo1, todo2) =>
        todo1[key] > todo2[key] ? 1 : todo1[key] < todo2[key] ? -1 : 0
    );
}

console.log(sortBy('id'));
/*
[
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false }
]
*/
console.log(sortBy('content'));
/*
[
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/
console.log(sortBy('completed'));
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true }
]
*/
```

## 4. 새로운 요소 추가

**Question**

새로운 요소(예를 들어 `{ id: 4, content: 'Test', completed: false})를 인수로 전달하면 todos의 선두에 새로운 요소를 추가하는 함수를 작성하라. 단, Array#push는 사용하지 않도록 하자.

```js
let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function addTodo(newTodo) {}

addTodo({ id: 4, content: 'Test', completed: false });

console.log(todos);
/*
[
  { id: 4, content: 'Test', completed: false },
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
]
*/
```

**Answer**

```js
let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function addTodo(newTodo) {
    todos = [newTodo, ...todos];
}

addTodo({ id: 4, content: 'Test', completed: false });

console.log(todos);
/*
[
  { id: 4, content: 'Test', completed: false },
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
]
*/
```

## 5. 특정 요소 삭제

**Question**

todos에서 삭제할 요소의 id를 인수로 전달하면 해당 요소를 삭제하는 함수를 작성하라.

```js
let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function removeTodo(id) {}

removeTodo(2);

console.log(todos);
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/
```

**Answer**

```js
let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function removeTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
}

removeTodo(2);

console.log(todos);
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/
```

## 8. completed 프로퍼티의 값이 true인 요소의 갯수 구하기

**Question**

todos에서 완료(completed: true)한 할일의 갯수를 구하는 함수를 작성하라.
단, for문, Array#forEach는 사용하지 않도록 하자.

```js
let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function countCompletedTodos() {}

console.log(countCompletedTodos()); // 1
```

**Answer**

```js
// 1. filter 고차함수를 사용한 풀이
let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function countCompletedTodos() {
    return todos.filter((todo) => todo.completed === true).length;
}

console.log(countCompletedTodos()); // 1

// 2. reduce 고차함수를 사용한 풀이
let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function countCompletedTodos() {
    return todos.reduce(
        (initialValue, todo) =>
            todo.completed === true ? ++initialValue : initialValue,
        0
    );
}

console.log(countCompletedTodos()); // 1
```

## 9. id 프로퍼티 값 중에서 최대값 구하기

**Question**

todos의 id 프로퍼티 값 중에서 최대값을 구하는 함수를 작성하라.

단, for 문, Array#forEach는 사용하지 않도록 하자.

```js
let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function getMaxId() {}

console.log(getMaxId()); // 3
```

**Answer**

```js
// 1. map 고차함수를 사용한 풀이
let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function getMaxId() {
    return todos.length ? Math.max(...todos.map((todo) => todo.id)) : 0;
}

console.log(getMaxId()); // 3

// 2. reduce 고차함수를 사용한 풀이
let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
];

function getMaxId() {
    return todos.reduce(
        (initialValue, todo) =>
            todo.id > initialValue ? todo.id : initialValue,
        0
    );
}

console.log(getMaxId()); // 3
```
