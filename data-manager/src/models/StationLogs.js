// Using ES6 imports
import mongoose from 'mongoose';

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
        // logs: [{
        //     mon: Number,
        //     tue: Number,
        //     wed: Number,
        //     thu: Number,
        //     fri: Number,
        //     sat: Number,
        //     sun: Number,
        // }],
    }
)

export const StationLogs = mongoose.model('stations', stationLogsSchema)