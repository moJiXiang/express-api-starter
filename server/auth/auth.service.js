'use strict';

var jwt = require('jsonwebtoken'),
    config = require('../config'),
    expressJwt = require('express-jwt'),
    compose = require('composable-middleware'),
    User = require('../api/user/user.model'),
    expreeJwt = require('express-jwt');

var validateJwt = expreeJwt({
  secret: config.secret
})

function isAuthenticated() {
  return compose()
    .use(function(req, res, next) {
      req.headers.authorization = 'Bearer ' + req.headers.access_token;

      validateJwt(req, res, next);
    })
    .use(function(req, res, next) {
      User.findByIdAsync(req.user._id)
        .then(function(user) {
          if(!user) {
            return res.status(401).json({
              message: 'Error token.'
            })
          }
          next();
        })
        .catch(function(err) {
          return next(err);
        })
    })
}

/**
 * 用jsonwebtoken 生成token
 */
function signToken(id, role) {
  return jwt.sign({_id: id, role: role}, config.secret, {expiresIn: 60*60*5})
}

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
