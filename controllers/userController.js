const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const getAllUsers = async (req, res) => {
	const users = await User.find({ role: 'user' }).select('-password')

	res.send(users)
}

const getSingleUser = async (req, res) => {
	const {
		params: { id: userId },
	} = req

	const user = await User.findOne({
		_id: userId,
	})
	// if (!user) {
	// 	throw new NotFoundError(`No user with id ${jobId}`)
	// }
	res.status(StatusCodes.OK).json({ user })

	// res.send(user)
}
const showCurrentUser = async (req, res) => {
	res.send('current user')
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
