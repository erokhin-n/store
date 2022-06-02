const jwt = require('jsonwebtoken')

module.exports = function(role) {
		return function (req, res, next) {
			console.log('middleware start')
				if(req.method === "OPTIONS") {
						next()
				}
				try {
						const token = req.cookies.token
						if(!token) {
								console.log('no token')
								return res.status(401).json({message: "пользователь не авторизован(нет токена)"})
						}
						const decoded = jwt.verify(token, process.env.SECRET_KEY)
						if(decoded.role !== role) {
								console.log('role error')
								return res.status(403).json({message: "нет доступа"})
						}
						req.user = decoded
						next()
				} catch(e) {
						console.log('middleware error', e.message)
						res.status(401).json({message: "пользователь не авторизован"})
				}
		}
}