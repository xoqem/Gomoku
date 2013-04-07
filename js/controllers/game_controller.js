App.gameController = Ember.Controller.extend({
  currentPlayer: null,
  gameOver: false,
  players: [],
  winner: null,

  initialize: function() {
    App.boardController.initialize();

    // create the players
    this.set('players', [
      App.Player.create({
        icon: "images/cell-blue.png",
        name: "blue",
        isHuman: true
      }),
      App.Player.create({
        icon: "images/cell-red.png",
        name: "red",
        isHuman: false
      })
    ]);

    this.reset();
  },

  playTurn: function(point) {
    if (this.get('gameOver') === true) return;

    var player = this.get('currentPlayer');
    var playersArray = this.get('players');
    // if able to play in spot, switch to next player and check winner
    if (App.boardController.setCellPlayer(point, player)) {
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
    App.boardController.reset();
    this.set('winner', null);
    this.set('gameOver', false);

    // If we have a player from last game, then this is who should start, since
    // the game increments to the next player at the end of each turn.  If we
    // don't have a player yet, just use the first one in the list.
    var player = this.get('currentPlayer') || this.get('players')[0];
    this.set('currentPlayer', player);

    if (player.isHuman === false) {
        // if computer player, do the AI move
        App.aiController.playNextMove(player);
      }
  }
}).create();
