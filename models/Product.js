const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide product name'],
			maxlength: [100, `Name can't be longer than 100 characters`],
			minlength: 3,
		},
		price: {
			type: Number,
			required: [true, 'Please provide product price'],
			default: 0,
		},
		description: {
			type: String,
			required: [true, 'Please provide product description'],
			maxlength: [1000, `Description can't be longer than 1000 characters`],
			minlength: 10,
		},
		image: {
			type: String,
			default: '/uploads/small.jpg',
		},
		category: {
			type: String,
			required: [true, 'Please provide product category'],
			enum: ['office', 'kitchen', 'bedroom'],
		},
		company: {
			type: String,
			required: [true, 'Please provide company'],
			enum: {
				values: ['Cozy Corner Furniture', 'Modern Living', 'Furniture Haven'],
				message: '{VALUE} is not supported',
			},
		},
		colors: {
			type: [String],
			default: ['#222'],
			required: true,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		freeShipping: {
			type: Boolean,
			default: false,
		},
		inventory: {
			type: Number,
			required: true,
			default: 15,
		},
		averageRating: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

module.exports = mongoose.model('Product', ProductSchema)
