const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const deviceFormValidation = require('../middleware/deviceFormValidation');

router.post('/',deviceFormValidation, checkRoleMiddleware("ADMIN"), brandController.create)
router.get('/', brandController.getAll)

module.exports = router


