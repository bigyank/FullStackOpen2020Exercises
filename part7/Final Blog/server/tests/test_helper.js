const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'title1',
    author: 'author1',
    url: 'url@1',
    likes: 1,
  },
];

const initialUsers = [
  {
    username: 'root',
    name: 'admin',
    password: 'root',
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'missing@404' });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
