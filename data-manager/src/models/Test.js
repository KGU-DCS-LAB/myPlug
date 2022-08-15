// Using ES6 imports
import mongoose from 'mongoose';

const testSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            maxlength: 100,
        },
        text: {
            type: String,
            maxlength: 100,
        },
    }
)

export const Test = mongoose.model('test', testSchema)
