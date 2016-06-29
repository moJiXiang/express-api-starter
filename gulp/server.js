'use strict';

var gulp = require('gulp'),
    config = require('config'),
    path = require('path');

var nodemon = require('gulp-nodemon');

gulp.task('nodemon:development', function() {
  nodemon({
    script: path.join(gulp.paths.server, '/app.js'),
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    watch: [
      path.join(gulp.paths.server, '/')
    ]
  })
})

gulp.task('nodemon:test', function() {
  nodemon({
    script: path.join(gulp.paths.server, '/app.js'),
    ext: 'js',
    env: { 'NODE_ENV': 'test' },
    watch: [
      path.join(gulp.paths.server, '/')
    ]
  })
})

gulp.task('nodemon:production', function() {
  nodemon({
    script: path.join(gulp.paths.server, '/app.js'),
    ext: 'js',
    env: { 'NODE_ENV': 'production' },
    watch: [
      path.join(gulp.paths.server, '/')
    ]
  })
})

gulp.task('serve', ['nodemon:development']);
gulp.task('serve:test', ['nodemon:test']);
gulp.task('serve:production', ['nodemon:production']);
