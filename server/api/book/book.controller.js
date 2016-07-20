'use strict';

var Book = require('./book.model'),
    $ = require('../../utils/promiseCallback');

var controller = {
  // get /api/books
  list: function(req, res) {
    Book.apiQuery(req.query)
      .then($.handleEntityNotFound(res))
      .then($.responseWithResult(res))
      .catch($.handleError(req, res))
  },
  // post /api/books
  create: function(req, res) {
    Book.createAsync(req.body)
      .then($.responseWithResult(res, 201))
      .catch($.handleError(req, res))
  },
  // get /api/books/:id
  show: function(req, res) {
    Book.findByIdAsync({_id: req.params.id})
      .then($.handleEntityNotFound(res))
      .then($.responseWithResult(res))
      .catch($.handleError(req, res))
  },
  // put /api/books/:id
  update: function(req, res) {
    Book.updateAsync({_id: req.params.id}, req.body)
      .then($.handleEntityNotFound(res))
      .then($.responseWithResult(res))
      .catch($.handleError(req, res))
  },
  // delete /api/books/:id
  destroy: function(req, res) {
    Book.findByIdAsync(req.params.id)
      .then($.handleEntityNotFound(res))
      .then($.removeEntity(res))
      .catch($.handleError(req, res))
  }
}

module.exports = controller;
