package v2.analyzer;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import v2.DataManager;
import v2.common.KecoChargerInfoDTO;
import v2.common.MongoConfig;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Analyzer {
    MongoDatabase database;
    MongoCollection<Document> collection_stations_logs;
    ArrayList<KecoChargerInfoDTO> chargerInfoList = DataManager.chargerInfoList;
    List<Document> list_stations_logs = new ArrayList<Document>();
    String[] d = {"mon", "tue", "wed", "thu", "fri", "sat", "sun"};

    public static Analyzer getInstance() {
        return new Analyzer();  // Singleton
    }

    public void start() {
        database = MongoConfig.getInstance().config();
        collection_stations_logs = database.getCollection("stations_logs");
        insertExample();
        findLogs();
    }

    public void findLogs() {
        MongoCursor<Document> cursor = collection_stations_logs.find().iterator();
        try {
            while (cursor.hasNext()) {
                System.out.println(cursor.next().toJson());
            }
        } finally {
            cursor.close();
        }
    }

    public void insertExample() {
        for (KecoChargerInfoDTO ci : chargerInfoList) {
            Document station_log = new Document()
                    .append("statId", ci.getStatId());
            Document logs = new Document();
            for (int i = 0; i < 7; i++) {
                Document day = new Document();
                for (int j = 0; j < 24; j++) {
                    day.append(j + "", 0);
                }
                logs.append(d[i], day);
            }
            station_log.put("logs", logs); //json 내부 배열 넣을때 사용
            list_stations_logs.add(station_log);
        }
        collection_stations_logs.insertMany(list_stations_logs);
    }
}
