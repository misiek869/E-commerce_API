const express = require('express')
const router = express.Router()
const {
	authenticateUser,
	authorizePermissions,
} = require('../middleware/authentication')

const {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
} = require('../controllers/productController')

router.get('/', getAllProducts)
router.get('/:id', getSingleProduct)
router.post('/', authorizePermissions('admin'), createProduct)
router.delete('/:id', authorizePermissions('admin'), deleteProduct)
router.patch('/:id', authorizePermissions('admin'), updateProduct)
router.post('/', authorizePermissions('admin'), uploadImage)

module.exports = router
