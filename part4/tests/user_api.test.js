const bcrypt = require('bcryptjs');
const { connection } = require('mongoose');
// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const users = helper.initialUsers.map((user) => new User(user));
  const userPromise = users.map((user) => user.save());
  await Promise.all(userPromise);
});

describe('when users are initially saved', () => {
  test('there is a single user', async () => {
    const users = await helper.usersInDb();
    expect(users).toHaveLength(1);
  });
});

describe('when creating users', () => {
  test('returns 201 for valid user', async () => {
    const password = await bcrypt.hash('secret', 10);
    const validUser = {
      username: 'valid',
      password,
    };

    await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const allUsers = await helper.usersInDb();
    const userNames = allUsers.map((user) => user.username);

    expect(allUsers).toHaveLength(helper.initialUsers.length + 1);
    expect(userNames).toContain(validUser.username);
  });

  test('user creation fails for dublicate username with code 400', async () => {
    const invalidUser = { username: 'root', password: 'random' };
    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const allUsers = await helper.usersInDb();
    expect(result.body.error).toContain('`username` to be unique');
    expect(allUsers).toHaveLength(helper.initialUsers.length);
  });
});

afterAll(() => {
  connection.close();
});
