(function() {
  'use strict';

  var FlightApp = (function(){

    // @private
    var searches = {};
    var results = {};
    var lowestFares = {};
    var currentTab = null;
    var $tabs, $template;

    function resultCallback(index, response) {
      this.model.results[index] = response;
      if(index === currentTab) {
        setTab.call(this);
      }
      tabSearchComplete.call(this, index);
      setLowestFare(index, response);
    }

    // Run Search on query A.K.A the ugly function
    function search(query) {
      var searchDate = moment(query.date);
      // Reset Tabs
      clearResults.call(this);
      // Cancel all previous searches
      _.each(searches, function(search) {
        search.abort();
      });
      // Check date
      // Fire 5 queries and track their progress
      for(var i = 0; i < 5 ; i += 1) {
        var flightDate = searchDate.add( i - 2, 'day');
        if(flightDate.diff(moment().startOf('day'), 'hours') >= 0 ) {
          enableTab.call(this, i, flightDate);
          searches[i] = App.services.flight.find({
            date : flightDate.format(App.config.dateFormat),
            from: query.from,
            to : query.to
          });
          searches[i].then(resultCallback.bind(this, i), onError.bind(this));
        }
      }
      if(!_.isEmpty(searches)) {
        currentTab = 2;
        setTab.call(this);
        var searchArray = _.map(searches, function(promise){ return promise; });
        $.when.apply(this, searchArray).then(compareTabAmount.bind(this),
        onError.bind(this));
      }
    }

    function setTab(index) {
      currentTab = index !== undefined ? index : currentTab;
      $tabs.removeClass('active').eq(currentTab).addClass('active');
      this.updateElement('.App__Results', '<component data-component="Results" data-model="results.' + currentTab + '"></component>');
    }

    function setLowestFare(index, response) {
      var amount = response[0].price;
      lowestFares[index] = amount;
    }

    function compareTabAmount() {
      var className;
      for(var tab in lowestFares) {
        className = '';
        if(lowestFares[tab] < lowestFares[currentTab]) {
          className = 'less';
        }
        if(lowestFares[tab] > lowestFares[currentTab]) {
          className = 'more';
        }
        updateTabFare.call(this, parseInt(tab),   App.utils.formatAmount(lowestFares[tab]), className);
      }
    }

    function clearResults() {
      $tabs.hide().find('small').remove();
      lowestFares = {};
      this.model.results = [];
      this.updateElement('.App__Results', '');
    }

    function enableTab(index, date) {
      this.$template.find('.App__LeftNav__Tab').eq(index)
      .show()
      .addClass('searching')
      .find('a').text(moment(date).format('ddd, Do MMM'));
    }

    function updateTabFare(index, amount, className) {
      var $a = this.$template.find('.App__LeftNav__Tab').eq(index).find('a');
      $a.find('small').remove();
      $a.append('<small class=" ' + className + ' ">AUD ' + amount + '</small>');
    }

    function tabSearchComplete(index) {
      this.$template.find('.App__LeftNav__Tab').eq(index)
      .show()
      .removeClass('searching');
    }

    function switchTab(e) {
      e.preventDefault();
      var index = $(e.target).data('index') || $(e.target).parent().data('index') || 0;
      setTab.call(this, index);
      compareTabAmount.call(this);
    }


    function onError(error) {
      alert.call(this, {
        type : 'danger',
        message : 'There was some problem, please try again.'
      });
    }

    function alert(message) {
      var template = _.template($('#template-app-messages').html());
      this.$template.find('#messages').empty().append($(template(message)));
    }

    // @class
    function FlightApp() {
      // @public
      this.model = {
        name : 'Flight App'
      };
      this.template = '#template-app';
    }

    App.initComponent(FlightApp);

    FlightApp.prototype.ready = function() {
      App.events.on('SEARCH_FORM.SEARCH', search.bind(this));
      $template = this.$template;
      $tabs = this.$template.find('.App__LeftNav__Tab');
      $tabs.click(switchTab.bind(this));
      clearResults.call(this);
    };

    return FlightApp;
  })();

  App.FlightApp = FlightApp;
})();
