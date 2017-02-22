(function () {
  'use strict';
  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var bodyParser = require('body-parser');

  var routesV1 = require('./routes/apiV1');

  var app = express();

  // uncomment after placing your favicon in /public
  app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
  app.use(logger('common'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(express.static(path.join(__dirname, 'public')));

  // Routes
  app.use('/apiV1', routesV1);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.send({
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: {}
    });
  });

  module.exports = app;
})();
