const express = require('express');
require('./database/db');
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const { morgan, accessLogStream } = require('./utils/logger');
const { unknownEndpoint } = require('./utils/middleware');

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

app.use('/api/blogs', blogRouter);
app.use(unknownEndpoint);

module.exports = app;
