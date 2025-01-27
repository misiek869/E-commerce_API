const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {
	NotFoundError,
	BadRequestError,
	UnauthenticatedError,
} = require('../errors')

const getAllUsers = async (req, res) => {
	const users = await User.find({ role: 'user' }).select('-password')
	res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res) => {
	const {
		params: { id: userId },
	} = req

	const user = await User.findOne({
		_id: userId,
	}).select('-password')

	if (!user) {
		throw new NotFoundError(`No user with id ${userId}`)
	}

	res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ user: req.user })
}
const updateUser = async (req, res) => {
	res.send('update user')
}
const updateUserPassword = async (req, res) => {
	const { newPassword, oldPassword } = req.body

	if (!newPassword || !oldPassword) {
		throw new BadRequestError('Please provide both values')
	}

	const user = await User.findOne({ _id: req.user.userId })

	const isPasswordCorrect = await user.comparePassword(oldPassword)

	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Please provide valid password')
	}

	user.password = newPassword

	await user.save()
	res.status(StatusCodes.OK).json({ msg: 'Password updated' })
}

module.exports = {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
}
