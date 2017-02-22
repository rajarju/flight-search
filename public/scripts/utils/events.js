// Simple PUB SUB Framework
// Different Components use this to transfer data and status

(function() {
  'use strict';

  function Events() {
    var events = [];
    var subscribers = [];

    // Used to register an event callback
    function on(event, callback) {
      if(!subscribers[event]) {
        subscribers[event] = [];
      }
      subscribers[event].push(callback);
    }

    // Used to publish an event
    function trigger(event, data) {
      console.log(event);
      if(subscribers[event] && subscribers[event].length) {
        for(var i = 0; i < subscribers[event].length ; i++) {
          subscribers[event][i](data);
        }
      }
    }

    // Closure
    return {
      on : on,
      trigger : trigger
    };

  }

  App.events = Events();
})();
