const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
		async create(req,res) {
				const {name} = req.body
				console.log(name)
				const brand = await Brand.create({name})
				res.json({message: `brand ${name} saved`})
		}
		
		async getAll(req,res) {
				const brands = await Brand.findAll()
				return res.json(brands)
		}
}

module.exports = new BrandController()