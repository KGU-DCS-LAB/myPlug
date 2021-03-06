# myPlug

전기차 충전 조회 및 충전 기록 앱

## 프로젝트 구성
    myPlug
        ⊢   app-expo (React Native)
        ⊢   server (node.js)
        ⊢   stand-alone     ⊢ data-manager (node.js)
                            ⊢ station-data-generator (java)
                            ⊢ web-manager (React)


## 사전 다운로드

    vscode, node.js, mongodb 기본 설치

## 기본 세팅 방법

    1. vsc에서 터미널 실행
    2. app-expo, server, stand-alone/data-manager, stand-alone/web-manager 폴더에서 각각 npm install 명령어 입력 (입력 시 설치가 끝날 때 까지 대기하여야 한다.)
    3. 참고로 Java로 작성된 앱(stand-alone/station-data-generator)에서는 npm 관련 세팅을 하지 않는다!



특정 경로로 이동하는 법

    - cd 폴더명 (엔터)

부모 경로로 이동하기

    - cd .. (엔터)



app-expo의 경우에는 expo-cli를 설치해줘야 한다
>'expo-cli'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.<br>
This command requires Expo CLI.
Do you want to install it globally [Y/n]?

이런 문장이 나오면 y 누르고 엔터 해주면 됨.


typeScript도 설치해줘야 한다.
>√ It looks like you're trying to use TypeScript but don't have the required dependencies installed. Would you
like to install typescript, @types/react, @types/react-native? 

역시나 y 누르고 엔터

(다만, 현재는 typescript를 native base에서만 제한적으로 사용중임)

---

## 프로그램 별 실행 방법

### app-expo

    npm start 하고나서 각자의 스마트폰 앱으로 접속이 가능함 (EXPO-GO App을 사용하여 접속)

### server
    node(또는 nodemon) server.js
    ※ nodemon이 안되는 경우 권한 설정을 따로 해줘야 한다. node로 실행하는 것이 정석임.

### stand-alone
    data-manager
     - node(또는 nodemon) server.js
     ※ nodemon이 안되는 경우 권한 설정을 따로 해줘야 한다. node로 실행하는 것이 정석임.

    station-data-generator
     - intelliJ로 실행해야 함. 이때 엉뚱한 폴더를 열지 않도록 주의한다.

    web-manager
     - npm start 


## 프로그램 실행 순서

### 1. stand-alone / station-data-generator

    인텔리제이 및 자바를 사용하여 공공데이터 api로부터 데이터 수신 및 저장 (이때 mongoDB에 raw_charger_infos collection에 중복 데이터가 쌓임)
    
    기존과 다르게 v2 패키지에 있는 DataManager.java를 실행해주셔야 합니다. (기존 패키지는 삭제함)

### 2. stand-alone / data-manager

    데이터 매니저를 실행하여 대기 상태로 만듦

### 3. stand-alone / web-manager

    '수집한 원본 데이터 중 한번도 검사하지 않은 "KECO 전기자동차 충전소 정보" RAW 데이터 업데이트 하기'를 눌러 raw_charger_infos의 checked == false인 데이터를 true로 만들어줌과 동시에 charger_infos colection으로 데이터 최신화 (단, 한번에 5000개의 데이터만 업데이트 된다.)

### 4. server

    서버(server)를 실행하여 대기 상태로 만듦

### 5. app-expo

    앱(app-expo)을 실행하면 정상 동작함

> 참고로 서버 실행을 하지 않고 app을 동작하는 경우 일부 데이터를 수신하지 못할 수 있다.

> 서버의 ip는 app-expo의 config.js에서 localhost에 적혀있는 주소로 수정해줘야한다.


## 작업하다가 오류 발생 시 시도해보면 좋은 명령어

    서버 종료 후

    expo start --clear

    npm start --reset-cache

    둘 중 하나를 시도한다 (의외로 캐시 문제로 인해서 재시작이 안되는 경우가 많음)


### 추후에 고급 기능이 탑재된 이후부터는 EXPO는 제거될 예정입니다.