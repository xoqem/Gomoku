App.BoardView = Ember.View.extend({
  templateName: 'board',
  tagName: 'div',
  classNames: ['rounded-corners'],
  elementId: 'board-view',
  attributeBindings: ['style'],

  style: function() {
    var cellSize = App.boardController.get('cellSize');
    var cellSpacing = App.boardController.get('cellSpacing');
    var scale = App.boardController.get('cellSize');
    var cellCols = App.boardController.get('cellCols');
    var cellRows = App.boardController.get('cellRows');
    var padding = App.boardController.get('padding');
    var width = (cellCols * cellSize) + (cellCols - 1) * (cellSpacing) + (padding * 2);
    var height = (cellRows * cellSize) + (cellRows - 1) * (cellSpacing) + (padding * 2);
    var styleString = '';
    styleString += 'width: ' + width + 'px;';
    styleString += 'height: ' + height + 'px;';
    return styleString;
  }.property(
    'App.boardController.width',
    'App.boardController.height')
});
