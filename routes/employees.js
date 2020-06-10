const express = require('express')
const router = express.Router()

//gets all employees
router.get("/employees", (req, res) => {
    res.send("employees route works")
})

//add a new employee
router.post("/employees/add", (req, res) => {
    
})

// get one employee
router.get("/employee/profile/:id", (req, res) => {

})

//update or edit an employee's profile
router.post("/employee/profile/:id", (req, res) => {

})

//fires an employee
router.delete("/employees/remove/:id", (req,res) => {

})

// gets dashboard
router.get("/dashboard", (req, res) => {

})

//edit dashboard
router.post("/dashboard/update", (req, res) => {
    
})


module.exports = router
