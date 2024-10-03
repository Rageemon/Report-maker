const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true,
        trim: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    chiefGuest: {
        type: String,
        required: true
    },
    font: {
        type: String,
        required: false, 
        default: "Arial" 
    },
    color: {
        type: String,
        required: false, 
        default: "#000000" 
    },
    images: {
        type: [String], 
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', schema);
