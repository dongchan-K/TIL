# CSS 배치

</br>

## Float
- ### Float 속성은 요소가 nomal flow에서 벗어나 개별적으로 띄어짐을 의미한다
- ### Float된 요소는 블록 레이아웃을 가진다
- ### Float된 요소는 width,height 값을 따로 지정하지 않으면 콘텐츠 영역만큼의 크기를 가진다
- ### Float된 요소는 개별적으로 띄워져있기 때문에 Float된 요소의 부모 요소는 Float된 요소의 height값을 잃어버리고 Float된 요소를 감싸지 않게 된다 해당 문제는 아래와 같은 방법으로 해결 가능하다
  - #### 부모 요소에 ::after(가상요소 선택자)를 사용하고 아래와 같은 속성값을 부여해 Float을 해제하여 자식 요소의 height를 되찾게 해준다
  ```
  content: "";
  display: block;
  clear: both;
  ```
  - #### 부모 요소에 `overflow: hidden;` 속성값을 부여한다
  - #### clear 속성은 박스 요소에만 줄 수 있다
  - #### ::after(가상요소 선택자)로 만든 값은 JS에서 컨트롤 불가함을 기억하자

</br>

## Flex
- ### Flex는 레이아웃에 적합한 1차원 정렬 방식이다
- ### Flex는 Container와 Items의 2개의 개념으로 나뉜다
- ### 정렬할 요소들의 부모 요소에 `display: flex;` 적용시 부모 요소는 Flex Container, 정렬할 요소들은 Flex Items가 된다
- ### Container에 사용가능한 속성
  - #### `display` : Flex Container를 정의
  - #### `flex-flow`(단축속성) : Flex Items의 주 축(flex- direction), 줄 바꿈(flex-wrap)을 설정
  - #### `justify-content` : 주 축의 정렬 방식을 선택
  - #### `aling-items` : 교차 축의 정렬 방식을 선택(Items가 1줄일 경우)
  - #### `align-content` : 교차 축의 정렬 방식을 선택(Items가 2줄 이상일 경우)
- ### Items에서 사용 가능한 속성
  - #### `order` : Flex Items의 순서를 설정
  - #### `flex`(단축속성) : Flex Item의 증가 너비 비율(flex-grow), 감소 너비 비율(flex-shrink), 기본 너비 설정(flex-basis)
  - #### `align-self` : 교차 축에서 Items가 아닌 Item(개별)의 정렬 방법을 설정(align-items 속성보다 우선한다)

  </br>

## Position
- ### static(default값),absolute,fixed,sticky,relative 속성을 지닌다
  - #### absolute는 상위 요소의 position에 영향을 받는데, 상위 요소의 position 속성값이 static 이라면 계속 상위 요소로 올라간다
  - #### absolute,fixed 속성은 nomal flow에서 벗어나 개별 layer가 된다
  - #### top,right,bottom,left,z-index 속성은 position 속성값이 static 일때는 사용 불가하다
- ### position 속성값이 absolute,fixed,relative,sticky 일때는 블록 레이아웃을 지닌다
- ### `position: absolute;` 는 변동될 일이 없는 콘텐츠에 최소한으로 사용할 것!


  

