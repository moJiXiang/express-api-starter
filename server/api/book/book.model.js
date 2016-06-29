'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: String,
  info: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Book', BookSchema);
