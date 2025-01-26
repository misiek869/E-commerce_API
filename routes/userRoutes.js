const express = require('express')
const router = express.Router()

const {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
} = require('../controllers/userController')

router.get('/', getAllUsers)

router.get('/showMe', showCurrentUser)

router.post('/updateUser', updateUser)

router.post('/updateUserPassword', updateUserPassword)

// route with id have to be at the end
router.get('/:id', getSingleUser)

module.exports = router
