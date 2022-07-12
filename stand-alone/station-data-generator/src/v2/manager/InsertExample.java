package v2.manager;

import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import v2.common.MongoConfig;

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
                .append("tags", Collections.singletonList("cotton"));

        Document size = new Document("h", 28)
                .append("w", 35.5)
                .append("uom", "cm");
        canvas.put("size", size);

        collection_stations_logs.insertOne(canvas);
    }

}