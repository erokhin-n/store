const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { body, validationResult } = require('express-validator');
const { check } = require('express-validator');
const validator = require('../middleware/validationMiddleware');

router.post('/registration', validator, userController.registration)
router.post('/login', validator, userController.login)
router.get('/auth',authMiddleware ,userController.check)
router.get('/remove_cookie',userController.removeCookie)


module.exports = router