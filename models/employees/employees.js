const mongoose = require('mongoose')

const Employees = new mongoose.Schema({
    ORG_ID: {
        type: String,
        required: true
    },
    employee_name: {
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
    date_of_employment: {
        type: String,
        required: true,
        trim: true
    },
    job_title: {
        type: String,
        required: true,
        trim: true
    },
    work_location: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    employee_classification: {
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
    phone_number: {
        type: String,
        trim: true
    },
    DOB: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    sacked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Employees', Employees, 'Employees')