const express = require('express')
const router = express.Router();
const { User } = require("../models/User");

/* POST*/
router.post('/save', function(req, res) {
    var newUser = new User(req.body.data);
    newUser.save(function(error, user){
        if(error){
            console.log(error);
            return res.json({status: 'fail', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

router.post('/findOne/', function(req, res, next) {
    const user_id = req.body.data.user_id
    console.log('[로그인 요청] '+user_id);
    User.find().where('user_id').equals(user_id)
    .then( (users) => {
        // console.log(users);
        res.json(users);
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

module.exports = router;