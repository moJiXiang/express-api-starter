var path = require('path');

module.exports = {
  "app": "rattletrap",
  "mongo": {
    "uri": "mongodb://localhost/expressapi-starter"
  },
  "secret": "express-api-starter",
  "appConfig": {
    "port": 3009
  },
  // "logDir": '../../logs'
  "logDir": path.join(__dirname + '/../logs')
}


// console.log(__dirname)
// console.log(path.normalize(__dirname + '/..'))
// console.log(path.normalize(__dirname + '../'))
// console.log(path.normalize('../' + __dirname ))
// console.log(path.join(__dirname, '../'))
// console.log(path.join(__dirname, '../..'))
// console.log(path.resolve(__dirname, '..'))
