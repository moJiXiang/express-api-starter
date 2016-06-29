'use strict';

var express = require('express'),
    passport = require('passport'),
    auth = require('../auth.service')

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log('--------------');
    console.log(err)
    console.log(user)
    console.log(info)
    if(err) {
      return next(err);
    }

    if(!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = auth.signToken(user._id, user.role);
    res.json({token: token});
  })(req, res, next)
})

module.exports = router;
