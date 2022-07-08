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
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }