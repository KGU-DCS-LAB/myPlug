const mongoose = require('mongoose');

const rawChargerInfoSchema = mongoose.Schema({
    _id: {
        type: String,
        maxlength: 100,
        required: true
    },
    checked: {
        type: Boolean,
        required: true
    },
    api: {
        type: String,
        maxlength: 100,
        required: true
    },
    date: {
        type: String,
        maxlength: 100,
        required: true
    },
    statNm: {
        type: String,
        maxlength: 100,
        required: true
    },
    statId: {
        type: String,
        maxlength: 100,
        required: true
    },
    chgerId: {
        type: String,
        maxlength: 100,
        required: true
    },
    chgerType: {
        type: String,
        maxlength: 100,
        required: true
    },
    addr: {
        type: String,
        maxlength: 100,
        required: true
    },
    lat: {
        type: String,
        maxlength: 100,
        required: true
    },
    lng: {
        type: String,
        maxlength: 100,
        required: true
    },
    useTime: {
        type: String,
        maxlength: 100,
        required: true
    },
    busiId: {
        type: String,
        maxlength: 100,
        required: true
    },
    busiNm: {
        type: String,
        maxlength: 100,
        required: true
    },
    busiCall: {
        type: String,
        maxlength: 100,
        required: true
    },
    stat: {
        type: String,
        maxlength: 100,
        required: true
    },
    statUpdDt: {
        type: String,
        maxlength: 100,
        required: true
    },
    powerType: {
        type: String,
        maxlength: 100,
        required: true
    },
    zcode: {
        type: String,
        maxlength: 100,
        required: true
    },
    parkingFree: {
        type: String,
        maxlength: 100,
        required: true
    },
    note: {
        type: String,
        maxlength: 100,
        required: true
    },
})

const RawChargerInfo = mongoose.model('raw_charger_info', rawChargerInfoSchema)

module.exports = { RawChargerInfo }