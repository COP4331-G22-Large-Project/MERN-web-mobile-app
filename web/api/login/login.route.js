import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { Strategy } from 'passport-local';
import uid from 'uid';

import User, { emailRegex } from '../user/user.model';

const loginRouter = express.Router();

// Hashes password with salt 1000 times using sha512
function generatePasswordWithSalt(user, givenPassword) {
	return crypto.pbkdf2Sync(givenPassword, user._id, 1000, 64, 'sha512').toString('hex');
}

function validatePassoword(user, givenPassword) {
	return userPassword === generatePasswordWithSalt(user, givenPassword);
}

function logIn(username, password, done) {
	User.findOne({ $or: [{ username }, { email: username }] }, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user || validatePassoword(user, password)) {
			return done(null, false, { message: 'Incorrect username/password '});
		}

		return done(null, user);
	});
}

passport.use(new Strategy(logIn));

// Allows Passport to let express-session link session to ID
passport.serializeUser((user, done) => {
	done(null, user._id)
});

// Allows Passport to grab a user based on ID
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		if (err) {
			return done(err);
		}
		done(err, user);
	});
})

// Main login route
loginRouter.post('/login',
	passport.authenticate('local'),
	(req, res) => {
		const { user } = req;
	}
);

// Logout a user
loginRouter.post('/logout',
	passport.authenticate('local'),
	(req, res) => {
		req.session.destroy((err) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.send('successfully logged out');
		});
	}
);

async function isUserDuplicate(username, email) {
	const usernameUser = await User.exists({ username });
	const emailUser = await User.exists({ email });

	return { isUsername: usernameUser, isEmail: emailUser };
}

loginRouter.post('/register', (req, res) => {
	const {
		username,
		password,
		email,
		firstName,
		lastName,
	} = req.body;

	isUserDuplicate().then(({ isUsername, isEmail }) => {
		if (isUsername) {
			return req.status(403).json({ err: 'Username already exists' });
		}
		if (!emailRegex.test(email)) {
			return req.status(400).json({ err: 'Malformed email syntax' });
		}
		if (isEmail) {
			return req.status(403).json({ err: 'Email already exists' });
		}

		const user = new User({
			firstName,
			lastName,
			username,
			email
		});
		user.password = generatePasswordWithSalt(user, password);
		user.save().then((savedUser) => {
			res.json(savedUser);
		}).catch(err => res.status(500).send(err));
	})
});