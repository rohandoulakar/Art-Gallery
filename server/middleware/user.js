
//Will check if the user is logged in
const checkLogin = async (req, res, next) => {
	try {
		if (
			req.session.user &&
			req.session.user.username &&
			req.session.user.type
		) {
			next();
		} else {
			return res
				.status(401)
				.send({ status: 401, message: 'Unauthorized user' });
		}
	} catch (error) {
		console.log('There is some error in checkLogin middleware', error);
		return res
			.status(500)
			.send({ status: 500, message: 'internal server error' });
	}
};

//Function to check whether the user is an artist or patron
const isUserArtist = async (req, res, next) => {
	try {
		if (
			req.session.user &&
			req.session.user.username &&
			req.session.user.type == 'artist'
		)
			next();
		else {
			return res
				.status(401)
				.send({ status: 401, message: 'User is not artist' });
		}
	} catch (error) {
		console.log('There is some error in isUserArtist middleware', error);
		return res
			.status(500)
			.send({ status: 500, message: 'internal server error' });
	}
};

module.exports = { checkLogin, isUserArtist };
