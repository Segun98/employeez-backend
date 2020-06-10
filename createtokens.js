const jwt = require("jsonwebtoken")

const createToken = (user) => {
    return jwt.sign({
        user_id: user._id,
        email_id: user.email
    }, process.env.TOKEN_SECRET, {
        expiresIn: "15m"
    })
}

const createRefreshToken = (user) => {
    return jwt.sign({
        user_id: user._id,
        email_id: user.email
    }, process.env.REFRESH_SECRET, {
        expiresIn: "7d"
    })
}

const verifyJwt = (req, res, next) => {
    const authorization = req.headers["authorization"]
    if (!authorization) {
        return res.status(401).send("no authorization, you have to log in")
    }
    try {
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        req.payload = payload
        next()
    } catch (err) {
        res.status(401).send(err)
 
    }
}


module.exports.createToken = createToken
module.exports.createRefreshToken = createRefreshToken
module.exports.verifyJwt = verifyJwt