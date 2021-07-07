'use strict';
const server = require('./src/server');
const pool = require('./src/models/pool');
require('dotenv').config();
const port = process.env.PORT;

pool.connect().then(() => {
  server.start(port);
}).catch(e => console.error(e));