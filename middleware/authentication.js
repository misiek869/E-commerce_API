const CustomErr = require('../errors')
const { isTokenValid } = require('../utils')
const { UnauthorizedError } = require('../errors')

const authenticateUser = async (req, res, next) => {
	const token = req.signedCookies.token

	if (!token) {
		throw new CustomErr.UnauthenticatedError('Authentication Invalid')
	}

	try {
		const { name, userId, role } = isTokenValid({ token })
		req.user = { name, userId, role }
	} catch (error) {
		throw new CustomErr.UnauthenticatedError('Authentication Invalid')
	}

	next()
}

const authorizePermissions = (...rest) => {
	return (req, res, next) => {
		if (!rest.includes(req.user.role)) {
			throw new UnauthorizedError(`You can't access this route`)
		}
		next()
	}
}

module.exports = {
	authenticateUser,
	authorizePermissions,
}
