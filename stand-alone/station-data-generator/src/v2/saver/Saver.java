package v2.saver;

//import com.mongodb.*;

import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.json.JsonObject;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import v2.DataManager;
import v2.common.ConsoleColor;
import v2.common.MongoConfig;
import v2.dto.ChargerInfoDTO;

import java.util.*;

/**
 * 몽고DB 연결 시도했는데 연결은 잘 됨. 나중에 수정 필요함
 * Project Structure에서 라이브러리 등록하세요!!!!!!!
 */
public class Saver {

    ConsoleColor cc = DataManager.cc;
    ArrayList<ChargerInfoDTO> chargerInfoList = DataManager.chargerInfoList;
    MongoDatabase database;
    MongoCollection<Document> collection_version, collection_raw, collection_stations, collection_chargers;
    List<Document> list_raw = new ArrayList<Document>();
    List<Document> list_stations = new ArrayList<Document>();
    List<Document> list_chargers = new ArrayList<Document>();
    Set<String> duplicateStationSet = new HashSet<String>();

    int count = 0;
    int currentVersion = -1;
    int newVersion = 0;
    long startTime, finishTime ,elapsedTime;

    public static Saver getInstance() {
        return new Saver();  // Singleton
    }

    public void start() {
        database = MongoConfig.getInstance().config();
        versionControl(); //버전 관리
        makeDocuments(); //저장할 문서를 Document화
        updateDocuments(); //Document를 클라우드로 전송
        cc.print("info", "오류 방지를 위해 프로그램을 종료해주세요.");

    }

    public void versionControl() {
        collection_version = database.getCollection("version"); // 데이터 버전 관리용
        Document version = collection_version.find().sort(new BasicDBObject("version", -1)).limit(1).first(); //현재 최신 버전 상태를 가져옴
        if (version != null) { //version이 없다면 == 초기상태라면
            JsonObject versionJSON = new JsonObject(version.toJson()); //JSON 파싱
            String versionStringJSON = versionJSON.getJson();
            try {
                JSONParser parser = new JSONParser();
                Object obj = parser.parse(versionStringJSON);
                JSONObject jsonObj = (JSONObject) obj;
                currentVersion = Integer.parseInt(jsonObj.get("version").toString()); //json으로 부터 현재 버전 값을 얻어옴
            } catch (Exception e) {
                System.out.println("버전 값 처리 중 오류가 발생했습니다.");
            }
        }
        System.out.println("current version is : " + currentVersion); //그래서 알게된 현재 버전

        newVersion = currentVersion + 1; //앞으로 저장할 새로운 버전은 1 증가 시킴
    }

    public void makeDocuments() {

        cc.prefix("warning");
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println("**약간의 시간이 걸립니다. 기다려주세요.**");
        System.out.println("************************************");
        System.out.println("************************************");
        cc.postfix();

        collection_raw = database.getCollection("raw_charger_infos");
        collection_stations = database.getCollection("stations");
        collection_chargers = database.getCollection("chargers");
        System.out.println("Collection selected successfully");

        int length = chargerInfoList.size();
        for (ChargerInfoDTO ci : chargerInfoList) {
            //Raw 데이터 정리
            addRawDocument(ci);

            //충전소 데이터 정리
            if (!duplicateStationSet.contains(ci.getStatId() + "")) {
                addStationDocument(ci);
            }

            //충전기 데이터 정리
            addChargerDocument(ci);

            count++;
            System.out.println("(" + count + "/" + length + ")" + ci.getStatNm() + "/" + ci.getChgerId());
        }

        cc.print("secondary", "준비된 Raw 데이터 건수 : " + list_raw.size());
        cc.print("secondary", "준비된 충전소 데이터 건수 : " + list_stations.size());
        cc.print("secondary", "준비된 충전기 데이터 건수 : " + list_chargers.size());

    }

    public void addRawDocument(ChargerInfoDTO ci) {
        Document document = new Document("_id", ci.getStatId()+ci.getChgerId()+ci.getDate())
                .append("api", ci.getApi())
                .append("date", ci.getDate())
                .append("statNm", ci.getStatNm())
                .append("statId", ci.getStatId())
                .append("chgerId", ci.getChgerId())
                .append("chgerType", ci.getChgerType())
                .append("addr", ci.getAddr())
                .append("lat", ci.getLat())
                .append("lng", ci.getLng())
                .append("useTime", ci.getUseTime())
                .append("busiId", ci.getBusiId())
                .append("busiNm", ci.getBusiNm())
                .append("busiCall", ci.getBusiCall())
                .append("stat", ci.getStat())
                .append("statUpdDt", ci.getStatUpdDt())
                .append("powerType", ci.getPowerType())
                .append("zcode", ci.getZcode())
                .append("parkingFree", ci.getParkingFree())
                .append("note", ci.getNote())
                .append("version", newVersion);
        list_raw.add(document);
    }

    public void addStationDocument(ChargerInfoDTO ci) {
        Document document_stations = new Document("_id", ci.getStatId()+ci.getChgerId()+ci.getDate())
                .append("api", ci.getApi())
                .append("date", ci.getDate())
                .append("statNm", ci.getStatNm())
                .append("statId", ci.getStatId())
                .append("addr", ci.getAddr())
                .append("lat", ci.getLat())
                .append("lng", ci.getLng())
                .append("useTime", ci.getUseTime())
                .append("busiId", ci.getBusiId())
                .append("busiNm", ci.getBusiNm())
                .append("busiCall", ci.getBusiCall())
                .append("zcode", ci.getZcode())
                .append("parkingFree", ci.getParkingFree())
                .append("note", ci.getNote())
                .append("version", newVersion);
        list_stations.add(document_stations);
        duplicateStationSet.add(ci.getStatId());
    }

    public void addChargerDocument(ChargerInfoDTO ci) {
        Document document_chargers = new Document("_id", ci.getStatId()+ci.getChgerId()+ci.getDate())
                .append("api", ci.getApi())
                .append("date", ci.getDate())
                .append("statNm", ci.getStatNm())
                .append("statId", ci.getStatId())
                .append("chgerId", ci.getChgerId())
                .append("chgerType", ci.getChgerType())
                .append("stat", ci.getStat())
                .append("statUpdDt", ci.getStatUpdDt())
                .append("powerType", ci.getPowerType())
                .append("zcode", ci.getZcode())
                .append("version", newVersion);
        list_chargers.add(document_chargers);
    }

    public void updateDocuments() {
        cc.print("success", "Collection 구성 완료... MongoDB cluster로 데이터 입력을 시도합니다.");
        System.out.println("새로운 데이터 버전은... " + newVersion + " 입니다.");
        cc.bigPrint("warning", "**약간의 시간이 걸립니다. 기다려주세요.**");

        startTime = System.currentTimeMillis();
        collection_version.insertOne(new Document("version", newVersion).append("date", new Date().toString()));
        finishTime = System.currentTimeMillis();
        elapsedTime = finishTime - startTime;
        System.out.println("버전이 " + currentVersion + "에서 " + newVersion + "으로 업데이트됨");
        cc.print("secondary", "수행에 걸린 시간 : "+elapsedTime+"ms\n");

        cc.print("warning", "새 raw 데이터 추가 중...");
        startTime = System.currentTimeMillis();
        if (list_raw.size() > 0) {
            collection_raw.insertMany(list_raw); // raw 데이터는 그냥 추가해줘도 문제 없음
        }
        finishTime = System.currentTimeMillis();
        elapsedTime = finishTime - startTime;
        cc.print("success", "새 raw 데이터 추가 완료!");
        cc.print("secondary", "수행에 걸린 시간 : "+elapsedTime+"ms\n");

        cc.print("warning", "새 충전소 데이터 추가 중...");
        startTime = System.currentTimeMillis();
        if (list_stations.size() > 0) {
            collection_stations.insertMany(list_stations);
        }
        finishTime = System.currentTimeMillis();
        elapsedTime = finishTime - startTime;
        cc.print("success", "새 충전소 데이터 추가 완료!");
        cc.print("secondary", "수행에 걸린 시간 : "+elapsedTime+"ms\n");


        cc.print("warning", "오래된 충전소 데이터 삭제중...");
        startTime = System.currentTimeMillis();
        collection_stations.deleteMany(new Document("version", new Document("$eq", currentVersion)));
        finishTime = System.currentTimeMillis();
        elapsedTime = finishTime - startTime;
        cc.print("success", "오래된 충전소 데이터 삭제 완료!");
        cc.print("secondary", "수행에 걸린 시간 : "+elapsedTime+"ms\n");

        cc.print("warning", "새 충전기 데이터 추가 중...");
        startTime = System.currentTimeMillis();
        if (list_chargers.size() > 0) {
            collection_chargers.insertMany(list_chargers);
        }
        finishTime = System.currentTimeMillis();
        elapsedTime = finishTime - startTime;
        cc.print("success", "새 충전기 데이터 추가 완료!");
        cc.print("secondary", "수행에 걸린 시간 : "+elapsedTime+"ms\n");

        cc.print("warning", "오래된 충전기 데이터 삭제중...");
        startTime = System.currentTimeMillis();
        collection_chargers.deleteMany(new Document("version", new Document("$eq", currentVersion)));
        finishTime = System.currentTimeMillis();
        elapsedTime = finishTime - startTime;
        cc.print("success", "오래된 충전소 데이터 삭제 완료!");
        cc.print("secondary", "수행에 걸린 시간 : "+elapsedTime+"ms\n");

        cc.print("success", "새로 수신한 데이터 " + count + "개 처리 완료..!");
    }

}