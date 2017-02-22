(function() {
  'use strict';

  function Flight() {

    /**
    * Find flights
    */
    function find(query) {
      return $.ajax({
        url : '/apiV1/search',
        // url : '/fixtures/search.json',
        method : 'get',
        data: query
      });
    }

    return {
      find: find
    };

  }

  App.services.flight = Flight();

})();
