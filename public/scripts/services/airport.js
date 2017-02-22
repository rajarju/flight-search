(function() {
  'use strict';

  function Airport() {

    /**
    * Find flights
    */
    function find(query) {
      return $.ajax({
        url : '/apiV1/airports',
        method : 'get',
        data: {
          q : query
        }
      });
    }

    /**
    * Callback for typeahead
    */
    function typeahead(query, callback) {
      find(query)
      .then(function(response) {
        callback(response);
      }, function(err) {
        //  TODO: Fix this
        console.log(err);
      });
    }

    return {
      find: find,
      typeahead : typeahead
    };

  }

  App.services.airport = Airport();

})();
