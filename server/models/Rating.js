const mongoose = require('mongoose');

//Used this package to see whether the image is liked
const { boolean } = require('webidl-conversions');

//Schema to rate the image
const ratingSchema = new mongoose.Schema({
	liked:{
        type: boolean,
        required: true
    },
	art:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gallery",
        required: true
    },
	user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
