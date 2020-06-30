const express = require('express')
const router = express.Router()
const {
    verifyJwt
} = require("../createtokens")
const Employees = require("../models/employees/employees")
const Dashboard = require("../models/employees/dashboard")


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
        name,
        name_url,
        email,
        department,
        hireDate,
        title,
        workLocation,
        address,
        classification,
        salary,
        gender,
        phone,
        dob,
        notes,
        picture,
        benefits
    } = req.body

    let employeeExists = await Employees.findOne({
        name_url: name_url
    })
    let random = Math.floor(Math.random() * 448994)

    try {
        let employees = await Employees.create({
            ORG_ID: req.payload.email_id,
            name,
            name_url: `${employeeExists? name_url+random : name_url}`,
            email,
            department,
            hireDate,
            title,
            workLocation,
            address,
            classification,
            salary,
            gender,
            phone,
            dob,
            notes,
            picture,
            benefits
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
        name,
        email,
        department,
        hireDate,
        title,
        workLocation,
        address,
        classification,
        salary,
        gender,
        phone,
        dob,
        notes,
        picture,
        benefits
    } = req.body
    try {
        await Employees.findOneAndUpdate({
            name_url: req.params.id
        }, {
            $set: {
                name,
                email,
                department,
                hireDate,
                title,
                workLocation,
                address,
                classification,
                salary,
                gender,
                phone,
                dob,
                notes,
                picture,
                benefits
            },

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


// search employees
router.get("/employees/search/:id", verifyJwt, async (req, res) => {
    try {
        const employees = await Employees.find({
            $or: [{
                    name: {
                        $regex: req.params.id,
                        $options: 'i'
                    }
                }, {
                    classification: {
                        $regex: req.params.id,
                        $options: 'i'
                    }
                },
                {
                    title: {
                        $regex: req.params.id,
                        $options: 'i'
                    }
                },

            ]
        })
        return res.status(200).send({
            success: true,
            message: "seacrh query result",
            data: employees.filter(employee => employee.ORG_ID === req.payload.email_id)
        })
    } catch (error) {
        return res.status(400).send({
            error
        })
    }

})

//fires an employee
router.delete("/employee/remove/:id", verifyJwt, async (req, res) => {
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


//add dashboard items
router.post("/dashboard/add", verifyJwt, async (req, res) => {
    const {
        mission,
        vision,
        about,
        todo
    } = req.body

    try {
        await Dashboard.create({
            ORG_ID: req.payload.email_id,
            mission,
            vision,
            about,
            todo
        })
        return res.status(200).json({
            status: true,
            message: "Dashboard successfuly added"
        })

    } catch (err) {
        return res.status(400).send(err.message)
    }
})



// gets dashboard, loads after user creates dashboard
router.get("/dashboard", verifyJwt, async (req, res) => {
    try {
        const dashboard = await Dashboard.findOne({
            ORG_ID: req.payload.email_id
        })
        return res.status(200).send({
            success: true,
            message: "successfuly fetched dashboard",
            data: dashboard
        })

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err,
            data: {}
        })
    }
})

//update dashboard
router.post("/dashboard/update", verifyJwt, async (req, res) => {
    const {
        mission,
        vision,
        about,
        todo
    } = req.body
    try {
        await Dashboard.findOneAndUpdate({
            ORG_ID: req.payload.email_id
        }, {
            $set: {
                mission,
                vision,
                about,
                todo
            }
        });
        return res.status(200).send({
            success: true,
            message: "Dashboard successfully updated",
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
})


module.exports = router