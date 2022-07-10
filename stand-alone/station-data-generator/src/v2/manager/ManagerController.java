package v2.manager;

import v2.DataManager;
import v2.common.ConsoleColor;
import v2.receiver.Receiver;

import java.util.Scanner;

public class ManagerController {
    Scanner scan = new Scanner(System.in);
    ConsoleColor cc = DataManager.cc;
    public static ManagerController getInstance() {
        return new ManagerController();
    }

    public boolean check(){
        cc.print("danger","정말로 수행하시겠습니까? 수행하신다면 콘솔 창에 yes를 입력 후 엔터를 눌러주세요");
        String check = scan.next();
        if(check.equals("yes")){
            return true;
        }
        else{
            System.out.println("잘못된 문자열을 입력했습니다.");
            return false;
        }
    }

    public void start(){
        System.out.println("WELCOME TO MANAGER MODE");
        while (true) {
            System.out.println("-----------------------------");
            System.out.println("원하시는 메뉴를 입력하세요");
            System.out.println("충전소 관련 데이터 초기화 : destroy stations");
            System.out.println("뒤로가기 : 이외의 글자 아무거나");
            System.out.println("-----------------------------");

            String mode = scan.next();
            switch (mode) { //위험한 작업일 수록 키워드를 길게 해주세요
                case "destroy stations":
                    if(check()){
                        System.out.println("충전기/충전소에 관련된 모든 데이터를 삭제합니다.");
                        Destroyer destroyer = new Destroyer();
                        destroyer.removeStationRelatedDataAll();
                    }
                    break;
                default:
                    break;
            }
            break;
        }
    }
}
