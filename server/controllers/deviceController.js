const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const axios = require('axios');
const fs = require('fs');

async function uploadToImgur(imagePath, clientId) {
	try {
	  const image = fs.readFileSync(imagePath, { encoding: 'base64' });
  
	  const response = await axios.post('https://api.imgur.com/3/image', image, {
		headers: {
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
	
		  // Путь к временной директории, где сохраняются изображения
		  const imagePath = path.resolve(__dirname, '..', 'static', fileName);
	
		  img.mv(imagePath);
	
		  // Используйте ваш Client ID для авторизации на Imgur
		  const clientId = '69672255265524a';
	
		  // Загрузка изображения на Imgur
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
	
		  // Удаление временного файла после загрузки на Imgur
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