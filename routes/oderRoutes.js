const express = require('express')
const router = express.Router()
const {
	authenticateUser,
	authorizePermissions,
} = require('../middleware/authentication')

const {
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrder,
	createOrder,
	updateOrder,
} = require('../controllers/orderController')

router.post('/', [authenticateUser], createOrder)

router.get('/', [authenticateUser, authorizePermissions('admin')], getAllOrders)

router.get('/:id', [authenticateUser], getSingleOrder)

router.get('/:id', [authenticateUser], getCurrentUserOrder)

router.patch('/:id', [authenticateUser], updateOrder)

module.exports = router
