const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const { validationResult } = require('express-validator');
const validationErrorHandler = require('../error/validationErrorHandler');

module.exports = function(role) {
	return function (req, res, next) {
		
		if(req.method === "OPTIONS") {
			next()
		}
		try {

			const token = req.cookies.token
			if(!token) {
				throw ApiError.unauthorized("токен отсутсвует")
			}
			const decoded = jwt.verify(token, process.env.SECRET_KEY)
			if(decoded.role !== role) {
				throw ApiError.forbidden("для вашей роли это действие недоступно")
			}
			req.user = decoded
			next()
		} catch(e) {
			next(e)
		}
	}
}