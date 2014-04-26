define([
  'jquery',
  'ember'
], function($, Ember) {

  var HandlebarsUtil = Ember.Object.createWithMixins({
    registerHelpers: function(boardController) {

      Ember.Handlebars.registerHelper('shouldWrap', function(value, options) {
        var propValue = Ember.Handlebars.get(this, value, options);
        if(propValue != (boardController.width - 1)) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      });

      Ember.Handlebars.registerHelper('scale', function(value) {
        var propValue = Ember.Handlebars.get(this, value);
        return propValue * 35;
      });
    }
  });

  return HandlebarsUtil;
});
