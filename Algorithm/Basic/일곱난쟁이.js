function solution(arr) {
  let answer = arr;
  const sum = arr.reduce((acc, curr) => acc + curr, 0);

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (sum - (arr[i] + arr[j]) === 100) {
        // j 를 먼저 자르지 않고 i 를 먼저 자르게 되면 배열이 당겨져서 엉뚱한 수를 자르게 된다 -> 주의
        answer.splice(j, 1);
        answer.splice(i, 1);
      }
    }
  }

  return answer;
}

let arr = [20, 7, 23, 19, 10, 15, 25, 8, 13];

console.log(solution(arr));
