const { connect } = require('mongoose');
const { MONGODB_URI } = require('../utils/config');

const mongoUrl = MONGODB_URI;
connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('connected to database'))
  .catch((error) => console.log('unable to connect to database', error));
