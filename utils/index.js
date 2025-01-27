const { createJWT, isTokenValid, addCookiesToResponse } = require('./jwt')
const { createTokenUser } = require('./createTokenUser')
const checkPermissions = require('./checkPermissions')

module.exports = {
	createJWT,
	isTokenValid,
	addCookiesToResponse,
	createTokenUser,
	checkPermissions,
}
