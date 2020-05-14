const express = require('express');
require('./database/db');
require('express-async-errors');
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { morgan, accessLogStream } = require('./utils/logger');
const {
  unknownEndpoint,
  errorHandler,
  getToken,
} = require('./utils/middleware');

const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(
  morgan(
    `:method :url :status :res[content-length] :response-time ms \n :req \n :time\n`,
    { stream: accessLogStream }
  )
);

app.use(getToken);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
