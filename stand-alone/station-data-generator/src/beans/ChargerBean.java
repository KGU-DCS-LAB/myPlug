package beans;

public class ChargerBean {
    private String id ="null"; //auto-increment
    private String charging_station_id ="null"; //충전소아이디
    private String type ="null"; //충전기 타입
    private String charger_id ="null"; //충전기아이디			
    private String name ="null"; //충전기명칭
    private String state_code ="null"; //충전기상태코드			
    private String charging_type ="null";//충전방식					
    private String capacity ="null"; //충전기용량
    private String charging_staiton_name ="null"; //충전소명칭
    private String state_update_time ="null"; //충전기상태갱신시각	
    private String last_charging_start_date_time ="null"; //마지막충전시작일시
    private String last_charging_end_date_time ="null";  //마지막충전종료일시
    private String start_charging_date_time ="null"; //충전중시작일시

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCharging_station_id() {
        return charging_station_id;
    }

    public void setCharging_station_id(String charging_station_id) {
        this.charging_station_id = charging_station_id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCharger_id() {
        return charger_id;
    }

    public void setCharger_id(String charger_id) {
        this.charger_id = charger_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState_code() {
        return state_code;
    }

    public void setState_code(String state_code) {
        this.state_code = state_code;
    }

    public String getCharging_type() {
        return charging_type;
    }

    public void setCharging_type(String charging_type) {
        this.charging_type = charging_type;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getCharging_staiton_name() {
        return charging_staiton_name;
    }

    public void setCharging_staiton_name(String charging_staiton_name) {
        this.charging_staiton_name = charging_staiton_name;
    }

    public String getState_update_time() {
        return state_update_time;
    }

    public void setState_update_time(String state_update_time) {
        this.state_update_time = state_update_time;
    }

    public String getLast_charging_start_date_time() {
        return last_charging_start_date_time;
    }

    public void setLast_charging_start_date_time(String last_charging_start_date_time) {
        this.last_charging_start_date_time = last_charging_start_date_time;
    }

    public String getLast_charging_end_date_time() {
        return last_charging_end_date_time;
    }

    public void setLast_charging_end_date_time(String last_charging_end_date_time) {
        this.last_charging_end_date_time = last_charging_end_date_time;
    }

    public String getStart_charging_date_time() {
        return start_charging_date_time;
    }

    public void setStart_charging_date_time(String start_charging_date_time) {
        this.start_charging_date_time = start_charging_date_time;
    }
}
