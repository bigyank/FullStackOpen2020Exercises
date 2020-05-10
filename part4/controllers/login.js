const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');
const { SECRET } = require('../utils/config');

loginRouter.post('/', async (req, res) => {
  const { body } = req;

  if (!body.username || !body.password) {
    return res.status(401).send({ error: 'Invalid credentials' });
  }

  const user = await User.findOne({ username: body.username });

  const validUser =
    user == null ? false : await bcrypt.compare(body.password, user.password);

  if (!validUser) {
    return res.status(401).send({ error: 'Invalid credentials' });
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, SECRET);
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
