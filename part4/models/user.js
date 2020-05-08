const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
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
