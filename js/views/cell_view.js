define([
  'jquery',
  'ember',
  'text!templates/cell.hbs'
], function($, Ember, cellTemplate) {

  Ember.TEMPLATES.cellTemplate = Ember.Handlebars.compile(cellTemplate);

  var CellView = Ember.View.extend({
    templateName: 'cellTemplate',

    boardController: null,
    gameController: null,
    playersController: null,

    tagName: 'div',
    classNames: ['cell'],
    attributeBindings: ['style'],

    score: function() {
      // for debugging, we can grab the score of this cell from the last AI
      // calculation that was run
      var cell = this.get('content');
      var possibleMoves = this.gameController.get('possibleMoves');
      if (possibleMoves && possibleMoves.contains(cell.point)) {
        return possibleMoves.getPossibleMove(cell.point).score;
      }
      return null;
    }.property('this.gameController.possibleMoves'),

    style: function() {
      var padding = this.boardController.get('padding');
      var scale = this.boardController.get('cellSize') + this.boardController.get('cellSpacing');
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
      if (this.playersController.get('player').isHuman) {
        this.gameController.playTurn(cell.point);
      }
    }
  });

  return CellView;
});
