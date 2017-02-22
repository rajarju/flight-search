(function() {
  'use strict';

  function Airline() {
    /**
    * Find flights
    */
    function find(query) {
      return $.ajax({
        url : '/apiV1/airlines',
        method : 'get',
        data: query
      });
    }

    return {
      find: find
    };
  }

  App.services.airline = Airline();

})();
