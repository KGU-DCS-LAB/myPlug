package v2.manager;

import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import v2.common.MongoConfig;

import java.util.Arrays;
import java.util.Collections;

public class InsertExample {
    public static InsertExample getInstance() {
        return new InsertExample();
    }

    MongoDatabase database;
    MongoCollection<Document> collection_stations_logs;

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
        Document canvas = new Document("item", "canvas")
                .append("qty", 100)
                .append("singletonList", Collections.singletonList("cotton")) //이거 쓰라는데 왜 쓰는지 아직도 모르겠음
                .append("asList", Arrays.asList("cotton","cot","dd")); //한 스키마 안에 배열 넣을때 사용

        Document mon = new Document("0", 10)
                .append("1", 33)
                .append("2", 5)
                .append("3", 55);
        Document tue = new Document("0", 0)
                .append("1", 33)
                .append("2", 77)
                .append("3", 6785);
        Document wed = new Document("0", 0)
                .append("1", 33)
                .append("2", 3345)
                .append("3", 55);
        Document days = new Document("mon", mon)
                .append("tue", tue)
                .append("wed", wed);

        canvas.put("days", days); //json 내부 배열 넣을때 사용

        collection_stations_logs.insertOne(canvas);
    }

}