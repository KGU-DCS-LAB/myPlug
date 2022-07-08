const mongoose = require('mongoose');

const FavoriteSchema = mongoose.Schema({
    user_id: {
        type: String,
        maxlength: 100,
        unique: 1,
        required: true
    },
    station: [{
        statNm: String
    }],
})

const Favorite = mongoose.model('favorites', FavoriteSchema)

module.exports = { Favorite }