'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./error.handlers/500');
const notFoundHandler = require('./error.handlers/404');
const gamesRouter = require('./routes/gamesRoute');
const playersRouter = require('./routes/playersRoute');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/players', playersRouter);

app.get('/', (req, res) => {
  res.status(200).send('"My mother always used to say: The older you get, the better you get, unless you’re a banana"..guess I am a Banana');
});

app.use('*', errorHandler);
app.use(notFoundHandler);

module.exports = {
  app,
  start: port => {
    app.listen(port, () => console.log(`server working on ${port}`));
  },
};