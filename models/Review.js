const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: [true, 'Please provide rating'],
		},
		title: {
			type: String,
			trim: true,
			required: [true, 'Please provide title'],
			maxlength: [50, `Title can't be longer than 100 characters`],
			minlength: 10,
		},
		comment: {
			type: String,
			required: [true, 'Please provide commnet'],
			maxlength: [300, `Title can't be longer than 300 characters`],
			minlength: 10,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		product: {
			type: mongoose.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
	},
	{ timestamps: true }
)

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

ReviewSchema.statics.calculateAverageRating = async function (productId) {
	const result = await this.aggregate([
		{
			$match: { product: productId },
		},
		{
			$group: {
				_id: null,
				averageRating: { $avg: '$rating' },
				numberOfReviews: { $sum: 1 },
			},
		},
	])

	try {
		await this.model('Product').findOneAndUpdate(
			{ _id: productId },
			{
				averageRating: Math.ceil(result[0]?.averageRating || 0),
				numberOfReviews: result[0]?.numOfReviews || 0,
			}
		)
	} catch (error) {
		console.log(error)
	}
}

ReviewSchema.post('save', async function () {
	await this.constructor.calculateAverageRating(this.product)
})
ReviewSchema.post(
	'deleteOne',
	{ document: true, query: false },
	async function () {
		await this.constructor.calculateAverageRating(this.product)
	}
)

module.exports = mongoose.model('Review', ReviewSchema)
