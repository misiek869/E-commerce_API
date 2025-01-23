require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// packages
const morgan = require('morgan')

// database
const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
	res.send('e-commertce')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL)
		app.listen(port, () => console.log(`server on port ${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()
