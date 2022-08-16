import { Test } from '../../models/Test.js';
import { Station } from '../../models/Station.js'
import { Charger } from '../../models/Charger.js'


let stationIdSet = new Set();
let stations = []
let chargers = []

export const init = async (date, raw_data) => {
    await raw_data.map((raw) => {
        if (!stationIdSet.has(raw.statId)) {
            addStationJSON(date, raw);
        }
        addChargerJSON(date, raw);
    })
    // await raw_data.map((raw) => {
    // 충전기 상태 만들어 줄 예정임
    // })

    console.log('***************************');
    // 이 아래 코드들은 await을 걸어두지 않았기 떄문에 거의 동시에 진행한다.
    updateStations(stations);
    updateChargers(chargers);
    console.log('***************************');
}

const addStationJSON = (date, raw) => {

    const upsertDoc = {
        'updateOne': {
            'filter': { _id: { $eq: raw.statId } },
            'update': {
                _id: raw.statId,
                api: 'keco', //
                date: date, //
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
                zscode: raw.zscode, //
                kind: raw.kind,
                kindDetail: raw.kindDetail,
                parkingFree: raw.parkingFree,
                note: raw.note,
                limitYn: raw.limitYn,
                limitDetail: raw.limitDetail,
                delYn: raw.delYn,
                delDetail: raw.delDetail,
                distance: 0, //
            },
            'upsert': true
        }
    }

    stations.push(upsertDoc)

    stationIdSet.add(raw.statId);
}

const addChargerJSON = (date, raw) => {
    const upsertDoc = {
        'updateOne': {
            'filter': { _id: { $eq: raw.statId + raw.chgerId } },
            'update': {
                _id: raw.statId + raw.chgerId,
                api: "keco",
                date: date,
                statNm: raw.statNm,
                statId: raw.statId,
                chgerId: raw.chgerId,
                chgerType: raw.chgerType,
                stat: raw.stat,
                statUpdDt: raw.statUpdDt,
                lastTsdt: raw.lastTsdt,
                lastTedt: raw.lastTsdt,
                nowTsdt: raw.nowTsdt,
                output: raw.output,
                method: raw.method,
            },
            'upsert': true
        }
    }

    chargers.push(upsertDoc)
}

const updateStations = async (stations) => {
    console.log('[Station] 정보 업데이트 중 ...')
    await Station.bulkWrite(stations).then(bulkWriteOpResult => {
        console.log('[Station] BULK update OK : '+stations.length);
    }).catch(err => {
        console.log('[Station] BULK update error');
        console.log(JSON.stringify(err));
    });
    console.log('[Station] 데이터 입력 완료!')
}

const updateChargers = async (chargers) => {
    console.log('[Charger] 정보 업데이트 중 ...')
    await Charger.bulkWrite(chargers).then(bulkWriteOpResult => {
        console.log('[Charger] BULK update OK : '+chargers.length);
    }).catch(err => {
        console.log('[Charger] BULK update error');
        console.log(JSON.stringify(err));
    });
    console.log('[Charger] 데이터 입력 완료!')
}

