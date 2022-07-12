const {Basket, BasketDevice} = require('../models/models')

class BasketController {
	async getBasket(req,res){
		const id = req.user.id
		const basket = await Basket.findOne({
			where:{userId:id},
			include: BasketDevice
		})
		return res.json(basket)
	}
}

module.exports = new BasketController()