'use strict';

var express = require('express'),
    compression = require('compression'), // node.js compression middleware
    methodOverrider = require('method-override'), // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
    passport = require('passport'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app) {
    var env = app.get('env');

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverrider('X-HTTP-Method-Override'));
    app.use(passport.initialize());

    if(env === 'development' || env === 'test') {
      app.use(morgan('dev'))
    }
}
