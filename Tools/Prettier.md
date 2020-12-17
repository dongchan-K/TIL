# Prettier

### Prettier 란?

Prettier는 VSCode extension 으로 정해진 규칙에 따라 코드를 정리해 주는 Code Formatter 중 하나이다.

가독성을 높이고 코드 스타일을 통일하기 위해 사용한다.

Prettier 공식 페이지 : https://prettier.io/

### Prettier 설치

VSCode 마켓 플레이스에서 [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)를 설치한다. 이때 Prettier가 자동 설치되므로 따로 Prettier를 설치할 필요는 없다.

또는 `npm i prettier -D` 명령어를 통해 설치할 수도 있다.

### .prettierrc

프로젝트 루트 경로에 .prettierrc 파일을 생성하고 필요에 따라 룰셋을 변경할 수 있다.

아래와 같이 룰셋을 설정하자.

```
{
  "printWidth": 80,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "semi": true,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

🎯 출처 : https://poiemaweb.com/eslint#6-eslint--prettier
