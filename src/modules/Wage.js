const mongoose = require('mongoose');

const wageSchema = mongoose.Schema({
    uid:{
        type: String,
        required: true,
        trim: true
    },
    owner:{
        type: String,
        required: true,
        trim: true
    },
    wage:{
        type: Number,
        trim: true,
        required: true
    },
    status:{
        type: String,
        trim: true,
        default: 'unpaid'
    }
}, {timestamps: true});


const Wage = mongoose.model('Wage', wageSchema);

module.exports = Wage