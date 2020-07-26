import axios from 'axios';
import { sha256 } from 'js-sha256';

export const login = (username, password) => axios.post('/api/auth/login', {
	username,
	password: sha256(password),
});

export const logout = () => axios.post('/apit/auth/logout');

export const register = (username, password, email, firstName, lastName) => axios.post('/api/auth/register', {
	username,
	password: sha256(password),
	email,
	firstName,
	lastName,
});

export const retoken = () => axios.post('/api/auth/retoken');
