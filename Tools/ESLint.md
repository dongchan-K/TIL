# ESLint

### ESLint 란?

ESLint는 코딩 스타일 가이드를 따르지 않거나 문제가 있는 코드나 안티 패턴을 찾기 위해 사용하는 Javascript Linter이다.

ESLint는 처음부터 유용하게 사용할 수 있는 스타일 가이드(built-in rule)을 제공하지만 개발자가 자신의 스타일 가이드를 작성할 수도 있다.

### ESLint 설치

eslint를 전역으로 설치하는 것은 공유 설정과 플러그인을 로컬 설치해 주어야 하기 때문에 권장하지 않는다.

```
npm init -y

npm install eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-html --save-dev
```

위 명령어로 설치하게 되면 eslint와 Airbnb style guide와 필요 플러그인을 로컬 설치한다.

```
npm init -y

npm install eslint -D
```

위 명령어를 통해 .eslintrc.json을 셋업할 수도 있다.

`npx eslint --init`

위 명령어를 통해 최신 버전의 eslint를 사용할 수 있다.

### ESLint VSCode extension 설치

[VSCode ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)을 설치한다.

setting.json에 아래 설정을 추가한다.

```
"eslint.validate": ["html", "javascript"]
```

### .eslintrc.json

프로젝트 루트 경로에 .eslintrc.json 파일을 생성하고 필요에 따라 룰셋을 변경할 수 있다.

아래와 같이 룰셋을 변경하자.

```
{
  "parserOptions": {
    "ecmaVersion": 11
  },
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "_": false
  },
  "extends": "airbnb-base",
  "plugins": ["import", "html"],
  "rules": {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    // "no-var": 0,
    "no-console": 0,
    "no-plusplus": 0,
    "no-shadow": 0,
    "vars-on-top": 0,
    "no-underscore-dangle": 0, // var _foo;
    "comma-dangle": 0,
    "func-names": 0, // setTimeout(function () {}, 0);
    "prefer-arrow-callback": 0, // setTimeout(function () {}, 0);
    "prefer-template": 0,
    "no-nested-ternary": 0,
    "max-classes-per-file": 0,
    "arrow-parens": ["error", "as-needed"], // a => {}
    "no-restricted-syntax": [0, "ForOfStatement"],
    "no-param-reassign": ["error", { "props": false }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
  }
}
```

설정 -> Format On Save 옵션을 체크해주면 저장 시 eslint를 자동 적용한다.

![eslint](https://user-images.githubusercontent.com/67866773/102451035-13aa1200-407b-11eb-92b1-dd5788555cdd.PNG)

자세한 설정방법은 [VSCode ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)을 참고하자.

### ESLint와 Prettier 함께 사용하기

ESLint와 Prettier를 같이 사용하려면 아래 모듈을 추가로 로컬 설치해야 한다.

- eslint-config-prettier
  ESLint 설정 중에서 Prettier와 충돌하는 부분을 비활성한다.
- eslint-plugin-prettier
  Prettier를 ESLint 플러그인으로 추가한다. 이를 통해 Prettier에서 인식하는 에러를 ESLint 에러로 출력한다.

아래 명령어로 추가 모듈을 설치하자.

```
npm install eslint-plugin-prettier eslint-config-prettier --save-dev
```

.eslintrc.json 파일에서 해당 부분을 아래와 같이 수정한다.

```
{
  ...
  "extends": ["airbnb-base", "plugin:prettier/recommended"],
  "plugins": ["import", "html", "prettier"],
  ...
  "rules": {
    "prettier/prettier": "error",
    ...
  }
}
```

🎯 출처 : https://poiemaweb.com/eslint
