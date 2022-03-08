const { ValidationError, validate, Joi } = require('express-validation');

exports.createUserValidation = validate({
    body: Joi.object({
        name: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
        password_repeat: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required()
    }),
})

exports.loginValidation = validate({
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
    }),
})

exports.validationErr = function(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    return res.status(500).json(err);
}
