'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: String,
  info: String,
  author: {type: Schema.Types.ObjectId, ref: 'User', autopopulate: true}
})


BookSchema.plugin(require('../../utils/mongoose-api-query'));
BookSchema.plugin(require('../../utils/mongoose-autopopulate'));
module.exports = mongoose.model('Book', BookSchema);
