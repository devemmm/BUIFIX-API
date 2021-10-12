const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    mid:{
        type: String,
        trim: true,
        required: true,
    },
    name:{
        type: String,
        trim: true,
        required: true
    },
    quantity:{
        type: Number,
        trim: true,
        required: true
    },
    unityPrice:{
        type: Number,
        trim: true,
        required: true
    },
    uid:{
        type: String,
        trim: true,
        required: true,
    },
    owner:{
        type: String,
        trim: true,
        required: true,
    },
    activity:{
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;