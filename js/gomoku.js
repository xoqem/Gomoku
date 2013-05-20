define([
  'jquery',
  'ember',
  'controllers/game_controller',
  'utils/handlebars_util',
  'views/application_view',
  'views/board_view',
  'views/cell_view',
  'views/navbar_view',
  'views/player_icon_view',
  'views/status_view'
], function($, Ember, GameController, HandlebarsUtil, ApplicationView, BoardView, CellView, NavbarView, PlayerIconView, StatusView) {

  var Gomoku = Ember.Application.extend({

    name: "Gomoku",

    gameController: GameController.create(),

    ApplicationView: ApplicationView,
    NavbarView: NavbarView,
    PlayerIconView: PlayerIconView,
    StatusView: StatusView,

    ready: function() {
      this.set('BoardView', BoardView.extend({
        boardController: this.gameController.boardController
      }));
      this.set('CellView', CellView.extend({
        boardController: this.gameController.boardController,
        gameController: this.gameController,
        playersController: this.gameController.playersController
      }));

      this.gameController.initialize();
      HandlebarsUtil.registerHelpers(this.gameController.boardController);
    }
  });

  return Gomoku;
});
