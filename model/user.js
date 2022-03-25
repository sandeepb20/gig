const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		name: {type: String, required: true},
		phone: {type: Number, required: true},
		address: {type: String, required: true},
		token: {type: String}
	},
	{ collection: 'User' }
)
const model = mongoose.model('UserSchema', UserSchema)
module.exports = model