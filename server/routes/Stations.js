const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Station } = require("../models/Station");
const { ChargerInfo } = require('../models/ChargerInfo');

/* GET. */
router.get('/find', function(req, res, next) {
    // 전체 데이터 가져오기
    Station.find({}).then( (stations) => {
        console.log(stations);
        res.json(stations)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

/* GET. */
router.get('/keco/find', function(req, res, next) {
    // 전체 데이터 가져오기
    ChargerInfo.find({}).then( (stations) => {
        console.log(stations);
        res.json(stations)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});



module.exports = router;