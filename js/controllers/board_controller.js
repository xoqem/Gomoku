App.boardController = Ember.ArrayController.extend({
  content: [],
  directions: [],
  padding: 10,
  cellSize: 20,
  cellSpacing: 5,
  cellCols: 19,
  cellRows: 19,
  winLength: 5,
  openCells: 0,

  initialize: function() {
    // initialize possible directions for winning runs
    var directionsArray = this.get('directions');
    directionsArray.push(App.Point.create({x: 0, y: 1}));
    directionsArray.push(App.Point.create({x: 1, y: 0}));
    directionsArray.push(App.Point.create({x: 1, y: 1}));
    directionsArray.push(App.Point.create({x: 1, y: -1}));

    this.reset();
  },

  getIndex: function(point) {
    if (this.checkBounds(point) === false) return NaN;
    // convert from our 2D game board to the 1D content array
    return point.x + point.y * this.get('cellCols');
  },

  checkBounds: function(point) {
    return (
      point &&
      point.x >= 0 &&
      point.x < this.get('cellCols') &&
      point.y >= 0 &&
      point.y < this.get('cellRows'));
  },

  getWinner: function() {
    var directionsArray = this.get('directions');
    var winner = null;
    // need to save off this for inside the for each callback
    var me = this;
    // go through all cells and check for runs on the ones that have a player
    // assigned to them
    // TODO: we could keep a list of filled cells and only iterate over those
    this.forEach(function(cell, index, enumerable) {
      // once we have a winner, just return for the rest of the checks
      // TODO: this is a little sloppy, would be better to switch this
      //       to some type of loop we can just break out of
      if (winner) return;
      // skip unassigned cells
      if (cell.player === null) return;
      // try the possible run directions from this cell
      // TODO: it would be smart to mark what directions have been tried
      //       on a cell, as we could short circuit on some of the checks
      //       later on in the board if we already tried that direction
      //       on that cell
      for (var i = 0; i < directionsArray.length; i++) {
        var direction = directionsArray[i];
        var currentCell = cell;
        var runLength = 0;
        // as long as we continue to find matching cells continue in this
        // direction
        while (
          currentCell &&
          currentCell.player &&
          currentCell.player == cell.player)
        {
          runLength++;
          // if we have enough matching cells in a row we've found the winner
          if (runLength == me.get('winLength')) {
            winner = cell.player;
            return;
          } else {
            // move to the next cell in this direction
            currentCell = me.getCell(currentCell.point.add(direction));
          }
        }
      }
    });

    return winner;
  },

  getCell: function(point) {
    var index = this.getIndex(point);
    if (isNaN(index)) return null;
    return this.get('content')[index];
  },

  setCellPlayer: function(point, player) {
    // cell must not be first claimed by a player
    var cell = this.getCell(point);
    if (cell === null || cell.player !== null) return false;

    // replace our object in the contents with a new cell, this is to make sure
    // all the bindings will fire as expected
    this.replace(this.getIndex(point), 1, [
      App.Cell.create({
        point: point.clone(),
        player: player
      })
    ]);

    // decrement the number of remaining open cells
    this.set('openCells', this.get('openCells') - 1);

    // return true so the caller knows it was valid and successful
    return true;
  },

  initializeCells: function() {
    // fill our content array with the correct amount of properly
    // initialized cell objects
    var cellCols = this.get('cellCols');
    var cellRows = this.get('cellRows');
    var array = [];
    var point = App.Point.create();
    for (point.y = 0; point.y < cellRows; point.y++) {
      for (point.x = 0; point.x < cellCols; point.x++) {
        array.push(
          App.Cell.create({
            point: point.clone(),
            player: null
          })
        );
      }
    }
    this.set('content', array);
  },

  resize: function (width, height) {
    this.set('cellCols', width);
    this.set('cellRows', height);
    this.clear();
    reset();
  },

  reset: function() {
    var length = this.get('length');

    if (length === 0) {
      this.initializeCells();
    } else {
      // reset the claimed cells
      for (var i = 0; i < length; i++) {
        var cell = this.objectAt(i);
        if (cell.player !== null) {
          this.replace(i, 1, [
            App.Cell.create({
              point: cell.point,
              player: null
            })
          ]);
        }
      }
    }

    // set all cells as avaible
    this.set('openCells', this.get('length'));
  }
}).create();
