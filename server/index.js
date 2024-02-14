require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT || 7000
const model = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')
const cookieParser = require('cookie-parser')

const corsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "https://frontend-s4ut.onrender.com",
    preflightContinue: false,
};

const app = express() 

// app.use((req, res, next) => {
// console.log('use work')
//   if (!req.originalUrl.startsWith('/api')) {
// console.log('api work')
//     res.sendFile(path.resolve(__dirname, '..', 'client', 'public', 'index.html'));
//   } else {
// console.log('error work')
//     next();
//   }
// });

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, ()=> console.log(`server worked on port ${PORT}`))
	} catch(e) {
		console.log(e)
	}
}

start()

