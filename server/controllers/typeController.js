const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')
const { validationResult } = require('express-validator')
const validationErrorHandler = require('../error/validationErrorHandler')

class TypeController {	
	async create(req,res,next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				validationErrorHandler(errors)
			}

			const {name} = req.body
			const type = await Type.create({name})
			return res.json(type)
		} catch(e){
			next(e)
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