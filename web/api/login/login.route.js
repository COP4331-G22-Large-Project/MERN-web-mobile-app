import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { Strategy } from 'passport-local';
import uid from 'uid';
import { typeCheck } from 'type-check';

import User, { emailRegex } from '../user/user.model';

import { createTransport } from 'nodemailer';

const loginRouter = express.Router();

// Hashes password with salt 1000 times using sha512
function generatePasswordWithSalt(user, givenPassword) {
	return crypto.pbkdf2Sync(givenPassword, user._id.toString(), 1000, 64, 'sha512').toString('hex');
}

function validatePassword(user, givenPassword) {
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
	done(null, user._id)
});

// Allows Passport to grab a user based on ID
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
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

	if (!typeCheck('{username: String, password: String, email: String}', { username, password, email })) {
		return res.status(400).send('Invalid request parameters');
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
			email,
			verfication,
		});
		user.password = generatePasswordWithSalt(user, password);
		let date_obj = new Date();
		user.verfication = "false";
		user.save().then((savedUser) => {
			res.json(savedUser.toObject());
		}).catch(err => res.status(500).send(err));
	})
});

const token;

// add a secret key to user
loginRouter.post('/verify_request', (req, res) => {
	token = "hi";
	
	var transporter = createTransport({
		service: 'gmail',
		auth: {
			user: 'coydiego@gmail.com',
			pass: 'Peeper71!'
		}
	});

	var mailOptions = {
		from: 'coydiego@gmail.com',
		to: User.email,
		subject: 'verification',
		text: token
	};

	transporter.sendMail(mailOptions, function(error,info){
		if (error){
			console.log(error)
			res.body = {
				response: error.toString(),
			}
		} else {
			console.log('Email sent: ' + info.response);
			res.body = {
				response: 'Email sent ' + info.response,
			}
		}
	});
});

//
loginRouter.post('/verify_token', (req, res) => {
	const {
		maybe_token
	} = req.body;

	res.json({verfied: String});
	if (maybe_token == token)
		res.verfied = "true";
	else
		res.verfied = "false";
})

export default loginRouter;