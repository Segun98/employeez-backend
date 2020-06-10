const Joi = require('@hapi/joi')


//Login and signup input checks/validation
const registerValidation = (data) => {
    const schema = Joi.object({
        organisation_name: Joi.string().required().min(6),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })
    const validate = schema.validate(data)
    return validate

}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })
    const validate = schema.validate(data)
    return validate

}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation