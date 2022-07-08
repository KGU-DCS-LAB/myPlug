const mongoose = require('mongoose');

const FavoriteSchema = mongoose.Schema({
    user_id: {
        type: String,
        maxlength: 100,
        required: true
    },
    statNm: {
        type: String,
        maxlength: 100,
        required: true
    },
})

const Favorite = mongoose.model('favorites', FavoriteSchema)

module.exports = { Favorite }