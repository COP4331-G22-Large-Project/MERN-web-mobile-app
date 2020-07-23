import express from 'express';
import escapeRegExp from 'lodash.escaperegexp';
import Food from '../food/food.model';
import Exercise from '../exercise/exercise.model';
import { typeCheck } from 'type-check';

import Stool from './stool.model';

// These values help derive how old a food/exercise should be until it counts towards a stool.
// More research should be done to accurately detemine these values
// Unit is in hours
const FOOD_AGE = 0;
const EXERCISE_AGE = 0;

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
		dateMin = '0',
		dateMax = String(Date.now()),
		typeMin = '1',
		typeMax = '7',
		amount = ['Little', 'Normal', 'A lot'],
		food = [''],
		exercise = ['']
	}
) {
	if (!userId) {
		throw { status: 401, msg: 'Unauthorized' };
	}
	if (!typeCheck(
		'{dateMin: String, dateMax: String, typeMin: String, typeMax: String, amount: [String], food: [String], exercise: [String]}',
		{ dateMin, dateMax, typeMin, typeMax, amount, food, exercise }
	)) {
		throw { status: 400, msg: 'Invalid search paramters' };
	}
	return await Stool
		.aggregate([
			{
				$lookup: {
					from: 'foods',
					localField: 'foods',
					foreignField: '_id',
					as: 'foods'
				}
			},
			{
				$lookup: {
					from: 'exercises',
					localField: 'exercises',
					foreignField: '_id',
					as: 'exercises'
				}
			},
			{
				$match: {
					userId,
					date: { $lte: new Date(Number(dateMax)), $gte: new Date(Number(dateMin)) },
					type: { $lte: Number(typeMax), $gte: Number(typeMin) },
					amount: { $in: amount },
					foods: { $all: food.map(f => ({ $elemMatch: { name: new RegExp(escapeRegExp(f), 'ig') } })) },
					exercises: { $all: exercise.map(e => ({ $elemMatch: { name: new RegExp(escapeRegExp(e), 'ig') } })) },
				}
			},
		]);
}

stoolRouter.get('/', (req, res) => {
	searchStool(req.user._id, {}).then((stools) => {
		res.json(stools);
	}).catch(e => res.status(e.status || 500).send(e.msg || e));
});

stoolRouter.get('/search', (req, res) => {
	searchStool(req.user._id, req.query).then((stools) => {
		res.json(stools);
	}).catch(e => res.status(e.status || 500).send(e.msg || e));
});

stoolRouter.post('/add', (req, res) => {
	const { type, amount } = req.body;

	const now = Date.now();

	const newStool = new Stool({ userId: req.user._id , type, amount });
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
		const [foods, exercises] = values;
		newStool.foods = foods;
		newStool.exercises = exercises;

		// We save first to ensure that everything was correctly provided
		newStool.save().then(async (stool) => {
			try {
				// Loop through all foods and exercises to attach ids
				for (let i = 0; i < foods.length; i++) {
					foods[i].stoolId = stool._id;
					await foods[i].save();
				}
				for (let i = 0; i < exercises.length; i++) {
					exercises[i].stoolId = stool._id;
					await exercises[i].save();
				}
				res.json(stool);
			} catch (e) {
				res.status(500).send(e);
			}
		}).catch(e => res.status(500).send(e));
	}).catch(e => res.status(500).send(e));
});

stoolRouter.delete('/delete', (req, res) => {
	const { stools } = req.body;
	if (typeCheck('[String]', stools)) {
		const query = { userId: req.user._id, _id: { $in: stools } };
		Stool.find(query)
			.populate('foods')
			.populate('exercises')
			.exec(async (err, stools) => {
			if (err) {
				return res.status(500).send(err);
			}
			for (let i = 0; i < stools.length; i++) {
				const stool = stools[i];

				for (let j = 0; j < stool.foods; j++) {
					stool.foods[i].stoolId = null;
					await stool.foods[i].save();
				}
				for (let j = 0; j < stool.exercises; j++) {
					stool.exercises[i].stoolId = null;
					await stool.exercises[i].save();
				}
			}

			Stool.deleteMany(query, (err1, results) => {
				if (err1) {
					return res.status(500).send(err1);
				}
				res.send(`successfully deleted ${results.deletedCount} stools`);
			});
		});
	} else {
		res.status(400).send('stools must be array of ids');
	}
});

export default stoolRouter;
export { searchStool };