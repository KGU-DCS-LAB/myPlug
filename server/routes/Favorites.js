const express = require('express')
const router = express.Router();
const { Favorite } = require("../models/Favorite");

/* POST*/
router.post('/save', function(req, res) {
    var newFavorite = new Favorite(req.body.data);
    newFavorite.save(function(error, favorite){
        if(error){
            console.log(error);
            return res.json({status: 'fail', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

router.post('/saveMore', function(req, res) {
    Favorite.updateOne(
        { user_id: req.body.data.user_id }, 
        {$push: {station: {
            "statNm": req.body.data.statNm,
        }}}).exec((error, statNm)=>{
            if(error){
                console.log(error);
                return res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                return res.json({status: 'success'})
            }
        });
});

router.post('/findOwn', function(req, res, next) {
    Favorite.find().where('user_id').equals(req.body.user_id)
    .then( (favorite) => {
        console.log(favorite);
        res.json(favorite)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

module.exports = router;