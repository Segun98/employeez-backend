const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const {
    registerValidation,
    loginValidation
} = require("../joivalidate")
const bcrypt = require("bcryptjs")
const {
    createToken,
    createRefreshToken
} = require("../createtokens")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')


router.post("/register", async (req, res) => {
    const validation = registerValidation(req.body)

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message)
    }

    const {
        organisation_name,
        email,
        password
    } = req.body

    const emailExists = await Users.findOne({
        email: email
    })

    if (emailExists) {
        return res.status(400).send("email already exists")
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    try {
        let user = await Users.create({
            organisation_name,
            email,
            password: hashedpassword
        })
        return res.status(200).json({
            status: true,
            message: "sign up successful"
        })

    } catch (err) {
        res.status(400).send(err.message)
    }

})

router.post("/login", async (req, res) => {
    const validation = loginValidation(req.body)

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message)
    }

    const {
        email,
        password
    } = req.body

    try {
        const user = await Users.findOne({
            email: email
        })

        if (!user) {
            return res.status(400).send("email or password is wrong")
        }
        const validPass = await bcrypt.compare(password, user.password)
        if (!validPass) {
            return res.status(400).send("Invalid Password")
        }
        let date = new Date()
        date.setDate(date.getDate() + 7);
        //imports to create tokens
        const token = createToken(user)
        res.cookie('yeez', createRefreshToken(user), {
            httpOnly: true,
            expires: date
        })
        res.status(200).send({
            success: true,
            message: "successfully logged in",
            accesstoken: token
        })

    } catch (err) {
        res.send(err.message)
    }


})

//refresh tokens after access token expires
router.post("/refreshtokens", cookieParser(), async (req, res) => {

    const token = req.cookies.yeez

    if (!token) {
        return res.status(401).send({
            success: false,
            acessToken: ""
        })
    }
    let payload = null
    try {
        payload = jwt.verify(token, process.env.REFRESH_SECRET)
    } catch (err) {
        return res.status(401).send({
            success: false,
            acessToken: "",
            err
        })
    }
    const user = await Users.findOne({
        _id: payload.user_id
    })

    if (!user) {
        return res.status(401).send({
            success: false,
            acessToken: ""
        })
    }
    let date = new Date()
    date.setDate(date.getDate() + 7);
    res.cookie('yeez', createRefreshToken(user), {
        httpOnly: true,
        expires: date
    })
 
    return res.status(200).send({
        success: true,
        acessToken: createToken(user)
    })

})

router.post("/logout", async (req, res, next) => {
    await res.clearCookie('yeez');
    next()
    return res.status(200).send({
        message: "Logged out"
    })

})
module.exports = router