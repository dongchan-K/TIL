## HTML Markup
### 마크업 언어 : 태그 등을 이용하여 문서나 데이터의 구조를 명기하는 언어의 한 가지

</br>

## HTML5 
- ### 콘텐츠 모델 : HTML5 에서는 명확한 정보 구조 설계 및 구성을 위해 카테고리를 정의하여 각 요소별로 비슷한 성격을 가지고 있는 것끼리 그룹화 함, 어떤 요소에 어떤 요소를 포함할 수 있는지 정의됨
  - #### HTML5 카테고리 : Flow Content,Sectioning Content, Metadata Content,Heading Content,Pharsing Content,Embeded Content,Interactive Content 등의 그룹이 있다 
  ![](https://media.prod.mdn.mozit.cloud/attachments/2012/07/09/3704/07b3e5bb546840a09bb35d45b36009a6/Content_categories_venn.png "HTML5 콘텐츠 모델 카테고리 간의 관계")
- ### 아웃라인 알고리즘 : HTML5 에서는 정보 구조를 명확히 할 수 있도록 함, 웹 페이지의 정보 구조를 판별할 수 있는 개념이며 책의 목차와 비슷하다 
  - #### `<body>` 요소 안에 배치된 콘텐츠는 모두 적어도 하나의 섹션 안에 포함되어 자리하며, 섹션은 서로 중첩될 수 있다
  - #### 명시적으로 정의되는 섹션은 `<body>`,`<header>`,`<section>`,`<article>`,`<aside>`,`<footer>` 태그들 안에 포함된 콘텐츠임
  ```
  <section>
    <h1>HTML</h1>
    <section>
      <h1>HTML이란?</h1>
      <p>HTML은 마크업 언어이다.</p>
    </section>
    <section>
      <h1>HTML의 유래</h1>
      <p>가장 최근 버전은 HTML5이다.</p>  
    </section>
    <aside>
      <p>광고 구역</p> 
    </aside>  
  </section>
  ```
  - #### 위에 있는 코드의 구조는 다음과 같은 구조를 가지게 된다
  ```
  1. HTML
    1.1 HTML이란?
    1.2 HTML의 유래
    1.3 광고구역
  ```
</br>

## HTML 네이밍
- ### 표기법 종류
  - #### PascalCase 표기법 : Ex) MainContent
  - #### CamelCase 표기법 : Ex) mainContent
  - #### KebabCase 표기법 : Ex) main-content
  - #### SnakeCase 표기법 : Ex) main_content