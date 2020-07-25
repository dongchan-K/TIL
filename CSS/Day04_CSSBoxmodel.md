## CSS Boxmodel

- ### 문서의 레이아웃을 계산할 때, 브라우저의 렌더링 엔진은 표준 CSS 기본 박스 모델에 따라 각각의 요소를 사각형 박스로 표현한다

</br>

- ### CSS는 박스의 크기,위치,속성(색,배경,테두리 등)을 결정한다

</br>

- ### Box-sizing
  - ### Content-box
    - #### width : 콘텐츠의 width값+padding값+border값 (콘텐츠의 너비에 padding,border값이 더해지는 개념)
    - #### height : 콘텐츠의 height값+padding값+border값 (콘텐츠의 높이에 padding,border값이 더해지는 개념)
    - #### button 제외한 나머지는 전부 content-box가 default 값이다
  - ### Border-box 
    - #### width : 콘텐츠의 width값에 padding과 border값이 포함되어 계산되는 개념
    - #### height : 콘텐츠의 height값에 padding과 border값이 포함되어 계산되는 개념
  
  </br>

- ### 마진 중복(병합,Collapse) : 마진의 특정 값들이 '중복'되어 합쳐지는 현상
  - #### 형제 요소들의 `margin-top`과 `margin-bottm`이 만났을 때
  - #### 부모 요소의 `margin-top`과 자식 요소의 `margin-top`이 만났을 때
  - #### 부모 요소의 `margin-bottom`과 자식 요소의 `margin-bottom`이 만났을 때 
- ### 마진 중복 계산법
  - #### 둘 다 양수일 경우 : Ex) A요소 마진 30px, B요소 마진 10px -> 중복 값 30px로 계산된다
  - #### 둘 다 음수일 경우 : Ex) A요소 마진 -30px, B요소 마진 -10px -> 중복 값 -30px로 계산된다
  - #### 각각 양수와 음수일 경우 : Ex) A요소 마진 -30px, B요소 마진 10px -> 중복 값 -20px로 계산된다