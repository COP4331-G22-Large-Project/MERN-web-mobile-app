import axios from 'axios';
import { typeCheck } from 'type-check';

/* Searches for a stool that matches the given params
	dateMin/dateMax - the date range
	typeMin/typeMax - the type range
	amount			- array of the amount of stool. Matches any stool with an amount listed.
	food			- array of food used in the stool. Must contain at least all of them
	exercise		- array of exercise used in the stool. Must contain at least all of them

	The parameters are defaulted so that excluding them does not reduce results.
	Excluding all returns all
*/
export const searchStool = (searchObj) => axios.get('/api/stool/search', { params: searchObj });

// Gets all stools owned by the user
export const getAllStools = () => axios.get('/api/stool');

// Adds a stool
export const addStool = (type, amount) => axios.post('/api/stool/add', { type, amount });

// Deletes a list of stools
export const deleteStools = (stools) => {
	let stoolIds;
	if (typeCheck('[Object]', stools)) {
		stoolIds = stools.map(s => s._id);
	} else {
		stoolIds = stools;
	}
	axios.delete('/api/stool/delete', {
		stools: stoolIds
	});
}
