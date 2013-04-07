App.aiController = Ember.Controller.extend({

  possibleMoves: {}, // keyed by point

  getPossibleMove: function(point) {
    var possibleMoves = this.get('possibleMoves');
    var key = point.getKey();
    if (!(key in possibleMoves)) {
      possibleMoves[key] = App.PossibleMove.create({point: point});
    }

    return possibleMoves[key];
  },

  getBestPossibleMove: function(point) {
    var score;
    var bestScore = 0;
    var bestPossibleMoves = []; // array of moves with equal highest scores
    var possibleMove;
    var possibleMoves = this.get('possibleMoves');
    for (var key in possibleMoves) {
      possibleMove = possibleMoves[key];
      score = possibleMove.getScore();
      if (score == bestScore) {
        bestPossibleMoves.push(possibleMove);
      } if (score > bestScore) {
        bestScore = score;
        bestPossibleMoves = [possibleMove];
      }
    }

    if (bestPossibleMoves.length > 0) {
      // pick a random move from our equal best possible moves
      var index = Math.floor(Math.random() * bestPossibleMoves.length);
      return bestPossibleMoves[index];
    }

    return null;
  },

  playNextMove: function() {
    this.set('possibleMoves', {});

    // if there are no remaining availabe cells we can just return
    if (App.boardController.get('openCells') === 0) return;

    // check every cell that has been played, and attemp to create runs from
    // that cell to calculate the possible move score for cells around it
    var cells = App.boardController.getPlayedCells();
    for (var i = 0; i < cells.length; i++) {
      this.checkDirectionsFromCell(cells[i]);
    }

    console.log(this.get('possibleMoves'));

    var bestPossibleMove = this.getBestPossibleMove();
    if (bestPossibleMove !== null) {
      App.gameController.playTurn(bestPossibleMove.point);
      return;
    }

    console.log('just do a random move');
    // if there were no best possible moves, just play a random open cell
    return App.gameController.playTurn(this.getRandomUnclaimedCell().point);
  },

  checkDirectionsFromCell: function(startingCell) {
    console.log('checkDirectionsFromCell', startingCell);
    var directionsArray = App.boardController.get('allDirections');
    var winLength = App.boardController.get('winLength');
    var currentPlayer = App.playersController.get('player');
    var weOwnStartingCell = (startingCell.player === currentPlayer);
    for (var i = 0; i < directionsArray.length; i++) {
      var direction = directionsArray[i];
      var currentCell = startingCell;
      var runLength = 0;
      var emptyCells = [];
      var matches = 0;
      // as long as we our following an unblocked run
      while (
        runLength < winLength &&
        currentCell &&
        (currentCell.player === startingCell.player || currentCell.player === null))
      {
        runLength++;
        if (currentCell.player === null) {
          emptyCells.push(currentCell);
        } else {
          matches++;
        }

        // move to the next cell in this direction
        currentCell = App.boardController.getCell(currentCell.point.add(direction));
      }

      // if this run couldn't reach win length, or if we have no matches, ignore it
      if (runLength < winLength || matches === 0) continue;

      // raise to power of three to strongly prefer runs with the most matches
      var score = Math.pow(matches, 3);

      // special case for finding a 4 in a row
      if (matches == 4)
      {
        if (weOwnStartingCell) {
          // if we have 4 in a row that we can complete, do that immediately
          App.gameController.playTurn(emptyCells[0].point);
          return;
        }

        // otherwise, heavily weight blocking the winning move by the other
        // player, but don't short circuit since we aren't guarenteed to have
        // checked our own pieces yet
        score *= 2;
      }

      // go through the empty cells and add the weights for that possible move
      var possibleMove;
      for (var j = 0; j < emptyCells.length; j++)
      {
        possibleMove = this.getPossibleMove(emptyCells[j].point);
        if (weOwnStartingCell) {
          possibleMove.runs += score;
        } else {
          possibleMove.blocks += score;
        }
      }
    }
  },

  getRandomUnclaimedCell: function() {
    var cells = App.boardController.getPlayerCells(null);
    var index = Math.floor(Math.random() * cells.length);
    return cells[index];
  }
}).create();
