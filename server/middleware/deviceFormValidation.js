const { body } = require('express-validator');

module.exports = deviceFormValidator =  [
    body("name")
        .notEmpty()
        .matches(/^[A-Za-zА-Яа-я0-9]*$/)
        .withMessage("Поле содержит недопустимые символы")
]

