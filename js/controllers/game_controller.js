App.gameController = Ember.Controller.extend({
  winner: 0,
  currentPlayer: 1,
  gameOver: false,

  playTurn: function(x, y) {
    if (this.get('gameOver') === true) return;

    var player = this.get('currentPlayer');
    if (App.boardController.setCellValue(x, y, player)) {
      this.set('currentPlayer', (player == 1) ? 2 : 1);
      var winningPlayer = App.boardController.getWinner();
      this.set('winner', winningPlayer);
      // TODO: check for full board and notify of stalemate if no winner
      if (winningPlayer !== 0) {
        this.set('gameOver', true);
      }
    }
  },

  reset: function() {
    App.boardController.initialize();
    this.set('winner', 0);
    this.set('gameOver', false);
  }
}).create();
