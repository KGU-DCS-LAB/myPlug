// Using ES6 imports
import mongoose from 'mongoose';


const Hours = new mongoose.Schema({
    0:{
        type: Number,
    },
    1:{
        type: Number,
    },
    2:{
        type: Number,
    },
    3:{
        type: Number,
    },
    4:{
        type: Number,
    },
    5:{
        type: Number,
    },
    6:{
        type: Number,
    },
    7:{
        type: Number,
    },
    8:{
        type: Number,
    },
    9:{
        type: Number,
    },
    10:{
        type: Number,
    },
    11:{
        type: Number,
    },
    12:{
        type: Number,
    },
    13:{
        type: Number,
    },
    14:{
        type: Number,
    },
    15:{
        type: Number,
    },
    16:{
        type: Number,
    },
    17:{
        type: Number,
    },
    18:{
        type: Number,
    },
    19:{
        type: Number,
    },
    20:{
        type: Number,
    },    
    21:{
        type: Number,
    },
    22:{
        type: Number,
    },
    23:{
        type: Number,
    },
})

const stationLogsSchema = mongoose.Schema(
    {
        _id: {
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
        week: {
            type: String,
            maxlength: 100,
        },
        logs: {
            mon: Hours,
            tue: Hours,
            wed: Hours,
            thu: Hours,
            fri: Hours,
            sat: Hours,
            sun: Hours,
        },
    }
)
export const StationLogs = mongoose.model('stations_logs', stationLogsSchema)