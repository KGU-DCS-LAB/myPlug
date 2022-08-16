export const countChargers = (stations, chargers) => {
    let newStations = [];
    stations.map((station)=>{
        const stationsChargers = chargers.filter((charger)=>charger.statId == station.statId);
        console.log(station.statId)
        console.log('알수 없음 : ' + stationsChargers.filter((charger)=>charger.stat == 0).length);
        console.log('통신 이상 : ' + stationsChargers.filter((charger)=>charger.stat == 1).length);
        console.log('사용 가능 : ' + stationsChargers.filter((charger)=>charger.stat == 2).length);
        console.log('충전 중 : ' + stationsChargers.filter((charger)=>charger.stat == 3).length);
        console.log('운영 중지 : ' + stationsChargers.filter((charger)=>charger.stat == 4).length);
        console.log('점검 중 : ' + stationsChargers.filter((charger)=>charger.stat == 5).length);
        console.log('***')
    })
    return stations;
}