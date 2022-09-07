import { Station } from '../../models/Station.js'
import { Charger } from '../../models/Charger.js'
import * as logger from './logger.js'
import { addStatus } from '../../api/STATUS.js';

/**
 * 수신받은 raw data를 저장하는 함수
 * @param {String} region 
 * @param {dateJSON} date 
 * @param {[]} raw_data 
 * @param {String} page 
 * @returns 
 */
export const init = async (region, date, raw_data, page) => {

    let stationIdSet = new Set(); //충전소만 걸러내기 위한 메소드
    
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

    let stations = [];
    let chargers = [];
    console.log(`[saver] ${page} 충전소/충전기 데이터 정제 시작`);
    await raw_data.map((raw) => {
        if (!stationIdSet.has(raw.statId)) {
            stations.push(addStationJSON(date.date, raw));
        }
        chargers.push(addChargerJSON(date.date, raw));
    })
    console.log(`[saver] ${page} 작업 준비가 완료된 충전소/충전기/로그 데이터 저장 시작!`);
    // 이 아래 코드들은 await을 걸어두지 않았기 떄문에 거의 동시에 진행한다. --> 다시 await 걸어둠
    await Promise.all([
        updateStations(page, stations), 
        updateChargers(page, chargers), 
        logger.init(region, date, raw_data, page)
    ]);
    console.log(`${page} 작업 완료`.bgGreen);
    addStatus({
        page:page,
        stationsCount:stations.length,
        chargersCount:chargers.length,
    });
    return null;
}

const updateStations = async (page, stations) => {
    console.log(`[saver] [Stations] ${page} 정보 업데이트 중 ...`.yellow)
    await Station.bulkWrite(stations).then(bulkWriteOpResult => {
        console.log(`[saver] [Stations] ${page} MongoDB BULK update OK : ${stations.length}`.green);
    }).catch(err => {
        console.log(`>> Stations ${page} BULK update error`.red);
        console.log(JSON.stringify(err));
    });
    return null;
}

const updateChargers = async (page, chargers) => {
    console.log(`[saver] [Chargers] ${page} 정보 업데이트 중 ...`.yellow)
    await Charger.bulkWrite(chargers).then(bulkWriteOpResult => {
        console.log(`[saver] [Chargers] ${page} MongoDB BULK update OK : ${chargers.length}`.green);
    }).catch(err => {
        console.log(`>> Chargers ${page} BULK update error`.red);
        console.log(JSON.stringify(err));
    });
    return null;
}

