(function() {
  'use strict';
  function Alert(name) {
    // Extend Base Component
    App.components.Component.call(this, {
      name : name
    });

    this.template = '#template-header';
  }
  window.App.components.Alert = Alert;
})();
