'use strict';

var Book = require('./book.model'),
    $ = require('../../utils/promiseCallback');

var controller = {
  // get /api/books
  list: function(req, res) {
    Book.findAsync()
      .then($.handleEntityNotFound(res))
      .then($.responseWithResult(res))
      .catch($.handleError(res))
  },
  // post /api/books
  create: function(req, res) {
    Book.createAsync(req.body)
      .then($.responseWithResult(res, 201))
      .catch($.handleError(res))
  },
  // get /api/books/:id
  show: function(req, res) {
    Book.findByIdAsync({_id: req.params.id})
      .then($.handleEntityNotFound(res))
      .then($.responseWithResult(res))
      .catch($.handleError(res))
  },
  // put /api/books/:id
  update: function(req, res) {
    Book.updateAsync({_id: req.params.id}, req.body)
      .then($.handleEntityNotFound(res))
      .then($.responseWithResult(res))
      .catch($.handleError(res))
  },

  // delete /api/books/:id
  destroy: function(req, res) {
    Book.findOneAndRemove({_id: id})
      .then($.responseWithResult(res))
      .catch($.handleError(res))
  }
}

module.exports = controller;
