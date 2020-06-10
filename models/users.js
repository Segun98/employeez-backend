const mongoose = require('mongoose')

const Users = new mongoose.Schema({
    organisation_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 6,
        max: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Users', Users, 'Users')