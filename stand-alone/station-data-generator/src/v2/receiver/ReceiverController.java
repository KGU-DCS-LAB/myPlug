package v2.receiver;

import java.util.Scanner;

public class ReceiverController {
    public static ReceiverController getInstance() {
        return new ReceiverController();  // Singleton
    }

    public void start(){
        Scanner scan = new Scanner(System.in);
        while (true) {
            System.out.println("-----------------------------");
            System.out.println("원하시는 API를 입력하세요");
            System.out.println("한국환경공단 : keco");
            System.out.println("뒤로가기 : 이외의 글자 아무거나");
            System.out.println("-----------------------------");
            Receiver receiver = Receiver.getInstance();

            String mode = scan.next();
            switch (mode) {
                case "keco":
                    receiver.receiveKECO();
                    break;
                default:
                    break;
            }
            break;
        }
    }

}

