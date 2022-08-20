import { Station } from '../../models/Station.js'
import { Charger } from '../../models/Charger.js'
import * as logger from './logger.js'


let stationIdSet = new Set();

export const init = async (region, date, raw_data) => {

    let stations = []
    let chargers = []
    console.log("[" + region + "] 세이버 시작");
    await raw_data.map((raw) => {
        if (!stationIdSet.has(raw.statId)) {
            stations.push(addStationJSON(date.date, raw));
        }
        chargers.push(addChargerJSON(date.date, raw));
    })

    // 이 아래 코드들은 await을 걸어두지 않았기 떄문에 거의 동시에 진행한다.
    updateStations(region, stations);
    updateChargers(region, chargers);

    await logger.init(region, date, raw_data);
    console.log("[" + region + "] 세이버 끝");
    return null;
}

const addStationJSON = (date, raw) => {

    const upsertDoc = {
        'updateOne': {
            'filter': { _id: { $eq: raw.statId } },
            'update': {
                _id: raw.statId,
                api: 'keco',
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
            },
            'upsert': true
        }
    }
    stationIdSet.add(raw.statId); //중복 제한을 막기 위해 Set 처리

    return upsertDoc;
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

    return upsertDoc;
}

const updateStations = async (region, stations) => {
    console.log('[Station ' + region + '] 정보 업데이트 중 ...')
    await Station.bulkWrite(stations).then(bulkWriteOpResult => {
        console.log('[Station ' + region + '] BULK update OK : ' + stations.length);
    }).catch(err => {
        console.log('[Station ' + region + '] BULK update error');
        console.log(JSON.stringify(err));
    });
    console.log('[Station ' + region + '] 데이터 입력 완료!')
    return null;
}

const updateChargers = async (region, chargers) => {
    console.log('[Charger ' + region + '] 정보 업데이트 중 ...')
    await Charger.bulkWrite(chargers).then(bulkWriteOpResult => {
        console.log('[Charger ' + region + '] BULK update OK : ' + chargers.length);
    }).catch(err => {
        console.log('[Charger ' + region + '] BULK update error');
        console.log(JSON.stringify(err));
    });
    console.log('[Charger ' + region + '] 데이터 입력 완료!')
    return null;
}

