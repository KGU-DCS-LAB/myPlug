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
        newStations.push({
            ...station,
            status:{
                status0 : findChargersCount(stationsChargers, 0),
                status1 : findChargersCount(stationsChargers, 1),
                status2 : findChargersCount(stationsChargers, 2),
                status3 : findChargersCount(stationsChargers, 3),
                status4 : findChargersCount(stationsChargers, 4),
                status5 : findChargersCount(stationsChargers, 5),
            }
        })
    })
    return newStations;
}