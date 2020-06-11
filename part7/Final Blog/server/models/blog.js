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
  comments: [
    {
      content: {
        type: String,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    // this does'nt make any sense, too bad
    if (returnedObject.comments) {
      returnedObject.comments = returnedObject.comments.map((comment) => {
        comment.id = comment._id.toString();
        delete comment._id;
        return comment;
      });
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
