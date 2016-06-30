'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');

gulp.paths = {
  server: 'server',
  istanbul: 'test_coverage',
  mocha: 'test'
}

requireDir('./gulp');
