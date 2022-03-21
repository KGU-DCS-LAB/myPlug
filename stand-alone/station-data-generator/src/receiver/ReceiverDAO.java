package receiver;

import beans.ChargerBean;
import beans.StationBean;
import main.DataManager;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.util.Date;

public class ReceiverDAO {
    public static ReceiverDAO getInstance() {
        return new ReceiverDAO();  // Singleton
    }


    ChargerBean charger = new ChargerBean();

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
//                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    StationBean station = new StationBean();
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){
                        Element eElement = (Element) nNode;

//                        DataManager.stationList.add(station);
                    }
                }
                page += 1;
//                System.out.println("page number : "+page);
                if(page > 12){
                    break;
                }
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        page = 1;
        try{
            while(true){
                String url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D&pageNo=1&numOfRows=10&zcode=11";
                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
//                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());


                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    StationBean station = new StationBean();
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){
                        Element eElement = (Element) nNode;
                        station.setCharging_station_name(getTagValue("statNm",eElement));   //충전소명
                        station.setCharging_station_location_detail(getTagValue("addr",eElement));  //충전소 주소
                        station.setCharging_station_location_latitude(getTagValue("lat",eElement)); //중천소 위치(위도)
                        station.setCharging_station_location_longitude(getTagValue("lng",eElement));//충전소 위치(경도)
                        station.setDate(new Date()); //수신 시각
                        station.setChecked(false); //업데이트 확인 여부
                        station.setApi("keco"); //수집된 api 종류
                        DataManager.stationList.add(station);
                    }
                }
                page += 1;
//                System.out.println("page number : "+page);
                if(page > 2){
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
//                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    StationBean station = new StationBean();
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){

                        Element eElement = (Element) nNode;
                        station.setCharging_station_name(getTagValue("csNm",eElement));
                        station.setCharging_station_location_detail(getTagValue("addr",eElement));
                        station.setCharging_station_location_latitude(getTagValue("lat",eElement));
                        station.setCharging_station_location_longitude(getTagValue("longi",eElement));
                        station.setDate(new Date()); //수신 시각
                        station.setChecked(false); //업데이트 확인 여부
                        station.setApi("kepco"); //수집된 api 종류
                        DataManager.stationList.add(station);
                    }
                }
                page += 1;
//                System.out.println("page number : "+page);
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
        try{
            while(true){
                String url = "http://api.data.go.kr/openapi/tn_pubr_public_elcty_car_chrstn_api?serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D&pageNo=1&numOfRows=100&type=xml";
                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
//                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    StationBean station = new StationBean();
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){
                        Element eElement = (Element) nNode;
                        station.setCharging_station_name(getTagValue("chrstnNm",eElement));
                        station.setCharging_station_location_detail(getTagValue("rdnmadr",eElement));
                        station.setCharging_station_location_latitude(getTagValue("latitude",eElement));
                        station.setCharging_station_location_longitude(getTagValue("longitude",eElement));
                        station.setDate(new Date()); //수신 시각
                        station.setChecked(false); //업데이트 확인 여부
                        station.setApi("public"); //수집된 api 종류
                        DataManager.stationList.add(station);
                    }
                }
                page += 1;
//                System.out.println("page number : "+page);
                if(page > 3){
                    break;
                }
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        page = 1;
        try{
            while(true){
                String url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=dg8oHXO5d9HkXM00ye%2Bvpwk1w16hxVZxN9UGvCFKA8kXtHQhTb6CJebWA2WZdMszfK%2B9HgoiqEYCB%2Bze2hFWMQ%3D%3D&pageNo=1&numOfRows=10&zcode=11";
                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
//                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("item");
                //System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    StationBean station = new StationBean();
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){
                        Element eElement = (Element) nNode;
                        station.setCharging_station_name(getTagValue("statNm",eElement));
                        station.setCharging_station_location_detail(getTagValue("addr",eElement));
                        station.setCharging_station_location_latitude(getTagValue("lat",eElement));
                        station.setCharging_station_location_longitude(getTagValue("lng",eElement));
                        station.setDate(new Date()); //수신 시각
                        station.setChecked(false); //업데이트 확인 여부
                        station.setApi("public"); //수집된 api 종류
                        DataManager.stationList.add(station);
                    }
                }
                page += 1;
//                System.out.println("page number : "+page);
                if(page > 3){
                    break;
                }
            }

        } catch (Exception e){
            e.printStackTrace();
        }
    }



}
