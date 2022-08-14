const mongoose = require('mongoose');

const chargerSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            maxlength: 100,
        },
        statNm: {
            type: String,
            maxlength: 100,
        },
        statId: {
            type: String,
            maxlength: 100,
        },
        chgerId: {
            type: String,
            maxlength: 100,
        },
        chgerType: {
            type: String,
            maxlength: 100,
        },
        stat: {
            type: String,
            maxlength: 100,
        },
        statUpdDt: {
            type: String,
            maxlength: 100,
        },
        lastTsdt: {
            type: String,
            maxlength: 100,
        },
        lastTedt: {
            type: String,
            maxlength: 100,
        },
        nowTsdt: {
            type: String,
            maxlength: 100,
        },
        output: {
            type: String,
            maxlength: 100,
        },
        method: {
            type: String,
            maxlength: 100,
        },
    }
    // {
    //     _id: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     api: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     date: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     statNm: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     statId: {
    //         type: String,
    //         maxlength: 100,
    //         required: true,
    //         unique: true
    //     },
    //     chgerId: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     chgerType: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     stat: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     statUpdDt: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     powerType: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     zcode: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    // }
)

const Charger = mongoose.model('chargers', chargerSchema)

module.exports = { Charger }