# Composition(합성)

**React는 강력한 합성 모델을 가지고 있으며, 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것이 좋다.**

## 컴포넌트에서 다른 컴포넌트를 담기

어떤 컴포넌트들은 어떤 자식 엘리먼트가 들어올 지 미리 예상할 수 없는 경우가 있다.

이러한 컴포넌트에서는 특수한 children prop을 사용하여 자식 엘리먼트를 출력에 그대로 전달하는 것이 좋다.

```JSX
function FancyBorder(props) {
  return(
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

이런 방식으로 다른 컴포넌트에서 JSX를 중첩하여 임의의 자식을 전달할 수 있다.

```JSX
function WelcomeDialog() {
  return(
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

## 특수화

때로는 어떤 컴포넌트의 '특수한 경우'인 컴포넌트를 고려해야 하는 경우가 있다.

이 역시 합성을 통해 해결할 수 있다.

더 '구체적인' 컴포넌트가 '일반적인' 컴포넌트를 렌더링하고 props를 통해 내용을 구성한다.

```JSX
function Dialog(props) {
  return(
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

🎯 출처 : https://ko.reactjs.org/docs/composition-vs-inheritance.html
