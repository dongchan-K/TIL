# 폼

HTML 폼 엘리먼트는 자체 내부 상태를 갖기 때문에, 다른 DOM 엘리먼트와 조금 다르게 동작한다.

## 제어 컴포넌트 (Controlled Component)

HTML 에서 `<input>`, `<textarea>`, `<select>` 와 같은 폼 엘리먼트는 일반적으로 사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트한다.

React에서는 변경할 수 있는 state가 일반적으로 컴포넌트의 state 속성에 유지되며 setState()에 의해 업데이트 된다.

React state를 '신뢰 가능한 단일 출처'로 만들어 두 요소를 결합하여 폼을 렌더링하는 React 컴포넌트는 폼에 발생하는 사용자 입력값을 제어할 수 있다.

**React에 의해 값이 제어되는 입력 폼 엘리먼트를 '제어 컴포넌트'라고 한다**

```JSX
class NameForm extends React.Component {
  state = {
    value: ''
  };
  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  handleSubmit = (e) => {
    alert('A name was submitted: ' + this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

value 어트리뷰트는 폼 엘리먼트에 설정되므로 표시되는 값은 항상 this.state.value가 되고 state는 신뢰 가능한 단일 출처가 된다.

**제어 컴포넌트로 사용하면, input의 값은 항상 React state에 의해 결정된다**

## 다중 입력 제어하기

여러 input 엘리먼트를 제어해야할 때, 각 엘리먼트에 name 어트리뷰트를 추가하고 `event.target.name` 값을 통해 핸들러가 어떤 작업을 할 지 선택할 수 있게 한다.

```JSX
class Reservation extends React.Component {
  state = {
    isGoing: true,
    numberOfGuests: 2
  };

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
          name="isGoing"
          type="checkbox"
          checked={this.state.isGoing}
          onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
          name="numberOfguests"
          type="number"
          value={this.state.numberOfGuests}
          onChange={this.hnadleInputChange} />
        </label>
      </form>
    );
  }
}
```

## 제어되는 Input Null 값

제어 컴포넌트에 value prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없다. value를 설정했음에도 수정할 수 있다면 value를 undefined나 null로 설정했을 수 있다.

```JSX
// 첫 번째 입력은 잠겨있지만 잠시 후 입력이 가능해진다
ReactDOM.render (<input value="hi" />, mountNode);

setTimeout(() => {
  ReactDom.render(<input value={null} />, mountNode);
}, 1000)
```

## 제어 컴포넌트의 대안

제어 컴포넌트는 데이터를 변경할 수 있는 모든 방법에 대해 이벤트 핸들러를 작성하고 React 컴포넌트를 통해 모든 상태를 연결해야 하기 때문에 대체 기술인 [비제어 컴포넌트](https://ko.reactjs.org/docs/uncontrolled-components.html)가 있다.

🎯 출처 : https://ko.reactjs.org/docs/forms.html
