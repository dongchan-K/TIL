# 타입 변환과 단축 평가

## 타입 변환

- **개발자가 의도적으로** 값의 타입을 변환하는 것을 **명시적 타입 변환(explicit coercion)** 또는 **타입 캐스팅(type casting)** 이라 한다
- **자바스크립트 엔진**에 의해 타입이 자동 변환되는 것을 **암묵적 타입 변환(implicit coercion)** 또는 **타입 강제 변환(type coercion)** 이라 한다
- 주의할 점은 타입 변환이 원시값의 타입을 직접 변환하는 것은 아니다. **원시값은 변경 불가능한 값이므로 변경할 수 없기 때문에 타입 변환은 기존 원시값을 이용해 다른 타입의 새로운 원시값을 생성하는 것이다**

## 암묵적 타입 변환

### 1. 문자열 타입 변환

**예시**

```js
1 + "2"; // '12'
0 + ""; // '0'
true + ""; // 'true'
```

### 2. 숫자 타입 변환

**예시**

```js
1 * "10"; // 10
"1" >
  0 + // true
    "1" + // 1
    false; // 0
```

### 3. 불리언 타입 변환

- **자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy 값 또는 Falsy 값으로 구분한다**
- **Falsy 값 : false, undefined, null, 0, -0, NaN, ''(빈 문자열)**

**예시**

```js
// 아래 코드 블록은 모두 실행되지 않는다
if (false) {
  console.log("true");
}
if ("") {
  console.log("true");
}
if (0) {
  console.log("true");
}
```

## 명시적 타입 변환

### 1. 문자열 타입 변환

**예시**

```js
String(1); // '1' String 생성자 함수 사용
(1).toString(); // '1' Object.property.toString 메서드 사용
1 + ""; // '1' 문자열 연결 연산자 사용
```

### 2. 숫자 타입 변환

**예시**

```js
Number("1"); // 1 Number 생성자 함수 사용
parseInt("1");
parseFloat("1"); // 1 parseInt,parseFloat 함수 사용(문자열만 변환 가능)
+"1"; // 1 +단항 산술 연산자 사용
"1" * 1; // 1 *산술 연산자 사용
```

### 3. 불리언 타입 변환

**예시**

```js
Boolean(1); // true Boolean 생성자 함수 사용
!!1; // true !부정 논리 연산자 두번 사용
```

## 단축 평가

### 1. 논리 연산자 단축 평가

- 논리합 `||`, 논리곱 `&&` 연산자는 표현식의 평가 결과는 항상 불리언 값이 아니라 2개의 피연산자 중 어느 한쪽으로 평가되는 것이다
- **논리 연산자는 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환하는 것을 단축 평가(short-circuit evalutation)이라 한다. 단축 평가는 표현식을 평가하는 도중 평가 결과가 확정될 경우 나머지 평가 과정을 생략한다**

**예시**

```js
"1" && "2"; // '2'
false && "2"; //false
"1" && false; // false

"1" || "2"; // '1'
false || "2"; // '2'
"1" || false; // '1'
```

### 2. 옵셔널 체이닝 연산자

- ES11에서 도입된 옵셔널 체이닝 연산자 `?.` 는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고 그렇지 않은 경우 우항의 프로퍼티 참조를 이어간다

```js
var elem = null;
// elem이 null 이기 때문에 undefined를 반환
var value = elem?.value;
console.log(value); // undefined

var str = "";
// 좌항의 피연산자 str이 null 또는 undefined가 아니기 때문에 우항의 프로퍼티를 참조
var length = str?.length;
console.log(length); // 0
```

### 3. null 병합 연산자

- ES11에서 도입된 null 병합 연산자 `??`는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고 그렇지 않으면 좌항의 피연산자를 반환한다

```js
var foo = null ?? "default string";
console.log(foo); // 'defalut string';
```

## 요약

- 자바스크립트 엔진의 암묵적 타입 변환을 이해하고 예측할 것
- 논리 연산자는 결과 값으로 모든 값을 만들어 낼 수 있다
- 조건문은 일반 흐름을 깨기 때문에 단축평가, 삼항조건연산자를 자주 사용한다
- 옵셔널 체이닝 연산자와 null 병합 연산자는 좌항의 피연산자가 Falsy 값이더라도 null 또는 undefined가 아니면 동작을 수행한다

출처 : https://poiemaweb.com/
