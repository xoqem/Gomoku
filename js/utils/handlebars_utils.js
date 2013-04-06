App.HandlebarsUtil = Ember.Object.createWithMixins({
  registerHelpers: function(str, data) {

    Ember.Handlebars.registerHelper('shouldWrap', function(value, options) {
      var propValue = Ember.Handlebars.get(this, value, options);
      if(propValue != (App.boardController.size - 1)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });
  }
});