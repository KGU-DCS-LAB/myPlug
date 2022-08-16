import { Test } from '../../models/Test.js';
import { Station } from '../../models/Station.js'
import {Charger} from '../../models/Charger.js'


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
    console.log('***************************');
    updateStations(stations);
    updateChargers(chargers);
}

const addStationJSON = (date, raw) => {

    stations.push({
        _id: raw.statId,
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

const addChargerJSON = (date, raw) => {
    chargers.push({
        _id: raw.statId+raw.chgerId,
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
    })
}

const updateStations = (stations) => {
    console.log('stations update start')
    stations.map((station)=>{
        const filter = {
            _id:{$eq:station._id}
        };
        const update = station;
        const options = {
            upsert: true,
            // new: true,
            // setDefaultsOnInsert: true
        };
        Station.replaceOne(filter,update,options,
            (err,docs) => {
                if (err){
                    console.log(err)
                }
                else{
                    // console.log("Original Doc : ",docs);
                }
            }
        );
    }, {concurrency: 25})
    console.log('stations inserted')
}

const updateChargers = (chargers) => {
    console.log('chargers update start')
    chargers.map((charger)=>{
        const filter = {
            _id:{$eq:charger._id}
        };
        const update = charger;
        const options = {
            upsert: true,
            // new: true,
            // setDefaultsOnInsert: true
        };
        Charger.replaceOne(filter,update,options,
            (err,docs) => {
                if (err){
                    console.log(err)
                }
                else{
                    // console.log("Original Doc : ",docs);
                }
            }
        );
    }, {concurrency: 25})
    console.log('chargers inserted')
}

