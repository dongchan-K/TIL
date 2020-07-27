## block,inline,inline-block 요소
- ### block 요소 : 기본적으로 가로폭 전체의 넓이를 가지는 형태
  - #### width,height,margin,padding을 사용하여 형태를 변형할 수 있다
  - #### 인라인/블록 요소를 모두 포함할 수 있다
  - #### 블록 요소 다음에는 줄 바꿈이 이루어진다
- ### inline 요소 : 기본적으로 컨텐츠가 끝나는 지점까지의 넓이를 가지는 형태
  - #### width,height를 사용하여 형태를 변형할 수 없다
  - #### top/bottom margin,padding 사용 불가
  - #### line-height 원하는대로 적용 불가(자체에 적용되지 않고 감싸고 있는 블록 요소의 크기에만 영향을 끼친다)
  - #### 인라인 요소를 포함할 수 있고 블록 요소는 포함할 수 없다
  - #### 인라인 요소 다음에는 줄 바꿈이 없다
- ### inline-block 요소 : 기본적으로 컨텐츠가 끝나는 지점까지의 넓이를 가지는 형태
  - #### width,height를 사용하여 형태를 변형할 수 있다
  - #### top/bottom margin,padding 사용 가능
  - #### line-height 적용 가능
  - #### inline-block 요소 끼리는 공백이 생기게 된다
    - 해당 inline-block을 div(블록요소)로 묶어 font-size: 0;을 적용하면 해결 가능
  - #### inline-block 끼리 높이가 안맞을시 상위 공백이 생긴다
    - vertical-align 속성 사용하여 해결 가능

</br>

## 폼 관련 요소

  - ### `<form>` : 정보를 제출하기 위한 양식 범위를 정의한다
    - #### `display: block;`  
    - #### 속성값
      - action(전송한 정보를 처리할 웹 페이지의 URL) -> URL
      - method(서버로 전송할 HTTP 방식) -> GET,POST
      - target(서버로 전송 후 응답받을 방식을 지정) -> _self,_blank
  - ### `<fieldset>` : 같은 목적의 양식을 그룹화 한다
    - #### `display:block;`
    - #### 속성값
      - form(`<fieldset>` 요소와 연결할 `<form>` 요소의 id) -> id값
    - #### Microsoft Edge와 Google Chrome에서는 `<fieldset>`에 flex와 grid를 사용할 수 없는 버그가 존재한다
      - `<filedset>`을 `<div role="group">`로 변경하여 해결 가능
  - ### `<legend>` : 부모 fieldset 요소의 콘텐츠의 설명을 나타낸다
    - #### `display:block;`
  - ### `<label>` : 사용자 인터페이스의 설명을 나타낸다
    - #### `display:inline;` 
    - #### 속성값
      - form(`<fieldset>` 요소와 연결할 `<form>` 요소의 id) -> id값
      - for(같은 문서내의 레이블 가능한 `<form>`관련 요소의 id) -> id값
    - #### `<input>`요소를`<label>` 요소와 연결하면 사용성,접근성이 높아진다
      - `<label>`을 `<input>`과 연결하려면 `<input>`에 id 속성값을 넣고 `<label>`에 id와 같은 값의 for 속성값을 넣어야 한다
      - 보조기기에서 `<input>`에서 `<label>`을 읽어서 입력해야 하는 텍스트가 무엇인지 쉽게 이해하게 해줌
      - 관련 `<label>`을 클릭해서 `<input>` 자체에 초점을 맞추거나 활성화 시킬수 있음
  - ### `<input />` : 사용자의 데이터를 받을 수 있는 대화형 컨트롤을 생성
    - #### `display:inline-block;`
    - #### 속성값
      - form(`<filedset>`요소와 연결할 `<form>`요소의 id) -> id값
      - name(양식의 이름)
      - type(입력받을 데이터의 종류) -> button,img,email,password 등
      - required : 서식을 보내기 전 form validation 역할을 한다
  - ### `<button>` : 클릭 가능한 버튼을 나타낸다
    - #### `display:inline-block;`
    - #### 속성값
      - form(`<form>`의 id 속성값)
      - type(버튼의 타입) -> button,reset,submit
    - #### type 속성이 필수는 아니지만, default값이 submit으로 설정되어 있기 때문에, type 속성을 명시하는 것이 좋다
    - #### `<button>` 요소는 agent style로 padding과 border를 지닌다
    - #### `<button>` 요소는 CSS line-height를 이용하여 크기 변경도 가능하다
    - #### `<button>` 요소의 콘텐츠는 기본적으로 가운데 정렬 된다

      

  