const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

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
	res.send('update password')
}

module.exports = {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
}
