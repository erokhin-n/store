const { body } = require('express-validator');

module.exports = deviceFormValidator =  [
    body("name")
        .notEmpty()
        .withMessage("Поле не может быть пустым!")
        .matches(/^([a-zA-Zа-яА-Я0-9]+\s)*[a-zA-Zа-яА-Я0-9]+$/)
        .withMessage("Поле содержит недопустимые символы")
]

