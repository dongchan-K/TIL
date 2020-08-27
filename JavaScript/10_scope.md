# 스코프

- **스코프는 식별자가 자신이 선언된 위치에 의해 다른 코드가 식별자를 참조할 수 있는 유효한 범위이다**

**함수 스코프(유효범위) 예시**

```js
var x = 'global';

function foo() {
  var x = 'local';
  console.log(x); // -> 'local'을 출력한다. 전역 변수인 'global'을 참조하지만 함수 몸체 내부에서 'local'이 재선언 되었기 때문
}

foo();

console.log(x); // -> 'global'을 출력한다. 함수 내부에 선언된 var x는 함수 몸체 내에서만 참조할 수 있기 때문
```

- **var 키워드로 선언한 변수는 같은 스코프 내에서 중복 선언이 가능하나, let이나 const 키워드로 선언한 변수는 중복 선언이 불가능하다**

**키워드에 따른 중복 선언 예시**

```js
function foo() {
  var x = 1;
  // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
  var x = 2;
  console.log(x); // 2
}
foo(); // 함수 호출

function bar() {
  const y = 3;
  let x = 1;
  // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
  const y = 4;
  let x = 2; 
  // SyntaxError: Identifier 'x', 'y' has already been declared
}
bar(); // 함수 호출
```

## 스코프의 종류

- **스코프는 코드의 가장 바깥 영역에 위치한 전역 스코프와 함수 몸체 내부에 위치한 지역 스코프로 구분한다**
- **전역 스코프를 갖는 전역 변수는 어디서든 참조 가능하다**
- **지역 스코프를 갖는 지역 변수는 자신의 지역 스코프와 하위 지역 스코프에서만 참조 가능하다**

**전역 스코프와 지역 스코프 예시 이미지**

<img width="596" alt="전역 스코프와 지역 스코프" src="https://user-images.githubusercontent.com/67866773/91412601-fa3f4900-e884-11ea-8946-16f263e746c3.png">

## 스코프 체인


