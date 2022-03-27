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
// 추후 수정 예정
// 현재 : checked를 fasle to true로 하는 작업만 완료
// https://www.zerocho.com/category/MongoDB/post/59b6228e92f5830019d41ac4 여기에서 참고해서 작업 시도하기

    //수집한 원본 데이터 중 한번도 검사하지 않은 데이터 업데이트 하기
    const filter = {checked:{$eq:true}};
    const updateDoc = {checked:false};
    let status = null;
    const handleStatus = (msg) => {
        console.log('msg : ' + msg);
        status = msg;
    }
    let updateFalseToTrue = async () => {
        await RawStation.updateMany(filter, updateDoc,
        function (err, docs) {
            if (err){
                console.log(err);
                return err;
                // handleStatus(err);
            }
            else{
                console.log("Updated Docs : ", docs);
                return docs;
                // handleStatus(docs);
            }
        }
    )};
    updateFalseToTrue().then(
        (msg) => console.log(msg)
    );
    console.log(status);
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