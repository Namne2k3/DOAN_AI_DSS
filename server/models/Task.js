const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model['Task'] || mongoose.model('Task', TaskSchema);