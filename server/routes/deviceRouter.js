const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/',deviceController.getAll)
router.get('/product_card/:id', deviceController.getOne)
router.post('/delete_picture/', checkRole('ADMIN'), deviceController.deletePicture)

module.exports = router

