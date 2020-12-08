# SassScript

SassScript는 CSS에서는 불가능한 연산, 변수, 함수 등의 확장 기능을 의미한다.

## 데이터 타입

SassScript는 7가지의 데이터 타입을 제공한다.
- 숫자형 : 1.2, 13, 10px ...
- 문자열 : 따옴표를 사용하는 경우("Lucida Grande")와 사용하지 않는 경우(bold, sans-serif)가 있다
- 컬러 : blue, #04a3f9, rgba(255, 0, 0, 0.5)
- boolean : true, false
- null
- list : 배열과 유사하게 콤마로 구분된 값의 list
- map : key1:value1, key2:value2 -> 객체와 유사한 방식

## 변수

Sass에서는 변수를 사용할 수 있다. 변수명은 $로 시작한다.
```SCSS
$font_size: 16px;

body{
  font-size: $font_size;
}
```

Sass에서의 변수도 Scope(유효범위)가 존재한다. 지역변수의 유효범위는 자신이 속한 코드 블록과 하위 코드 블록이다.

코드 블록 내에서 선언한 변수를 전역 변수로 지정하는 방법(!global 키워드 사용)도 존재한다.
```SCSS
#main {
  $color: #333 !global;
  width: $width;
}
```

## 연산자

Sass에서는 +, -, *, /, %, ==, != 연산자를 사용할 수 있다.

### 숫자 연산자

서로 다른 단위를 갖는 값을 연산하면 연산자의 왼쪽 값을 기준으로 단위가 설정된다.

상대값을 갖는 단위의 연산은 동일한 단위를 갖는 값과의 연산만이 유효하다.
```SCSS
$width: 100px;

#foo {
  width: $width + 10; // 110px
}

#bar {
  width: $width + 10in; // 1060px 
}

#baz {
  width: 10in + $width; // 11.0416666667in
}
```

CSS에서의 /는 나눗셈의 의미가 아니라 값을 구분하는 의미를 갖는다.

따라서 Sass의 /연산자를 사용하기 위해서는 몇가지 조건이 필요하다.
- 변수에 대해 사용
- 괄호 내에서 사용
- 다른 연산의 일부로서 사용
```SCSS
$width: 1000px;

p {
  width: $width / 2; // 변수에 대해 사용 -> width: 500px

  height: (500px / 2); // 괄호 내에서 사용 -> height: 250px;

  margin-left: 5px + 8px / 2px; // 다른 연산의 일부로서 사용 -> margin-left: 9px
}
```

변수를 CSS의 /와 함께 사용하고자 하는 경우 #{}를 사용한다.
```SCSS
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

### 문자열 연산자

+연산자는 자바스크립와 같이 문자열을 연결할 수 있다.
```SCSS
p {
  cursor: e + -resize; // e-resize
}
```

## Ampersand(&)

&는 부모요소를 참조하는 셀렉터(선택자)이다.
```SCSS
a {
  color: #ccc;

  &.home {
    color: #f0f;
  }

  &:hover {
    text-decoration: none;
  }

  > span {
    color: blue;
  }
}
```
위 Sass의 트랜스파일링 결과는 아래와 같다.
```SCSS
a {
  color: #ccc
}

a.home {
  color: #f0f;
}

a:hover{
  text-decoration: none;
}

a > span {
  color: blue;
}
```

## !default

!default flag는 할당되지 않은 변수의 초기값을 설정한다.
```SCSS
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
  content: $content; // "First content"
  new-content: $new_content; // "First time reference"
}
```





