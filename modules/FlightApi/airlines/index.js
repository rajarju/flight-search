(function() {

  var request = require('superagent');
  var config = require('../../../config');

  module.exports = function(callback) {
    request
    .get(config.flightApi + '/airlines')
    .end(function(err, response) {
      callback(err, response.body);
    });
  };

})();
