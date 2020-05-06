const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'title1',
    author: 'author1',
    url: 'url@1',
    likes: 1,
  },
  {
    title: 'title2',
    author: 'author2',
    url: 'url@2',
    likes: 2,
  },
  {
    title: 'title3',
    author: 'author3',
    url: 'url@3',
    likes: 3,
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

module.exports = { initialBlogs, nonExistingId, blogsInDb };
