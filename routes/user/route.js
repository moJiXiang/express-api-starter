var express = require('express');
var router = express.Router();
var Ctrl = require('./controller');
var User = require('./model.js');
var dbHelper = require('../../utils/dbHelper.js');

router.route('/user/:id')
  .get(function(req, res, next) {
    dbHelper.findOne(User, {_id: req.params.id}, function(err, result) {
      if(err)
        next(err);
      else {
        res.json({result: result});
      }
    })
  })

router.route('/users')
  .get(function(req, res, next) {
      dbHelper.list(User, {}, function(err, result) {
        if (err)
          next(err);
        else {
          res.json({result: result});
        }
      })
    })

module.exports = router;
