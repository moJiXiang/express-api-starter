'use strict';

var expect = require('chai').expect,
    request = require('supertest');

var app = require('../../server/app'),
    User = require('../../server/api/user/user.model');

var user;
var genUser = function() {
  user = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@example.com',
    password: 'password'
  })

  return user;
}

describe('User Model', function () {
  before(function() {
    console.log('before........')
  })

  beforeEach(function() {
    console.log('before each........')
  })

  afterEach(function() {
    console.log('after each.........');
  })

  it('shoud begin with no users', function(done) {
    User.findAsync({})
      .then(function(response) {
        expect(response).to.have.length(2);
        done();
      })
  })
});
