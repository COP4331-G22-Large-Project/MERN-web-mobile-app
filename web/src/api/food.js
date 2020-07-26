import axios from 'axios';
import { typeCheck } from 'type-check';

/* Searches for a food that matches the given params
	dateMin/dateMax - the date range
	name			- the partial name to match

	The parameters are defaulted so that excluding them does not reduce results.
	Excluding all returns all
*/
export const searchFood = (searchObj) => axios.get('/api/food/search', { params: searchObj });

// Gets all the food owned by the user
export const getAllFood = () => axios.get('/api/food');

// Adds a food
export const addFood = (name) => axios.post('/api/food/add', { name });

// Deletes a list of foods
export const deleteFoods = (foods) => {
	let foodIds;
	if (typeCheck('[Object]', foods)) {
		foodIds = foods.map(f => f._id);
	} else {
		foodIds = foods;
	}
	axios.delete('/api/food/delete', {
		foods: foodIds
	});
}
