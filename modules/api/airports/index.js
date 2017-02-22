(function() {
  'use strict';
  var _ = require('lodash');
  var flightApi = require('../../flightApi');

  module.exports = function(req, res, next) {
    flightApi.airports(req.query.q, function(err, airports) {
      if(err) {
        return next(err);
      }
      var aiportsMin = _.map(airports, function(airport) {
        return {
          id : airport.airportCode,
          name : airport.airportName
        };
      });
      return res
      .send(aiportsMin);
    });
  };

})();
