package receiver;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

public class ReceiverDAO {
    public static ReceiverDAO getInstance() {
        return new ReceiverDAO();  // Singleton
    }

    public static String getTagValue(String tag, Element eElement) {
        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
        Node nValue = (Node) nlList.item(0);
        if(nValue == null)
            return null;
        return nValue.getNodeValue();
    }

    public void receiveKECO() {
        int page = 1;	// 페이지 초기값
        try{
            while(true){
                String url = "http://apis.data.go.kr/B552584/EvCharger/getChargerStatus?serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D&pageNo=1&numOfRows=10&period=5&zcode=11";   //파싱할 url

                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){

                        Element eElement = (Element) nNode;
                        System.out.println("----------------------");
                        //System.out.println(eElement.getTextContent());
                        System.out.println("기관아이디 : " + getTagValue("busiId", eElement));
                        System.out.println("충전소 ID : " + getTagValue("statId", eElement));
                        System.out.println("충전기 ID : " + getTagValue("chgerId", eElement));
                        System.out.println("충전기 상태 : " + getTagValue("stat", eElement));
                        System.out.println("상태 갱신일시 : " + getTagValue("statUpdDt", eElement));
                        System.out.println("마지막 충전시작일시 : " + getTagValue("lastTsdt", eElement));
                        System.out.println("마지막 충전종료일시 : " + getTagValue("lastTedt", eElement));
                        System.out.println("충전중 시작일시 : " + getTagValue("nowTsdt", eElement));
                    }
                }
                page += 1;
                System.out.println("page number : "+page);
                if(page > 12){
                    break;
                }
            }

        } catch (Exception e){
            e.printStackTrace();
        }

        System.out.println("######################");
        System.out.println("<전기자동차 충전소 정보>");
        page = 1;
        try{
            while(true){
                String url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D&pageNo=1&numOfRows=10&zcode=11";
                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){

                        Element eElement = (Element) nNode;
                        System.out.println("----------------------");
                        System.out.println("충전소명 : " + getTagValue("statNm", eElement));
                        System.out.println("충전소ID : " + getTagValue("statId", eElement));
                        System.out.println("충전기ID : " + getTagValue("chgerId", eElement));
                        System.out.println("충전기타입 : " + getTagValue("chgerType", eElement));
                        System.out.println("주소 : " + getTagValue("addr", eElement));
                        System.out.println("상세위치 : " + getTagValue("location", eElement));
                        System.out.println("위도 : " + getTagValue("lat", eElement));
                        System.out.println("경도 : " + getTagValue("lng", eElement));
                        System.out.println("이용가능시간 : " + getTagValue("useTime", eElement));
                        System.out.println("기관 아이디 : " + getTagValue("busiId", eElement));
                        System.out.println("기관명 : " + getTagValue("bnm", eElement));
                        System.out.println("운영기관명 : " + getTagValue("busiNm", eElement));
                        System.out.println("운영기관연락처 : " + getTagValue("busiCall", eElement));
                        System.out.println("충전기상태 : " + getTagValue("stat", eElement));
                        System.out.println("상태갱신일시 : " + getTagValue("statUpdDt", eElement));
                        System.out.println("마지막 충전시작일시 : " + getTagValue("lastTsdt", eElement));
                        System.out.println("마지막 충전종료일시 : " + getTagValue("lastTedt", eElement));
                        System.out.println("충전중 시작일시 : " + getTagValue("nowTsdt", eElement));
                        System.out.println("충전 타입 : " + getTagValue("powerType", eElement));
                        System.out.println("충전용량 : " + getTagValue("output", eElement));
                        System.out.println("충전방식 : " + getTagValue("method", eElement));
                        System.out.println("지역코드 : " + getTagValue("zcode", eElement));
                        System.out.println("주차료무료 : " + getTagValue("parkingFree", eElement));
                        System.out.println("충전소안내 : " + getTagValue("note", eElement));
                        System.out.println("이용자 제한 : " + getTagValue("limitYn", eElement));
                        System.out.println("이용제한 사유 : " + getTagValue("limitDetail", eElement));
                        System.out.println("삭제 여부 : " + getTagValue("delYn", eElement));
                        System.out.println("삭제 사유 : " + getTagValue("delDetail", eElement));
                    }
                }
                page += 1;
                System.out.println("page number : "+page);
                if(page > 3){
                    break;
                }
            }

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public void receiveKEPCO() {

        int page = 1;	// 페이지 초기값
        try{
            while(true){
                String url = "http://openapi.kepco.co.kr/service/EvInfoServiceV2/getEvSearchList?serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D&pageNo=1&numOfRows=10&addr=%ED%95%98%EB%82%A8%EC%8B%9C";   //파싱할 url

                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){

                        Element eElement = (Element) nNode;
                        System.out.println("----------------------");
                        //System.out.println(eElement.getTextContent());
                        System.out.println("충전소 주소 : " + getTagValue("addr", eElement));
                        System.out.println("충전기 타입 : " + getTagValue("chargeTp", eElement));
                        System.out.println("충전기 ID : " + getTagValue("cpId", eElement));
                        System.out.println("충전기 명칭 : " + getTagValue("cpNm", eElement));
                        System.out.println("충전기 상태 코드 : " + getTagValue("cpStat", eElement));
                        System.out.println("충전 방식 : " + getTagValue("cpTp", eElement));
                        System.out.println("충전소 ID : " + getTagValue("csId", eElement));
                        System.out.println("충전소 명칭 : " + getTagValue("csNm", eElement));
                        System.out.println("위도 : " + getTagValue("lat", eElement));
                        System.out.println("경도 : " + getTagValue("longi", eElement));
                        System.out.println("충전기 상태 갱신 시각 : " + getTagValue("statUpdateDatetime", eElement));
                    }
                }
                page += 1;
                System.out.println("page number : "+page);
                if(page > 12){
                    break;
                }
            }

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public void receivePUBLIC() {
        int page = 1;	// 페이지 초기값
        System.out.println("<전기자동차 충전소 상태>");
        try{
            while(true){
                String url = "http://api.data.go.kr/openapi/tn_pubr_public_elcty_car_chrstn_api?serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D&pageNo=1&numOfRows=100&type=xml";
                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){

                        Element eElement = (Element) nNode;
                        System.out.println("----------------------");
                        //System.out.println(eElement.getTextContent());
                        System.out.println("충전소명 : " + getTagValue("chrstnNm", eElement));
                        System.out.println("충전소위치상세 : " + getTagValue("chrstnLcDesc", eElement));
                        System.out.println("설치시도명 : " + getTagValue("instlCtprvnNm", eElement));
                        System.out.println("휴점일 : " + getTagValue("restde", eElement));
                        System.out.println("이용가능시작시각 : " + getTagValue("useOpenTime", eElement));
                        System.out.println("이용가능종료시각 : " + getTagValue("useCloseTime", eElement));
                        System.out.println("완속충전가능여부 : " + getTagValue("slowChrstnYn", eElement));
                        System.out.println("급속충전가능여부 : " + getTagValue("fastChrstnYn", eElement));
                        System.out.println("급속충전타입구분 : " + getTagValue("fastChrstnType", eElement));
                        System.out.println("완속충전기대수 : " + getTagValue("slowChrstnCo", eElement));
                        System.out.println("급속충전기대수 : " + getTagValue("fastChrstnCo", eElement));
                        System.out.println("주차료부과여부 : " + getTagValue("prkplceLevyYn", eElement));
                        System.out.println("소재지도로명주소 : " + getTagValue("rdnmadr", eElement));
                        System.out.println("소재지지번주소 : " + getTagValue("lnmadr", eElement));
                        System.out.println("관리업체명 : " + getTagValue("institutionNm", eElement));
                        System.out.println("관리업체전화번호 : " + getTagValue("phoneNumber", eElement));
                        System.out.println("위도 : " + getTagValue("latitude", eElement));
                        System.out.println("경도 : " + getTagValue("longitude", eElement));
                        System.out.println("데이터기준일자 : " + getTagValue("referenceDate", eElement));
                        System.out.println("제공기관코드 : " + getTagValue("insttCode", eElement));
                    }
                }
                page += 1;
                System.out.println("page number : "+page);
                if(page > 3){
                    break;
                }
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        System.out.println("######################");
        System.out.println("<전기자동차 충전소 정보>");
        page = 1;
        try{
            while(true){
                String url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D&pageNo=1&numOfRows=10&zcode=11";
                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){

                        Element eElement = (Element) nNode;
                        System.out.println("----------------------");
                        System.out.println("충전소명 : " + getTagValue("statNm", eElement));
                        System.out.println("충전소ID : " + getTagValue("statId", eElement));
                        System.out.println("충전기ID : " + getTagValue("chgerId", eElement));
                        System.out.println("충전기타입 : " + getTagValue("chgerType", eElement));
                        System.out.println("주소 : " + getTagValue("addr", eElement));
                        System.out.println("상세위치 : " + getTagValue("location", eElement));
                        System.out.println("위도 : " + getTagValue("lat", eElement));
                        System.out.println("경도 : " + getTagValue("lng", eElement));
                        System.out.println("이용가능시간 : " + getTagValue("useTime", eElement));
                        System.out.println("기관 아이디 : " + getTagValue("busiId", eElement));
                        System.out.println("기관명 : " + getTagValue("bnm", eElement));
                        System.out.println("운영기관명 : " + getTagValue("busiNm", eElement));
                        System.out.println("운영기관연락처 : " + getTagValue("busiCall", eElement));
                        System.out.println("충전기상태 : " + getTagValue("stat", eElement));
                        System.out.println("상태갱신일시 : " + getTagValue("statUpdDt", eElement));
                        System.out.println("마지막 충전시작일시 : " + getTagValue("lastTsdt", eElement));
                        System.out.println("마지막 충전종료일시 : " + getTagValue("lastTedt", eElement));
                        System.out.println("충전중 시작일시 : " + getTagValue("nowTsdt", eElement));
                        System.out.println("충전 타입 : " + getTagValue("powerType", eElement));
                        System.out.println("충전용량 : " + getTagValue("output", eElement));
                        System.out.println("충전방식 : " + getTagValue("method", eElement));
                        System.out.println("지역코드 : " + getTagValue("zcode", eElement));
                        System.out.println("주차료무료 : " + getTagValue("parkingFree", eElement));
                        System.out.println("충전소안내 : " + getTagValue("note", eElement));
                        System.out.println("이용자 제한 : " + getTagValue("limitYn", eElement));
                        System.out.println("이용제한 사유 : " + getTagValue("limitDetail", eElement));
                        System.out.println("삭제 여부 : " + getTagValue("delYn", eElement));
                        System.out.println("삭제 사유 : " + getTagValue("delDetail", eElement));
                    }
                }
                page += 1;
                System.out.println("page number : "+page);
                if(page > 3){
                    break;
                }
            }

        } catch (Exception e){
            e.printStackTrace();
        }
    }



}
