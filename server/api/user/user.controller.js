'use strict';

var User = require('./user.model');
var logger = require('../../setting/log');
var authService = require('../../auth/auth.service');

var controller = {
  log: function() {
    logger.error('error', {error_msg: 'unknow error'});
  },

  create: function(req, res, next) {
    console.log(req.body);
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.saveAsync()
      .then(function(user) {

        var token = authService.signToken(user._id, user.role);
        console.log(token);
        res.json({token: token});
      })
      .catch(function(err) {
        return next(err);
      })
  }
}

module.exports = controller;
