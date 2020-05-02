const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
