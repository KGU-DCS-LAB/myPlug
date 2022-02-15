/**
 * API를 활용한 전기차 충전소 데이터 조회
 * */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Scanner;

public class EV_Charger_RECEIVER {

    public void run() throws IOException {
        Scanner scan = new Scanner(System.in);
        while (true) {
            String mode = scan.next();
            StringBuilder urlBuilder = null;
            URL url = null;
            HttpURLConnection conn = null;
            BufferedReader rd = null;
            StringBuilder sb = null;
            String line = null;
            String data = null;
            switch (mode) {
                case "keco":
                    /**
                     * 한국환경공단
                     *
                     * 굉장히 투박한 조회가 가능함.
                     *
                     * */
                    urlBuilder = new StringBuilder("http://apis.data.go.kr/B552584/EvCharger/getChargerStatus"); /*URL*/
                    urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D"); /*Service Key*/
                    urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
                    urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수 (최소 10, 최대 9999)*/
                    urlBuilder.append("&" + URLEncoder.encode("period", "UTF-8") + "=" + URLEncoder.encode("5", "UTF-8")); /*상태갱신 조회 범위(분) (기본값 5, 최소 1, 최대 10)*/
                    urlBuilder.append("&" + URLEncoder.encode("zcode", "UTF-8") + "=" + URLEncoder.encode("11", "UTF-8")); /*시도 코드 (행정구역코드 앞 2자리)*/
                    break;
                case "kepco":
                    /**
                     * 한국전력공사
                     * 복사해서 url요청 시 자꾸 https로 이동하는 문제가 있어서 해결 필요?
                     * */
                    urlBuilder = new StringBuilder("http://openapi.kepco.co.kr/service/EvInfoServiceV2/getEvSearchList"); /*URL*/
                    urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D"); /*Service Key*/
                    urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
                    urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수*/
//                urlBuilder.append("&" + URLEncoder.encode("addr","UTF-8") + "=" + URLEncoder.encode("전라남도 나주시 전력로 55", "UTF-8")); /*검색대상 충전소주소*/
                    urlBuilder.append("&" + URLEncoder.encode("addr", "UTF-8") + "=" + URLEncoder.encode("하남시", "UTF-8")); /*검색대상 충전소주소*/
                    break;
                case "public":
                    /**
                     * 전국전기차충전소표준데이터
                     * */
                    urlBuilder = new StringBuilder("http://api.data.go.kr/openapi/tn_pubr_public_elcty_car_chrstn_api"); /*URL*/
                    urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D"); /*Service Key*/
                    urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
                    urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); /*한 페이지 결과 수*/
                    urlBuilder.append("&" + URLEncoder.encode("type", "UTF-8") + "=" + URLEncoder.encode("xml", "UTF-8")); /*XML/JSON 여부*/
//                urlBuilder.append("&" + URLEncoder.encode("chrstnNm","UTF-8") + "=" + URLEncoder.encode("홈플러스 구월점", "UTF-8")); /*충전소명*/
//                urlBuilder.append("&" + URLEncoder.encode("chrstnLcDesc","UTF-8") + "=" + URLEncoder.encode("인천광역시 남동구 예술로 198 , 지하주차장 4층 I4구역(구월동 1130)", "UTF-8")); /*충전소위치상세*/
//                urlBuilder.append("&" + URLEncoder.encode("instlCtprvnNm","UTF-8") + "=" + URLEncoder.encode("인천광역시", "UTF-8")); /*설치시도명*/
//                urlBuilder.append("&" + URLEncoder.encode("restde","UTF-8") + "=" + URLEncoder.encode("-", "UTF-8")); /*휴점일*/
//                urlBuilder.append("&" + URLEncoder.encode("useOpenTime","UTF-8") + "=" + URLEncoder.encode("09:00", "UTF-8")); /*이용가능시작시각*/
//                urlBuilder.append("&" + URLEncoder.encode("useCloseTime","UTF-8") + "=" + URLEncoder.encode("23:59", "UTF-8")); /*이용가능종료시각*/
//                urlBuilder.append("&" + URLEncoder.encode("slowChrstnYn","UTF-8") + "=" + URLEncoder.encode("N", "UTF-8")); /*완속충전가능여부*/
//                urlBuilder.append("&" + URLEncoder.encode("fastChrstnYn","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*급속충전가능여부*/
//                urlBuilder.append("&" + URLEncoder.encode("fastChrstnType","UTF-8") + "=" + URLEncoder.encode("DC차데모+AC3상", "UTF-8")); /*급속충전타입구분*/
//                urlBuilder.append("&" + URLEncoder.encode("slowChrstnCo","UTF-8") + "=" + URLEncoder.encode("0", "UTF-8")); /*완속충전기대수*/
//                urlBuilder.append("&" + URLEncoder.encode("fastChrstnCo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*급속충전기대수*/
//                urlBuilder.append("&" + URLEncoder.encode("prkplceLevyYn","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*주차료부과여부*/
//                urlBuilder.append("&" + URLEncoder.encode("rdnmadr","UTF-8") + "=" + URLEncoder.encode("인천광역시 남동구 예술로 198 , 지하주차장 4층 I4구역(구월동 1130)", "UTF-8")); /*소재지도로명주소*/
//                urlBuilder.append("&" + URLEncoder.encode("lnmadr","UTF-8") + "=" + URLEncoder.encode("인천광역시 남동구 구월동 1130", "UTF-8")); /*소재지지번주소*/
//                urlBuilder.append("&" + URLEncoder.encode("institutionNm","UTF-8") + "=" + URLEncoder.encode("환경부(한국자동차환경협회)", "UTF-8")); /*관리업체명*/
//                urlBuilder.append("&" + URLEncoder.encode("phoneNumber","UTF-8") + "=" + URLEncoder.encode("1661-9408", "UTF-8")); /*관리업체전화번호*/
//                urlBuilder.append("&" + URLEncoder.encode("latitude","UTF-8") + "=" + URLEncoder.encode("37.4517361878", "UTF-8")); /*위도*/
//                urlBuilder.append("&" + URLEncoder.encode("hardness","UTF-8") + "=" + URLEncoder.encode("126.7019408", "UTF-8")); /*경도*/
//                urlBuilder.append("&" + URLEncoder.encode("referenceDate","UTF-8") + "=" + URLEncoder.encode("2019-06-27", "UTF-8")); /*데이터기준일자*/
//                urlBuilder.append("&" + URLEncoder.encode("insttCode","UTF-8") + "=" + URLEncoder.encode("3530000", "UTF-8")); /*제공기관코드*/
//                urlBuilder.append("&" + URLEncoder.encode("insttNm","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*제공기관명*/
                    break;
                default:
                    System.out.println("에러");
            }

            url = new URL(urlBuilder.toString());
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
//            rd = new BufferedReader(new InputStreamReader(IOUtils.toInputStream(IOUtils.toString(conn.getInputStream()), "UTF-8"),"utf-8"));
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "utf-8"));
            }
            sb = new StringBuilder();
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();
            data = sb.toString();
            System.out.println(data);
        }
    }

    public static void main(String[] args) throws IOException {
        EV_Charger_RECEIVER main = new EV_Charger_RECEIVER();
        main.run();
    }
}
