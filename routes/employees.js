const express = require('express')
const router = express.Router()
const {
    verifyJwt
} = require("../createtokens")
const Employees = require("../models/employees/employees")


//gets all employees
router.get("/employees", verifyJwt, async (req, res) => {
    try {
        const employees = await Employees.find()
        return res.status(200).send({
            success: true,
            message: "employees successfully fetched",
            //req.payload is from token
            data: employees.filter(employee => employee.ORG_ID === req.payload.email_id)
        })
    } catch (error) {
        return res.status(400).send({
            error
        })
    }
})

//add a new employee
router.post("/employees/add", verifyJwt, async (req, res) => {
    const {
        employee_name,
        name_url,
        email,
        department,
        date_of_employment,
        job_title,
        work_location,
        address,
        employee_classification,
        salary,
        gender,
        phone_number,
        DOB,
        notes
    } = req.body

    try {
        let employees = await Employees.create({
            ORG_ID: req.payload.email_id,
            employee_name,
            name_url,
            email,
            department,
            date_of_employment,
            job_title,
            work_location,
            address,
            employee_classification,
            salary,
            gender,
            phone_number,
            DOB,
            notes
        })
        return res.status(200).json({
            status: true,
            message: "Employee successfuly added",
            data: employees
        })

    } catch (err) {
        return res.status(400).send(err.message)
    }
})

// get one employee
router.get("/employee/profile/:id", verifyJwt, async (req, res) => {
    try {
        const employee = await Employees.findOne({
            name_url: req.params.id
        })
        return res.status(200).send({
            success: true,
            message: "successfuly fetched employee",
            data: employee
        })

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err,
            data: {}
        })
    }
})

//update or edit an employee's profile
router.post("/employee/profile/:id", verifyJwt, async (req, res) => {

    const {
        employee_name,
        email,
        department,
        date_of_employment,
        job_title,
        work_location,
        address,
        employee_classification,
        salary,
        gender,
        phone_number,
        DOB,
        notes
    } = req.body
    try {
        await Employees.findOneAndUpdate({
            name_url: req.params.id
        }, {
            $set: {
                employee_name,
                email,
                department,
                date_of_employment,
                job_title,
                work_location,
                address,
                employee_classification,
                salary,
                gender,
                phone_number,
                DOB,
                notes
            }
        });
        return res.status(200).send({
            success: true,
            message: "Employee successfully updated"
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }

})

//fires an employee
router.delete("/employees/remove/:id", verifyJwt, async (req, res) => {
    try {
        const employee = await Employees.findOne({
            name_url: req.params.id
        })
        await employee.remove()
        return res.status(200).send({
            message: "employee removed"
        });

    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
})

// gets dashboard
router.get("/dashboard", verifyJwt, async (req, res) => {

})

//edit dashboard
router.post("/dashboard/update", verifyJwt, async (req, res) => {

})


module.exports = router