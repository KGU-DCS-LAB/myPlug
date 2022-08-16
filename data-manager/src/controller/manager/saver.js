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
    console.log('***************************');
    updateStations(stations);
    updateChargers(chargers);
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
    console.log('stations update start')
    // console.log(stations[0])
    await Station.bulkWrite(stations).then(bulkWriteOpResult => {
        console.log('BULK update OK');
    }).catch(err => {
        console.log('BULK update error');
        console.log(JSON.stringify(err));
    });

    console.log('stations inserted')
}

const updateChargers = async (chargers) => {
    console.log('chargers update start')

    await Charger.bulkWrite(chargers).then(bulkWriteOpResult => {
        console.log('BULK update OK');
    }).catch(err => {
        console.log('BULK update error');
        console.log(JSON.stringify(err));
    });

    // chargers.map((charger) => {
    //     const filter = {
    //         _id: { $eq: charger._id }
    //     };
    //     const update = charger;
    //     const options = {
    //         upsert: true,
    //         // new: true,
    //         // setDefaultsOnInsert: true
    //     };
    //     Charger.replaceOne(filter, update, options,
    //         (err, docs) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //             else {
    //                 // console.log("Original Doc : ",docs);
    //             }
    //         }
    //     );
    // }, { concurrency: 25 })
    console.log('chargers inserted')
}

