'use strict';

var bunyan = require('bunyan'),
    path = require('path'),
    config = require('config');

module.exports = bunyan.createLogger({
  name: config.app,
  streams: [
    {
      level: 'error',
      // path: path.join(__dirname, config.logDir, 'error.log')
      path: path.join(config.logDir, '/error.log')
    }
  ]
})
