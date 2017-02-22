'use strict';

var gulp    = require('gulp');
var server  = require('gulp-express');
var sass    = require('gulp-sass');
var jshint  = require('gulp-jshint');
var Server  = require('karma').Server;

gulp.task('jshint', function() {
  return gulp.src('./public/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
  return gulp.src('./public/css/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jshint:watch', function () {
  gulp.watch('./public/scripts/**/*.js', ['jshint']);
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/css/scss/**/*.scss', ['sass']);
});


/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});


gulp.task('server', function () {
    server.run(['app.js']);
    gulp.watch([
      'modules',
      'routes',
      'app.js'
    ], server.notify);
});

gulp.task('dev', ['lint:watch', 'sass:watch']);

// TODO: Add default task to build, combine and minify files.
