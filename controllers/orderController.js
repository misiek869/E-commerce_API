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
	res.send('all ordrs')
}

const getSingleOrder = async (req, res) => {
	res.send('get single order')
}

const getCurrentUserOrder = async (req, res) => {
	res.send('getCurrentUserOrder')
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

	console.log(orderItems)
	console.log(subTotal)

	res.send('create order')
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
