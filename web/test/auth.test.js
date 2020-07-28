import mongoose from 'mongoose';
import User from '../api/user/user.model';
import {
	generatePasswordWithSalt,
	validatePassword,
	logIn,
	isUserDuplicate,
	registerUser,
} from '../api/login/login.route';

test('generates password with salt', () => {
	const fakeUser = { _id: '12345' };
	const password = 'password';
	const result = '712af191df3a552905140a07a6d8f0ee0e18e4514815ef2cad51c386a747dbff56f0a2b659391f53d406eb5b7e8569b1bb01e1a2f5f581ab5717db9989d534de';
	expect(generatePasswordWithSalt(fakeUser, password)).toBe(result);
});

test('validate user password with given password', () => {
	const fakeUser = { _id: '12345', password: '712af191df3a552905140a07a6d8f0ee0e18e4514815ef2cad51c386a747dbff56f0a2b659391f53d406eb5b7e8569b1bb01e1a2f5f581ab5717db9989d534de' };
	const password = 'password';
	expect(validatePassword(fakeUser, password)).toBe(true);
});

describe('User Login Tests', () => {
	const userObj = {
		username: 'bob',
		password: 'password',
		firstName: 'Bob',
		lastName: 'Smith',
		email: 'bob@example.com',
	};

	beforeAll(async (done) => {
		await mongoose.connect('mongodb://localhost:27017/JestTesting', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.log(err);
				process.exit(1);
			}
		});
		await User.deleteMany();
		done();
	});

	it('registers a user', async () => {
		const userObj = {
			username: 'bob',
			password: 'password',
			firstName: 'Bob',
			lastName: 'Smith',
			email: 'bob@example.com',
		};

		const savedUser = await registerUser(userObj);

		expect(savedUser).toEqual(expect.objectContaining({
			username: 'bob',
			firstName: 'Bob',
			lastName: 'Smith',
			email: 'bob@example.com',
			password: generatePasswordWithSalt(savedUser, 'password'),
		}));
	});

	it('logs in a user', () => {
		const userObj = {
			username: 'bob',
			password: 'password',
			firstName: 'Bob',
			lastName: 'Smith',
			email: 'bob@example.com',
		};

		logIn(userObj.username, userObj.password, (err, user, msg) => {
			expect(err).toBeFalsy();
			expect(msg).toBeFalsy();
			expect(user).toEqual(expect.objectContaining({
				username: 'bob',
				firstName: 'Bob',
				lastName: 'Smith',
				email: 'bob@example.com',
				password: generatePasswordWithSalt(user || { _id: '' }, 'password'),
			}));
		});
	});

	it('detects duplicate users', async () => {
		expect(await isUserDuplicate('bob', 'bob@example.com')).toEqual({
			isUsername: true,
			isEmail: true
		});
	})

	afterAll(async (done) => {
		await User.deleteMany();
		await mongoose.connection.close();
		done();
	});
});