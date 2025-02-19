const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const { addCookiesToResponse, createTokenUser } = require('../utils')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
	const { email, name, password } = req.body

	const emailAlreadyExists = await User.findOne({ email })

	if (emailAlreadyExists) {
		throw new BadRequestError('Email already exists')
	}

	// find first registered user and set as admin
	const isFirstAccount = (await User.countDocuments()) === 0
	const role = isFirstAccount ? 'admin' : 'user'

	const user = await User.create({ email, name, password, role })

	const tokenUser = createTokenUser(user)

	addCookiesToResponse({ res, user: tokenUser })

	res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		throw new BadRequestError('Please provide email and password')
	}
	const user = await User.findOne({ email })
	const tokenUser = createTokenUser(user)
	addCookiesToResponse({ res, user: tokenUser })

	if (!user) {
		throw new UnauthenticatedError('Invalid Credentials')
	}
	const isPasswordCorrect = await user.comparePassword(password)

	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid Credentials (Password)')
	}

	res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	})
	res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}

module.exports = {
	register,
	login,
	logout,
}
