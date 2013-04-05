App.boardController = Ember.ArrayController.extend({
  content: [],
  winner: 0,
  size: 3,

  initialize: function() {
    var array = [];
    for (var y = 0; y < this.get('size'); y++) {
      for (var x = 0; x < this.get('size'); x++) {
        array.push(
          App.Cell.create({
            x: x,
            y: y,
            value: 0
          })
        );
      }
    }
    this.set('content', array);
    this.set('winner', 0);
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

  checkValue: function(value) {
    if (value !== 0 && value != 1 && value !== 2) {
      throw new Error("checkValue: " + value + " is not a valid value");
    }
  },

  checkWinner: function() {
    var i;
    var j;
    var diagWinner1 = this.getCell(0, 0).value;
    var diagWinner2 = this.getCell(0, this.get('size') - 1).value;
    for (i = 0; i < this.get('size'); i++) {
      if (this.getCell(i, i).value !== diagWinner1) diagWinner1 = 0;
      if (this.getCell(i, this.get('size') - 1 - i).value !== diagWinner2) diagWinner2 = 0;

      var horizontalWinner = this.getCell(0, i).value;
      var verticalWinner = this.getCell(i, 0).value;
      for (j = 1; j < this.get('size'); j++) {
        if (this.getCell(j, i).value !== horizontalWinner) horizontalWinner = 0;
        if (this.getCell(i, j).value !== verticalWinner) verticalWinner = 0;
      }
      if (horizontalWinner !== 0) {
        this.set('winner', horizontalWinner);
        return;
      }
      if (verticalWinner !== 0) {
        this.set('winner', verticalWinner);
        return;
      }
    }

    if (diagWinner1 !== 0) {
      this.set('winner', diagWinner1);
      return;
    }
    if (diagWinner2 !== 0) {
      this.set('winner', diagWinner2);
      return;
    }
  },

  getCell: function(x, y) {
    return this.get('content')[this.getIndex(x, y)];
  },

  setCellValue: function(x, y, value) {
    if (this.getCell(x, y).value !== 0) return;

    var numValue = Number(value);
    this.checkValue(numValue);
    this.replaceContent(this.getIndex(x, y), 1, [
      App.Cell.create({
        x: x,
        y: y,
        value: numValue
      })
    ]);

    this.checkWinner();
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
