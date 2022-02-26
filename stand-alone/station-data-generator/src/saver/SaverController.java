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
        MongoCollection<Document> collection = database.getCollection("charging_stations");
        System.out.println("Collection myCollection selected successfully");
//https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=cc116105&logNo=221479553429


        System.out.println("Document inserted successfully");
        for (StationBean s: stationList) {
//            System.out.println(s.getCharging_station_name());
//            System.out.println(s.getCharging_station_location_detail());
//            System.out.println(s.getCharging_station_location_latitude());
//            System.out.println(s.getCharging_station_location_longitude());
            Document document = new Document("charging_station_name", s.getCharging_station_name())
                    .append("charging_station_location_detail", s.getCharging_station_location_detail())
                    .append("charging_station_location_latitude", s.getCharging_station_location_latitude())
                    .append("charging_station_location_longitude", s.getCharging_station_location_longitude());
            collection.insertOne(document);
        }
        System.out.println("저장 완료");
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
//https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=cc116105&logNo=221479553429
        Document document = new Document("title", "MongoDB")
                .append("id", 1)
                .append("description", "database")
                .append("likes", 100)
                .append("url", "http://www.tutorialspoint.com/mongodb/")
                .append("by", "tutorials point");
        collection.insertOne(document);

        System.out.println("Document inserted successfully");

    }

//    public static void main(String args[]){
//
//
//
//        String MongoDB_IP = "127.0.0.1";
//        int MongoDB_PORT = 27017;
//        String DB_NAME = "testDB";
//
//        //Connect to MongoDB
//        MongoClient  mongoClient = new MongoClient(new ServerAddress(MongoDB_IP, MongoDB_PORT));
////        DB db = mongoClient.getDB(DB_NAME);
////        MongoCredential credential = MongoCredential.createCredential();
//        MongoDatabase db = mongoClient.getDatabase(DB_NAME);
////        DBCollection collection = db.getCollection("schemas");
//
////        MongoCollection<Document> collection = db.getCollection();
//
//
////        //View Database List
////        List<String> databases = mongoClient.getDatabaseNames();
////
////        System.out.println("=====Database List===== ");
////        int num =1 ;
////        for (String dbName : databases) {
////            System.out.println( num  + ". " + dbName);
////            num++;
////        }
////
////        System.out.println();
////
////        //Connect Database and Show Collection List in Database
////        DB db = mongoClient.getDB(DB_NAME);
////        Set<String> collections = db.getCollectionNames();
////
////        System.out.println("Database : " + DB_NAME);
////        for (String colName : collections) {
////            System.out.println(" + Collection: " + colName);
////        }
//    }
    }