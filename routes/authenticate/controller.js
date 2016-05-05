var jwt = require('jsonwebtoken');
var User = require('../user/model.js');
var config = require('../../config.json');

var controller = {
  generateToken: function(req, res, next) {
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        next(new Error('AuthenticationError'))
      } else {
        if(user.password != req.body.password) {
          next(new Error('PasswordError'))
        } else {
          var token = jwt.sign(user._id, config.secret, {expiresIn: "7d"})
          res.json({
            result: token
          })
        }
      }
    })
  }
}

module.exports = controller;
