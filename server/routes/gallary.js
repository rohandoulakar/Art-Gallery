const express = require('express');
const { checkLogin, isUserArtist } = require('../middleware/user');
const Gallery = require('../models/Gallery');
const Review = require('../models/Review');
const User = require('../models/User');
const galleryRouter = express.Router();

galleryRouter.get('/', async (req, res) => {
	return res.render('gallery');
});

//When the user wants to add art
galleryRouter.get('/add', async (req, res) => {
	return res.render('add-artwork');
});

//Search
galleryRouter.get('/all', async (req, res) => {
	try {
		let page = req.query.page || 0;
		let search = req.query.query || '';

		let searchObj = {};
		if (search) {
			searchObj = {
				$or: [
					//Regular Expression
					{ name: new RegExp(search, 'i') },
					{ category: new RegExp(search, 'i') },
				],
			};
		}
		//Gets all the art images
		const arts = await Gallery.find(searchObj)
			.select(['-reviews'])
			.populate('artist');

		return res.status(200).send({ status: 200, arts });
	} catch (error) {
		console.log('There is some error in gallery get router', error);

		return res
			.status(500)
			.send({ status: 500, message: 'internal server error' });
	}
});

//Will update with the new image added
galleryRouter.post(
	'/art',
	checkLogin,
	//  isUserArtist,
	async (req, res) => {
		try {
			const { name, year, category, medium, description, image } =
				req.body;

			// check if are is already there
			const existingArt = await Gallery.findOne({
				name,
			});

			if (existingArt) {
				return res.status(409).send({
					status: 409,
					message: 'Art with same name exists',
				});
			}

			// create new art
			const art = new Gallery({
				name,
				artist: req.session.user.id,
				year,
				category,
				medium,
				description,
				image,
			});

			await art.save();
			return res
				.status(200)
				.send({ status: 200, message: 'Added successfully' });
		} catch (error) {
			console.log('There is some error in art post api', error);
			return res
				.status(500)
				.send({ status: 500, message: 'internal server error' });
		}
	}
);

//Will find the reviews for a given art image in the gallery
galleryRouter.get(
	'/reviews/:artId',
	checkLogin,
	async (req, res) => {
		try {
			const artId = req.params.artId;
			// get reviews
			const reviews = await Review.find({ art: artId }).select([
				'review',
			]);
			return res.render('reviews', { reviews });
		} catch (error) {
			console.log('There is some error in artId router', error);
			return res
				.status(500)
				.send({ status: 500, message: 'internal server error' });
		}
	}
);


galleryRouter.post('/like/:artId', checkLogin, async (req, res) => {
	try {
		const artId = req.params.artId;
		const liked = req.body.liked;

		await Gallery.findByIdAndUpdate(artId, {
			$inc: { likes: liked ? 1 : -1 },
		});

		if (liked) {
			await User.findByIdAndUpdate(req.session.user.id, {
				$push: {
					liked: artId,
				},
			});
		} else {
			await User.findByIdAndUpdate(req.session.user.id, {
				$pull: {
					liked: artId,
				},
			});
		}
		return res.status(200).send({ status: 200, message: 'Successful' });
	} catch (error) {
		console.log('There is some error in artId router', error);
		return res
			.status(500)
			.send({ status: 500, message: 'internal server error' });
	}
});

//When the user wants to add a review it will render the add review page
galleryRouter.get('/review/add/:artId', checkLogin, async (req, res) => {
	try {
		//Will render the pug file to add the review
		return res.render('add-review');
	} catch (error) {
		console.log('There is some error in review add api', error);
		return res
			.status(500)
			.send({ status: 500, message: 'internal server error' });
	}
});

//After the review information is sent
galleryRouter.post('/review/add', checkLogin, async (req, res) => {
	try {
		const { artId, review } = req.body;

		// create review
		const r = new Review({
			review,
			art: artId,
			user: req.session.user.id,
		});

		const dbRes = await r.save();
		const reviewId = dbRes.id;

		// review in user and review
		await User.findByIdAndUpdate(req.session.user.id, {
			$push: { reviews: reviewId },
		});

		await Gallery.findByIdAndUpdate(artId, {
			$push: {reviews: reviewId}
		});

		return res.status(200).send({status:200, message:'Added successfully'})
	} catch (error) {
		console.log('There is some error in review add api', error);
		return res
			.status(500)
			.send({ status: 500, message: 'internal server error' });
	}
});


module.exports = galleryRouter;
