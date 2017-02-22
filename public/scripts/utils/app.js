(function() {
  'use strict';
  function App(){}

  App.prototype.config = {
    dateFormat : 'YYYY-MM-DD'
  };

  App.prototype.utils = {};

  App.prototype.utils.formatAmount = function(amount) {
    return amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  };

  // Will hold the pubsub channel
  App.prototype.events = null;

  // Will hold base and custom components on the app
  App.prototype.components = {};

  // Will hold all service on the app
  App.prototype.services = {};

  window.App = new App();
})();
