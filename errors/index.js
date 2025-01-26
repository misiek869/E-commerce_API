const CustomAPIError = require('./custom-api')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./NotFoundError')

module.exports = {
	CustomAPIError,
	BadRequestError,
	UnauthenticatedError,
	NotFoundError,
}
