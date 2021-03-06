# 객체

### 원시값을 제외한 나머지 값(함수, 배열, 정규 표현식)들은 모두 객체다. 원시값은 변경 불가능한 값이지만, 객체는 변경 가능한 값이다

- 객체는 0개 이상의 프로퍼티로 구성되며, 프로퍼티는 키(key)와 값(value)으로 구성된다
- 객체는 프로퍼티와 메서드로 구성된다
  - **프로퍼티** : 객체의 상태를 나타내는 값(data)으로 프로퍼티를 여러개 정의할 때는 ,(쉼표)로 구분한다
  - **메서드** : 프로퍼티를 참조하고 조작할 수 있는 동작으로 즉, 프로퍼티 값이 함수일 경우 메서드(method)라 부른다

**예시**

```js
var score = {
  //프로퍼티
  num: 0,
  //메서드
  increase: function () {
    this.num++;
  },
};
```

## 객체 리터럴

**객체 리터럴은 중괄호{}내에 0개 이상의 프로퍼티를 정의한다. 변수에 할당이 이루어질 때 자바스크립트 엔진은 객체 리터럴을 해석해 객체를 생성한다**

**예시**

```js
var person = {
  firstName: 'Dong-chan', // 프로퍼티
  last-name: 'Kim' // 프로퍼티
};
```

## 프로퍼티

### 프로퍼티 접근

- **프로퍼티는 마침표 표기법과 대괄호 표기법으로 접근 가능하다**
- **대괄호 표기법으로 접근시 프로퍼티 키는 따옴표로 감싼 문자열이어야 함을 주의하자**

**예시**

```js
var person = {
  name: "Kim",
};

// 마침표 표기법 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법 프로퍼티 접근
console.log(person["name"]); // Lee
```

### 프로퍼티 값 갱신

- **이미 존재하는 프로퍼티에 값을 재할당 가능하다**

**예시**

```js
var person = {
  name: "Lee",
};
// 프로퍼티 값 갱신
person.name = "Kim";

console.log(person); // {name: "Kim"}
```

### 프로퍼티 동적 생성

- **존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적 생성되고 값이 할당된다**

**예시**

```js
var person = {
  name: "Lee",
};
// 프로퍼티 동적 생성
person.age = 20;

console.log(person); // {name: "Lee", age: 20}
```

### 프로퍼티 삭제

- **delete 연산자를 이용해서 객체의 프로퍼티를 삭제할 수 있다**

**예시**

```js
var person = {
  name: "Lee",
};
// name 프로퍼티 삭제
delete person.name;
```

## 예제풀이

**1. guro 라는 객체를 만들어라. (프로퍼티 키와 값은 적절하다고 생각하는 것으로 사용) 이름, 기수(prompt 함수로 받아온 값을 읽어들일 것), 과목, 학원이름, 나이, 성별 각각의 프로퍼티 값을 템플릿 리터럴을 사용하여 alert 함수로 나타내시오**

```html
<script>
  var guro = {
    name: "김동찬",
    age: 28,
    academy: "fast-campus",
    class: "front-end",
  };
  var x = prompt("기수를 입력하세요.");
  alert(
    `${guro.name}씨(${guro.age})는${guro.academy}의 ${guro.class}의 ${x}기 입니다`
  );
</script>
```

## 강의 내용 요약

- 자바 스크립트는 객체 지향 언어이므로 객체에 대한 개념 확실히 할 것
- 프로퍼티는 :(콜론)으로 키(key)와 값(value)을 구분한다
- 객체는 관련된 정보를 묶어서 관리한다
- 객체는 0개 이상의 프로퍼티의 집합이며 또한 상태(프로퍼티)와 동작(메서드)의 집합이다
- 메서드는 일반적으로 프로퍼티를 다룬다
- 프로퍼티 키는 문자열이며(''는 생략되지만), 문자열이 아니라면 엔진이 암묵적으로 타입변환 한다
- 프로퍼티 키가 식별자 네이밍을 준수한다면 .(마침표 표기법)과 [](대괄호 표기법) 둘 다 접근 가능하지만, 준수하지 않는다면 [](대괄호 표기법)만 접근 가능하다
- 프로퍼티 키는 식별자 네이밍을 준수하는 것이 에러를 줄일 수 있다
- 객체는 유사 배열이다
- 유사배열 객체는 프로퍼티 키가 숫자 형식의 문자열을 갖고, length를 갖는다 -> 순회하기 위해 만들어졌다
- 배열은 순서에 의미가 있다(인덱스로 값을 가져오기 때문) 하지만 객체는 순서에 의미가 없다(프로퍼티 키로 값을 가져오기 때문)
- 존재하지 않는(선언되지 않은) 프로퍼티에 접근하면 undefined를 반환한다
- 프로퍼티 삭제는 사용하지 않는다(삭제할 상황을 만드는 것 자체가 잘못되었기 때문)
- ECMA Script 사양에 등록된 표준은 어떠한 환경이던(브라우저, Node.js 등...) 동일하게 지원한다
- Web API는 Node.js 환경에서 지원되지 않는다 `alert` 등...
- `console.log` 같은 경우는 표준에 등재되어있지 않지만 Node.js 환경, 브라우저 환경 둘 다 출력되는 이유는 각각 API를 만들어 두었기 때문 -> 때문에 환경별로 출력결과가 다르다

출처 : https://poiemaweb.com/
