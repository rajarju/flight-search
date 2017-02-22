(function() {
  'use strict';
  function Results(model) {


    // private
    function refreshResults() {
      this.clearResults();
      for(var i = 0 ; i < this.model.results.length; i++ ) {
        this.appendElement('.list-group', '<component data-component="Result" data-model="results.' + i + '" ></component> ');
      }
    }

    function clearResults() {
      this.$template.find('.list-group').empty();
    }

    function showNoResults() {
      this.$template.find('.Results__List__container').html($('#template-app-results-no-result').html());
    }


    // public
    // Extend Base Component
    App.components.Component.call(this, {
      results : model
    });
    this.template = '#template-app-results';
    this.refreshResults = refreshResults;
    this.clearResults = clearResults;

    this.ready = function() {
      if(this.model.results){
        if(this.model.results.length) {
          refreshResults.call(this);
        }
        else{
          showNoResults();
        }
      }
    };



  }
  window.App.components.Results = Results;
})();
