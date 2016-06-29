'use strict';

var app = require('../../app'),
    User = require('./user.model');

var user;

var genUser = function() {
  user = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@example.com',
    password: 'password'
  })

  return user;
};

describe('User model', function () {
  before(function() {
    return User.removeAsync();
  })

  beforeEach(function() {
    genUser();
  })

  afterEach(function() {
    return User.removeAsync();
  })

  it('should begin with no users', function() {
    expect(User.findAsync({}).length).toBe(0)
  })
});
