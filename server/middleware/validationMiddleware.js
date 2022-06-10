const { body } = require('express-validator');

module.exports = validator =  [
    body("email")
        .isInt()
        .withMessage('enter in email only numbers, bro!')
        .isLength({ min: 5 })
        .withMessage('email length wrong!!'),
    body("password")
        .isInt()
        .withMessage('passwork must be a number!')
        .isLength({ min: 5 })
        .withMessage('passwork length wrong!!'),
]

