## Homework #1

### Question1

![Question1](https://user-images.githubusercontent.com/67866773/103299036-00b21d00-4a3f-11eb-8706-b3a5c8238720.PNG)

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

![Question2](https://user-images.githubusercontent.com/67866773/103299054-0ad41b80-4a3f-11eb-83b2-45e753fa08f6.PNG)

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
