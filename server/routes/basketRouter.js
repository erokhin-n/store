const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.get('/getbasket', basketController.getBasket)

module.exports = router