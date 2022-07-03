const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { RawChargerInfo } = require("../models/RawChargerInfo");
const { Station } = require('../models/Station');
const { Charger } = require('../models/Charger');


// keco 관련 메소드 추가 시작

router.get('/find/keco/raw/charger_info/all', function (req, res, next) {
    // 수집한 모든 원본 데이터 가져오기
    RawChargerInfo.find({}).then((stations) => {
        console.log(stations);
        res.json(stations)
    }).catch((err) => {
        console.log(err);
        next(err)
    });
});

// This route is the one we will be dealing the most with. It accepts a "skip" query
// param which is then passed in as an option in our mongoose query. I've also set the
// limit to 5, otherwise we will get all the todos at once
router.get('/find/keco/raw/all', async (req, res) => {
    console.log('hehe');
    try {
        const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0
        // const todos = await RawChargerInfo.find({}, undefined, { skip, limit: 5 }).sort('title')
        const rawData = await RawChargerInfo.find({}, undefined, { skip, limit: 5 })
        res.send(rawData)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/update/keco/raw/charger_info/false', async (req, res, next) => {
    //수집한 원본 데이터 중 한번도 검사하지 않은 데이터 업데이트 하기

    let updateStations = async () => {
        RawChargerInfo.find({ checked: { $eq: false } }).then((stations) => {
            for (let i = 0; i < 5000; i++) {
                // for (let i = 0; i < stations.length; i++) {
                if (stations[i] == null) {
                    break;
                }
                let stationName = stations[i].statNm + "(" + stations[i].statId + ")";
                console.log(stationName);
                const station_filter = {
                    statId: { $eq: stations[i].statId }
                };
                const station_update = {
                    date: stations[i].date,
                    statNm: stations[i].statNm,
                    statId: stations[i].statId,
                    addr: stations[i].addr,
                    lat: stations[i].lat,
                    lng: stations[i].lng,
                    useTime: stations[i].useTime,
                    busiId: stations[i].busiId,
                    busiNm: stations[i].busiNm,
                    busiCall: stations[i].busiCall,
                    zcode: stations[i].zcode,
                    parkingFree: stations[i].parkingFree,
                    note: stations[i].note,
                };
                const options = {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                };
                // https://www.geeksforgeeks.org/mongoose-findoneandupdate-function/ 참고 필
                Station.findOneAndUpdate(station_filter, station_update, options,
                    (err, docs) => {

                    }
                );
                const charger_filter = {
                    $and: [
                        { statId: { $eq: stations[i].statId } },
                        { chgerId: { $eq: stations[i].chgerId } },
                    ]
                };
                const charger_update = {
                    date: stations[i].date,
                    statNm: stations[i].statNm,
                    statId: stations[i].statId,
                    chgerId: stations[i].chgerId,
                    chgerType: stations[i].chgerType,
                    stat: stations[i].stat,
                    statUpdDt: stations[i].statUpdDt,
                    powerType: stations[i].powerType,
                    zcode: stations[i].zcode,
                };
                Charger.findOneAndUpdate(charger_filter, charger_update, options,
                    (err, docs) => {

                    }
                )
                RawChargerInfo.updateOne({ checked: { $eq: false } }, { checked: true }, //수정이 필요한 부분
                    (err, docs) => {

                    }
                );
            }
        }).catch((err) => {
            console.log(err);
            next(err)
        });
    }

    let findCheckedFalse = async () => { //수정 필요
        RawChargerInfo.find({ checked: { $eq: false } }).then((stations) => {
            res.json({ status: "처리 완료. 데이터 중 일부(최대 5000개)가 최신화 되었습니다. 아직 처리되지 않은 " + stations.length + "개의 데이터가 남았습니다. 0개가 남을 때 까지 계속해주세요. (천천히 새로고침도 가능)" });
        }).catch((err) => {
            console.log(err);
            next(err)
        });
    }

    updateStations();
    findCheckedFalse();
});

//keco 관련 메소드 끝

module.exports = router;