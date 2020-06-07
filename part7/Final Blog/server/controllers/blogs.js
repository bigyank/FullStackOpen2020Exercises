const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const { SECRET } = require('../utils/config');

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
  const { token } = req;

  const decodedToken = jwt.verify(token, SECRET);

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({ ...body, user: user._id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  const populatedBlog = await savedBlog
    .populate('user', {
      username: 1,
      name: 1,
    })
    .execPopulate();

  await user.save();
  res.status(201).send(populatedBlog);
});

blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
    new: true,
  }).populate('user', { username: 1, name: 1 });
  res.status(200).send(updatedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { token } = req;
  const decodedToken = jwt.verify(token, SECRET);
  const blog = await Blog.findById(id);
  if (blog && blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.status(401).send({ error: 'Not authorized' });
  }
});

module.exports = blogRouter;
