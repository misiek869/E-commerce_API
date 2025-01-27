const { UnauthorizedError } = require('../errors')

const checkPermissions = (requestUser, resourceUserId) => {
	// console.log(requestUser)
	// console.log(resourceUserId)
	// console.log(typeof resourceUserId)

	if (requestUser.role === 'admin') return

	if (requestUser.userId === resourceUserId.toString()) return

	throw new UnauthorizedError(`You can't access this route`)
}

module.exports = checkPermissions
