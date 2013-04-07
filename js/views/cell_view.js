App.CellView = Ember.View.extend({
  tagName: 'img',
  classNames: ['cell'],
  attributeBindings: ['src', 'style'],

  src: function () {
    var cell = this.get('content');
    return cell.player ? cell.player.icon : 'images/cell.png';
  }.property("content"),

  style: function() {
    var cell = this.get('content');
    var point = cell.point.scale(25);
    return "left: " + point.x + "px; top: " + point.y + "px;";
  }.property("content"),

  click: function() {
    var cell = this.get('content');
    App.gameController.playTurn(cell.point);
  }
});