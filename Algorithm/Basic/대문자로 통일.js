function solution(s) {
  let answer = '';

  for (const x of s) {
    if (x === x.toUpperCase()) {
      answer += x;
    } else {
      answer += x.toUpperCase();
    }
  }

  return answer;
}

let str = 'ItisTimeToStudy';
console.log(solution(str));
