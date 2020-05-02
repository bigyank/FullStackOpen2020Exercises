const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

morgan.token('req', (req, res) => {
  return JSON.stringify(req.body, null, 2);
});

morgan.token('time', () => {
  return new Date().toLocaleString();
});

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../access.log'),
  {
    flags: 'a',
  }
);

module.exports = { morgan, accessLogStream };
