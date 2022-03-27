const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { RawStation } = require("../models/RawStation");

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

router.get('/update/raw/false', function(req, res, next) {
    //수집한 원본 데이터 중 한번도 검사하지 않은 데이터 업데이트 하기
    const filter = {checked:{$eq:false}};
    const updateDoc = {checked:true};
    function handleStatus(){
        
    }
    let status = null;
    RawStation.updateMany(filter, updateDoc,
        function (err, docs) {
            if (err){
                console.log(err);
                status=err;
            }
            else{
                console.log("Updated Docs : ", docs);
                status=docs;
            }
        }
    );
    res.json({status: status});
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