'use strict';

var expect = require('chai').expect,
    request = require('supertest');

var app = require('../../server/app');

describe('Book API Router:', function () {

  describe('get /api/books', function () {
    it('should return success and status 200', function (done) {
      request(app)
        .get('/api/books')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) return done(err);
          done();
        })
    });
  });
});
