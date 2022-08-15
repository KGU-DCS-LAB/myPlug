const mongoose = require('mongoose');

const stationSchema = mongoose.Schema(
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
        addr: {
            type: String,
            maxlength: 100,
        },
        location: {
            type: String,
            maxlength: 100,
        },
        lat: {
            type: String,
            maxlength: 100,
        },
        lng: {
            type: String,
            maxlength: 100,
        },
        useTime: {
            type: String,
            maxlength: 100,
        },
        busiId: {
            type: String,
            maxlength: 100,
        },
        bnm: {
            type: String,
            maxlength: 100,
        },
        busiNm: {
            type: String,
            maxlength: 100,
        },
        busiCall: {
            type: String,
            maxlength: 100,
        },
        zcode: {
            type: String,
            maxlength: 100,
        },
        parkingFree: {
            type: String,
            maxlength: 100,
        },
        note: {
            type: String,
            maxlength: 100,
        },
        limitYn: {
            type: String,
            maxlength: 100,
        },
        limitDetail: {
            type: String,
            maxlength: 100,
        },
        delYn: {
            type: String,
            maxlength: 100,
        },
        delDetail: {
            type: String,
            maxlength: 100,
        },
        distance:{
            type:Number,
        }
    }
)

const Station = mongoose.model('stations', stationSchema)

module.exports = { Station }