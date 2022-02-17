package purifier;

public class PurifierController {
    public static PurifierController getInstance() {
        return new PurifierController();  // Singleton
    }

    public void start(String apiType, String stationData){
        System.out.println(apiType);
        System.out.println(stationData);
        /**
         * 여기서부터 데이터 정제 작업(xml파싱)을 해주면 될 것 같음. 정제된 데이터는 ArrayList같은 걸로 리스트화 해서 바깥 메뉴에서 저장할 수 있도록 해야함
         * */
    }

}
