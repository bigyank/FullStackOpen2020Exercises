const getToken = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    res.status(400).send({ error: error.message });
  } else if (error.name === 'ValidationError') {
    res.status(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    res.status(401).send({ error: 'Invalid or missing token' });
  } else {
    next(error);
  }
};

module.exports = { unknownEndpoint, errorHandler, getToken };
