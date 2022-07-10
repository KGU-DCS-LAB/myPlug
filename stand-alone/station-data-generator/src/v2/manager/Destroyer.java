package v2.manager;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import v2.DataManager;
import v2.common.ConsoleColor;
import v2.common.MongoConfig;

public class Destroyer {
    ConsoleColor cc = DataManager.cc;
    MongoDatabase database = MongoConfig.getInstance().config();
    MongoCollection<Document> collection_version;
    MongoCollection<Document> collection_raw;
    MongoCollection<Document> collection_stations;
    MongoCollection<Document> collection_chargers;
    long startTime, finishTime ,elapsedTime;

    public static Destroyer getInstance() {
        return new Destroyer();
    }
    public void removeStationRelatedDataAll(){
        collection_version = database.getCollection("version"); // 데이터 버전 관리용
        collection_raw = database.getCollection("raw_charger_infos");
        collection_stations = database.getCollection("stations");
        collection_chargers = database.getCollection("chargers");

        cc.print("warning","버전 삭제를 시도합니다..");
        startTime = System.currentTimeMillis();
        collection_version.drop();
        finishTime = System.currentTimeMillis();
        elapsedTime = finishTime - startTime;
        cc.print("success","삭제 완료.");
        cc.print("secondary", "수행에 걸린 시간 : "+elapsedTime+"ms\n");

        cc.print("warning","로우 데이터 삭제를 시도합니다..");
        startTime = System.currentTimeMillis();
        collection_raw.drop();
        finishTime = System.currentTimeMillis();
        elapsedTime = finishTime - startTime;
        cc.print("success","삭제 완료.");
        cc.print("secondary", "수행에 걸린 시간 : "+elapsedTime+"ms\n");

        cc.print("warning","충전소 데이터 삭제를 시도합니다..");
        startTime = System.currentTimeMillis();
        collection_stations.drop();
        finishTime = System.currentTimeMillis();
        elapsedTime = finishTime - startTime;
        cc.print("success","삭제 완료.");
        cc.print("secondary", "수행에 걸린 시간 : "+elapsedTime+"ms\n");

        cc.print("warning","충전기 데이터 삭제를 시도합니다..");
        startTime = System.currentTimeMillis();
        collection_chargers.drop();
        finishTime = System.currentTimeMillis();
        elapsedTime = finishTime - startTime;
        cc.print("success","삭제 완료.");
        cc.print("secondary", "수행에 걸린 시간 : "+elapsedTime+"ms\n");


        System.out.println("충전소와 관련된 데이터를 모두 삭제했습니다.");
    }
}
