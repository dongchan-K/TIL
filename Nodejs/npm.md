# npm(node package manager)

npm은 자바스크립트 패키지 매니저이다.

- Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할
- 패키지 설치 및 관리를 위한 CLI 제공

## 자주 사용하는 npm 명령어

1. package.json 생성

```bash
npm init
# 옵션 전부 yes
npm init -y
```

2. 패키지 설치

```bash
# 로컬 설치
npm install <pakage-name>
# 전역 설치
npm install -g <package-name>
# 개발 설치
npm install --save-dev <package-name>
# package.json의 모든 패키지 설치
npm install
```

3. 패키지 제거

```bash
# 로컬/개발 패키지 제거
npm uninstall <package-name>
# 전역 패키지 제거
npm uninstall -g <package-name>
```

4. 패키지 업데이트

`npm update <pakage-name>`

5. package.json scripts 프로퍼티의 start 실행

`npm start`

6. package.json start 이외의 scripts 실행

`npm run <script-name>`

7. 버전 확인

`npm -v`

## 패키지 설치

프로젝트 디렉터리 생성 및 프로젝트 디렉터리로 이동

`mkdir emoji && cd emoji`

package.json 생성

`npm init -y`

![packagejson](https://user-images.githubusercontent.com/67866773/102954970-2d82a380-4518-11eb-82f0-42569b095cd5.PNG)

Node.js 환경에서 emoji를 지원하는 [node-emoji](https://www.npmjs.com/package/node-emoji)를 설치해 보자.

```bash
npm install node-emoji
```

![nodemodules](https://user-images.githubusercontent.com/67866773/102955062-6458b980-4518-11eb-8dc0-55a961fcbb9a.PNG)

## package.json과 의존성

Node.js 프로젝트에서는 많은 패키지를 사용하고 버전도 빈번하게 업데이트되기 때문에 프로젝트가 의존하고 있는 패지키를 일괄 관리할 필요가 있다.

npm은 package.json 파일을 통해서 프로젝트 정보와 패키지의 의존성(dependency)을 관리한다.

![packagejson 과 dependency](https://user-images.githubusercontent.com/67866773/102955372-18f2db00-4519-11eb-8ea8-c307f4a0c11e.PNG)

package.json에서 가장 중요한 항목은 `name`과 `version`이다. 이것으로 패키지의 고유성을 판단하므로 생략할 수 없다.

`dependencies` 항목에는 해당 프로젝트가 의존하는 패키지들의 이름과 버전을 명시한다.

`devDependencies`에는 개발 시에만 사용하는 개발용 의존 패키지를 명시한다. npm install 명령어에 `npm install -D <package-name>` 옵션을 사용하면 devDependencies에 설치된 패키지와 버전이 기록된다.
