function solution(s) {
  let answer;
  const middle = Math.floor(s.length / 2);

  if (s.length % 2) {
    answer = s.substring(middle, middle + 1);
  } else {
    answer = s.substring(middle - 1, middle + 1);
  }

  return answer;
}
console.log(solution('study'));
console.log(solution('good'));
