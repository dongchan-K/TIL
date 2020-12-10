# 엘리먼트 렌더링

**엘리먼트는 React 앱의 가장 작은 단위이다.**

브라우저 DOM 엘리먼트와 달리 React 엘리먼트는 일반 객체이며 React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트한다.

⚠ 엘리먼트는 컴포넌트의 '구성요소'이므로 혼동하지 말자!
```JSX
// 엘리먼트
const element = <h1>Hello, world!</h1>;
```

## DOM에 엘리먼트 렌더링

HTML 파일 어딘가에 `<div id="root"></div>`가 있다고 가정해보자 

이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 때문에 이를 '루트(root)' DOM 노드라고 부른다.

React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있다. React를 기존 앱에 통합하려는 경우 원하는 만큼 많은 수의 독립된 루트 DOM 노드가 있을 수 있다.

React 엘리먼트를 루트 DOM 노드에 렌더링하려면 `ReactDOM.render()`로 전달한다.
```JSX
const element = <h1>Hello, world!</h1>
ReactDOM.render(element, document.getElementById('root'));
```

## 렌더링 된 엘리먼트 업데이트

React 엘리먼트는 **불변객체** 이기 때문에 생성한 이후에는 엘리먼트의 자식이나 속성을 변경할 수 없다. 

엘리먼트는 영화에서 하나에서 프레임과 같이 특정 시점의 UI를 보여준다.

지금까지 내용을 바탕으로 하면 UI를 업데이트하는 유일한 방법은 새로운 엘리먼트를 생성하고 이를 `ReactDOM.render()`로 전달하는 것이다.
```JSX
// 시계 예시
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

// 초마다 ReactDOM.render()를 호출
setInterval(tick, 1000);
```

## 변경된 부분만 업데이트

React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트한다.

위의 시계 예시에서 매초 마다 전체 UI를 다시 그리도록 엘리먼트를 만들었지만 React DOM은 내용이 변경된 텍스트 노드만 업데이트한다.

**Virtual DOM** : 실제 DOM이 아닌 가상의 DOM4

**React는 실제로 DOM을 제어하는 것이 아닌 중간에 Virtual DOM을 두어 개발의 편의성(DOM을 직접 제어하지 않음)과 성능(배치 처리로 DOM을 변경)을 개선한다. -> React에서 적절하게 Virtual DOM을 실제 DOM에 반영하는 작업을 한다.**

🎯 [Virtual DOM 참고 자료](https://www.youtube.com/watch?v=BYbgopx44vo)
