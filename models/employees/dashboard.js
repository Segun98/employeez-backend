const mongoose = require('mongoose')

const Dashboard = new mongoose.Schema({
    ORG_ID: {
        type: String,
        required: true
    },
    mission: {
        type: String,
        required: true,
        trim: true
    },
    vision: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String,
        trim: true,
        required: true
    },
    values: {
        type: String,
        trim: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Dashboard', Dashboard, 'Dashboard')