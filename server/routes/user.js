const express = require('express');
const { checkLogin } = require('../middleware/user');
const User = require('../models/User');
const userRouter = express.Router();

//When a new user wants to sign up
userRouter.post('/create', async (req, res) => {
	try {
		const { username, password } = req.body;

		//If the username or password fields are not empty
		if (!username || !password) {
			return res
				.status(400)
				.send({ status: 400, message: 'invalid username or password' });
		}

		// check if user exist
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res
				.status(400)
				.send({ status: 400, message: 'user already exists' });
		}

		// create user
		const user = new User({ username, password });
		await user.save();

		return res
			.status(200)
			.send({ status: 200, message: 'User created successfully' });
	} catch (error) {
		console.log('There is some error in createUser api', error);
		return res
			.status(500)
			.send({ status: 500, message: 'internal server error' });
	}
});

//When the user wants to login
userRouter.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username, password });
		//If the user exists in the database
		if (user) {
			req.session.user = {
				username,
				type: user.type,
				id: user._id,
			};
			return res.status(200).send({
				status: 200,
				message: 'Login successful',
				userId: user._id,
			});
		} else {
			return res
				.status(400)
				.send({ status: 400, message: 'invalid username or password' });
		}
	} catch (error) {
		console.log('There is some error in loginUser api', error);
		return res
			.status(500)
			.send({ status: 500, message: 'internal server error' });
	}
});

//Will update the user account type
userRouter.patch('/update-type', checkLogin, async (req, res) => {
	try {
		const type = req.body.type;

		const user = req.session.user;
		await User.findByIdAndUpdate(user.id, {
			$set: { type },
		});
		req.session.user.type = type;

		return res
			.status(200)
			.send({ status: 200, message: 'update successful' });
	} catch (error) {
		console.log('There is some error in changeUserType api', error);
		return res
			.status(500)
			.send({ status: 500, message: 'internal server error' });
	}
});

//When the user logs out
userRouter.get('/logout', checkLogin, async (req, res) => {
	req.session = {};
	return res.status(200).send({ status: 200, message: 'Logout successful' });
});

userRouter.get('/:userId', checkLogin, async (req, res) => {
	try {
		const userId = req.params.userId;

		//For the given user id it will output all the reviews for a given product
		const user = await User.findById(userId).populate('reviews');
		
		return res.render('user', {
			reviews: user.reviews,
		});
	} catch (error) {
		console.log('There is some error in get user router', error);
		return res
			.status(500)
			.send({ status: 500, message: 'internal server error' });
	}
});

module.exports = userRouter;
