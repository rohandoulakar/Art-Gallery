const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { connectDb } = require('./server/db');

//File path for all the user routes on the server side
const userRouter = require('./server/routes/user');

//File path for all the gallery routes on the server side
const galleryRouter = require('./server/routes/gallary');

const app = express();

app.use(express.static('public'));
app.set('views', './public/views');
app.set('view engine', 'pug');

//Port on which the server is running on
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: 'FYR3782YRPH',
	})
);

app.use('/user', userRouter);
app.use('/gallery', galleryRouter);
app.get('/signup', (req, res) => {
	return res.render('login', {
		buttonText: 'Sign Up',
	});
});
app.use('/', (req, res) => {
	//When the user is logged in
	if (req.session.user && req.session.username) {
	} else {
		return res.render('login', {
			buttonText: 'Login',
		});
	}
});
connectDb(() => {
	app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}`);
	});
});
