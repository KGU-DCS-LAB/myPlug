package beans;

public class StationBean {
//    private String id="null"; // auto-increment
    private String charging_station_name="null"; //충전소명
//    private String charging_station_id="null"; //충전소ID
//    private String region_code ="null"; //지역코드
//    private String charging_station_location_street ="null"; //충전소위치(도로명주소)
//    private String charging_station_location_land ="null"; //충전소위치(지번주소)
    private String charging_station_location_detail ="null"; //충전소 상세위치
    private String charging_station_location_latitude ="null"; //충전소위치(위도)
    private String charging_station_location_longitude ="null"; //충전소위치(경도)
//    private String installation_city ="null"; //설치시도명
//    private String closed_day ="null"; //휴점일
//    private String available_time_start ="null"; //이용가능시작시각
//    private String available_time_end ="null"; //이용가능종료시각
//    private String available_time ="null"; //이용가능시간
//    private String available_slow_charge  ="null"; //완속충전가능여부
//    private String slow_charger_num  ="null";//완속충전기대수
//    private String available_fast_charge  ="null";//급속충전가능여부
//    private String fast_charger_type ="null"; //급속충전타입구분
//    private String fast_charger_num ="null"; //급속충전기대수
//    private String parking_fee_chenk ="null"; //주차료부과여부
//    private String charging_station_infor ="null"; //충전소안내
//    private String user_limit ="null"; //이용자제한
//    private String user_limit_reason ="null"; //이용자제한사유
//    private String management_company ="null"; //관리업체명
//    private String management_company_numer ="null"; //관리업체전화번호
//    private String providing_institution_code ="null"; //제공기관코드
//    private String providing_institution_name ="null"; //제공기관명
//    private String charging_station_delete ="null"; //삭제여부
//    private String charging_station_delete_reason ="null"; //삭제사유


    public String getCharging_station_name() {
        return charging_station_name;
    }

    public void setCharging_station_name(String charging_station_name) {
        this.charging_station_name = charging_station_name;
    }


    public String getCharging_station_location_detail() {
        return charging_station_location_detail;
    }

    public void setCharging_station_location_detail(String charging_station_location_detail) {
        this.charging_station_location_detail = charging_station_location_detail;
    }

    public String getCharging_station_location_latitude() {
        return charging_station_location_latitude;
    }

    public void setCharging_station_location_latitude(String charging_station_location_latitude) {
        this.charging_station_location_latitude = charging_station_location_latitude;
    }

    public String getCharging_station_location_longitude() {
        return charging_station_location_longitude;
    }

    public void setCharging_station_location_longitude(String charging_station_location_longitude) {
        this.charging_station_location_longitude = charging_station_location_longitude;
    }
//
//    public String getInstallation_city() {
//        return installation_city;
//    }
//
//    public void setInstallation_city(String installation_city) {
//        this.installation_city = installation_city;
//    }
//
//    public String getClosed_day() {
//        return closed_day;
//    }
//
//    public void setClosed_day(String closed_day) {
//        this.closed_day = closed_day;
//    }
//
//    public String getAvailable_time_start() {
//        return available_time_start;
//    }
//
//    public void setAvailable_time_start(String available_time_start) {
//        this.available_time_start = available_time_start;
//    }
//
//    public String getAvailable_time_end() {
//        return available_time_end;
//    }
//
//    public void setAvailable_time_end(String available_time_end) {
//        this.available_time_end = available_time_end;
//    }
//
//    public String getAvailable_time() {
//        return available_time;
//    }
//
//    public void setAvailable_time(String available_time) {
//        this.available_time = available_time;
//    }
//
//    public String getAvailable_slow_charge() {
//        return available_slow_charge;
//    }
//
//    public void setAvailable_slow_charge(String available_slow_charge) {
//        this.available_slow_charge = available_slow_charge;
//    }
//
//    public String getSlow_charger_num() {
//        return slow_charger_num;
//    }
//
//    public void setSlow_charger_num(String slow_charger_num) {
//        this.slow_charger_num = slow_charger_num;
//    }
//
//    public String getAvailable_fast_charge() {
//        return available_fast_charge;
//    }
//
//    public void setAvailable_fast_charge(String available_fast_charge) {
//        this.available_fast_charge = available_fast_charge;
//    }
//
//    public String getFast_charger_type() {
//        return fast_charger_type;
//    }
//
//    public void setFast_charger_type(String fast_charger_type) {
//        this.fast_charger_type = fast_charger_type;
//    }
//
//    public String getFast_charger_num() {
//        return fast_charger_num;
//    }
//
//    public void setFast_charger_num(String fast_charger_num) {
//        this.fast_charger_num = fast_charger_num;
//    }
//
//    public String getParking_fee_chenk() {
//        return parking_fee_chenk;
//    }
//
//    public void setParking_fee_chenk(String parking_fee_chenk) {
//        this.parking_fee_chenk = parking_fee_chenk;
//    }
//
//    public String getCharging_station_infor() {
//        return charging_station_infor;
//    }
//
//    public void setCharging_station_infor(String charging_station_infor) {
//        this.charging_station_infor = charging_station_infor;
//    }
//
//    public String getUser_limit() {
//        return user_limit;
//    }
//
//    public void setUser_limit(String user_limit) {
//        this.user_limit = user_limit;
//    }
//
//    public String getUser_limit_reason() {
//        return user_limit_reason;
//    }
//
//    public void setUser_limit_reason(String user_limit_reason) {
//        this.user_limit_reason = user_limit_reason;
//    }
//
//    public String getManagement_company() {
//        return management_company;
//    }
//
//    public void setManagement_company(String management_company) {
//        this.management_company = management_company;
//    }
//
//    public String getManagement_company_numer() {
//        return management_company_numer;
//    }
//
//    public void setManagement_company_numer(String management_company_numer) {
//        this.management_company_numer = management_company_numer;
//    }
//
//    public String getProviding_institution_code() {
//        return providing_institution_code;
//    }
//
//    public void setProviding_institution_code(String providing_institution_code) {
//        this.providing_institution_code = providing_institution_code;
//    }
//
//    public String getProviding_institution_name() {
//        return providing_institution_name;
//    }
//
//    public void setProviding_institution_name(String providing_institution_name) {
//        this.providing_institution_name = providing_institution_name;
//    }
//
//    public String getCharging_station_delete() {
//        return charging_station_delete;
//    }
//
//    public void setCharging_station_delete(String charging_station_delete) {
//        this.charging_station_delete = charging_station_delete;
//    }
//
//    public String getCharging_station_delete_reason() {
//        return charging_station_delete_reason;
//    }
//
//    public void setCharging_station_delete_reason(String charging_station_delete_reason) {
//        this.charging_station_delete_reason = charging_station_delete_reason;
//    }
//
//    public String getCharging_station_id() {
//        return charging_station_id;
//    }
//
//    public void setCharging_station_id(String charging_station_id) {
//        this.charging_station_id = charging_station_id;
//    }
}
