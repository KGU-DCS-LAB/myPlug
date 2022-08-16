const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        maxlength: 30,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        maxlength: 30,
        required: true
    },
    filterData: {
        chgerType: [String], 
        parkingFree: [String], 
        busiNm: [String], 
        output: [String], 
        stat: [String], 
        limitYn: [String], 
        method: [String]
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }