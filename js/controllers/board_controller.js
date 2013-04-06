App.boardController = Ember.ArrayController.extend({
  content: [],
  width: 3,
  height: 3,
  openCells: 0,

  initialize: function() {
    // we need to fill our content array with the correct amount of properly
    // initialized cell objects
    var array = [];
    for (var y = 0; y < this.get('height'); y++) {
      for (var x = 0; x < this.get('width'); x++) {
        array.push(
          App.Cell.create({
            x: x,
            y: y,
            player: null
          })
        );
      }
    }
    this.set('content', array);

    // to begin with all of our cells are available for players to claim
    this.set('openCells', array.length);
  },

  getIndex: function(x, y) {
    if (checkBounds(x, y) === false) return;
    // convert from our 2D game board to the 1D content array
    return x + y * this.get('width');
  },

  checkBounds: function(x, y) {
    return (
      x >= 0 &&
      x < this.get('width') &&
      y >= 0 &&
      y < this.get('height'));
  },

  getWinner: function() {
    // we'll check the diagonals in the outer for loop, since we only need to
    // check each of those once
    var diagWinner1 = this.getCell(0, 0).player;
    var diagWinner2 = this.getCell(0, this.get('height') - 1).player;
    for (var i = 0; i < this.get('height'); i++) {
      if (this.getCell(i, i).player !== diagWinner1) diagWinner1 = null;
      if (this.getCell(i, this.get('height') - 1 - i).player !== diagWinner2) diagWinner2 = null;

      // we'll check the horizontal and veritcal scenarios in the inner loop, since we need
      // to do this for each row an column
      var horizontalWinner = this.getCell(0, i).player;
      var verticalWinner = this.getCell(i, 0).player;
      for (var j = 1; j < this.get('height'); j++) {
        if (this.getCell(j, i).player !== horizontalWinner) horizontalWinner = null;
        if (this.getCell(i, j).player !== verticalWinner) verticalWinner = null;
      }
      // if we have a winner at any point, just return it
      if (horizontalWinner) return horizontalWinner;
      if (verticalWinner) return verticalWinner;
    }

    // finally, check our diagonal scenarios for a winner
    if (diagWinner1) return diagWinner1;
    if (diagWinner2) return diagWinner2;

    // if no winner was found, just return null
    return null;
  },

  getCell: function(x, y) {
    return this.get('content')[this.getIndex(x, y)];
  },

  setCellPlayer: function(x, y, player) {
    // cell must not be first claimed by a player
    if (this.getCell(x, y).player !== null) return false;

    // replace our object in the contents with a new cell, this is to make sure
    // all the bindings will fire as expected
    this.replaceContent(this.getIndex(x, y), 1, [
      App.Cell.create({
        x: x,
        y: y,
        player: player
      })
    ]);

    // decrement the number of remaining open cells
    this.set('openCells', this.get('openCells') - 1);

    // return true so the caller knows it was valid and successful
    return true;
  }
}).create();
