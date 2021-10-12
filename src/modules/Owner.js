const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    uid:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    sid:[{
        type: String,
        trim: true
    }],
    eid:[{
        type: String,
        trim: true
    }],
    wei:[{
        type: String,
        trim: true
    }],
    budget:{
        type: Number,
        trim: true,
        default: 0
    },
    activity: [{
        name: {
            type: String,
            trim: true
        },
        budget: {
            type: Number,
            trim: true,
            default: 0
        },
        expenses:{
            type: Number,
            trim: true,
            default: 0
        },
        startingDate:{
            type: Date,
            required: true,
            trim : true
        },
        endingDate: {
            type: Date,
            required: true,
            trim: true
        },
        eid:{
            type: String,
            trim: true
        }
    }]
}, {
    timestamps: true
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;