import axios from 'axios';
import { typeCheck } from 'type-check';
import { apiUrl } from '../src/utils';

/* Searches for a exercise that matches the given params
	dateMin/dateMax 		- the date range
	durationMin/durationMax	- the duration range
	name					- the partial name to match

	The parameters are defaulted so that excluding them does not reduce results.
	Excluding all returns all
*/
export const searchExercise = (searchObj) => axios.get(apiUrl + '/exercise/search', { params: searchObj });

// Gets all exercises assigned to the user
export const getAllExercises = () => axios.get(apiUrl + '/exercise');

// Adds a new exercise
// Duration is in hours
export const addExercise = (name, duration) => axios.post(apiUrl + '/exercise/add', { name, duration });

// Deletes a list of exercises
export const deleteExercise = (exercises) => {
	let exerciseIds;
	if (typeCheck('[Object]', exercises)) {
		exerciseIds = exercises.map(e => e._id);
	} else {
		exerciseIds = exercises;
	}
	axios.delete(apiUrl + '/exercise/delete', {
		exercises: exerciseIds
	});
}
