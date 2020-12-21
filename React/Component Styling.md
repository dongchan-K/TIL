# Component Styling

**리액트는 스타일이 스코핑되지 않는다는 단점을 갖는다.** 때문에 아래와 같은 문제를 야기할 수 있다.

- 클래스의 중복
- 네임스페이스의 오염

리액트에서 컴포넌트를 스타일링할 때는 다양한 방식을 사용할 수 있다.

자주 사용하는 스타일링 방식을 알아보자.

## Style Loaders

[Webpack](https://webpack.js.org/)은 import 구문을 만나면 나누어진 모듈들을 묶어(번들링 하여) 파일 확장자에 맞는 loader에게 위임한다.

![loader](https://user-images.githubusercontent.com/67866773/102732875-25dbc700-437f-11eb-9e9d-ef515cb75f0c.PNG)

[CRA(Create React App)](https://github.com/dongchan-K/TIL/blob/master/React/React%20Basic.md#create-react-appcra)를 이용하여 리액트 프로젝트 생성 시, 기본적으로 css, sass, module loader가 내장 되어있다.

CRA에서 지원하지 않는 확장자를 변경하고 싶거나, 수동으로 설정을 변경하고 싶을 때는 eject 명령어를 사용하여 CRA 내장 되어있는 모든 파일을 꺼내 변경할 수 있다.

`npm run eject`

-> eject 시 CRA로 돌아갈 수 없다. 즉, CRA의 새로운 기능을 사용할 수 없게 되며 설정에 대한 지원을 받을 수 없으므로 주의하자.

- css loader 설정

![eject](https://user-images.githubusercontent.com/67866773/102733752-6ccabc00-4381-11eb-9aa6-1f5850a94668.PNG)

`import './App.css';`

- css module loader 설정

![cssMoudle](https://user-images.githubusercontent.com/67866773/102734035-27f35500-4382-11eb-8da9-b9e2abd55485.PNG)

`import styles from './App.module.css';`

- sass loader 설정

![sass](https://user-images.githubusercontent.com/67866773/102734037-288beb80-4382-11eb-955b-83d1f7929ed8.PNG)

```
import './App.scss';
import './App.sass';
```

- sass module loader 설정

![sass module](https://user-images.githubusercontent.com/67866773/102734039-29248200-4382-11eb-8155-28162e46f1d0.PNG)

```
import styles from './App.module.scss';
import styles from './App.module.sass';
```

## CSS, SASS

두 방법을 나누는 기준은 아래와 같다.

- 특별한 규칙을 따르겠다 : CSS
- 구조화된 클래스 관리를 하겠다 : SCSS

### CSS

CSS를 작성할 때 가장 중요한 점은 클래스를 중복되지 않게 만드는 것이다.

- 클래스 이름을 지을 때 특별한 규칙(네이밍 컨벤션)을 사용한다
- CSS Selector를 활용한다

#### 네이밍 컨벤션

네이밍 컨벤션 방법론 중 하나로 [BEM](http://getbem.com/naming/) 이 있다.

BEM은 이름을 지을 때 일종의 규칙을 준수하여 해당 클래스가 어디에서 어떤 용도로 사용되는지 명확하게 작성하는 방식이다.

- 아래는 BEM 네이밍 예시

![BEM html](https://user-images.githubusercontent.com/67866773/102735211-2aa37980-4385-11eb-8c36-de922dbfb665.PNG)

![BEM CSS](https://user-images.githubusercontent.com/67866773/102735213-2b3c1000-4385-11eb-83f7-6092cc78e3b3.PNG)

#### CSS Selector

CSS Selector를 사용하면 CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있다.

- 아래는 CSS Selector 예시

![CSS Selector html](https://user-images.githubusercontent.com/67866773/102735411-c59c5380-4385-11eb-952d-f7ec4b23f430.PNG)

![CSS Selector css](https://user-images.githubusercontent.com/67866773/102735412-c634ea00-4385-11eb-994a-af802a9fa16f.PNG)

### SASS

[SASS](https://github.com/dongchan-K/TIL/blob/master/CSS/Sass%20Basic.md)는 CSS pre-processor(전처리기)로서 CSS의 한계와 단점을 보완하여 보다 가독성이 높고 코드의 재사용에 유리한 CSS를 생성하기 위한 CSS의 확장이다.

SASS 에는 SCSS 표기법, SASS 표기법이 있지만 좀 더 CSS와 유사한 SCSS 사용법을 사용하자. -> 확장자를 .scss로 사용

SASS를 CSS로 컴파일 해주는 [node-sass](https://www.npmjs.com/package/node-sass) 라이브러리를 설치하자.

`npm install node-sass@4.14.1`

- 아래는 scss 예시

![scss html](https://user-images.githubusercontent.com/67866773/102738319-15324d80-438d-11eb-8f07-e15e22076625.PNG)

![scss css](https://user-images.githubusercontent.com/67866773/102738321-15cae400-438d-11eb-8874-1f253eea26ea.PNG)
