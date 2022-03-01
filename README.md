# myPlug

전기차 충전 조회 및 충전 기록 앱

## 기본 세팅 방법

1. node.js, mongodb 기본 설치
2. vsc에서 터미널 실행
3. app-expo와 server 각 폴더에 들어가서 npm install 후 대기

특정 경로로 이동하기

- cd 폴더명
  부모 경로로 이동하기
- cd ..


app-expo의 경우에는 expo-cli를 설치해줘야 한다
>'expo-cli'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.<br>
This command requires Expo CLI.
Do you want to install it globally [Y/n]?

이런 문장이 나오면 y 누르고 엔터 해주면 됨

---

## 프로그램 별 실행 방법

### app-expo

npm start
하고나서 각자의 스마트폰 앱으로 접속이 가능함 (EXPO-GO App을 사용하여 접속)

### server

node server.js
또는
nodemon server.js

### stand-alone
각 폴더를 intellij로 실행해야 함


## 프로그램 실행 순서

### 1. stand-alone

자바를 사용하여 공공데이터 api로부터 데이터 수신 및 저장

### 2. server

서버를 실행하여 대기 상태로 만듦

### 3. app-expo

앱을 실행하면 정상 동작함


## 작업하다가 오류 발생 시 시도해보면 좋은 명령어

서버 종료 후

expo start --clear
npm start --reset-cache

둘 중 하나를 시도한다

의외로 캐시 문제로 인해서 재시작이 안되는 경우가 많음
