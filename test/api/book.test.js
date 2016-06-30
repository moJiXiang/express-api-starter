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

  describe('post /api/books', function () {
    it('should return success , status 201, and book object', function(done) {
      request(app)
        .post('/api/books')
        .send({
          name: 'mojixiang',
          info: 'best'
        })
        .expect(201)
        .end(function(err, res) {
          if(err) return done(err);
          expect(res.body.result.name).to.equal('mojixiang');
          done();
        })
    })
  });

  describe('get /api/books/:id', function () {
    it('should return success, status 200, and book object', function(done) {
      var id = '5774f010b118e43f48b26f00'
      request(app)
        .get('/api/books/' + id)
        .expect(200)
        .end(function(err, res) {
          if(err) return done(err);
          expect(res.body.result.name).to.be.a('string');
          done();
        })
    })
  });

  describe('put /api/books/:id', function () {
    it('should return success, status 200', function(done) {
      var id = '5774f010b118e43f48b26f00'
      request(app)
        .put('/api/books/'+id)
        .send({name: 'book test'})
        .expect(200)
        .end(function(err, res) {
          expect(res.body.result.ok).to.equal(1);
          done();
        })
    })
  });
});
