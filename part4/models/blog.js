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
  author: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.methods.toJSON = function () {
  const blog = this;
  const blogData = blog.toObject();
  blogData.id = blogData._id.toString();
  delete blogData._id;
  delete blogData.__v;
  return blogData;
};

const Blog = model('Blog', blogSchema);

module.exports = Blog;
