const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const deviceFormValidation = require('../middleware/deviceFormValidation');

router.post('/', deviceFormValidation, checkRoleMiddleware('ADMIN') ,typeController.create)
router.get('/', typeController.getAll)

module.exports = router