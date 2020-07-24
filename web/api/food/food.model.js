import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
	// The stool this food associates with
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
	// The date this food was recorded
	date: {
		type: Date,
		default: Date.now,
	},
	// The name of the food
	name: {
		type: String,
		required: true
	}
});

export default mongoose.model('Food', foodSchema);