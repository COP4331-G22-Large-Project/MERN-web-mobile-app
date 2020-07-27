import axios from 'axios';
import { sha256 } from 'js-sha256';
import { apiUrl } from '../src/utils';

// Login with username and password
export const login = (username, password) => axios.post(apiUrl + '/auth/login', {
	username,
	password: sha256(password),
}, { withCredentials: true });

// Check if the user is already logged in (using saved cookie)
export const checkLoggedIn = () => axios.post(apiUrl + '/user', undefined, { withCredentials: true });

// Logout securly
export const logout = () => axios.post(apiUrl + '/auth/logout', undefined, { withCredentials: true });

// Register a new user
export const register = (username, password, email, firstName, lastName) => axios.post(apiUrl + '/auth/register', {
	username,
	password: sha256(password),
	email,
	firstName,
	lastName,
});

export const verifyEmail = (token) => axios.get(apiUrl + '/auth/verify_token', { params: { token } });

// Resend verification email
export const retoken = (email) => axios.post(apiUrl + '/auth/retoken', { email });

// Send the forgotten password email
export const askResetPassword = (email) => axios.post(apiUrl + '/auth/repassword', { email });

// Actually resets the password
export const doResetPassword = (password, token) => axios.post(apiUrl + '/auth/reset_password', {
	password: sha256(password),
	token,
});
