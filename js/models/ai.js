define([
  'jquery',
  'ember',
  'models/possible_moves_map'
], function($, Ember, PossibleMovesMap) {

  var Ai = Ember.Object.extend({
    boardController: null,
    playersController: null,

    evaluateAllCells: false
  });

  Ai.reopen({
    getPossibleMoves: function() {
      // if there are no remaining availabe cells we can just return
      if (this.boardController.get('openCells') === 0) return;

      // create a new empty possible move maps for scoring moves we check
      var possibleMoves = PossibleMovesMap.create({});

      var cells;
      var directionsArray;
      if (this.get('evaluateAllCells')) {
        cells = this.boardController.toArray();
        directionsArray = this.boardController.get('winnerDirections');
      } else {
        cells = this.boardController.getPlayedCells();
        directionsArray = this.boardController.get('allDirections');
      }

      for (var i = 0; i < cells.length; i++) {
        this.checkDirectionsFromCell(cells[i], directionsArray, possibleMoves);
      }

      return possibleMoves;
    },

    checkDirectionsFromCell: function(startingCell, directionsArray, possibleMoves) {
      var winLength = this.boardController.get('winLength');
      for (var i = 0; i < directionsArray.length; i++) {
        var direction = directionsArray[i];
        var currentCell = startingCell;
        var playerMatched = startingCell.player;
        var runLength = 0;
        var emptyCells = [];
        var matches = 0;
        // as long as we our following an unblocked run
        while (
          runLength < winLength &&
          currentCell &&
          (playerMatched === null || currentCell.player === playerMatched || currentCell.player === null))
        {
          runLength++;
          var prevCell = currentCell;
          if (currentCell.player === null) {
            emptyCells.push(currentCell);
          } else {
            // the first player we match in this run will be the player we
            // check for this run.  If there turns out to be multiple players
            // in the run, then we will throw this run away for scoring
            // purposes
            playerMatched = currentCell.player;
            matches++;
          }

          // move to the next cell in this direction
          currentCell = this.boardController.getCell(currentCell.point.add(direction));
        }

        // if this run couldn't reach win length, or if we have no matches, ignore it
        if (runLength < winLength || matches === 0) continue;

        // raise to power of 3 to strongly prefer runs with the most matches
        var score = Math.pow(matches, 3);

        var currentPlayer = this.playersController.get('player');
        var weArePlayerMatched = (currentPlayer === playerMatched);

        // special case for finding a 4 in a row
        if (matches == 4)
        {
          // generally 4 in a row require immediate attention, so weight heavily
          score *= 2;

          // make it pretty much impossible for a winning play to not be the highest
          // scored move
          if (weArePlayerMatched) {
            score *= 2;
          }
        }

        // weight moves that beneift us over blocking other players.
        // TODO: we could make this part of this AI's personality / difficulty
        if (weArePlayerMatched) {
          score *= 2;
        }

        // go through the empty cells and add the weights for that possible move
        var possibleMove;
        for (var j = 0; j < emptyCells.length; j++)
        {
          possibleMove = possibleMoves.getPossibleMove(emptyCells[j].point);
          possibleMove.score += score;
        }
      }
    }
  });

  return Ai;
});
