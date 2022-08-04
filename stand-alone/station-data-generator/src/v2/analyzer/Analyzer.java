package v2.analyzer;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.lte;

import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import org.bson.Document;
import org.bson.json.JsonObject;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import v2.DataManager;
import v2.common.KecoChargerInfoDTO;
import v2.common.MongoConfig;
import v2.common.StationLogDTO;

import java.util.*;

public class Analyzer {
    MongoDatabase database;
    MongoCollection<Document> collection_version, collection_stations_logs;
    ArrayList<KecoChargerInfoDTO> chargerInfoList = DataManager.chargerInfoList;
    ArrayList<StationLogDTO> stationsLogList = new ArrayList<StationLogDTO>();
    List<Document> list_stations_logs = new ArrayList<Document>();
    String[] d = {"mon", "tue", "wed", "thu", "fri", "sat", "sun"};
    String day, week = null;
    int hour = -1;

    public static Analyzer getInstance() {
        return new Analyzer();  // Singleton
    }

    public void start() {
        database = MongoConfig.getInstance().config();
        getDateValueByVersion();
        updateNewLogs();
        deleteOlgLogs();
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
                week = jsonObj.get("week").toString(); //json으로 부터 마지막으로 저장된 주 값을 얻어옴 (연도+주차 순으로 보임)
                System.out.println(day + " " + hour);
            } catch (Exception e) {
                System.out.println("버전 값 처리 중 오류가 발생했습니다.");
            }
        }
    }

    public void updateNewLogs() { //코드 정리가 필요한 부분!
        collection_stations_logs = database.getCollection("stations_logs");
        MongoCursor<Document> cursor = collection_stations_logs.find(eq("week", "" + this.week)).iterator();
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
                        String chgerId = jsonObj.get("chgerId").toString();
                        String week = jsonObj.get("week").toString();
                        JSONParser parser2 = new JSONParser();
                        Object obj2 = parser2.parse(jsonObj.get("logs").toString());
                        JSONObject jsonObj2 = (JSONObject) obj2;

                        StationLogDTO log = new StationLogDTO();
                        log.setUniqueId(statId+chgerId);
                        log.setStatId(statId);
                        log.setChgerId(chgerId);
                        log.setWeek(week);
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

                System.out.println("stationsLogList size : "+stationsLogList.size());

                for (KecoChargerInfoDTO ci : chargerInfoList) {
                    StationLogDTO sl = findStationsLogByUniqueId(stationsLogList, ci.getStatId() + ci.getChgerId());
                    if(sl==null){
                        Document station_log = new Document()
                                .append("statId", ci.getStatId())
                                .append("chgerId", ci.getChgerId())
                                .append("week", this.week);
                        Document logs = new Document();
                        for (int i = 0; i < 7; i++) {
                            Document day = new Document();
                            for (int j = 0; j < 24; j++) {
                                if (ci.getStat().equals("3") && d[i].equals(this.day) && j == hour) {
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
                }

                for (StationLogDTO sl : stationsLogList) {
                    KecoChargerInfoDTO ci = findKecoChargerInfoByUniqueId(chargerInfoList, sl.getStatId() + sl.getChgerId());
                    if (ci != null) {
                        Document station_log = new Document()
                                .append("statId", sl.getStatId())
                                .append("chgerId", sl.getChgerId())
                                .append("week", sl.getWeek());
                        Document logs = new Document();
                        for (int i = 0; i < 7; i++) {
                            Document day = new Document();
                            String temp;
                            switch (d[i]) {
                                case "mon":
                                    temp = sl.getMon();
                                    break;
                                case "tue":
                                    temp = sl.getTue();
                                    break;
                                case "wed":
                                    temp = sl.getWed();
                                    break;
                                case "thu":
                                    temp = sl.getThu();
                                    break;
                                case "fri":
                                    temp = sl.getFri();
                                    break;
                                case "sat":
                                    temp = sl.getSat();
                                    break;
                                case "sun":
                                    temp = sl.getSun();
                                    break;
                                default:
                                    temp = "error";
                                    break;
                            }

                            JSONParser parser3 = new JSONParser();
                            Object obj3 = parser3.parse(temp);
                            JSONObject jsonObj3 = (JSONObject) obj3;
                            for (int j = 0; j < 24; j++) {
                                String count = jsonObj3.get(j + "").toString();
                                if (ci.getStat().equals("3") && d[i].equals(this.day) && j == hour) {
//                                day.append(j + "", "" + (Integer.parseInt(count) + 1));
                                    day.append(j + "", "1"); //사용중이라면 일단 1로 만들어버림
                                } else { //갑자기 지금 사용중이 아니라도 원본 훼손 x (일단 이 시간대에 사용했으면 계속 사용한걸로 취급해버림)
                                    day.append(j + "", count);
                                }
                            }
                            logs.append(d[i], day);
                        }
                        station_log.put("logs", logs); //json 내부 배열 넣을때 사용
                        list_stations_logs.add(station_log);
                    } else {
//                        조회 실패 시 기본 데이터 추가하는 작업을 해줘야 하는데 오늘은 시간이 없으므로 나중에 수정하기
                        System.out.println("조회 실패!  " + sl.getStatId() + sl.getChgerId());

//                        Document station_log = new Document()
//                                .append("statId", sl.getStatId())
//                                .append("chgerId", sl.getChgerId())
//                                .append("week", sl.getWeek());
//                        Document logs = new Document();
//                        for (int i = 0; i < 7; i++) {
//                            Document day = new Document();
//                            String temp;
//                            switch (d[i]) {
//                                case "mon":
//                                    temp = sl.getMon();
//                                    break;
//                                case "tue":
//                                    temp = sl.getTue();
//                                    break;
//                                case "wed":
//                                    temp = sl.getWed();
//                                    break;
//                                case "thu":
//                                    temp = sl.getThu();
//                                    break;
//                                case "fri":
//                                    temp = sl.getFri();
//                                    break;
//                                case "sat":
//                                    temp = sl.getSat();
//                                    break;
//                                case "sun":
//                                    temp = sl.getSun();
//                                    break;
//                                default:
//                                    temp = "error";
//                                    break;
//                            }
//
//                            JSONParser parser3 = new JSONParser();
//                            Object obj3 = parser3.parse(temp);
//                            JSONObject jsonObj3 = (JSONObject) obj3;
//                            for (int j = 0; j < 24; j++) {
//                                String count = jsonObj3.get(j + "").toString();
//                                if (ci.getStat().equals("3") && d[i].equals(this.day) && j == hour) {
////                                day.append(j + "", "" + (Integer.parseInt(count) + 1));
//                                    day.append(j + "", "1"); //사용중이라면 일단 1로 만들어버림
//                                } else { //갑자기 지금 사용중이 아니라도 원본 훼손 x (일단 이 시간대에 사용했으면 계속 사용한걸로 취급해버림)
//                                    day.append(j + "", count);
//                                }
//                            }
//                            logs.append(d[i], day);
//                        }
//                        station_log.put("logs", logs); //json 내부 배열 넣을때 사용
//                        list_stations_logs.add(station_log);


                    }
                }
                collection_stations_logs.deleteMany(eq("week", "" + this.week)); //이번 주 데이터만 업데이트 한다
                collection_stations_logs.insertMany(list_stations_logs);
                System.out.println("list_stations_logs size : "+list_stations_logs.size());
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

    public static KecoChargerInfoDTO findKecoChargerInfoByUniqueId(Collection<KecoChargerInfoDTO> listChargerInfo, String uniqueId) { //java 8 이상에서만 사용 가능한 steam 기능 추가
        return listChargerInfo.stream().filter(chargerInfo -> uniqueId.equals(chargerInfo.getUniqueId())).findFirst().orElse(null);
    }

    public static StationLogDTO findStationsLogByUniqueId(Collection<StationLogDTO> listStationLog, String uniqueId) { //java 8 이상에서만 사용 가능한 steam 기능 추가
        return listStationLog.stream().filter(station_log -> uniqueId.equals(station_log.getUniqueId())).findFirst().orElse(null);
    }

    public void insertDefaultLogs() {
        for (KecoChargerInfoDTO ci : chargerInfoList) {
            Document station_log = new Document()
                    .append("statId", ci.getStatId())
                    .append("chgerId", ci.getChgerId())
                    .append("week", this.week);
            Document logs = new Document();
            for (int i = 0; i < 7; i++) {
                Document day = new Document();
                for (int j = 0; j < 24; j++) {
                    if (ci.getStat().equals("3") && d[i].equals(this.day) && j == hour) {
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

    public void deleteOlgLogs() {
        ArrayList<String> versionedWeeks = new ArrayList<>();
        collection_stations_logs = database.getCollection("stations_logs");
        collection_stations_logs.aggregate(
                Arrays.asList(
                        Aggregates.group("$week")
                )
        ).forEach(doc -> versionedWeeks.add(getValueFromJSON(doc.toJson())));
        if(versionedWeeks.size()>5){
            Collections.sort(versionedWeeks);
            Collections.reverse(versionedWeeks);
            //versionedWeeks 사이즈 검사 후, 5보다 크다면 나머지 drop 하는 작업 진행해야 함
            String value5th = versionedWeeks.get(5);
            System.out.println("5th value : "+value5th);
            collection_stations_logs.deleteMany(lte("week", value5th)); //오래된 데이터 삭제
        }
//        for (String week: versionedWeeks) {
//            System.out.println(week);
//        }
    }

    public String getValueFromJSON(String json){
        JsonObject versionWeekJSON = new JsonObject(json); //JSON 파싱
        String versionWeekStringJSON = versionWeekJSON.getJson();
        try {
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(versionWeekStringJSON);
            JSONObject jsonObj = (JSONObject) obj;
            return jsonObj.get("_id").toString(); //json으로 부터 마지막으로 저장된 시간 값을 얻어옴
        } catch (Exception e) {
            System.out.println("버전 값 처리 중 오류가 발생했습니다.");
        }
        return "";
    }

}
