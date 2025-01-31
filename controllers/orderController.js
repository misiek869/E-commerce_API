const Review = require('../models/Review')
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
	res.send('get all orders')
}
const getSingleOrder = async (req, res) => {
	res.send('get single order')
}
const getCurrentUserOrder = async (req, res) => {
	res.send('getCurrentUserOrder')
}
const createOrder = async (req, res) => {
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
