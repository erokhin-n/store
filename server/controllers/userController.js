const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
	return	jwt.sign(
		{id, email, role}, 
		process.env.SECRET_KEY,
		{expiresIn: '24h'}
	)
} 

class UserController {
	async registration(req,res,next) {
		try {
			const {email, password, role} = req.body

			if(!email || !password) {
				throw ApiError.badRequest('не заполнен емайл или пароль')
			}
			const candidate = await User.findOne({where: {email}})
	
			if(candidate) {
				throw ApiError.badRequest('пользователь с таким мейлом уже есть!')
			}
			const hashPassword = await bcrypt.hash(password, 5)
			const user = await User.create({email, role, password: hashPassword})
			const basket = await Basket.create({userId: user.id})
			const token = generateJwt(user.id, user.email, user.role)
			res
			.set('Access-Control-Allow-Origin', 'http://localhost:3000')
			.cookie('token', token, {
				httpOnly: true,
				secure: true
			})
			.status(200)
			.json({role: user.role, email: user.email})
		} catch(e) {
			next(e)
		}
			
	}

	async login(req,res,next) {
		try {
			const {email, password} = req.body
			const user = await User.findOne({where: {email}})
			if(!user){
				throw ApiError.internal('пользователь не найден')
			}
			let comparePassword = bcrypt.compareSync(password, user.password)	
			if(!comparePassword){
				throw ApiError.internal("указан неверный пароль")
			}
			const token = generateJwt(user.id, user.email, user.role)
			res
			.set('Access-Control-Allow-Origin', 'http://localhost:3000')
			.cookie('token', token, {
				httpOnly: true,
				secure: true
			})
			.status(200)
			.json({role: user.role, email: user.email})
		} catch(e){
			next(e)
		}
	}
		
	async check(req,res, next) {
		try {
			const token = generateJwt(req.user.id, req.user.email, req.user.role)
			if(!token) throw ApiError.forbiden('проверка токена завершилась вселенским пиздецом!')
			res
			.set('Access-Control-Allow-Origin', 'http://localhost:3000')
			.cookie('token', token, {
				httpOnly: true,
				secure: true
			})
			.status(200)
			.json({role: req.user.role, email: req.user.email})
		} catch(e) {
			next(e)
		}
	}

	async removeCookie(req,res,next) {
		try {
			res.clearCookie('token');
			res.json({message: 'выход'})
		} catch(e) {
			next(e)
		}
	}
}

module.exports = new UserController()