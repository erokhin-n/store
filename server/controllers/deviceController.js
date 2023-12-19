const admin = require('firebase-admin');
const serviceAccount = require('../storepictures-db9c6-firebase-adminsdk-a2yb2-08ae3c94de.json'); // Замените на путь к вашему ключу сервисного аккаунта

const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: 'gs://storepictures-db9c6.appspot.com',
});

const storage = admin.storage();

class DeviceController {
	async create(req, res, next) {
		try {
			let { name, price, brandId, typeId, info } = req.body;
			const existName = await Device.findOne({ where: { name } });
			if (existName) throw ApiError.conflict('такое название устройства уже существует');
			const { img } = req.files;
			const fileName = uuid.v4() + '.jpg';
			// const imagePath = path.resolve(__dirname, '..', '/images', fileName);
		
			// img.mv(imagePath);
		
			const bucket = storage.bucket();
			const destinationPath = `images/${fileName}`;
		
			await bucket.upload(img, {
				destination: destinationPath,
				metadata: {
				contentType: 'image/jpeg',
				},
			});
		
			const imageUrl = destinationPath;
				
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
	
		  return res.json({ device, img: imageUrl });
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

	async deletePicture(req, res, next) {
		try {
			let {id} = req.body
			console.log(req.body)
			const deletedPicture = await Device.findOne({
				where: {id},
			})	
			await deletedPicture.destroy()
			return res.json({message: 'picture deleted'})
		} catch(e) {
			console.log('!!! DELETE PIC ERROR ' + e.message)
			return res.json({message: 'ошибка при удалении рисунка'})
		}
	}
}

module.exports = new DeviceController()