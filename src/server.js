const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const routes = require('./routes');

server.use(routes);

// setting express
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

// nunjucks settings
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

// start server in port 3000
server.listen(3000);
