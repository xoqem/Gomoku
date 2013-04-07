App.gameController = Ember.Controller.extend({
  gameOver: false,
  winner: null,

  initialize: function() {
    App.playersController.initialize();
    App.boardController.initialize();
    this.reset();
  },

  playTurn: function(point) {
    if (this.get('gameOver') === true) return;

    // if able to play in spot, switch to next player and check winner
    if (App.boardController.setCellPlayer(point, App.playersController.get('player'))) {
      // shift current player to the next player, even if this turn is the end
      // of the current game, we want the current player to be set correctly
      // for the next turn or next game
      App.playersController.nextPlayer();

      // check winner
      var winningPlayer = App.boardController.getWinner();
      this.set('winner', winningPlayer);
      if (winningPlayer !== null || App.boardController.get('openCells') === 0) {
        this.set('gameOver', true);
      }
      else {
        this.startNextTurn();
      }
    }
  },

  startNextTurn: function() {
    var player = App.playersController.get('player');
    // if computer player, do the AI move
    if (player.isHuman === false) {
      App.aiController.playNextMove(player);
    }
  },

  reset: function() {
    App.boardController.reset();
    this.set('winner', null);
    this.set('gameOver', false);
    this.startNextTurn();
  }
}).create();
