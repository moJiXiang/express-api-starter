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
  })

  beforeEach(function() {
  })

  afterEach(function() {
  })

  it('shoud begin with no users', function(done) {
    User.findAsync({})
      .then(function(response) {
        expect(response).to.be.a('array');
        done();
      })
  })
});
