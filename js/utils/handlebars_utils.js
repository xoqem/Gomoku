App.HandlebarsUtil = Ember.Object.createWithMixins({
  registerHelpers: function(str, data) {

    Ember.Handlebars.registerHelper('shouldWrap', function(value, options) {
      var propValue = Ember.Handlebars.get(this, value, options);
      if(propValue != (App.boardController.width - 1)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    Ember.Handlebars.registerHelper('scale', function(value) {
      var propValue = Ember.Handlebars.get(this, value);
      console.log(propValue);
      return propValue * 35;
    });
  }
});