package v2.analyzer;

import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.json.JsonObject;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import v2.DataManager;
import v2.common.KecoChargerInfoDTO;
import v2.common.MongoConfig;
import v2.common.StationLogDTO;

import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

public class Analyzer {
    MongoDatabase database;
    MongoCollection<Document> collection_version, collection_stations_logs;
    ArrayList<KecoChargerInfoDTO> chargerInfoList = DataManager.chargerInfoList;
    ArrayList<StationLogDTO> stationsLogList = new ArrayList<StationLogDTO>();
    List<Document> list_stations_logs = new ArrayList<Document>();
    String[] d = {"mon", "tue", "wed", "thu", "fri", "sat", "sun"};
    String day = null;
    int hour = -1;


    public static Analyzer getInstance() {
        return new Analyzer();  // Singleton
    }

    public void start() {
        database = MongoConfig.getInstance().config();
        getDateValueByVersion();
        updateLogs();
    }

    public void getDateValueByVersion() {
        collection_version = database.getCollection("version"); // 데이터 버전 관리용
        Document version = collection_version.find().sort(new BasicDBObject("version", -1)).limit(1).first(); //현재 최신 버전 상태를 가져옴
        if (version != null) { //version이 없다면 == 초기상태라면
            JsonObject versionJSON = new JsonObject(version.toJson()); //JSON 파싱
            String versionStringJSON = versionJSON.getJson();
            try {
                JSONParser parser = new JSONParser();
                Object obj = parser.parse(versionStringJSON);
                JSONObject jsonObj = (JSONObject) obj;
                day = jsonObj.get("day").toString(); //json으로 부터 마지막으로 저장된 시간 값을 얻어옴
                hour = Integer.parseInt(jsonObj.get("hour").toString()); //json으로 부터 마지막으로 저장된 시간 값을 얻어옴
                System.out.println(day + " " + hour);
            } catch (Exception e) {
                System.out.println("버전 값 처리 중 오류가 발생했습니다.");
            }
        }
    }


    public void updateLogs() {
        collection_stations_logs = database.getCollection("stations_logs");
        MongoCursor<Document> cursor = collection_stations_logs.find().iterator();
        if (cursor.hasNext()) {
            try {
                while (cursor.hasNext()) {
//                    System.out.println(cursor.next().toJson());
                    JsonObject logJSON = new JsonObject(cursor.next().toJson()); //JSON 파싱
                    String logStringJSON = logJSON.getJson();
                    try {
                        JSONParser parser = new JSONParser();
                        Object obj = parser.parse(logStringJSON);
                        JSONObject jsonObj = (JSONObject) obj;
                        String statId = jsonObj.get("statId").toString();

                        JSONParser parser2 = new JSONParser();
                        Object obj2 = parser2.parse(jsonObj.get("logs").toString());
                        JSONObject jsonObj2 = (JSONObject) obj2;

                        StationLogDTO log = new StationLogDTO();
                        log.setStatId(statId);
                        log.setMon(jsonObj2.get("mon").toString());
                        log.setTue(jsonObj2.get("tue").toString());
                        log.setWed(jsonObj2.get("wed").toString());
                        log.setThu(jsonObj2.get("thu").toString());
                        log.setFri(jsonObj2.get("fri").toString());
                        log.setSat(jsonObj2.get("sat").toString());
                        log.setSun(jsonObj2.get("sun").toString());

                        stationsLogList.add(log);
                    } catch (Exception e) {
                        System.out.println("버전 값 처리 중 오류가 발생했습니다.");
                    }
                }
                for (StationLogDTO sl : stationsLogList) {
                    System.out.println(sl.getStatId());
                    System.out.println(sl.getSat());
                }
            } catch (Exception e) {
                System.out.println(e);
            } finally {
                cursor.close();
            }
        } else {
            System.out.println("아무것도 없으므로 기본 데이터 추가!");
            insertDefaultLogs();
        }
    }

    public void insertDefaultLogs() {
        for (KecoChargerInfoDTO ci : chargerInfoList) {
            Document station_log = new Document()
                    .append("statId", ci.getStatId());
            Document logs = new Document();
            for (int i = 0; i < 7; i++) {
                Document day = new Document();
                for (int j = 0; j < 24; j++) {
                    if (d[i].equals(this.day) && j == hour) {
                        day.append(j + "", 1);
                    } else {
                        day.append(j + "", 0);
                    }
                }
                logs.append(d[i], day);
            }
            station_log.put("logs", logs); //json 내부 배열 넣을때 사용
            list_stations_logs.add(station_log);
        }
        System.out.println("기본 데이터 생성 완료... 서버로 입력 시도!");
        collection_stations_logs.insertMany(list_stations_logs);
    }
}
