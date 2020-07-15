import express from 'express';
import escapeRegExp from 'lodash.escaperegexp';
import { typeCheck } from 'type-check';

import Exercise from './exercise.model';

const exerciseRouter = express.Router();

/* Searches for a stool that matches the given params
	dateMin/dateMax 		- the date range
	durationMin/durationMax	- the duration range
	name					- the partial name to match

	The parameters are defaulted so that excluding them does not reduce results.
	Excluding all returns all
*/
async function searchExercise(
	userId,
	{
		dateMin = '0',
		dateMax = String(Date.now()),
		durationMin = '0',
		durationMax = String(Number.MAX_VALUE),
		name = '',
	}
) {
	if (!userId) {
		throw { status: 401, msg: 'Unauthorized' };
	}
	if (!typeCheck(
		'{dateMin: String, dateMax: String, durationMin: String, durationMax: String, name: String}',
		{ dateMin, dateMax, durationMin, durationMax, name }
	)) {
		throw { status: 400, msg: 'Invalid search paramters' };
	}

	return await Exercise
		.find({
			date: { $lte: dateMax, $gte: dateMin },
			name: { $regex: `^${escapeRegExp(name)}` }
		});
};

exerciseRouter.get('/', (req, res) => {
	searchExercise(req.user._id, {}).then((exercise) => {
		res.json(exercise);
	}).catch(e => res.status(e.status || 500).send(e.msg));
});

exerciseRouter.get('/search', (req, res) => {
	searchExercise(req.user._id, req.query).then((exercise) => {
		res.json(exercise);
	}).catch(e => res.status(e.status || 500).send(e.msg));
});

exerciseRouter.post('/add', (req, res) => {
	const { name, duration } = req.body;

	const newExercise = new Exercise({ name, duration, userId: req.user._id });

	newExercise.save().then((exercise) => {
		res.json(exercise);
	}).catch(e => res.status(500).send(e));
});

exerciseRouter.delete('/delete', (req, res) => {
	const { exercises } = req.body;
	if (typeCheck('[String]', exercises)) {
		Exercise.deleteMany({ userId: req.user._id, _id: { $in: exercises } }, (err, results) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.send(`successfully deleted ${results.deletedCount} exercises`);
		})
	} else {
		res.status(400).send('exercises must be array of ids');
	}
});

export default exerciseRouter;
export { searchExercise };