import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { Strategy } from 'passport-local';
import uid from 'uid';
import { typeCheck } from 'type-check';

import User, { emailRegex } from '../user/user.model';

// email verification requirements
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
		user.verfication = "false";
		user.save().then((savedUser) => {
			res.json(savedUser.toObject());
		}).catch(err => res.status(500).send(err));
	})
});

// a variable we can set from once from one endpoint and verify from a second
// we need a different instance of this for every user....
const token; // this won't work huh
const sender_user = 'test@gmail.com';
const sender_pass = 'this_is_a_fake_password';

// Request Verification
loginRouter.post('/verify_request', (req, res) => {
	
	// is user verified?
	if (User.verfication == "true")
	{
		res.body = {response: "You are already verified"};
		return res;
	}

	// set token for this user
	token = "hi";
	
	// create an object which can send mail
	// the server and authentication information should belong to the app
	var transporter = createTransport({
		service: 'gmail',
		auth: {
			user: sender_user, // for testing
			pass: sender_pass // not working
		}
	});

	// authentication email
	var mailOptions = {
		from: sender_user,
		to: User.email,
		subject: 'verification',
		text: token
	};

	// send email and handle results
	transporter.sendMail(mailOptions, function(error,info){
		if (error){
			console.log(error)
			res.body = { // tell the user error
				response: error.toString(),
			}
		} else {
			console.log('Email sent: ' + info.response);
			res.body = { // tell user success
				response: 'Email sent ' + info.response,
			}
		}
	});
});

// given the token, verify the user
loginRouter.post('/verify_token', (req, res) => {
	// assumming this is how the user is sending us their token
	const {
		maybe_token
	} = req.body;
	
	// response object
	res.json({verfied: String});

	// verify token and time
	if (maybe_token == token)
	{
		// respond to user
		res.verfied = "true";
		// verify user in db
		User.body.verfication = "true";
	}
	else
		res.verfied = "false";
})

export default loginRouter;