package v2.dto;

public class ChargerStatusDTO {
    private String busiId; // 기관아이디
    private String statId; // 충전소ID
    private String chgerId; // 충전기ID
    private String stat; //충전기상태
    private String statUpdDt; //충전기 상태 변경 일시

    public String getBusiId() {
        return busiId;
    }

    public void setBusiId(String busiId) {
        this.busiId = busiId;
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
}
