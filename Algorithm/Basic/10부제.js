function solution(day, arr) {
  let answer = 0;

  for (x of arr) {
    if (day === x % 10) answer++;
  }

  return answer;
}

arr = [25, 23, 11, 47, 53, 17, 33];

console.log(solution(3, arr));
