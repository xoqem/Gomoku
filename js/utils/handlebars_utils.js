App.HandlebarsUtil = Ember.Object.createWithMixins({
  registerHelpers: function(str, data) {

    Ember.Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
      if (arguments.length < 3) {
        throw new Error("Handlebars Helper equal needs 2 parameters");
      }

      var propValue = Ember.Handlebars.get(this, lvalue, options);
      if(propValue != rvalue) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });
  }
});