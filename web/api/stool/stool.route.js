import express from 'express';
import typeCheck from 'type-check';
import Stool from './stool.model';

// These values help derive how old a food/exercise should be until it counts towards a stool.
// More research should be done to accurately detemine these values
// Unit is in hours
const FOOD_AGE = 7;
const EXERCISE_AGE = 1;

function hoursToMilli(h) {
	return h * 60 * 60 * 1000;
}

const stoolRouter = express.Router();

/* Searches for a stool that matches the given params
	dateMin/dateMax - the date range
	typeMin/typeMax - the type range
	amount			- array of the amount of stool. Matches any stool with an amount listed.
	food			- array of food used in the stool. Must contain at least all of them
	exercise		- array of exercise used in the stool. Must contain at least all of them

	The parameters are defaulted so that excluding them does not reduce results.
	Excluding all returns all
*/
async function searchStool(
	userId, 
	{
		dateMin = 0,
		dateMax = Number.MAX_VALUE,
		typeMin = 1,
		typeMax = 7,
		amount = ['Little', 'Normal', 'A lot'],
		food = [],
		exercise = []
	}
) {
	if (!userId) {
		throw { status: 401, msg: 'Unauthorized' };
	}
	if (typeCheck(
		'{dateMin: Number, dateMax: Number, typeMin: Number, typeMax: Number, amount: [String], food: [String], exercise: [String]}',
		{ dateMin, dateMax, typeMin, typeMax, food, exercise }
	)) {
		throw { status: 400, msg: 'Invalid search paramters' };
	}
	return await Stool
		.find({
			date: { $lte: dateMax, $gte: dateMin },
			type: { $lte: typeMax, $gte: typeMin },
			amount: { $in: amount },
		})
		.populate({
			path: 'food',
			match: { food: { $all: food } }
		})
		.populate({
			path: 'exercise',
			match: { exercise: { $all: exercise } }
		});
}

stoolRouter.get('/', (req, res) => {
	searchStool(req.user._id).then((stools) => {
		res.json(stools);
	}).catch(e => res.status(e.status || 500).send(e.msg));
});

stoolRouter.get('/search', (req, res) => {
	searchStool(req.user, req.query).then((stools) => {
		res.json(stools);
	}).catch(e => res.status(e.status || 500).send(e.msg));
});

stoolRouter.post('/add', (req, res) => {
	const { type, speed, amount } = req.body;

	const now = Date.now();

	const newStool = new Stool({ type, speed, amount });
	const promises = [
		Food.find({
			userId: req.user._id,
			stoolId: null,
			date: { $lte: now - hoursToMilli(FOOD_AGE) }
		}),
		Exercise.find({
			userId: req.user._id,
			stoolId: null,
			date: { $lte: now - hoursToMilli(EXERCISE_AGE) }
		})
	];
	Promise.all(promises).then((values) => {
		newStool.foods = values[0];
		newStool.exercises = values[1];

		newStool.save((stool) => {
			res.json(stool);
		}).catch(e => res.status(500).send(e));
	}).catch(e => res.status(500).send(e));
});

stoolRouter.delete('/delete', (req, res) => {
	const { stools } = req.body;
	if (typeCheck('[String]', stools)) {
		Stool.deleteMany({ userId: req.user._id, _id: { $in: stools } }, (err) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.send('successfully deleted');
		})
	} else {
		res.status(400).send('stools must be array of ids');
	}
});

export default stoolRouter;
export { searchStool };