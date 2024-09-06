const mongoose = require('mongoose');

//Schema for the images in the gallery
const gallerySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	artist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	medium: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	likes: {
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

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
