import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';

import loginRouter from './api/login/login.route';

const MongoStore = require('connect-mongo')(expressSession);

const sessionSecret = process.env.SESSION_SECRET || 'testing';

// Connect to MongoDB. Program exits if connection doesn't success

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

const app = express();
const port = process.env.PORT || 8000;

// Serve static files first, then look at api-related stuff
app.use(express.static(path.join(__dirname, 'build')));
// Parse cookies automatically
app.use(require('cookie-parser'));
// Convert body to JSON
app.use(bodyParser.json());
// Manage session tokens automatically and store in MongoDB
app.user(expressSession({
	secret: sessionSecret,
	resave: false,
	saveUnitialize: true,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		collection: 'Session'
	}),
}));
// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', loginRouter);
app.use('/api', passport.authenticate('local', { failureRedirect: '/login' }));

app.listen(port, () => console.log(`App listening on port ${port}`));