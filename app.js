require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

// database
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/oderRoutes')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 60,
	})
)
app.use(helmet())
app.use(cors())
// app.use(xss())
app.use(mongoSanitize())

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

// set public for static assets
app.use(express.static('./public'))
app.use(fileUpload())

// app.get('/', (req, res) => {
// 	res.send('e-commerce')
// })
app.get('/api/v1', (req, res) => {
	console.log(req.signedCookies)
	res.send('e-commerce')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/orders', orderRouter)

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
