package v2.dto;

import java.util.Date;

public class KecoChargerInfoDTO {
    private String api; //수집된 api
    private Date date; // 수집 일시
    private String statNm;//	충전소명
    private String statId;//	충전소ID
    private String chgerId;//	충전기ID
    private String chgerType;//	충전기타입
    private String addr;//	주소
    private String location;//	상세위치
    private String lat;//	위도
    private String lng;//	경도
    private String useTime;//	이용가능시간
    private String busiId;//	기관 아이디
    private String bnm;//	기관명
    private String busiNm;//	운영기관명
    private String busiCall;//	운영기관연락처
    private String stat;//	충전기상태
    private String statUpdDt;//	상태갱신일시
    private String lastTsdt;//	마지막 충전시작일시
    private String lastTedt;//	마지막 충전종료일시
    private String nowTsdt;//	충전중 시작일시
    private String output;//	충전용량
    private String method;//	충전방식
    private String zcode;//	지역코드
    private String parkingFree;//	주차료무료
    private String note;//	충전소 안내
    private String limitYn;//	이용자 제한
    private String limitDetail;//	이용제한 사유
    private String delYn;//	삭제 여부
    private String delDetail;//	삭제 사유

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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

    public String getBnm() {
        return bnm;
    }

    public void setBnm(String bnm) {
        this.bnm = bnm;
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

    public String getLastTsdt() {
        return lastTsdt;
    }

    public void setLastTsdt(String lastTsdt) {
        this.lastTsdt = lastTsdt;
    }

    public String getLastTedt() {
        return lastTedt;
    }

    public void setLastTedt(String lastTedt) {
        this.lastTedt = lastTedt;
    }

    public String getNowTsdt() {
        return nowTsdt;
    }

    public void setNowTsdt(String nowTsdt) {
        this.nowTsdt = nowTsdt;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
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

    public String getLimitYn() {
        return limitYn;
    }

    public void setLimitYn(String limitYn) {
        this.limitYn = limitYn;
    }

    public String getLimitDetail() {
        return limitDetail;
    }

    public void setLimitDetail(String limitDetail) {
        this.limitDetail = limitDetail;
    }

    public String getDelYn() {
        return delYn;
    }

    public void setDelYn(String delYn) {
        this.delYn = delYn;
    }

    public String getDelDetail() {
        return delDetail;
    }

    public void setDelDetail(String delDetail) {
        this.delDetail = delDetail;
    }
}
