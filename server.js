var express = require('express');
var requireDir = require('require-dir');
var logger = require('morgan');
var bodyParser = require('body-parser');

var config = require('./config.json');
var requireAuthentication = require('./utils/requireAuthentication.js');
var PORT = process.env.PORT || config.port || 3000;

// start database
require('./config/db.js');

var app = express();

// app config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var routes = requireDir('./routes', {recurse: true});

// map objects to inject routes
Object.keys(routes).map(function(value, index) {
  if (value == 'authenticate') {
    app.use('/' + config.apiVersion, routes[value]['route']);
  } else {
    app.use('/' + config.apiVersion, requireAuthentication, routes[value]['route']);
  }
})


app.use(function(req, res, next) {
  res.status(404).json({
    error: 'Not found'
  });
});

app.use(function(err, req, res, next) {
  console.log('pass error handle......');
  if(err.message === 'NotFoundError') {
    res.status(404).json({
      message: 'Not found.'
    });
  }
  else if(err.message === 'AuthenticationError') {
    res.status(401).json({
      message: 'Authentication failed. User not found.'
    });
  }
  else if(err.message === 'PasswordError') {
    res.status(401).json({
      message: 'Authentication failed. Wrong password.'
    });
  }
  else if(err.message === 'DecodeTokenError') {
    res.status(500).json({
      message: 'Failed to decode authenticate token.'
    });
  }
  else {
    res.status(err.status || 500).json({
      message: err.message
    })
  }
})

app.listen(PORT, function() {
  console.log('Server %s is running in process %s started on %s:%d \n', config.name, process.pid, '127.0.0.1', config.port);
});
