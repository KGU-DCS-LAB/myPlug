const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    _id: {
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

const Station = mongoose.model('charging_station', stationSchema)

module.exports = { Station }