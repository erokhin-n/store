const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = (req, res, next) => {
	if(req.method === "OPTIONS") {
		next()
	}
	try {
		const token = req.cookies.token
		if(!token) {
			// throw ApiError.unauthorized("проверка токена завершилась ошибкой")
			res.json({role: '', email: ''})
		} else {
			const decoded = jwt.verify(token, process.env.SECRET_KEY)
			req.user = decoded
			next()
		}
	} catch(e) {
		next(e)
	}
}