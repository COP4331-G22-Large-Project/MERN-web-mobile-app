import {
	generatePasswordWithSalt,
	validatePassword,
	logIn,
	isUserDuplicate,
} from '../api/login/login.route';

test('generates password with salt', () => {
	const fakeUser = { _id: '12345' };
	const password = 'password';
	const result = '712af191df3a552905140a07a6d8f0ee0e18e4514815ef2cad51c386a747dbff56f0a2b659391f53d406eb5b7e8569b1bb01e1a2f5f581ab5717db9989d534de';
	expect(generatePasswordWithSalt(fakeUser, result)).toBe(result);
});