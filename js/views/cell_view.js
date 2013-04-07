App.CellView = Ember.View.extend({
  tagName: 'img',
  classNames: ['cell'],
  attributeBindings: ['src', 'style'],

  src: function () {
    var cell = this.get('content');
    return cell.player ? cell.player.icon : 'images/cell.png';
  }.property('content'),

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
    App.gameController.playTurn(cell.point);
  }
});