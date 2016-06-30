'use strict';

var bunyan = require('bunyan'),
    path = require('path'),
    config = require('../config');

module.exports = bunyan.createLogger({
  name: config.appConfig.name,
  streams: [
    {
      level: 'error',
      path: path.join(config.logDir, '/error.log')
    }
  ]
})
