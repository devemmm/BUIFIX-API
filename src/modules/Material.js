const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    mid:{
        type:Number,
        unique: true,
        required: true,
        trim: true
    },
    name:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;