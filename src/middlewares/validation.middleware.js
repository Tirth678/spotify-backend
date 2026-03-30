const {body, param, query} = require('express-validator');
const { registerUser } = require('../controllers/auth.controller');

async function validateResult(req, res, next) {
    const erros = validateResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({errors: erros.array()})
    }
    next()
}
const resgisterUserValidation = [
    body("username")
    .isString()
    .withMessage("Username should be string") // warning
    .isLength({min: 3, max: 30})
    .withMessage("Username must be between 3 and 30"),
    validateResult
]
module.exports = resgisterUserValidation