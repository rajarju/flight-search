(function() {
  'use strict';
  var flightApi = require('../../flightApi');

  module.exports = function(req, res, next) {
    flightApi.airlines(function(err, airlines) {

      if(err) {
        return next(err);
      }

      return res
      // .status()
      .send(airlines);
    });
  };

})();
