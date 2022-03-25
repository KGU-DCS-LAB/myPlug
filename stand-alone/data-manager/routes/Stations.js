const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { RawStation } = require("../models/RawStation");

/* GET. */
router.get('/find/raw/all', function(req, res, next) {
    // 전체 데이터 가져오기
    RawStation.find({}).then( (stations) => {
        // Station.find({} , {"_id" : 0}).then( (stations) => {
        console.log(stations);
        res.json(stations)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

// router.get('/update/raw/all', function(req, res, next) {
//     Station.find({checked: {$eq: false}}).then( (stations) => {
//         // Station.find({} , {"_id" : 0}).then( (stations) => {
//         console.log(stations);
//         res.json(stations)
//     }).catch( (err) => {
//         console.log(err);
//         next(err)
//     });
// });

router.get('/find/raw/false', function(req, res, next) {
    // 전체 데이터 중 checked가 false인 데이터 가져오기
    RawStation.find({checked: {$eq: false}}).then( (stations) => {
        // Station.find({} , {"_id" : 0}).then( (stations) => {
        console.log(stations);
        res.json(stations)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

module.exports = router;