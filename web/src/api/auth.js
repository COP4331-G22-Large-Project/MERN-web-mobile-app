import axios from 'axios';
import { sha256 } from 'js-sha256';

// Login with username and password
export const login = (username, password) => axios.post('/api/auth/login', {
	username,
	password: sha256(password),
});

// Logout securly
export const logout = () => axios.post('/apit/auth/logout');

// Register a new user
export const register = (username, password, email, firstName, lastName) => axios.post('/api/auth/register', {
	username,
	password: sha256(password),
	email,
	firstName,
	lastName,
});

// Resend verification email
export const retoken = () => axios.post('/api/auth/retoken');

// Send the forgotten password email
export const askResetPassword = (email) => axios.post('/api/auth/repassword', { email });

// TODO: Not yet implemented. Waiting for route to be done
// Actually resets the password
export const doResetPassword = (password, token) => {
	new Promise(() => 'password reset route being developed'));
}
