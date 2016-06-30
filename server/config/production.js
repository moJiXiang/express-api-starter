'use strict';

// production config
module.exports = {
  mongo: {
    uri: "mongodb://localhost/expressapi-starter"
  },

  session: {
    cookie: {
      domain: 'test.com',
      maxAge: 5 * 60 * 1000
    }
  }
}
