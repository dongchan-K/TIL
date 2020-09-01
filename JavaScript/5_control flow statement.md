# 제어문

**제어문(control flow statement)은 주어진 조건에 따라 코드 블록을 실행 하거나 반복 실행할 때 사용한다**

## 1. 블록문

**블록문은 0개 이상의 문을 중괄호로 묶은 것이다**

- 블록문은 자체 종결성(self closing)을 갖기 때문에 블록문의 끝에는 세미콜론을 붙이지 않는다는 것을 주의하자

**예시**

```js
{
  var score = 10;
}
```

## 2. 조건문

**조건문(conditional statement)** 은 주어진 조건식의 평가 결과에 따라 코드 블록(블록문)을 실행을 결정한다. 조건식은 불리언 값으로 평가될 수 있는 표현식이다

  ### if...else문

  - `if..else` 문은 조건식의 평가 결과가 true일 경우 `if` 문을 실행하고 false일 경우 `else` 문을 실행한다
  - `else if` 문은 여러번 사용할 수 있다
  - `else if` 문과 `else` 문은 사용 여부를 선택할 수 있다
  - 대부분의 `if..else` 문은 삼항 조건 연산자로 바꿔 쓸 수 있다

  **사용 예시**

  ```js
  if(조건식1){
    // 조건식1이 참이면 이 코드 블록이 실행된다
  }else if(조건식2){
    // 조건식2가 참이면 이 코드 블록이 실행된다
  }else{
    // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다
  }
  ```

  ### switch 문

  - `switch` 문은 표현식을 평가하여 일치하는 표현식을 갖는 `case` 문으로 실행 흐름을 옮긴다
  - `switch` 문의 표현식과 일치하는 `case` 문이 없다면 실행 순서는 default 문으로 이동한다
  - `default` 문은 사용 여부를 선택할 수 있고 `break` 문을 생략 가능하다
  - **폴스루(fall through)** : `break`문을 생략해서 `switch` 문의 표현식과 일치하는 `case` 문의 표현식이 있어도 모든 `case` 문과 `default` 문을 실행하는 현상
  - 폴스루를 활용해 여러 개의 `case` 문을 하나의 조건으로 사용도 가능하다

  **사용 예시**

  ```js
  switch(표현식){
    case 표현식1:
      switch 문의 표현식과 표현식1이 일치하면 실행될 문;
      break; // 표현식1이 일치하면 코드블록에서 탈출
    case 표현식2:
      switch 문의 표현식과 표현식2가 일치하면 실행될 문;
      break; // 표현식2가 일치하면 코드블록에서 탈출
    default:
      switch 문의 표현식과 일치하는 case 문이 없을 때 실행될 문;
  }
  ```

## 3. 반복문

**반복문(loop statement)** 은 조건식의 평가 결과가 참인 경우 코드 블록을 실행하고 조건식이 거짓일때까지 반복된다

  ### for 문

  - `for` 문은 조건식이 거짓일때까지 코드 블록을 반복한다
  - `for` 문에 어떤 식도 선언하지 않으면 무한루프가 된다 `for(;;) {...}`

  **사용 예시**

  ```js
  for (변수 선언문 또는 할당문; 조건식; 증감식){
    조건식이 참인 경우 반복 실행될 문;
  }
  ```

  ### while 문

  - `while` 문은 조건식이 거짓일때까지 코드 블록을 반복한다
  - 조건식의 결과가 언제나 참이면 무한루프가 된다 `while(true) {...}`
  - 무한루프를 빠져나오기 위해서는 `if` 문으로 조건을 만들고 `break` 문으로 코드 블록을 탈출할 것

  **사용 예시**

  ```js
  var score = 1;

  while(score < 5){
    console.log(score); // 1 2 3 4
    score++;
  }
  ```

  ### do...while 문

  - `do...while` 문은 코드 블록을 먼저 실행하고 조건식을 평가한다

  **사용 예시**

  ```js
  var score = 1;

  do{
    console.log(score);
    score++;
  }while(score < 5);
  ```

## 4. break 문

**`break` 문은 레이블 문, 반복문 또는 `switch` 문의 코드 블록을 탈출한다**

## 5. continue 문

`continue` 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다

## 예제풀이

**1. 점수를 입력받아 입력값이 100 - 90이면 A학점 , 89 - 80이면 B학점 , 79 - 70이면 C학점 69 -이면 F학점을 출력하는 코드를 구현하세요**

```html
<script>
  var value = prompt('점수를 입력해주세요') // 사용자가 텍스트를 입력할 수 있는 대화 상자를 띄우는 메서드
  if(value >= 90){
    alert('A학점'); // 확인 버튼을 가지며 메시지를 지정할 수 있는 경고 대화 상자를 띄우는 메서드
  }else if(value >= 80){
    alert('B학점');
  }else if(value >= 70){
    alert('C학점');
  }else{
    alert('F학점');
  }
  value = parseInt(value); // 문자를 숫자로 변환 해주는 함수
</script>
```

**2. 패스워드가 1234이면 '환영합니다.' 메시지를 출력한 후 멈추고, 그렇지 않으면 '패스워드를 잘못 입력했습니다. 다시 입력해주세요.'를 출력한 후 계속 입력 받는 코드를 구현하세요**

```html
<script>
  while (true) {
    var password = prompt('비밀번호를 입력하세요.');
    if (password == 1234) {
      alert('환영합니다.');
      break;
    } else{
      alert('패스워드를 잘못 입력했습니다. 다시 입력해주세요.');
    }
  }
</script>
```

**3. document.write 함수를 사용해서 아래 script 코드를 구현해서 완성 이미지 처럼 구구단을 완성해보세요**

**완성 이미지**

![구구단](https://user-images.githubusercontent.com/67866773/91124710-c6282480-e6da-11ea-83fc-58939c5f0447.png)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>구구단 - for문</title>
  <style>
    div {
      display: inline-block;
      padding: 0 20px 30px 20px;
      margin: 15px;
      border: 1px solid #ccc;
      line-height: 2;
    }
    div h3 {
      text-align: center;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>구구단</h1>
  <script>
    var i;
    var j;
    for (i = 1; i < 10; i++) {
      document.write(`<div>`); // 열린 문서에 텍스트 스트링을 적는 메서드
      document.write(`<h3>${i}단</h3>`);
      for (j = 1; j < 10; j++) {
        var z = i * j;
        document.write(`${i} X ${j} = ${z}</br>`);
      }
      document.write(`</div>`);
    }
  </script>
</body>
</html>
```

**4. 두 정수가 주어졌을때, 첫번째 숫자부터 두번째 숫자 전까지 모든 수를 곱한 값을 반환하고 만약 두번째 숫자가 첫번째 숫자보다 작다면 0을 반환하는 multiplyBetween 함수를 작성하세요**

```js
function multiplyBetween(num1, num2) {
  if (num1 < num2) {
    var x = num1;
    while (num1 < num2 - 1) {
      num1++;
      x = x * num1;
    }
    return x;
  } else {
    return 0;
  }
}
let output = multiplyBetween(2, 5);
console.log(output);
```

## 요약
- 이중 `for` 문 동작원리 이해할 것
- 증감식 동작원리 이해할 것
- `continue` 문 예제 만들고 학습 해볼것
- 조건문, 반복문 반복 학습할것

