# Redux

리덕스는 가장 많이 사용되는 리액트 상태 관리 라이브러리다.

단순한 상태 관리만 한다면 Context API로 충분할 수 있지만 리덕스를 사용하면 상태를 더욱 체계적으로 관리 가능하기 때문에 프로젝트의 규모가 클 경우에는 리덕스를 사용하는 것이 좋다.

![redux store](https://user-images.githubusercontent.com/67866773/103477345-5a309800-4e01-11eb-8520-a986618802e6.PNG)

## 리덕스 기본 개념

### 1. 액션(action)

상태에 변화가 필요하면 액션(action)이 발생한다.

액션은 객체로 표현된다.

액션 객체는 type 필드를 반드시 가지고 있어야 하며, 문자열이다.

상태 업데이트를 할 때 참고해야할 값 payload는 필수가 아니다.

```JSX
{
  type: 'ADD_TODO',
  data: {
    id: 1,
    text: '리덕스 배우기'
  }
}

{
  type: 'CHANGE_INPUT',
  text: '안녕하세요'
}
```

### 2. 액션 생성 함수(action creator)

액션 생성 함수(action creator)는 액션 객체를 만들어 주는 함수이다.

어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 번거로우며 실수를 유발할 수 있기 때문에 함수로 관리한다.

```JSX
function addTodo(data) {
  return {
    type: 'ADD_TODO',
    data
  };
}

// 화살표 함수 예시
const changeInput = text => ({
  type: 'CHANGE_INPUT',
  text
});
```

### 3. 리듀서(reducer)

리듀서(reducer)는 변화를 일으키는 함수이다.

액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아온다.

현재 상태와 전달받은 액션 객체를 참고하여 새로운 상태를 만들어 반환한다.

```JSX
const initialState = {
  counter: 1
};

function reducer(state = initailState, action) {
  switch(action, type) {
    case INCREMENT:
      return {
        counter: state.count + 1
      };
    default:
      return state;
  }
}
```

### 4. 스토어(store)

프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만든다.

한 개의 프로젝트는 단 하나의 스토어(단일 스토어)를 갖는다.

### 5. 디스패치(dispatch)

디스패치(dispatch)는 스토어의 내장 함수 중 하나이다.

디스패치는 액션을 발생시키는 것이다.

이 함수는 dispatch(action)과 같은 형태로 액션 객체를 파라미터로 넣어서 호출한다.

디스패치가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어준다.

### 6. 구독(subscribe)

구독(subscribe)은 스토어의 내장 함수 중 하나이다.

subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출하면, 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출된다.

```JSX
const litener = () => {
  console.log('상태가 업데이트 됨');
}
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
```

## 리덕스의 세 가지 규칙

1. 단일 스토어

하나의 애플리케이션 안에는 하나의 스토어가 존재해야 한다.

2. 읽기 전용 상태

리덕스의 상태는 읽기 전용이다.

상태를 업데이트할 때 기존의 객체는 건드리지 않고 새로운 객체를 생성해 주어야 한다.

리덕스에서 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교 검사를 하기 때문이다.

3. 리듀서는 순수 함수

변화를 일으키는 리듀서 함수는 순수 함수여야 한다.

- 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는다
- 파라미터 외의 값에는 의존하면 안된다.
