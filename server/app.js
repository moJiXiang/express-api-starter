'use strict';


var express = require('express'),
    mongoose = require('mongoose'),
    config = require('./config');
// var auth = require('./utils/auth.js');


console.log(config);
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

require('./setting/express')(app);
require('./routes')(app);
// app config
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// var routes = requireDir('./api', {recurse: true});
// var arr = [];
// map objects to inject api
// Object.keys(routes).map(function(value, index) {
//   if (value === 'authenticate') {
//     app.use('/' + config.apiVersion, routes[value]['route']);
//   } else {
//     app.use('/' + config.apiVersion, auth.requireAuthentication, routes[value]['route']);
//     arr.push(routes[value]['route'])
//   }
// })

app.use(function(req, res, next) {
  res.status(404).json({
    error: 'Not found'
  });
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message
    })
})

app.listen(config.appConfig.port, function() {
  console.log('App [%s] is running in process %s started on %s:%d, in %s mode', config.appConfig.name, process.pid, '127.0.0.1', config.appConfig.port, app.get('env'));
});

module.exports = app;
