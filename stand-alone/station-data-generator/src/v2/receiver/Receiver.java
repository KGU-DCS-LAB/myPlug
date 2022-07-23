package v2.receiver;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import v2.DataManager;
import v2.common.ConsoleColor;
import v2.common.KecoChargerInfoDTO;

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
                    KecoChargerInfoDTO info = new KecoChargerInfoDTO();
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){
                        Element eElement = (Element) nNode;

                        info.setApi("keco"); //수집된 api 종류
                        info.setDate(new Date()); //수신 시각
                        info.setUniqueId(getTagValue("statId",eElement)+getTagValue("chgerId",eElement));
                        info.setStatNm(getTagValue("statNm",eElement)); //충전소명
                        info.setStatId(getTagValue("statId",eElement)); //충전소ID
                        info.setChgerId(getTagValue("chgerId",eElement)); //충전기ID
                        info.setChgerType(getTagValue("chgerType",eElement)); //충전기타입
                        info.setAddr(getTagValue("addr",eElement)); //소재지 도로명 주소
                        info.setLocation(getTagValue("location",eElement)); //상세위치
                        info.setLat(getTagValue("lat",eElement)); //위도
                        info.setLng(getTagValue("lng",eElement)); //경도
                        info.setUseTime(getTagValue("useTime",eElement)); //이용가능시간
                        info.setBusiId(getTagValue("busiId",eElement)); //기관ID
                        info.setBnm(getTagValue("bnm",eElement)); //기관명
                        info.setBusiNm(getTagValue("busiNm",eElement)); //운영기관명
                        info.setBusiCall(getTagValue("busiCall",eElement)); //충전기 운영기관 연락처
                        info.setStat(getTagValue("stat",eElement)); //충전기상태
                        info.setStatUpdDt(getTagValue("statUpdDt",eElement)); //충전기 상태 변경 일시
                        info.setLastTsdt(getTagValue("lastTsdt",eElement));//	마지막 충전시작일시
                        info.setLastTedt(getTagValue("lastTedt",eElement));//	마지막 충전종료일시
                        info.setNowTsdt(getTagValue("nowTsdt",eElement)); //	충전중 시작일시
                        info.setOutput(getTagValue("output",eElement)); //	충전용량
                        info.setMethod(getTagValue("method",eElement)); //	충전방식
                        info.setZcode(getTagValue("zcode",eElement)); //	지역코드
                        info.setParkingFree(getTagValue("parkingFree",eElement)); //	주차료무료
                        info.setNote(getTagValue("note",eElement)); //	충전소 안내
                        info.setLimitYn(getTagValue("limitYn",eElement)); //	이용자 제한
                        info.setLimitDetail(getTagValue("limitDetail",eElement)); //	이용제한 사유
                        info.setDelYn(getTagValue("delYn",eElement)); //	삭제 여부
                        info.setDelDetail(getTagValue("delDetail",eElement)); //	삭제 사유
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
