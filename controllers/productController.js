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
	req.body.user = req.user.userId
	const product = await Product.create(req.body)
	res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
	const products = await Product.find({})
	res.status(StatusCodes.OK).json({ products, count: products.length })
}

const getSingleProduct = async (req, res) => {
	const { id: productID } = req.params
	const product = await Product.findOne({ _id: productID })

	if (!product) {
		throw new NotFoundError(`There is no product with id: ${productID}`)
	}

	res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {
	const { id: productID } = req.params

	const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
		new: true,
		runValidators: true,
	})

	if (!product) {
		throw new NotFoundError(`There is no product with id: ${productID}`)
	}

	res.status(200).json({ product })
}

const deleteProduct = async (req, res) => {
	const { id: productId } = req.params

	const product = await Product.findOne({ _id: productId })

	if (!product) {
		throw new CustomError.NotFoundError(`No product with id : ${productId}`)
	}

	await product.deleteOne()
	res.status(StatusCodes.OK).json({ msg: 'Product removed.' })
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
