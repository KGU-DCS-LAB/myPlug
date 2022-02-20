package purifier;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class yeonsu {
    // tag값의 정보를 가져오는 메소드
    private static String getTagValue(String tag, Element eElement) {
        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
        Node nValue = (Node) nlList.item(0);
        if(nValue == null)
            return null;
        return nValue.getNodeValue();
    }

    public static void main(String[] args) {
        int page = 1;	// 페이지 초기값
        try{
            while(true){
                // parsing할 url 지정(API 키 포함해서)
                String url = "http://apis.data.go.kr/B552584/EvCharger/getChargerStatus?serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D&pageNo=1&numOfRows=10&period=5&zcode=11";

                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("items");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){

                        Element eElement = (Element) nNode;
                        System.out.println("######################");
                        //System.out.println(eElement.getTextContent());
                        System.out.println("기관아이디  : " + getTagValue("busiId", eElement));
                        System.out.println("충전소 ID  : " + getTagValue("statId", eElement));
                        System.out.println("충전기 ID : " + getTagValue("chgerId", eElement));
                        System.out.println("충전기 상태  : " + getTagValue("stat", eElement));
                        System.out.println("상태 갱신 일시 : " + getTagValue("statUpdDt", eElement));
                        System.out.println("마지막 충전시작 일시 : " + getTagValue("lastTsdt", eElement));
                    }	// for end
                }	// if end

                page += 1;
                System.out.println("page number : "+page);
                if(page > 12){
                    break;
                }
            }	// while end

        } catch (Exception e){
            e.printStackTrace();
        }	// try~catch end
    }	// main end
}
