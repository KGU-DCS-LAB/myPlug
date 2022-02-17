package receiver;

import main.DataManager;

import java.io.IOException;
import java.util.Scanner;

/**
 * api에 요청을 보내는 역할을 함
 * api마다 요청 방법이 달라서 메소드 별로 분리해놨고
 * 수신 방법은 같아서 이것도 메소드화 함
 * 자세한 설명은 DAO에서 하겠음
 * */
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
            /**
             * 여기서 입력된 mode 값은 DataManager에 있는 apiType 변수에 저장됨.
             * 데이터 정제할 때 사용할 예정임.
             * */
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
