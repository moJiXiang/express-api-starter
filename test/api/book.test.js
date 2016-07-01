'use strict';

var expect = require('chai').expect,
    request = require('supertest');

var app = require('../../server/app');

var newBook;

describe('Book API Router:', function () {

  describe('GET /api/books', function () {
    var books;

    beforeEach(function(done) {

      request(app)
        .get('/api/books')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) return done(err);
          books = res.body.result;
          done();
        })
    })

    it('should return success and status 200', function () {
      expect(books).to.be.a('array');
    });
  });

  describe('POST /api/books', function () {

    beforeEach(function(done) {

      request(app)
      .post('/api/books')
      .send({
        name: 'mojixiang',
        info: 'best'
      })
      .expect(201)
      .end(function(err, res) {
        if(err) return done(err);
        newBook = res.body.result;
        done();
      })
    })

    it('should return success , status 201, and book object', function() {
      expect(newBook.name).to.equal('mojixiang');
    })
  });

  describe('GET /api/books/:id', function () {
    it('should return success, status 200, and book object', function(done) {
      request(app)
        .get('/api/books/' + newBook._id)
        .expect(200)
        .end(function(err, res) {
          if(err) return done(err);
          expect(res.body.result.name).to.equal('mojixiang');
          done();
        })
    })
  });

  describe('PUT /api/books/:id', function () {
    it('should return success, status 200', function(done) {
      request(app)
        .put('/api/books/'+ newBook._id)
        .send({name: 'book test'})
        .expect(200)
        .end(function(err, res) {
          expect(res.body.result.ok).to.equal(1);
          done();
        })
    })
  });
});
