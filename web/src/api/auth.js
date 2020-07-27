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

export const verifyEmail = (token) => axios.get('/api/auth/verify_token', {
	params: { token },
	headers: {'X-Requested-With': 'XMLHttpRequest'}
});

// Resend verification email
export const retoken = (email) => axios.post('/api/auth/retoken', { email });

// Send the forgotten password email
export const askResetPassword = (email) => axios.post('/api/auth/repassword', { email });

// Actually resets the password
export const doResetPassword = (password, token) => axios.post('/api/auth/reset_password', {
	password: sha256(password),
	token,
});
