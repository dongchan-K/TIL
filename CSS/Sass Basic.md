# Sass Basic


## Why Sass? 

Sass(Syntactically Awesome StyleSheets)는 CSS pre-processor로서 프로젝트의 규모가 커지고 수정이 번번히 발생함에 따라 쉽게 지저분해지고 유지보수도 어려워지는 CSS의 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS 확장이다.

Sass는 다음과 같은 추가 기능과 유용한 도구들을 제공한다
- 변수의 사용
- 조건문과 반복문
- Import : 모듈과 유사하게 쪼개져 있는 개념을 불러온다
- Nesting : 중복 없이 HTML 구조 그대로(계층 구조 형태로) CSS를 만들 수 있다
- Mixin : 함수와 유사한 기능이다

Sass의 장점
- CSS보다 심플한 표기법으로 CSS를 구조화하여 표현할 수 있다
- 구문의 수준 차이를 평준화할 수 있다
- CSS에 존재하지 않는 기능을 활용하여 유지보수 편의성을 크게 증가시킨다

## Install

`npm install -g sass` 명령어를 사용해 Sass를 설치한다.

## Command

개별 파일 트랜스파일링 명령 : `sass foo.scss:foo.css` -> `sass <sass 파일 이름>:<생성될 파일 이름>`

폴더 트랜스파일링 명령 : `sass src/sass:dist/css` -> `sass <sass 파일 경로>:<생성될 파일 경로>`

폴더의 변경을 감지하여 트랜스파일링 하는 명령 : `sass --watch src/sass:dist/css` -> `sass --watch <sass파일 경로>:<생성될 파일 경로>`

트랜스파일링 시 빈 공간을 압축하는 명령 : `--style compressed` -> 배포 시 사용

## Sass 표기법

Sass에는 SCSS 표기법, SASS 표기버이 있지만 좀 더 CSS와 유사한 SCSS 표기법을 사용하자 -> 때문에 확장자를 .scss로 사용한다.

