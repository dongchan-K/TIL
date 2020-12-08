# Sass Extensions

## Nesting

**Nesting은 Sass의 유용한 확장 기능으로 선언을 중첩(nesting)하는 것이다.**

**nesting을 사용하면 후손 셀렉터를 간단히 기술하면서 HTML의 구조를 반영한 CSS를 기술할 수 있다.**
```SCSS
#navbar {
  width: 80%;
  height: 23px;

  ul {
    list-style-type: none;
  }

  li {
    float: left;
    a {
      font-weight: bold;
    }
  }
}
```

부모 요소의 참조가 필요한 경우 &을 사용한다.
```SCSS
.myAnchor {
  color: blue;

  // .myAnchor:hover
  &:hover {
    text-decoration: underline;
  }

  // .myAnchor:visited 
  &:visited {
    color: purple;
  }
}
```

nesting은 프로퍼티에도 사용할 수 있다.
```CSS
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

## @import

Sass는 @import directive를 사용하여 분리된 stylesheet 파일을 import할 수 있다. 기존 CSS의 @import보다 편리한 기능을 제공한다.

**여러 개의 파일로 분할하는 것 또는 분할된 파일을 partial이라 하며 partial된 Sass 파일명의 선두에는 underscore(_)를 붙인다.**

**partial된 Sass 파일명 선두에 붙인 _의 의미는 import는 수행하되 CSS로의 트랜스파일링은 수행하지 말라는 의미를 갖는다. 따라서 partial은 import시에는 CSS 파일로 트랜스파일링되지 않기 때문에 최종적으로 CSS로 트랜스파일링을 수행할 Sass 파일에서 import한다.**

![partial](https://user-images.githubusercontent.com/67866773/101459144-36517200-397b-11eb-825b-4ceb01909266.PNG)

```SCSS
// partial/_vars.scss
$width: 960px;

// partial/_header.scss
#header {
  width: $width;
}

// partial/_sidebar.scss
#sidebar {
  width: $width;
}

// partial/_footer.scss
#footer {
  width: $width;
}

// style.scss
@import 'partial/vars';
@import 'partial/header';
@import 'partial/sidebar';
@import 'partial/footer';
```

최신 버전에서는 @import 대신 @use를 사용하는 방법도 있다. [새로 추가된 Module System](https://blueshw.github.io/2019/10/27/scss-module-system/)

## Mixin

Mixin은 Sass의 유용한 기능으로 중복 기술을 방지하기 위해 사용 빈도가 높은 마크업을 사전에 정의하여 필요할 때 불러 사용하는 방법이다.

**사용법은 @mixin 선언하고 @include로 불러들인다.**
```SCSS
@mixin circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.box {
  @include circle;

  background: #f00;
}
```

위 코드의 트랜스파일링 결과는 아래와 같다.
```SCSS
.box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: $f00;
}
```

Mixin은 함수와 같이 매개 변수를 사용할 수 있다.
```SCSS
@mixin circle($size {
  width: $size;
  height: $size * 2;
  border-radius: 50%;
}

.box {
  @include circle(100px);

  background: #f00;
}
```

위 코드의 트랜스파일링 결과는 아래와 같다.
```SCSS
.box {
  width: 100px;
  height: 200px;
  border-radius: 50%;
  background: #f00;
}
```

## Comment

한줄 주석 //은 트랜스파일링 후 CSS에서 사라지고, 멀티 라인 주석 /* */은 CSS에 나타난다