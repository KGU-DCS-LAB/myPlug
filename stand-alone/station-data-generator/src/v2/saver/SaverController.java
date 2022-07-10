package v2.saver;

//import com.mongodb.*;

import com.mongodb.*;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.model.InsertManyOptions;
import com.mongodb.client.model.UpdateOptions;
import org.bson.Document;
import org.bson.json.JsonObject;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import v2.dto.ChargerInfoDTO;

import java.util.*;

import static sun.text.normalizer.UTF16.append;

/**
 * 몽고DB 연결 시도했는데 연결은 잘 됨. 나중에 수정 필요함
 * Project Structure에서 라이브러리 등록하세요!!!!!!!
 */
public class SaverController {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";

    ArrayList<ChargerInfoDTO> chargerInfoList;

    MongoDatabase database;
    MongoCollection<Document> collection_version;
    MongoCollection<Document> collection_raw;
    List<Document> list_raw = new ArrayList<Document>();

    MongoCollection<Document> collection_stations;
    List<Document> list_stations = new ArrayList<Document>();

    MongoCollection<Document> collection_chargers;
    List<Document> list_chargers = new ArrayList<Document>();

    Set<String> duplicateStationSet = new HashSet<String>();

    int count = 0;
    int currentVersion = -1;
    int newVersion = 0;


    public static SaverController getInstance() {
        return new SaverController();  // Singleton
    }

    public void start(ArrayList<ChargerInfoDTO> chargerInfoList) {
        this.chargerInfoList = chargerInfoList;
        ConnectionString connectionString = new ConnectionString("mongodb+srv://gabrielyoon7:0000@gabrielyoon7.aq0fu.mongodb.net/myplug?retryWrites=true&w=majority");
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .serverApi(ServerApi.builder().version(ServerApiVersion.V1).build())
                .build();
        MongoClient mongo = MongoClients.create(settings);

        System.out.println("Connected");
        database = mongo.getDatabase("myplug");
        System.out.println("Collection created successfully");

        collection_version = database.getCollection("version"); // 데이터 버전 관리용
        Document version = collection_version.find().sort(new BasicDBObject("version", -1)).limit(1).first(); //현재 최신 버전 상태를 가져옴
        if (version != null) {
            JsonObject versionJSON = new JsonObject(version.toJson()); //JSON 파싱
            String versionStringJSON = versionJSON.getJson();
            try {
                JSONParser parser = new JSONParser();
                Object obj = parser.parse(versionStringJSON);
                JSONObject jsonObj = (JSONObject) obj;
                currentVersion = Integer.parseInt(jsonObj.get("version").toString()); //json으로 부터 현재 버전 값을 얻어옴
            } catch (Exception e) {
                System.out.println("버전 값 수신 중 오류가 발생했습니다.");
            }
        }
        System.out.println("current version is : " + currentVersion); //그래서 알게된 현재 버전

        newVersion = currentVersion + 1; //새로운 버전은 1 증가 시킴

        collection_raw = database.getCollection("raw_charger_infos");
        collection_stations = database.getCollection("stations");
        collection_chargers = database.getCollection("chargers");

        System.out.println("Collection myCollection selected successfully");
        System.out.println(ANSI_YELLOW);
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println("**약간의 시간이 걸립니다. 기다려주세요.**");
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println(ANSI_RESET);

        makeDocuments();
        updateDocuments();

        System.out.println(ANSI_CYAN + "오류 방지를 위해 프로그램을 종료해주세요." + ANSI_RESET);
    }

    public void makeDocuments() {
        int length = chargerInfoList.size();
        for (ChargerInfoDTO ci : chargerInfoList) {
            //Raw 데이터 정리
            Document document = new Document("checked", ci.getChecked())
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

            //충전소 데이터 정리
            if (!duplicateStationSet.contains(ci.getStatId() + "")) {
                Document document_stations = new Document()
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

            //충전기 데이터 정리
            Document document_chargers = new Document()
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

            count++;
            System.out.println("(" + count + "/" + length + ")" + ci.getStatNm() + "/" + ci.getChgerId());
        }

        System.out.println(ANSI_PURPLE);
        System.out.println("준비된 Raw 데이터 건수 : " + list_raw.size());
        System.out.println("준비된 충전소 데이터 건수 : " + list_stations.size());
        System.out.println("준비된 충전기 데이터 건수 : " + list_chargers.size());
        System.out.println(ANSI_RESET);

    }

    public void updateDocuments() {
        System.out.println(ANSI_GREEN + "Collection 구성 완료... MongoDB cluster로 데이터 입력을 시도합니다." + ANSI_RESET);
        System.out.println("새로운 데이터 버전은... " + newVersion + " 입니다.");
        System.out.println(ANSI_YELLOW);
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println("**약간의 시간이 걸립니다. 기다려주세요.**");
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println(ANSI_RESET);

        collection_version.insertOne(new Document("version", newVersion).append("date", new Date().toString()));
        System.out.println("버전이 " + newVersion + "으로 업데이트됨");

        System.out.println("새 raw 데이터 추가 중...");
        collection_raw.insertMany(list_raw); // raw 데이터는 그냥 추가해줘도 문제 없음
        System.out.println("새 raw 데이터 추가 완료!");
        System.out.println("새 충전소 데이터 추가 중...");
        collection_stations.insertMany(list_stations);
        System.out.println("새 충전소 데이터 추가 완료!");
        System.out.println("오래된 충전소 데이터 삭제중...");
        collection_stations.deleteMany(new Document("version", new Document("$eq", currentVersion)));
        System.out.println("오래된 충전소 데이터 삭제 완료!");
        System.out.println("새 충전기 데이터 추가 중...");
        collection_chargers.insertMany(list_chargers);
        System.out.println("새 충전기 데이터 추가 완료!");
        System.out.println("오래된 충전기 데이터 삭제중...");
        collection_chargers.deleteMany(new Document("version", new Document("$eq", currentVersion)));
        System.out.println("오래된 충전소 데이터 삭제 완료!");

        System.out.println(ANSI_GREEN + "총 " + count + "개 정보 저장 완료" + ANSI_RESET);
    }

}