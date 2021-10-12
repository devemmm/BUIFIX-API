const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    uid:{
        type: String,
        trim: true,
        required: true,
    },
    owner:{
        type: String,
        trim: true,
        required: true
    },
    salary:{
        type: Number,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;