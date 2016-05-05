var Promises = require('bluebird');
var User = require('./model.js');

var controller = {
  findOne: function(req, res) {
    // User.findOne({_id: req.params.id}, function(err, result) {
    //
    //   res.json({result: result});
    // })

    var query = User.findOne({_id: req.params.id}).exec();

    query.then(function(result) {
      res.json({result: result});
    })

    query.catch(function(err) {
      console.error(err);
    })
  }
}

module.exports = controller;
