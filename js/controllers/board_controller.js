App.boardController = Ember.ArrayController.extend({
  content: [],
  size: 3,

  initialize: function() {
    var array = [];
    for (var y = 0; y < this.get('size'); y++) {
      for (var x = 0; x < this.get('size'); x++) {
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
  },

  getIndex: function(x, y) {
    this.checkBounds(x, y);
    return x + y * this.get('size');
  },

  checkBounds: function(x, y) {
    if (x < 0 || x > (this.get('size') - 1) || y < 0 || y > (this.get('size') - 1)) {
      throw new Error("checkBounds: " + x + ", " + y + " out of bounds");
    }
  },

  getWinner: function() {
    var diagWinner1 = this.getCell(0, 0).player;
    var diagWinner2 = this.getCell(0, this.get('size') - 1).player;
    for (var i = 0; i < this.get('size'); i++) {
      if (this.getCell(i, i).player !== diagWinner1) diagWinner1 = null;
      if (this.getCell(i, this.get('size') - 1 - i).player !== diagWinner2) diagWinner2 = null;

      var horizontalWinner = this.getCell(0, i).player;
      var verticalWinner = this.getCell(i, 0).player;
      for (var j = 1; j < this.get('size'); j++) {
        if (this.getCell(j, i).player !== horizontalWinner) horizontalWinner = null;
        if (this.getCell(i, j).player !== verticalWinner) verticalWinner = null;
      }
      if (horizontalWinner) return horizontalWinner;
      if (verticalWinner) return verticalWinner;
    }

    if (diagWinner1) return diagWinner1;
    if (diagWinner2) return diagWinner2;

    return null;
  },

  getCell: function(x, y) {
    return this.get('content')[this.getIndex(x, y)];
  },

  setCellPlayer: function(x, y, player) {
    if (this.getCell(x, y).player !== null) return false;

    this.replaceContent(this.getIndex(x, y), 1, [
      App.Cell.create({
        x: x,
        y: y,
        player: player
      })
    ]);
    return true;
  },

  textOutput: function() {
    var output = "";
    for (var i = 0; i < this.get('size'); i++) {
      for (var j = 0; j < this.get('size'); j++) {
        output += this.getCell(i, j) + " ";
      }
      output += "\n";
    }
    return output;
  }
}).create();
