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
      if(req.headers && req.headers.access_token) {
        req.headers.authorization = 'Bearer ' + req.headers.access_token;
      }
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

function hasRole(role) {
  if(!role) {
    throw new Error('Required role needs to be set');
  }
  return compose()
    .use(isAuthenticated())
    .use(function(req, res, next) {
      if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(role)) {
        next();
      } else {
        return res.status(403).json({message: 'Have no correct role.'})
      }
    })
}

/**
 * 用jsonwebtoken 生成token
 */
function signToken(id, role) {
  return jwt.sign({_id: id, role: role}, config.secret, {expiresIn: 60*60*5})
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
