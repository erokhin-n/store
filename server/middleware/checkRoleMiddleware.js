const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function(role) {
	return function (req, res, next) {
		if(req.method === "OPTIONS") {
			next()
		}
		try {
			const token = req.cookies.token
			if(!token) {
				throw ApiError.forbiden("нет токена, всему пiзда!")
			}
			const decoded = jwt.verify(token, process.env.SECRET_KEY)
			if(decoded.role !== role) {
				throw ApiError.forbiden("щегол мамкин, ты не дорос до илитных деяний!")
			}
			req.user = decoded
			next()
		} catch(e) {
			next(e)
		}
	}
}