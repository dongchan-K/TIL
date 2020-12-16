# Lifting State Up

**동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 때, 그 값을 필요로 하는 컴포넌트 간의 공통 조상으로 state를 끌어올림으로써 구현할 수 있다.**

state가 조상 컴포넌트로부터 prop으로 전달되기 때문에 읽기 전용인 prop은 setState 메서드로 직접 값을 변경할 수 없다는점을 유의하자.

위와 같은 문제는 컴포넌트를 [제어](https://github.com/dongchan-K/TIL/blob/master/React/Forms.md#%EC%A0%9C%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-controlled-component) 가능하게 만드는 방식으로 해결한다.

🎯 출처 : https://ko.reactjs.org/docs/lifting-state-up.html
