(function() {
  'use strict';

  var Results = (function(){

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

    // @class
    function Results(model) {
      this.model = {
        results : model
      };
      this.template = '#template-app-results';
      this.refreshResults = refreshResults;
      this.clearResults = clearResults;
    }

    App.initComponent(Results);

    Results.prototype.ready = function() {
      if(this.model && this.model.results){
        if(this.model.results.length) {
          refreshResults.call(this);
        }
        else{
          showNoResults();
        }
      }
    };

    return Results;
  })();

  window.App.components.Results = Results;
})();
