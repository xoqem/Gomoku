App.gameController = Ember.Controller.extend({
  gameOver: false,
  winner: null,
  possibleMoves: null, // just to expose AI move scorse for debugging

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
      // wait a tick before calling play next move, to keep the app from
      // hanging if we are watching a computer controlled game
      me = this;
      setTimeout(
        function() {
          me.playAiTurn();
        },
        1
      );
    }
  },

  playAiTurn: function() {
    var pointToPlay = null;

    // get the scored possible moves from the players AI
    var player = App.playersController.get('player');
    var possibleMoves = player.ai.getPossibleMoves();

    var bestPossibleMove = possibleMoves.getBestPossibleMove();
    if (bestPossibleMove !== null) {
      pointToPlay = bestPossibleMove.point;
    }

    // if there was no best possible move, just pick a random open cell
    if (pointToPlay === null) {
      pointToPlay = App.boardController.getRandomEmptyCell().point;
    }

    this.playTurn(pointToPlay);

    // just updating the publically visible properties just in case anyone is
    // listening for our updated possible moves (for example, if we are showing
    // each cell's score for debug purposes)
    this.set('possibleMoves', possibleMoves);
  },

  reset: function() {
    App.boardController.reset();
    this.set('winner', null);
    this.set('gameOver', false);
    this.set('possibleMoves', null);
    this.startNextTurn();
  }
}).create();
