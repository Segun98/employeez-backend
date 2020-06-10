const express = require('express')
const router = express.Router()
const {
    verifyJwt
} = require("../createtokens")
const Customers = require("../models/customers/customers")


//gets all customers
router.get("/customers", verifyJwt, async (req, res) => {
    try {
        const customers = await Customers.find()
        return res.status(200).send({
            success: true,
            message: "customers successfully fetched",
            //req.payload is from token
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
        customer_name,
        email,
        name_url,
        address,
        DOB,
        phone_number,
        occupation,
        gender,
        notes
    } = req.body
    try {
        let customer = await Customers.create({
            ORG_ID: req.payload.email_id,
            customer_name,
            name_url,
            email,
            address,
            DOB,
            phone_number,
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
        return res.status(200).send({
            success: true,
            message: "successfuly fetched customer",
            data: customer
        })

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err,
            data: {}
        })
    }

})

//update or edit a customer's profile
router.post("/customer/profile/:id", verifyJwt, async (req, res) => {

    const {
        customer_name,
        email,
        address,
        DOB,
        phone_number,
        occupation,
        gender,
        notes
    } = req.body
    try {
        await Customers.findOneAndUpdate({
            name_url: req.params.id
        }, {
            $set: {
                customer_name,
                email,
                address,
                DOB,
                phone_number,
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