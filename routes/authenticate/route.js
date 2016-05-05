var express = require('express');
var router = express.Router();
var Ctrl = require('./controller');

router.route('/authenticate')
  .post(Ctrl.generateToken)

module.exports = router;
