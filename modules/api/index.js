(function() {
  'use strict';

  var Api = {};

  Api.airlines = require('./airlines');
  Api.airports = require('./airports');
  Api.search = require('./search');

  module.exports = Api;

})();
