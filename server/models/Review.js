const mongoose = require('mongoose');

//Schema to add a review
const reviewSchema = new mongoose.Schema({
	review: {
		type: String,
		required: true,
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

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
