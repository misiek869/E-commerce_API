const express = require('express')
const router = express.Router()

const {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
} = require('../controllers/userController')

router.get('/all', getAllUsers)

module.exports = router
