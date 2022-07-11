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
    }

    // {
    //     _id: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     // checked: {
    //     //     type: Boolean,
    //     //     required: true
    //     // },
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
    //     // chgerId: {
    //     //     type: String,
    //     //     maxlength: 100,
    //     //     required: true
    //     // },
    //     // chgerType: {
    //     //     type: String,
    //     //     maxlength: 100,
    //     //     required: true
    //     // },
    //     addr: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     lat: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     lng: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     useTime: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     busiId: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     busiNm: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     busiCall: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     // stat: {
    //     //     type: String,
    //     //     maxlength: 100,
    //     //     required: true
    //     // },
    //     // statUpdDt: {
    //     //     type: String,
    //     //     maxlength: 100,
    //     //     required: true
    //     // },
    //     // powerType: {
    //     //     type: String,
    //     //     maxlength: 100,
    //     //     required: true
    //     // },
    //     zcode: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     parkingFree: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    //     note: {
    //         type: String,
    //         maxlength: 100,
    //         required: true
    //     },
    // }
)

const Station = mongoose.model('stations', stationSchema)

module.exports = { Station }