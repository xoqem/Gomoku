define([
  'jquery',
  'ember',
  'models/possible_move',
  'text!templates/board.hbs'
], function($, Ember, PossibleMove, boardTemplate) {

  Ember.TEMPLATES.boardTemplate = Ember.Handlebars.compile(boardTemplate);

  var BoardView = Ember.View.extend({
    templateName: 'boardTemplate',

    boardController: null,

    tagName: 'div',
    classNames: ['rounded-corners'],
    elementId: 'board-view',
    attributeBindings: ['style'],

    style: function() {
      var cellSize = this.boardController.get('cellSize');
      var cellSpacing = this.boardController.get('cellSpacing');
      var scale = this.boardController.get('cellSize');
      var cellCols = this.boardController.get('cellCols');
      var cellRows = this.boardController.get('cellRows');
      var padding = this.boardController.get('padding');
      var width = (cellCols * cellSize) + (cellCols - 1) * (cellSpacing) + (padding * 2);
      var height = (cellRows * cellSize) + (cellRows - 1) * (cellSpacing) + (padding * 2);
      var styleString = '';
      styleString += 'width: ' + width + 'px;';
      styleString += 'height: ' + height + 'px;';
      return styleString;
    }.property(
      'boardController.width',
      'boardController.height')
  });

  return BoardView;
});
