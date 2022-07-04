package v2.saver;

//import com.mongodb.*;
import com.mongodb.ConnectionString;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.MongoClientSettings;

import com.mongodb.client.model.InsertManyOptions;
import com.mongodb.client.model.UpdateOptions;
import org.bson.Document;
import v2.dto.ChargerInfoDTO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 몽고DB 연결 시도했는데 연결은 잘 됨. 나중에 수정 필요함
 * Project Structure에서 라이브러리 등록하세요!!!!!!!
 *
 * */
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

    public static SaverController getInstance() {
        return new SaverController();  // Singleton
    }

    public void start(ArrayList<ChargerInfoDTO> chargerInfoList) {
        ConnectionString connectionString = new ConnectionString("mongodb+srv://gabrielyoon7:0000@gabrielyoon7.aq0fu.mongodb.net/myplug?retryWrites=true&w=majority");
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .serverApi(ServerApi.builder()
                        .version(ServerApiVersion.V1)
                        .build())
                .build();
        MongoClient mongo = MongoClients.create(settings);

        System.out.println("Connected");
        MongoDatabase database = mongo.getDatabase("myplug");
        System.out.println("Collection created successfully");

        MongoCollection<Document> collection = database.getCollection("raw_charger_infos");
        List<Document> list = new ArrayList<Document>();

//        MongoCollection<Document> collection_stations = database.getCollection("stations");
//        List<Document> list_stations = new ArrayList<Document>();
//
//        MongoCollection<Document> collection_chargers = database.getCollection("chargers");
//        List<Document> list_chargers = new ArrayList<Document>();

        System.out.println("Collection myCollection selected successfully");
        System.out.println(ANSI_YELLOW);
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println("**약간의 시간이 걸립니다. 기다려주세요.**");
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println(ANSI_RESET);
        int count=0;
        int length = chargerInfoList.size();
        for (ChargerInfoDTO ci: chargerInfoList) {
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
                    ;
            list.add(document);

//            //충전소 데이터 정리
//            Document document_stations = new Document()
//                    .append("api", ci.getApi())
//                    .append("date", ci.getDate())
//                    .append("statNm", ci.getStatNm())
//                    .append("statId", ci.getStatId())
//                    .append("addr", ci.getAddr())
//                    .append("lat", ci.getLat())
//                    .append("lng", ci.getLng())
//                    .append("useTime", ci.getUseTime())
//                    .append("busiId", ci.getBusiId())
//                    .append("busiNm", ci.getBusiNm())
//                    .append("busiCall", ci.getBusiCall())
//                    .append("zcode", ci.getZcode())
//                    .append("parkingFree", ci.getParkingFree())
//                    .append("note", ci.getNote())
//                    ;
//            list_stations.add(document_stations);
//
//
//            //충전기 데이터 정리
//            Document document_chargers = new Document()
//                    .append("api", ci.getApi())
//                    .append("date", ci.getDate())
//                    .append("statNm", ci.getStatNm())
//                    .append("statId", ci.getStatId())
//                    .append("chgerId", ci.getChgerId())
//                    .append("chgerType", ci.getChgerType())
//                    .append("stat", ci.getStat())
//                    .append("statUpdDt", ci.getStatUpdDt())
//                    .append("powerType", ci.getPowerType())
//                    .append("zcode", ci.getZcode())
//                    ;
//            list_chargers.add(document_chargers);
            
            
            count++;
            System.out.println("("+count+"/"+length+")"+ci.getStatNm()+"/"+ci.getChgerId());
        }
        System.out.println(ANSI_GREEN+"Collection 구성 완료... MongoDB cluster로 데이터 입력을 시도합니다."+ANSI_RESET);
        System.out.println(ANSI_YELLOW);
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println("**약간의 시간이 걸립니다. 기다려주세요.**");
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println(ANSI_RESET);
        collection.insertMany(list); // raw 데이터는 그냥 추가해줘도 문제 없음
//        collection_stations.updateMany(new Document(),new Document(),new UpdateOptions().upsert(true));
//        collection_stations.updateMany(list_stations);
//        collection_chargers.updateMany(list_chargers);
        System.out.println(ANSI_GREEN+"총 "+count+"개 정보 저장 완료"+ANSI_RESET);
        System.out.println(ANSI_CYAN+"오류 방지를 위해 프로그램을 종료해주세요."+ANSI_RESET);
    }

    public static void main(String[] args) {
        ConnectionString connectionString = new ConnectionString("mongodb+srv://gabrielyoon7:0000@gabrielyoon7.aq0fu.mongodb.net/myplug?retryWrites=true&w=majority");
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .serverApi(ServerApi.builder()
                        .version(ServerApiVersion.V1)
                        .build())
                .build();
        MongoClient mongo = MongoClients.create(settings);

        System.out.println("Connected");

        MongoDatabase database = mongo.getDatabase("myDb");
        System.out.println("Collection created successfully");

//        System.out.println("Credentials : "+credential);
        MongoCollection<Document> collection = database.getCollection("myCollection");
        System.out.println("Collection myCollection selected successfully");
        Document document = new Document("title", "MongoDB")
                .append("id", 1)
                .append("description", "database")
                .append("likes", 100)
                .append("url", "http://www.tutorialspoint.com/mongodb/")
                .append("by", "tutorials point");
        collection.insertOne(document);

        System.out.println("Document inserted successfully");

    }

}