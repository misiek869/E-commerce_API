const Review = require('../models/Review')
const { StatusCodes } = require('http-status-codes')
const {
	NotFoundError,
	BadRequestError,
	UnauthenticatedError,
} = require('../errors')
const path = require('path')
const {
	createTokenUser,
	addCookiesToResponse,
	checkPermissions,
} = require('../utils')

const createReview = async (req, res) => {
	req.body.user = req.user.userId
	const review = await Product.create(req.body)
	res.status(StatusCodes.CREATED).json({ review })
}

const getAllReviews = async (req, res) => {
	const reviews = await Product.find({})
	res.status(StatusCodes.OK).json({ reviews })
}

const getSingleReview = async (req, res) => {
	// const { id: productID } = req.params
	// const product = await Product.findOne({ _id: productID })
	// if (!product) {
	//   throw new NotFoundError(`There is no product with id: ${productID}`)
	// }
	// res.status(StatusCodes.OK).json({ product })
}

const updateReview = async (req, res) => {
	res.send('update')
}
const deleteReview = async (req, res) => {
	res.send('delete')
}
