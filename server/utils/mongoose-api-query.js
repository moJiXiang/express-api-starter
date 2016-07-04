var Promise = require('bluebird');

module.exports = exports = function apiQueryPlugin(schema) {

  schema.statics.apiQuery = function(rawParams, cb) {
    var model = this,
        params = model.apiQueryParams(rawParams);

    var query = model.find(params.searchParams).limit(params.perPage).skip((params.page - 1) * params.perPage);

    if(params.sort) query = query.sort(params.sort);

    if(cb) {
      query.exec(cb);
    } else {
      return new Promise(function(resolve, reject) {
        query.exec(function(err, results) {
          if(err) {
            return reject(err);
          } else {
            resolve(results);
          }
        })
      });
    }
  }

  schema.statics.apiQueryParams = function(rawParams) {
    var model = this;

    var covertToBoolean = function(str) {
      return (['true', 'yes', 'y', 't'].indexOf(str.toLowerCase()) !== -1)
    };

    var searchParams = {},
        query,
        page = 1,
        perPage = 10,
        sort = false; // if(params.sort) , if exsict, sort is an object

    return {
      searchParams: searchParams,
      page: page,
      perPage: perPage,
      sort: sort
    }

  }
};
