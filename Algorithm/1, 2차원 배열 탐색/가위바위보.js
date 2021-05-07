function solution(a, b) {
  let answer = '';

  for (let i = 0; i < a.length; i++) {
    // a가 이기는 경우 -> 비기는 경우 -> 나머지(b가 이기는 경우) 순으로 조건을 줌
    if (a[i] === 1 && b[i] === 3) {
      answer += 'A';
    } else if (a[i] === 2 && b[i] === 1) {
      answer += 'A';
    } else if (a[i] === 3 && b[i] === 2) {
      answer += 'A';
    } else if (a[i] === b[i]) {
      answer += 'D';
    } else {
      answer += 'B';
    }
  }

  return answer;
}

const a = [2, 3, 3, 1, 3];
const b = [1, 1, 2, 2, 3];

console.log(solution(a, b));
