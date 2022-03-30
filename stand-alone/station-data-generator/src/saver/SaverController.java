package saver;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import beans.StationBean;
import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import receiver.ReceiverController;

/**
 * 몽고DB 연결 시도했는데 연결은 잘 됨. 나중에 수정 필요함
 * Project Structure에서 라이브러리 등록하세요!!!!!!!
 *
 * */
public class SaverController {
    public static SaverController getInstance() {
        return new SaverController();  // Singleton
    }

    public void start(ArrayList<StationBean> stationList) {
        MongoClient mongo = new MongoClient("localhost", 27017);
        MongoCredential credential = MongoCredential.createCredential("sampleUser","myDb","password".toCharArray());
        System.out.println("Connected");
        MongoDatabase database = mongo.getDatabase("myplug");
        System.out.println("Collection created successfully");
        System.out.println("Credentials : "+credential);
        MongoCollection<Document> collection = database.getCollection("raw_charging_stations");
        System.out.println("Collection myCollection selected successfully");
        System.out.println("Document inserted successfully");
        System.out.println("약간의 시간이 걸립니다. 기다려주세요.");
        int count=0;
        for (StationBean s: stationList) {
            Document document = new Document("checked", s.getChecked())
                    .append("api", s.getApi())
                    .append("date", s.getDate())
                    .append("charging_station_name", s.getCharging_station_name())
                    .append("charging_station_location_detail", s.getCharging_station_location_detail())
                    .append("charging_station_location_latitude", s.getCharging_station_location_latitude())
                    .append("charging_station_location_longitude", s.getCharging_station_location_longitude())
                    ;
            collection.insertOne(document);
            count++;
        }
        System.out.println("총 "+count+"개 정보 저장 완료");
    }


    public static void main(String[] args) {
        MongoClient mongo = new MongoClient("localhost", 27017);
        MongoCredential credential = MongoCredential.createCredential("sampleUser","myDb","password".toCharArray());
        System.out.println("Connected");

        MongoDatabase database = mongo.getDatabase("myDb");
        System.out.println("Collection created successfully");

        System.out.println("Credentials : "+credential);
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