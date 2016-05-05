var jwt = require('jsonwebtoken');
var config = require('../config.json');
var User = require('../routes/user/model.js');

var requireAuthentication = function(req, res, next) {
  var token = req.query.token || req.body.token || req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        next(new Error('DecodeTokenError'))
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    res.status(403).json({
      message: 'No token provided.'
    })
  }
};

module.exports = requireAuthentication;
