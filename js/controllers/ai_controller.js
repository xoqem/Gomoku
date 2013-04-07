App.aiController = Ember.Controller.extend({

  playNextMove: function(player) {
    // if there are no remaining availabe cells we can just return
    if (App.boardController.get('openCells') === 0) return;

    var winLength = App.boardController.get('winLength');
    var directionsArray = App.boardController.get('allDirections');
    var cells = App.boardController.getPlayerCells(player);
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      for (var j = 0; j < directionsArray.length; j++) {
        var direction = directionsArray[j];
        var currentCell = cell;
        var runLength = 0;
        var firstEmptyCell = null;
        // as long as we continue a run or have an open path continue
        while (
          currentCell &&
          (currentCell.player === cell.player || currentCell.player === null))
        {
          runLength++;
          if (firstEmptyCell === null && currentCell.player === null) {
            // TODO: for now we are just returning the first empty cell that
            firstEmptyCell = currentCell;
            App.gameController.playTurn(firstEmptyCell.point);
            return;
          }
          // if we have enough matching cells in a row we've found the winner
          if (runLength == this.get('winLength')) {
            winner = cell.player;
          } else {
            // move to the next cell in this direction
            currentCell = App.boardController.getCell(currentCell.point.add(direction));
            console.log(currentCell);
          }
        }
      }
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
