const {Basket, BasketDevice, Device} = require('../models/models')

class BasketController {
	async getBasket(req,res, next){
		const id = req.user.id
		const basket = await Basket.findOne({
			where:{userId:id},
		})

		const basketDevice = await BasketDevice.findAll({
			where: {basketId:basket.id}
		})
		return res.json(basketDevice)
	}
	async getBasketNumber(req,res, next){
		const id = req.user.id
		const basket = await Basket.findOne({
			where:{userId:id},
		})
		console.log('BASKET NUMBER ' + basket)
		return res.json(basket)
	}
	async addDevice(req,res, next) {
		try{
			const data = await req.body
			const deviceId = await data.device.id
			const basketId = await data.basketId
			const basketDevice = await BasketDevice.create({deviceId, basketId})
			res.json({messege: `устройство в корзине`})
		} catch(e) {
			console.log('error in addDevice in basket')
			next(e)
		}
	}
	async getBasketDevices(req, res, next) {
		try {
			const data = await req.params
			const basketDevice = await Device.findOne({
				where: {id:data.id}
			})
			res.json(basketDevice)
		} catch(e) {
			console.log(console.log('error in getBasketDevice'))
			next(e)
		}
	}
}

module.exports = new BasketController()