import * as API from '../../api/API.js';
import * as saver from './saver.js'

const zcodes = [
    { 'code': 11, 'region': '서울특별시' },
    { 'code': 26, 'region': '부산광역시' },
    { 'code': 27, 'region': '대구광역시' },
    { 'code': 28, 'region': '인천광역시' },
    { 'code': 29, 'region': '광주광역시' },
    { 'code': 30, 'region': '대전광역시' },
    { 'code': 31, 'region': '울산광역시' },
    { 'code': 41, 'region': '경기도' },
    { 'code': 42, 'region': '강원도' },
    { 'code': 43, 'region': '충청북도' },
    { 'code': 44, 'region': '충청남도' },
    { 'code': 45, 'region': '전라북도' },
    { 'code': 46, 'region': '전라남도' },
    { 'code': 47, 'region': '경상북도' },
    { 'code': 48, 'region': '경상남도' },
    { 'code': 50, 'region': '제주도' },
]

export const init = async (date) => {
    await Promise.all(zcodes.map((z) => getChargerInfoByZcode(z, date))); //순서를 지켜주기 위함
    // await getChargerInfoByZcode({ 'code': 11, 'region': '서울특별시' }, date);
    // await getChargerInfoByZcode({ 'code': 41, 'region': '경기도' }, date);
    console.log('************reveiver.js is over*****************')
    return null;
}

const getChargerInfoByZcode = async (z, date) => {
    // 주어진 zcode를 사용하여 KECO api로 부터 데이터 요청을 하는 메소드
    let raw_data = [];
    console.log(z.code, z.region);
    let totalCount = 10000; // 실행 시 업데이트 되는 부분
    let numOfRows = 9999;
    let page = 1;	// 페이지 초기값
    let maxPage = 2; // 추후 수정 예정
    while (true) {
        if (page > maxPage) {
            break;
        }
        // console.log(">> KECO 전기자동차 충전소 정보 수집 요청(" + z.region + " " + page + "페이지)");
        let url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?";
        url += "serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D"; //고유키값 (하루에 1000번 요청 제한 있음.)
        url += "&pageNo=" + page; // 페이지 번호 : 페이지 번호
        url += "&numOfRows=" + numOfRows; //한 페이지 결과 수 : 한 페이지 결과 수 (최소 10, 최대 9999)
        url += "&zcode=" + z.code; //지역구분 코드 시도 코드 (행정구역코드 앞 2자리)
        // console.log("요청 url : " + url);
        const { header, item } = await API.getChargerInfo(url);
        raw_data.push(...item);
        totalCount = header.totalCount;
        maxPage = parseInt(totalCount / numOfRows) + 1;
        console.log("[" + z.region + " 데이터 요청] | page [" + page + "/" + maxPage + "] | count [" + (page * numOfRows > totalCount ? totalCount : page * numOfRows) + "/" + totalCount + "]");
        page++;
    }
    //받은 데이터를 저장하기 시작함
    await saver.init(z.region, date, raw_data);
    console.log("[" + z.region + "] 리시버 끝");
    return null;
}
