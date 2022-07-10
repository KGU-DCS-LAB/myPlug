package v2.dto;

import java.util.Date;

public class ChargerInfoDTO {
    private String api="null";
    private Date date=null;
    private String statNm; //충전소명
    private String statId; //충전소ID
    private String chgerId; //충전기ID
    private String chgerType; //충전기타입
    private String addr; //소재지 도로명 주소
    private String lat; //위도
    private String lng; //경도
    private String useTime; //이용가능시간
    private String busiId; //기관ID
    private String busiNm; //운영기관명
    private String busiCall; //충전기 운영기관 연락처
    private String stat; //충전기상태
    private String statUpdDt; //충전기 상태 변경 일시
    private String powerType; //충전기용량
    private String zcode; //시도 코드(행정구역코드 앞2자리)
    private String parkingFree; //주차료(Y:무료, N:유료, NULL:현장확인)
    private String note; //충전소 안내

    public String getStatNm() {
        return statNm;
    }

    public void setStatNm(String statNm) {
        this.statNm = statNm;
    }

    public String getStatId() {
        return statId;
    }

    public void setStatId(String statId) {
        this.statId = statId;
    }

    public String getChgerId() {
        return chgerId;
    }

    public void setChgerId(String chgerId) {
        this.chgerId = chgerId;
    }

    public String getChgerType() {
        return chgerType;
    }

    public void setChgerType(String chgerType) {
        this.chgerType = chgerType;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getUseTime() {
        return useTime;
    }

    public void setUseTime(String useTime) {
        this.useTime = useTime;
    }

    public String getBusiId() {
        return busiId;
    }

    public void setBusiId(String busiId) {
        this.busiId = busiId;
    }

    public String getBusiNm() {
        return busiNm;
    }

    public void setBusiNm(String busiNm) {
        this.busiNm = busiNm;
    }

    public String getBusiCall() {
        return busiCall;
    }

    public void setBusiCall(String busiCall) {
        this.busiCall = busiCall;
    }

    public String getStat() {
        return stat;
    }

    public void setStat(String stat) {
        this.stat = stat;
    }

    public String getStatUpdDt() {
        return statUpdDt;
    }

    public void setStatUpdDt(String statUpdDt) {
        this.statUpdDt = statUpdDt;
    }

    public String getPowerType() {
        return powerType;
    }

    public void setPowerType(String powerType) {
        this.powerType = powerType;
    }

    public String getZcode() {
        return zcode;
    }

    public void setZcode(String zcode) {
        this.zcode = zcode;
    }

    public String getParkingFree() {
        return parkingFree;
    }

    public void setParkingFree(String parkingFree) {
        this.parkingFree = parkingFree;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getApi() {
        return api;
    }

    public void setApi(String api) {
        this.api = api;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}
