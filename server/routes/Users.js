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

module.exports = router;