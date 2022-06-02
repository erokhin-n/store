const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
		if(req.method === "OPTIONS") {
				next()
		}
		try {
				const token = req.cookies.token
				console.log(token)
				if(!token) {
						return res.status(401).json({message: "пользователь не авторизован(нет токена)"})
				}
				const decoded = jwt.verify(token, process.env.SECRET_KEY)
				req.user = decoded
				next()
		} catch(e) {
				res.status(401).json({message: "пользователь не авторизован"})
		}
}