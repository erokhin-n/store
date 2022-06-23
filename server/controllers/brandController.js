const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
	async create(req,res,next) {
		try {
			const {name} = req.body
			const brand = await Brand.create({name})
			res.json({message: `brand ${name} saved`})
		} catch(e) {
			next(ApiError.conflict('ошибка создания бренда'))
		}
	}
	
	async getAll(req,res,next) {
		try {
			const brands = await Brand.findAll()
			return res.json(brands)
		} catch(e) {
			next(ApiError.conflict('ошибка загрузки списка брендов'))
		}
	}
}

module.exports = new BrandController()