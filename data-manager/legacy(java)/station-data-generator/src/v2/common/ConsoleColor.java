package v2.common;

import v2.manager.ManagerController;

public class ConsoleColor {
    public final String ANSI_RESET = "\u001B[0m";
    public final String ANSI_BLACK = "\u001B[30m";
    public final String ANSI_RED = "\u001B[31m";
    public final String ANSI_GREEN = "\u001B[32m";
    public final String ANSI_YELLOW = "\u001B[33m";
    public final String ANSI_BLUE = "\u001B[34m";
    public final String ANSI_PURPLE = "\u001B[35m";
    public final String ANSI_CYAN = "\u001B[36m";
    public final String ANSI_WHITE = "\u001B[37m";

    public final String ANSI_CLEAR = "\033[H\033[2J";

    public static ConsoleColor getInstance() {
        return new ConsoleColor();
    }

    public void print(String color, String text) {
        String prefix = easyColor(color);
        String postfix = ANSI_RESET;
        System.out.println(prefix + text + postfix);
    }

    public void prefix(String color) {
        System.out.println(easyColor(color));
    }

    public void postfix() {
        System.out.println(ANSI_RESET);
    }

    public String easyColor(String color) {
        String switched = ANSI_RESET;
        switch (color) {
            case "danger":
                switched = ANSI_RED;
                break;
            case "primary":
                switched = ANSI_BLUE;
                break;
            case "dark":
                switched = ANSI_BLACK;
                break;
            case "warning":
                switched = ANSI_YELLOW;
                break;
            case "success":
                switched = ANSI_GREEN;
                break;
            case "info":
                switched = ANSI_CYAN;
                break;
            case "secondary":
                switched = ANSI_PURPLE;
                break;
            case "white":
                switched = ANSI_WHITE;
                break;
            default:
                switched = ANSI_RESET;
                System.out.println("잘못된 텍스트 색상 변환 사용");
                break;
        }
        return switched;
    }

    public void bigPrint(String color, String text){
        String prefix = easyColor(color);
        String postfix = ANSI_RESET;
        System.out.println(prefix);
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println(text);
        System.out.println("************************************");
        System.out.println("************************************");
        System.out.println(postfix);
    }

    public void clear(){
        System.out.println(ANSI_CLEAR);
    }

}
