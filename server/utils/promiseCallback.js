var logger = require('../setting/log');

exports.handleEntityNotFound = function(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).json({message: 'This entity is not found'})
    }
    return entity;
  }
}

exports.responseWithResult = function(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      res.status(statusCode).json({result: entity});
    }
  }
}

exports.handleError = function(req, res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    // collection error message
    logger.error('error', {method:req.method, api:req.originalUrl, error_msg:err.message});
    res.status(statusCode).json({message: err.message})
  }
}


exports.removeEntity = function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).json({message: 'Remove this entity success'});
        });
    }
  };
}
