App.aiController = Ember.Controller.extend({

  playNextMove: function() {
    // if there are no remaining availabe cells we can just return
    if (App.boardController.get('openCells') === 0) return;

    var possibleMoves = App.PossibleMovesMap.create({});

    // check every cell that has been played, and attemp to create runs from
    // that cell to calculate the possible move score for cells around it
    var cells = App.boardController.getPlayedCells();
    for (var i = 0; i < cells.length; i++) {
      this.checkDirectionsFromCell(cells[i], possibleMoves);
    }

    var bestPossibleMove = possibleMoves.getBestPossibleMove();
    if (bestPossibleMove !== null) {
      App.gameController.playTurn(bestPossibleMove.point);
      return;
    }

    // if there were no best possible moves, just play a random open cell
    return App.gameController.playTurn(this.getRandomUnclaimedCell().point);
  },

  checkDirectionsFromCell: function(startingCell, possibleMoves) {
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

      // TODO: I've noticed in some cases it will have a for-sure win with 3 pieces
      // in a row, not blocked on either side, but instead of going immediately on
      // one of the sides that would give it 4 in a row unblocked on either side,
      // it sometimes will move into one of the cells that would be the 5th in a row
      // skipping the 4th cell.  This makes it possible to be blocked instead of
      // having the guarenteed victory.  We should make an optional tweak, that can
      // be ignored if we are trying to make the AI easier, that will either recognize
      // this case outright, or weight completing 4 in a row over skipping the 4th
      // cell in a run and playing the in the 5th cell first.

      // weight moves that beneift us over blocking other players.
      // TODO: we could make this part of this AI's personality / difficulty
      if (weOwnStartingCell) {
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
  },

  getRandomUnclaimedCell: function() {
    var cells = App.boardController.getPlayerCells(null);
    var index = Math.floor(Math.random() * cells.length);
    return cells[index];
  }
}).create();
