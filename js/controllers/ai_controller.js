App.aiController = Ember.Controller.extend({

  playNextMove: function(player) {
    // if there are no remaining availabe cells we can just return
    if (App.boardController.get('openCells') === 0) return;

    // TODO: it would be nicer to have the board controller maintain an
    //       array of open cells that we could just grab here
    var cells = [];
    App.boardController.forEach(function(item, index, enumerable) {
      if (item.player === null) {
        cells.push(item);
      }
    });

    // for now the AI is unintelligent, just pick a random empty cell
    var index = Math.floor(Math.random() * cells.length);
    var cell = cells[index];
    App.gameController.playTurn(cell.x, cell.y);
  }
}).create();
