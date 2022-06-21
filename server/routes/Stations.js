const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Station } = require("../models/Station");

/* GET. */
router.get('/keco/find/stations', function(req, res, next) {
    // 전체 데이터 가져오기
    Station.find({}).then( (stations) => {
        console.log(stations);
        res.json(stations)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

router.post('/keco/find/regionStations', function(req, res, next) {
    console.log(req.body);
});

router.get('/keco/find/chargers', function(req, res, next) {
    // 전체 데이터 가져오기
    Station.find({}).then( (chargers) => {
        console.log(chargers);
        res.json(chargers)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});


module.exports = router;