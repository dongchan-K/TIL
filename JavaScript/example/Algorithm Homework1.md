## Homework #1

### Question1

**문제 설명**

프로그래머스 모바일은 개인정보 보호를 위해 고지서를 보낼 때 고객들의 전화번호의 일부를 가립니다.

전화번호가 문자열 phone_number로 주어졌을 때, 전화번호의 뒷 4자리를 제외한 나머지 숫자를 전부 \* 으로 가린 문자열을 리턴하는 함수, solution을 완성해주세요.

**제한 조건**

- s는 길이 4 이상, 20 이하인 문자열입니다.

### 풀이

```JS
function solution(phone_number) {
  // 알고리즘 구현
  let answer = "";
  for (let i = 0; i < phone_number.length; i++) {
    if (i < phone_number.length - 4) {
      answer += "*";
    } else {
      answer += phone_number[i];
    }
  }
  return answer;
}

// 확인용
const phone_number = "01012345678";

console.log(solution(phone_number));
```

### 😂 제출 후 생각한 풀이 😂

```JS
function solution(phone_number) {
  // 알고리즘 구현
  const answer = "*".repeat(phone_number.length - 4) + phone_number.slice(-4);
  return answer;
}

// 확인용
const phone_number = "01012345678";

console.log(solution(phone_number));
```

### Question2

**문제 설명**

문제에는 표준 입력으로 두 개의 정수 n과 m이 주어집니다.
별(\*) 문자를 이용해 가로의 길이가 n, 세로의 길이가 m인 직사각형 형태를 출력해보세요.

**제한 조건**

- n과 m은 각각 1000 이하인 자연수입니다.

**예시**

입력

```JS
5 3
```

출력

```JS
*****
*****
*****
```

### 풀이

```JS
process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  const n = data.split(" ");
  const a = Number(n[0]), b = Number(n[1]);
  const str = "*";

    for(let i = 0; i < b; i++) {
      console.log(str.repeat(a));
    }
});
```

![level1](https://user-images.githubusercontent.com/67866773/103300012-3f48d700-4a41-11eb-8e2c-1e6ae7468bbc.PNG)

출처 : https://programmers.co.kr/skill_checks
