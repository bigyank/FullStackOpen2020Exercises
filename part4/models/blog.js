const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  author: String,
});

blogSchema.methods.toJSON = function () {
  const user = this;
  const userData = user.toObject();
  userData.id = userData._id.toString();
  delete userData._id;
  delete userData.__v;
  return userData;
};

const Blog = model('Blog', blogSchema);

module.exports = Blog;
