package saver;
import java.util.List;
import java.util.Set;
import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
/**
 * 몽고DB 연결 시도했는데 연결은 잘 됨. 나중에 수정 필요함
 * Project Structure에서 라이브러리 등록하세요!!!!!!!
 *
 * */
public class SaverController {
    public static void main(String args[]){
        String MongoDB_IP = "127.0.0.1";
        int MongoDB_PORT = 27017;
        String DB_NAME = "testDB";

        //Connect to MongoDB
        MongoClient  mongoClient = new MongoClient(new ServerAddress(MongoDB_IP, MongoDB_PORT));

        //View Database List
        List<String> databases = mongoClient.getDatabaseNames();

        System.out.println("=====Database List===== ");
        int num =1 ;
        for (String dbName : databases) {
            System.out.println( num  + ". " + dbName);
            num++;
        }

        System.out.println();

        //Connect Database and Show Collection List in Database
        DB db = mongoClient.getDB(DB_NAME);
        Set<String> collections = db.getCollectionNames();

        System.out.println("Database : " + DB_NAME);
        for (String colName : collections) {
            System.out.println(" + Collection: " + colName);
        }
    }
    }