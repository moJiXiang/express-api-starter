'use strict';

/**
 * Book model events
 */

var EventEmitter = require('events').EventEmitter,
    Book = require('./book.model'),
    BookEvents = new EventEmitter();

BookEvents.setMaxListeners(10)

var events = {
  'save': 'save',
  'remove': 'remove'
}

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Book.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    console.log('=============')
    console.log(event);
    BookEvents.emit(event + ':' + doc._id, doc);

    BookEvents.emit(event, doc);
  }
}

module.exports = BookEvents;
