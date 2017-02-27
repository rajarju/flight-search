(function() {
  'use strict';
  function Alert() {
    this.template = '#template-header';
  }

  // Extend Base Component
  Alert.prototype = Object.create(App.components.Component.prototype, {
    constructor: {
      value: Alert,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  window.App.components.Alert = Alert;
})();
