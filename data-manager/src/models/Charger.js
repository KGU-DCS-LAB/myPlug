// Using ES6 imports
import mongoose from 'mongoose';


const chargerSchema = mongoose.Schema(
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
        chgerId: {
            type: String,
            maxlength: 100,
        },
        chgerType: {
            type: String,
            maxlength: 100,
        },
        stat: {
            type: String,
            maxlength: 100,
        },
        statUpdDt: {
            type: String,
            maxlength: 100,
        },
        lastTsdt: {
            type: String,
            maxlength: 100,
        },
        lastTedt: {
            type: String,
            maxlength: 100,
        },
        nowTsdt: {
            type: String,
            maxlength: 100,
        },
        output: {
            type: String,
            maxlength: 100,
        },
        method: {
            type: String,
            maxlength: 100,
        },
    }
)

export const Charger = mongoose.model('chargers', chargerSchema)
