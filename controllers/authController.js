const User = require('../models/User')

const { StatusCodes } = require('http-status-codes')

const CustomAPIError = require('../errors')

const register = async (req, res) => {
	const user = await User.create(req.body)
	res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
	// const { email, password } = req.body
	// if (!email || !password) {
	// 	// throw new BadRequestError('Please provide email and password')
	// }
	// const user = await User.findOne({ email })
	// if (!user) {
	// 	// throw new UnauthenticatedError('Invalid Credentials')
	// }
	// const isPasswordCorrect = await user.comparePassword(password)
	// if (!isPasswordCorrect) {
	// 	// throw new UnauthenticatedError('Invalid Credentials')
	// }

	res.send('login')
}

const logout = async (req, res) => {
	// const user = await User.create({ ...req.body })
	// res.status(StatusCodes.CREATED).json({ user: { name: user.name } })
	res.send('logout')
}

module.exports = {
	register,
	login,
	logout,
}
