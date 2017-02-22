(function() {
  'use strict';

  function Component(model) {

    // private
    function refreshComponents() {
      // Render all Child Elements
      var elements = this.$template.find('[data-component]');
      for(var i = 0 ; i < elements.length ; i++) {
        var element = elements[i];
        var componentName = $(element).data('component');
        var modelName = $(element).data('model');
        var model = null;
        if(modelName !== null && modelName !== undefined) {
          model = getNested(modelName, this.model) || null;
        }
        var component = new window.App.components[componentName](model);
        component.render($(element));
      }
    }

    function compile() {
      var template = _.template($(this.template).html());
      return $(template(this.model));
    }

    function getNested(modelName, element) {
      if(typeof(modelName) === 'number') {
        return element[modelName];
      }
      var parts = modelName.split('.');
      var model = null;
      if(parts.length > 1) {
        while(parts.length && (element = element[parts.shift()]));
        model = element;
      }
      else{
        model = element[modelName] || null;
      }
      return model;
    }


    // public
    this.$el = null;
    this.$template = null;
    this.model = model;

    this.appendElement = function(subEl, subTemplate) {
      this.$template.find(subEl).append($(subTemplate));
      refreshComponents.call(this);
    };

    this.updateElement = function(subEl, subTemplate) {
      this.$template.find(subEl).empty().append($(subTemplate));
      refreshComponents.call(this);
    };

    this.render = function($el) {
      this.$el = $el;
      this.$template = compile.call(this);
      if(this.$template) {
        $el.replaceWith(this.$template);
        refreshComponents.call(this);
      }

      if(this.ready) {
        this.ready();
      }
    };
  }


  App.components.Component = Component;
})();
