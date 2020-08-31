## for 문을 이용해 다음 실행화면처럼 출력하시오
```js
*****
****
***
**
*
```

```js
for (x = 0; x < 5; x++) {
  var z = '';
  for (y = 5; y > x; y--) {
    z = z + '*';
  }
  console.log(z);
}
```