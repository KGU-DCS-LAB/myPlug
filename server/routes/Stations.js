const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Station } = require("../models/Station");
const { Charger } = require('../models/Charger');

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
        res.json(stations)
    }).catch((err) => {
        console.log(err);
        next(err)
    });
});

router.post('/keco/find/chargers', function (req, res, next) {
  console.log(req.body.data);
  Charger.find({
    statId:req.body.data
  }).then((response)=>{
    console.log(response)
    res.json(response)
  }).catch((err) => {
    console.log(err);
    next(err)
});
});

// router.get('/keco/find/chargers', function (req, res, next) {
//     // 전체 데이터 가져오기
//     Station.find({}).then((chargers) => {
//         // console.log(chargers);
//         res.json(chargers)
//     }).catch((err) => {
//         console.log(err);
//         next(err)
//     });
// });

router.get("/keco/filteredStations/:key", async (req, res) => {
    const keyword = "$" + req.params.key;
    console.log(keyword)
    // 전체 데이터 가져오기
    let result = await Station.aggregate([{
        "$group": 
          {
            _id: keyword.toString()
          }
      }]);
    //   console.log(result);
      res.send(result);
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