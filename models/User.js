const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide name'],
		maxlength: 50,
		minlength: 3,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Please provide email'],
		// match: [
		// 	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		// 	'Please provide a valid email',
		// ],
		validate: {
			validator: validator.isEmail,
			message: 'Please provide valid email',
		},
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minlength: 6,
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
})

UserSchema.pre('save', async function () {
	if (!this.isModified('password')) return

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
	const isMatch = await bcrypt.compare(canditatePassword, this.password)
	return isMatch
}

module.exports = mongoose.model('User', UserSchema)
