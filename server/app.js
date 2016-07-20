'use strict';


var express = require('express'),
    mongoose = require('mongoose'),
    config = require('./config'),
    http = require('http');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.connection.on("open", function() {
  console.log("Connected to mongo server.");
});

mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// init database with sample data
if (config.seedDB) { require('./setting/seed'); }

var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server)

require('./setting/socketio')(socketio);
require('./setting/express')(app);
require('./routes')(app);

app.use(function(req, res, next) {
  res.status(404).json({
    message: 'This api is not exit.'
  });
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message
    })
})

// FIXME: http://stackoverflow.com/questions/24793255/socket-io-cant-get-it-to-work-having-404s-on-some-kind-of-polling-call
// FIXME: server.listen, app.listen
server.listen(config.appConfig.port, config.appConfig.ip, function() {
  console.log('App [%s] is running in process %s started on %s:%d, in %s mode', config.appConfig.name, process.pid, '127.0.0.1', config.appConfig.port, app.get('env'));
});

module.exports = app;
