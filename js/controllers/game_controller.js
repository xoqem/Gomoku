App.gameController = Ember.Controller.extend({
  currentPlayer: null,
  gameOver: false,
  players: [],
  winner: null,

  initialize: function() {
    this.set('players', [
      App.Player.create({
        icon: "X",
        isHuman: true
      }),
      App.Player.create({
        icon: "O",
        isHuman: false
      })
    ]);
    this.reset();
  },

  playTurn: function(x, y) {
    if (this.get('gameOver') === true) return;

    var player = this.get('currentPlayer');
    var playersArray = this.get('players');
    // if able to play in spot, switch to next player and check winner
    if (App.boardController.setCellPlayer(x, y, player)) {
      // select next player in players array
      var nextPlayer;
      for (var i = 1; i < playersArray.length; i++) {
        if (playersArray[i - 1] == player) {
          nextPlayer = playersArray[i];
          break;
        }
      }
      nextPlayer = nextPlayer || playersArray[0];
      this.set('currentPlayer', nextPlayer);

      // check winner
      var winningPlayer = App.boardController.getWinner();
      this.set('winner', winningPlayer);
      if (winningPlayer !== null || App.boardController.get('openCells') === 0) {
        this.set('gameOver', true);
      }
      else if (nextPlayer.isHuman === false) {
        // if computer player, do the AI move
        App.aiController.playNextMove(nextPlayer);
      }
    }
  },

  reset: function() {
    App.boardController.initialize();
    this.set('winner', null);
    this.set('gameOver', false);

    var player = this.get('currentPlayer') || this.get('players')[0];
    this.set('currentPlayer', player);

    if (player.isHuman === false) {
        // if computer player, do the AI move
        App.aiController.playNextMove(player);
      }
  }
}).create();
