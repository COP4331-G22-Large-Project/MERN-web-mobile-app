import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { Strategy } from 'passport-local';
import uid from 'uid';
import { typeCheck } from 'type-check';
import User, { emailRegex } from '../user/user.model';
import { createTransport } from 'nodemailer';

const API_URL = process.env.NODE_ENV === 'production'
	? 'https://largeproject.herokuapp.com'
	: 'http://localhost:3000';

// email auth
const sender_user = process.env.EMAIL_USER || "stool.analytics@gmail.com";
const sender_pass = process.env.EMAIL_PASSWORD || "Jm3naEDbfL5ned9";
const emailTransporter = createTransport({
	service: 'gmail',
	auth: {
		user: sender_user,
		pass: sender_pass
	}
});

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
		if (!user || !validatePassword(user, password)) {
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
			verificationToken: uid(16),
		});
		user.password = generatePasswordWithSalt(user, password);
		user.verificationToken = uid(16);
		user.save().then((savedUser) => {
			sendRegistrationEmail(savedUser);
			res.json(savedUser.toObject());
		}).catch(err => res.status(500).send(err));
	})
});

async function sendRegistrationEmail(user) {
	// set token for this user
	var token = user.verificationToken;

	// authentication email
	var mailOptions = {
		from: sender_user,
		to: user.email,
		subject: 'verification email',
		html: `You have registered for Brist-Tool. <a href="${API_URL}/api/auth/verify_token?token=${encodeURI(token)}">Click here</a> to complete the registration, or enter this code:<br><b>${token}</b>`
	};

	// send email and handle results
	emailTransporter.sendMail(mailOptions, function(error,info){
		if (error){
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

// given the token, verify the user
loginRouter.get('/verify_token', (req, res) => {
	// assumming this is how the user is sending us their token
	const { token } = req.query;

	User.findOne({ verificationToken: token }, (err, user) => {
		if (err) {
			return res.status(500).send(err);
		} else if (user) {
			user.verificationToken = null;
			user.verified = true;
			user.save().then(() => {
				if (req.xhr) {
					res.status(200).send('verified');
				} else {
					res.redirect('/login');
				}
			}).catch(e => res.status(500).send('error'));
		} else {
			res.status(401).send('Unauthorized');
		}
	});
});

// recreate and resend user's token
loginRouter.post('/retoken', (req, res) => {
	const { email } = req.body;

	if (emailRegex.test(email)) {
		User.findOne({ email }, (err, user) => {
			if (err) {
				res.status(500).send(err);
			} else if (user) {
				if (!user.verified) {
					// create and save new token
					user.verificationToken = uid(16);
					user.save().then((savedUser) => {
						sendRegistrationEmail(savedUser);
						res.status(200).send('success');
					}).catch(err => res.status(500).send(err));
				} else {
					res.status(200).send('already verified');
				}
			} else {
				// We're gonna call it a success
				res.status(200).send('success');
			}
		});
	} else {
		res.status(400).send('bad email syntax');
	}
});

// get email from user, get user object, send reset password to email
loginRouter.post('/repassword', (req, res) => 
{
	const reset_password_web_link = `${API_URL}/verifyforgottenpassword`;
	const { email } = req.body;

	User.findOne({email}, (err, user) => 
	{
		if (err) {
			res.status(500).send(err);
		}
		else if (!user)
		{
			res.status(200).send('success');
		}
		else if (!user.verified)
		{
			res.status(500).send('you must be verified to reset password');
		}
		else
		{
			user.passwordVerification = uid(16);
			user.save().then((savedUser) => 
			{
			
				const token = savedUser.passwordVerification;

				// authentication email
				var mailOptions = 
				{
					from: sender_user,
					to: savedUser.email,
					subject: 'password reset token',
					html: `You have requested (hopefully) to reset your Brist-Tool password. If you did not request a password reset, ignore this email. <a href="${reset_password_web_link}?token=${encodeURI(token)}">Click here</a> and enter this code:<br><b>${token}</b> to reset your passcode`
				};
				
				
				emailTransporter.sendMail(mailOptions, function(error,info){
					if (error){
						console.log(error);
					} else {
						res.status(200).send('success');
						
					}
				});
			}).catch(err => res.status(500).send(err));
		}
	});
});

loginRouter.post('/reset_password', (req,res) =>
{
	const { token, password } = req.body;
	
	User.findOne({ passwordVerification: token }, (err, user) =>
	{
		if (err)
		{
			res.status(500).send(err);
		}
		else if (!user)
		{
			res.status(401).send('Unauthorized');
		}
		else
		{
			user.password = generatePasswordWithSalt(user, password);
			user.passwordVerification = null;
			user.save().then((savedUser) =>
			{
				res.status(200).send('password reset');
			}).catch(err => res.status(500).send(err));
		}
	});
});
export default loginRouter;
