define([
  'jquery',
  'ember',
  'controllers/board_controller',
  'controllers/players_controller'
], function($, Ember, BoardController, PlayersController) {

  var GameController = Ember.Controller.extend({
    boardController: BoardController.create(),
    playersController: PlayersController.create(),

    gameOver: false,
    winner: null,

    debug: false, // debug mode
    possibleMoves: null, // just to expose AI move scores for debugging

    initialize: function() {
      this.boardController.initialize();
      this.playersController.boardController = this.boardController;
      this.playersController.initialize();
      this.reset();
    },

    playTurn: function(point) {
      if (this.get('gameOver') === true) return;

      // if able to play in spot, switch to next player and check winner
      if (this.boardController.setCellPlayer(point, this.playersController.get('player'))) {
        // shift current player to the next player, even if this turn is the end
        // of the current game, we want the current player to be set correctly
        // for the next turn or next game
        this.playersController.nextPlayer();

        // check winner
        var winningPlayer = this.boardController.getWinner();
        this.set('winner', winningPlayer);
        if (winningPlayer !== null || this.boardController.get('openCells') === 0) {
          this.set('gameOver', true);
        }
        else {
          this.startNextTurn();
        }
      }
    },

    startNextTurn: function() {
      var player = this.playersController.get('player');
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
      var player = this.playersController.get('player');
      var possibleMoves = player.ai.getPossibleMoves();

      var bestPossibleMove = possibleMoves.getBestPossibleMove();
      if (bestPossibleMove !== null) {
        pointToPlay = bestPossibleMove.point;
      }

      // if there was no best possible move, just pick a random open cell
      if (pointToPlay === null) {
        pointToPlay = this.boardController.getRandomEmptyCell().point;
      }

      this.playTurn(pointToPlay);

      // just updating the publically visible properties just in case anyone is
      // listening for our updated possible moves (for example, if we are showing
      // each cell's score for debug purposes)
      this.set('possibleMoves', possibleMoves);
    },

    reset: function() {
      this.boardController.reset();
      this.set('winner', null);
      this.set('gameOver', false);
      this.set('possibleMoves', null);
      this.startNextTurn();
    }
  });

  return GameController;
});
