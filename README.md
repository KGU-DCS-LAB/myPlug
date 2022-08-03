
# 나만의 플러그 : myPlug (제작중)

전기차 충전 조회 및 충전 기록 앱


## Authors
- [@gabrielyoon7 (윤주현, Gabriel Ju Hyun Yoon)](https://github.com/gabrielyoon7)
- [@gykim0923 (김가영)](https://github.com/gykim0923)
- [@SeonaePark (박선애)](https://github.com/SeonaePark)
- [@soyoung125 (박소영)](https://github.com/soyoung125)
- [@yeonsu00 (김연수)](https://github.com/yeonsu00)


## Tech Stack

**Client(App)** 

[![ㅇㅇ](https://img.shields.io/badge/App-Expo%20GO-lightgray)](https://expo.dev/client)
[![ㅇㅇ](https://img.shields.io/badge/App-React%20Native-blue)](https://reactnative.dev/)
[![ㅇㅇ](https://img.shields.io/badge/App-Native%20Base-9cf)](https://nativebase.io/)
[![ㅇㅇ](https://img.shields.io/badge/App-React%20Native%20Navigation-blueviolet)](https://reactnavigation.org/)


**Server(App)**

[![ㅇㅇ](https://img.shields.io/badge/Backend-MongoDB-success)](https://www.mongodb.com/ko-kr)
[![ㅇㅇ](https://img.shields.io/badge/Backend-mongoose-red)](https://mongoosejs.com/)
[![ㅇㅇ](https://img.shields.io/badge/Backend-NodeJS-green)](https://nodejs.org/ko/)
[![ㅇㅇ](https://img.shields.io/badge/Backend-ExpressJS-black)](https://reactnative.dev/)

**Server(Data)**

[![ㅇㅇ](https://img.shields.io/badge/Backend-MongoDB-success)](https://www.mongodb.com/ko-kr)
[![ㅇㅇ](https://img.shields.io/badge/Backend-Java-red)](https://www.java.com/ko/)



## Project Structure

프로젝트 구조는 다음과 같습니다.

    myPlug
     |- app-expo [Client(App)]
     |- server [Server(App)]
     |- stand-alone
            |- data-manager [deprecated]
            |- station-data-generator [Server(Data)]
            |- web-manager [deprecated]
            

- app-expo

충전소 지도 앱 입니다. 스마트폰에 Expo를 설치한 후 구동할 수 있습니다. (iOS/Android 모두 구동 가능)

- server

충전소 지도 앱에서 사용할 DB 작업을 처리해줄 서버 입니다.

- station-data-generator

[한국환경공단(KECO)에서 제공하는 충전소API](https://www.data.go.kr/data/15013115/standard.do)를 사용하여 데이터를 수신 및 가공해주는 Java 애플리케이션입니다.

- ~~data-manager~~ [deprecated]

더이상 사용하지 않는 프로그램 입니다.

- ~~web-manager~~ [deprecated]

더이상 사용하지 않는 프로그램 입니다.

## Features

- Client(App)
  - 충전소 조회 (지도)
    - 충전소 실시간 검색
    - 지도 확대/축소/현위치
    - 충전소 리스트
        - 거리순 정렬
    - 충전소 조회
        - 충전소 간단 정보
        - 충전소 상세 정보
            - 충전기 실시간 사용 정보
            - 충전기 사용 통계
            - 충전소 사용 통계
    - 충전소 필터링
        - 주차비 여부
        - 운영기관 필터링
    - 충전소 새로 고침
  - 즐겨찾기로 등록 된 충전소 조회
  - (제작중)
- Server(App)
    - App 사용에 필요한 RESTful API 형태로 구현
- Server(Data)
  - KECO로 부터 충전기 데이터 실시간 수신
  - KECO로 부터 수신 받은 데이터를 충전소와 충전기로 분리
  - 충전소와 충전기 데이터를 새 데이터로 overwrite (벌크형태로 저장/관리하여 속도 개선)
  - 충전기 사용 여부를 통계 데이터로 작성 후 저장
  - 오래된 충전기 사용 통계는 자동 삭제
  - 이 모든 과정을 주기적으로 자동 반복 처리

## Demo and Screenshots

![App Screenshot](app/screenshots/%EC%95%B1_%EB%AA%A8%EB%91%90%EC%9D%98%20%EC%9D%BC%EA%B8%B0.gif)
![App Screenshot](app/screenshots/%EC%95%B1_%EB%8C%93%EA%B8%80%20%EB%8B%AC%EA%B8%B0.gif)
![App Screenshot](app/screenshots/%EC%95%B1_%EC%9D%BC%EA%B8%B0%20%EB%A9%94%EC%9D%B8.gif)
![App Screenshot](app/screenshots/%EC%95%B1_%EC%9D%BC%EA%B8%B0%20%EC%9D%BD%EA%B8%B0.gif)
![App Screenshot](app/screenshots/%EC%95%B1_%EC%9D%BC%EA%B8%B0%20%EC%9E%91%EC%84%B1.gif)
![App Screenshot](app/screenshots/%EC%95%B1_%ED%8C%94%EB%A1%9C%EC%9A%B0.gif)

![Web Screenshot](web/screenshots/%EC%9B%B9_%EC%9D%BC%EA%B8%B0%20%EC%9D%BD%EA%B8%B0.gif)
![Web Screenshot](web/screenshots/%EC%9B%B9_%EC%9D%BC%EA%B8%B0%20%EC%9E%91%EC%84%B1.gif)


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


## Documentation

-

## License

TBD

## Support

For support, email gabrielyoon7@gmail.com.

