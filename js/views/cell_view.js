App.CellView = Ember.View.extend({
  templateName: 'cell',
  tagName: 'div',
  classNames: ['cell'],
  attributeBindings: ['style'],

  score: function() {
    // for debugging, we can grab the score of this cell from the last AI
    // calculation that was run
    var cell = this.get('content');
    var possibleMoves = App.aiController.get('possibleMoves');
    if (possibleMoves && possibleMoves.contains(cell.point)) {
      return possibleMoves.getPossibleMove(cell.point).score;
    }
    return null;
  }.property('App.aiController.possibleMoves'),

  style: function() {
    var padding = App.boardController.get('padding');
    var scale = App.boardController.get('cellSize') + App.boardController.get('cellSpacing');
    var cell = this.get('content');
    var point = cell.point.scale(scale);
    var styleString = '';
    if (cell.player === null) {
      styleString += 'cursor: hand;';
      styleString += 'cursor: pointer;';
    }
    styleString += 'left: ' + (point.x + padding) + 'px;';
    styleString += 'top: ' + (point.y + padding) + 'px;';
    return styleString;
  }.property('content'),

  click: function() {
    var cell = this.get('content');
    // if it is a human player's turn, attempt to claim the clicked cell
    if (App.playersController.get('player').isHuman) {
      App.gameController.playTurn(cell.point);
    }
  }
});