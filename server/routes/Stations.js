const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Station } = require("../models/Station");

/* GET. */
router.get('/find', function(req, res, next) {
    // 전체 데이터 가져오기
    Station.find({} , {"_id" : 0}).then( (users) => {
        console.log(users);
        res.json(users)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

// var mongoose = require('mongoose');
// var student = mongoose.Schema({
//     name : 'string',
//     address : 'string',
//     age : 'number'
// });
// var Student = mongoose.model('Schema', student);
// Student.find(function(error, students){
//     console.log('--- Read all ---');
//     if(error){
//         console.log(error);
//     }else{
//         console.log(students);
//     }
// })


module.exports = router;