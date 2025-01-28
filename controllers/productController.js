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

const createProduct = async (req, res) => {
	res.send('create')
}
const getAllProducts = async (req, res) => {
	res.send('get all')
}
const getSingleProduct = async (req, res) => {
	res.send('get single')
}
const updateProduct = async (req, res) => {
	res.send('update')
}
const deleteProduct = async (req, res) => {
	res.send('delete')
}
const uploadImage = async (req, res) => {
	res.send('upload image')
}

module.exports = {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
}
