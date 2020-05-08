const bcrypt = require('bcryptjs');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { author: 1, title: 1 });
  res.status(200).send(users);
});

userRouter.post('/', async (req, res) => {
  const saltRounds = 10;
  const password = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({ ...req.body, password });
  const savedUser = await user.save();
  res.status(201).send(savedUser);
});
module.exports = userRouter;
