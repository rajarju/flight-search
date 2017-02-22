(function() {

  var request = require('superagent');
  var config = require('../../../config');

  module.exports = function(flight, query, callback) {
    request
    .get(config.flightApi + '/flight_search/' + flight.code)
    .query(query)
    .end(function(err, response) {
      callback(err, response.body);
    });
  };

})();
