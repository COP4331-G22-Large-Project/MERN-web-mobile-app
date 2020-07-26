import axios from 'axios';
import { typeCheck } from 'type-check';
import { apiUrl } from '../src/utils';

/* Searches for a food that matches the given params
	dateMin/dateMax - the date range
	name			- the partial name to match

	The parameters are defaulted so that excluding them does not reduce results.
	Excluding all returns all
*/
export const searchFood = (searchObj) => axios.get(apiUrl + '/food/search', { params: searchObj });

// Gets all the food owned by the user
export const getAllFood = () => axios.get(apiUrl + '/food');

// Adds a food
export const addFood = (name) => axios.post(apiUrl + '/food/add', { name });

// Deletes a list of foods
export const deleteFoods = (foods) => {
	let foodIds;
	if (typeCheck('[Object]', foods)) {
		foodIds = foods.map(f => f._id);
	} else {
		foodIds = foods;
	}
	axios.delete(apiUrl + '/food/delete', {
		foods: foodIds
	});
}
