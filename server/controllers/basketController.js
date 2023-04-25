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
			
			// const doubleDevice = await BasketDevice.findOne({
			// 	where:{id: basketId},
			// 	include: deviceId
			// })
			// if(doubleDevice) {
			// 	console.log('hi')
			// 	return res.json(doubleDevice)
			// }
			const basketDevice = await BasketDevice.update(deviceId, {
				where: basketId
			})
			return res.json({messege: `устройство в корзине`})
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
			console.log(console.log('error in getBasketDevice'))
			next(e)
		}
	}
}

module.exports = new BasketController()