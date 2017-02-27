(function() {
  'use strict';
  var Search = (function(){
    // private
    var query = {};
    var $template;
    // Config for bootstrap typeahead
    var typeaheadConfig = {
      minLength : 2,
      fitToElement: true,
      source: App.services.airport.typeahead,
      updater : updateInput,
      delay: 100
    };
    // Config for bootstrap datetimepicker
    var datetimepickerConfig = {
      format : App.config.dateFormat,
      minDate: moment()
    };

    // Start Search
    function search(e) {
      e.preventDefault();
      var values = {};
      $.each($template.find('#search-form').serializeArray(), function(key, input) {
        values[input.name] = input.value;
      });
      hideSearchForm();
      App.events.trigger('SEARCH_FORM.SEARCH', values);
    }

    // Clear Form
    function clear(e) {
      e.preventDefault();
      $template.find('#search-form')[0].reset();
      App.events.trigger('SEARCH_FORM.CLEAR');
    }

    // Show Search form
    // Used to toggle form
    function showSearchForm() {
      $template.find('.panel-body').show();
      $template.find('.panel-footer').hide();
    }

    // Hide form when user is searching
    function hideSearchForm() {
      $template.find('#search-form-summary').text(
        $template.find('#from').val() +
        ' → ' +
        $template.find('#to').val()
      );
      $template.find('.panel-body').hide();
      $template.find('.panel-footer').show();
    }

    // Update hidden airport field
    // when user chooses a value from autocomplete
    function updateInput(item) {
      $template.find('#' + this.$element.attr('id') + '_hidden').val(item.id);
      return item.name;
    }

    // @class
    function Search() {
      // Select Template
      this.template = '#template-app-search';
    }

    App.initComponent(Search);

    // Bind Events
    Search.prototype.ready = function() {
      $template = this.$template;
      this.$template.find('#search-form').on('submit', search);
      this.$template.find('#search-form button.clear').on('click', clear);
      this.$template.find('#modify-search').on('click', showSearchForm);
      this.$template.find('.airport-typeahead').typeahead(typeaheadConfig);
      this.$template.find('#flightDate').datetimepicker(datetimepickerConfig);
      showSearchForm.call(this);
    };

    return Search;
  })();

  window.App.components.Search = Search;
})();
