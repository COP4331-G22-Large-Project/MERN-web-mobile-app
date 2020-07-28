import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';

import loginRouter from './api/login/login.route.js';
import stoolRouter from './api/stool/stool.route.js';
import foodRouter from './api/food/food.route.js';
import exerciseRouter from './api/exercise/exercise.route.js';

const MongoStore = require('connect-mongo')(expressSession);

const sessionSecret = process.env.SESSION_SECRET || 'testing';

// Connect to MongoDB. Program exits if connection doesn't success


const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://dguerry:cop4331c@cluster1-z3lyd.mongodb.net/<dbname>?retryWrites=true&w=majority';
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
app.use(express.static(path.join(__dirname, '/build')));
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

const apiRouter = express.Router();

apiRouter.use('/auth', loginRouter);

apiRouter.post('/user',
	ensureLoggedIn,
	(req, res) => {
		res.json(req.user.toObject());
	}
);

apiRouter.use('/secret',
	ensureLoggedIn,
	(req, res) => {
		res.send('Welcome to the secret club, ' + req.user.username);
	}
);

apiRouter.use('/stool',
	ensureLoggedIn,
	stoolRouter
);
apiRouter.use('/food',
	ensureLoggedIn,
	foodRouter
);
apiRouter.use('/exercise',
	ensureLoggedIn,
	exerciseRouter
);

apiRouter.use((req, res) => {
	res.status(404).send('API route not found');
})

app.use('/api', apiRouter);

// If there was no matching request, then it's a client route
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(port, () => console.log(`App listening on port ${port}`));
