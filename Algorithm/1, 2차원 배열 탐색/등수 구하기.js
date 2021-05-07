function solution(arr) {
  let answer = [];

  for (let i = 0; i < arr.length; i++) {
    let count = 1;
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        count++;
      }
    }
    answer.push(count);
  }

  return answer;
}

const arr = [87, 89, 92, 100, 76];
console.log(solution(arr));
