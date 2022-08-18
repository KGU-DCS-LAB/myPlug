export const sortStations = (location, stations) => {
    let temp = []
    stations.map((station)=>temp.push({
        ...station,
        ['distance']:getDistance(location.latitude, location.longitude, station.lat, station.lng)
    }))
    let sortedList = temp.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    return sortedList;
}

export const getDistance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 == lat2) && (lon1 == lon2))
        return 0;

    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radTheta = Math.PI * theta / 180;
    var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1)
        dist = 1;

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist;
}

export const countChargers = (stations, chargers) => {
    const findChargersCount = (stationsChargers, statNum) => { //특정 상태의 충전기를 찾아주는 함수
        return stationsChargers.filter((charger)=>charger.stat == statNum).length
    }
    let newStations = [];
    stations.map((station)=>{
        const stationsChargers = chargers.filter((charger)=>charger.statId == station.statId);
        // console.log(station.statId)
        // console.log('알수 없음 : ' + stationsChargers.filter((charger)=>charger.stat == 0).length);
        // console.log('통신 이상 : ' + stationsChargers.filter((charger)=>charger.stat == 1).length);
        // console.log('사용 가능 : ' + stationsChargers.filter((charger)=>charger.stat == 2).length);
        // console.log('충전 중 : ' + stationsChargers.filter((charger)=>charger.stat == 3).length);
        // console.log('운영 중지 : ' + stationsChargers.filter((charger)=>charger.stat == 4).length);
        // console.log('점검 중 : ' + stationsChargers.filter((charger)=>charger.stat == 5).length);
        // console.log('***')
            // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
        newStations.push({
            ...station,
            status:{
                status1 : findChargersCount(stationsChargers, 1),
                status2 : findChargersCount(stationsChargers, 2),
                status3 : findChargersCount(stationsChargers, 3),
                status4 : findChargersCount(stationsChargers, 4),
                status5 : findChargersCount(stationsChargers, 5),
                status9 : findChargersCount(stationsChargers, 9),
            }
        })
    })
    return newStations;
}

export const statColor = (stat) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (stat) {
        case "1":
            return "yellow.500";
        case "2":
            return "green.500";
        case "3":
            return "red.500";
        case "4":
            return "black.500";
        case "5":
            return "yellow.500";
        default:
            return "gray.300";
    }
}


export const chargerStat = (n) => {
    if (n == '1') { return "통신이상" }
    else if (n == '2') { return "충전대기" }
    else if (n == '3') { return "충전중" }
    else if (n == '4') { return "운영중지" }
    else if (n == '5') { return "점검중" }
    else if (n == '9') { return "상태미확인" }
    else { return "?" }
}

export const chargerType = (n) => {
    if (n == '01') { return "DC차데모" }
    else if (n == '02') { return "AC완속" }
    else if (n == '03') { return "DC차데모+AC3상" }
    else if (n == '04') { return "DC콤보" }
    else if (n == '05') { return "DC차데모+DC콤보" }
    else if (n == '06') { return "DC차데모+AC3상+DC콤보" }
    else if (n == '07') { return "AC3상" }
    else { return "?" }
}

export const statTextAvatar = (stat) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (stat) {
        case "1":
            return "이상";
        case "2":
            return "대기중";
        case "3":
            return "충전중";
        case "4":
            return "중단";
        case "5":
            return "점검중";
        default:
            return "미확인";
    }
}
export const statText = (stat) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (stat) {
        case "1":
            return "통신이상";
        case "2":
            return "충전대기";
        case "3":
            return "충전중";
        case "4":
            return "운영중지";
        case "5":
            return "점검중";
        default:
            return "상태미확인";
    }
}