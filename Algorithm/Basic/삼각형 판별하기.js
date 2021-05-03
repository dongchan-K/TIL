function solution(a, b, c) {
  const totalValue = a + b + c;
  let answer = 'YES';
  let maxValue;

  if (a < b) {
    maxValue = b;
  } else {
    maxValue = a;
  }

  if (c > maxValue) {
    maxValue = c;
  }
  if (totalValue - maxValue > maxValue) {
    answer = 'No';
  }
  return answer;
}

console.log(solution(6, 7, 11));
