const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Station } = require("../models/Station");
const { Charger } = require('../models/Charger');
const { StationLogs } = require('../models/StationLogs');

/* GET. */
router.get('/keco/find/stations', function (req, res, next) {
    // 전체 데이터 가져오기
    Station.find({}).then((stations) => {
        // console.log(stations);
        res.json(stations)
    }).catch((err) => {
        console.log(err);
        next(err)
    });
});

router.post('/keco/find/regionStations', function (req, res, next) {
    const x1 = req.body.data.x1;
    const x2 = req.body.data.x2;
    const y1 = req.body.data.y1;
    const y2 = req.body.data.y2;
    // console.log(req.body.data.count);
    // console.log(x1, x2);
    // console.log(y1, y2);
    Station.find({

        $and: [
            { lng: { $gte: x1 } },
            { lng: { $lte: x2 } },
            { lat: { $gte: y1 } },
            { lat: { $lte: y2 } },
        ]

    }).then((stations) => {
        // console.log(stations);
        // console.log(stations.length)
        res.json(stations)
    }).catch((err) => {
        console.log(err);
        next(err)
    });
});

router.post('/keco/find/chargers', function (req, res, next) {
  // console.log(req.body.data);
  Charger.find({
    statId:req.body.data
  }).then((response)=>{
    // console.log(response)
    res.json(response)
  }).catch((err) => {
    console.log(err);
    next(err)
});
});

router.post('/keco/find/stationLogs', function (req, res, next) {
  console.log(req.body.data);
  StationLogs.findOne({
    statId:req.body.data
  }).then((response)=>{
    console.log(response)
    res.json(response)
  }).catch((err) => {
    console.log(err);
    next(err)
});
});

router.post('/filterStations', async function (req, res, next) {
  // 필터링된 데이터 가져오기
  // console.log(req.body.data.min)
  // console.log(req.body.data.max)
  const x1 = req.body.data.x1;
  const x2 = req.body.data.x2;
  const y1 = req.body.data.y1;
  const y2 = req.body.data.y2;
  const types = req.body.data.types
  let result = null;
  let statNmAgg = {'statNm': { $exists: true }};
  let parkingFreeAgg = {parkingFree: { $exists: true }};
  let busiNmAgg = {busiNm: { $exists: true }};
  const chgerType = "chgerType"
  const parkingFree = "parkingFree"
  const busiNm = "busiNm"
  const typeArr = [];
  const parkingArr = types[parkingFree]
  const busiNmArr = types[busiNm]

  if (types[chgerType].length !== 0){
    result = await Charger.aggregate([
      {
        "$match": { chgerType: { "$in": types[chgerType] }}
      },
      {
      "$group": 
        {
          _id: "$statNm"
        }
    }]);
    result.map((item) => typeArr.push(item._id))
    statNmAgg = {'statNm': { $in : typeArr }}
  }

  // console.log("len", result.length);

  if (types[parkingFree].length !== 0){
    parkingFreeAgg = {parkingFree: { $in : parkingArr }}
  }

  if (types[busiNm].length !== 0){
    busiNmAgg = {busiNm: { $in : busiNmArr }}
  }

  // console.log(statNmAgg);
  // console.log(newArr);


  Station.find({
    // statNmAgg,
    $and: [
      statNmAgg,
      parkingFreeAgg,
      busiNmAgg,
      { lng: { $gte: x1 } },
      { lng: { $lte: x2 } },
      { lat: { $gte: y1 } },
      { lat: { $lte: y2 } },
    ]
  }).then((stations) => {
    // console.log(stations.length)
    res.json(stations)
  }).catch((err) => {
    console.log(err);
    next(err)
  });
  Station.find().and()
});

router.get("/keco/filteredCharger/:key", (req, res) => {
    const keyword = "$" + req.params.key;
    console.log(keyword)
    // 전체 데이터 가져오기
  Charger.aggregate([{
    "$group":
    {
      _id: keyword.toString(),
    }
  }, {
    "$sort": { _id: 1 }
  }]).then((result) => {
    res.send(result);
  });
});

router.get("/keco/filteredStations/:key", (req, res) => {
  const keyword = "$" + req.params.key;
  console.log(keyword)
  // 전체 데이터 가져오기
  Station.aggregate([{
    "$group":
    {
      _id: keyword.toString(),
      count: { "$sum": 1 }
    }
  }, {
    "$sort": { count: 1 }
  }]).then((result) => {
    res.send(result);
  });

});

// 충전소 검색
router.get("/search/:key", async  (req, res) => {
    // console.log(req);
    let result = await Station.find({
      "$or": [
        {
          statNm: {$regex: req.params.key}
        }
      ]
    });
    res.send(result);
  })


module.exports = router;