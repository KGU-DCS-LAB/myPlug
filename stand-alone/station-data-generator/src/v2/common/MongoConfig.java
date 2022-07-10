package v2.common;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoConfig {
    MongoDatabase database;
    public static MongoConfig getInstance() {
        return new MongoConfig();
    }
    public MongoDatabase config(){
        ConnectionString connectionString = new ConnectionString("mongodb+srv://gabrielyoon7:0000@gabrielyoon7.aq0fu.mongodb.net/myplug?retryWrites=true&w=majority");
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .serverApi(ServerApi.builder().version(ServerApiVersion.V1).build())
                .build();
        MongoClient mongo = MongoClients.create(settings);

        System.out.println("Connected");
        database = mongo.getDatabase("myplug");
        System.out.println("Collection created successfully");
        return database;
    }
}
