//Mongoose to connect to the database
const mongoose = require('mongoose');

const connectDb = (cb) => {
	mongoose.set('strictQuery', false);
	mongoose
		.connect(
			'mongodb://127.0.0.1/artworks'
		)
		.then(() => {
			console.log('DB connection successful');
			cb();
		})
		.catch((err) => {
			console.log('There is some error in db connection', err);
		});
};

module.exports = { connectDb };
