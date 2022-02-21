package main;

/**
 * API를 활용한 전기차 충전소 데이터 조회
 * 
 * 한번에 하나씩 작업이 가능하며
 * 1. 데이터를 수신받고
 * 2. 수신 받은 데이터를 정제하여
 * 3. 정제된 데이터를 DB로 저장
 * 이런 순서로 작업을 해야한다.
 * 
 * 지금은 일회성이지만, 앞으로는 자동화가 필요할 것으로 보임
 * */
import purifier.PurifierController;
import receiver.ReceiverController;

import java.io.IOException;
import java.util.Scanner;

public class DataManager {
    public static DataManager dataManager = new DataManager();
    public static String apiType = "api is not selected";
    public static String stationData="data is not received";

    public void run() throws IOException {
        Scanner scan = new Scanner(System.in);
        while (true) {
            System.out.println("[메뉴] 숫자를 입력 후 엔터를 누르세요. (순서대로 작업해야 합니다.)");
            System.out.println("1. API로부터 데이터 수신");
            System.out.println("2. 수신받은 데이터를 정리");
            System.out.println("3. 정리된 데이터를 저장");
            int mode = scan.nextInt();
            switch (mode) {
                case 1:
                    ReceiverController rc = ReceiverController.getInstance();
                    rc.start();
                    break;
                case 2:
                    PurifierController pc = PurifierController.getInstance();
                    pc.start(apiType,stationData);
                    break;
                case 3:
                    System.out.println("준비중");

                    break;
                default:
                    System.out.println("잘못된 입력입니다.");
                    break;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        dataManager.run();
    }
}
