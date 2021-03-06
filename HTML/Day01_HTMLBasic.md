# HTML 기초
</br>

## HTML 문서의 구조
```
<!DOCTYPE html>
<html>
  <head>
    문서의 정보
  </head>
  <body>
    문서의 구조
  </body>
</html>
```
###  HTML 문서는 위와 같은 큰 구조를 갖고있다
### `html` 태그는 HTML 문서의 전체 범위를 지정한다
### `!DOCTYPE html` 태그는 최신 HTML 문서 형식을 정의한다
- DTD(Document Type Declaration)를 통해서 현재의 웹 문서가 어떤 기술로 작성되었는지 웹브라우저에 전달한다 위와 같이 별도로 명시하지 않았을때는 최신 HTML 기술인 HTML5를 뜻함

</br>

## HTML 문서의 정보
### `<head></head>` 범위 안에서 사용하는 태그들은 HTML 문서의 정보를 갖고있다
### `<head></head>` 에 사용되는 태그
- #### `<title></title>` : 웹 페이지의 제목을 지정한다
  - 페이지를 대표하는 키워드를 간결하고 유니크하게 사용하는것을 권장
  - 페이지 안의 모든 요소들 중에서 검색 엔진의 알고리즘이 가장 크게 무게 중심을 두는 것이 타이틀 요소이기 때문에 SEO(검색엔진 최적화)와도 밀접하다
- #### `<meta/>` : 웹 페이지의 정보를 브라우저에 제공한다
  - `<meta charset="UTF-8" />` : 문자 인코딩 방식(UTF-8)을 설정 
  - `<meta name="viewport" />` : 검색엔진 등에 제공하기 위한 정보(뷰 포트)의 종류
- #### `<link/>` : 현재 문서와 외부 리소스를 연결 및 관계를 명시한다
  - `<link href="main.css" rel="stylesheet />` : href 속성은 스타일 시트의 경로를, rel 속성은 문서와의 관계(스타일 시트)를 나타낸다

</br>

## HTML은 기본적으로 선형화 구조(normal flow)를 지닌다
### 요소의 레이아웃을 변경하지 않을 시 웹 페이지 요소가 자기 자신을 배치하는 방법
</br>

## HTML 요소
### 1. 인라인 요소 : 기본적으로  컨텐츠가 끝나는 지점까지의 넓이를 가지는 형태
- #### 임의로 width,height 값을 줄 수 없다
- #### 위,아래 margin,padding 값을 줄 수 없다
- #### 인라인 요소를 포함할 수 있고 블록 요소는 포함할 수 없다
- #### 인라인 요소 다음에는 줄 바꿈이 없다
### 2. 블록 요소 : 기본적으로 가로폭 전체의 넓이를 가지는 형태
- #### width,height,margin,padding 값을 사용하여 형태를 변형할 수 있다
- #### 인라인,블록 요소를 모두 포함할 수 있다
- #### 블록 요소 다음에는 줄 바꿈이 이루어진다









  