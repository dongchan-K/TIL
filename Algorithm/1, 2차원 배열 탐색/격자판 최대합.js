function solution(arr) {
  let answer = Number.MIN_SAFE_INTEGER;
  let row = 0;
  let column = 0;

  // 행, 열의 합
  for (let i = 0; i < arr.length; i++) {
    // 각 행, 열의 합을 구하고 초기화
    row = 0;
    column = 0;
    for (let j = 0; j < arr.length; j++) {
      row += arr[i][j];
      column += arr[j][i];
    }
    // 각 행, 열의 합 중 가장 큰 합을 할당
    answer = Math.max(answer, row, column);
  }
  row = 0;
  column = 0;
  // 대각선의 합
  for (let i = 0; i < arr.length; i++) {
    row += arr[i][i];
    column += arr[i][arr.length - i - 1];
  }
  answer = Math.max(answer, row, column);
  return answer;
}

const arr = [
  [10, 13, 10, 12, 15],
  [12, 39, 30, 23, 11],
  [11, 25, 50, 53, 15],
  [19, 27, 29, 37, 27],
  [19, 13, 30, 13, 19],
];
console.log(solution(arr));
