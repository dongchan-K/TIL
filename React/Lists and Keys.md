# 리스트와 Key

## 여러개의 컴포넌트 렌더링 하기

엘리먼트 모음을 만들고 중괄호를 이용하여 JSX에 포함시킬 수 있다.

이를 이용하여 배열을 엘리먼트 리스트로 만들어 렌더링 해보자.
```JSX
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => {
  <li>{number}</li>
});

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

## 기본 리스트 컴포넌트

일반적으로 컴포넌트 안에서 엘리먼트 리스트를 렌더링한다.

위 예제를 컴포넌트로 리팩토링 해보자.
```JSX
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => {
    <li>{number}</li>
  });
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

위 코드를 실행하면 리스트의 각 항목에 key를 넣어야 한다는 경구고 표시된다.

**'key'는 엘리먼트 리스트를 만들때 포함해야 하는 특수한 문자열 어트리뷰트이다.**
```JSX
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => {
    <li key={number.toString()}>
      {number}
    </li>
  });
  return(
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  documnet.getElementById('root')
);
```

## Key

Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는다.

key는 엘리먼트에 안정적인 고유성을 부열하기 위해 배열 내부의 엘리먼트에 지정해야 한다.

key는 리스트의 다른 항목들 사이에서 고유하게 식별할 수 있는 ID를 key로 사용하는것이 좋다.
```JSX
const todoItems = todos.map((todo) => {
  <li key={todo.id}>
    {todo.text}
  </li>
});
```

안정적인 ID가 없다면 최후의 수단으로 항목의 인덱스를 key로 사용할 수 있다.
```JSX
const todoItems = todos.map((todo, index) => {
  <li key={index}>
    {todo.text}
  </li>
});
```

인덱스를 key로 사용할 경우 부정적인 영향을 끼칠 수 있다 : https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318

## key로 컴포넌트 추출하기

key는 주변 배열의 context(문맥)에서만 의미가 있다.

예를 들어 ListItem 컴포넌트를 추출한 경우 ListItem 안에 있는 <li> 엘리먼트가 아닌 배열의 <ListItem /> 엘리먼트가 key를 가져야 한다.
```JSX
function ListItem(props) {
  const value = props.value;
  // 여기에는 key를 지정할 필요가 없다
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => {
    // 배열 안에 key를 지정해야 한다
    <ListItem key={number.toString()} value={number} />
  });
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

## Key는 형제 사이에서만 고유한 값이어야 한다.

Key는 배열 안에서 형제 사이에서 고유해야 하고 전체 범위에서 고유할 필요는 없다.

두 개의 다른 배열을 만들 때 동일한 key를 사용할 수 있다.
```JSX
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) => {
        <li key={post.id}>
          {post.title}
        </li>
      })}
    </ul>
  );

  const content = props.posts.map((post) => {
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  });

  return(
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

React에서 key는 힌트를 제공하지만 컴포넌트로 전달하지는 않는다.

컴포넌트에서 key와 동일한 값이 필요하다면 다른 이름의 prop으로 명시적으로 전달한다.
```JSX
const content = posts.map((post) => {
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
});
// Post 컴포넌트는 props.id는 읽을 수 있지만 props.key는 읽을 수 없다
```

## JSX에 map() 포함시키기

JSX를 사용하면 중괄호 안에 모든 표현식을 포함할 수 있으므로 map() 함수의 결과를 인라인으로 처리할 수 있다.
```JSX
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => {
        <ListItem key={number.toString()}
                  value={number} />
      })}
    </ul>
  );
}
```