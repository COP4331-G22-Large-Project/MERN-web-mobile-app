import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
	// The stool this exercise associates with
	stoolId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Stool',
		default: null
	},
	userId: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	// The date this exercise was recorded
	date: {
		type: Date,
		default: Date.now
	},
	// The name of the exercise
	name: String,
	// How long the exercise lasted
	duration: Number
});

export default mongoose.model('Exercise', exerciseSchema);