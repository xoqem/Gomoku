var App = Ember.Application.create({
  name: "Gomoku",
  ready: function() {
    App.HandlebarsUtil.registerHelpers();
    App.gameController.initialize();
  }
});
