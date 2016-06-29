'use strict';

var Book = require('./book.model');

var controller = {
  list: function(req, res) {
    Book.findAsync()
      .then(function(result) {
          res.json({result: result});
      })
  }
}

module.exports = controller;
