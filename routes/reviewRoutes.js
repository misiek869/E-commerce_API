const express = require('express')
const router = express.Router()
const {
	authenticateUser,
	authorizePermissions,
} = require('../middleware/authentication')

const {
	createReview,
	getAllReviews,
	getSingleReview,
	updateReview,
	deleteReview,
} = require('../controllers/reviewController')

router.post(
	'/',
	[authenticateUser, authorizePermissions('admin')],
	createReview
)

router.get('/', getAllReviews)
router.get('/:id', getSingleReview)
router.patch(
	'/:id',
	[authenticateUser, authorizePermissions('admin')],
	updateReview
)

router.delete(
	'/:id',
	[authenticateUser, authorizePermissions('admin')],
	deleteReview
)

module.exports = router
