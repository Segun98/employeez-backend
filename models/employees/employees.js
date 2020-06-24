const mongoose = require('mongoose')

const Employees = new mongoose.Schema({
    ORG_ID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    name_url: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    picture: {
        type: String,
        trim: true,
        default: ""
    },
    hireDate: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    workLocation: {
        type: String,
        trim: true,
        default: ""
    },
    address: {
        type: String,
        trim: true,
        default: ""
    },
    classification: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        default: ""
    },
    dob: {
        type: String,
        trim: true,
        default: ""
    },
    notes: {
        type: String,
        trim: true,
        default: ""
    },
    benefits: {
        type: String,
        trim: true,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Employees', Employees, 'Employees')