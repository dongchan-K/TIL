function solution(arr) {
  let answer = 1;
  let frontNum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > frontNum) {
      frontNum = arr[i];
      answer++;
    }
  }
  return answer;
}

const arr = [130, 135, 148, 140, 145, 150, 150, 153];
console.log(solution(arr));
