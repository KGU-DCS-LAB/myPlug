
# 나만의 플러그 : myPlug

### 전기차 충전소 조회 및 추천 애플리케이션

    Android / iOS

## Authors
- [@gabrielyoon7 (윤주현, Gabriel Ju Hyun Yoon)](https://github.com/gabrielyoon7)
- [@gykim0923 (김가영)](https://github.com/gykim0923)
- [@SeonaePark (박선애)](https://github.com/SeonaePark)
- [@soyoung125 (박소영)](https://github.com/soyoung125)
- [@yeonsu00 (김연수)](https://github.com/yeonsu00)


## Tech Stack

**Client ( Android/iOS Application )** 


[![ㅇㅇ](https://img.shields.io/badge/App-React%20Native-blue)](https://reactnative.dev/)
[![ㅇㅇ](https://img.shields.io/badge/App-Native%20Base-9cf)](https://nativebase.io/)
[![ㅇㅇ](https://img.shields.io/badge/App-React%20Native%20Navigation-blueviolet)](https://reactnavigation.org/)
[![ㅇㅇ](https://img.shields.io/badge/App-Expo-lightgray)](https://expo.dev/client)

**Server ( Node.js Application )**

[![ㅇㅇ](https://img.shields.io/badge/Backend-NodeJS-green)](https://nodejs.org/ko/)
[![ㅇㅇ](https://img.shields.io/badge/Backend-ExpressJS-black)](https://reactnative.dev/)
[![ㅇㅇ](https://img.shields.io/badge/Backend-MongoDB-success)](https://www.mongodb.com/ko-kr)
[![ㅇㅇ](https://img.shields.io/badge/Backend-mongoose-red)](https://mongoosejs.com/)

**Data Manager V2 ( Node.js Application )**

[![ㅇㅇ](https://img.shields.io/badge/Backend-NodeJS-green)](https://nodejs.org/ko/)
[![ㅇㅇ](https://img.shields.io/badge/Backend-MongoDB-success)](https://www.mongodb.com/ko-kr)
[![ㅇㅇ](https://img.shields.io/badge/API-KECO-blue)](https://www.data.go.kr/data/15013115/standard.do)




***~~Data Manager V1 ( Java Application / Deprecated!!!)~~***

[![ㅇㅇ](https://img.shields.io/badge/Backend-Java-red)](https://www.java.com/ko/)
[![ㅇㅇ](https://img.shields.io/badge/Backend-MongoDB-success)](https://www.mongodb.com/ko-kr)
[![ㅇㅇ](https://img.shields.io/badge/API-KECO-blue)](https://www.data.go.kr/data/15013115/standard.do)


## Project Structure

프로젝트 구조는 다음과 같습니다.

    .
    ├── app-expo [Client (Android/iOS Application)]
    │   └── src
    │       ├── api
    │       ├── components
    │       ├── containers
    │       └── hooks
    ├── server [Server (Node.js Application)]
    │   ├── models
    │   └── routes
    └── data-manager [Data Manager V2 ( Node.js Application )]
        ├── legacy(stations-data-generator) [deprecated]
        └── src
            ├── api
            ├── controller
            └── models

- app-expo

React Native를 사용하여 작성한 충전소 지도 앱 입니다. 스마트폰에 Expo를 설치한 후 구동할 수 있습니다. (iOS/Android)

- server

충전소 지도 앱에서 사용할 DB 작업을 처리해줄 Node.js + Express 기반의 서버 입니다.

- data-manager

[한국환경공단(KECO)에서 제공하는 충전소API](https://www.data.go.kr/data/15013115/standard.do)를 사용하여 데이터를 수신 및 가공해주는 Node.js 애플리케이션입니다.

~~- stations-data-generator~~

~~[한국환경공단(KECO)에서 제공하는 충전소API](https://www.data.go.kr/data/15013115/standard.do)를 사용하여 데이터를 수신 및 가공해주는 Java 애플리케이션입니다.~~


## Features

    . [Client (Android/iOS Application)]
    ├── 충전소 조회 (지도)
    │   ├── 충전소 실시간 검색
    │   ├── 지도 확대/축소/현위치
    │   ├── 충전소 리스트
    │   │   ├── 충전소 상태별 색상 표시
    │   │   └── 거리순 정렬
    │   ├── 충전소 조회
    │   │   ├── 충전소 간단 정보
    │   │   └── 충전소 상세 정보
    │   │        ├── 충전기 실시간 사용 정보
    │   │        ├── 충전기 사용 통계
    │   │        └── 충전소 사용 통계
    │   ├── 충전소 필터링
    │   │   ├── 주차비 여부
    │   │   └── 운영기관 필터링
    │   ├── 충전소 새로 고침
    │   └── 즐겨찾기로 등록 된 충전소 조회
    ├── 계정
    │   ├── 회원가입
    │   └── 로그인/로그아웃
    ├── 충전소 전국단위 검색
    │   ├── 충전소 지역/분류 선택 기능
    │   └── 검색 결과 리스트 출력 기능
    ├── 충전 일정 관리
    │   ├── (제작중)
    │   └── (제작중)
    └── 나의 자동차 설정
        ├── (제작중)
        └── (제작중)

    . [Server (Node.js Application)]
    └── App 사용에 필요한 RESTful API 형태로 구현

    . [Data Manager V2 ( Node.js Application )]
    ├── KECO로 부터 충전기 데이터 실시간 수신
    ├── KECO로 부터 수신 받은 데이터를 충전소와 충전기로 분리
    ├── 충전소와 충전기 데이터를 새 데이터로 overwrite (벌크형태로 저장/관리하여 속도 개선)
    ├── 충전기 사용 여부를 통계 데이터에 업데이트
    ├── 오래된 충전기 사용 통계는 자동 삭제
    └── 이 모든 과정을 주기적으로 자동 반복 처리

## Demo and Screenshots

![App Screenshot](app-expo/screenshots/gif/main.gif)
![App Screenshot](app-expo/screenshots/gif/map.gif)
![App Screenshot](app-expo/screenshots/gif/search.gif)
![App Screenshot](app-expo/screenshots/gif/location.gif)
![App Screenshot](app-expo/screenshots/gif/modalSmall.gif)
![App Screenshot](app-expo/screenshots/gif/modalBig.gif)
![App Screenshot](app-expo/screenshots/gif/list.gif)
![App Screenshot](app-expo/screenshots/gif/filter.gif)
![App Screenshot](app-expo/screenshots/gif/theme.gif)

![Web Screenshot](app-expo/screenshots/gif/data.gif)


## Environment Variables

이 프로젝트 중 앱을 구동하기 위해서는 config.js 파일을 수정해줘야 합니다.
현재 PC의 내부 ip를 적습니다. (반드시 앱 구동 전에 실시되어야 합니다.)

```
export const config = {
	ip : 'http://192.168.0.11',    //이 부분을 수정
    ...
};
```

## Run Locally

클론

```bash
  git clone https://github.com/KGU-DCS-LAB/myPlug
```

## Installation

이 프로젝트를 설치하기 위해...

### 설치 경로

프로젝트는 반드시 C드라이브에 clone합니다.

    C://myPlug


### `npm install`

> **Note: 패키지 변화가 없으면 매번 작업을 할 필요가 없습니다.**

package.json에 있는 npm 설치 이력을 토대로 본인 컴퓨터에 패키지를 자동으로 설치합니다.
이 작업은 평소에 할 필요가 없지만, 누군가가 새 패키지를 설치하는 경우 다른사람들이 모두 해줘야 합니다.

    부가 옵션으로 과거 버전의 패키지를 설치하는 방법이 있습니다.
    npm install --legacy-peer-deps
    패키지 설치 시 더이상 과거 버전을 지원하지 않는다거나 권장하지 않는다고 설치를 거부하는 경우 레거시 버전을 설치하는 방법입니다.

    만약 위 명령어로도 설치가 불가능하면
    npm install --force
    강제로 설치하는 명령어도 있습니다.

각각의 폴더에서 npm 설치 작업을 진행하여야 합니다.
## Deployment

이 프로젝트를 실행하기 위해...

### `npm start`
> **Note: 아래 `install 명령어`를 먼저 실행할 필요가 있을 수도 있습니다.**

이 프로그램을 실행하게 합니다.
실행에 성공하면 Expo가 자동으로 실행됩니다.

Expo는 Android나 iOS에 설치 후 스마트폰에서 직접 실행이 가능합니다.

이 프로젝트를 수정하고 저장하면 자동으로 리로딩이 됩니다.
오류가 발생하면 터미널 콘솔창에 찍힙니다. (터미널에 찍히지 않는 경우에는 웹 브라우저에서 확인)

    부가 옵션으로 cache를 초기화 하면서 실행하는 방법이 있습니다.
    npm start --reset-cache
    분명 코드가 잘 들어갔고, 아무리 생각해도 문제가 없음에도 불구하고 오류가 발생하면 위 명령어로 실행하는 방법이 있습니다.


## References

- [React Native](https://reactnative.dev/)
- [EXPO](https://expo.dev/)
- [React Native Navigation](https://reactnavigation.org/)
- [Native Base](https://nativebase.io/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Mongo DB](https://www.mongodb.com/)
- [mongoose](https://mongoosejs.com/)
- [한국환경공단(KECO)에서 제공하는 충전소API](https://www.data.go.kr/data/15013115/standard.do)


## Documentation
- TBD

## License

TBD

## Support

For support, email gabrielyoon7@gmail.com.

