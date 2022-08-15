import { Test } from '../../models/Test.js';
import { Station } from '../../models/Station.js'


let stationIdSet = new Set();
let stations = []
let chargers = []

export const init = async (date, raw_data) => {
    await raw_data.map((raw) => {
        if (!stationIdSet.has(raw.statId)) {
            addStationJSON(date, raw);
        }
    })
    console.log(stations);
}

const addStationJSON = (date, raw) => {

    stations.push({
        api: "keco",
        date: date,
        statNm: raw.statNm,
        statId: raw.statId,
        addr: raw.addr,
        location: raw.location,
        useTime: raw.useTime,
        lat: raw.lat,
        lng: raw.lng,
        busiId: raw.busiId,
        bnm: raw.bnm,
        busiNm: raw.busiNm,
        busiCall: raw.busiCall,
        zcode: raw.zcode,
        zscode: raw.zscode,
        kind: raw.kind,
        kindDetail: raw.kindDetail,
        parkingFree: raw.parkingFree,
        note: raw.note,
        limitYn: raw.limitYn,
        limitDetail: raw.limitDetail,
        delYn: raw.delYn,
        delDetail: raw.delDetail,
        distance: 0,
    })

    stationIdSet.add(raw.statId);
}

// const example = async () => {
//     // Test.findOne({}, function(error,data){
//     //     if(error){
//     //         console.log('error : '+error);
//     //     }else{
//     //         console.log('data : '+data);
//     //     }
//     // });
//     Station.findOne({}, function(error,data){
//         if(error){
//             console.log('error : '+error);
//         }else{
//             console.log('data : '+data);
//         }
//     });
// }

