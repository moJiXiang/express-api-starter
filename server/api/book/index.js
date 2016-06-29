var express = require('express');
var router = express.Router();

var controller = require('./book.controller');

router.route('/')
  .get(controller.list)

module.exports = router;
