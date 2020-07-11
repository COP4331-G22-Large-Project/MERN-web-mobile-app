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
		ref: 'User'
	},
	// The date this food was recorded
	date: {
		type: Date,
		default: Date.now
	},
	// The name of the food
	name: String
});

export default mongoose.model('Food', foodSchema);