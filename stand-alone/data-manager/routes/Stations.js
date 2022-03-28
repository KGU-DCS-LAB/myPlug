const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { RawStation } = require("../models/RawStation");
const { Station } = require("../models/Station");

/* GET. */
router.get('/find/raw/all', function(req, res, next) {
    // 수집한 모든 원본 데이터 가져오기
    RawStation.find({}).then( (stations) => {
        // Station.find({} , {"_id" : 0}).then( (stations) => {
        console.log(stations);
        res.json(stations)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

router.get('/update/raw/false', async (req, res, next) => {
        //수집한 원본 데이터 중 한번도 검사하지 않은 데이터 업데이트 하기

        let updateStations = async () => {
            RawStation.find({checked: {$eq: false}}).then( (stations) => {
                // console.log(stations);
                for (let i = 0; i < stations.length; i++) {
                    let stationName = stations[i].charging_station_name;
                    console.log(stationName);
                    // Station.findOneAndUpdate(

                    // );
                }
            }).catch( (err) => {
                console.log(err);
                next(err)
            });    
        }


        const filter = {checked:{$eq:false}};
        const updateDoc = {checked:true};
        let setStatus = (msg) =>{
            // console.log(msg)
            let text = msg.modifiedCount+'개의 새로운 수신 데이터가 최신화 되었습니다.';
            console.log(text);
            res.json({status: text});
        }
        let updateCheckedFalseToTrue = async () => {
            RawStation.updateMany(filter, updateDoc,
                (err, docs) => {
                    if (err){
                        setStatus(err);
                    }
                    else{
                        setStatus(docs);
                    }
                }
            );
        }

        updateStations();
        updateCheckedFalseToTrue();
});

router.get('/find/raw/false', function(req, res, next) {
    // 수집한 전체 원본 데이터 중 checked가 false인 데이터 확인하기
    RawStation.find({checked: {$eq: false}}).then( (stations) => {
        console.log(stations);
        res.json(stations)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

module.exports = router;