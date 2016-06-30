'use strict';

var path = require('path'),
    _ = require('lodash'),
    fs = require('fs');

var defaultConfig = {
  env: process.env.NODE_ENV,
  appConfig: {
    name: "rattletrap",
    port: process.env.PORT || 9000,
  },
  mongo: {

  },
  // init database
  seedDB: false,
  secret: 'express-api-starter',
  userRoles: ['user', 'admin'],
  logDir: path.join(__dirname + '/../../logs')
}
console.log(process.env.NODE_ENV)
var config = _.merge(defaultConfig, require('./' + process.env.NODE_ENV + '.js') || {});

module.exports = config;
