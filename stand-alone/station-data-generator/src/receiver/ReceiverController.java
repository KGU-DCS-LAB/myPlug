package receiver;

//import javax.swing.text.Document;
//import javax.swing.text.Element;
//import javax.xml.parsers.DocumentBuilder;
//import javax.xml.parsers.DocumentBuilderFactory;
//import javax.xml.soap.Node;

import java.util.Scanner;
//import receiver.ReceiverController;

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
            System.out.println("한국전력공사 : kepco");
            System.out.println("(일시중단) 전국전기차충전소표준데이터 : public");
            System.out.println("뒤로가기 : 이외의 글자 아무거나");
            System.out.println("-----------------------------");
            ReceiverDAO rd = ReceiverDAO.getInstance();

            String mode = scan.next();
            switch (mode) {
                case "keco":
                    rd.receiveKECO();
//                    rd.receiveKECO2();
                    break;
                case "kepco":
                    rd.receiveKEPCO();
                    break;
//                case "public":
//                    rd.receivePUBLIC();
//                    break;
                default:
                    break;
            }
            break;
        }
    }

}

