const mongoose = require('mongoose');

//Schema to keep the user's data
//Will keep track of the username, password, type of account, liked images and reviews
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ['patron', 'artist'],
		default: 'patron',
	},
	follows: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	],
	liked: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review',
			required: true,
		},
	],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
