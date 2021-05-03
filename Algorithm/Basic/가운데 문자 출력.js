function solution(s) {
  let answer;
  const middle = Math.floor(s.length / 2);

  // slice -> substring 메서드로 대체 가능
  if (s.length % 2) {
    answer = s.slice(middle, middle + 1);
  } else {
    answer = s.slice(middle - 1, middle + 1);
  }

  return answer;
}
console.log(solution('study'));
console.log(solution('good'));
