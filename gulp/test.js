'use strict';
var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    path = require('path'),
    env = require('gulp-env'),
    istanbul = require('gulp-istanbul')


// 设置环境变量，mocha, istanbul测试必须在test mode
gulp.task('set-env', function() {
  env.set({
    NODE_ENV: 'test'
  })
})

gulp.task('pre-test', function() {
  return gulp.src([
    path.join(gulp.paths.server, '/**/*.js'),
    path.join('!' + gulp.paths.server, '/config/**/*.js'),
    path.join('!' + gulp.paths.server, '/setting/**/*.js'),
    path.join('!' + gulp.paths.server, '/utils/**/*.js'),
    path.join('!' + gulp.paths.server, '/{app, routes}.js')
  ])
  .pipe(istanbul()) // covering files
  pipe(instanbul.hookRequire())
})

gulp.task('test:istanbul', ['set-env', 'pre-test'], function() {

  gulp.src(path.join(gulp.paths.mocha, '/**/*.test.js'), {read: false})
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      dir: path.join(gulp.paths.istanbul, '/')
    }))
    .once('error', function(err) {
      console.error(err);
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    })
})

gulp.task('test:mocha',['set-env'], function(){

  gulp.src(path.join(gulp.paths.mocha, '/**/*.test.js'), {read: false})
    .pipe(mocha({
      reporter: 'spec'  //list,nyan,spec(default),progress
    }))
    .once('error', function(err) {
      console.error(err);
      process.exit(-1);
    })
    .once('end', function() {
      process.exit();
    })
})
