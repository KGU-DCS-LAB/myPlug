package receiver;

import main.DataManager;

import java.io.IOException;
import java.util.Scanner;

public class ReceiverController {

    public static ReceiverController getInstance() {
        return new ReceiverController();  // Singleton
    }

    public void start() throws IOException {
        Scanner scan = new Scanner(System.in);
        while (true) {
            System.out.println("-----------------------------");
            System.out.println("원하시는 API를 입력하세요");
            System.out.println("한국환경공단 : keco");
            System.out.println("한국전력공사 : kepco");
            System.out.println("전국전기차충전소표준데이터 : public");
            System.out.println("뒤로가기 : 이외의 글자 아무거나");
            System.out.println("-----------------------------");

            ReceiverDAO receiver = ReceiverDAO.getInstance();

            String mode = scan.next();
            switch (mode) {
                case "keco":
                    receiver.requestKECO();
                    DataManager.apiType=mode;
                    break;
                case "kepco":
                    receiver.requestKEPCO();
                    DataManager.apiType=mode;
                    break;
                case "public":
                    receiver.requestPUBLIC();
                    DataManager.apiType=mode;
                    break;
                default:
                    break;
            }
            break;
        }
    }

}
