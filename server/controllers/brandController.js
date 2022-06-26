const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')
const { validationResult } = require('express-validator')
const validationErrorHandler = require('../error/validationErrorHandler')

class BrandController {
	async create(req,res,next) {
		try {

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				validationErrorHandler(errors)
			}

			const {name} = req.body
			const existBrand = await Brand.findOne({where: {name}})
			if(existBrand) throw ApiError.conflict('такой бренд уже существует')
			const brand = await Brand.create({name})
			res.json({message: `brand ${name} saved`})
		} catch(e) {
			next(e)
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