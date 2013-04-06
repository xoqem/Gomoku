App.CellView = Ember.View.extend({
  templateName: 'cell',

  clickHandler: function(e) {
    var cell = this.get('content');
    App.gameController.playTurn(cell.point);
  }
});