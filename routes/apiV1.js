(function() {
  'use strict';

  var router = require('express').Router();
  var Api = require('../modules/api');

  router.get('/airlines',
    Api.airlines
  );

  router.get('/airports',
    Api.airports
  );

  router.get('/search',
    Api.search
  );

  module.exports = router;
})();
