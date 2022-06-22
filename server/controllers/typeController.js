const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {	
	async create(req,res,next) {
		try {
			const {name} = req.body
			const type = await Type.create({name})
			return res.json(type)
		} catch(e){
			next(ApiError.conflict('ошибка сохранения типа'))
		}
	}
	
	async getAll(req,res,next) {
		try {
			const types = await Type.findAll()
			return res.json(types)
		} catch(e) {
			next(ApiError.conflict('ошибка загрузки типов'))
		}
	}
}

module.exports = new TypeController()