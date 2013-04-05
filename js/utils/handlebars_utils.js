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

    Ember.Handlebars.registerBoundHelper('cellValue', function(value) {
      switch (value) {
        case 1:
          return "X";

        case 2:
          return "O";

        default:
          return "-";
      }
    });
  }
});