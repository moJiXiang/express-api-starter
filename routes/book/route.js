var express = require('express');
var router = express.Router();
var Ctrl = require('./controller');

router.route('/book/:id')
  .get(Ctrl.findOne)

module.exports = router;
