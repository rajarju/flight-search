(function() {

  var request = require('superagent');
  var config = require('../../../config');

  module.exports = function(query, callback) {
    request
    .get(config.flightApi + '/airports')
    .query({ q: query })
    .end(function(err, response) {
      callback(err, response.body);
    });
  };

})();
