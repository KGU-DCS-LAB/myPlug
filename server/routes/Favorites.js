const express = require('express')
const router = express.Router();
const { Favorite } = require("../models/Favorite");

/* POST*/
router.post('/save', function(req, res) {
    var newUser = new Favorite(req.body.data);
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