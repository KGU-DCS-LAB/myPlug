const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
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
    charging_station_name: {
        type: String,
        maxlength: 100,
        required: true
    },
    charging_station_location_latitude: {
        type: String,
        maxlength: 100,
        required: true
    },
    charging_station_location_longitude: {
        type: String,
        maxlength: 100,
        required: true
    },
    charging_station_location_detail: {
        type: String,
        maxlength: 100,
        required: true
    }
})

const Station = mongoose.model('raw_charging_station', stationSchema)

module.exports = { Station }