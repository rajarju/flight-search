(function() {
  'use strict';
  function Header(name) {
    // Extend Base Component
    App.components.Component.call(this,  {
      name : name
    });
    this.template = '#template-header';
  }
  window.App.components.Header = Header;
})();
