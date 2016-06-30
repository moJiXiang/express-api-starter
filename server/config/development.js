'use strict';

// development config
module.exports = {
  mongo: {
    uri: "mongodb://localhost/expressapi-starter-dev"
  },
  seedDB: true,
  session: {
    cookie: {maxAge: 5 * 60 * 1000}
  }
}
