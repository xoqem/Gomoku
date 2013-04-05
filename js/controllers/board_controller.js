App.boardController = Ember.ArrayController.extend({
  content: [0, 0, 0,
            0, 0, 0,
            0, 0, 0],

  getIndex: function(x, y) {
    this.checkBounds(x, y);
    return x + y * 3;
  },

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
    return this.get('content')[this.getIndex(x, y)];
  },

  setCell: function(x, y, value) {
    var numValue = Number(value);
    this.checkValue(numValue);
    this.replaceContent(this.getIndex(x, y), 1, [numValue]);
  },

  reset: function() {
    var i = this.get('content').length;
    var array = [];
    while (i--) {
      array.push(0);
    }
    this.set('content', array);
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
