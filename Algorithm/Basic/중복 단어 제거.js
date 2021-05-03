function solution(s) {
  let answer;

  // 포함된 첫번째 index와 현재 index가 일치하는 경우만 반환
  answer = s.filter((v, i) => s.indexOf(v) === i);

  return answer;
}
const str = ['good', 'time', 'good', 'time', 'student'];
console.log(solution(str));
