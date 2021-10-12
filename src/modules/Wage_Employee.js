const mongoose = require('mongoose');

const wageEmployeeSchema = mongoose.Schema({
    nid:{
        type: String,
        trim: true,
        required: true,
    },
    phone:{
        type: String,
        trim: true,
        required: true
    },
    owner:{
        type: String,
        trim: true
    },
    wage:{
        type: Number,
        trim: true,
        required: true
    },
    active:{
        type: Boolean,
        trim: true,
        default: true
    }
}, {
    timestamps: true
});

const WageEmployee = mongoose.model('WageEmployee', wageEmployeeSchema);

module.exports = WageEmployee;