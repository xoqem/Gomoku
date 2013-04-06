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
      this.set('currentPlayer', nextPlayer ? nextPlayer : playersArray[0]);

      var winningPlayer = App.boardController.getWinner();
      this.set('winner', winningPlayer);
      // TODO: check for full board and notify of stalemate if no winner
      if (winningPlayer !== null) {
        this.set('gameOver', true);
      }
    }
  },

  reset: function() {
    App.boardController.initialize();
    this.set('winner', null);
    this.set('gameOver', false);
    this.set('currentPlayer', this.get('currentPlayer') || this.get('players')[0]);
  }
}).create();
