(function(){
  'use strict';

  var flightApi = {
    airlines : require('./airlines'),
    airports : require('./airports'),
    flight_search : require('./flight_search')
  };

  module.exports = flightApi;
})();
