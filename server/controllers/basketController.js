const {Basket, BasketDevice} = require('../models/models')

class BasketController {
		async getBasket(req,res){
				const {userid} = req.headers
				const basket = await Basket.findOne({
						where:{userId:userid},
						include: BasketDevice
					})
				return res.json(basket)
		}
}

module.exports = new BasketController()