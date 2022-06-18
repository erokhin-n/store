const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const validator = require('../middleware/validationMiddleware');

router.post('/registration', validator, userController.registration)
router.post('/login', validator, userController.login)
router.post('/registration_admin', validator, checkRoleMiddleware("SUPER_ADMIN"), userController.registrationAdmin)
router.get('/auth',authMiddleware, userController.check)
router.get('/remove_cookie',userController.removeCookie)
router.get('/userlist',userController.getUsers)


module.exports = router