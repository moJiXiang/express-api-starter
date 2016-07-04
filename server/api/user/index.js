var express = require('express');
var mongoose = require('mongoose');
var controller = require('./user.controller');
var User = mongoose.model('User');

var router = express.Router();

router.post('/', controller.create);

module.exports = router;
