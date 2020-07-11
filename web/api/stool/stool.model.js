import mongoose from 'mongoose';

const stoolSchema = new mongoose.Schema({
	// The user who owns this stool
	userId: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	// The date this stool was recorded
	date: {
		type: Date,
		default: Date.now
	},
	// The type of stool according to Bristol's chart
	type: {
		type: Number,
		min: 1,
		max: 7
	},
	// How long the user was on the toilet
	speed: Number,
	// The amount of poo
	amount: {
		type: String,
		enum: ['Little', 'Normal', 'A lot']
	},
	// The foods associated with this stool
	food: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Food'
	}],
	// The exercises associated with this stool
	exercise: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Exercise'
	}]
});

export default mongoose.model('Stool', stoolSchema);