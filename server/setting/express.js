'use strict';

var express = require('express'),
    compression = require('compression'), // node.js compression middleware
    methodOverrider = require('method-override'), // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
    passport = require('passport'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app) {
    var env = app.get('env');
    app.use(function (req, res, next) {
        // FIXME: https://github.com/mrjoes/tornadio2/issues/30
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
        next();
    })
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverrider('X-HTTP-Method-Override'));
    app.use(passport.initialize());

    if(env === 'development' || env === 'test') {
      app.use(morgan('dev'))
    }
}
