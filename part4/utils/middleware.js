const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Invalid id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: 'Invalid fields' });
  }
  next(error);
};

module.exports = { unknownEndpoint, errorHandler };
