const mongoose = require('mongoose')

const Customers = new mongoose.Schema({
    ORG_ID: {
        type: String,
        required: true
    },
    name_url:{
        type: String,
        required: true,
        trim: true
    },
    customer_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        default: ""
    },
    address: {
        type: String,
        trim: true,
        default: ""
    },
    DOB: {
        type: String,
        trim: true,
        default: ""
    },
    phone_number: {
        type: String,
        trim: true,
        default: ""
    },
    occupation: {
        type: String,
        trim: true,
        default: ""
    },
    gender: {
        type: String,
        trim: true,
        default: ""
    },
    notes: {
        type: String,
        trim: true,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Customers', Customers, 'Customers')