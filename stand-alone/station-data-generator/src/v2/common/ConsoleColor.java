package v2.common;

import v2.manager.ManagerController;

public class ConsoleColor {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";

    public static ConsoleColor getInstance() {
        return new ConsoleColor();
    }

    public String print(String color, String text) {
        String prefix = ANSI_RESET;
        String postfix = ANSI_RESET;
        return prefix + text + postfix;
    }

    public String prefix() {
        return "";
    }

    public String postfix() {
        return "";
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
}
