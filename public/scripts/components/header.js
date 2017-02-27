(function() {
  'use strict';
  function Header(name) {
    this.model = {
      name : name
    };
    this.template = '#template-header';
  }
  App.initComponent(Header);

  window.App.components.Header = Header;
})();
