var services = {
  list: function(Model, query, callback) {
    var promise = Model.find(query).exec();
    promise.then(function(result) {
      callback(null, result);
    })
    promise.catch(function(err) {
      callback(err);
    })
  },

  findOne: function(Model, query, callback) {
    var promise = Model.findOne(query).exec();
    promise.then(function(result) {
      callback(null, result);
    })
    promise.catch(function(err) {
      callback(err);
    })
  },

  create: function(Model, params) {
    Model.create(params);
  },

  update: function(Model, query, sets) {
    Model.update(query, sets);
  },

  destroy: function(query) {
    Model.findOneAndRemove(query);
  }
}

module.exports = services;
