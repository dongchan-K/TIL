# 브라우저의 렌더링 과정

브라우저 환경을 고려할 때 효율적인 클라이언트 사이드 자바스크립트 프로그래밍이 가능하다.

이를 위해 브라우저가 HTML, CSS, 자바스크립트로 작성된 텍스트 문서를 어떻게 파싱(parsing, 해석)하여 브라우저에 렌더링하는지 살펴보자.

**파싱(parsing)** : 파싱은 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 읽어 들여 실행하기 위해 텍스트 문자열을 토큰(token, 문법적 의미를 가지며, 문법적으로 더이상 나눌 수 없는 콛의 기본 요소를 의미)으로 분해(어휘 분석, lexical analysis)하고, 토큰에 문법적 의미와 구조를 반영하여 트리 구조의 자료구조인 파스 트리(parse tree/syntax tree)를 생성하는 일련의 과정을 말한다. 일반적으로 파싱이 완료된 이후에는 파스 트리를 기반으로 중간 언어인 [바이트코드](https://ko.wikipedia.org/wiki/%EB%B0%94%EC%9D%B4%ED%8A%B8%EC%BD%94%EB%93%9C)를 새엉하고 실행한다.

**렌더링(rendering)** : 렌더링은 HTML, CSS, 자바스크립트로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것을 말한다.

다음 그림은 브라우저의 렌더링 과정(critical rendering path)을 간략하게 표현한 것이다.

### 브라우저의 렌더링 수행 과정

1. 브라우저는 HTML, CSS, 자바스크립트, 이미지, 폰트 파일 등 렌더링에 필요한 리소스를 요청하고 서버로부터 응답받는다.
2. 브라우저의 렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 DOM과 CSSOM을 생성하고 이들을 결합하여 렌더 트리를 생성한다.
3. 브라우저의 자바스크립트 엔진은 서버로부터 응답된 자바스크립트를 파싱하여 AST(Abstract Syntax Tree)를 생성하고 바이트코드로 변환하여 실행한다. 이때 자바스크립트는 DOM API를 통해 DOM이나 CSSOM을 변경할 수 있다. 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합된다.
4. 렌더 트리를 기반으로 HTM 요소의 레이아웃(위치와 크기)을 계산하고 브라우저의 화면에 HTML 요소를 페인팅한다.

## 1. 요청과 응답

브라우저의 핵심 기능은 필요한 리소스를 서버에 요청(request)하고 서버로부터 응답(response)받아 브라우저에 시각적으로 렌더링하는 것이다. 즉, 렌더링에 필요한 리소스는 모두 서버에 존재하므로 필요한 리소스를 서버에 요청하고 서버가 응답한 리소스를 파싱하여 렌더링하는 것이다.

서버에 요청을 전송하기 위해 브라우저의 주소창에 URL을 입력하고 엔터키를 누르면 URL의 [호스트 이름](https://ko.wikipedia.org/wiki/%ED%98%B8%EC%8A%A4%ED%8A%B8%EB%AA%85)이 [DNS](https://ko.wikipedia.org/wiki/%EB%8F%84%EB%A9%94%EC%9D%B8_%EB%84%A4%EC%9E%84_%EC%8B%9C%EC%8A%A4%ED%85%9C)를 통해 IP 주소로 변환되고 이 IP 주소를 갖는 서버에게 요청을 전송한다.

일반적으로 서버는 루트 요청에 대해 암묵적으로 index.html을 응답하도록 설정되어 있다.

만약 index.html이 아닌 다른 정적 파일을 서버에 요청하려면 브라우저의 주소창에 요청할 정적 파일의 경로(서버의 루트 폴더 기준)와 파일 이름을 URI의 호스트 뒤의 패스(path)에 기술하여 서버에 요청한다.

브라우저의 렌더링 엔진은 HTML(index.html)을 파싱하는 도중에 외부 리소스를 로드하는 태그, 즉 CSS 파일을 로드하는 link 태그, 이미지 파일을 로드하는 img 태그, 자바스크립트를 로드하는 script 태그 등을 만나면 HTML의 파싱을 일시 중단하고 해당 리소스 파일을 서버에 요청한다.

## 2. HTTP 1.1과 HTTP 2.0

[HTTP(HyperText Transfer Protocol)](https://ko.wikipedia.org/wiki/HTTP)는 웹에서 브라우저와 서버가 통신을 하기 위한 프로토콜(규약)이다.

HTTP/1.1은 기본적으로 커넥션(connection)당 하나의 요청과 응답만 처리한다. 즉, 여러 개의 요청을 한 번에 전송할 수 없고 응답 또한 마찬가지다.

HTTP/1.1은 리소스의 동시 전송이 불가능한 구조이므로 요청할 리소스의 개수에 비례해 응답 시간도 증가하는 단점이 있다.

HTTP/2는 커넥션당 여러 개의 요청과 응답, 즉 다중 요청/응답이 가능하다. HTTP/2.0은 여러 리소스의 동시 전송이 가능하므로 HTTP/1.1에 비해 페이지 로드 속도가 빠르다.

🎯 HTTP2 참고자료 : https://developers.google.com/web/fundamentals/performance/http2/?hl=ko

## 3. HTML 파싱과 DOM 생성

브라우저의 요청에 의해 서버가 응답한 HTML 문서는 문자열로 이루어진 순수한 텍스트다. 순수한 텍스트인 HTML 문서를 브라우저에 시각적인 픽셀로 렌더링하려면 HTML 문서를 브라우저가 이해할 수 있는 자료구조(객체)로 변환하여 메모리에 저장해야 한다.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

브라우저의 렌더링 엔진은 위와 같은 HTML 코드를 파싱하여 브라우저가 이해할 수 있는 자료구조인 **DOM(Document Object Model)** 을 생성한다.

### 브라우저의 DOM 생성 과정

1. 서버에 존재하던 HTML 파일이 브라우저의 요청에 의해 응답된다. 이때 서버는 브라우저가 요청한 HTML 파일을 읽어 들여 메모리에 저장한 다음 메모리에 저장된 바이트(2진수)를 인터넷을 경유하여 응답한다.
2. 브라우저는 서버가 응답한 HTML 문서를 바이트(2진수) 형태로 응답받는다. 그리고 바이트 형태의 HTML 문서는 meta 태그의 charset 어트리뷰트에 의해 지정된 인코딩 방식을 기준으로 문자열로 변환된다.
   [응답 헤더(response header)](https://developer.mozilla.org/ko/docs/Glossary/Response_header)에 담겨 응답된다. 브라우저는 이를 확인하고 문자열로 변환한다.
3. 문자열로 변환된 HTML 문서를 읽어 들여 **토큰(token)** 들로 분해한다.
4. 각 토큰들을 객체로 변환하여 **노드(node)** 들을 생성한다. 토큰의 내용에 따라 문서 노드, 요소 노드, 어트리뷰트 노드, 텍스트 노드가 생성된다. 노드는 DOM을 구성하는 기본 요소가 된다.
5. HTML 문서는 HTML 요소들의 집합으로 이루어지며 **HTML 요소는 중첩 관계를 갖는다.** 즉, HTML 요소의 콘텐츠 영역에는 텍스트 뿐만 아니라 다른 HTML 요소도 포함될 수 있다. 이때 HTML 요소 간에는 중첩 관계에 의해 부자 관계가 형성된다. 이러한 HTML 요소 간의 부자 관계를 반영하여 모든 노드들을 **트리 자료구조** 로 구상한다. 이를 **DOM(Document Object Model)** 이라 부른다.

**즉, DOM은 HTML 문서를 파싱한 결과물이다.**

## 4. CSS 파싱과 CSSOM 생성

렌더링 엔진은 HTML을 처음부터 한 줄씩 순차적으로 파싱하여 DOM을 생성한다. 도중 CSS를 로드하는 link 태그나 style 태그를 만나면 DOM 생성을 일시 중단한다.

그 다음 CSS 파일을 서버에 요청하여 로드한 CSS 파일을 HTML과 동일한 파싱 과정(바이트 -> 문자 -> 토큰 -> 노드 -> CSSOM)을 거치며 해석하여 CSSOM(CSS Object Model)을 생성한다.

이후 CSS 파싱을 완료하면 HTML 파싱이 중단된 지점부터 다시 HTML 파싱을 시작한다.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
...
```

```CSS
body {
  font-size: 18px;
}

ul {
  list-style-type: none;
}
```

## 5. 렌더 트리 생성

렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 각각 DOM과 CSSOM을 생성한다. 그리고 DOM과 CSSOM은 렌더링을 위해 **렌더 트리(render tree)** 로 결합된다.

렌더 트리는 렌더링을 위한 트리 구조의 자료구조다. 따라서 브라우저 화면에 렌더링되지 않는 노드(예: meta 태그, script 태그 등)와 CSS에 의해 비표시(예: display: none)되는 노드들은 포함하지 않는다.

이후 완성된 렌더 트리는 각 HTML 요소의 레이아웃(위치와 크기)을 계산하는 데 사용되며 브라우저 화면에 픽세를 렌더링하는 페인팅(painting)처리에 입력된다.

브라우저의 렌더링 과정은 다음과 같은 경우 반복해서 실행될 수 있다.

- 자바스크립트에 의한 노드 추가 또는 삭제
- 브라우저 창의 리사이징에 의한 뷰포트(viewport) 크기 변경
- HTML 요소의 레이아웃(위치, 크기)에 변경을 발생시키는 width/height, margin, padding, border, display, position, top/right/bottom/left 등의 스타일 변경

리렌더링은 성능에 악영향을 주는 작업이기 때문에 가급적 리렌더링이 빈번하게 발생하지 않도록 주의해야 한다.

## 6. 자바스크립트 파싱과 실행

HTML 문서를 파싱한 결과물인 DOM은 DOM API를 제곤한다. 즉, 자바스크립트 코드에서 DOM API를 사용하면 이미 생성된 DOM을 동적으로 조작할 수 있다.

CSS와 마찬가지로 렌더링 엔진은 script 태그를 만나면 DOM 생성을 일시 중단한다.

그리고 자바스크립트 코드를 파싱하기 위해 자바스크립트 엔진에 제어권을 넘긴다.

자바스크립트 파싱과 실행이 종료되면 다시 렌더링 엔진으로 제어권을 넘겨 HTML 파싱이 중단된 지점부터 파싱을 시작한다.

자바스크립트 파싱과 실행은 자바스크립트 엔진이 처리한다. 자바스크립트 엔진은 자바스크립트 코드를 파싱하여 CPU가 이해할 수 있는 저수준 언어(low-level language)로 변환하고 실행하는 역할을 한다.

자바스크립트 엔진은 구글 크롬과 Node.js의 V8, 파이어폭스의 SpiderMonkey 등 다양한 종류가 있으며, 모든 자바스크립트 엔진은 ECMAScript 사양을 준수한다.

자바스크립트 엔진은 자바스크립트를 해석하여 **AST(Abstract Syntax Tree, 추상적 구문 트리)** 를 생성한다. 그리고 AST를 기반으로 인터프리터가 실행할 수 있는 중간 코드(intermediate code)인 바이트코드를 생성하여 실행한다.

- 토크나이징(tokenizing) <br />
  단순한 문자열인 자바스크립트 소스코드를 어휘 분석하여 토큰들로 분해한다.
- 파싱(parsing) <br />
  토큰들의 집합을 구문 분석하여 **AST(추상적 구문 트리)** 를 생성한다. AST는 토큰에 문법적 의미와 구조를 반영한 트리 구조의 자료구조다.

- 바이트코드 생성과 실행 <br />
  AST는 인터프리터가 실행할 수 있는 중간 코드인 바이트코드로 변환되고 인터프리터에 의해 실행된다.

## 7. 리플로우와 리페인트

자바스크립트에서 DOM API가 사용된 경우 DOM이나 CSSOM이 변경된다. 이때 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합되고 변경된 렌더 트리를 기반으로 레이아웃과 페인트 과정을 거쳐 브라우저에 다시 렌더링한다. 이를 리플로우(reflow), 리페인트(repaint)라 한다.

리플로우는 레이아웃 계산을 다시 하는 것을 말하며, 노드 추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징 등 레이아웃에 영향을 준ㄴ 변경이 발생한 경우에 한해 실행된다.

리페인트는 재결합된 렌더 트리를 기반으로 다시 페인트를 하는 것을 말한다.

레이아웃에 영향이 없는 변경은 리플로우 없이 리페인트만 실행된다.

## 8. 자바스크립트 파싱에 의한 HTML 파싱 중단

브라우저는 동기적으로 HTML, CSS, 자바스크립트를 파싱하고 실행한다. 이는 script 태그 위치에 따라 HTML 파싱이 블로킹되어 DOM 생성이 지연될 수 있다는 것을 의미한다.

자바스크립트에서 DOM이나 CSSOM을 변경하는 DOM API를 사용할 경우 DOM이나 CSSOM이 이미 생성되어 있어야 한다. 그렇지 않다면 문제가 발생할 수 있다.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <script>
      /*
      DOM API인 document.getElementById는 DOM에서 id가 'apple'인 HTML 요소를
      취득한다. 아래 DOM API가 실행되는 시점에는 아직 id가 'apple'인 HTML 요소를 파싱하지
      않았기 때문에 DOM에는 id가 'apple'인 HTML 요소가 포함되어 있지 않다.
      따라서 아래 코드는 정상적으로 id가 'apple'인 HTML 요소를 취득하지 못한다.
      */
      const $apple = document.getElementById('apple');

      // id가 'apple'인 HTML 요소의 css color 프로퍼티 값을 변경한다.
      // 이때 DOM에는 id가 'apple'인 HTML 요소가 포함되어 있지 않기 때문에 에러가 발생한다.
      $apple.style.color = 'red'; // TypeError: Cannot read property 'style' of null
    </script>
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </body>
</html>
```

위와 같은 코드를 실행하면 DOM API인 `document.getElementById('appe')`을 실행하는 시점에는 아직 id가 'apple'인 HTML 요소를 파싱하지 않았기 때문에 정상적으로 동작하지 않는다.

## 9. script 태그의 async/defer 어트리뷰트

자바스크립트 파싱에 의한 DOM 생성이 중단(blocking)되는 문제를 해결하기 위해 script 태그에 async와 defer 어트리뷰트가 추가되었다.

async와 defer 어트리뷰트는 src 어트리뷰트를 통해 외부 자바스크립트 파일을 로드하는 경우에만 사용할 수 있다.

async와 defer 어트리뷰트를 사용하면 HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다. 하지만 자바스크립트의 실행 시점에 차이가 있다.

- async 어트리뷰트 <br />
  HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다. 단, 자바스크립트의 파싱과 실행은 자바스크립트 파일의 로드가 완료된 직후 진행되며, 이때 HTML 파싱이 중단된다.

여러 개의 script 태그에 async 어트리뷰트를 지정하면 script 태그의 순서와는 상관없이 로드가 완료된 자바스크립트부터 먼저 실행되므로 순서가 보장되지 않는다.

- defer 어트리뷰트 <br />
  HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다. 단, 자바스크립트의 파싱과 실행은 HTML 파싱이 완료된 직후, 즉 DOM 생성이 완료된 직후 진행된다.

출처 : https://poiemaweb.com/
