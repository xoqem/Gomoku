App.boardController = Ember.ArrayController.extend({
  content: [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]],

  checkBounds: function(x, y) {
    if (x < 0 || x > 2 || y < 0 || y > 2) {
      throw new Error("checkBounds: " + x + ", " + y + " out of bounds");
    }
  },

  checkValue: function(value) {
    if (value !== 0 && value != 1 && value !== 2) {
      throw new Error("checkValue: " + value + " is not a valid value");
    }
  },

  getCell: function(x, y) {
    this.checkBounds(x, y);
    return this.get('content')[x][y];
  },

  setCell: function(x, y, value) {
    this.checkBounds(x, y);
    var numValue = Number(value);
    this.checkValue(numValue);
    this.get('content')[x][y] = numValue;
    // TODO: do we need to manually dispatch content changed event, since we
    // are updating the array manually?
  },

  reset: function() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        this.setCell(i, j, 0);
      }
    }
  },

  textOutput: function() {
    var output = "";
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        output += this.getCell(i, j) + " ";
      }
      output += "\n";
    }
    return output;
  }
}).create();
