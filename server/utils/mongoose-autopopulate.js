var Promise = require('bluebird');

module.exports = function(schema) {
  var pathsPopulate = [];
  // Find every path that has an `autopopulate` option
  schema.eachPath(function(pathname, schemaType) {
    if(schemaType.options && schemaType.options.autopopulate) {
      pathsPopulate.push({path: pathname})
    }
  })

  var autopopulateHandler = function() {
    for (var i = 0; i < pathsPopulate.length; i++) {
      pathsPopulate[i]
    }
  }
};
