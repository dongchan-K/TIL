# NVM 이란?

Node Version Manage의 약자로서, Node.js를 쉽게 설치하고 여러 node 버전을 사용할 때 매우 유용하다.

### window NVM 설치

1. 기존에 node.js가 설치되어 있다면 제거 -> 충돌 방지
2. 최신 버전의 NVM 다운로드 : https://github.com/coreybutler/nvm-windows/releases
   -> setup 파일로 설치하자
3. node 설치 : 터미널에서 `nvm install v<버전 이름>` 명령어로 사용할 버전의 node 설치
4. node 선택 : 터미널에서 `nvm use <버전 이름>` 명령어로 사용할 node 버전 선택

- `nvm list available` 명령어로 설치 가능한 node 버전 확인 가능
- `nvm ls` 명령어로 설치된 node 버전 및 사용중인 node 버전 확인 가능
