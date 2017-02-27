(function() {
  'use strict';

  function Result(model) {

    this.model = model;
    // Prepare Data
    this.model.startTime = moment(this.model.start.dateTime).format('HH:MM');
    this.model.startDate = moment(this.model.start.dateTime).format('MMM D');
    this.model.finishTime = moment(this.model.finish.dateTime).format('HH:MM');
    this.model.finishDate = moment(this.model.finish.dateTime).format('MMM D');
    this.model.durationFormatted = moment(moment.duration({'minutes' : this.model.durationMin})._data).format('HH[h] mm[m]');
    this.model.priceFormatted = App.utils.formatAmount(this.model.price);
    this.template = '#template-app-results-result';
  }

  App.initComponent(Result);

  Result.prototype.ready = function() {
    this.$template.find('.App__Results__Result__Summary').click(function(e) {
      e.preventDefault();
      if(!$(e.target).hasClass('btn')){
        $(this).parent().toggleClass('expanded');
      }
    });
  };

  window.App.components.Result = Result;
})();
