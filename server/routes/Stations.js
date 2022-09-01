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
  console.log(req.body);
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

router.post('/keco/find/manyStations', function (req, res, next) {
  // console.log(req.body.data);
  Station.find({ statId: { "$in": req.body.data } }).then((response) => {
    // console.log(response)
    res.json(response)
  }).catch((err) => {
    console.log(err);
    next(err)
  });
});

router.post('/keco/find/chargers', function (req, res, next) {
  // console.log(req.body.data);
  Charger.find({
    statId: req.body.data
  }).then((response) => {
    // console.log(response)
    res.json(response)
  }).catch((err) => {
    console.log(err);
    next(err)
  });
});

router.post('/keco/find/manyChargers', function (req, res, next) {
  // console.log(req.body.data);
  Charger.find({ statId: { "$in": req.body.data } }).then((response) => {
    // console.log(response)
    res.json(response)
  }).catch((err) => {
    console.log(err);
    next(err)
  });
});

router.post('/keco/find/stationLogs', function (req, res, next) {
  console.log(req.body.data);
  StationLogs.find({
    statId: req.body.data
  }).then((response) => {
    console.log(response)
    res.json(response)
  }).catch((err) => {
    console.log(err);
    next(err)
  });
});

router.post('/filterStations', async function (req, res, next) {
  // 필터링된 데이터 가져오기
  const x1 = req.body.data.x1;
  const x2 = req.body.data.x2;
  const y1 = req.body.data.y1;
  const y2 = req.body.data.y2;
  const types = req.body.data.types;

  let result = null;

  let statNmAgg = { 'statNm': { $exists: true } };
  let parkingFreeAgg = { parkingFree: { $exists: true } };
  let busiNmAgg = { busiNm: { $exists: true } };
  let limitYnAgg = { limitYn: { $exists: true } };

  let chgerTypeAgg = { chgerType: { "$exists": true } }
  let outputAgg = { output: { "$exists": true } }
  let statAgg = { stat: { "$exists": true } }
  let methodAgg = { method: { "$exists": true } }

  const typeArr = [];

  // 충전기 검색
  if (types["chgerType"].length !== 0) {
    chgerTypeAgg = { chgerType: { "$in": types["chgerType"] } }
  }

  if (types["output"].length !== 0) {
    outputAgg = { output: { "$in": types["output"] } }
  }

  if (types["stat"].length !== 0) {
    statAgg = { stat: { "$in": types["stat"] } }
  }

  if (types["method"].length !== 0) {
    methodAgg = { method: { "$in": types["method"] } }
  }

  result = await Charger.aggregate([
    {
      "$match": { "$and": [chgerTypeAgg, outputAgg, statAgg, methodAgg] }
    },
    {
      "$group":
      {
        _id: "$statNm"
      }
    }]);
  result.map((item) => typeArr.push(item._id))

  if (typeArr.length !== 0) {
    statNmAgg = { 'statNm': { $in: typeArr } }
  }

  // 충전소 검색
  if (types["parkingFree"].length !== 0) {
    parkingFreeAgg = { parkingFree: { $in: types["parkingFree"] } }
  }

  if (types["busiNm"].length !== 0) {
    busiNmAgg = { busiNm: { $in: types["busiNm"] } }
  }

  if (types["limitYn"].length !== 0) {
    limitYnAgg = { limitYn: { $in: types["limitYn"] } }
  }

  Station.find({
    // statNmAgg,
    $and: [
      statNmAgg,
      parkingFreeAgg,
      busiNmAgg,
      limitYnAgg,
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
      count: { $count: {} }
    }
  }, {
    "$sort": { count: 1, count: -1 }
  }, { "$limit": 10 }]).then((result) => {
    res.send(result);
  });

});

// 충전소 검색
router.get("/search/:key", async (req, res) => {
  console.log(req.params.key);
  let result = await Station.find({
    "$or": [
      {
        statNm: { $regex: req.params.key }
      }
    ]
  });
  res.send(result);
})


router.post('/findStation', async function (req, res, next) {
  const types = req.body.data;

  let result = null;

  let zcodeAgg = { zcode: { $exists: true } };
  let kindAgg = { kind: { $exists: true } };
  let kindDetailAgg = { kindDetail: { $exists: true } };

  // 충전소 검색
  if (types["zcode"].length !== 0) {
    zcodeAgg = { zcode: { $in: types["zcode"] } }
  }

  if (types["kind"].length !== 0) {
    kindAgg = { kind: { $in: types["kind"] } }
  }

  if (types["kindDetail"].length !== 0) {
    kindDetailAgg = { kindDetail: { $in: types["kindDetail"] } }
  }

  Station.find({
    $and: [
      zcodeAgg,
      kindAgg,
      kindDetailAgg
    ]
  }).then((stations) => {
    res.json(stations)
  }).catch((err) => {
    console.log(err);
    next(err)
  });
});

module.exports = router;