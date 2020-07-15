import mongoose from 'mongoose';

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		unique: true,
		match: emailRegex
	},
	username: {
		type: String,
		unique: true
	},
	password: String,

	// can tell us if a user is verified or not
	// can be a place to store user verification token + timeout time
	verification: String, // we should probably put this in another document
});

// When converting to an object, strip out the password and _id since they are sensitive
if (!userSchema.options.toObject) userSchema.options.toObject = {};
userSchema.options.toObject.transform = function (doc, ret, options) {
	delete ret._id;
	delete ret.password;

	return ret;
}

export default (mongoose.model('User', userSchema));

export { emailRegex };