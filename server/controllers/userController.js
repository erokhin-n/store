const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const { response } = require('express')

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
				throw ApiError.badRequest('некорректный майл или пароль')
			}
			const candidate = await User.findOne({where: {email}})
	
			if(candidate) {
				return next(ApiError.badRequest('пользователь с таким мейлом уже есть!'))
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
				const {email, password} = req.body
				const user = await User.findOne({where: {email}})
				if(!user){
						return next(ApiError.internal('пользователь не найден'))
				}
				let comparePassword = bcrypt.compareSync(password, user.password)	
				if(!comparePassword){
						return next(ApiError.internal("указан неверный пароль"))
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
		}
		
		async check(req,res, next) {
				const token = generateJwt(req.user.id, req.user.email, req.user.role)
				res
					.set('Access-Control-Allow-Origin', 'http://localhost:3000')
					.cookie('token', token, {
						httpOnly: true,
						secure: true
					})
					.status(200)
					.json({role: req.user.role, email: req.user.email})
		}

		async removeCookie(req,res) {
			res.clearCookie('token');
			res.json({message: 'выход'})
		}
}

module.exports = new UserController()