const express = require('express')
const router = express.Router()
const {
    verifyJwt
} = require("../createtokens")
const Customers = require("../models/customers/customers")


//gets all customers
router.get("/customers", verifyJwt, async (req, res) => {
    //req.payload is from token
    try {
        const customers = await Customers.find({
            ORG_ID: req.payload.email_id
        }).sort({
            createdAt: "desc"
        })
        return res.status(200).send({
            success: true,
            message: "customers successfully fetched",
            data: customers
        })
    } catch (error) {
        return res.status(400).send({
            error
        })
    }
})

// search employees
router.get("/customers/search/:id", verifyJwt, async (req, res) => {
    try {
        const customers = await Customers.find({
            $or: [{
                    name: {
                        $regex: req.params.id,
                        $options: 'i'
                    }
                }, {
                    occupation: {
                        $regex: req.params.id,
                        $options: 'i'
                    }
                },
                {
                    gender: {
                        $regex: req.params.id,
                        $options: 'i'
                    }
                },

            ]
        })
        return res.status(200).send({
            success: true,
            message: "seacrh query result",
            data: customers.filter(customer => customer.ORG_ID === req.payload.email_id)
        })
    } catch (error) {
        return res.status(400).send({
            error
        })
    }

})

//add a new customer
router.post("/customers/add", verifyJwt, async (req, res) => {
    const {
        name,
        email,
        name_url,
        address,
        DOB,
        phone,
        occupation,
        gender,
        notes
    } = req.body

    let customerExists = await Customers.findOne({
        name_url: name_url
    })
    let random = Math.floor(Math.random() * 448994)
    try {
        let customer = await Customers.create({
            ORG_ID: req.payload.email_id,
            name,
            name_url: `${customerExists? name_url+random : name_url}`,
            email,
            address,
            DOB,
            phone,
            occupation,
            gender,
            notes
        })
        return res.status(200).json({
            status: true,
            message: "Customer successfuly added",
            data: customer
        })

    } catch (err) {
        return res.status(400).send(err)
    }
})

// get one customer
router.get("/customer/profile/:id", verifyJwt, async (req, res) => {


    try {
        const customer = await Customers.findOne({
            name_url: req.params.id
        })
        if (customer.ORG_ID !== req.payload.email_id) {
            return res.send(res.send({
                success: false,
                message: "no employee",
                data: ""
            }))
        }
        return res.status(200).send({
            success: true,
            message: "successfuly fetched customer",
            data: customer
        })

    } catch (err) {
        return res.send({
            success: false,
            message: err,
            data: ""
        })
    }

})

//update or edit a customer's profile
router.post("/customer/profile/:id", verifyJwt, async (req, res) => {

    const {
        name,
        email,
        address,
        DOB,
        phone,
        occupation,
        gender,
        notes
    } = req.body
    try {
        await Customers.findOneAndUpdate({
            name_url: req.params.id
        }, {
            $set: {
                name,
                email,
                address,
                DOB,
                phone,
                occupation,
                gender,
                notes
            }
        });
        return res.status(200).send({
            success: true,
            message: "Customer successfully updated"
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
})

//deletes a customer
router.delete("/customer/remove/:id", verifyJwt, async (req, res) => {
    try {
        const customer = await Customers.findOne({
            name_url: req.params.id
        })
        if (customer.ORG_ID !== req.payload.email_id) {
            return null
        }
        await customer.remove()
        return res.status(200).send({
            message: "customer deleted"
        });

    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
})

module.exports = router