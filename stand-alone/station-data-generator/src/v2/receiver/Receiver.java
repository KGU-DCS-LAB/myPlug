package v2.receiver;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import v2.DataManager;
import v2.common.ConsoleColor;
import v2.dto.ChargerInfoDTO;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.util.Date;
import java.util.HashMap;

public class Receiver {

    ConsoleColor cc = DataManager.cc;

    public static Receiver getInstance() {
        return new Receiver();  // Singleton
    }

    public static String getTagValue(String tag, Element eElement) {
        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
        Node nValue = (Node) nlList.item(0);
        if(nValue == null)
            return null;
        return nValue.getNodeValue();
    }

    public void getChargerInfo(String zcode){
        try {
            int totalCount= 10000; // 실행 시 업데이트 되는 부분
            int numOfRows = 9999;
            int page = 1;	// 페이지 초기값
            int maxPage = 2; // 추후 수정 예정

            while(true) {
                if(page>maxPage){
                    break;
                }
                System.out.println(">>KECO 전기자동차 충전소 정보 수집 요청("+page+"페이지)");
                String url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D";
                url+="&pageNo="+page; // 페이지 번호 : 페이지 번호
                url+="&numOfRows="+numOfRows; //한 페이지 결과 수 : 한 페이지 결과 수 (최소 10, 최대 9999)
                url+="&zcode="+zcode; //지역구분 코드 시도 코드 (행정구역코드 앞 2자리)
                System.out.println("요청 url : "+url);
                cc.print("danger","약간의 시간이 소요됩니다. 절대 프로그램을 종료하지 마세요.");

                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
//                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // totalCount tag of header
                NodeList headerList = doc.getElementsByTagName("header");
                for(int temp = 0; temp < headerList.getLength(); temp++) {
                    Node nNode = headerList.item(temp);
                    if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                        Element eElement = (Element) nNode;
                        totalCount = Integer.parseInt(getTagValue("totalCount", eElement));
                        maxPage = (totalCount/numOfRows)+1;
                        System.out.println("page ("+page+"/"+maxPage+")");
                        System.out.println("count ("+ (page*numOfRows>totalCount?totalCount:page*numOfRows) +"/"+totalCount+")");
                    }
                }


                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                System.out.println("파싱할 리스트 수 : "+ nList.getLength());
                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    ChargerInfoDTO info = new ChargerInfoDTO();
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){
                        Element eElement = (Element) nNode;
                        info.setDate(new Date()); //수신 시각
//                        info.setChecked(false); //업데이트 확인 여부
                        info.setApi("keco"); //수집된 api 종류
                        info.setStatNm(getTagValue("statNm",eElement)); //충전소명
                        info.setStatId(getTagValue("statId",eElement)); //충전소ID
                        info.setChgerId(getTagValue("chgerId",eElement)); //충전기ID
                        info.setChgerType(getTagValue("chgerType",eElement)); //충전기타입
                        info.setAddr(getTagValue("addr",eElement)); //소재지 도로명 주소
                        info.setLat(getTagValue("lat",eElement)); //위도
                        info.setLng(getTagValue("lng",eElement)); //경도
                        info.setUseTime(getTagValue("useTime",eElement)); //이용가능시간
                        info.setBusiId(getTagValue("busiId",eElement)); //기관ID
                        info.setBusiNm(getTagValue("busiNm",eElement)); //운영기관명
                        info.setBusiCall(getTagValue("busiCall",eElement)); //충전기 운영기관 연락처
                        info.setStat(getTagValue("stat",eElement)); //충전기상태
                        info.setStatUpdDt(getTagValue("statUpdDt",eElement)); //충전기 상태 변경 일시
                        info.setPowerType(getTagValue("powerType",eElement)); //충전기용량
                        info.setZcode(getTagValue("zcode",eElement)); //시도 코드(행정구역코드 앞2자리)
                        info.setParkingFree(getTagValue("parkingFree",eElement)); //주차료(Y:무료, N:유료, NULL:현장확인)
                        info.setNote(getTagValue("note",eElement)); //충전소 안내
                        DataManager.chargerInfoList.add(info);
                    }
                }
                cc.print("success","파싱 완료!");
                System.out.println();
                page++;
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public void receiveKECO() {
        HashMap<String, String> zcodes = new HashMap<>();
        zcodes.put("11", "서울특별시");
        zcodes.put("26", "부산광역시");
        zcodes.put("27", "대구광역시");
        zcodes.put("28", "인천광역시");
        zcodes.put("29", "광주광역시");
        zcodes.put("30", "대전광역시");
        zcodes.put("31", "울산광역시");
        zcodes.put("41", "경기도");
        zcodes.put("42", "강원도");
        zcodes.put("43", "충청북도");
        zcodes.put("44", "충청남도");
        zcodes.put("45", "전라북도");
        zcodes.put("46", "전라남도");
        zcodes.put("47", "경상북도");
        zcodes.put("48", "경상남도");
        zcodes.put("50", "제주도");

        System.out.println();
        cc.prefix("info");
        System.out.println("**************************************");
        System.out.println("**************************************");
        System.out.println("***KECO 전기자동차 충전소 정보 수집 시작***");
        System.out.println("**************************************");
        System.out.println("**************************************");
        cc.postfix();
        for (String z:zcodes.keySet()) {
            System.out.println();
            System.out.println("["+zcodes.get(z)+" 데이터 수집]");
            getChargerInfo(z);
            System.out.println("-------------------------------------");
            System.out.println();
        }
        cc.print("warning","-----------수집 종료. 다음으로 2번을 눌러 '정리된 데이터를 저장'을 눌러주세요.-----------");
    }

}
