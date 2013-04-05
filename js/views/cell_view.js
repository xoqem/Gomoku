App.CellView = Ember.View.extend({
  templateName: 'cell',

  clickHandler: function(e) {
    var cell = this.get('content');
    App.boardController.setCellValue(cell.x, cell.y, 1);
  }
});