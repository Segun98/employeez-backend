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
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    DOB: {
        type: String,
        trim: true
    },
    phone_number: {
        type: String,
        trim: true
    },
    occupation: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Customers', Customers, 'Customers')