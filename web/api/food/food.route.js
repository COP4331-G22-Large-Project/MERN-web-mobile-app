import express from 'express';
import escapeRegExp from 'lodash.escaperegexp';
import { typeCheck } from 'type-check';

import Food from './food.model';

const foodRouter = express.Router();

/* Searches for a stool that matches the given params
	dateMin/dateMax - the date range
	name			- the partial name to match

	The parameters are defaulted so that excluding them does not reduce results.
	Excluding all returns all
*/
async function searchFood(
	userId,
	{
		dateMin = '0',
		dateMax = String(Date.now()),
		name = ''
	}
) {
	if (!userId) {
		throw { status: 401, msg: 'Unauthorized' };
	}
	if (!typeCheck(
		'{dateMin: String, dateMax: String, name: String}',
		{ dateMin, dateMax, name }
	)) {
		throw { status: 400, msg: 'Invalid search paramters' };
	}

	return await Food
		.find({
			date: { $lte: new Date(Number(dateMax)), $gte: new Date(Number(dateMin)) },
			name: { $regex: escapeRegExp(name) }
		});
};

foodRouter.get('/', (req, res) => {
	searchFood(req.user._id, {}).then((foods) => {
		res.json(foods);
	}).catch(e => res.status(e.status || 500).send(e.msg));
});

foodRouter.get('/search', (req, res) => {
	searchFood(req.user._id, req.query).then((foods) => {
		res.json(foods);
	}).catch(e => res.status(e.status || 500).send(e.msg));
});

foodRouter.post('/add', (req, res) => {
	const { name } = req.body;

	const newFood = new Food({ name, userId: req.user._id });

	newFood.save().then((food) => {
		res.json(food);
	}).catch(e => res.status(500).send(e));
});

foodRouter.delete('/delete', (req, res) => {
	const { foods } = req.body;
	if (typeCheck('[String]', foods)) {
		Food.deleteMany({ userId: req.user._id, _id: { $in: foods } }, (err, results) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.send(`successfully deleted ${results.deletedCount} foods`);
		})
	} else {
		res.status(400).send('foods must be array of ids');
	}
});

export default foodRouter;
export { searchFood };