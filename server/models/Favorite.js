const mongoose = require('mongoose');

const chargerSchema = mongoose.Schema({
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

const Charger = mongoose.model('chargers', chargerSchema)

module.exports = { Charger }