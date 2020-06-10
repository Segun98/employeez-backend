const express = require('express')
const router = express.Router()
const {verifyJwt} = require("../createtokens")

//gets all customers
router.get("/customers", verifyJwt, (req, res) => {
    console.log(req);
    res.send("customers route works")
})

//add a new customer
router.post("/customers/add", (req, res) => {
    
})

// get one customer
router.get("/customer/profile/:id", (req, res) => {

})

//update or edit a customer's profile
router.post("/customer/profile/:id", (req, res) => {

})

//deletes a emplocustomeryee
router.delete("/customer/remove/:id", (req,res) => {

})

module.exports = router


