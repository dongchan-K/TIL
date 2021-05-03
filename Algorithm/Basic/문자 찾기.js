function solution(s, t) {
  let answer = 0;
  for (const x of s) {
    if (x === t) answer++;
  }

  // split 메서드를 사용하여도 풀이 가능
  // let answer = s.split(t).length - 1;
  return answer;
}

const str = 'COMPUTERPROGRAMMING';
console.log(solution(str, 'R'));
