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
    // origin: "http://localhost:3000",
    preflightContinue: false,
};

const app = express()
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
				app.listen(PORT, ()=> console.log(`server work on port ${PORT}`))
		} catch(e) {
				console.log(e)
		}
}

start()

