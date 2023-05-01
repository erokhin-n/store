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
		return res.json(basket)
	}
	async addDevice(req,res, next) {
		try{
			const data = await req.body
			const deviceId = await data.device.id
			const basketId = await data.basketId

			const [deviceInBasket, created] = await BasketDevice.findOrCreate({
				where: {basketId, deviceId},
				defaults: {
					basketId, deviceId
				}
			})

			if(created) {
				res.json({message: `устройство добавлено в корзину` })
			} else {
				res.json({message:'устройство уже в корзине'})
			}
		} catch(e) {
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
			next(e)
		}
	}
}

module.exports = new BasketController()