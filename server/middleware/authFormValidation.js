const { body } = require('express-validator');

module.exports = validator =  [
    body("email")
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .withMessage('Необходимо заполнить почту в формате - "yourmail@mail.com"'),
    body("password")
        .matches(/^[A-Za-z]\w{7,14}$/)
        .withMessage("Пароль должен начинаться с буквы, длинна пароля должна быть от 7 до 16 букв или цифр"),
    body("name")
        .matches(/^[A-Za-zА-Яа-я0-9]*$/)
        .withMessage("Поле содержит недопустимые символы")
]

