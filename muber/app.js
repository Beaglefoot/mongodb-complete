const express = require('express');
const routes = require('./routes/routes');
const app = express();

app.get('/api', (req, res) => {
  res.send({ hi: 'there' });
});

module.exports = app;
