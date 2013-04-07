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

  playNextMove: function(player) {
    this.set('possibleMoves', {});

    // if there are no remaining availabe cells we can just return
    if (App.boardController.get('openCells') === 0) return;

    var possibleMove;
    var winLength = App.boardController.get('winLength');
    var directionsArray = App.boardController.get('allDirections');
    var players = App.playersController.toArray();

    // check runs starting form all pieces of each player
    for (var k = 0; k < players.length; k ++) {
      var somePlayer = players[k];
      var cells = App.boardController.getPlayerCells(somePlayer);
      // TODO: need to break this into functions, and stop having vars i, j, k, etc
      for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        for (var j = 0; j < directionsArray.length; j++) {
          var direction = directionsArray[j];
          var currentCell = cell;
          var runLength = 0;
          var emptyCells = [];
          var matches = 0;
          // as long as we continue a run or have an open path continue
          while (
            runLength < winLength &&
            currentCell &&
            (currentCell.player === somePlayer || currentCell.player === null))
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

          if (matches == 4)
          {
            if (somePlayer == player) {
              // if we have 4 in a row that we can complete, do that immediately
              App.gameController.playTurn(emptyCells[0].point);
              return;
            }

            // otherwise, heavily weight blocking the winning move by the other
            // player, but don't short circuit since we aren't guarenteed to have
            // checked our own pieces yet
            // TODO: maybe change it to always check your own pieces first?
            matches *= 2;
          }

          // raise to power of three to strongly prefer runs with the most matches
          matches = Math.pow(matches, 3);

          // go through the empty cells and add the weights for that possible move
          for (var l = 0; l < emptyCells.length; l++) {
            possibleMove = this.getPossibleMove(emptyCells[l].point);
            if (somePlayer === player) {
              possibleMove.runs += matches;
            } else {
              possibleMove.blocks += matches;
            }
          }
        }
      }
    }

    var score;
    var bestScore = 0;
    var bestPossibleMoves = []; // array of moves with equal highest scores
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
      App.gameController.playTurn(bestPossibleMoves[index].point);
      return;
    }

    // if we get to this point without having found a good cell, just
    // play a random empty cell
    App.gameController.playTurn(this.getRandomUnclaimedCell().point);
  },

  getRandomUnclaimedCell: function() {
    var cells = App.boardController.getPlayerCells(null);
    var index = Math.floor(Math.random() * cells.length);
    return cells[index];
  }
}).create();
