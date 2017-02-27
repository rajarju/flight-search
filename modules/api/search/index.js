(function() {
  'use strict';
  var async = require('async');
  var _ = require('lodash');
  var flightApi = require('../../FlightApi');

  module.exports = function(req, res, next) {


    function getAirlines(callback) {
      flightApi.airlines(function(err, airlines) {
        if(err) {
          return callback(err);
        }
        callback(null, airlines);
      });
    }

    function getFlights(airlines, callback) {
      async.map(airlines, getFlight, callback);
    }

    function getFlight(airline, callback) {
      flightApi.flight_search(airline, req.query, callback);
    }

    function sortFlights(flights, callback) {
      callback(null, _.orderBy(_.flatten(flights), 'price', 'asc'));
    }

    async.waterfall([
      getAirlines,
      getFlights,
      sortFlights
    ], function(err, results) {
      if(err) {
        return next(err);
      }

      return res
      .send(results);
    });
  };



})();
