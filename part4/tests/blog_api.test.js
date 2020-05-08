const mongoose = require('mongoose');
// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when some blogs are initially saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are three blogs', async () => {
    const response = await helper.blogsInDb();
    expect(response).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific author is within the returned blogs', async () => {
    const response = await helper.blogsInDb();
    const authors = response.map((r) => r.author);
    expect(authors).toContain('author1');
  });

  test('blog contains a id feild', async () => {
    const blogs = await helper.blogsInDb();
    const singleBlog = blogs[0];
    expect(singleBlog.id).toBeDefined();
  });
});

describe('addition of new blogs', () => {
  test('succeeds with code 201 if valid blog', async () => {
    const newBlog = {
      title: 'title4',
      author: 'author4',
      url: 'url@4',
      likes: 4,
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await helper.blogsInDb();
    const authors = response.map((blogs) => blogs.author);

    expect(response).toHaveLength(helper.initialBlogs.length + 1);
    expect(authors).toContain('author4');
  });

  test('fails with code 400 if invalid blog', async () => {
    const invalidBlog = {
      author: 'author5',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(invalidBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const response = await helper.blogsInDb();

    expect(response).toHaveLength(helper.initialBlogs.length);
  });

  test('default likes is zero if not provided', async () => {
    const blog = {
      title: 'blog6',
      author: 'author6',
      url: 'url@6',
    };

    const returnedBlog = await api.post('/api/blogs').send(blog).expect(201);

    expect(returnedBlog.body.likes).toBe(0);
  });
});

describe('viewing a specific blog', () => {
  test('succeds with valid id', async () => {
    const blogs = await helper.blogsInDb();
    const specificBlog = blogs[0];

    const returnedBlog = await api
      .get(`/api/blogs/${specificBlog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(returnedBlog.body).toEqual(specificBlog);
  });

  test('fails with code 404 if blog doesnt exist', async () => {
    const validNonExistingId = await helper.nonExistingId();
    await api.get(`/api/blogs/${validNonExistingId}`).expect(404);
  });

  test('fails with code 400 is invalidId', async () => {
    const invalidId = 'ad6a2d65a2d2ad';
    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('deletion of a specific blog', () => {
  test('succeds with a valid id', async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const changedBlogs = await helper.blogsInDb();
    expect(changedBlogs).toHaveLength(helper.initialBlogs.length - 1);

    const authors = changedBlogs.map((blog) => blog.author);
    expect(authors).not.toContain(blogToDelete.author);
  });
});

describe('updating a field on a blog', () => {
  test('feild on blogs get updated', async () => {
    const blogs = await helper.blogsInDb();
    const beforeUpdate = blogs[0];

    const update = { likes: 10 };

    const afterUpdate = await api
      .put(`/api/blogs/${beforeUpdate.id}`)
      .send(update)
      .expect(200);

    expect(afterUpdate.body.likes).toBe(10);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
