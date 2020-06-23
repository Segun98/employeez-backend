const mongoose = require('mongoose')

const Dashboard = new mongoose.Schema({
    ORG_ID: {
        type: String,
        required: true
    },
    todo: {
        type: String,
        trim: true
    },
    mission: {
        type: String,
        trim: true
    },
    vision: {
        type: String,
        trim: true
    }, 
    about: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Dashboard', Dashboard, 'Dashboard')