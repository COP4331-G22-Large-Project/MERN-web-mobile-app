import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { Strategy } from 'passport-local';
import uid from 'uid';

import User, { emailRegex } from '../user/user.model';

const loginRouter = express.Router();

// Hashes password with salt 1000 times using sha512
function generatePasswordWithSalt(user, givenPassword) {
	return crypto.pbkdf2Sync(givenPassword, user._id.toString(), 1000, 64, 'sha512').toString('hex');
}

function validatePassoword(user, givenPassword) {
	const hashedPassword = generatePasswordWithSalt(user, givenPassword);
	return user.password === hashedPassword;
}

function logIn(username, password, done) {
	User.findOne({ $or: [{ username }, { email: username }] }, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user || !validatePassoword(user, password)) {
			return done(null, false, { message: 'Incorrect username/password '});
		}

		return done(null, user);
	});
}

passport.use(new Strategy(logIn));

// Allows Passport to let express-session link session to ID
passport.serializeUser((user, done) => {
	console.log('storing session');
	done(null, user._id)
});

// Allows Passport to grab a user based on ID
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		console.log('grabbed session of ' + (user || {}).username)
		done(err, user);
	});
})

// Main login route
loginRouter.post('/login',
	passport.authenticate('local'),
	(req, res) => {
		res.json(req.user.toObject());
	}
);

// Logout a user
loginRouter.post('/logout', (req, res) => {
	req.logout();
	console.log('logging out');
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.send('successfully logged out');
	});
});

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

	if (!username || !password || !email || !firstName || !lastName) {
		return res.status(400).send('missing fields');
	}

	isUserDuplicate().then(({ isUsername, isEmail }) => {
		if (isUsername) {
			return res.status(403).json({ err: 'Username already exists' });
		}
		if (!emailRegex.test(email)) {
			return res.status(400).json({ err: 'Malformed email syntax' });
		}
		if (isEmail) {
			return res.status(403).json({ err: 'Email already exists' });
		}

		const user = new User({
			firstName,
			lastName,
			username,
			email
		});
		user.password = generatePasswordWithSalt(user, password);
		user.save().then((savedUser) => {
			res.json(savedUser.toObject());
		}).catch(err => res.status(500).send(err));
	})
});

export default loginRouter;