// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const { connection } = require('mongoose');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const user = {
    username: 'root',
    name: 'root',
    password: 'root',
  };
  await api.post('/api/users').send(user);
});

describe('while logging users with data', () => {
  test('existing user logs sucessfully and contains token', async () => {
    const validUser = {
      username: 'root',
      password: 'root',
    };

    const user = await api
      .post('/')
      .send(validUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(user.body.token).toBeDefined();
  });

  test('nonexistent user doesnt log', async () => {
    const invalidUser = {
      username: 'non',
      password: 'non',
    };

    const user = await api
      .post('/')
      .send(invalidUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(user.body.token).not.toBeDefined();
  });

  test('invalid username doesnt log', async () => {
    const invalidUser = {
      username: 'groot',
      password: 'root',
    };

    const errorMsg = await api
      .post('/')
      .send(invalidUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(errorMsg.body.error).toContain('Invalid credentials');
  });

  test('invalid password doesnt log', async () => {
    const invalidUser = {
      username: 'root',
      password: 'groot',
    };

    const errorMsg = await api
      .post('/')
      .send(invalidUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(errorMsg.body.error).toContain('Invalid credentials');
  });
});

describe('logging user with missing data', () => {
  test('missing username should return code 401', async () => {
    const missingUser = {
      password: 'root',
    };

    await api
      .post('/')
      .send(missingUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('missing password should return code 401', async () => {
    const missingUser = {
      username: 'root',
    };

    await api
      .post('/')
      .send(missingUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  connection.close();
});
