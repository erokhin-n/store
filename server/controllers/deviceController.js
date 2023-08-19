const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function uploadToImgur(imagePath, clientId) {
	try {
	  const form = new FormData();
	  form.append('image', fs.createReadStream(imagePath)); // Используем createReadStream
  
	  const response = await axios.post('https://api.imgur.com/3/image', form, {
		headers: {
		  ...form.getHeaders(),
		  Authorization: `Client-ID ${clientId}`,
		},
	  });
  
	  const imageUrl = response.data.data.link;
	  return imageUrl;
	} catch (error) {
	  console.error('Error uploading to Imgur:', error.response.data);
	  throw new Error('Image upload to Imgur failed');
	}
  }

class DeviceController {
	async create(req, res, next) {
		try {
		  let { name, price, brandId, typeId, info } = req.body;
		  const existName = await Device.findOne({ where: { name } });
		  if (existName) throw ApiError.conflict('такое название устройства уже существует');
		  const { img } = req.files;
		  const fileName = uuid.v4() + '.jpg';
		  const imagePath = path.resolve(__dirname, '..', 'static', fileName);
	
		  img.mv(imagePath);
	
		  const clientId = '69672255265524a';
	
		  const imageUrl = await uploadToImgur(imagePath, clientId);
	
		  const device = await Device.create({ name, price, brandId, typeId, img: imageUrl });
	
		  if (info) {
			info = JSON.parse(info);
			info.forEach((i) =>
			  DeviceInfo.create({
				title: i.title,
				description: i.description,
				deviceId: device.id,
			  })
			);
		  }
	
		  fs.unlinkSync(imagePath);
	
		  return res.json(device);
		} catch (e) {
		  next(e);
		}
	  }
	async getAll(req,res) {
		let {brandId, typeId, limit, page} = req.query
		// page = page || 1
		// limit = limit || 9
		// let offset = page * limit - limit



		let devices;
		// {limit, offset} cut on bottom devices
		devices = await Device.findAndCountAll()

		if(!brandId && !typeId){
			// {limit, offset} cut on bottom devices
			devices = await Device.findAndCountAll()
		}

		if(brandId && !typeId) {
			devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
		}

		if(!brandId && typeId) {
			devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
		}

		if(brandId && typeId) {
			devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
		}
		return res.json(devices)
	}

	async getOne(req,res, next) {
		try {
			const {id} = req.params
			const device = await Device.findOne({
				where: {id},
				include: [{model: DeviceInfo, as: 'info'}]
			})
			return res.json(device)	
		} catch(e) {
			next(e)
		}
	}
}

module.exports = new DeviceController()