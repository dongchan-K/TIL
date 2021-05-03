function solution(s, t) {
  let answer = 0;
  for (const x of s) {
    if (x === t) answer++;
  }
  return answer;
}

const str = 'COMPUTERPROGRAMMING';
console.log(solution(str, 'R'));
