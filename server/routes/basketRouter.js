const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', authMiddleware, basketController.getBasket)
router.get('/get_basket_number', authMiddleware, basketController.getBasketNumber)
router.post('/add_device', authMiddleware, checkRoleMiddleware("USER"), basketController.addDevice)
router.get('/get_basket_device/:id', authMiddleware, checkRoleMiddleware("USER"), basketController.getBasketDevices)

module.exports = router