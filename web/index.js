import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';

import loginRouter from './api/login/login.route.js';
import stoolRouter from './api/stool/stool.route';
import foodRouter from './api/food/food.route';
import exerciseRouter from './api/exercise/exercise.route';

const MongoStore = require('connect-mongo')(expressSession);

const sessionSecret = process.env.SESSION_SECRET || 'testing';

// Connect to MongoDB. Program exits if connection doesn't success


const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Brist-Tool';
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
mongoose.set('useCreateIndex', true);

const app = express();
const port = process.env.PORT || 8000;

// Serve static files first, then look at api-related stuff
app.use(express.static(path.join(__dirname, 'build')));
// Parse cookies automatically
app.use(cookieParser());
// Convert body to JSON
app.use(bodyParser.json());
// Manage session tokens automatically and store in MongoDB
app.use(expressSession({
	secret: sessionSecret,
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		collection: 'Session'
	})
}));
// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Place this function before any API routes that should only allow logged-in users
function ensureLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).send('Unauthorized');
	}
}

app.use('/api/auth', loginRouter);
// app.use('/api', passport.authenticate('local', { failureRedirect: '/login' }));

app.use('/api/secret',
	ensureLoggedIn,
	(req, res) => {
		res.send('Welcome to the secret club, ' + req.user.username);
	}
);

app.use('/api/stool',
	ensureLoggedIn,
	stoolRouter
);
app.use('/api/food',
	ensureLoggedIn,
	foodRouter
);
app.use('/api/exercise',
	ensureLoggedIn,
	exerciseRouter
);

// If there was no matching request
app.use((req, res) => {
	res.status(404).send('Route not found');
});

app.listen(port, () => console.log(`App listening on port ${port}`));
