const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.methods.toJSON = function () {
  const user = this;
  const userData = user.toObject();
  userData.id = userData._id.toString();
  delete userData._id;
  delete userData.__v;
  delete userData.password;
  return userData;
};

const User = model('User', userSchema);

module.exports = User;
