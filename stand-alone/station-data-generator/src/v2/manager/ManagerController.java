package v2.manager;

public class ManagerController {
    public static ManagerController getInstance() {
        return new ManagerController();
    }

    public void start(){
        System.out.println("WELCOME TO MANAGER MODE");
    }
}
