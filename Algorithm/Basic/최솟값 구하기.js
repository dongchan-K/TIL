function solution(arr) {
  let answer;
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  answer = min;
  // 스프레드 문법 사용 예시
  // answer = Math.min(...arr);
  return answer;
}

const arr = [5, 7, 1, 3, 2, 9, 11];

console.log(solution(arr));
