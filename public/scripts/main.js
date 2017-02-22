(function() {
  'use strict';
  document.addEventListener("DOMContentLoaded", function (event) {
    // Settings for underscore templates
    _.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };
    window.app = new window.App.FlightApp();
    window.app.render($('#root'));
  });

})();
