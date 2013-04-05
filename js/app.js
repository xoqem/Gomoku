var App = Ember.Application.create({
  name: "Tic Tac Toe",
  ready: function() {
    App.HandlebarsUtil.registerHelpers();
    App.boardController.initialize();
  }
});
