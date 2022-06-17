const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const { validationResult } = require('express-validator');
const validationErrorHandler = require('../error/validationErrorHandler');

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

			const errors = validationResult(req);
			
			if (!errors.isEmpty()) {
				validationErrorHandler(errors)
			}

			const {email, password} = req.body

			if(!email || !password) {
				throw ApiError.unauthorized('не заполнен емайл или пароль')
			}

			const candidate = await User.findOne({where: {email}})
	
			if(candidate) {
				throw ApiError.conflict('пользователь с таким мейлом уже есть!')
			}
			const hashPassword = await bcrypt.hash(password, 5)
			const user = await User.create({email, password: hashPassword})
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

	async registrationAdmin(req,res,next) {
		try {

			const errors = validationResult(req);
			
			if (!errors.isEmpty()) {
				validationErrorHandler(errors)
			}

			const {email, password} = req.body

			if(!email || !password) {
				throw ApiError.unauthorized('не заполнен емайл или пароль')
			}

			const candidate = await User.findOne({where: {email}})
	
			if(candidate) {
				throw ApiError.conflict('пользователь с таким мейлом уже есть!')
			}
			const hashPassword = await bcrypt.hash(password, 5)
			const user = await User.create({email, role: "ADMIN", password: hashPassword})
			const basket = await Basket.create({userId: user.id})
			res
			.json({message: `администратор ${user.email} зарегистрирован`})
		} catch(e) {
			next(e)
		}
	}

	async login(req,res,next) {
		try {

			const errors = validationResult(req);
			
			if (!errors.isEmpty()) {
				validationErrorHandler(errors)
			}
			
			const {email, password} = req.body
			const user = await User.findOne({where: {email}})
			if(!user){
				throw ApiError.unauthorized('пользователь не найден')
			}
			let comparePassword = bcrypt.compareSync(password, user.password)	
			if(!comparePassword){
				throw ApiError.unauthorized("указан неверный пароль")
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
			if(!token) throw ApiError.unauthorized('проверка токена завершилась ошибкой')
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