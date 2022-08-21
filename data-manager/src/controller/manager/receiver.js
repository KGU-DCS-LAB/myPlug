import * as API from '../../api/API.js';
import { initStatus } from '../../api/STATUS.js';
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
    initStatus();
    await Promise.all(zcodes.map((z) => getChargerInfoByZcode(z, date))); //순서를 지켜주기 위함
    // await getChargerInfoByZcode({ 'code': 11, 'region': '서울특별시' }, date);
    // await getChargerInfoByZcode({ 'code': 41, 'region': '경기도' }, date);
    console.log('************reveiver.js is over*****************')
    return null;
}

const getChargerInfoByZcode = async (z, date) => {
    /**
     * 주어진 zcode를 사용하여 KECO api로 부터 데이터 요청을 하는 메소드
     */
    // let raw_data = [];
    console.log(z.code, z.region);
    let totalCount = 10000; // 실행 시 업데이트 되는 부분... 최초 실행 시 업데이트 되며, 전체 갯수를 의미함.
    let numOfRows = 9999; //한번에 최대 몇개 데이터를 처리할건지 결정하는 부분. (max : 9999)
    let page = 1;	// 페이지 초기값
    let maxPage = 2; // 최대 페이지값... 최초 실행 시 업데이트 되며, 전체 페이지 수를 의미함.
    while (true) {

        //다음 페이지를 위해 비워주기 (한번에 여러개 저장하려면 이렇게 하면 안됨)
        let raw_data = [];

        // 끝 페이지 도달 시 탈출
        if (page > maxPage) {
            break;
        }
        
        let url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?";
        url += "serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D"; //고유키값 (하루에 1000번 요청 제한 있음.)
        url += "&pageNo=" + page; // 페이지 번호 : 페이지 번호
        url += "&numOfRows=" + numOfRows; //한 페이지 결과 수 : 한 페이지 결과 수 (최소 10, 최대 9999)
        url += "&zcode=" + z.code; //지역구분 코드 시도 코드 (행정구역코드 앞 2자리)

        const { header, item } = await API.getChargerInfo(url); // KECO API로부터 데이터 수신
        raw_data.push(...item);
        totalCount = header.totalCount;
        maxPage = parseInt(totalCount / numOfRows) + 1;
        console.log(">> [" + z.region + "] 데이터 요청 | page [" + page + "/" + maxPage + "] | count [" + (page * numOfRows > totalCount ? totalCount : page * numOfRows) + "/" + totalCount + "]");
        //받은 데이터를 저장하기 시작함 (node.js 속도 향상을 위해 페이지 단위로 저장 요청을 수행한다. 이렇게 되면 1번에 최대 9999개까지만 작업해서 속도 개선이 가능함.)
        await saver.init(z.region, date, raw_data, "[" + z.region + " " + page + "/" + maxPage + "]");
        page++;
    }
    return null;
}
