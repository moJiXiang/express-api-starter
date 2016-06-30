'use strict';

var express = require('express'),
    compression = require('compression'),
    methodOverrider = require('method-override'),
    passport = require('passport'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app) {
    var env = app.get('env');

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverrider());
    app.use(passport.initialize());

    if(env === 'development' || env === 'test') {
      app.use(morgan('dev'))
    }
}
