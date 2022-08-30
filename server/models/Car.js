const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    car_id: {
        type: String,
        maxlength: 100,
        unique: 1,
        required: true
    },
    name: [{
        type: String
    }],
})

const Car = mongoose.model('cars', CarSchema)

module.exports = { Car }