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
  num : 0, 
  //메서드
  increase : function(){
    this.num++;
  }
}
```

![프로퍼티](https://user-images.githubusercontent.com/67866773/91147934-eb755c80-e6f3-11ea-8ab6-2bad4e1e8957.png)

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
  name: 'Kim'
};

// 마침표 표기법 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법 프로퍼티 접근
console.log(person['name']); // Lee
```

### 프로퍼티 값 갱신

- **이미 존재하는 프로퍼티에 값을 재할당 가능하다**

**예시**

```js
var person = {
  name: 'Lee'
};
// 프로퍼티 값 갱신
person.name = 'Kim';

console.log(person);  // {name: "Kim"}
```

### 프로퍼티 동적 생성

- **존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적 생성되고 값이 할당된다**

**예시**

```js
var person = {
  name: 'Lee'
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
  name: 'Lee'
};
// name 프로퍼티 삭제
delete person.name;
```

## 예제풀이

**1. guro 라는 객체를 만들어라. (프로퍼티 키와 값은 적절하다고 생각하는 것으로 사용) 이름, 기수(prompt 함수로 받아온 값을 읽어들일 것), 과목, 학원이름, 나이, 성별 각각의 프로퍼티 값을 템플릿 리터럴을 사용하여 alert 함수로 나타내시오**

```html
<script>
var guro = {
  name: '김동찬',
  age: 28,
  academy: 'fast-campus',
  class: 'front-end'
};
var x = prompt('기수를 입력하세요.');
alert(
  `${guro.name}씨(${guro.age})는${guro.academy}의 ${guro.class}의 ${x}기 입니다`
);
</script>
```

## 확인사항

- 자바 스크립트는 객체 지향 언어이므로 객체에 대한 개념 확실히 할 것
- 프로퍼티는 :(콜론)으로 키(key)와 값(value)을 구분한다
- 객체와 관련된 용어(프로퍼티, 메서드)확실히 이해할 것
- 객체와 관련된 예제 만들어볼 것


