const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const { SECRET } = require('../utils/config');

const getToken = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.status(200).send(blogs);
});

blogRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404).end();
  }
  res.status(200).send(blog);
});

blogRouter.post('/', async (req, res) => {
  const { body } = req;
  const token = getToken(req);
  const decodedToken = jwt.verify(token, SECRET);

  if (!token || !decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({ ...body, user: user._id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).send(savedBlog);
});

blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
  res.status(200).send(updatedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.status(204).end();
});

module.exports = blogRouter;
