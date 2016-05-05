var mongoose = require('mongoose');
var config = require('../config.json');

var host = process.env.HOST || config.database.host,
    database = process.env.DATABASE || config.database.database,
    username = process.env.USERNAME || config.database.username,
    password = process.env.PASSWORD || config.database.password;

if(username && password) {

  var mongoURI = 'mongodb://' + username + ':' + password + '@' +host + ':27017' + '/' + database
} else {
  var mongoURI = 'mongodb://' + host + ':27017' + '/' + database
}

// mongoose.Promise = require('bluebird');
mongoose.connect(mongoURI);

mongoose.connection.on("open", function() {
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  console.log(err);
});
