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
		ref: 'User',
		required: true
	},
	// The date this exercise was recorded
	date: {
		type: Date,
		default: Date.now
	},
	// The name of the exercise
	name: {
		type: String,
		required: true
	},
	// How long the exercise lasted
	duration: {
		type: Number,
		required: true
	}
});

export default mongoose.model('Exercise', exerciseSchema);