package v2;
import static com.mongodb.client.model.Filters.eq;

import v2.analyzer.Analyzer;
import v2.common.ConsoleColor;
import v2.common.KecoChargerInfoDTO;
import v2.manager.ManagerController;
import v2.receiver.ReceiverController;
import v2.saver.Saver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * API를 활용한 전기차 충전소 데이터 조회
 * <p>
 * 한번에 하나씩 작업이 가능하며
 * 1. 데이터를 수신받고
 * 2. 수신 받은 데이터를 정제하여
 * 3. 정제된 데이터를 DB로 저장
 * 이런 순서로 작업을 해야한다.
 * <p>
 * 지금은 일회성이지만, 앞으로는 자동화가 필요할 것으로 보임
 */


public class DataManager {
    public static DataManager dataManager = new DataManager();
    public static ArrayList<KecoChargerInfoDTO> chargerInfoList = new ArrayList<KecoChargerInfoDTO>();
    public static ConsoleColor cc = new ConsoleColor();
    long startTime, finishTime, elapsedTime;

    public void run() throws IOException {

        Scanner scan = new Scanner(System.in);
        while (true) {
            System.out.println("--------Version2 (Java17)-------");
            System.out.println("[메뉴] 숫자를 입력 후 엔터를 누르세요. (순서대로 작업해야 합니다.)");
            System.out.println("0. 프로그램 종료");
            System.out.println("1. API 서버로 부터 데이터 수신 후 클라우드로 저장하기 후 데이터 통계 분석하기");
//            System.out.println("2. 수신받은 데이터 분석하기");
            cc.print("danger", "8507. 고급모드");
            System.out.println("------------------------");
            int mode = scan.nextInt();
            switch (mode) {
                case 0:
                    cc.print("danger", "프로그램을 종료합니다.");
                    System.exit(0);
                    break;
                case 1:
                    startTime = System.currentTimeMillis();
                    chargerInfoList.clear();
                    ReceiverController rc2 = ReceiverController.getInstance();
                    rc2.start();
                    finishTime = System.currentTimeMillis();
                    elapsedTime = finishTime - startTime;
                    cc.print("secondary", "수행에 걸린 시간 : " + elapsedTime + "ms\n");
                    if (chargerInfoList.size() > 0) {

                        Saver sc = Saver.getInstance();
                        sc.start();

                        Analyzer analyzer = Analyzer.getInstance();
                        analyzer.start();

                        System.out.println("안전을 위해 프로그램을 종료합니다.");
                        System.exit(0);
                    } else {
                        cc.print("danger", "외부로부터 수신한 데이터가 없습니다.");
                    }
                    break;
//                case 2:
//                    if(chargerInfoList.size()>0){
//                        Analyzer analyzer = Analyzer.getInstance();
//                        analyzer.start();
//                    }
//                    else{
//                        cc.print("danger","외부로부터 수신한 데이터가 없습니다.");
//                    }
//                    break;
                case 8507:
                    ManagerController mc = ManagerController.getInstance();
                    mc.start();
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
