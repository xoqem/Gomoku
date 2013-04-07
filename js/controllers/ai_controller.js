App.aiController = Ember.Controller.extend({

  playNextMove: function(player) {
    // if there are no remaining availabe cells we can just return
    if (App.boardController.get('openCells') === 0) return;
/*
    var cells = App.boardController.getPlayerCells(player);
    for (var i = 0; i < cells.length; i++) {
      for (var j = 0; j < directionsArray.length; j++) {
        var cell = cells[i];
        var direction = directionsArray[j];
        var currentCell = cell;
        var runLength = 0;
        // as long as we continue a run or have an open path continue
        while (
          currentCell &&
          currentCell.player &&
          (currentCell.player === cell.player || currentCell.player === null))
        {
          runLength++;
          // if we have enough matching cells in a row we've found the winner
          if (runLength == this.get('winLength')) {
            winner = cell.player;
            return;
          } else {
            // move to the next cell in this direction
            currentCell = this.getCell(currentCell.point.add(direction));
          }
        }
      }
    }
*/
    App.gameController.playTurn(this.getRandomUnclaimedCell().point);
  },

  getRandomUnclaimedCell: function() {
    var cells = App.boardController.getPlayerCells(null);
    var index = Math.floor(Math.random() * cells.length);
    return cells[index];
  }
}).create();
