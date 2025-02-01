const Order = require('../models/Order')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const {
	NotFoundError,
	BadRequestError,
	UnauthenticatedError,
} = require('../errors')

const {
	createTokenUser,
	addCookiesToResponse,
	checkPermissions,
} = require('../utils')

const getAllOrders = async (req, res) => {
	const orders = await Order.find({})
	res.status(StatusCodes.OK).json({ orders })
}

const getSingleOrder = async (req, res) => {
	const { id: orderId } = req.params

	const order = await Order.findOne({ _id: orderId })

	if (!order) {
		throw new NotFoundError(`There is no product with id: ${orderId}`)
	}
	res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrder = async (req, res) => {
	res.send('getCurrentUserOrder')
}

const fakeStripeApi = async ({ amount, currency }) => {
	const clientSecret = 'anyRandomValue'
	return { clientSecret, amount }
}

const createOrder = async (req, res) => {
	const { items: cartItems, tax, shippingFee } = req.body

	if (!cartItems || cartItems.length < 1) {
		throw new BadRequestError('There are no cart items')
	}

	if (!tax || !shippingFee) {
		throw new BadRequestError('Tax and shipping fee must be provided')
	}

	let orderItems = []
	let subTotal = 0

	for (const item of cartItems) {
		const databaseProduct = await Product.findOne({ _id: item.product })

		if (!databaseProduct) {
			throw new NotFoundError(`There is no product with id: ${item.product}`)
		}

		const { name, price, image, _id } = databaseProduct

		const orderItem = {
			amount: item.amount,
			name,
			price,
			image,
			product: _id,
		}

		// add item to order
		orderItems = [...orderItems, orderItem]

		// subtotal
		subTotal += item.amount * price
	}
	// total
	const total = tax + shippingFee + subTotal
	// client secret
	const paymentIntention = await fakeStripeApi({
		amount: total,
		currency: 'usd',
	})

	const order = await Order.create({
		orderItems,
		total,
		subtotal: subTotal,
		tax,
		shippingFee,
		clientSecret: paymentIntention.clientSecret,
		user: req.user.userId,
	})

	res
		.status(StatusCodes.CREATED)
		.json({ order, clientSecret: order.clientSecret })
}

const updateOrder = async (req, res) => {
	res.send('update order')
}

module.exports = {
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrder,
	createOrder,
	updateOrder,
}
